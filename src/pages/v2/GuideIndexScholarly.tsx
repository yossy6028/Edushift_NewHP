import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { PageMotion } from '../../components/PageMotion';
import MetaTags, { SITE_BASE_URL, breadcrumbJsonLd } from '../../components/MetaTags';
import { GUIDES } from '../../data/guides';
import '../../styles/scholarly.css';

export const GuideIndexScholarly = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="theme-scholarly" data-page-motion="legal">
            <MetaTags
                title="塾経営ガイド｜集客・HP・DX・AI活用の実践知"
                description="小規模塾・個人塾の塾長向けに、集客・ホームページ・生徒管理・DX・AI活用の実践的なノウハウを無料公開。塾専門のコンサルティングとツール開発を行うEduShiftが執筆しています。"
                url="/guide"
                jsonLd={[
                    breadcrumbJsonLd([{ name: '塾経営ガイド', path: '/guide' }]),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        '@id': `${SITE_BASE_URL}/guide#collection`,
                        url: `${SITE_BASE_URL}/guide`,
                        name: '塾経営ガイド | EduShift',
                        inLanguage: 'ja',
                        isPartOf: { '@id': `${SITE_BASE_URL}/#website` },
                        hasPart: GUIDES.map((g) => ({
                            '@type': 'Article',
                            headline: g.title,
                            url: `${SITE_BASE_URL}/guide/${g.slug}`,
                        })),
                    },
                ]}
            />
            <PageMotion variant="legal" />
            <HeaderScholarly />

            <section className="s-guide-hero">
                <div className="s-container">
                    <nav className="s-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <span className="current">塾経営ガイド</span>
                    </nav>
                    <h1 className="s-guide-title">塾経営ガイド</h1>
                    <p className="s-guide-lead">
                        集客・ホームページ・生徒管理・DX・AI活用。小規模塾の塾長が抱えやすい悩みへの
                        実践的な答えを、塾専門のEduShiftが無料で公開しています。
                    </p>
                </div>
            </section>

            <section className="s-container s-guide-index">
                <ul className="s-guide-card-list">
                    {GUIDES.map((g) => (
                        <li key={g.slug}>
                            <Link to={`/guide/${g.slug}`} className="s-guide-card">
                                <span className="s-guide-chip">{g.eyebrow}</span>
                                <h2>{g.title}</h2>
                                <p>{g.description}</p>
                                <span className="s-guide-card-arrow" aria-hidden="true">続きを読む →</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <FooterScholarly />
        </div>
    );
};
