import { useEffect, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { PageMotion } from '../../components/PageMotion';
import { YS_CASE } from '../../data/caseStudies';
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
        body: 'llms.txt・JSON-LD構造化データ・FAQ schemaを実装。ChatGPTなどの生成AIに正しく読み取られ、回答に引用されるための構造を整えました。',
    },
] as const;

const monthNum = (month: string) => String(Number(month.split('-')[1]));
const yearOf = (month: string) => month.split('-')[0];

export const CaseStudyYsKokugo = () => {
    // ヒーローとdocument.titleの主役数字は先頭指標（HPフォーム問い合わせ）に依存する
    const [leadMetric] = YS_CASE.metrics;

    useEffect(() => {
        window.scrollTo(0, 0);
        const prevTitle = document.title;
        document.title = `HP制作実績：問い合わせ${leadMetric.multiplier} | EduShift`;
        return () => { document.title = prevTitle; };
    }, [leadMetric.multiplier]);

    const siteHost = YS_CASE.siteUrl.replace(/^https?:\/\//, '');
    const maxCount = Math.max(...YS_CASE.monthly.map((m) => m.count));
    const renewalStartIndex = YS_CASE.monthly.findIndex((m) => m.highlight);
    const renewalStartMonth = renewalStartIndex >= 0 ? YS_CASE.monthly[renewalStartIndex] : undefined;

    return (
        <div className="theme-scholarly s-case-page" data-page-motion="service">
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
                            <div className="s-case-hero-label">{leadMetric.label}</div>
                            <div className="s-case-hero-numbers">
                                <span className="before">{leadMetric.before}</span>
                                <span className="arrow" aria-hidden="true">→</span>
                                <span className="after">{leadMetric.after}</span>
                                <span className="multi">{leadMetric.multiplier}</span>
                            </div>
                            {leadMetric.note && <p className="s-case-hero-note">{leadMetric.note}</p>}
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
                            問い合わせ件数という数字で効果を検証したうえで、塾・教室の皆さまに提供しています。
                            自分の塾で成果が出なかったものは、お客様にも提案しません。
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
                        料金プラン・AIEO対策の詳細は、HP制作サービスのページでご覧いただけます。
                    </p>
                    <div className="s-detail-cta-row">
                        <Link to="/#contact" className="s-btn-primary">
                            無料相談を予約する<span className="arrow">→</span>
                        </Link>
                        <Link to="/service/hp-production" className="s-btn-ghost">HP制作サービスの詳細を見る</Link>
                    </div>
                </div>
            </section>

            <FooterScholarly />
        </div>
    );
};
