/**
 * HP保守・運用プラン（3パターン）
 * トップページの保守プランセクションと、HP制作メニューの強調表示は
 * すべてこのファイルから参照される。プラン内容を変更するときはここだけ直せばよい。
 */

export type MaintenancePlanId = 'light' | 'basic' | 'advance';

export type MaintenancePlan = {
    id: MaintenancePlanId;
    tierEn: string;
    name: string;
    price: number;
    features: string[];
    note: string;
};

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
    {
        id: 'light',
        tierEn: 'Insurance',
        name: 'ライト',
        price: 980,
        features: [
            '稼働監視（自動）',
            'SSL期限チェック（自動）',
            '定期バックアップ作成（自動）',
            'データ保管・ストレージ管理',
            '月1回の更新代行（修正3回まで）',
        ],
        note: '※修正4回目以降は別途有償対応となります',
    },
    {
        id: 'basic',
        tierEn: 'Office Assistant',
        name: 'ベーシック',
        price: 2980,
        features: [
            'チャットでの更新・技術相談',
            '月4回の更新代行（各更新につき修正3回まで）',
            'お知らせ・画像・テキスト修正含む',
        ],
        note: '※ライトプランのすべての内容を含みます',
    },
    {
        id: 'advance',
        tierEn: 'Strategic Partner',
        name: 'アドバンス',
        price: 29800,
        features: [
            'AI活用支援（ブログ構成案提供等）',
            'MEO対策（Map順位監視）',
            '月1回Zoom定例会（30分）',
            'アクセス解析レポート送付',
        ],
        note: '※Web担当者の代替として機能します',
    },
];

export type HomeEmphasis = {
    /** どのプランに「おすすめ」バッジを付けるか */
    recommendedPlan: MaintenancePlanId;
    /** ヘッダーナビの「HP制作」に添える短いバッジ文言（7文字以内目安） */
    hpNavBadge: string;
    /** サービス一覧のHP制作カードに載せる帯コピー */
    hpCardBadge: string;
};

// 営業戦略に応じてここだけ書き換えれば、ナビ・サービスカード・保守プランの強調表示が連動して変わる。
//  - recommendedPlan: 'light' | 'basic' | 'advance'（「いちばん選ばれています」を付けるプラン）
//  - hpNavBadge: ヘッダーナビ「HP制作」ピルの小バッジ（7文字前後まで）
//  - hpCardBadge: サービス一覧のHP制作カード上のリボン文言
export const HOME_EMPHASIS: HomeEmphasis = {
    recommendedPlan: 'basic',
    hpNavBadge: '¥19,800〜',
    hpCardBadge: 'いちばん選ばれています',
};
