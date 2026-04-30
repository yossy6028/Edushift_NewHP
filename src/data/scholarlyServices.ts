export type VoiceTestimonial = {
    sectionTitle?: string;
    sectionSublead?: string;
    avatarLetter?: string;
    situationLabel?: string;
    changesLabel?: string;
    futureLabel?: string;
    name: string;
    currentRole: string;
    careerMeta: { label: string; value: string }[];
    situation: string;
    changes: { title: string; body: string }[];
    future: string;
    quote: string;
};

export type PricingTier = {
    name: string;
    blurb: string;
    price: string;
    priceUnit?: string;
    features: string[];
    notes?: string[];
    recommended?: boolean;
};

export type PricingBlock = {
    headline: string;
    lede: string;
    tiers: PricingTier[];
    footnote?: string;
};

export type ServiceContent = {
    slug: string;
    label: string;
    labelEn: string;
    category: 'pillar' | 'tool';
    eyebrow: string;
    heroTitle: string;
    heroLead: string;
    narrativeHeadline: string;
    narrativeParas: string[];
    supportItems: { title: string; body: string }[];
    extraSections?: { heading: string; body: string }[];
    voice?: VoiceTestimonial;
    pricingBlock?: PricingBlock;
    ctaHeadline: string;
};

export const SCHOLARLY_SERVICES: Record<string, ServiceContent> = {
    'school-support': {
        slug: 'school-support',
        label: '小規模塾経営サポート',
        labelEn: 'School Management',
        category: 'pillar',
        eyebrow: 'Pillar · 01',
        heroTitle: '地域に愛される塾を、\n持続可能なビジネスへ。',
        heroLead: '生徒10〜50名規模の塾に特化した、経営の"仕組み化"パートナー。',
        narrativeHeadline: '「良い授業」だけでは、\n塾は生き残れない時代へ。',
        narrativeParas: [
            '少子化、大手塾の進出、オンライン教育の普及。小規模塾を取り巻く環境は年々厳しさを増しています。しかし、地域密着型の小規模塾にしかできない「きめ細やかな指導」と「信頼関係」は、AI時代においても決して失われない価値です。',
            'EduShiftは、その価値を最大限に高めながら、経営の「仕組み化」をサポートします。属人化しがちな業務を整理し、安定した収益基盤と、先生自身が教育に向き合える時間を創出します。',
        ],
        supportItems: [
            { title: '収益構造の適正化', body: '適正な授業料設定、コース設計の見直しにより、利益率を改善します。データで現状を可視化してから着手します。' },
            { title: '集客・ブランディング', body: 'チラシ頼みの集客から脱却し、WebやSNSを活用した現代的なマーケティングを構築します。' },
            { title: '保護者対応のシステム化', body: '対応品質を落とさずに、コミュニケーションコストを削減する仕組みを導入します。' },
        ],
        voice: {
            sectionTitle: '卒業で大量流出の危機から、<em>新規20名以上</em>の春へ。',
            sectionSublead: '中3生18名が一斉に卒業して生徒数が急減する寸前だった小規模塾が、どのようにして長期安定運営の軌道に乗ったのか。',
            avatarLetter: 'J',
            situationLabel: '塾の概要と課題',
            changesLabel: 'EduShiftが実施した施策',
            futureLabel: '成果 · その後の軌道',
            name: '埼玉県 某個別指導塾',
            currentRole: '塾長ワンオペ運営 / 生徒数30名規模',
            careerMeta: [
                { label: '所在地・規模', value: '埼玉県 / 生徒約30名' },
                { label: '運営形態', value: '塾長の完全ワンオペ' },
            ],
            situation:
                '中3生が18名と多く、来期にはほぼ全員が卒業により抜けてしまうことが予想される状態でした。来期以降の集客に非常に不安がある一方、塾長は完全ワンオペ授業で、明確なカリキュラムもなく、来た生徒に対して塾長の判断でやるべき課題をその場で決めて指導する形に。経営と指導の両方が属人化し、再現性のある集客・運営の土台がありませんでした。',
            changes: [
                {
                    title: 'カリキュラムのカスタマイズ',
                    body: '学年別・到達度別に学習進度を体系化し、塾長の裁量に頼らなくても指導が回る"塾独自のカリキュラム"を構築。指導品質を属人化から仕組みへ移行しました。',
                },
                {
                    title: 'コース設定と時間割の再設計',
                    body: '学年と目的に応じたコースを設定し、曜日・時間割を最適化。保護者が申し込みやすく、塾長の指導負荷も平準化される構造に作り直しました。',
                },
                {
                    title: 'ホームページの改修',
                    body: '"選ばれる塾"に必要な情報（コース・料金・指導方針・塾長の人柄）を整理し、問い合わせまでの動線を明確化。Web経由での新規接点を生む土台を整備しました。',
                },
                {
                    title: 'マーケティング施策の改善',
                    body: 'チラシ偏重から、HP・Googleマップ・地域連携を組み合わせた複線的な集客へ。保護者の比較検討フェーズに合わせたタッチポイントを設計しました。',
                },
            ],
            future:
                '様々な施策を打ち出すことで集客が劇的に改善。翌年の春には新規の中学1年生を20名以上集客することができ、卒業による流出不安を解消。長期的な安定運営の軌道に乗せることができた事例です。',
            quote: 'カリキュラムの見直しと集客の両輪で、塾の未来が見えた。',
        },
        ctaHeadline: 'あなたの塾の可能性を、一緒に広げませんか？',
    },
    'freelance-support': {
        slug: 'freelance-support',
        label: 'フリーランス独立支援',
        labelEn: 'Independent Tutor Support',
        category: 'pillar',
        eyebrow: 'Pillar · 02',
        heroTitle: '組織に縛られない、\n新しい教育者の生き方を。',
        heroLead: '「教えるのは好き、経営は苦手」——その気持ちに寄り添う3ヶ月の伴走プログラム。',
        narrativeHeadline: '教育スキルと経営スキルは、\n別物です。',
        narrativeParas: [
            '「もっと一人ひとりの生徒に向き合いたい」「自分の理想とする教育を追求したい」——そんな想いを持つ教育者にとって、フリーランスや独立開業は有力な選択肢です。',
            'しかし、教育スキルと経営スキルは別物です。集客、契約、経理、セルフブランディング……。EduShiftは、教育業界での経験を活かし、あなたが「稼げる教育者」として自立するためのトータルサポートを提供します。孤独になりがちな独立への道を、私たちが伴走します。',
        ],
        supportItems: [
            { title: '事業計画・ポジショニング', body: 'あなたの強みを分析し、競合と差別化できる独自の立ち位置と収益モデルを構築します。' },
            { title: 'Web集客・ブランディング', body: 'HP制作、SNS運用、ポートフォリオ作成など、理想の生徒に出会うための発信力を強化します。' },
            { title: '契約・実務サポート', body: 'トラブルを防ぐ契約書のひな形提供や、確定申告などの実務面もアドバイスします。' },
        ],
        voice: {
            name: '元小学校教員 Sさん',
            currentRole: '現在：非常勤講師 ＋ オンライン家庭教師',
            careerMeta: [
                { label: '経歴', value: '小学校教員13年（担任・生徒指導主事）' },
                { label: '専門', value: '中学受験国語' },
            ],
            situation:
                '中学受験の経験も知識もなく、全くの未経験でした。「本当に指導できるのか？」「家族を養っていけるのか？」という不安が大きく、集客方法も全くわからない状態からのスタートでした。',
            changes: [
                {
                    title: '指導・成約スキルの向上',
                    body: '本文の読み方・解き方など基礎から指導いただき、生徒の「間違える理由」や「正答への思考プロセス」を深く分析できるようになりました。保護者対応のポイントも学び、スムーズな成約に繋がっています。',
                },
                {
                    title: '集客と実績の拡大',
                    body: 'SNSやブログの指導を受け地道に発信を続けた結果、お問い合わせが定期的に入るように。開始3ヶ月で1人だった生徒が、1年半で12人まで増加しました。',
                },
            ],
            future:
                '教員時代の「雑務に追われ授業準備ができない」ストレスから解放され、今は生徒一人ひとりのためにしっかり準備・指導できるやりがいを感じています。来年度は教員時代の収入を超える見込みです。',
            quote: '理想の働き方を考えて、必要な行動をしていくことが大切です。',
        },
        ctaHeadline: '理想のキャリアを、ここから始めましょう。',
    },
    'ai-consulting': {
        slug: 'ai-consulting',
        label: 'AI導入コンサルティング',
        labelEn: 'AI Integration',
        category: 'tool',
        eyebrow: 'Tool · 01',
        heroTitle: '最新技術を、\n教育現場の「力」に変える。',
        heroLead: '「先生をスーパーマンにする」ためのAI活用。業務効率化から独自のAI教材開発まで。',
        narrativeHeadline: 'AIは、先生の仕事を\n奪うものではありません。',
        narrativeParas: [
            'ChatGPTをはじめとするAI技術の進化は、教育業界にも大きな変革をもたらしています。しかし、「使い方がわからない」「導入コストが不安」「温かみがなくなるのでは」といった懸念も少なくありません。',
            'EduShiftが提案するのは、「先生をスーパーマンにする」ためのAI活用です。事務作業の自動化で生徒と向き合う時間を増やし、AI教材で個別に最適化された指導を実現する。現場に無理なく馴染む、実用的な導入支援を行います。',
        ],
        supportItems: [
            { title: '業務フローの自動化', body: '日報作成、保護者連絡、シフト管理など、煩雑な事務作業をAIで効率化します。' },
            { title: 'オリジナルAI教材の作成', body: '塾独自のノウハウを学習させた、貴塾専用のAIチューターや教材生成ボットを開発します。' },
            { title: 'スタッフ向けAI研修', body: '講師やスタッフがAIをツールとして使いこなせるよう、実践的な研修を行います。' },
        ],
        ctaHeadline: 'AI活用の第一歩、踏み出しませんか？',
    },
    'hp-production': {
        slug: 'hp-production',
        label: 'HP制作・保守運用',
        labelEn: 'Web Production & Care',
        category: 'tool',
        eyebrow: 'Tool · 02',
        heroTitle: '塾のWebを、\nまるごとサポート。',
        heroLead: '初期19,800円〜、月々980円〜。「立派なHP」より「今日から選ばれるHP」を。',
        narrativeHeadline: '更新されないサイトは、\n"活動していない塾"に見える。',
        narrativeParas: [
            'HPがない塾に、毎月どれだけの問い合わせが流れているか、考えたことはありますか？EduShiftの制作プランは「完璧なHP」より「今すぐある状態」を優先します。テンプレートを活用し、デザインの自由度をあえて絞ることで、圧倒的なスピードと低価格を実現。',
            'EduShiftの保守プランは「壊れたら直す」だけじゃありません。ブログ更新・SEO改善・集客レポート——あなたの塾の「Web担当者」として、毎月継続サポートします。保守プランの詳細は / トップページの Pricing セクションをご覧ください。',
        ],
        supportItems: [
            { title: '制作 · テンプレート型スピード納品', body: '初期19,800円〜。ご依頼から最短で公開まで。デザインの自由度を絞ることで、圧倒的な低価格を実現。' },
            { title: '保守 · 3段階プラン（¥980/¥2,980/¥29,800）', body: '稼働監視・SSL管理から、チャット相談、AI活用支援・MEO対策まで。Web担当者の代わりに機能します。' },
            { title: 'ブログ運用 · AIによる記事構成提案', body: 'アドバンスプランでは月1回、AIがブログ記事の構成案を提案。更新頻度を維持してSEO効果を最大化。' },
        ],
        pricingBlock: {
            headline: 'あなたの塾の状況に合わせて選べる、3つのプラン',
            lede: '初期費用を抑えた流し込みプランから、SEO・MEO対応のプレミアムプランまで。公開までの最短期間と、"選ばれる仕組み"のバランスでお選びください。',
            tiers: [
                {
                    name: 'ライト',
                    blurb: '最速1週間で公開。まず"存在する塾"になる',
                    price: '¥19,800',
                    priceUnit: '税抜',
                    features: [
                        'LP（1枚構成）',
                        '厳選テンプレート使用',
                        'スマートフォン対応',
                        'お問合せフォーム設置',
                    ],
                    notes: ['※原稿・画像は完全支給', '※修正は誤字脱字のみ対応'],
                },
                {
                    name: 'スタンダード',
                    blurb: '問い合わせ導線から地図まで。選ばれる仕組みを整える',
                    price: '¥39,800',
                    priceUnit: '税抜',
                    features: [
                        'TOP + 下層3ページ',
                        'ブログ・お知らせ機能',
                        'Googleマップ連携',
                        '過去サイトからの移行相談',
                    ],
                    notes: ['※基本レイアウトへの流し込み', '※納品前の確認1回のみ対応'],
                    recommended: true,
                },
                {
                    name: 'プレミアム',
                    blurb: '"うちを選ぶ理由"を言語化。地域で頭ひとつ抜け出すHP',
                    price: '¥98,000',
                    priceUnit: '税抜',
                    features: [
                        'TOP + 下層5〜7ページ',
                        '戦略的ライティング支援',
                        'Googleマップ (MEO) 連携',
                        '内部SEO初期設定',
                    ],
                    notes: ['※オリジナル要素の追加', '※詳細な修正対応（規定範囲内）'],
                },
            ],
            footnote: '公開後の保守・運用プラン（¥980/¥2,980/¥29,800）は、/ のトップページでご確認いただけます。',
        },
        ctaHeadline: '"選ばれるHP"を、今日から始めませんか？',
    },
};
