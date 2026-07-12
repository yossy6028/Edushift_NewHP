# YS国語HP実績 事例ページ Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** kokugoryoku-up.com リニューアル実績（問い合わせ2.8倍）を edu-shift.com の常設事例ページ `/works/ys-kokugo` として公開し、営業・発信の着地先にする。

**Architecture:** 既存の Scholarly トーン（`src/pages/v2/` + `s-*` CSSクラス）に合わせ、事例データは `src/data/caseStudies.ts` に分離。ルートは `App.tsx` の StandaloneLayout 配下に追加。グラフは外部ライブラリなしの純CSSバーチャート。

**Tech Stack:** Vite + React + react-router-dom + Tailwind（既存構成のまま、依存追加なし）

**前提:** 設計・確定数値は `docs/plans/2026-07-12-ys-case-study-design.md` を必ず先に読むこと。数値をこの計画や実装で改変しない。テスト基盤（vitest等）はこのリポジトリに存在しないため、検証は `npm run build` + playwright スクリーンショットで行う。

**禁止事項:** 絵文字アイコン使用禁止（デザイン全般の恒久ルール）。数値の丸め方向を有利に変えない（3.2倍を「約3.5倍」等にしない）。

---

### Task 1: Before/After スクリーンショット素材の作成

**Files:**
- Create: `public/works/ys-before.jpg`（旧デザイン）
- Create: `public/works/ys-after.jpg`（現行デザイン）

**Step 1: Before素材を Wayback Machine から取得**

playwright-cli または agent-browser で以下を開き、幅1440pxでファーストビュー（上部 約1600px）をスクリーンショット:

```
http://web.archive.org/web/20260208143533/https://kokugoryoku-up.com/
```

注意: Waybackのツールバー（上部の帯）が写り込むため、`#wm-ipp-base` 要素を `display:none` にしてから撮影する。

**Step 2: After素材を本番から取得**

```
https://kokugoryoku-up.com/
```

同条件（幅1440px・上部約1600px）で撮影。ローディング演出（紺カーテン+カウンター）が初回のみ出るため、演出完了後（3秒待機）に撮影する。

**Step 3: 圧縮して配置**

```bash
# pip入りpythonは必ず /opt/homebrew/bin/python3.12 を使う（Pillow）
/opt/homebrew/bin/python3.12 -c "
from PIL import Image
for name in ['ys-before','ys-after']:
    im = Image.open(f'/tmp/{name}.png').convert('RGB')
    im.thumbnail((1200, 4000))
    im.save(f'public/works/{name}.jpg', quality=78, optimize=True)
"
ls -la public/works/   # 各200KB以下を目安
```

**Step 4: Read ツールで両画像を目視確認**（旧デザイン/新デザインが正しく写っているか）

**Step 5: Commit**

```bash
git add public/works/
git commit -m "assets: YS事例ページ用Before/Afterスクリーンショット"
```

---

### Task 2: 事例データファイルの作成

**Files:**
- Create: `src/data/caseStudies.ts`

**Step 1: データ定義を書く**

設計ドキュメントの確定数値をそのまま転記する。コピー文言もここに集約（ページコンポーネントにハードコードしない。`src/data/scholarlyServices.ts` と同じ思想）。

```ts
/**
 * 事例ページのデータ。数値の出典・集計方法は
 * docs/plans/2026-07-12-ys-case-study-design.md を参照。
 * 数値を変更する場合は必ず再集計の上、設計ドキュメントも更新すること。
 */

export interface CaseMetric {
    label: string;      // 例: HPフォーム問い合わせ
    before: string;     // 例: 月3.4件
    after: string;      // 例: 月9.6件
    multiplier: string; // 例: 2.8倍
    note?: string;
}

export interface MonthlyCount {
    month: string; // 例: 2026-04
    count: number;
    highlight?: boolean; // リニューアル後の月
}

export const YS_CASE = {
    slug: 'ys-kokugo',
    siteName: 'YS中学受験国語力研究室',
    siteUrl: 'https://kokugoryoku-up.com',
    renewalDate: '2026年4月下旬',
    // TODO(human): ヒーローのキャッチコピー（実装セッションで決定）
    heroCopy: '',
    metrics: [
        { label: 'HPフォーム問い合わせ', before: '月平均3.4件', after: '月平均9.6件', multiplier: '2.8倍',
          note: 'リニューアル前9ヶ月(2025/8〜2026/4)と後(2026/5〜7/12)の比較' },
        { label: '学習相談（商談化）', before: '月2.0件', after: '月約6件', multiplier: '約3倍',
          note: '事前アンケート回答数。2026/1〜4月と5月以降の比較' },
        { label: 'HP/WEB検索経由の流入', before: '8件中2件', after: '13件中9件（69%）', multiplier: '主経路に',
          note: '学習相談アンケート「知ったきっかけ」。X経由からHP経由へ逆転' },
    ] satisfies CaseMetric[],
    monthly: [
        { month: '2025-08', count: 1 }, { month: '2025-09', count: 5 },
        { month: '2025-10', count: 2 }, { month: '2025-11', count: 3 },
        { month: '2025-12', count: 3 }, { month: '2026-01', count: 4 },
        { month: '2026-02', count: 3 }, { month: '2026-03', count: 4 },
        { month: '2026-04', count: 4 },
        { month: '2026-05', count: 7, highlight: true },
        { month: '2026-06', count: 11, highlight: true },
        { month: '2026-07', count: 5, highlight: true }, // 7/12時点
    ] satisfies MonthlyCount[],
    disclaimer: '本事例は個別の実績であり、成果を保証するものではありません。問い合わせ件数はHPフォーム経由のメール通知をスレッド単位で集計し、営業目的のメールを除外しています（2026年7月12日時点）。前年同期（2025年6月・7月）のHPフォーム問い合わせは0件でした。',
} as const;
```

**Step 2: 型チェック**

```bash
npx tsc -b --noEmit 2>&1 | head   # エラーなしを確認
```

**Step 3: Commit**

```bash
git add src/data/caseStudies.ts
git commit -m "feat: YS事例の実績データを定義"
```

---

### Task 3: 事例ページコンポーネント作成

**Files:**
- Create: `src/pages/v2/CaseStudyYsKokugo.tsx`
- 参考（トーン合わせ）: `src/pages/v2/ServiceDetailScholarly.tsx`、`src/pages/HomeScholarly.tsx` の `s-*` クラス群

**Step 1: セクション骨格を実装**

セクション順（設計ドキュメント準拠）:
1. ヒーロー — 主役数字「月3.4件 → 月9.6件」＋ `YS_CASE.heroCopy`
2. Before/After比較 — `public/works/ys-before.jpg` / `ys-after.jpg` を横並び（モバイルは縦積み）、ラベル「Before 2026年2月時点」「After 現在」
3. 3指標カード — `YS_CASE.metrics` を map。倍率を大きく、noteを小さく
4. 月別推移バーチャート — `YS_CASE.monthly` を純CSSで。`highlight` 月は強調色。「2026-07は7/12時点」の注記。前年6月・7月=0件の注記も添える
5. 実施内容 — デザイン刷新（書院・劇場化）/ モーション演出 / AIEO対策（llms.txt・JSON-LD・FAQ schema）の3点
6. 一次性の訴求 — 「EduShift代表自身の塾での実証」
7. 脚注 — `YS_CASE.disclaimer`
8. CTA — `/service/hp-production` と問い合わせへ

実装上の要点:
- `PageMotion`（ServiceDetailScholarlyが使用）と `data-reveal` 属性で既存モーション基盤に乗せる
- 画像は `loading="lazy"`、`alt` にサイト名と時点を明記
- `useEffect` で `document.title = 'HP制作実績：問い合わせ2.8倍 | EduShift'` を設定（既存ページの流儀に合わせる）

**Step 2: ルート追加**

`src/App.tsx` — import追加＋ StandaloneLayout 配下（`/business-law` の行の近く）に:

```tsx
<Route path="/works/ys-kokugo" element={<CaseStudyYsKokugo />} />
```

**Step 3: 表示確認**

```bash
npm run dev
```

playwright で `http://localhost:5173/works/ys-kokugo` を desktop(1440) / mobile(390) の2幅でフルページスクリーンショットし、Read で目視確認。チェック項目: 見切れ・重なりなし / バーチャートの高さ比が正しい / 画像が表示される / 絵文字が使われていない。

**Step 4: ビルド確認**

```bash
npm run build   # tsc -b が通ること
```

**Step 5: Commit**

```bash
git add src/pages/v2/CaseStudyYsKokugo.tsx src/App.tsx
git commit -m "feat: YS国語HP実績の事例ページ /works/ys-kokugo を追加"
```

---

### Task 4: 導線の追加（トップ＋HP制作サービスページ）

**Files:**
- Modify: `src/pages/HomeScholarly.tsx`（HP制作featuredカード、548行付近 `m-hp-featured`）
- Modify: `src/pages/v2/ServiceDetailScholarly.tsx`（`slug === 'hp-production'` の分岐を追加。`dx-development` の `DxProductGallery` 分岐が前例）

**Step 1: HomeScholarly のHP制作カードに実績リンクを追加**

「詳しく読む →」リンクの近くに1行:

```tsx
<a href="/works/ys-kokugo" className="s-service-case-link">実績: 問い合わせ2.8倍の事例 →</a>
```

**Step 2: ServiceDetailScholarly に実績バナーを追加**

`{slug === 'dx-development' && <DxProductGallery />}` と同じパターンで:

```tsx
{slug === 'hp-production' && <CaseStudyBanner />}
```

`CaseStudyBanner` は CaseStudyYsKokugo.tsx 内で named export する小コンポーネント（3指標＋「事例を見る」リンクのみ）。

**Step 3: 表示確認** — トップとhp-productionページをdevサーバーで確認、リンクが `/works/ys-kokugo` に遷移すること

**Step 4: ビルド確認** — `npm run build`

**Step 5: Commit**

```bash
git add src/pages/HomeScholarly.tsx src/pages/v2/ServiceDetailScholarly.tsx src/pages/v2/CaseStudyYsKokugo.tsx
git commit -m "feat: トップとHP制作ページから事例ページへの導線を追加"
```

---

### Task 5: SEO（sitemap・OGP）

**Files:**
- Modify: `public/sitemap.xml`（`/works/ys-kokugo` の `<url>` エントリ追加）
- Create: `public/ogp-works-ys.png`（既存 `ogp-hp.png` の流儀に合わせた1200x630。blog-thumbnailテンプレ流用可）

**Step 1: sitemap.xml に追加**（既存エントリの形式をコピーして1件追加）

**Step 2: OGP画像を作成して配置**（タイトル例「HP制作実績：問い合わせ2.8倍」＋EduShiftブランド。絵文字不使用）

**Step 3: ページに og:title / og:image のmeta設定**（既存ページがどう扱っているか確認し同じ方式で。SPAのため`index.html`静的metaの場合はデフォルトのままでも可＝YAGNI、その場合はこのStepをスキップして記録）

**Step 4: Commit**

```bash
git add public/sitemap.xml public/ogp-works-ys.png
git commit -m "seo: 事例ページをsitemapに追加しOGP画像を設定"
```

---

### Task 6: デプロイと本番検証

**Step 1: 吉井さんに公開承認を確認**（push=本番自動デプロイのため。数値・文言の最終確認込み）

**Step 2: push**

```bash
git fetch && git status   # behindでないこと確認
git push origin main      # Vercel自動デプロイ
```

**Step 3: 本番確認** — `https://edu-shift.com/works/ys-kokugo` をplaywrightで開き、desktop/mobileスクショで最終確認。トップからの導線もクリックして確認

**Step 4: GSCにsitemap再送信**

```bash
python3 ~/.config/gsc-cli/submit_sitemap.py
```

---

### Task 7（フォローアップ・別セッション可）: 発信

1. ブログ記事「塾HPリニューアルで問い合わせが3倍になった話（実データ公開）」 — @blog-discussion スキルで作成、着地先=事例ページ。サムネは @blog-thumbnail
2. X投稿 — @x-post-ideas スキルで @yossyk14（実体験トーン）と @YSTConsulting（事例紹介）各1本以上
3. `~/.claude/skills/edushift-hp-builder/` の営業メール文面に事例URLと3指標を追記

---

## 検証まとめ（完了条件）

- [ ] `npm run build` が通る
- [ ] `/works/ys-kokugo` がdesktop/mobileで崩れなく表示（スクショ目視）
- [ ] トップ・HP制作ページからの導線が機能
- [ ] 脚注（disclaimer）がページに表示されている
- [ ] 数値が設計ドキュメントと一致（grep で突合）
- [ ] 本番URLで表示確認済み
