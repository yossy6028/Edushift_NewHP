import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { PageMotion } from '../../components/PageMotion';
import { SCHOLARLY_SERVICES } from '../../data/scholarlyServices';
import { MAINTENANCE_PLANS, HOME_EMPHASIS } from '../../data/maintenancePlans';
import '../../styles/scholarly.css';
import { DxProductGallery } from './DxProductGallery';
import { CaseStudyBanner } from './CaseStudyYsKokugo';

const SERVICE_INDEX: Record<string, string> = {
    consulting: '01',
    'dx-development': '02',
    'hp-production': '03',
};

export const ServiceDetailScholarly = () => {
    const { slug = '' } = useParams();
    const svc = SCHOLARLY_SERVICES[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!svc) return <Navigate to="/" replace />;

    return (
        <div className="theme-scholarly" data-page-motion="service">
            <PageMotion key={slug} variant="service" />
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
                        <div className="s-detail-hero-copy">
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
                        <div className="s-detail-orbit" aria-hidden="true">
                            <span className="s-detail-orbit-ring" />
                            <span className="s-detail-orbit-core">{SERVICE_INDEX[slug] ?? '00'}</span>
                            <span className="s-detail-orbit-word">EduShift / {svc.labelEn}</span>
                        </div>
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
                                <div className="s-detail-extra-label">{sec.label ?? 'Voice'}</div>
                                <h3>{sec.heading}</h3>
                                <p>{sec.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {slug === 'dx-development' && <DxProductGallery />}

            {slug === 'hp-production' && (
                <section className="s-aieo">
                    <div className="s-container s-aieo-container">
                        <div className="s-aieo-head">
                            <span className="s-aieo-badge">
                                AIEO対策 · AI Engine Optimization
                            </span>
                            <h2>AI検索に選ばれる設計を、<br />塾ごとに。</h2>
                            <p>
                                AIEOは、公開されたチェックリストを当てはめれば終わる施策ではありません。
                                地域、対象学年、指導の強み、競合状況によって、優先すべき対策は変わります。
                            </p>
                            <p className="s-aieo-private-note">
                                実装項目と判断基準の詳細は公開していません。現在のHPを確認したうえで、相談時に必要な範囲だけをご説明します。
                            </p>
                        </div>

                        <div className="s-aieo-outcomes" aria-label="AIEO対策で目指す状態">
                            {[
                                {
                                    no: '01',
                                    title: 'AIに、塾の強みが正しく伝わる',
                                    body: '地域や対象、指導方針が要約の途中で失われず、比較候補として理解されやすい情報設計を目指します。',
                                },
                                {
                                    no: '02',
                                    title: '検索以外の入口を増やす',
                                    body: 'Google検索だけに頼らず、生成AIへの相談からも塾を知ってもらえる接点を整えます。',
                                },
                                {
                                    no: '03',
                                    title: '公開後の変化まで確認する',
                                    body: '作って終わりにせず、AI経由の流入や問い合わせの変化を確認し、次の改善につなげます。',
                                },
                            ].map((item) => (
                                <article key={item.no} className="s-aieo-outcome">
                                    <span>{item.no}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.body}</p>
                                </article>
                            ))}
                        </div>

                        <div className="s-aieo-consult">
                            <div className="s-aieo-consult-copy">
                                <div className="s-aieo-pill is-teal">CONSULTATION</div>
                                <h3>自塾に必要な対策は、<br />無料相談で具体化します。</h3>
                                <p>
                                    一般論ではなく、現在のHPと塾の状況を見ながら、優先順位を整理します。
                                    対策が不要な場合や、先に直すべき課題が別にある場合も、そのままお伝えします。
                                </p>
                            </div>
                            <div className="s-aieo-consult-detail">
                                <p className="s-aieo-consult-label">30分の相談で確認できること</p>
                                <ul>
                                    <li>現在のHPがAIにどう伝わっているか</li>
                                    <li>最初に整えるべき情報と優先順位</li>
                                    <li>対応範囲・費用・進め方の見通し</li>
                                </ul>
                                <Link to="/#contact" className="s-aieo-consult-cta">
                                    自塾のAIEO対策を相談する<span aria-hidden="true">→</span>
                                </Link>
                                <small>30分・オンライン／相談だけでも構いません</small>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {slug === 'hp-production' && <CaseStudyBanner />}

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

                    </div>
                </section>
            )}

            {slug === 'hp-production' && (
                <section className="s-sub-pricing" id="maintenance">
                    <div className="s-container">
                        <div className="s-sub-pricing-head">
                            <div className="s-sub-num">HP Maintenance · 3 Plans</div>
                            <h3>HP制作後の、<em>保守・運用プラン</em></h3>
                            <p>
                                作りっぱなしにしない。成長し続けるHPのために、月額¥980〜の保守プランをご用意しています。稼働監視から、AI活用・MEO対策まで。
                            </p>
                        </div>

                        <div className="s-sub-price-grid">
                            {MAINTENANCE_PLANS.map(plan => {
                                const isReco = plan.id === HOME_EMPHASIS.recommendedPlan;
                                return (
                                    <div key={plan.id} className={`s-sub-price-card${isReco ? ' featured' : ''}`}>
                                        <div className="s-sub-price-tier">{plan.tierEn}</div>
                                        <h4>{plan.name}</h4>
                                        <div className="s-sub-price-amount">
                                            <span className="amount">¥{plan.price.toLocaleString('ja-JP')}</span>
                                            <span className="unit">/ 月</span>
                                        </div>
                                        <ul className="s-sub-price-features">
                                            {plan.features.map(f => <li key={f}>{f}</li>)}
                                        </ul>
                                        <p className="s-sub-price-note">{plan.note}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="s-sub-price-cta-row">
                            制作費は上記プラン（初期¥19,800〜）をご覧ください。保守プランは制作完了後、いつからでもご契約いただけます。
                        </p>
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
