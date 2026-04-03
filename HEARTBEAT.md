# HEARTBEAT.md

## Mailbox監視（shared-mailbox pending check）
- `python3 /Users/yossy/.openclaw/workspace/scripts/agent_mailbox.py list --state pending` を実行し、`to` が `kugisaki` のものを確認する
- pending が1件以上あれば、各requestの `from` / `title` / `request_id` を確認し、claimしてACKを返す
- ACK後は必ず `message(action=send, channel=telegram, to=8399304394)` で「📥 [kugisaki] 受領: {title} / request_id={id}」を送信する
- 処理完了後は `complete` を実行し、送信元エージェントへ完了通知を mailbox で送る
- 完了時も必ず Telegram 8399304394 へ「✅ [kugisaki] 完了: {title} / 結果: {1行}」を送信する
- pending=0件かつ異常なしなら何もしない（HEARTBEAT_OK）
