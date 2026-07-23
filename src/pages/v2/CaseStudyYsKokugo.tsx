import { useEffect, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { PageMotion } from '../../components/PageMotion';
import { YS_CASE, YS_LEAD_METRIC, YS_AIEO, YS_AI_LEAD_METRIC, YS_BANNER_METRICS } from '../../data/caseStudies';
import MetaTags, { SITE_BASE_URL, breadcrumbJsonLd } from '../../components/MetaTags';
import '../../styles/scholarly.css';

const ACTIONS = [
    {
        no: '01',
        title: 'デザイン刷新',
        body: '「書院・劇場化」をコンセプトに、白基調の汎用テンプレートから紺×金の世界観へ全面刷新。塾の指導思想が伝わるビジュアルへ作り直しました。',
    },
    {
        no: '02',
        title: 'モーション演出',
        body: 'ローディング演出・見出しの文字リビール・スクロールパララックスを実装。「ちゃんとした塾だ」という第一印象を、開いた瞬間の体験でつくります。',
    },
    {
        no: '03',
        title: 'AIEO対策',
        body: '生成AIに塾の特徴が正しく伝わるよう、サイト全体にAIEO対策を実装しました。具体的な手法は非公開ですが、実装後のAI経由流入は下記セクションで実測データを公開しています。',
    },
] as const;

const AIEO_SECTION_LEAD =
    '保護者が塾を探す場所は、もう検索エンジンだけではありません。' +
    'ChatGPTに「中学受験 国語 家庭教師」と尋ね、その回答から比較検討を始める——そんな探し方がすでに始まっています。' +
    'AIの回答に名前が挙がらなければ、比較の土俵にすら上がれない。' +
    'だからこそ、AIEO対策の実装前後でAI経由の流入がどう変わったかを、Google Analyticsの実測データで公開します。';

const monthNum = (month: string) => String(Number(month.split('-')[1]));
const yearOf = (month: string) => month.split('-')[0];

/**
 * HP制作サービスページ等に埋め込む、事例ページへの導線バナー。
 * 3指標＋短い見出し＋「事例を見る →」のみのコンパクト構成。
 */
export const CaseStudyBanner = () => (
    <section className="s-case-banner">
        <div className="s-container">
            <div className="s-case-banner-inner">
                <div className="s-case-banner-head">
                    <div className="s-case-banner-label">Case Study · 制作実績</div>
                    <h2>{YS_CASE.heroCopy}</h2>
                    <p>EduShift代表自身の塾「{YS_CASE.siteName}」の、リニューアル前後の実測データです。</p>
                </div>
                <div className="s-case-banner-metrics">
                    {YS_BANNER_METRICS.map((m) => (
                        <div key={m.label} className="s-case-banner-metric">
                            <span className="label">{m.label}</span>
                            <span className="multi">{m.multiplier}</span>
                        </div>
                    ))}
                </div>
                <Link to="/works/ys-kokugo" className="s-case-banner-link">事例を見る →</Link>
            </div>
        </div>
    </section>
);

export const CaseStudyYsKokugo = () => {
    // ヒーローの主役はAI経由流入（GPT流入をトップに置く方針）、HPフォーム問い合わせが従
    const aiMetric = YS_AI_LEAD_METRIC;
    const leadMetric = YS_LEAD_METRIC;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const pageTitle = `HP制作実績：AI経由流入${aiMetric.multiplier}・問い合わせ${leadMetric.multiplier}`;
    const pageDescription = `${YS_CASE.siteName}のHPリニューアル事例。デザイン刷新・モーション演出・AIEO対策により、AI経由の流入が${aiMetric.multiplier}（${aiMetric.before} → ${aiMetric.after}）、HPフォーム問い合わせが${leadMetric.multiplier}（${leadMetric.before} → ${leadMetric.after}）に。${YS_CASE.asOf}時点の実測データを全公開しています。`;

    const siteHost = YS_CASE.siteUrl.replace(/^https?:\/\//, '');
    const maxCount = Math.max(...YS_CASE.monthly.map((m) => m.count));
    const renewalStartIndex = YS_CASE.monthly.findIndex((m) => m.highlight);
    const renewalStartMonth = renewalStartIndex >= 0 ? YS_CASE.monthly[renewalStartIndex] : undefined;
    const maxAieo = Math.max(...YS_AIEO.monthly.map((m) => m.count));
    const aieoStartIndex = YS_AIEO.monthly.findIndex((m) => m.highlight);

    return (
        <div className="theme-scholarly s-case-page" data-page-motion="service">
            <MetaTags
                title={pageTitle}
                description={pageDescription}
                image="/ogp-works-ys.png"
                url="/works/ys-kokugo"
                jsonLd={[
                    breadcrumbJsonLd([
                        { name: 'HP制作・運用', path: '/service/hp-production' },
                        { name: `制作実績：${YS_CASE.siteName}`, path: '/works/ys-kokugo' },
                    ]),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        '@id': `${SITE_BASE_URL}/works/ys-kokugo#article`,
                        headline: `${pageTitle} — ${YS_CASE.siteName}のHPリニューアル事例`,
                        description: pageDescription,
                        url: `${SITE_BASE_URL}/works/ys-kokugo`,
                        image: `${SITE_BASE_URL}/ogp-works-ys.png`,
                        inLanguage: 'ja',
                        datePublished: '2026-07-12',
                        dateModified: '2026-07-23',
                        author: { '@id': `${SITE_BASE_URL}/#founder` },
                        publisher: { '@id': `${SITE_BASE_URL}/#organization` },
                        isPartOf: { '@id': `${SITE_BASE_URL}/#website` },
                        about: [
                            { '@type': 'Thing', name: 'AIEO（AI Engine Optimization）' },
                            { '@type': 'Thing', name: '学習塾のホームページ制作' },
                        ],
                    },
                ]}
            />
            <PageMotion variant="service" />
            <HeaderScholarly />

            {/* 1. Hero */}
            <section className="s-case-hero">
                <div className="s-container">
                    <nav className="s-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/service/hp-production">HP制作</Link>
                        <span>/</span>
                        <span className="current">制作実績</span>
                    </nav>
                    <div className="s-case-hero-inner">
                        <div className="s-case-hero-meta" data-reveal>
                            <span className="s-case-chip">HP制作実績 · Case Study</span>
                            <span className="s-case-hero-site">{YS_CASE.siteName}</span>
                        </div>
                        <h1 className="s-case-title" data-reveal>{YS_CASE.heroCopy}</h1>
                        <div className="s-case-hero-figure" data-reveal>
                            <div className="s-case-hero-stats">
                                <div className="s-case-hero-stat is-primary">
                                    <div className="s-case-hero-label">{aiMetric.label}</div>
                                    <div className="stat-multi">{aiMetric.multiplier}</div>
                                    <div className="stat-delta">
                                        {aiMetric.before}
                                        <span className="arrow" aria-hidden="true"> → </span>
                                        {aiMetric.after}セッション
                                    </div>
                                </div>
                                <div className="s-case-hero-stat">
                                    <div className="s-case-hero-label">{leadMetric.label}</div>
                                    <div className="stat-multi">{leadMetric.multiplier}</div>
                                    <div className="stat-delta">
                                        {leadMetric.before}
                                        <span className="arrow" aria-hidden="true"> → </span>
                                        {leadMetric.after}
                                    </div>
                                </div>
                            </div>
                            <p className="s-case-hero-note">
                                AI経由の流入はGA4参照元（chatgpt.com等）の実測、問い合わせはHPフォーム経由メールのスレッド単位集計。集計方法の詳細は下記の各セクションをご覧ください。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Before / After */}
            <section className="s-case-ba">
                <div className="s-container">
                    <div className="s-case-sec-head" data-reveal>
                        <div className="s-sec-num">Before / After</div>
                        <h2 className="s-case-h2">白いテンプレートから、<em>問い合わせが来るHP</em>へ。</h2>
                        <p className="s-case-sub">
                            対象は代表自身が運営する塾のHP「{YS_CASE.siteName}」（{siteHost}）。
                            {YS_CASE.renewalDate}に、デザイン・コピー・AIEO対策までを一貫してリニューアルしました。
                        </p>
                    </div>
                    <div className="s-case-ba-grid">
                        <figure className="s-case-ba-item is-before" data-reveal>
                            <figcaption>
                                <span className="tag">Before</span>
                                <span className="when">{YS_CASE.beforeCapturedAt}</span>
                            </figcaption>
                            <img
                                src="/works/ys-before.jpg"
                                alt={`${YS_CASE.siteName}（${siteHost}）リニューアル前のトップページ（${YS_CASE.beforeCapturedAt}）`}
                                loading="lazy"
                                width={1200}
                                height={1333}
                            />
                        </figure>
                        <figure className="s-case-ba-item is-after" data-reveal>
                            <figcaption>
                                <span className="tag">After</span>
                                <span className="when">現在</span>
                            </figcaption>
                            <img
                                src="/works/ys-after.jpg"
                                alt={`${YS_CASE.siteName}（${siteHost}）リニューアル後のトップページ（現在・${YS_CASE.renewalDate}公開）`}
                                loading="lazy"
                                width={1200}
                                height={1333}
                            />
                        </figure>
                    </div>
                </div>
            </section>

            {/* 3. Metrics */}
            <section className="s-case-metrics">
                <div className="s-container">
                    <div className="s-case-sec-head" data-reveal>
                        <div className="s-sec-num">Results in Numbers</div>
                        <h2 className="s-case-h2">数字で見る、<em>リニューアル前後</em>の変化。</h2>
                    </div>
                    <div className="s-case-metric-grid">
                        {YS_CASE.metrics.map((m, i) => (
                            <div key={m.label} className="s-case-metric-card" data-reveal>
                                <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                                <div className="label">{m.label}</div>
                                <div className="multi">{m.multiplier}</div>
                                <div className="delta">
                                    <span className="from">{m.before}</span>
                                    <span className="arrow" aria-hidden="true">→</span>
                                    <span className="to">{m.after}</span>
                                </div>
                                {m.note && <p className="note">{m.note}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3.5 Scale context — 個人塾の規模感での意味づけ */}
            <section className="s-case-firsthand s-case-scale">
                <div className="s-container">
                    <div className="s-case-firsthand-inner" data-reveal>
                        <div className="s-case-firsthand-label">{YS_CASE.scaleContext.label}</div>
                        <h2>{YS_CASE.scaleContext.title}</h2>
                        {YS_CASE.scaleContext.paragraphs.map((para) => (
                            <p key={para}>{para}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Monthly chart */}
            <section className="s-case-chart-sec">
                <div className="s-container">
                    <div className="s-case-sec-head" data-reveal>
                        <div className="s-sec-num">Monthly Trend</div>
                        <h2 className="s-case-h2">月別の<em>HPフォーム問い合わせ件数</em>推移。</h2>
                    </div>
                    <div className="s-case-chart-wrap" data-reveal>
                        <div className="s-case-chart-legend" aria-hidden="true">
                            <span className="key is-before"><i />リニューアル前</span>
                            <span className="key is-after"><i />リニューアル後</span>
                        </div>
                        <div
                            className="s-case-chart"
                            role="img"
                            aria-label={`月別HPフォーム問い合わせ件数。${YS_CASE.monthly.map((m) => `${yearOf(m.month)}年${monthNum(m.month)}月 ${m.count}件`).join('、')}。${YS_CASE.renewalDate}にリニューアルし、${renewalStartMonth ? `${yearOf(renewalStartMonth.month)}年${monthNum(renewalStartMonth.month)}月以降` : 'それ以降'}がリニューアル後です。`}
                        >
                            {YS_CASE.monthly.map((m, i) => (
                                <div
                                    key={m.month}
                                    className={`s-case-bar-col${m.highlight ? ' is-highlight' : ''}${i === renewalStartIndex ? ' is-renewal-start' : ''}`}
                                    style={{ '--h': `${(m.count / maxCount) * 100}%` } as CSSProperties}
                                >
                                    {i === renewalStartIndex && <span className="flag">リニューアル</span>}
                                    <div className="track">
                                        <span className="count">{m.count}</span>
                                        <span className="fill" />
                                    </div>
                                    <div className="month">
                                        {monthNum(m.month)}
                                        {(i === 0 || m.month.endsWith('-01')) && <em>{yearOf(m.month)}</em>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ul className="s-case-chart-notes">
                            {YS_CASE.chartNotes.map((note) => (
                                <li key={note}>※ {note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 4.5 AIEO results */}
            <section className="s-case-metrics s-case-aieo">
                <div className="s-container">
                    <div className="s-case-sec-head" data-reveal>
                        <div className="s-sec-num">AI Referral · AIEO実測</div>
                        <h2 className="s-case-h2">ChatGPT経由の流入も、<em>実測データ</em>で公開。</h2>
                        <p className="s-case-sub">{AIEO_SECTION_LEAD}</p>
                    </div>
                    <div className="s-case-metric-grid">
                        {YS_AIEO.metrics.map((m, i) => (
                            <div key={m.label} className="s-case-metric-card" data-reveal>
                                <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                                <div className="label">{m.label}</div>
                                <div className="multi">{m.multiplier}</div>
                                <div className="delta">
                                    <span className="from">{m.before}</span>
                                    <span className="arrow" aria-hidden="true">→</span>
                                    <span className="to">{m.after}</span>
                                </div>
                                {m.note && <p className="note">{m.note}</p>}
                            </div>
                        ))}
                    </div>
                    <div className="s-case-chart-wrap" data-reveal>
                        <div className="s-case-chart-legend" aria-hidden="true">
                            <span className="key is-before"><i />AIEO実装前</span>
                            <span className="key is-after"><i />AIEO実装後</span>
                        </div>
                        <div
                            className="s-case-chart"
                            role="img"
                            aria-label={`月別のAI経由セッション数。${YS_AIEO.monthly.map((m) => `${yearOf(m.month)}年${monthNum(m.month)}月 ${m.count}件`).join('、')}。AIEOは${YS_AIEO.implementedAt}に実装しました。`}
                        >
                            {YS_AIEO.monthly.map((m, i) => (
                                <div
                                    key={m.month}
                                    className={`s-case-bar-col${m.highlight ? ' is-highlight' : ''}${i === aieoStartIndex ? ' is-renewal-start' : ''}`}
                                    style={{ '--h': `${(m.count / maxAieo) * 100}%` } as CSSProperties}
                                >
                                    {i === aieoStartIndex && <span className="flag">AIEO実装後</span>}
                                    <div className="track">
                                        <span className="count">{m.count}</span>
                                        <span className="fill" />
                                    </div>
                                    <div className="month">
                                        {monthNum(m.month)}
                                        {(i === 0 || m.month.endsWith('-01')) && <em>{yearOf(m.month)}</em>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ul className="s-case-chart-notes">
                            {YS_AIEO.chartNotes.map((note) => (
                                <li key={note}>※ {note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 5. What we did */}
            <section className="s-case-actions">
                <div className="s-container">
                    <div className="s-case-sec-head" data-reveal>
                        <div className="s-sec-num">What We Did</div>
                        <h2 className="s-case-h2">このリニューアルで<em>実施したこと</em>。</h2>
                    </div>
                    <div className="s-case-action-grid">
                        {ACTIONS.map((a) => (
                            <div key={a.no} className="s-case-action-card" data-reveal>
                                <div className="num">{a.no}</div>
                                <h3>{a.title}</h3>
                                <p>{a.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. First-hand proof */}
            <section className="s-case-firsthand">
                <div className="s-container">
                    <div className="s-case-firsthand-inner" data-reveal>
                        <div className="s-case-firsthand-label">First-hand Proof</div>
                        <h2>これは、EduShift代表自身の塾での実証です。</h2>
                        <p>
                            借り物の導入事例ではありません。代表が自ら運営する「{YS_CASE.siteName}」で同じ設計を試し、
                            問い合わせ件数という数字を公開して検証できる形にしたうえで、塾・教室の皆さまに提供しています。
                            リニューアル後、問い合わせは実際に増加しました。その経過をこのページで公開しています。
                        </p>
                    </div>
                </div>
            </section>

            {/* 7. Disclaimer */}
            <section className="s-case-disclaimer">
                <div className="s-container">
                    <p>{YS_CASE.disclaimer}</p>
                </div>
            </section>

            {/* 8. CTA */}
            <section className="s-detail-cta">
                <div className="s-container">
                    <h2>あなたの塾のHPも、<br />「問い合わせが来るHP」へ。</h2>
                    <p>
                        まずは30分の無料相談から。"売り込み"はひとつもいたしません。<br />
                        AIEO対応の可否と優先順位は、現在のHPを確認したうえで個別にご案内します。
                    </p>
                    <div className="s-detail-cta-row">
                        <Link to="/#contact" className="s-btn-primary">
                            無料相談を予約する<span className="arrow">→</span>
                        </Link>
                        <Link to="/service/hp-production" className="s-btn-ghost">HP制作サービスを見る</Link>
                    </div>
                </div>
            </section>

            <FooterScholarly />
        </div>
    );
};
