import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { PageMotion } from '../../components/PageMotion';
import MetaTags, { SITE_BASE_URL, breadcrumbJsonLd } from '../../components/MetaTags';
import { findGuide, GUIDES } from '../../data/guides';
import '../../styles/scholarly.css';

const CONTACT_HREF =
    'mailto:info@edu-shift.com?subject=%E7%84%A1%E6%96%99%E7%9B%B8%E8%AB%87%E3%81%AE%E4%BE%9D%E9%A0%BC&body=%E2%97%8B%E5%A1%BE%E5%90%8D%EF%BC%9A%0A%E2%97%8B%E5%9C%B0%E5%9F%9F%EF%BC%9A%0A%E2%97%8B%E7%94%9F%E5%BE%92%E6%95%B0%EF%BC%9A%0A%E2%97%8B%E3%81%94%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A%0A';

const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-');
    return `${y}年${Number(m)}月${Number(d)}日`;
};

export const GuideArticleScholarly = () => {
    const { slug = '' } = useParams();
    const guide = findGuide(slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!guide) return <Navigate to="/guide" replace />;

    const url = `/guide/${guide.slug}`;
    const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

    return (
        <div className="theme-scholarly" data-page-motion="legal">
            <MetaTags
                title={guide.metaTitle}
                description={guide.description}
                url={url}
                jsonLd={[
                    breadcrumbJsonLd([
                        { name: '塾経営ガイド', path: '/guide' },
                        { name: guide.title, path: url },
                    ]),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        '@id': `${SITE_BASE_URL}${url}#article`,
                        headline: guide.title,
                        description: guide.description,
                        datePublished: guide.datePublished,
                        dateModified: guide.dateModified,
                        inLanguage: 'ja',
                        mainEntityOfPage: `${SITE_BASE_URL}${url}`,
                        author: {
                            '@type': 'Person',
                            name: '吉井勝彦',
                            url: `${SITE_BASE_URL}/#founder`,
                        },
                        publisher: { '@id': `${SITE_BASE_URL}/#organization` },
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: guide.faq.map((f) => ({
                            '@type': 'Question',
                            name: f.q,
                            acceptedAnswer: { '@type': 'Answer', text: f.a },
                        })),
                    },
                ]}
            />
            <PageMotion key={slug} variant="legal" />
            <HeaderScholarly />

            <article className="s-guide-article">
                <header className="s-guide-hero">
                    <div className="s-container">
                        <nav className="s-breadcrumb">
                            <Link to="/">Home</Link>
                            <span>/</span>
                            <Link to="/guide">塾経営ガイド</Link>
                            <span>/</span>
                            <span className="current">{guide.eyebrow}</span>
                        </nav>
                        <div className="s-guide-hero-meta">
                            <span className="s-guide-chip">{guide.eyebrow}</span>
                            <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)} 更新</time>
                        </div>
                        <h1 className="s-guide-title">{guide.title}</h1>
                        {guide.lead.map((p, i) => (
                            <p key={i} className="s-guide-lead">{p}</p>
                        ))}
                    </div>
                </header>

                <div className="s-container s-guide-body">
                    {guide.sections.map((sec, i) => (
                        <section key={i} className="s-guide-section">
                            <h2>{sec.heading}</h2>
                            {sec.paras?.map((p, j) => <p key={j}>{p}</p>)}
                            {sec.list && (
                                <ul>
                                    {sec.list.map((item, j) => <li key={j}>{item}</li>)}
                                </ul>
                            )}
                            {sec.parasAfter?.map((p, j) => <p key={`a${j}`}>{p}</p>)}
                        </section>
                    ))}

                    <section className="s-guide-section s-guide-faq">
                        <h2>よくある質問</h2>
                        {guide.faq.map((f, i) => (
                            <details key={i}>
                                <summary>{f.q}</summary>
                                <p>{f.a}</p>
                            </details>
                        ))}
                    </section>

                    <aside className="s-guide-related" aria-label="関連ページ">
                        <h2>関連ページ</h2>
                        <ul>
                            {guide.related.map((r, i) => (
                                <li key={i}>
                                    <Link to={r.path}>{r.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className="s-guide-cta">
                        <p>
                            記事の内容についてのご質問や、「うちの塾の場合はどうか」というご相談は、
                            メール1通からお気軽にどうぞ。営業目的のしつこい連絡は行いません。
                        </p>
                        <a href={CONTACT_HREF} className="s-guide-cta-btn">無料相談する</a>
                    </div>

                    {others.length > 0 && (
                        <nav className="s-guide-more" aria-label="他のガイド記事">
                            <h2>他のガイド記事</h2>
                            <ul>
                                {others.map((g) => (
                                    <li key={g.slug}>
                                        <Link to={`/guide/${g.slug}`}>{g.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </article>

            <FooterScholarly />
        </div>
    );
};
