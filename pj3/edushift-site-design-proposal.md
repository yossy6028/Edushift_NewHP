# EduShift HP デザイン改善提案 v1
## ファーストビュー＆CTA改善案

> 現状コード分析に基づく改善提案（Edushift_NewHP/src/pages/Home.tsx）

---

## 現状の課題

### ① CTAボタン（ヒーロー）
- **現状**：「30分の無料相談を予約」→ よいが、テキスト量が多い
- **問題**：副テキスト「営業は一切ありません」が小さく埋もれがち
- **問題**：2つのCTAボタンが横並びで視線が迷う

### ② ファーストビュー
- **現状**：アニメーションタイトル「教育者の情熱を、確かな成果へ。」
- **問題**：ターゲット（塾経営者）への直接訴求が弱い
- **問題**：ヒーロー背景の濃いオーバーレイで視認性はOKだが重い印象

---

## 改善提案

### ① CTA改善（Aパターン：シンプル集中）

**Before:**
```
[30分の無料相談を予約 →]   [サービス詳細を見る]
「営業は一切ありません」
```

**After:**
```
[📅 無料相談を予約する（30分）]
↑ メインCTA：フルwidth・大きく・視線が集まる中央配置

「まず話を聞くだけでもOKです」← 不安除去コピーを目立つ位置に
                                    
[↓ サービスを見る]  ← セカンダリCTAはスクロール誘導に変更
```

**実装ポイント：**
```tsx
// CTA部分の変更案
<div className="flex flex-col items-start gap-3 animate-fade-in-up">
  <a
    href="#contact"
    className="px-10 py-5 bg-indigo-600 text-white rounded-full font-bold 
               text-lg shadow-2xl shadow-indigo-900/40 hover:bg-indigo-500 
               hover:scale-105 transition-all flex items-center gap-3 
               ring-4 ring-indigo-600/30 group"
  >
    📅 無料相談を予約する（30分）
    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
  </a>
  <p className="text-sm text-indigo-200 pl-2">
    ✓ まず話を聞くだけでもOK　✓ 営業は一切ありません
  </p>
  <a href="#services" className="text-white/60 text-sm hover:text-white mt-2 flex items-center gap-1">
    <ChevronDown className="w-4 h-4" /> サービスを見る
  </a>
</div>
```

---

### ② ファーストビューコピー改善

**Before:**
- キャッチ：「教育者の情熱を、確かな成果へ。」
- サブ：「経営・集客の悩みをAIと仕組みで解決。あなたが本当にやりたい教育に、もう一度集中できる環境をつくります。」

**After（ターゲット直撃版）：**
- バッジ：`🎯 塾経営者が月8件の問い合わせを増やした方法`（実績バッジに変更）
- キャッチ：「塾の集客・業務を、AIで自動化する。」（具体的ベネフィット）
- サブ：「塾経営者130名以上が活用。生徒募集・LINE対応・HP改善をまとめて解決します。」（実績＋具体）

```tsx
// バッジ変更案
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                bg-white/10 backdrop-blur-md border border-white/20 
                text-indigo-100 text-sm font-semibold mb-6">
  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
  塾経営者130名以上が活用中
</div>
```

---

### ③ ヒーローセクションに「信頼シグナル」追加

ファーストビューの下部（スクロール前）に小さく追加：

```
──────────────────────────────
▸ 問い合わせ対応  ▸ 生徒募集HP  ▸ AI業務効率化  ▸ 独立支援
──────────────────────────────
```

---

## 優先度

| 施策 | 効果期待 | 実装コスト | 優先度 |
|------|----------|------------|--------|
| CTAを縦並び＋大きく | ⭐⭐⭐ | 低 | 🔴 最優先 |
| 不安除去コピー追加 | ⭐⭐⭐ | 低 | 🔴 最優先 |
| キャッチコピー変更 | ⭐⭐⭐ | 低 | 🟠 今週中 |
| 実績バッジ変更 | ⭐⭐ | 低 | 🟠 今週中 |
| 信頼シグナルバー追加 | ⭐⭐ | 中 | 🟡 来週 |

---

## 次のステップ
- [ ] 吉井さんからコピーの実績数値（「130名以上」等）を確認
- [ ] 改善案A/Bテスト用に2パターン実装
- [ ] 実装後のCTAクリック率をGTAGで計測
