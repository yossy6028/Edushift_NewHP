# 「塾DX・ツール開発」Pillar新設 + LP刷新 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** EduShift LPに第3の柱「塾DX・ツール開発」(初期¥19,800〜+月額)を新設し、トップページをヒーロー含め刷新、自動添削システムを開発実績として紹介する。

**Architecture:** サービス定義はデータ駆動(`src/data/scholarlyServices.ts`)で、`/service/:slug` ルートが自動レンダーするため新規ページ不要。トップページは `src/pages/HomeScholarly.tsx` の該当セクションを直接編集。スタイルは `src/styles/modern.css` の `.theme-scholarly` 名前空間に追加。

**Tech Stack:** React 18 + Vite + TypeScript。テストスイートなし(マーケティングSPA)のため、検証は `npm run build` + ローカルプレビューのスクリーンショット目視。

**前提:**
- 作業ディレクトリ: `/Users/yoshiikatsuhiko/Development/開発 (Development)2026~/Edushift_NewHP`
- ブランチ: `feature/dx-development-pillar`(作成済み)
- **mainへのpush = Vercel本番自動デプロイ。ユーザー最終承認までpush禁止**
- 設計: `docs/plans/2026-07-03-dx-development-pillar-design.md`
- デザインルール: 絵文字アイコン禁止

---

### Task 1: `dx-development` サービスエントリ追加

**Files:**
- Modify: `src/data/scholarlyServices.ts`(末尾 `hp-production` エントリの後、閉じ `};` の前)

**Step 1: エントリを追加**

`'hp-production'` エントリの閉じ `},`(L238)の直後に追加:

```ts
    'dx-development': {
        slug: 'dx-development',
        label: '塾DX・ツール開発',
        labelEn: 'School DX & Development',
        category: 'pillar',
        eyebrow: 'Pillar · 03',
        heroTitle: '塾の"面倒"を、\nツールに変える。',
        heroLead: 'バックオフィスアプリ、教材制作、指導サポートツール。自動添削SaaSを自社開発するEduShiftが、あなたの塾専用の道具を作ります。',
        narrativeHeadline: '既製のシステムは、\n小さな塾には大きすぎる。',
        narrativeParas: [
            '塾向けの管理システムは世の中にたくさんあります。しかし、その多くは大手・中堅塾向け。機能の9割は使わないのに月額は高く、現場のやり方をシステムに合わせる羽目になる——小さな塾ほど、この"サイズの不一致"に苦しんでいます。',
            'EduShiftは逆のアプローチを取ります。あなたの塾のやり方はそのままに、いま一番時間を奪っている作業から、ひとつずつ道具にしていく。国語記述の自動添削SaaSを自社で開発・運営しているからこそ、教育現場で本当に動くツールを、驚くほど身近な価格で作れます。',
        ],
        supportItems: [
            // TODO(human): 3領域の売り文句(下記Learn by Doing参照)
        ],
        extraSections: [
            {
                heading: '開発実績 — 国語記述 自動添削システム',
                body: '中学受験国語の記述答案をAIが数十秒で添削・採点するWebサービスを、企画から設計・開発・運用まで自社で行っています。答案の撮影アップロードから採点根拠の提示、講師による確認フローまで一気通貫。「フル」プランでは、この規模のWebアプリケーション開発をお受けします。デモは auto-tensaku-system.vercel.app からお試しいただけます。',
            },
            {
                heading: '進め方 — 小さく作って、現場で育てる',
                body: 'まず30分の無料相談で「いま一番時間を奪っている作業」を特定します。最初の1本は最小構成で素早く納品し、実際に使いながら月次で改善。作って終わりではなく、月額プランの中で塾の成長に合わせてツールも育てていきます。',
            },
        ],
        pricingBlock: {
            headline: '「作りたいものの大きさ」で選べる、3つのプラン',
            lede: '単機能の自動化ツールから、自動添削システム級のWebアプリまで。すべて初期費+月額(保守と月1回の改善相談込み)のシンプルな2部料金です。',
            tiers: [
                {
                    name: 'ミニ',
                    blurb: '単機能ツール1本。まず"いちばん面倒な作業"を消す',
                    price: '¥19,800〜',
                    priceUnit: '税抜 + 月額¥980',
                    features: [
                        '報告書・お知らせのテンプレ自動化',
                        'スプレッドシート自動集計',
                        '教材プリント1セットのデジタル化',
                        '納品後の保守・微修正込み(月額)',
                    ],
                    notes: ['※既存のGoogle環境等を活用し低コストで構築'],
                },
                {
                    name: 'スタンダード',
                    blurb: '業務アプリ1本。塾の"仕組み"をひとつ作る',
                    price: '¥49,800〜',
                    priceUnit: '税抜 + 月額¥2,980',
                    features: [
                        '生徒情報・指導記録のデータベース化',
                        '保護者連絡・請求管理などの業務アプリ',
                        '宿題管理・小テスト自動化ツール',
                        '月1回の改善相談・機能追加の割引',
                    ],
                    recommended: true,
                },
                {
                    name: 'フル',
                    blurb: '自動添削システム級。塾の基幹となるWebアプリを',
                    price: '¥98,000〜',
                    priceUnit: '税抜 + 月額¥9,800',
                    features: [
                        '要件定義から設計・開発・運用まで一気通貫',
                        '会員登録・決済などを含むWebサービス',
                        'AI組み込み(添削・教材生成・チャット等)',
                        '運用監視・継続改善(月額)',
                    ],
                    notes: ['※開発実績: 国語記述 自動添削システム'],
                },
            ],
            footnote: 'いずれも契約期間の縛りはありません。月額は保守+月1回の改善相談を含みます。',
        },
        ctaHeadline: 'まず、いちばん面倒な作業を教えてください。',
    },
```

**Step 2: Learn by Doing — supportItems はユーザーが記入**

`supportItems` の3件(バックオフィスアプリ/教材制作/指導サポートツールの `{ title, body }`)は塾運営のドメイン知識が価値になる箇所。TODO(human) を置いてユーザーに依頼する。形式:

```ts
{ title: 'バックオフィスの自動化', body: '(2〜3文。塾長が実感する課題→提供物)' },
{ title: '教材制作・デジタル化', body: '...' },
{ title: '指導サポートツール', body: '...' },
```

ユーザー記入後に次のStepへ。

**Step 3: ビルド確認**

Run: `npm run build`
Expected: エラーなし(型は既存 `ServiceContent` に適合)

**Step 4: 表示確認**

Run: `npm run dev` → `http://localhost:5173/service/dx-development` をスクリーンショット
Expected: ヒーロー・3領域・料金3枚・実績セクションが表示される

**Step 5: Commit**

```bash
git add src/data/scholarlyServices.ts
git commit -m "feat: 新Pillar「塾DX・ツール開発」のサービス定義を追加"
```

---

### Task 2: AI導入コンサルとの住み分け

**Files:**
- Modify: `src/data/scholarlyServices.ts:161-170`(`ai-consulting` エントリ)

**Step 1: narrativeParas 2文目の末尾に住み分けを追記**

L163 の2つ目の段落末尾に追加:

```
なお、ツールやアプリの受託開発そのものは姉妹サービス「塾DX・ツール開発」で承っています。本サービスは"使いこなす"ための導入・研修に軸足を置いています。
```

**Step 2: ビルド + Commit**

```bash
npm run build
git add src/data/scholarlyServices.ts
git commit -m "feat: AI導入コンサルに塾DX・ツール開発との住み分け文言を追加"
```

---

### Task 3: ヒーロー刷新(A案: まるごと伴走軸)

**Files:**
- Modify: `src/pages/HomeScholarly.tsx:248-288`

**Step 1: h1 を差し替え(L248-253)**

```tsx
                <h1>
                    <span className="m-line"><span><span className="s-accent-line">小さな塾</span>の"デジタル"を、</span></span><br />
                    <span className="m-line"><span>まるごと。</span></span>
                    <small>EduShift — HP, in-house tools and AI, all under one roof for small schools and independent tutors.</small>
                </h1>
```

**Step 2: s-hero-body と m-aieo を差し替え(L256-262)**

```tsx
                        <p className="s-hero-body">
                            HPも、業務アプリも、教材も。自動添削SaaSを自社開発するEduShiftが、あなたの塾の「IT部門」になります。経営、集客、事務、保護者対応——教える人の"周辺"を、テクノロジーで軽くします。
                        </p>
                        <div className="m-aieo">
                            <span className="m-aieo-tag">NEW · 塾DX</span>
                            <strong>塾専用ツールを、¥19,800から開発します。</strong>
                        </div>
```

**Step 3: ミニチップに Pillar·03 を追加(L271-288)**

チップ構成を「Pillar×3 + Tool×1」に変更(4枠維持でレイアウト崩れ回避):

```tsx
                    <div className="s-hero-mini-chips m-chips-row" aria-label="EduShiftの3つの柱と実装手段">
                        <div className="s-mini-chip" data-reveal="up" data-reveal-delay="1">
                            <span className="num">Pillar · 01</span>
                            <span className="label">小規模塾</span>
                        </div>
                        <div className="s-mini-chip" data-reveal="up" data-reveal-delay="2">
                            <span className="num">Pillar · 02</span>
                            <span className="label">独立する先生</span>
                        </div>
                        <div className="s-mini-chip" data-reveal="up" data-reveal-delay="3">
                            <span className="num">Pillar · 03</span>
                            <span className="label">塾DX・開発</span>
                        </div>
                        <div className="s-mini-chip tool" data-reveal="up" data-reveal-delay="4">
                            <span className="num">Tools</span>
                            <span className="label">AI × Web</span>
                        </div>
                    </div>
```

**Step 4: ビルド + 目視 + Commit**

```bash
npm run build
git add src/pages/HomeScholarly.tsx
git commit -m "feat: ヒーローを「まるごと伴走」軸に刷新、Pillar·03チップ追加"
```

---

### Task 4: マーキー更新

**Files:**
- Modify: `src/pages/HomeScholarly.tsx:296-310`

**Step 1: マーキー項目を差し替え**

```tsx
                    <span>AI × Education</span>
                    <span>HP制作 ¥19,800〜</span>
                    <span>ツール開発 ¥19,800〜</span>
                    <span>保守運用 ¥980/月〜</span>
                    <span>自動添削システム 自社開発</span>
                    <span>小規模塾経営サポート</span>
                    <span>フリーランス独立支援</span>
                    <span>EduShift</span>
```

**Step 2: Commit**

```bash
git add src/pages/HomeScholarly.tsx
git commit -m "feat: マーキーにツール開発・自動添削実績を追加"
```

---

### Task 5: サービスセクション再構成(3 Pillar + 2 Tool)

**Files:**
- Modify: `src/pages/HomeScholarly.tsx:372-451`

**Step 1: セクション見出し更新(L375-380)**

- `CHAPTER I · 2 Pillars × 2 Tools` → `CHAPTER I · 3 Pillars × 2 Tools`
- h2: `<em>小規模塾</em>と、<em>独立する先生</em>を、<br />テクノロジーで実践する。` → `<em>経営</em>も、<em>独立</em>も、<em>開発</em>も。<br />テクノロジーで実践する。`
- lede: 「本気で向き合う対象は、この2つ」→3本柱の記述に更新:

```
<strong>EduShift</strong> の柱は3本。「小規模塾の経営」「独立する先生の成長」、そして「塾専用ツールの開発」——AIとWebの力で、教える人の毎日を実装します。
```

**Step 2: Pillar·03 カードを Pillar·02 カード(L411)の直後に追加**

```tsx
                <div className="s-service-card pillar" data-reveal="up">
                    <div className="s-service-num">Pillar · 03</div>
                    <h3>塾DX・ツール開発</h3>
                    <div className="s-service-en">School DX &amp; Development</div>
                    <p>初期¥19,800〜+月額。報告書自動化などの単機能ツールから、自動添削システム級のWebアプリまで。あなたの塾専用の道具を、作って育てます。</p>
                    <div className="m-hp-prices">
                        <span className="m-hp-price-chip">開発 ¥19,800〜</span>
                        <span className="m-hp-price-chip">月額 ¥980〜</span>
                        <span className="m-hp-price-chip">自動添削SaaS 自社開発</span>
                    </div>
                    <div className="s-service-tags">
                        <span className="s-service-tag">バックオフィス</span>
                        <span className="s-service-tag">教材制作</span>
                        <span className="s-service-tag tech">指導サポートAI</span>
                    </div>
                    <a href="/service/dx-development" className="s-service-link">詳しく読む →</a>
                </div>
```

※グリッドが2カラムの場合、Pillar 3枚目の配置が崩れないか目視確認。崩れる場合は `s-service-grid.has-pillars` のCSS調整(modern.css)を同コミットに含める。

**Step 3: ビルド + 目視 + Commit**

```bash
npm run build
git add src/pages/HomeScholarly.tsx src/styles/modern.css
git commit -m "feat: サービスセクションを3 Pillar構成に再編、塾DX・ツール開発カード追加"
```

---

### Task 6: 「開発実績」ミニセクション新設(自動添削)

**Files:**
- Create: `src/assets/auto-tensaku-screenshot.jpg`
- Modify: `src/pages/HomeScholarly.tsx`(`m-showcase` セクション終了直後、`s-founder` の前)
- Modify: `src/styles/modern.css`(末尾に `.m-devworks` スタイル追加)

**Step 1: スクリーンショット取得**

agent-browser で `https://auto-tensaku-system.vercel.app/` を開きヒーロー部分を撮影、
`src/assets/auto-tensaku-screenshot.jpg`(幅1200px程度、JPEG品質80)で保存。

**Step 2: セクションJSX追加(m-showcase閉じタグの直後)**

```tsx
    {/* ====== DEV WORKS : 開発実績(自動添削) ====== */}
    <section className="m-devworks" id="devworks">
        <div className="s-container">
            <div className="s-sec-head" data-reveal="up">
                <div className="s-sec-num">DEV WORKS · 自社開発SaaS</div>
                <div className="s-sec-titles">
                    <h2>作れることの証明は、<em>作ったもの</em>で。</h2>
                </div>
            </div>
            <div className="m-devworks-card" data-reveal="up">
                <a href="https://auto-tensaku-system.vercel.app/" target="_blank" rel="noopener" className="m-devworks-shot">
                    <img src={autoTensakuImg} alt="国語記述 自動添削システムの画面" loading="lazy" />
                </a>
                <div className="m-devworks-body">
                    <h3>国語記述 自動添削システム</h3>
                    <p>中学受験国語の記述答案を、AIが数十秒で添削・採点。企画から開発・運用まで、EduShiftが自社で行っているWebサービスです。この開発力で、あなたの塾専用のツールを作ります。</p>
                    <div className="m-devworks-links">
                        <a href="https://auto-tensaku-system.vercel.app/" target="_blank" rel="noopener" className="s-btn-ghost">サービスを見る ↗</a>
                        <a href="/service/dx-development" className="s-service-link">塾DX・ツール開発について →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
```

import追加: `import autoTensakuImg from '../assets/auto-tensaku-screenshot.jpg';`

**Step 3: CSS追加(modern.css 末尾、.theme-scholarly 名前空間)**

`m-showcase` の既存スタイル(L536〜)をベースに、2カラム(画像+テキスト)のカードを定義。モバイルは1カラム。

**Step 4: ビルド + 目視 + Commit**

```bash
npm run build
git add src/pages/HomeScholarly.tsx src/styles/modern.css src/assets/auto-tensaku-screenshot.jpg
git commit -m "feat: 開発実績セクション新設、自動添削システムを紹介"
```

---

### Task 7: ナビ・メタ情報の整合

**Files:**
- Modify: `src/pages/HomeScholarly.tsx:206-219`(ナビ)
- Modify: `src/components/MetaTags.tsx`(descriptionにツール開発を反映。実ファイルを確認して該当文言があれば)

**Step 1: ナビに「ツール開発」リンク追加(HP制作リンクの直後)**

```tsx
                <a href="/service/dx-development" onClick={closeNav}>ツール開発</a>
```

**Step 2: MetaTags のトップページ description を更新**

現行文言を確認し、「HP制作」中心なら「HP制作・塾専用ツール開発・AI活用」を含む文に更新。

**Step 3: ビルド + Commit**

```bash
npm run build
git add src/pages/HomeScholarly.tsx src/components/MetaTags.tsx
git commit -m "feat: ナビ・メタ情報にツール開発を反映"
```

---

### Task 8: 総合検証

**Step 1: フルビルド**

Run: `npm run build`
Expected: エラー・警告なし

**Step 2: プレビューで全ページ確認**

Run: `npm run preview` → 以下をスクリーンショットで目視:
1. `/` 全セクション(ヒーロー/マーキー/サービス/開発実績/料金/CTA) — 見切れ・重なりなし
2. `/service/dx-development` — 全セクション表示、料金3枚、リンク動作
3. `/service/ai-consulting` — 住み分け文言
4. モバイル幅(390px)で 1・2 を再確認

**Step 3: ユーザーに最終確認**

スクリーンショットを提示し、本番反映の承認を得る。**承認前にmainへpushしない。**

**Step 4: 承認後デプロイ**

```bash
git fetch origin && git log --oneline main..origin/main  # behind確認
git checkout main && git merge feature/dx-development-pillar
git push origin main   # Vercel本番自動デプロイ
```

デプロイ後、本番URLで `/service/dx-development` と開発実績セクションを確認。
