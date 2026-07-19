import autoTensakuImg from '../../assets/auto-tensaku-screenshot.jpg';
import jukuTimetableImg from '../../assets/app-juku-timetable.jpg';
import tutorRevenueImg from '../../assets/app-tutor-revenue.jpg';
import furikaeImg from '../../assets/app-furikae.jpg';
import akiwakuImg from '../../assets/app-akiwaku.jpg';
import taikenImg from '../../assets/app-taiken.jpg';
import genpeiAppImg from '../../assets/app-genpei.jpg';
import starChartAppImg from '../../assets/app-starchart.jpg';
import shokuensuiImg from '../../assets/app-shokuensui.jpg';
import kairoImg from '../../assets/app-kairo.jpg';
import { DX_APP_URLS } from '../../data/dxAppLinks';

type DxApp = {
    accent: string;
    accentBg: string;
    accentFg: string;
    image: string;
    badge: string;
    title: string;
    url: string;
    urlLabel: string;
    summary: string;
    features: string[];
    benefitLabel: string;
    benefit: string;
};

const BACK_OFFICE_APPS: DxApp[] = [
    {
        accent: '#4f46e5', accentBg: '#e0e7ff', accentFg: '#3730a3',
        image: jukuTimetableImg, badge: '塾運営ツール · 自動生成',
        title: '塾時間割メーカー',
        url: DX_APP_URLS.timetable, urlLabel: '登録なしでデモ',
        summary: '講師の出勤日、生徒の部活・都合、科目の相性、担任の固定、ブースの空き——パズルのように絡み合う条件を全部満たす週間時間割を、数秒で自動生成します。個別指導塾・自立型学習塾向けのSaaSです。',
        features: [
            '講師・生徒・コマ・ブースの条件を登録する6ステップUI',
            '全条件を満たす割当を数秒で自動生成',
            '1:2ペア率・制約違反件数などの品質を数値で表示',
            '平常月と講習期、2つの編成モードに対応',
        ],
        benefitLabel: '塾での使いどころ',
        benefit: '毎週何時間もかけて手作業で組んでいた時間割が、条件を入れれば数秒で仕上がります。「あの先生とこの生徒は相性が…」といった暗黙の制約も、ルールとして登録して守らせられます。',
    },
    {
        accent: '#4f46e5', accentBg: '#e0e7ff', accentFg: '#3730a3',
        image: tutorRevenueImg, badge: '個人講師向け · 売上管理',
        title: '講師向け 売上ダッシュボード',
        url: DX_APP_URLS.revenue, urlLabel: 'デモを見る',
        summary: 'いつも使っているGoogleカレンダーの授業予定を読み取り、月次売上・年間累計・前年比までを自動で集計するダッシュボード。月末のスプレッドシート転記も、振替だらけの月謝チェックも不要になります。オンライン個別講師のための売上台帳です。',
        features: [
            'Googleカレンダー連携で授業実績を自動集計',
            'レギュラー授業・スポット授業を区別して計上',
            '月次売上・年間累計・前年同月比を自動可視化',
            '年度=2月始まりなど、塾の会計サイクルに対応',
        ],
        benefitLabel: '塾での使いどころ',
        benefit: '「今月いくら稼げたか」を、カレンダーに授業を入れるだけで常に把握できます。転記ミスや計算漏れが起きる場所を、そもそも無くす設計です。',
    },
    {
        accent: '#4f46e5', accentBg: '#e0e7ff', accentFg: '#3730a3',
        image: furikaeImg, badge: '欠席対応 · 日程調整',
        title: '振替パズル',
        url: DX_APP_URLS.furikae, urlLabel: 'デモを試す',
        summary: '欠席する授業を選ぶと、講師・教室・生徒の予定を照合し、実際に振替できる日時だけを候補として提示する調整ツールです。空き状況を何度も見比べる作業と、保護者への候補日連絡をひとつの流れにまとめます。',
        features: [
            '時間割上の授業をタップして欠席登録を開始',
            '講師・教室・生徒の3条件をまとめて照合',
            '候補が複数ある場合から満枠の場合まで結果を整理',
            '振替候補と保護者向け連絡文を続けて準備',
        ],
        benefitLabel: '塾での使いどころ',
        benefit: '電話やメッセージのたびに時間割を開き、講師と教室の空きを探し直す手間を減らします。候補を出すまでの時間が短くなり、連絡漏れや二重予約も防ぎやすくなります。',
    },
    {
        accent: '#4f46e5', accentBg: '#e0e7ff', accentFg: '#3730a3',
        image: akiwakuImg, badge: '候補日時 · 共有リンク',
        title: '空き枠リンクメーカー',
        url: DX_APP_URLS.akiwaku, urlLabel: 'デモを試す',
        summary: '講師の空いているコマを選ぶだけで、保護者へ送る候補日時の文面と予約ページの見本を同時に作るツールです。日付・曜日・時間を毎回手入力する作業をなくし、候補提示を短時間で整えます。',
        features: [
            '今週・来週の講師スケジュールを一覧表示',
            '空きコマをタップして複数の候補枠を選択',
            '選択内容から保護者向け文面を自動整形',
            '予約ページ風プレビューとコピー機能を用意',
        ],
        benefitLabel: '塾での使いどころ',
        benefit: '面談、振替、追加授業の候補日時を送るたびに起きる転記ミスを減らせます。保護者側も空き枠を一覧で確認できるため、何往復もする日程調整を短くできます。',
    },
    {
        accent: '#4f46e5', accentBg: '#e0e7ff', accentFg: '#3730a3',
        image: taikenImg, badge: '集客導線 · 予約受付',
        title: '体験授業 予約ウィジェットメーカー',
        url: DX_APP_URLS.taiken, urlLabel: 'デモを試す',
        summary: '塾名・ブランド色・コース・受付曜日・時間帯を設定し、ホームページに組み込む体験授業予約画面をその場で試作できます。見た目を確認するだけでなく、実際の塾ホームページへの導入まで想定したデモです。',
        features: [
            '塾名・ブランド色・案内文をリアルタイムで反映',
            '最大3コースと受付曜日・時間帯を設定',
            '実際の塾HPに置いた状態をプレビュー',
            '埋め込みコードの見本を自動生成・コピー',
        ],
        benefitLabel: '塾での使いどころ',
        benefit: '問い合わせ後に日程を調整するのではなく、ホームページを見た保護者が空き枠を選べる入口を作れます。申し込みまでの手間を減らし、体験授業への導線を分かりやすくできます。',
    },
];

const LEARNING_APPS: DxApp[] = [
    {
        accent: '#047857', accentBg: '#d1fae5', accentFg: '#065f46',
        image: autoTensakuImg, badge: '国語・記述 · AI添削',
        title: '国語記述 自動添削システム',
        url: DX_APP_URLS.autoTensaku, urlLabel: 'デモを試す',
        summary: '中学・高校・大学受験の国語記述答案を、AIが数十秒で添削・採点するWebサービス「Taskal AI」です。答案を撮影してアップロードするだけで、減点箇所・改善点・採点根拠まで提示します。企画から設計・開発・運用までEduShiftが自社で行っています。',
        features: [
            '答案画像のアップロードから添削・採点までを自動化',
            '点数だけでなく、減点理由と改善案を提示',
            '講師が最終確認・修正できるレビューフロー',
            '会員登録・決済・利用量管理を含むWebサービス構成',
        ],
        benefitLabel: '生徒・講師への効果',
        benefit: '採点負担を数十秒まで圧縮し、記述問題を出す回数と書き直す機会を増やします。講師の判断を残しながら、添削の初動を速くする設計です。',
    },
    {
        accent: '#047857', accentBg: '#d1fae5', accentFg: '#065f46',
        image: starChartAppImg, badge: '理科・天体 · 中学/高校受験',
        title: '星座学習アプリ',
        url: DX_APP_URLS.starChart, urlLabel: '触ってみる',
        summary: '季節・日付・時刻のスライダーを動かすと、星空がどう変化するかをその場で体感できる天体学習アプリ。受験理科でつまずきやすい「時刻と星の動き」を、静止した図ではなく動きで理解できます。',
        features: [
            '季節・時刻スライダーで星空の変化を再現',
            '東西南北、方角ごとの見え方を確認',
            '主要な星座の位置を3Dで把握',
            '星座あてクイズで定着を確認',
        ],
        benefitLabel: '生徒へのねらい',
        benefit: '「南の空の星は左から右へ動く」「季節で見える星座が変わる」といった、言葉だけでは掴みにくい天体の規則を、手を動かしながら腹落ちさせます。',
    },
    {
        accent: '#047857', accentBg: '#d1fae5', accentFg: '#065f46',
        image: genpeiAppImg, badge: '社会・歴史 · 中学/高校受験',
        title: '源平合戦 学習アプリ',
        url: DX_APP_URLS.genpei, urlLabel: '触ってみる',
        summary: '3Dの日本地図の上で、源平合戦がどこで・どんな順番で起きたのかをたどれる歴史学習アプリです。1180年の挙兵から壇ノ浦、鎌倉幕府成立までを、場所・人物・物語のつながりで理解できます。',
        features: [
            '3Dマップ上で合戦の場所と時系列を可視化',
            '主要な出来事を順番に追う物語モード',
            '源氏・平氏の主要人物をまとめた人物図鑑',
            '理解度を確かめるクイズを搭載',
        ],
        benefitLabel: '生徒へのねらい',
        benefit: '「一ノ谷・屋島・壇ノ浦がどこにあり、なぜその順に戦いが移ったのか」を地図で体感できます。合戦名と年号の丸暗記から、流れを説明できる理解へつなげます。',
    },
    {
        accent: '#047857', accentBg: '#d1fae5', accentFg: '#065f46',
        image: shokuensuiImg, badge: '算数・理科 · 割合と水溶液',
        title: '食塩水の濃度ラボ',
        url: DX_APP_URLS.shokuensui, urlLabel: '触ってみる',
        summary: '水と食塩の量をスライダーで変えながら、濃度の変化を3Dビーカーで確かめる体感型教材です。2つの食塩水を混ぜたとき、濃度を単純に足せない理由も、食塩と全体量の動きから理解できます。',
        features: [
            '水と食塩の量を動かし、濃度をリアルタイム計算',
            '食塩の粒を3Dビーカー内で可視化・回転・拡大',
            '2つの食塩水を混ぜた結果と計算式を表示',
            '誤答例と正しい考え方を並べて解説',
        ],
        benefitLabel: '生徒へのねらい',
        benefit: '公式を覚える前に、「水が増えると薄くなる」「食塩が増えると濃くなる」という量の関係を目で確かめられます。中学受験算数の食塩水と、中学理科の水溶液をつなぐ教材です。',
    },
    {
        accent: '#047857', accentBg: '#d1fae5', accentFg: '#065f46',
        image: kairoImg, badge: '理科・電流 · 小学/中学',
        title: '電流回路スロット',
        url: DX_APP_URLS.kairo, urlLabel: '触ってみる',
        summary: '電池・豆電球・スイッチを3Dの実験台に置き、回路が一周つながると点灯する仕組みを確かめる学習アプリです。直列・並列からショート回路まで、複数の回路を切り替えて比較できます。',
        features: [
            '自由実験と直列・並列・スイッチなど15モード',
            'スロットを選んで電池・豆電球を設置・取り外し',
            '点灯状態と電流の通り道を視覚的に表示',
            '電球の明るさを考える確認クイズを搭載',
        ],
        benefitLabel: '生徒へのねらい',
        benefit: '回路図だけでは見落としやすい「電気は切れ目のない一周の道を流れる」という基本を、組み立てと点灯で確認できます。直列と並列の明るさの違いも比較しやすくなります。',
    },
];

const pill = (border: string, bg: string, fg: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: 999,
    background: bg,
    color: fg,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.05em',
    marginBottom: 12,
    border: `1px solid ${border}33`,
});

const cardOuter: React.CSSProperties = {
    background: 'white',
    borderRadius: 24,
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
};
const shotStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '1200 / 750',
    objectFit: 'cover',
    objectPosition: 'top center',
    borderBottom: '1px solid #e2e8f0',
    display: 'block',
};
const groupTitleStyle: React.CSSProperties = {
    fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 44, marginBottom: 6,
    display: 'flex', alignItems: 'center', gap: 10,
};
const groupLeadStyle: React.CSSProperties = { fontSize: 14.5, color: '#475569', marginBottom: 24, lineHeight: 1.8 };

const AppCard = ({ app }: { app: DxApp }) => (
    <div style={cardOuter}>
        <img src={app.image} alt={`${app.title}の画面`} loading="lazy" style={shotStyle} />
        <div style={{ padding: '28px 32px' }}>
            <div style={pill(app.accent, app.accentBg, app.accentFg)}>{app.badge}</div>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, lineHeight: 1.5 }}>{app.title}</h4>
            <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.9, marginBottom: 18 }}>{app.summary}</p>
            <h5 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>主な機能</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px' }}>
                {app.features.map((f) => (
                    <li key={f} style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, paddingLeft: 22, position: 'relative', marginBottom: 8 }}>
                        <span style={{ position: 'absolute', left: 0, top: 0, color: app.accent, fontWeight: 700 }}>✓</span>
                        {f}
                    </li>
                ))}
            </ul>
            <div style={{ borderLeft: `4px solid ${app.accent}`, paddingLeft: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: app.accent, fontWeight: 700, marginBottom: 4 }}>{app.benefitLabel}</div>
                <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.8, margin: 0 }}>{app.benefit}</p>
            </div>
            <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: app.accent, textDecoration: 'none' }}
            >
                {app.urlLabel} <span aria-hidden="true">↗</span>
                <span className="sr-only">（新しいタブで開きます）</span>
            </a>
        </div>
    </div>
);

export const DxProductGallery = () => (
    <section
        style={{
            padding: '80px 0',
            background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #ecfdf5 100%)',
            borderTop: '1px solid #d1fae5',
            borderBottom: '1px solid #d1fae5',
        }}
    >
        <div className="s-container" style={{ maxWidth: 1040 }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <span
                    style={{
                        display: 'inline-block',
                        padding: '4px 14px',
                        borderRadius: 999,
                        background: '#4f46e5',
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        marginBottom: 16,
                    }}
                >
                    Product Gallery · 開発実績
                </span>
                <h2 style={{ fontSize: 34, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>
                    「作れます」ではなく、<br />もう作って、動いています。
                </h2>
                <p style={{ fontSize: 17, color: '#334155', maxWidth: 760, margin: '0 auto 8px', lineHeight: 1.8 }}>
                    トップページで紹介している10アプリを、同じ順序で掲載しています。<br />
                    塾の事務を軽くする<strong style={{ color: '#4338ca' }}>バックオフィスアプリ</strong>から、生徒の理解を助ける<strong style={{ color: '#047857' }}>学習アプリ</strong>まで。解決する課題、主な機能、利用場面を詳しくご紹介します。
                </p>
            </div>

            <h3 style={groupTitleStyle}>
                <span style={{ color: '#4f46e5' }}>◆</span> バックオフィスアプリ
            </h3>
            <p style={groupLeadStyle}>時間割、売上、振替、候補日時、体験予約。授業の前後に発生する運営業務を、現場で使える道具に変えます。</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {BACK_OFFICE_APPS.map((app) => <AppCard key={app.title} app={app} />)}
            </div>

            <h3 style={groupTitleStyle}>
                <span style={{ color: '#047857' }}>◆</span> 学習アプリ
            </h3>
            <p style={groupLeadStyle}>記述添削、天体、歴史、食塩水、電流回路。言葉や静止画だけではつまずきやすい内容を、操作と変化で理解できる教材です。</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {LEARNING_APPS.map((app) => <AppCard key={app.title} app={app} />)}
            </div>
        </div>
    </section>
);
