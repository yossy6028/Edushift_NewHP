#!/usr/bin/env python3
"""
HP評価バッチスクリプト
agent-browserのsnapshotテキストからデザイン品質を推定してNotionを更新する
"""
import subprocess, json, re, time, sys, os

NOTION_TOKEN = "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"
RESULTS_FILE = "/Users/yossy/.openclaw/workspace-kugisaki/pj3/hp-eval-result.md"

def run(cmd, timeout=20):
    try:
        r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
        return r.stdout + r.stderr
    except subprocess.TimeoutExpired:
        return "TIMEOUT"

def get_snapshot(url):
    run(f'agent-browser open "{url}"')
    time.sleep(2)
    snap = run('agent-browser snapshot', timeout=15)
    viewport = run('agent-browser eval "document.querySelector(\'meta[name=\\\"viewport\\\"]\')?.getAttribute(\'content\')"', timeout=5)
    return snap, viewport

def score_snapshot(snap, url):
    """snapshotの内容からデザイン品質を推定"""
    if "TIMEOUT" in snap or len(snap.strip()) < 50:
        return "要改修", "未確認", "アクセス不可またはコンテンツ空"
    
    # 要素カウント
    headings = len(re.findall(r'heading "', snap))
    links = len(re.findall(r'link "', snap))
    images = len(re.findall(r'img |image |figure', snap, re.I))
    paragraphs = len(re.findall(r'paragraph:', snap))
    nav = 1 if 'banner' in snap or 'navigation' in snap else 0
    has_contact = 1 if re.search(r'お問い合わせ|contact|相談|申し込み|資料請求', snap, re.I) else 0
    has_cta = 1 if re.search(r'button|予約|無料|申込|form', snap, re.I) else 0
    
    total = headings + links + paragraphs
    
    if total < 5 or (headings == 0 and paragraphs < 2):
        design = "要改修"
        memo = f"コンテンツが極めて少ない（要素数{total}）。情報設計から全面改修が必要"
    elif total < 15 or (nav == 0 and images == 0):
        design = "改善余地あり"  
        memo = f"情報量が少なく（要素数{total}）、ナビ{'あり' if nav else 'なし'}・画像{'あり' if images else 'なし'}。デザイン・構成の改善が必要"
    elif has_contact and has_cta and nav:
        if total > 40:
            design = "優良"
            memo = f"ナビ・CTA・問い合わせ導線が揃っており情報量も豊富（要素数{total}）"
        else:
            design = "標準"
            memo = f"基本要素は揃っているが情報量がやや少ない（要素数{total}）"
    else:
        design = "標準"
        memo = f"テンプレ的構成。CTA{'あり' if has_cta else 'なし'}・問い合わせ{'あり' if has_contact else 'なし'}（要素数{total}）"
    
    return design, memo

def get_mobile(viewport_out):
    if "width=device-width" in viewport_out:
        return "対応済"
    elif "null" in viewport_out or "''" in viewport_out or viewport_out.strip() == "":
        return "未対応"
    return "未確認"

PRIORITY_MAP = {"要改修": "A", "改善余地あり": "B", "標準": "C", "優良": "D"}

def update_notion(page_id, design, mobile, priority, memo):
    # ダブルクォートをエスケープ
    memo_safe = memo.replace('"', "'").replace('\n', ' ')[:100]
    payload = {
        "properties": {
            "デザイン評価": {"select": {"name": design}},
            "モバイル対応": {"select": {"name": mobile}},
            "優先度": {"select": {"name": priority}},
            "釘崎メモ": {"rich_text": [{"text": {"content": memo_safe}}]}
        }
    }
    cmd = f"""curl -s -X PATCH "https://api.notion.com/v1/pages/{page_id}" \
      -H "Authorization: Bearer {NOTION_TOKEN}" \
      -H "Notion-Version: 2022-06-28" \
      -H "Content-Type: application/json" \
      -d '{json.dumps(payload, ensure_ascii=False)}'"""
    result = run(cmd, timeout=10)
    try:
        d = json.loads(result)
        return "OK" if d.get("id") else d.get("message", "ERROR")
    except:
        return "PARSE_ERROR"

def main():
    tsv = "/Users/yossy/.openclaw/workspace-kugisaki/pj3/hp-eval-targets.tsv"
    targets = []
    with open(tsv) as f:
        for line in f:
            parts = line.strip().split('\t')
            if len(parts) >= 3:
                targets.append((parts[0], parts[1], parts[2]))
    
    results = {"A": [], "B": [], "C": [], "D": [], "skip": []}
    
    for i, (page_id, name, url) in enumerate(targets):
        print(f"\n[{i+1}/{len(targets)}] {name} | {url}")
        
        snap, viewport = get_snapshot(url)
        
        if "TIMEOUT" in snap and len(snap) < 20:
            print(f"  → スキップ（タイムアウト）")
            results["skip"].append((name, url, "タイムアウト"))
            continue
        
        design, memo = score_snapshot(snap, url)
        mobile = get_mobile(viewport)
        priority = PRIORITY_MAP[design]
        
        notion_result = update_notion(page_id, design, mobile, priority, memo)
        
        print(f"  評価: {design} | 優先度: {priority} | モバイル: {mobile}")
        print(f"  メモ: {memo}")
        print(f"  Notion: {notion_result}")
        
        results[priority].append((name, url, memo))
        time.sleep(0.5)
    
    # サマリー出力
    total = sum(len(v) for v in results.values())
    summary = f"""# HP評価結果サマリー
評価日: 2026-03-11
総件数: {total}件

## 優先度A（要改修）: {len(results['A'])}件
"""
    for name, url, memo in results['A']:
        summary += f"- {name} | {url}\n  → {memo}\n"
    
    summary += f"\n## 優先度B（改善余地あり）: {len(results['B'])}件\n"
    for name, url, memo in results['B']:
        summary += f"- {name} | {url}\n  → {memo}\n"
    
    summary += f"\n## 優先度C（標準）: {len(results['C'])}件\n"
    for name, url, _ in results['C']:
        summary += f"- {name} | {url}\n"
    
    summary += f"\n## 優先度D（優良）: {len(results['D'])}件\n"
    for name, url, _ in results['D']:
        summary += f"- {name} | {url}\n"
    
    summary += f"\n## スキップ（アクセス不可）: {len(results['skip'])}件\n"
    for name, url, reason in results['skip']:
        summary += f"- {name} | {url} | {reason}\n"
    
    with open(RESULTS_FILE, 'w') as f:
        f.write(summary)
    
    print(f"\n\n{'='*50}")
    print(f"完了！ 優先度A: {len(results['A'])}件 / B: {len(results['B'])}件 / C: {len(results['C'])}件 / D: {len(results['D'])}件 / スキップ: {len(results['skip'])}件")
    print(f"結果ファイル: {RESULTS_FILE}")
    
    # Aリスト出力
    if results['A']:
        print("\n優先度A（要改修）塾リスト:")
        for name, url, memo in results['A']:
            print(f"  - {name}: {url}")

if __name__ == "__main__":
    main()
