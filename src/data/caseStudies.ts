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

/** 集計の時点日付。再集計時はここを更新すれば注記・disclaimerに反映される */
const AS_OF = '2026年7月12日';

export const YS_CASE = {
    slug: 'ys-kokugo',
    siteName: 'YS中学受験国語力研究室',
    siteUrl: 'https://kokugoryoku-up.com',
    renewalDate: '2026年4月下旬',
    asOf: AS_OF,
    beforeCapturedAt: '2026年2月時点',
    heroCopy: '「きれいなHP」で終わらせない。問い合わせが来るHPへ。',
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
    chartNotes: [
        `2026年7月は、${AS_OF}時点の件数です。`,
        '前年（2025年）6月・7月のHPフォーム問い合わせは0件でした。',
    ],
    disclaimer: `本事例は個別の実績であり、成果を保証するものではありません。問い合わせ件数はHPフォーム経由のメール通知をスレッド単位で集計し、営業目的のメールを除外しています（${AS_OF}時点）。前年同期（2025年6月・7月）のHPフォーム問い合わせは0件でした。`,
} as const;

/** ヒーロー・導線コピーの主役数字。「問い合わせ」文言とセットで使う */
export const YS_LEAD_METRIC = YS_CASE.metrics[0];
