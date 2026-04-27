import { Link } from 'react-router-dom';
import currentLogo from '../../assets/logo-scholarly-mark.svg';
import logoV5 from '../../assets/logo-v5-spread.svg';
import logoV6 from '../../assets/logo-v6-origami.svg';
import logoV7 from '../../assets/logo-v7-chevron.svg';
import '../../styles/scholarly.css';

type Variant = { id: string; label: string; src: string; note: string };

const variants: Variant[] = [
    { id: 'current', label: '現行案 · 2 overlapping feathers', src: currentLogo, note: '羽2枚の重なり。現状採用中。' },
    { id: 'v5', label: 'V5 · Spread Wings', src: logoV5, note: '中央起点から navy + gold の両翼が V 字に上方展開。象徴的で上品。' },
    { id: 'v6', label: 'V6 · Origami / Paper Planes', src: logoV6, note: '2 機の紙飛行機が斜めに飛ぶ。動きと軽やかさ。' },
    { id: 'v7', label: 'V7 · Double Chevron', src: logoV7, note: '2 段重ねの V 字が上向き。ミニマル・モダン。' },
];

export const LogoPreview = () => {
    return (
        <div className="theme-scholarly" style={{ minHeight: '100vh', background: 'var(--s-paper)' }}>
            <div className="s-container" style={{ paddingTop: 96, paddingBottom: 120 }}>
                <nav className="s-breadcrumb" style={{ marginBottom: 32 }}>
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <span className="current">Logo Preview</span>
                </nav>

                <h1 style={{
                    fontFamily: 'var(--s-serif-jp)',
                    fontWeight: 600,
                    fontSize: '42px',
                    color: 'var(--s-navy-900)',
                    marginBottom: 12,
                }}>ロゴ候補プレビュー</h1>
                <p style={{
                    fontFamily: 'var(--s-serif-jp)',
                    fontSize: 15,
                    color: 'var(--s-ink-700)',
                    marginBottom: 48,
                }}>
                    同じロゴを (1) ヘッダー実寸 (2) 単体大 (3) フッター実寸 の3つの文脈で並べて比較できます。
                </p>

                {variants.map(v => (
                    <section key={v.id} style={{
                        marginBottom: 80,
                        padding: 32,
                        background: 'var(--s-cream)',
                        border: '1px solid var(--s-line-strong)',
                    }}>
                        <div style={{
                            fontFamily: 'var(--s-serif-en)',
                            fontStyle: 'italic',
                            fontSize: 12,
                            letterSpacing: '0.3em',
                            color: 'var(--s-gold-deep)',
                            marginBottom: 8,
                        }}>{v.label}</div>
                        <p style={{
                            fontFamily: 'var(--s-serif-jp)',
                            fontSize: 13,
                            color: 'var(--s-ink-700)',
                            marginBottom: 24,
                        }}>{v.note}</p>

                        {/* Context 1: Header */}
                        <div style={{ marginBottom: 12, fontFamily: 'var(--s-serif-jp)', fontSize: 11, color: 'var(--s-ink-500)', letterSpacing: '0.15em' }}>HEADER CONTEXT</div>
                        <div style={{
                            background: 'rgba(247, 242, 232, 0.92)',
                            backdropFilter: 'blur(12px)',
                            borderBottom: '1px solid var(--s-line)',
                            padding: '0 32px',
                            marginBottom: 32,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 96 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <img src={v.src} alt="" style={{ height: 60, width: 'auto' }} />
                                    <span style={{
                                        fontFamily: "'Playfair Display',serif",
                                        fontWeight: 700,
                                        fontSize: 28,
                                        color: 'var(--s-navy-900)',
                                        letterSpacing: '-0.01em',
                                        lineHeight: 1,
                                    }}>Edu<em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--s-gold)' }}>Shift</em></span>
                                    <span style={{ width: 1, height: 32, background: 'var(--s-line-strong)', opacity: 0.5 }} />
                                    <span style={{ fontFamily: 'var(--s-serif-jp)', fontSize: 11, color: 'var(--s-ink-500)', letterSpacing: '0.3em' }}>学びの伴走者</span>
                                </div>
                                <div style={{ fontFamily: 'var(--s-serif-jp)', fontSize: 13, color: 'var(--s-ink-700)', letterSpacing: '0.08em' }}>
                                    塾経営の今 · サービス · 代表 · ブログ · FAQ
                                </div>
                            </div>
                        </div>

                        {/* Context 2: Standalone large */}
                        <div style={{ marginBottom: 12, fontFamily: 'var(--s-serif-jp)', fontSize: 11, color: 'var(--s-ink-500)', letterSpacing: '0.15em' }}>LARGE STANDALONE</div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: 48,
                            background: 'var(--s-paper)',
                            border: '1px dashed var(--s-line)',
                            marginBottom: 32,
                        }}>
                            <img src={v.src} alt="" style={{ height: 200, width: 'auto' }} />
                        </div>

                        {/* Context 3: Footer */}
                        <div style={{ marginBottom: 12, fontFamily: 'var(--s-serif-jp)', fontSize: 11, color: 'var(--s-ink-500)', letterSpacing: '0.15em' }}>FOOTER CONTEXT</div>
                        <div style={{ background: 'var(--s-navy-900)', padding: '40px 32px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                                <img src={v.src} alt="" style={{ height: 72, width: 'auto', filter: 'brightness(1.05)' }} />
                                <span style={{
                                    fontFamily: "'Playfair Display',serif",
                                    fontWeight: 700,
                                    fontSize: 40,
                                    color: 'var(--s-paper)',
                                    letterSpacing: '-0.01em',
                                    lineHeight: 1,
                                }}>Edu<em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--s-gold)' }}>Shift</em></span>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
