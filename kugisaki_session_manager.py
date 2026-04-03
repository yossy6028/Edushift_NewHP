#!/usr/bin/env python3
"""
Kugisaki Session Manager - Context Size Monitor & Auto-Recovery

Monitors kugisaki's sessions for:
1. Large context sizes (>80% of limit)
2. Old sessions (>7 days inactive)
3. Failed status detection

Actions:
- Warn when context is large
- Auto-clear old/large sessions
- Restart critical sessions if needed

Usage:
  python3 kugisaki_session_manager.py           # Check only
  python3 kugisaki_session_manager.py --fix     # Check + auto-clear
  python3 kugisaki_session_manager.py --notify  # Check + Telegram notify
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path

# ── Configuration ──────────────────────────────────────────────

AGENT_ID = "kugisaki"
TELEGRAM_CHAT_ID = "8399304394"
STATE_FILE = Path.home() / ".openclaw-kugisaki" / "logs" / "session-manager-state.json"

# Thresholds
CONTEXT_WARN_PERCENT = 70  # Warn at 70% context usage
CONTEXT_CRITICAL_PERCENT = 85  # Critical at 85%
SESSION_MAX_AGE_DAYS = 7  # Clear sessions older than 7 days
SESSION_MAX_AGE_HOURS = 24  # For topic sessions with high context

# Topic sessions that should be restarted if cleared
CRITICAL_TOPICS = ["263", "266"]  # デザイン・コンテンツ, アイデア・企画

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
        short_msg = message[:4000] if len(message) > 4000 else message
        safe_msg = short_msg.replace('"', '\\"').replace('$', '\\$')
        cmd = f'{script} main "{safe_msg}"'
        rc, out = run(cmd, timeout=15)
        if rc == 0:
            log("Telegram notification sent successfully")
        else:
            log(f"Failed to send Telegram: {out}", "ERROR")
    else:
        log(f"Telegram script not found: {script}", "ERROR")

def parse_sessions() -> list[dict]:
    """Parse session data from openclaw CLI output."""
    rc, out = run("/opt/homebrew/bin/openclaw sessions 2>&1")
    if rc != 0:
        log(f"Failed to list sessions: {out}", "ERROR")
        return []
    
    sessions = []
    for line in out.splitlines():
        # Skip header lines
        if line.startswith("Session") or line.startswith("Kind") or line.startswith("-"):
            continue
        if not line.strip():
            continue
        
        # Parse: Kind Key Age Model Tokens Flags
        parts = line.split()
        if len(parts) >= 6:
            kind = parts[0]
            key = parts[1]
            age_str = parts[2]
            model = parts[3] if len(parts) > 3 else "unknown"
            tokens = parts[4] if len(parts) > 4 else "0/0 (0%)"
            flags = " ".join(parts[5:]) if len(parts) > 5 else ""
            
            # Parse token usage
            try:
                token_part = tokens.split("(")[0] if "(" in tokens else tokens
                if "/" in token_part:
                    used, total = token_part.split("/")
                    used_num = int(used.replace("k", "000").replace("m", "000000"))
                    total_num = int(total.replace("k", "000").replace("m", "000000"))
                    ctx_percent = (used_num / total_num) * 100 if total_num > 0 else 0
                else:
                    ctx_percent = 0
            except (ValueError, IndexError):
                ctx_percent = 0
            
            # Parse age
            age_days = 0
            if "d" in age_str:
                try:
                    age_days = int(age_str.replace("d", "").replace("ago", "").strip())
                except ValueError:
                    age_days = 0
            elif "h" in age_str:
                try:
                    age_hours = int(age_str.replace("h", "").replace("ago", "").strip())
                    age_days = age_hours / 24
                except ValueError:
                    age_days = 0
            
            sessions.append({
                "kind": kind,
                "key": key,
                "full_key": f"{kind} {key}",
                "age_str": age_str,
                "age_days": age_days,
                "model": model,
                "tokens": tokens,
                "ctx_percent": ctx_percent,
                "flags": flags,
                "is_topic": "topic:" in key,
                "topic_id": key.split("topic:")[1].split()[0] if "topic:" in key else None
            })
    
    return sessions

def clear_session(session_key: str) -> bool:
    """Clear a session using openclaw CLI."""
    cmd = f"/opt/homebrew/bin/openclaw sessions clear {session_key}"
    rc, out = run(cmd, timeout=30)
    return rc == 0

def get_session_size(session_key: str) -> int:
    """Get session file size in bytes."""
    # Parse session ID from key
    if "id:" in session_key:
        session_id = session_key.split("id:")[1].split()[0]
    else:
        return 0
    
    session_file = Path.home() / ".openclaw-kugisaki" / "agents" / AGENT_ID / "sessions" / f"{session_id}.jsonl"
    if session_file.exists():
        return session_file.stat().st_size
    return 0

# ── Main ───────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Kugisaki Session Manager")
    parser.add_argument("--fix", action="store_true", help="Auto-clear problematic sessions")
    parser.add_argument("--notify", action="store_true", help="Send Telegram alert on issues")
    args = parser.parse_args()

    log("Starting session manager...")
    
    sessions = parse_sessions()
    if not sessions:
        log("No sessions found or failed to parse")
        return 1
    
    log(f"Found {len(sessions)} sessions")
    
    issues = []
    cleared_sessions = []
    warned_sessions = []
    
    for session in sessions:
        key = session["key"]
        ctx_percent = session["ctx_percent"]
        age_days = session["age_days"]
        is_topic = session["is_topic"]
        topic_id = session["topic_id"]
        
        # Check for large context
        if ctx_percent >= CONTEXT_CRITICAL_PERCENT:
            issues.append({
                "type": "critical_context",
                "session": key,
                "ctx_percent": ctx_percent,
                "message": f"Critical: {key} at {ctx_percent:.0f}% context usage"
            })
            if args.fix:
                if clear_session(key):
                    cleared_sessions.append({"key": key, "reason": "critical_context", "ctx_percent": ctx_percent})
                    log(f"Cleared session: {key}")
                else:
                    log(f"Failed to clear session: {key}", "ERROR")
        elif ctx_percent >= CONTEXT_WARN_PERCENT:
            warned_sessions.append({"key": key, "ctx_percent": ctx_percent})
            issues.append({
                "type": "warn_context",
                "session": key,
                "ctx_percent": ctx_percent,
                "message": f"Warning: {key} at {ctx_percent:.0f}% context usage"
            })
        
        # Check for old sessions (mark as issue for reporting even if not clearing)
        if is_topic and age_days >= SESSION_MAX_AGE_DAYS:
            # For topic sessions with high context, clear more aggressively
            if ctx_percent >= 50 or age_days >= SESSION_MAX_AGE_DAYS * 2:
                issues.append({
                    "type": "old_session",
                    "session": key,
                    "age_days": age_days,
                    "message": f"Old session: {key} ({age_days:.0f} days, {ctx_percent:.0f}% context)"
                })
                if args.fix:
                    if clear_session(key):
                        cleared_sessions.append({"key": key, "reason": "old_session", "age_days": age_days})
                        log(f"Cleared old session: {key}")
                    else:
                        log(f"Failed to clear session: {key}", "ERROR")
    
    # Build report
    lines = [f"📊 [kugisaki] セッション管理レポート"]
    lines.append(f"\n総セッション数: {len(sessions)}")
    
    if issues:
        lines.append(f"\n⚠️ 検出された問題: {len(issues)}件")
        for issue in issues:
            lines.append(f"  • {issue['message']}")
    else:
        lines.append("\n✅ すべてのセッションは正常です")
    
    if warned_sessions:
        lines.append(f"\n📋 警告対象（監視推奨）: {len(warned_sessions)}件")
        for ws in warned_sessions:
            lines.append(f"  • {ws['key']}: {ws['ctx_percent']:.0f}%")
    
    if cleared_sessions:
        lines.append(f"\n🗑️ クリア済みセッション: {len(cleared_sessions)}件")
        for cs in cleared_sessions:
            lines.append(f"  • {cs['key']}: {cs['reason']}")
    
    # Check critical topics that need restart
    cleared_topic_ids = [cs['key'].split("topic:")[1].split()[0] for cs in cleared_sessions if "topic:" in cs['key']]
    need_restart = [tid for tid in cleared_topic_ids if tid in CRITICAL_TOPICS]
    
    if need_restart:
        lines.append(f"\n🔄 再起動が必要な重要トピック: {', '.join(need_restart)}")
        lines.append("   → 次回アクセス時に自動的に新規セッションが作成されます")
    
    message = "\n".join(lines)
    log(message)
    
    # Notify Telegram
    if args.notify and (issues or cleared_sessions):
        notify_telegram(message)
    
    return 0 if not issues else 1

if __name__ == "__main__":
    sys.exit(main())
