#!/usr/bin/env python3
"""
Kugisaki Session Monitor - Failed Session Detector

Checks kugisaki's recent sessions and notifies Telegram on failure.
Usage:
  python3 kugisaki_session_monitor.py           # Check only
  python3 kugisaki_session_monitor.py --notify  # Check + Telegram notify
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# ── Configuration ──────────────────────────────────────────────

AGENT_ID = "kugisaki"
TELEGRAM_CHAT_ID = "8399304394"  # Admin notification channel
STATE_FILE = Path.home() / ".openclaw-kugisaki" / "logs" / "session-monitor-state.json"

# ── Helpers ────────────────────────────────────────────────────

def log(msg: str, level: str = "INFO"):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] [{level}] {msg}"
    print(line)

def run(cmd: str, timeout: int = 30) -> tuple[int, str]:
    try:
        r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
        return r.returncode, (r.stdout + r.stderr).strip()
    except subprocess.TimeoutExpired:
        return 1, "timeout"
    except Exception as e:
        return 1, str(e)

def notify_telegram(message: str):
    """Send alert via agent_telegram_send script."""
    script = Path.home() / ".openclaw" / "workspace" / "scripts" / "agent_telegram_send"
    if script.exists():
        # Truncate message if too long
        short_msg = message[:4000] if len(message) > 4000 else message
        # Escape special chars for shell
        safe_msg = short_msg.replace('"', '\\"').replace('$', '\\$')
        cmd = f'{script} main "{safe_msg}"'
        rc, out = run(cmd, timeout=15)
        if rc == 0:
            log("Telegram notification sent successfully")
        else:
            log(f"Failed to send Telegram: {out}", "ERROR")
    else:
        log(f"Telegram script not found: {script}", "ERROR")

def get_recent_sessions(limit: int = 10) -> list[dict]:
    """Get recent sessions for kugisaki from sessions.json.
    
    The file format is: {session_key: {session_data}, ...}
    """
    sessions_file = Path.home() / ".openclaw-kugisaki" / "agents" / AGENT_ID / "sessions" / "sessions.json"
    
    if not sessions_file.exists():
        log(f"Sessions file not found: {sessions_file}", "WARN")
        return []
    
    try:
        with open(sessions_file) as f:
            data = json.load(f)
        
        sessions = []
        # The file is a dict with session_key as keys
        for session_key, session_data in list(data.items())[:limit]:
            if not isinstance(session_data, dict):
                continue
            sessions.append({
                "session_key": session_key,
                "agent": AGENT_ID,
                "status": session_data.get("status", "unknown"),
                "model": session_data.get("model", "unknown"),
                "session_id": session_data.get("sessionId", "unknown"),
                "updated_at": session_data.get("updatedAt", 0),
                "error": "error" in str(session_data).lower() or "failed" in str(session_data).lower()
            })
        return sessions
    except (json.JSONDecodeError, IOError) as e:
        log(f"Error reading sessions file: {e}", "ERROR")
        return []

def load_state() -> dict:
    """Load previous monitor state."""
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE) as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return {"notified_sessions": []}

def save_state(state: dict):
    """Save monitor state."""
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def check_gateway_logs_for_errors() -> list[str]:
    """Check gateway.err.log for recent errors."""
    log_file = Path.home() / ".openclaw-kugisaki" / "logs" / "gateway.err.log"
    if not log_file.exists():
        return []
    
    errors = []
    try:
        # Get last 50 lines
        rc, out = run(f"tail -50 '{log_file}' 2>/dev/null")
        if rc == 0:
            for line in out.splitlines():
                # Look for session-related errors
                if any(k in line.lower() for k in ["failed", "error", "panic", "exception", "kugisaki"]):
                    if "stringEnum" not in line:  # Skip known plugin error
                        errors.append(line.strip())
    except Exception as e:
        log(f"Error reading log: {e}", "ERROR")
    
    return errors[-5:]  # Return last 5 relevant errors

# ── Main ───────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Kugisaki Session Monitor")
    parser.add_argument("--notify", action="store_true", help="Send Telegram alert on failures")
    args = parser.parse_args()

    log("Starting session monitor...")
    
    state = load_state()
    notified = set(state.get("notified_sessions", []))
    
    # Check recent sessions
    sessions = get_recent_sessions(limit=20)
    log(f"Found {len(sessions)} recent sessions")
    for s in sessions:
        log(f"  Session: {s.get('session_key', 'unknown')[:50]}...")
    
    # Note: sessions.json doesn't have explicit 'status' field
    # We detect failures via error logs and session file analysis
    failed_sessions = []
    
    # Check logs for errors
    recent_errors = check_gateway_logs_for_errors()
    
    new_failures = []
    
    for session in failed_sessions:
        session_key = session.get("session_key", "")
        if session_key and session_key not in notified:
            new_failures.append(session)
            notified.add(session_key)
    
    # Save updated state
    state["notified_sessions"] = list(notified)
    state["last_check"] = datetime.now().isoformat()
    save_state(state)
    
    # Report
    if not new_failures and not recent_errors:
        log("All sessions healthy ✓")
        return 0
    
    # Build notification message
    lines = [f"🚨 [{AGENT_ID}] セッション異常検知"]
    
    if new_failures:
        lines.append(f"\n📊 Failed Sessions: {len(new_failures)}")
        for s in new_failures:
            lines.append(f"  • {s.get('session_key', 'unknown')}: {s.get('created', 'unknown time')}")
    
    if recent_errors:
        lines.append(f"\n📋 Recent Errors ({len(recent_errors)}):")
        for err in recent_errors:
            # Truncate long lines
            short = err[:100] + "..." if len(err) > 100 else err
            lines.append(f"  • {short}")
    
    message = "\n".join(lines)
    log(message, "WARN")
    
    # Notify Telegram
    if args.notify and (new_failures or recent_errors):
        notify_telegram(message)
        log("Telegram notification sent ✓")
    
    return 1 if new_failures else 0

if __name__ == "__main__":
    sys.exit(main())
