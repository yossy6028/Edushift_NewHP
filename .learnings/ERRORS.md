# ERRORS.md

## 2026-03-31: topic:266 セッション failed ステータス（13日前の過去事象）
- **事象**: 2026-03-17のtopic:266セッションが「failed」ステータスと記録された
- **調査結果**:
  - セッションファイルは正常に終了（openclaw.cache-ttlで完了）
  - sessions.jsonに`status`フィールドは存在せず、「failed」は日次ログ生成スクリプトの判断
  - コンテンツ自体は正常送信済み（吉井さんへの返信完了）
  - **直接的なエラーログなし** → 原因は「セッション終了時の配信エラー」または「タイムアウト」と推定
- **推定原因**:
  1. セッション終了時に一時的な接続断が発生
  2. タイムアウト（応答時間超過）
  3. コンテキストサイズは25k/200k(12%)で問題なし
- **対応済み再発防止策**:
  1. `kugisaki_session_monitor.py` 作成（エラーログ監視・Telegram通知）
  2. `kugisaki_session_manager.py` 作成（コンテキスト使用率監視・自動クリア）
  3. `docs/topic266-failed-prevention.md` 作成（対応フロー文書化）
- **チェック項目（次回）**:
  - [ ] 30分ごとの監視スクリプトが動作しているか
  - [ ] コンテキスト使用率が70%を超えていないか
  - [ ] 7日以上経過したセッションが残っていないか

## 2026-03-29: topic 266系「本文正常なのに failed表示」再発防止
- **事象**: 最終本文は正常に出せているのに、セッション表示が `failed` のまま残るケースが発生。
- **今回の共通点（1件）**: **完了報告前後で実行ターンがタイムアウト/中断**し、配信本文とセッション状態の整合が崩れた（本文は届くがステータスは failed）。
- **根拠**:
  - mailbox依頼本文に「topic 266 の最終本文は正常でも failed 表示が残った」と明記
  - 本スレでも「previous model attempt failed or timed out」と再実行指示あり
- **再発防止メモ**:
  1. 返信本文を出したら、同ターン内で追加の重い処理を挟まない
  2. 長い作業は先に要点を短文で返し、その後に追記方式にする
  3. mailboxタスクは `claim/ack` 後、編集→`complete` までを1セットで即時完了する
- **チェック項目（次回）**:
  - [ ] 「返信後に追加ツール実行」していないか
  - [ ] 1ターンの作業量が過大になっていないか
  - [ ] complete/完了通知を省略していないか

## [2026-04-02 16:25:44 UTC] TestError

**Message:** これはテストエラーです

**Details:**
```
テスト詳細
```

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 00:35:13 UTC] OpenClawAPIError

**Message:** sessions list failed with code 1

**Details:**
```
Config warnings:\n- plugins.entries.openclaw-supermemory: plugin not found: openclaw-supermemory (stale config entry ignored; remove it from plugins config)
error: too many arguments for 'sessions'. Expected 0 arguments but got 1.

```

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 00:36:51 UTC] OpenClawAPIError

**Message:** sessions list failed with code 1

**Details:**
```
Config warnings:\n- plugins.entries.openclaw-supermemory: plugin not found: openclaw-supermemory (stale config entry ignored; remove it from plugins config)
error: too many arguments for 'sessions'. Expected 0 arguments but got 1.

```

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 00:42:49 UTC] OpenClawAPIError

**Message:** sessions list failed with code 1

**Details:**
```
Config warnings:\n- plugins.entries.openclaw-supermemory: plugin not found: openclaw-supermemory (stale config entry ignored; remove it from plugins config)
error: too many arguments for 'sessions'. Expected 0 arguments but got 1.

```

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 01:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 10:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 01:30:01 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 10:30:01 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 02:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 11:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 02:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 11:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 03:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 12:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 03:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 12:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 04:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 13:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 04:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 13:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 05:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 14:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 05:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 14:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 06:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 15:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 06:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 15:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 07:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 16:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 07:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 16:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 08:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 17:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 08:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 17:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 09:00:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 18:00:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 09:30:00 UTC] DependencyError

**Message:** openclawコマンドが見つかりません。PATHを確認してください。

**Source:** session_manager.py
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---

## [2026-04-03 18:30:00 JST] VerificationError

**Message:** Path verification failed

**Details:**
```
Check /Users/yossy/.openclaw/workspace/logs/session_manager_cron.log for details
```

**Source:** session_manager_cron.sh
**Script Path:** /Users/yossy/.openclaw/workspace/scripts/session_manager.py
---
