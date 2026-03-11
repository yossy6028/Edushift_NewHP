#!/bin/bash
# HP評価バッチ - シェルスクリプト版
NOTION_TOKEN="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"
RESULT="/Users/yossy/.openclaw/workspace-kugisaki/pj3/hp-eval-result.tsv"
echo "page_id	name	url	design	mobile	priority	memo" > "$RESULT"

evaluate_site() {
  local page_id="$1" name="$2" url="$3"
  
  # Open and snapshot
  agent-browser open "$url" >/dev/null 2>&1
  sleep 2
  local snap=$(agent-browser snapshot 2>&1 | head -50)
  local vp=$(agent-browser eval "document.querySelector('meta[name=\"viewport\"]')?.getAttribute('content')" 2>&1)
  
  # Count elements
  local headings=$(echo "$snap" | grep -c 'heading "')
  local links=$(echo "$snap" | grep -c 'link "')
  local paragraphs=$(echo "$snap" | grep -c 'paragraph')
  local has_nav=$(echo "$snap" | grep -c -E 'banner|navigation')
  local has_contact=$(echo "$snap" | grep -ci -E 'お問い合わせ|contact|相談|申し込み|資料請求|電話')
  local has_img=$(echo "$snap" | grep -ci -E 'img|image')
  local total=$((headings + links + paragraphs))
  
  # Mobile
  local mobile="未確認"
  if echo "$vp" | grep -q "width=device-width"; then mobile="対応済"; fi
  
  # Score
  local design="" priority="" memo=""
  if [ "$total" -lt 5 ]; then
    design="要改修"; priority="A"
    memo="コンテンツ極少(要素${total})。全面改修が必要"
  elif [ "$total" -lt 15 ] && [ "$has_nav" -eq 0 ]; then
    design="要改修"; priority="A"
    memo="ナビなし・情報不足(要素${total})。構造から改修が必要"
  elif [ "$total" -lt 15 ]; then
    design="改善余地あり"; priority="B"
    memo="情報量少(要素${total})。デザイン改善で集客力UP可"
  elif [ "$has_contact" -gt 0 ] && [ "$has_nav" -gt 0 ] && [ "$total" -gt 40 ]; then
    design="優良"; priority="D"
    memo="情報充実(要素${total})。ナビ・CTA・問い合わせ整備済"
  elif [ "$has_contact" -gt 0 ] && [ "$has_nav" -gt 0 ]; then
    design="標準"; priority="C"
    memo="基本要素あり(要素${total})。テンプレ的だが破綻なし"
  else
    design="改善余地あり"; priority="B"
    memo="CTA/問い合わせ不足(要素${total})。導線改善が必要"
  fi
  
  echo "$page_id	$name	$url	$design	$mobile	$priority	$memo" >> "$RESULT"
  
  # Notion PATCH
  local memo_json=$(echo "$memo" | sed 's/"/\\"/g')
  curl -s -X PATCH "https://api.notion.com/v1/pages/${page_id}" \
    -H "Authorization: Bearer ${NOTION_TOKEN}" \
    -H "Notion-Version: 2022-06-28" \
    -H "Content-Type: application/json" \
    -d "{\"properties\":{\"デザイン評価\":{\"select\":{\"name\":\"${design}\"}},\"モバイル対応\":{\"select\":{\"name\":\"${mobile}\"}},\"優先度\":{\"select\":{\"name\":\"${priority}\"}},\"釘崎メモ\":{\"rich_text\":[{\"text\":{\"content\":\"${memo_json}\"}}]}}}" >/dev/null 2>&1
  
  echo "[$1] $name → $design ($priority) | $mobile | $memo"
}

# Process all targets
while IFS=$'\t' read -r pid name url; do
  [ -z "$pid" ] && continue
  evaluate_site "$pid" "$name" "$url"
  sleep 0.3
done < /Users/yossy/.openclaw/workspace-kugisaki/pj3/hp-eval-targets.tsv

echo "=== DONE ==="
