/**
 * 事例ページのデータ。数値の出典・集計方法は
 * docs/plans/2026-07-12-ys-case-study-design.md を参照。
 * 数値を変更する場合は必ず再集計の上、設計ドキュメントも更新すること。
 */

export interface CaseMetric {
    label: string;      // 例: HPフォーム問い合わせ
    before: string;     // 例: 月平均3.2件
    after: string;      // 例: 月平均9.0件
    multiplier: string; // 例: 約2.8倍
    note?: string;
}

export interface MonthlyCount {
    month: string; // 例: 2026-04
    count: number;
    highlight?: boolean; // リニューアル後の月
}

/** 集計の時点日付。再集計時はここを更新すれば注記・disclaimerに反映される */
const AS_OF = '2026年7月23日';

export const YS_CASE = {
    slug: 'ys-kokugo',
    siteName: 'YS中学受験国語力研究室',
    siteUrl: 'https://kokugoryoku-up.com',
    renewalDate: '2026年4月下旬',
    asOf: AS_OF,
    beforeCapturedAt: '2026年2月時点',
    heroCopy: '「きれいなHP」で終わらせない。問い合わせが来るHPへ。',
    metrics: [
        { label: 'HPフォーム問い合わせ', before: '月平均3.2件', after: '月平均9.0件', multiplier: '約2.8倍',
          note: 'リニューアル前(2025/8〜2026/4)9ヶ月29件と、後の完了月(2026/5〜6)18件の月平均比較。2026年7月は23日時点で既に11件' },
        { label: '学習相談（商談化）', before: '月2.0件', after: '月5.5件', multiplier: '約2.8倍',
          note: '事前アンケート回答数。前=2026/1〜4(8件)、後=完了月2026/5〜6(11件)の月平均。7月は23日時点で既に6件' },
        { label: 'HP/WEB検索経由の流入', before: '8件中2件', after: '17件中11件（65%）', multiplier: '主経路に',
          note: '学習相談アンケート「知ったきっかけ」。前=2026/1〜4の回答8件、後=2026/5〜7/23の回答17件。X経由からHP経由へ逆転' },
    ] satisfies CaseMetric[],
    monthly: [
        { month: '2025-08', count: 1 }, { month: '2025-09', count: 5 },
        { month: '2025-10', count: 2 }, { month: '2025-11', count: 3 },
        { month: '2025-12', count: 3 }, { month: '2026-01', count: 4 },
        { month: '2026-02', count: 3 }, { month: '2026-03', count: 4 },
        { month: '2026-04', count: 4 },
        { month: '2026-05', count: 7, highlight: true },
        { month: '2026-06', count: 11, highlight: true },
        { month: '2026-07', count: 11, highlight: true }, // 7/23時点
    ] satisfies MonthlyCount[],
    /**
     * 「絶対数が少なく見える」問題への文脈提示コールアウト（満席ストーリー型・2026-07-13追加）。
     * 「レギュラー授業は満席」は問い合わせへの実際の返信メールに基づく事実（2026年7月時点）。
     * 満席状態が変わったら本文を必ず更新すること。
     */
    scaleContext: {
        label: 'Scale Context',
        title: '月に9件は、多いのか？',
        paragraphs: [
            '個人のオンライン講師が責任を持って指導できるのは、せいぜい30名程度です。その規模にとって、月9件（年換算108件）の問い合わせは十分すぎる母数です。',
            '実際、リニューアル後にレギュラー授業は満席となり、現在は不定期のスポット授業のみのご案内となっています（2026年7月時点）。',
        ],
    },
    chartNotes: [
        `2026年7月は、${AS_OF}時点の件数です。`,
        '月次比較のため、公開月である2026年4月まではリニューアル前として集計しています。',
        '前年（2025年）6月・7月のHPフォーム問い合わせは0件でした。',
    ],
    disclaimer: `本事例は個別の実績であり、成果を保証するものではありません。問い合わせ件数はHPフォーム経由のメール通知をスレッド単位で集計し、営業目的のメールを除外しています（${AS_OF}時点）。前年同期（2025年6月・7月）のHPフォーム問い合わせは0件でした。AI経由の流入はGoogle Analytics 4の参照元（chatgpt.com等）に基づく集計で、サイト全体の流入に占める割合は約1.4%です（2026年7月23日時点）。問い合わせ・流入の増加には時期や発信活動など他の要因が影響している可能性があり、リニューアルやAIEO対策単独の効果を示すものではありません。`,
} as const;

/** ヒーロー・導線コピーの主役数字。「問い合わせ」文言とセットで使う */
export const YS_LEAD_METRIC = YS_CASE.metrics[0];

/** AIEO実測の集計時点。GA4再集計時はここを更新 */
const AIEO_AS_OF = '2026年7月23日';

/**
 * AIEO（AI経由流入）の実測データ。
 * 出典: GA4 プロパティ294686382、参照元が chatgpt.com / openai / gemini / copilot 等のセッション。
 * フォーム問い合わせ（YS_CASE.metrics）とは集計ソースが異なるため、混在させないこと。
 * AIEO実装は2026年4月27日。4月のセッションの大半は実装前（HP全体リニューアル期）のもの。
 */
export const YS_AIEO = {
    asOf: AIEO_AS_OF,
    implementedAt: '2026年4月27日',
    metrics: [
        { label: 'AI経由の流入（ChatGPT等）', before: '実装前77日間 21', after: '実装後77日間 120',
          multiplier: '約5.7倍',
          note: 'AIEO実装（2026/4/27）前後の同日数（77日間）でのセッション数比較。参照元の内訳はほぼChatGPT（chatgpt.com / openai）' },
        { label: 'AI経由訪問の行動率', before: '検索経由 0.5%', after: 'AI経由 6.9%',
          multiplier: '約15倍',
          note: '問い合わせ等のキーイベントに至ったセッションの割合（2026/4/27〜7/23）。平均滞在もAI経由214秒 vs 検索経由156秒' },
    ] satisfies CaseMetric[],
    monthly: [
        { month: '2026-01', count: 14 }, { month: '2026-02', count: 7 },
        { month: '2026-03', count: 0 }, { month: '2026-04', count: 17 },
        { month: '2026-05', count: 33, highlight: true },
        { month: '2026-06', count: 72, highlight: true },
        { month: '2026-07', count: 38, highlight: true }, // 7/23時点
    ] satisfies MonthlyCount[],
    chartNotes: [
        `2026年7月は、${AIEO_AS_OF}時点の件数です。`,
        'AIEOは2026年4月27日に実装。4月のセッションの大半は実装前のものです。',
        'AI経由の流入は全体の約1.4%です。件数は小さい一方、問い合わせ等の行動に至る割合が検索経由より高いのが特徴です。',
    ],
} as const;

/** ヒーロー・トップ導線の主役に据えるAI経由流入の指標（GPT流入をトップに置く方針・2026-07-13） */
export const YS_AI_LEAD_METRIC = YS_AIEO.metrics[0];

/** CaseStudyBanner用。AI経由流入を先頭に置いた3指標 */
export const YS_BANNER_METRICS: CaseMetric[] = [
    YS_AIEO.metrics[0],
    YS_CASE.metrics[0],
    YS_CASE.metrics[1],
];
