import autoTensakuImg from '../../assets/auto-tensaku-screenshot.jpg';
import jukuTimetableImg from '../../assets/app-juku-timetable.jpg';
import tutorRevenueImg from '../../assets/app-tutor-revenue.jpg';
import genpeiAppImg from '../../assets/app-genpei.jpg';
import starChartAppImg from '../../assets/app-starchart.jpg';
import tabibitozanImg from '../../assets/app-tabibitozan.jpg';

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

const TOOLS: DxApp[] = [
    {
        accent: '#4f46e5', accentBg: '#e0e7ff', accentFg: '#3730a3',
        image: autoTensakuImg, badge: 'フラッグシップ · AI × Web',
        title: 'Taskal AI — 国語記述 自動添削システム',
        url: 'https://auto-tensaku-system.vercel.app/', urlLabel: 'デモを試す',
        summary: '中学・高校・大学受験の国語記述答案を、AIが数十秒で添削・採点するWebサービス。撮影してアップロードするだけで、減点箇所と改善点、採点根拠までを提示します。企画から設計・開発・運用まで、すべてEduShiftが自社で行っている基幹プロダクトです。',
        features: [
            '答案の撮影アップロード → AIが数十秒で添削・採点',
            '「なぜこの点数か」を示す採点根拠つきフィードバック',
            '講師が最終確認・修正できるレビューフロー',
            '会員登録・決済・利用量管理を含むフルスタック構成',
        ],
        benefitLabel: '塾での使いどころ',
        benefit: '記述問題は「採点に時間がかかるから出しにくい」の代表格。その採点負担を数十秒に圧縮し、記述指導の回数そのものを増やせます。「フル」プランでは、この規模のWebアプリケーション開発をそのままお受けします。',
    },
    {
        accent: '#4f46e5', accentBg: '#e0e7ff', accentFg: '#3730a3',
        image: jukuTimetableImg, badge: '塾運営ツール · 自動生成',
        title: '塾時間割メーカー',
        url: 'https://juku-timetable.vercel.app', urlLabel: '登録なしでデモ',
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
        title: '売上ダッシュボード（カレンダーが売上台帳になる）',
        url: 'https://tutor-revenue.vercel.app/', urlLabel: 'デモを見る',
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
];

const SUBJECTS: DxApp[] = [
    {
        accent: '#047857', accentBg: '#d1fae5', accentFg: '#065f46',
        image: genpeiAppImg, badge: '社会・歴史 · 中学/高校受験',
        title: '源平合戦 3Dヒストリーマップ',
        url: 'https://yossy6028.github.io/genpei-kassen-app/', urlLabel: '触ってみる',
        summary: '3Dの日本地図の上で、源平合戦がどこで・どんな順番で起きたのかをたどれる歴史学習アプリ。合戦名だけの暗記になりがちな源平争乱を、地理と物語のセットで立体的に理解できます。',
        features: [
            '3Dマップ上で合戦の場所と時系列を可視化',
            '出来事を追える年表モード',
            '主要人物をまとめた人物図鑑',
            '理解度を確かめるクイズつき',
        ],
        benefitLabel: '生徒へのねらい',
        benefit: '「一ノ谷・屋島・壇ノ浦がどこにあり、なぜその順に戦いが移ったのか」を地図で体感。年号の丸暗記から、流れで語れる理解へ導きます。',
    },
    {
        accent: '#047857', accentBg: '#d1fae5', accentFg: '#065f46',
        image: starChartAppImg, badge: '理科・天体 · 中学/高校受験',
        title: '3D星図 — 季節と時刻で変わる星空',
        url: 'https://yossy6028.github.io/star-chart-3d/', urlLabel: '触ってみる',
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
        image: tabibitozanImg, badge: '算数・文章題 · 中学受験',
        title: '旅人算ラボ',
        url: 'https://tabibitozan.vercel.app', urlLabel: '触ってみる',
        summary: '出会い・追いつき・折り返し・池の周り・トンネル通過・鉄橋わたり——旅人算の代表7パターンを、動くアニメーションと速さダイアグラムの両方で見せる算数学習アプリ。文章題が「絵にできない」子のつまずきを解きほぐします。',
        features: [
            '旅人算の7パターンをワンタップで切り替え',
            '登場人物が実際に動くアニメーション',
            '「うごき」と「ダイアグラム」を連動表示',
            '再生速度（×0.5〜×4）を変えて観察',
        ],
        benefitLabel: '生徒へのねらい',
        benefit: '旅人算は「状況を図にできれば解ける」単元。アニメで状況を、ダイアグラムで式を橋渡しし、文章から図・式へ翻訳する力を育てます。',
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

const SUITE_URL = 'https://edushift-juku-apps.vercel.app';
const SUITE_APPS = [
    { name: '退塾リスク早期警告ボード', desc: '通塾・成績・支払いの変化から、辞めそうな生徒を先に見つける' },
    { name: '塾長KPIダッシュボード', desc: '生徒数・売上・継続率など、経営の数字をひと目で把握' },
    { name: '内申点シミュレータ（7都府県対応）', desc: '志望校に必要な内申と現在地の差を、その場で計算' },
    { name: '合格実績ダッシュボード', desc: '年度ごとの合格実績を、見せられる形で可視化' },
];

const SuiteCallout = () => (
    <div
        style={{
            background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 55%, #f5f3ff 100%)',
            border: '1px solid #c7d2fe',
            borderRadius: 24,
            padding: '32px 32px 34px',
            marginTop: 8,
            boxShadow: '0 1px 3px rgba(79,70,229,0.06)',
        }}
    >
        <div style={pill('#4f46e5', '#e0e7ff', '#3730a3')}>公開中のデモ · 塾バックオフィス・スイート</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.5 }}>
            塾経営を支える4つのボードを、<br />ログイン不要でそのまま触れます。
        </h3>
        <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.9, margin: '0 0 20px' }}>
            退塾リスクの早期発見から経営数字の可視化、内申点シミュレーション、合格実績の見える化まで。塾のバックオフィスをまるごと支えるツール群を、会員登録なしで実際にお試しいただけます。稼働中の<strong style={{ color: '#4338ca' }}>塾時間割メーカー</strong>・<strong style={{ color: '#4338ca' }}>売上ダッシュボード</strong>にも、ここから移動できます。
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px 20px' }}>
            {SUITE_APPS.map((a) => (
                <li key={a.name} style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, paddingLeft: 22, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, color: '#4f46e5', fontWeight: 700 }}>✓</span>
                    <strong style={{ color: '#0f172a' }}>{a.name}</strong><br />
                    <span style={{ fontSize: 13, color: '#475569' }}>{a.desc}</span>
                </li>
            ))}
        </ul>
        <a
            href={SUITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 26px',
                borderRadius: 999,
                background: '#4f46e5',
                color: 'white',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 6px 16px rgba(79,70,229,0.25)',
            }}
        >
            スイートのデモを開く ↗
        </a>
    </div>
);

const AppCard = ({ app }: { app: DxApp }) => (
    <div style={cardOuter}>
        <a href={app.url} target="_blank" rel="noopener noreferrer">
            <img src={app.image} alt={`${app.title}の画面`} loading="lazy" style={shotStyle} />
        </a>
        <div style={{ padding: '28px 32px' }}>
            <div style={pill(app.accent, app.accentBg, app.accentFg)}>{app.badge}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, lineHeight: 1.5 }}>{app.title}</h3>
            <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.9, marginBottom: 18 }}>{app.summary}</p>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>主な機能</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px' }}>
                {app.features.map((f, i) => (
                    <li key={i} style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, paddingLeft: 22, position: 'relative', marginBottom: 8 }}>
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
                {app.urlLabel} ↗
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
                    EduShiftが企画・設計・開発・運用まで自社で手がけたアプリを、実際に触れる形で公開しています。<br />
                    塾の事務を軽くする<strong style={{ color: '#4338ca' }}>運営ツール</strong>から、生徒の理解を助ける<strong style={{ color: '#047857' }}>教科アプリ</strong>まで。ひとつずつ、何ができるのかをご紹介します。
                </p>
            </div>

            <SuiteCallout />

            <h3 style={groupTitleStyle}>
                <span style={{ color: '#4f46e5' }}>◆</span> 塾の運営を軽くするツール
            </h3>
            <p style={groupLeadStyle}>集客・事務・売上管理。授業のあとに残る&quot;教える以外&quot;の作業を、道具に変えます。</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {TOOLS.map((app) => <AppCard key={app.title} app={app} />)}
            </div>

            <h3 style={groupTitleStyle}>
                <span style={{ color: '#047857' }}>◆</span> 生徒の理解を助ける教科アプリ
            </h3>
            <p style={groupLeadStyle}>暗記や文章題でつまずきやすい単元を、「動き」と「図」で直感的に理解できる教材アプリです。</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {SUBJECTS.map((app) => <AppCard key={app.title} app={app} />)}
            </div>
        </div>
    </section>
);
