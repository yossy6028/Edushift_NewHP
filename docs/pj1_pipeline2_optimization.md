# PJ1パイプライン② 効率化選別フロー設計

## 現状の課題

| 項目 | 現状 | 課題 |
|------|------|------|
| 引き継ぎ方式 | メールボックス手動送信 | 件数が増えるとトラッキング困難 |
| 選別基準 | 暗黙的・エージェント依存 | ばらつきが出やすい |
| 品質管理 | 後追い確認 | Aランク精度の担保が難しい |

---

## 改善フロー: 「3-Gate選別システム」

### Gate 1: nanami事前フィルタ（自動判定）

nanamiが候補を発見した時点で、以下のチェックリストで自己判定：

```
□ Xアカウント公開状態（鍵垢は除外）
□ 塾・教育関連の投稿履歴あり（直近30日以内）
□ ホームページまたは問い合わせ先URL発見済み
□ 個人塾・小規模塾・フリーランス講師のいずれか
□ 競合（大手塾/予備校）でない
```

**判定結果：**
- 5項目すべて✓ → **Sランク** (kugisakiへ即時引き継ぎ)
- 4項目✓ → **Aランク** (kugisakiへ引き継ぎ)
- 3項目以下 → **Bランク** (nanamiが追加調査 or 保留)

### Gate 2: kugisaki一括処理（バッチ化）

nanamiからの引き継ぎを「即時個別」から「定時バッチ」に変更：

**スケジュール:**
- 10:00 / 15:00 / 20:00 の3回、蓄積された候補を一括処理
- 各バッチ最大10件まで（品質担保のため）

**処理フロー:**
1. メールボックスでpendingを確認
2. 候補をまとめて取得（claim一括実行）
3. 以下の評価を一括実施：
   - デザイン評価（HP外観・SNS見栄え）
   - 規模評価（教室数・生徒数・運営形態）
   - ターゲット適性判定
4. Notionへ一括登録（ステータス: 選別済み）

### Gate 3: 品質確認自動化

**kugisaki判定後の自動アクション:**

| 判定 | アクション |
|------|------------|
| Aランク | Notionステータス→「即時アプローチ」+ itadoriへ自動通知（mailbox） |
| Bランク | Notionステータス→「保留」+ 1週間後再評価予定セット |
| Cランク | Notionステータス→「除外」+ 理由記録 |

---

## 新規実装スクリプト

### 1. nanami用: 事前判定チェッカー

```python
# pj1_candidate_scorer.py（nanami workspace配置）
# Xプロフィール情報から自動スコアリング
def score_candidate(profile_data):
    score = 0
    checks = {
        'public_account': not profile_data.get('protected', False),
        'education_posts': check_education_keywords(profile_data.get('recent_posts', [])),
        'has_website': profile_data.get('url') is not None,
        'small_scale': not is_large_cramschool(profile_data.get('description', '')),
        'not_competitor': not is_competitor(profile_data.get('name', ''))
    }
    return sum(checks.values()), checks
```

### 2. kugisaki用: 一括選別プロセッサー

```python
# pj1_batch_processor.py（kugisaki workspace配置）
# 複数候補の一括評価・Notion登録
class BatchProcessor:
    def fetch_pending_requests(self):
        # mailboxからpendingを一括取得
        pass
    
    def batch_evaluate(self, candidates):
        # 最大10件まで一括評価
        results = []
        for c in candidates[:10]:
            result = self.evaluate_design(c)
            results.append(result)
        return results
    
    def bulk_notion_update(self, results):
        # Notionへ一括書き込み
        pass
```

### 3. 連携用: ステータス自動通知

```python
# pj1_status_notifier.py（shared配置）
# Aランク確定時の自動通知
def notify_itadori_a_rank(candidate):
    mailbox_request = {
        'to': 'itadori',
        'title': f'PJ1 Aランク候補: {candidate["name"]}',
        'body': {
            'name': candidate['name'],
            'url': candidate['url'],
            'score': candidate['score'],
            'design_rating': candidate['design_rating']
        }
    }
    send_mailbox_request(mailbox_request)
```

---

## 導入ステップ

### Phase 1: 即座に実装可能（本日〜明日）
- [ ] nanamiへ事前判定チェックリストの導入（SKILL.md更新）
- [ ] kugisakiのバッチ処理時間を固定（10:00/15:00/20:00）
- [ ] Aランク自動通知のmailboxテンプレート作成

### Phase 2: 短期実装（今週内）
- [ ] `pj1_batch_processor.py` の実装
- [ ] Notion一括登録機能の追加
- [ ] 品質メトリクス（Aランク精度）の記録開始

### Phase 3: 自動化（来週以降）
- [ ] nanamiの判定スコア連携自動化
- [ ] cronでのバッチ処理自動実行
- [ ] ダッシュボードでの進捗可視化

---

## 期待効果

| 指標 | 現状 | 目標 | 改善率 |
|------|------|------|--------|
| 1件あたり選別時間 | 15分 | 8分 | 47%減 |
| nanami→kugisaki待ち時間 | 不定（手動依存） | 最大4時間 | 安定化 |
| Aランク精度（事後確認） | 未計測 | 80%以上 | 品質担保 |
| 1日処理件数上限 | 制限なし（品質不安） | 30件/日 | 適正化 |

---

## 補足: 緊急時の個別対応

以下の場合はバッチ待ちせず即時処理：
- Sランク（5項目すべて✓の超優良候補）
- 吉井さんからの直接指示あり
- 期日明確な案件（イベント告知等）

---

作成日: 2026-03-26  
作成者: kugisaki  
承認待ち: 五条先生（main）
