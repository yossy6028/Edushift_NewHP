# Topic:266 Failed Prevention Strategy

topic:266（デザイン・アイデア）セッションのfailed再発防止戦略

---

## 問題の概要

- **発生事象**: topic:266セッションがfailedステータスで終了
- **発生時期**: 2026-03-17（13日前）
- **原因推定**: 
  1. コンテキストサイズ超過（推定）
  2. 接続断（一時的なネットワーク問題）
- **実際の影響**: コンテンツ自体は正常送信済み、セッション終了処理でのみfailed

---

## 予防策

### 1. セッション監視（実装済み）

**スクリプト**: `kugisaki_session_manager.py`

```bash
# チェックのみ
python3 kugisaki_session_manager.py

# 問題検知時に自動クリア
python3 kugisaki_session_manager.py --fix

# Telegram通知付き
python3 kugisaki_session_manager.py --fix --notify
```

**監視項目**:
- コンテキスト使用率 >70% で警告
- コンテキスト使用率 >85% で自動クリア
- 7日以上経過したトピックセッションを監視

### 2. 自動再起動戦略

**重要トピック**: 263, 266

これらのトピックはセッションクリア後、次回アクセス時に自動的に新規セッションが作成される。

**手動再起動が必要な場合**:
```bash
# セッションをクリア
openclaw sessions clear agent:kugisaki:telegram:group:-1003307998049:topic:266

# 次回topic:266にメッセージが来た時に自動的に新規セッションが作成される
```

### 3. コンテキスト管理

**定期クリア推奨タイミング**:
- コンテキスト使用率 70%超えたら検討
- 長期間（3日以上）放置されたセッション
- 重要な作業完了後

**cron設定例**（五条先生依頼）:
```cron
# 30分ごとにセッション監視
*/30 * * * * cd /Users/yossy/.openclaw/workspace-kugisaki && python3 kugisaki_session_manager.py --fix --notify >> logs/session-manager.log 2>&1
```

---

## 対応フロー

### failed検知時

1. **自己診断スクリプト実行**:
   ```bash
   python3 kugisaki_session_monitor.py --notify
   ```

2. **セッション状況確認**:
   ```bash
   openclaw sessions | grep topic:266
   ```

3. **必要に応じてクリア**:
   ```bash
   openclaw sessions clear agent:kugisaki:telegram:group:-1003307998049:topic:266
   ```

4. **Telegram通知**:
   - 問題検知時: `@kugisaki_design_bot` 経由で通知
   - 復旧確認後: 完了報告

---

## 設定済み監視システム

| スクリプト | 機能 | 実行頻度 |
|-----------|------|---------|
| `kugisaki_session_monitor.py` | failed検知・エラーログ監視 | 10分ごと |
| `kugisaki_session_manager.py` | コンテキストサイズ監視・自動クリア | 30分ごと |

---

## 緊急連絡先

- **問題発生時**: Telegram `@Crosuke_bot` (五条先生/main)
- **自動通知先**: Telegram `8399304394` (吉井さん)

---

*Last updated: 2026-03-31 by kugisaki*
