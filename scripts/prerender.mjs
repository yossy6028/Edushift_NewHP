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
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

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
const CASE_DESC = 'YS中学受験国語力研究室のHPリニューアル事例。デザイン刷新・モーション演出・AIEO対策により、AI経由の流入が約5.7倍（実装前77日間 21 → 実装後77日間 120）、HPフォーム問い合わせが約2.8倍（月平均3.2件 → 月平均9.0件）に。2026年7月13日時点の実測データを全公開しています。';

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
                dateModified: '2026-07-13',
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

    const outDir = join(DIST, ...route.path.split('/').filter(Boolean));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`prerendered: ${route.path}`);
}
