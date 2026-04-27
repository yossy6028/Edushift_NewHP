import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { SCHOLARLY_SERVICES } from '../../data/scholarlyServices';
import '../../styles/scholarly.css';

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
