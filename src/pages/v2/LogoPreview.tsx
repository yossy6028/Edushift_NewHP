import { Link } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import { PageMotion } from '../../components/PageMotion';
import officialLogo from '../../assets/logo-shift-mark.png';
import logoV5 from '../../assets/logo-v5-spread.svg';
import logoV6 from '../../assets/logo-v6-origami.svg';
import logoV7 from '../../assets/logo-v7-chevron.svg';
import '../../styles/scholarly.css';

type Variant = { id: string; label: string; src: string; note: string };

const variants: Variant[] = [
    { id: 'official', label: 'Official · Shift Chevron', src: officialLogo, note: '現在の正式マーク。ティールとブルーのシェブロンを、テキストのワードマークと組み合わせます。' },
    { id: 'v5', label: 'Archive V5 · Spread Wings', src: logoV5, note: '検討時のアーカイブ。中央起点から両翼が上方へ展開する案です。' },
    { id: 'v6', label: 'Archive V6 · Paper Planes', src: logoV6, note: '検討時のアーカイブ。2機の紙飛行機で動きと軽やかさを表現した案です。' },
    { id: 'v7', label: 'Archive V7 · Double Chevron', src: logoV7, note: '検討時のアーカイブ。2段のV字で上向きの移動を表現した案です。' },
];

const Lockup = ({ src, footer = false }: { src: string; footer?: boolean }) => (
    <div className="s-logo-lockup">
        <img src={src} alt="" />
        <span className="s-logo-lockup-name">Edu<em>Shift</em></span>
        {!footer && <span className="s-brand-tag">学びの伴走者</span>}
    </div>
);

export const LogoPreview = () => {
    return (
        <div className="theme-scholarly" data-page-motion="studio">
            <PageMotion variant="studio" />
            <HeaderScholarly />

            <section className="s-logo-hero">
                <div className="s-container">
                    <nav className="s-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <span className="current">Brand Studio</span>
                    </nav>
                    <h1>ブランドマーク・スタジオ</h1>
                    <p>Official lockup and archived explorations</p>
                </div>
            </section>

            <main className="s-logo-content">
                <div className="s-container">
                    <div className="s-logo-intro">
                        <h2>文脈の中で、マークを比較する。</h2>
                        <p>ヘッダー、単体表示、暗いフッターという3つの使用条件で確認します。正式運用は最初の「Official」の組み合わせです。</p>
                    </div>

                    <div className="s-logo-grid">
                        {variants.map(variant => (
                            <section className="s-logo-variant" key={variant.id}>
                                <div className="s-logo-variant-label">{variant.label}</div>
                                <p className="s-logo-variant-note">{variant.note}</p>

                                <div className="s-logo-context-label">HEADER CONTEXT</div>
                                <div className="s-logo-context-header">
                                    <Lockup src={variant.src} />
                                    <span className="s-logo-context-nav">塾経営の今 · サービス · 代表 · ブログ · FAQ</span>
                                </div>

                                <div className="s-logo-context-label">LARGE STANDALONE</div>
                                <div className="s-logo-context-large">
                                    <img src={variant.src} alt={`${variant.label} マーク`} />
                                </div>

                                <div className="s-logo-context-label">FOOTER CONTEXT</div>
                                <div className="s-logo-context-footer">
                                    <Lockup src={variant.src} footer />
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </main>

            <FooterScholarly />
        </div>
    );
};
