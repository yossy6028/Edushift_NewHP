import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { SCHOLARLY_SERVICES } from '../../data/scholarlyServices';
import '../../styles/scholarly.css';

// AIEO section style helpers
const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: 24,
    padding: '32px 36px',
    border: '1px solid #d1fae5',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: 28,
};
const pillStyle = (border: string, bg: string, fg: string): React.CSSProperties => ({
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
const h3Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 16, lineHeight: 1.5 };
const h4Style: React.CSSProperties = { fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 18, marginBottom: 10 };
const pStyle: React.CSSProperties = { fontSize: 14.5, color: '#334155', lineHeight: 1.9, marginBottom: 16 };
const thStyle: React.CSSProperties = { border: '1px solid #e2e8f0', padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#0f172a' };
const tdStyle: React.CSSProperties = { border: '1px solid #e2e8f0', padding: '12px 16px', color: '#334155' };
const measureCardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: 16,
    padding: '24px 26px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
};

export const ServiceDetailScholarly = () => {
    const { slug = '' } = useParams();
    const svc = SCHOLARLY_SERVICES[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!svc) return <Navigate to="/" replace />;

    return (
        <div className="theme-scholarly">
            <HeaderScholarly />

            <section className="s-detail-hero">
                <div className="s-container">
                    <nav className="s-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/#services">Services</Link>
                        <span>/</span>
                        <span className="current">{svc.label}</span>
                    </nav>
                    <div className="s-detail-hero-inner">
                        <div className="s-detail-hero-meta">
                            <span className={`s-detail-chip ${svc.category}`}>{svc.eyebrow}</span>
                            <span className="s-detail-en">{svc.labelEn}</span>
                        </div>
                        <h1 className="s-detail-title">
                            {svc.heroTitle.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < svc.heroTitle.split('\n').length - 1 && <br />}</span>
                            ))}
                        </h1>
                        <p className="s-detail-lead">{svc.heroLead}</p>
                    </div>
                </div>
            </section>

            <section className="s-detail-narrative">
                <div className="s-container">
                    <div className="s-detail-narrative-grid">
                        <div className="s-detail-narrative-left">
                            <div className="s-sec-num">Why we focus on this</div>
                            <h2 className="s-detail-h2">
                                {svc.narrativeHeadline.split('\n').map((line, i) => (
                                    <span key={i}>{line}{i < svc.narrativeHeadline.split('\n').length - 1 && <br />}</span>
                                ))}
                            </h2>
                            {svc.narrativeParas.map((p, i) => (
                                <p key={i} className="s-detail-body">{p}</p>
                            ))}
                        </div>
                        <div className="s-detail-narrative-right">
                            <div className="s-detail-support">
                                <div className="s-detail-support-label">Support scope</div>
                                <h3>主なサポート内容</h3>
                                <ul>
                                    {svc.supportItems.map((it, i) => (
                                        <li key={i}>
                                            <span className="num">{String(i + 1).padStart(2, '0')}</span>
                                            <div>
                                                <h4>{it.title}</h4>
                                                <p>{it.body}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {svc.extraSections && svc.extraSections.length > 0 && (
                <section className="s-detail-extra">
                    <div className="s-container">
                        {svc.extraSections.map((sec, i) => (
                            <div key={i} className="s-detail-extra-card">
                                <div className="s-detail-extra-label">Voice</div>
                                <h3>{sec.heading}</h3>
                                <p>{sec.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {slug === 'hp-production' && (
                <section
                    style={{
                        padding: '80px 0',
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #eef2ff 100%)',
                        borderTop: '1px solid #d1fae5',
                        borderBottom: '1px solid #d1fae5',
                    }}
                >
                    <div className="s-container" style={{ maxWidth: 960 }}>
                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: 48 }}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    padding: '4px 14px',
                                    borderRadius: 999,
                                    background: '#10b981',
                                    color: 'white',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    marginBottom: 16,
                                }}
                            >
                                NEW · AIEO対策（AI Engine Optimization）
                            </span>
                            <h2 style={{ fontSize: 34, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>
                                AIに読まれるHPを、作ります。
                            </h2>
                            <p style={{ fontSize: 17, color: '#334155', maxWidth: 720, margin: '0 auto', lineHeight: 1.8 }}>
                                保護者が塾を探す方法は、Google検索からChatGPT・Perplexity・Google Geminiへの「相談」へと急速に移っています。<br />
                                EduShiftの全プランは、こうした生成AIに正しく読み取られ、正しく引用されるための構造を標準実装します。
                            </p>
                        </div>

                        {/* AIEOとは */}
                        <div style={cardStyle}>
                            <div style={pillStyle('#10b981', '#d1fae5', '#065f46')}>DEFINITION</div>
                            <h3 style={h3Style}>AIEOとは何か——「答えに選ばれるための最適化」</h3>
                            <p style={pStyle}>
                                AIEO（AI Engine Optimization）とは、ChatGPT・Perplexity・Google Gemini・Microsoft Copilot といった生成AIが質問に答える際に、自塾のHPを情報源として参照・引用してもらえるようにHPの構造とコンテンツを最適化する取り組みです。
                                日本語では「生成AI最適化」「AI検索最適化」とも呼ばれ、欧米では「GEO（Generative Engine Optimization）」という呼び方も並行して使われています。
                            </p>
                            <p style={pStyle}>
                                従来のSEO（Search Engine Optimization）が「検索結果ページの上位10件に入る」ことを目指していたのに対し、AIEOが目指すのは「AIが生成する数行の回答の中に塾名と特徴が含まれる」ことです。
                                ユーザーは検索結果を1件ずつ開いて比較するのではなく、AIが要約した1つの回答を読んで判断します。つまり<strong style={{ color: '#047857' }}>「上位10件に入る」ではなく「3件の回答候補に入る」</strong>を狙う、より厳しい競争に変わったのです。
                            </p>
                            <p style={{ ...pStyle, marginBottom: 0 }}>
                                AIEOで重要になるのは、HPの「読まれやすさ」ではなく「引用されやすさ」。AIに「この一文を切り取れば、塾の特徴が完結する」と思わせる構造化と、固有名詞・数値・地名を明確に含む自然文の両立が鍵になります。
                            </p>
                        </div>

                        {/* Background */}
                        <div style={cardStyle}>
                            <div style={pillStyle('#6366f1', '#e0e7ff', '#3730a3')}>BACKGROUND</div>
                            <h3 style={h3Style}>なぜ今、AIEO対策が必要なのか</h3>

                            <h4 style={h4Style}>① 保護者の塾選びの起点が「検索」から「AIへの相談」に変わった</h4>
                            <p style={pStyle}>
                                これまで塾選びの起点は、Googleで「地域名＋塾」と検索することでした。表示された10件の中から保護者がHPを開き、料金・実績・授業内容を比較するという、いわゆるSEOの時代です。
                                ところが2024年から2025年にかけて、保護者の行動は大きく変わりました。世界の生成AI週間アクティブユーザーは ChatGPT 単独で5億人を超え、日本でも保護者世代の利用率が急上昇しています。
                                「うちの子は中堅校志望、共働きで送り迎えが厳しい、月3万円以内で。飯能で合う塾を3つ教えて」——こうした<strong style={{ color: '#047857' }}>条件を文章でAIに相談し、AIが提示した数件だけを比較する</strong>パターンが、いまや塾検討の主流になりつつあります。
                            </p>

                            <h4 style={h4Style}>② SEOで勝てているHPが、AIに引用されるとは限らない</h4>
                            <p style={pStyle}>
                                AIが「どの塾を答えに含めるか」を決めているのは、HPの中身です。AIはクローラーで塾のHPを読み取り、構造化されたデータと自然文を解釈し、回答候補に入れるかどうかを判断します。
                                ところが、<strong style={{ color: '#047857' }}>SEOで上位を取れているHPが、必ずしもAIに引用されるとは限りません</strong>。Googleの検索アルゴリズムは「リンクの多さ」「ページ滞在時間」など人間の挙動を見ますが、AIは「データが構造化されているか」「事実が一文で完結しているか」「他媒体での言及と整合しているか」を見ます。
                                評価軸が違うため、SEOとAIEOは別々の最適化が必要です。とくに小規模塾は被リンク数で大手に勝てないため、SEOよりAIEOで先行する方が、コストパフォーマンスが高い戦略になります。
                            </p>

                            <h4 style={h4Style}>③ AIに引用されないHPは「存在しないHP」になる</h4>
                            <p style={{ ...pStyle, marginBottom: 0 }}>
                                AIの回答に塾が出てこなければ、そもそも保護者の検討候補に入りません。SEOの場合は2ページ目・3ページ目に表示されていても「目立たない」だけで存在は認識されますが、AIの回答は数件で打ち切られるため、入らないHPは事実上「存在しないHP」と同じ扱いになります。
                                この変化は、HP制作の世界における産業革命級の転換です。AIEO対策をしないHPは、2025年以降、急速に問い合わせを失っていく可能性が高いと考えています。
                            </p>
                        </div>

                        {/* Comparison */}
                        <div style={cardStyle}>
                            <div style={pillStyle('#64748b', '#e2e8f0', '#334155')}>COMPARISON</div>
                            <h3 style={h3Style}>SEO と AIEO の違い</h3>
                            <p style={pStyle}>両者は対立するものではなく、補完関係にあります。EduShiftはSEOとAIEOを両立させる設計を、すべての制作プランで標準にしています。</p>
                            <div style={{ overflowX: 'auto', marginTop: 16 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc' }}>
                                            <th style={thStyle}>観点</th>
                                            <th style={thStyle}>SEO（従来型）</th>
                                            <th style={{ ...thStyle, color: '#047857' }}>AIEO（生成AI時代）</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ['目的', '検索結果の上位10件に入る', 'AIの回答3件以内に名前を出す'],
                                            ['評価軸', '被リンク数・滞在時間・キーワード', '構造化データ・事実の一文完結性'],
                                            ['勝負の場', '検索結果ページ', 'AIが生成する数行の回答'],
                                            ['小規模塾の不利', '被リンクで大手に劣る', '構造化次第で逆転可能'],
                                            ['改善の見通し', '3〜6か月かかる', '数週間〜2か月で兆候が見える'],
                                        ].map(([a, b, c], i) => (
                                            <tr key={i} style={i % 2 === 1 ? { background: '#f8fafc88' } : {}}>
                                                <td style={{ ...tdStyle, fontWeight: 600 }}>{a}</td>
                                                <td style={tdStyle}>{b}</td>
                                                <td style={tdStyle}>{c}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 5 Measures */}
                        <h3 style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#0f172a', marginTop: 40, marginBottom: 8 }}>
                            EduShiftが標準実装する5つのAIEO対策
                        </h3>
                        <p style={{ textAlign: 'center', color: '#475569', marginBottom: 32 }}>
                            すべてライトプラン（¥19,800）から標準で含まれます。追加料金は発生しません。
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20, marginBottom: 40 }}>
                            {[
                                {
                                    no: '01',
                                    title: '構造化データ（JSON-LD）の完全実装',
                                    p1: '塾の所在地・対象学年・指導科目・営業時間・代表者名・合格実績などを、検索エンジンとAIが機械的に理解できる形式（JSON-LD）でHPに埋め込みます。',
                                    p2: '具体的には LocalBusiness／EducationalOrganization／FAQPage スキーマを使い、塾の基本情報を一意のデータとして提示。AIが「飯能市の小中高生向け塾」と質問されたときに、塾を候補として正しく列挙できる土台になります。',
                                },
                                {
                                    no: '02',
                                    title: 'llms.txt の設置と運用',
                                    p1: 'AIクローラー専用の案内書として、サイトのルートに /llms.txt を配置します。これは、AIに対して「このサイトの何を優先的に読み、どう要約してほしいか」を明示するファイルです。',
                                    p2: '塾の強み（少人数指導／合格実績／指導料金）、対象地域、料金体系、問い合わせ動線を簡潔にまとめ、AIが誤解せずに塾を紹介できるようにします。HPの本文を増やしすぎると逆に焦点がぼやけるため、AI向けの要約として独立して用意することが効きます。',
                                },
                                {
                                    no: '03',
                                    title: 'AI引用に最適化された自然文コピー',
                                    p1: 'AIが回答に引用しやすい文章には、共通の特徴があります。固有名詞（塾名・地域名・対象学年）が文中に明示されていること、合格実績や指導方針が完結した一文で表現されていること、抽象論ではなく具体的な数値で語られていること。',
                                    p2: 'EduShiftはコピーライティングの段階で「AIが切り取って引用したくなる一文」を意識的に組み込みます。たとえば「飯能市の中高生がGMARCH以上を目指す通い放題の学習塾です」のように、地域・対象・目標・特徴が一文で完結する書き方を全ページに散りばめます。',
                                },
                                {
                                    no: '04',
                                    title: 'FAQ・Q&A形式コンテンツの設置',
                                    p1: 'AIは「保護者が聞きそうな質問」と「その答え」が明示的にペアで書かれているページを高く評価します。料金・授業時間・体験申込の流れ・退塾ルールなど、よく聞かれる質問を10〜15個、自然文の問答形式でページに配置します。',
                                    p2: 'さらに FAQPage スキーマで構造化することで、AIだけでなくGoogleの検索結果にも質問形式のリッチリザルトとして表示されやすくなります。SEOとAIEOの両方に効く、費用対効果の高い施策です。',
                                },
                                {
                                    no: '05',
                                    title: '一次情報の数値化と外部整合性の確保',
                                    p1: 'AIは「他のサイトでも同じ情報が載っているか」をチェックして信頼度を判定します。塾名・住所・電話番号・営業時間・代表者名がHP・Googleビジネスプロフィール・Mapsの口コミ・各種塾検索ポータルで一致しているかを点検し、ブレを解消します。これを「NAP一貫性」と呼び、AIEOとローカルSEOの両方の根幹になります。',
                                    p2: '加えて、合格実績・指導年数・在籍生徒数・講師の経歴などを「中堅校◯名合格」「指導歴12年」のように具体的な数値で記載します。AIは数値を含む一文を「引用に値する一次情報」として優先するため、感覚的な表現（「多くの生徒が合格」）よりも、明確な数字を載せた方が回答に採用される確率が大きく上がります。',
                                },
                            ].map((m) => (
                                <div key={m.no} style={measureCardStyle}>
                                    <div style={{ color: '#10b981', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{m.no}</div>
                                    <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 12, lineHeight: 1.5 }}>{m.title}</h4>
                                    <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.8, marginBottom: 10 }}>{m.p1}</p>
                                    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.8, marginBottom: 0 }}>{m.p2}</p>
                                </div>
                            ))}
                        </div>

                        {/* Effect */}
                        <div style={cardStyle}>
                            <div style={pillStyle('#6366f1', '#e0e7ff', '#3730a3')}>EFFECT</div>
                            <h3 style={h3Style}>どのような効果が見込めるか</h3>
                            <p style={pStyle}>AIEO対策の効果は、実装直後・数か月後・半年〜1年後の3段階で現れます。</p>

                            {[
                                { color: '#10b981', label: '短期（公開〜1か月）', title: 'AIに「認識」される塾になる', body: '構造化データとllms.txtの設置により、ChatGPTやPerplexityのクローラーが塾の存在を正しく認識します。AIに「○○市の塾を教えて」と聞いた際に、塾名が回答に含まれる確率が、実装前のほぼ0%から30〜50%程度まで上昇する事例が出始めます。' },
                                { color: '#6366f1', label: '中期（1〜3か月）', title: 'AI経由の問い合わせが目に見えて増える', body: 'FAQと自然文コピーが整い、AIが「料金は？」「対象学年は？」と聞かれたときに塾の情報を正しく引用できるようになります。問い合わせフォームに「ChatGPTで知りました」「Perplexityで紹介されていて」というコメントが届き始めるのが、このフェーズの特徴です。AI経由の流入は、純粋に新規層の追加流入になります。' },
                                { color: '#0f172a', label: '長期（3か月〜1年）', title: '地域での「指名相談」が増える', body: 'NAP一貫性と一次情報の数値化により、AIが塾を「信頼できる一次情報源」として記憶します。保護者が「飯能の中学受験塾といえば？」とAIに聞いたときに、地域内で先頭に名前が挙がる状態を作れます。これは大手塾相手でも逆転可能で、被リンクで勝てない小規模塾にとってAIEOが現実的な勝ち筋になる理由です。' },
                            ].map((e) => (
                                <div key={e.label} style={{ borderLeft: `4px solid ${e.color}`, paddingLeft: 20, paddingTop: 4, paddingBottom: 4, marginTop: 16 }}>
                                    <div style={{ fontSize: 12, color: e.color, fontWeight: 700, marginBottom: 4 }}>{e.label}</div>
                                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{e.title}</h4>
                                    <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.8, marginBottom: 0 }}>{e.body}</p>
                                </div>
                            ))}
                        </div>

                        {/* Closing */}
                        <div
                            style={{
                                background: 'linear-gradient(90deg, #059669 0%, #4f46e5 100%)',
                                borderRadius: 24,
                                padding: '36px 40px',
                                color: 'white',
                                marginTop: 32,
                            }}
                        >
                            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
                                EduShiftの方針：AIEO対策は、ライトプランから「あたりまえの仕様」
                            </h3>
                            <p style={{ lineHeight: 1.8, marginBottom: 12, color: '#d1fae5' }}>
                                上記5つのAIEO対策は、ライトプラン（¥19,800）から全プランで標準実装します。プレミアムプランへの追加料金や、保守プランのオプションではありません。
                                AI時代に塾HPを作るうえで、これらは「あたりまえの仕様」だと考えているからです。
                            </p>
                            <p style={{ lineHeight: 1.8, marginBottom: 0, color: '#d1fae5' }}>
                                EduShiftの強みは、塾という業種に特化していること。塾の保護者が何を不安に思い、どんな質問をAIにするかを把握しているため、構造化データの粒度・FAQの質問設計・自然文コピーの言い回しを、塾向けに最適化できます。
                                AI時代に取り残されないHPを、初期費用を抑えながら今日から始めていただけます。
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {svc.pricingBlock && (
                <section className="s-detail-pricing">
                    <div className="s-container">
                        <div className="s-detail-pricing-head">
                            <div className="s-sec-num">Production Pricing</div>
                            <h2>{svc.pricingBlock.headline}</h2>
                            <p>{svc.pricingBlock.lede}</p>
                        </div>

                        <div className="s-detail-price-grid">
                            {svc.pricingBlock.tiers.map((t, i) => (
                                <div key={i} className={`s-detail-price-card${t.recommended ? ' recommended' : ''}`}>
                                    {t.recommended && <div className="s-detail-price-badge">Recommended</div>}
                                    <div className="s-detail-price-tier">Plan · {String(i + 1).padStart(2, '0')}</div>
                                    <h3>{t.name}</h3>
                                    <p className="s-detail-price-blurb">{t.blurb}</p>
                                    <div className="s-detail-price-amount">
                                        <span className="amount">{t.price}</span>
                                        {t.priceUnit && <span className="unit">（{t.priceUnit}）</span>}
                                    </div>
                                    <ul className="s-detail-price-features">
                                        {t.features.map((f, j) => (
                                            <li key={j}>{f}</li>
                                        ))}
                                    </ul>
                                    {t.notes && t.notes.length > 0 && (
                                        <ul className="s-detail-price-notes">
                                            {t.notes.map((n, j) => (
                                                <li key={j}>{n}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <Link to="/#contact" className="s-detail-price-cta">お問い合わせ</Link>
                                </div>
                            ))}
                        </div>

                        {svc.pricingBlock.footnote && (
                            <p className="s-detail-price-footnote">
                                公開後の保守・運用プラン（¥980/¥2,980/¥29,800）は
                                <Link to="/#pricing">トップページの料金セクション</Link>
                                でご確認いただけます。
                            </p>
                        )}
                    </div>
                </section>
            )}

            {svc.voice && (
                <section className="s-voice-detail">
                    <div className="s-container">
                        <div className="s-sec-head s-voice-detail-head">
                            <div className="s-sec-num">Voice · 受講者の声</div>
                            <div>
                                <h2 dangerouslySetInnerHTML={{ __html: svc.voice.sectionTitle ?? '未経験から、<em>理想の働き方</em>を実現。' }} />
                                <p className="s-voice-detail-sub">{svc.voice.sectionSublead ?? '一人の先生が、どのようにして生徒1人から12人へ、そして教員時代の収入超えへと歩んだのか。'}</p>
                            </div>
                        </div>

                        <div className="s-voice-detail-card">
                            <aside className="s-voice-profile">
                                <div className="s-voice-avatar" aria-hidden="true">
                                    <span>{svc.voice.avatarLetter ?? 'S'}</span>
                                </div>
                                <h3>{svc.voice.name}</h3>
                                <p className="s-voice-now">{svc.voice.currentRole}</p>
                                <dl className="s-voice-meta">
                                    {svc.voice.careerMeta.map((m, i) => (
                                        <div key={i}>
                                            <dt>{m.label}</dt>
                                            <dd>{m.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </aside>

                            <div className="s-voice-body">
                                <div className="s-voice-block">
                                    <div className="s-voice-qa-label">
                                        <span className="mark q">Q</span>
                                        <span>{svc.voice.situationLabel ?? '受講前の状況と悩み'}</span>
                                    </div>
                                    <p className="s-voice-text">{svc.voice.situation}</p>
                                </div>

                                <div className="s-voice-block">
                                    <div className="s-voice-qa-label">
                                        <span className="mark a">A</span>
                                        <span>{svc.voice.changesLabel ?? 'コンサルで得られた変化'}</span>
                                    </div>
                                    <div className="s-voice-changes">
                                        {svc.voice.changes.map((c, i) => (
                                            <div key={i} className="s-voice-change-card">
                                                <div className="s-voice-change-num">No. {String(i + 1).padStart(2, '0')}</div>
                                                <h4>{c.title}</h4>
                                                <p>{c.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="s-voice-future">
                                    <div className="s-voice-future-label">{svc.voice.futureLabel ?? '今後の展望'}</div>
                                    <p>{svc.voice.future}</p>
                                    <blockquote className="s-voice-quote">
                                        <span className="quote-open">"</span>
                                        {svc.voice.quote}
                                        <span className="quote-close">"</span>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="s-detail-cta">
                <div className="s-container">
                    <h2>{svc.ctaHeadline}</h2>
                    <p>
                        まずは30分の無料相談から。"売り込み"はひとつもいたしません。<br />
                        単発スポット相談（¥9,800〜/回）もご用意しています。
                    </p>
                    <div className="s-detail-cta-row">
                        <Link to="/#contact" className="s-btn-primary">
                            無料相談を予約する<span className="arrow">→</span>
                        </Link>
                        <Link to="/#services" className="s-btn-ghost">他のサービスを見る</Link>
                    </div>
                </div>
            </section>

            <FooterScholarly />
        </div>
    );
};
