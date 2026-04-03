# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

### EduShift Logo
- ロゴ画像: `assets/edushift-logo.jpg`
- サムネ・インフォグラフィックス等すべての画像生成時に必ずこのロゴを使用
- nano-banana-pro で合成する場合: `-i assets/edushift-logo.jpg` で入力画像として渡す

## gog認証エラー対処法（cron/isolated環境）

**エラー:** `get token for opencrosuke@gmail.com: read token: no TTY available for keyring file backend password prompt; set GOG_KEYRING_PASSWORD`

**対処:**
1. `/Users/yossy/.openclaw/workspace/.env` に確認・追加:
   ```
   GOG_KEYRING_PASSWORD=gogpassword123
   GOG_ACCOUNT=opencrosuke@gmail.com
   ```
2. スクリプト冒頭で読み込む:
   ```bash
   set -a; source /Users/yossy/.openclaw/workspace/.env; set +a
   ```
3. cronプロンプト冒頭に:
   ```bash
   export GOG_KEYRING_PASSWORD=gogpassword123
   export GOG_ACCOUNT=opencrosuke@gmail.com
   ```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.


---

## 情報収集ツール優先順位（重要）

**優先順: SocialData API → xurl → Tavily API → web_fetch → web_search（Brave：フォールバック）**

### ⚠️ twitter-cli search は恒久的に使用禁止（X API変更で永久に動作しない）

### X情報（話題・トレンド・投稿者の声）→ SocialData API 中心
```bash
# SocialData API（正式運用・コスト$0.0002/件）
SOCIALDATA_API_KEY=$(grep SOCIALDATA_API_KEY ~/.openclaw/workspace/.env | cut -d= -f2)
curl -s "https://api.socialdata.tools/twitter/search?query=クエリ&type=Latest" \
  -H "Authorization: Bearer $SOCIALDATA_API_KEY"
```
### 補助: xurl（認証済みOAuth2）
```bash
xurl --username YSTConsulting search "クエリ" -n 20
```

### ニュース記事・公式発表 → Tavily + web_fetch 専用
```bash
# Tavily（site:指定で日本語記事を高精度取得）
/Users/yossy/.openclaw/workspace/scripts/tavily_search.sh "クエリ site:example.jp" news 5
# web_fetch（特定サイト直叩き）
web_fetch("https://example.jp/")
```
- Tavily APIキー: `~/.openclaw/workspace/.env` の `TAVILY_API_KEY`

### フォールバック → web_search（Brave API）
- 上記が全滅した場合のみ、1カテゴリにつき1クエリに絞る
- 429が出たら即 web_fetch に切り替える

### 禁止パターン
- ニュース収集に twitter-cli を使う（X投稿≠ニュース記事）
- X動向把握に web_search を使う
- Brave APIを連続実行する（429でタスク全体が止まる）
