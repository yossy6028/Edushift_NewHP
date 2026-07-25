// ビルド後にルート別の静的HTMLを生成する（AIEO対応）。
// GPTBot / ClaudeBot / PerplexityBot 等の多くのAIクローラーはJavaScriptを実行しないため、
// SPAのままではサブページのtitle/canonical/JSON-LDが初期HTMLに存在しない。
// dist/index.html をベースに <head> をルート別に書き換えた index.html を各パスへ出力し、
// Vercelのファイルシステム優先ルーティングで直接配信させる。
// メタ内容は各ページコンポーネント（MetaTags呼び出し）と同一に保つこと。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://edu-shift.com';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

// 塾経営ガイド記事（React側 src/data/guides.ts と同一ソース）
const GUIDES = JSON.parse(readFileSync(join(ROOT, 'src', 'data', 'guides.json'), 'utf8')).guides;

const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// JSを実行しないクローラー（GPTBot / ClaudeBot 等）にも記事本文が見えるよう、
// ガイド記事はheadだけでなく静的本文を#rootに注入する。ハイドレーション時にReactが同内容で置き換える。
const guideBodyHtml = (g) => {
    const sections = g.sections.map((sec) => [
        `<section><h2>${escHtml(sec.heading)}</h2>`,
        ...(sec.paras ?? []).map((p) => `<p>${escHtml(p)}</p>`),
        sec.list ? `<ul>${sec.list.map((li) => `<li>${escHtml(li)}</li>`).join('')}</ul>` : '',
        ...(sec.parasAfter ?? []).map((p) => `<p>${escHtml(p)}</p>`),
        '</section>',
    ].join('')).join('');
    const faq = g.faq.map((f) => `<h3>${escHtml(f.q)}</h3><p>${escHtml(f.a)}</p>`).join('');
    const related = g.related.map((r) => `<li><a href="${r.path}">${escHtml(r.label)}</a></li>`).join('');
    return [
        `<article><nav><a href="/">ホーム</a> / <a href="/guide">塾経営ガイド</a></nav>`,
        `<h1>${escHtml(g.title)}</h1>`,
        `<p>${escHtml(g.eyebrow)} ・ ${g.dateModified} 更新</p>`,
        ...g.lead.map((p) => `<p>${escHtml(p)}</p>`),
        sections,
        `<section><h2>よくある質問</h2>${faq}</section>`,
        `<nav><h2>関連ページ</h2><ul>${related}</ul></nav>`,
        '</article>',
    ].join('');
};

const guideIndexBodyHtml = () => [
    '<main><nav><a href="/">ホーム</a> / 塾経営ガイド</nav><h1>塾経営ガイド</h1>',
    '<p>集客・ホームページ・生徒管理・DX・AI活用。小規模塾の塾長が抱えやすい悩みへの実践的な答えを、塾専門のEduShiftが無料で公開しています。</p>',
    `<ul>${GUIDES.map((g) => `<li><a href="/guide/${g.slug}">${escHtml(g.title)}</a> — ${escHtml(g.description)}</li>`).join('')}</ul>`,
    '</main>',
].join('');

const guideRoutes = () => [
    {
        path: '/guide',
        title: '塾経営ガイド｜集客・HP・DX・AI活用の実践知 | EduShift',
        description: '小規模塾・個人塾の塾長向けに、集客・ホームページ・生徒管理・DX・AI活用の実践的なノウハウを無料公開。塾専門のコンサルティングとツール開発を行うEduShiftが執筆しています。',
        staticBody: guideIndexBodyHtml(),
        jsonLd: [
            breadcrumb([{ name: '塾経営ガイド', path: '/guide' }]),
            {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                '@id': `${BASE}/guide#collection`,
                url: `${BASE}/guide`,
                name: '塾経営ガイド | EduShift',
                inLanguage: 'ja',
                isPartOf: { '@id': `${BASE}/#website` },
                hasPart: GUIDES.map((g) => ({
                    '@type': 'Article',
                    headline: g.title,
                    url: `${BASE}/guide/${g.slug}`,
                })),
            },
        ],
    },
    ...GUIDES.map((g) => ({
        path: `/guide/${g.slug}`,
        title: `${g.metaTitle} | EduShift`,
        description: g.description,
        staticBody: guideBodyHtml(g),
        jsonLd: [
            breadcrumb([
                { name: '塾経営ガイド', path: '/guide' },
                { name: g.title, path: `/guide/${g.slug}` },
            ]),
            {
                '@context': 'https://schema.org',
                '@type': 'Article',
                '@id': `${BASE}/guide/${g.slug}#article`,
                headline: g.title,
                description: g.description,
                datePublished: g.datePublished,
                dateModified: g.dateModified,
                inLanguage: 'ja',
                mainEntityOfPage: `${BASE}/guide/${g.slug}`,
                author: { '@type': 'Person', name: '吉井勝彦', url: `${BASE}/#founder` },
                publisher: { '@id': `${BASE}/#organization` },
            },
            {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: g.faq.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
        ],
    })),
];

const breadcrumb = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${BASE}/` },
        ...items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: item.name,
            ...(item.path ? { item: `${BASE}${item.path}` } : {}),
        })),
    ],
});

const servicePage = (slug, label, lead) => ({
    path: `/service/${slug}`,
    title: `${label} | EduShift`,
    description: lead,
    jsonLd: [
        breadcrumb([
            { name: 'サービス', path: '/#services' },
            { name: label, path: `/service/${slug}` },
        ]),
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${BASE}/service/${slug}#webpage`,
            url: `${BASE}/service/${slug}`,
            name: `${label} | EduShift`,
            description: lead,
            inLanguage: 'ja',
            isPartOf: { '@id': `${BASE}/#website` },
            about: { '@id': `${BASE}/service/${slug}#service` },
            publisher: { '@id': `${BASE}/#organization` },
        },
    ],
});

const CASE_TITLE = 'HP制作実績：AI経由流入約5.7倍・問い合わせ約2.8倍';
const CASE_DESC = 'YS中学受験国語力研究室のHPリニューアル事例。デザイン刷新・モーション演出・AIEO対策により、AI経由の流入が約5.7倍（実装前77日間 21 → 実装後77日間 120）、HPフォーム問い合わせが約2.8倍（月平均3.2件 → 月平均9.0件）に。2026年7月23日時点の実測データを全公開しています。';

const ROUTES = [
    servicePage('consulting', 'コンサルティング', '塾経営の立て直し、講師の独立、AI活用——月¥14,800からの伴走コンサルティング。単発¥9,800のスポット相談から始められます。'),
    servicePage('dx-development', '塾DX・ツール開発', 'バックオフィスアプリ、教材制作、指導サポートツール。自動添削SaaSを自社開発するEduShiftが、あなたの塾専用の道具を作ります。'),
    servicePage('hp-production', 'HP制作・保守運用', '初期19,800円〜、月々980円〜。「立派なHP」より「今日から選ばれるHP」を。'),
    {
        path: '/works/ys-kokugo',
        title: `${CASE_TITLE} | EduShift`,
        description: CASE_DESC,
        image: `${BASE}/ogp-works-ys.png`,
        jsonLd: [
            breadcrumb([
                { name: 'HP制作・運用', path: '/service/hp-production' },
                { name: '制作実績：YS中学受験国語力研究室', path: '/works/ys-kokugo' },
            ]),
            {
                '@context': 'https://schema.org',
                '@type': 'Article',
                '@id': `${BASE}/works/ys-kokugo#article`,
                headline: `${CASE_TITLE} — YS中学受験国語力研究室のHPリニューアル事例`,
                description: CASE_DESC,
                url: `${BASE}/works/ys-kokugo`,
                image: `${BASE}/ogp-works-ys.png`,
                inLanguage: 'ja',
                datePublished: '2026-07-12',
                dateModified: '2026-07-23',
                author: { '@id': `${BASE}/#founder` },
                publisher: { '@id': `${BASE}/#organization` },
                isPartOf: { '@id': `${BASE}/#website` },
                about: [
                    { '@type': 'Thing', name: 'AIEO（AI Engine Optimization）' },
                    { '@type': 'Thing', name: '学習塾のホームページ制作' },
                ],
            },
        ],
    },
    {
        path: '/business-law',
        title: '特定商取引法に基づく表記 | EduShift',
        description: 'EduShift（代表：吉井勝彦）の特定商取引法に基づく表記。事業者情報、料金、支払い方法・時期、サービス提供時期、キャンセル・返金の条件を記載しています。',
        jsonLd: [breadcrumb([{ name: '特定商取引法に基づく表記', path: '/business-law' }])],
    },
    {
        path: '/privacypolicy',
        title: 'プライバシーポリシー | EduShift',
        description: 'EduShift（代表：吉井勝彦）のプライバシーポリシー。個人情報の取得・利用目的・第三者提供・安全管理措置・お問い合わせ窓口について定めています。',
        jsonLd: [breadcrumb([{ name: 'プライバシーポリシー', path: '/privacypolicy' }])],
    },
    ...guideRoutes(),
];

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const setAttrContent = (html, pattern, value) => {
    if (!pattern.test(html)) throw new Error(`パターン不一致: ${pattern}`);
    return html.replace(pattern, `$1${escAttr(value)}$2`);
};

const base = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!/"FAQPage"/.test(base)) throw new Error('dist/index.html に FAQPage schema が見つかりません');

for (const route of ROUTES) {
    const url = `${BASE}${route.path}`;
    let html = base;

    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title.replace(/</g, '&lt;')}</title>`);
    html = setAttrContent(html, /(<meta name="description" content=")[^"]*(")/, route.description);
    html = setAttrContent(html, /(<link rel="canonical" href=")[^"]*(")/, url);
    html = setAttrContent(html, /(<link rel="alternate" hreflang="ja" href=")[^"]*(")/, url);
    html = setAttrContent(html, /(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, url);
    for (const ns of ['og', 'twitter']) {
        html = setAttrContent(html, new RegExp(`(<meta property="${ns}:title" content=")[^"]*(")`), route.title);
        html = setAttrContent(html, new RegExp(`(<meta property="${ns}:description" content=")[^"]*(")`), route.description);
        html = setAttrContent(html, new RegExp(`(<meta property="${ns}:url" content=")[^"]*(")`), url);
        if (route.image) {
            html = setAttrContent(html, new RegExp(`(<meta property="${ns}:image" content=")[^"]*(")`), route.image);
        }
    }

    // トップページ専用のFAQPage schemaはサブページでは可視内容と不一致になるため除去
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, (block) =>
        block.includes('"FAQPage"') ? '' : block,
    );

    // ページ固有JSON-LD。data-page-jsonld はクライアント側 MetaTags が同内容で置換する際の目印
    const script = `<script type="application/ld+json" data-page-jsonld="static">${JSON.stringify(route.jsonLd)}</script>\n</head>`;
    html = html.replace('</head>', script);

    if (route.staticBody) {
        if (!html.includes('<div id="root"></div>')) throw new Error('#root が空div形式で見つかりません');
        html = html.replace('<div id="root"></div>', `<div id="root">${route.staticBody}</div>`);
    }

    const outDir = join(DIST, ...route.path.split('/').filter(Boolean));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`prerendered: ${route.path}`);
}
