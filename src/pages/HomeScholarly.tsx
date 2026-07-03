import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import logoImg from '../assets/logo-shift-mark.png';
import founderImg from '../assets/founder.webp';
import heroDeskImg from '../assets/hero-desk.jpeg';
import paperFlatlayImg from '../assets/hero-paper-flatlay.jpeg';
import hpBeforePanelImg from '../assets/hp-before-panel.jpg';
import hpAfterPanelImg from '../assets/hp-after-panel.jpg';
import autoTensakuImg from '../assets/auto-tensaku-screenshot.jpg';
import { FloatingCTA } from '../components/FloatingCTA';
import { CountUp } from '../components/CountUp';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { CursorFX } from '../components/immersive/CursorFX';
import { DeviceShowcase } from '../components/immersive/DeviceShowcase';
import { useReveal } from '../hooks/useReveal';
import { MAINTENANCE_PLANS, HOME_EMPHASIS } from '../data/maintenancePlans';
import { SCHOLARLY_SERVICES } from '../data/scholarlyServices';
import '../styles/scholarly.css';
import '../styles/modern.css';
import '../styles/immersive.css';

// three.js（約500KB）をメインバンドルから分離し、演出有効時のみ非同期読込
const ParticleHero = lazy(() =>
    import('../components/immersive/ParticleHero').then(m => ({ default: m.ParticleHero })),
);

// WebGL2が使えて動きの抑制指定が無い環境でのみ3D演出を有効化（不可なら透かし文字に退避）
const canRunFx = () => {
    try {
        return (
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
            !!document.createElement('canvas').getContext('webgl2')
        );
    } catch {
        return false;
    }
};

type NoteContent = {
    key: string;
    name: string;
    description?: string;
    eyecatch?: string;
    publishAt?: string;
};

const CATEGORIES = [
    { label: 'Featured · AI対話', cat: 'AI活用', catClass: 'teal' },
    { label: '塾経営',            cat: '塾経営',   catClass: '' },
    { label: 'AI · Practice',     cat: 'AI活用',   catClass: 'teal' },
    { label: 'Workflow',          cat: '働き方',   catClass: 'blue' },
    { label: 'Case Study',        cat: '事例',     catClass: 'gold' },
];

const fmtDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
};

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// '¥19,800' → 19800（CountUpアニメーション用）
const priceToNumber = (price: string) => Number(price.replace(/[^0-9]/g, ''));

const HP_PRICING = SCHOLARLY_SERVICES['hp-production'].pricingBlock;

export const HomeScholarly = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [fxOn] = useState(canRunFx);
    // イントロ演出はセッション初回のみ（リピーターには遅延にしかならない）
    const [introDone, setIntroDone] = useState(() =>
        sessionStorage.getItem('es-intro-seen') === '1' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    const progressRef = useRef<HTMLDivElement>(null);
    const closeNav = () => setNavOpen(false);

    useEffect(() => {
        if (introDone) return;
        const t = setTimeout(() => {
            sessionStorage.setItem('es-intro-seen', '1');
            setIntroDone(true);
        }, 2100);
        return () => clearTimeout(t);
    }, [introDone]);

    useReveal();

    useEffect(() => {
        document.body.style.overflow = navOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [navOpen]);

    // Scroll progress bar + header shrink
    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const doc = document.documentElement;
                const max = doc.scrollHeight - window.innerHeight;
                const p = max > 0 ? window.scrollY / max : 0;
                progressRef.current?.style.setProperty('transform', `scaleX(${p})`);
                setScrolled(window.scrollY > 40);
            });
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    useEffect(() => {
        const grid = document.getElementById('journal-grid');
        if (!grid) return;

        fetch('/note-articles.json', { cache: 'no-cache' })
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('fetch failed: ' + r.status))))
            .then((data) => {
                const items: NoteContent[] = data?.data?.contents ?? [];
                if (!items.length) return;
                const top = items.slice(0, 5);
                grid.innerHTML = top
                    .map((item, idx) => {
                        const cls = CATEGORIES[idx] ?? CATEGORIES[CATEGORIES.length - 1];
                        const num = String(idx + 1).padStart(2, '0');
                        const isFeat = idx === 0;
                        const link = `https://note.com/katsu_yossy/n/${escapeHtml(item.key)}`;
                        const title = escapeHtml(item.name);
                        const thumb = escapeHtml(item.eyecatch ?? '');
                        const date = fmtDate(item.publishAt);
                        const extra = isFeat ? '<span>· note</span>' : '';
                        const lead =
                            isFeat && item.description
                                ? `<p>${escapeHtml(item.description).slice(0, 140)}</p>`
                                : '';
                        return `
            <a href="${link}" target="_blank" rel="noopener" class="s-journal-card${isFeat ? ' feat' : ''}">
                <div class="s-journal-thumb photo" style="background-image: url('${thumb}');">
                    <span class="s-journal-thumb-label">${escapeHtml(cls.label)}</span>
                    <span class="s-journal-thumb-num">${num}</span>
                </div>
                <div class="s-journal-meta">
                    <span class="cat${cls.catClass ? ' ' + cls.catClass : ''}">${escapeHtml(cls.cat)}</span>
                    <span>${date}</span>
                    ${extra}
                </div>
                <h3>${title}</h3>
                ${lead}
            </a>`;
                    })
                    .join('\n');
                grid.setAttribute('data-source', '/note-articles.json');
            })
            .catch(() => {
                // Silent fallback — static cards remain.
            });
    }, []);

    return (
        <div className="theme-scholarly">

    <FloatingCTA />
    <CursorFX />

    {/* ====== INTRO (first visit per session) ====== */}
    {!introDone && (
        <div className="m-intro" aria-hidden="true">
            <div className="m-intro-brand">Edu<em>Shift</em></div>
            <div className="m-intro-line"></div>
            <div className="m-intro-tag">小さな塾と、フリーランス講師の伴走者</div>
        </div>
    )}

    {/* ====== SCROLL PROGRESS (Shift Current) ====== */}
    <div className="m-progress" ref={progressRef} aria-hidden="true"></div>

    {/* ====== HEADER ====== */}
    <header className={`s-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="s-container s-header-inner">
            <a href="#" className="s-brand" onClick={closeNav}>
                <img src={logoImg} alt="EduShift" />
                <span className="s-brand-name">Edu<em>Shift</em></span>
                <span className="s-brand-sep"></span>
                <span className="s-brand-tag">学びの伴走者</span>
            </a>
            <button
                type="button"
                className={`s-nav-toggle${navOpen ? ' is-open' : ''}`}
                aria-label={navOpen ? 'メニューを閉じる' : 'メニューを開く'}
                aria-expanded={navOpen}
                aria-controls="primary-nav"
                onClick={() => setNavOpen(v => !v)}
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
            <nav id="primary-nav" className={`s-nav${navOpen ? ' is-open' : ''}`}>
                <a href="#empathy" onClick={closeNav}>塾経営の今</a>
                <a href="#services" onClick={closeNav}>サービス</a>
                <a href="/service/hp-production" className="m-nav-hp" onClick={closeNav}>
                    HP制作
                    <span className="m-nav-hp-badge">{HOME_EMPHASIS.hpNavBadge}</span>
                </a>
                <a href="/service/dx-development" onClick={closeNav}>ツール開発</a>
                <a href="/service/consulting" onClick={closeNav}>コンサル</a>
                <a href="#founder" onClick={closeNav}>代表</a>
                <a href="#journal" onClick={closeNav}>ブログ</a>
                <a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-nav-ext" aria-label="noteを別タブで開く" onClick={closeNav}>note<span className="s-nav-ext-arrow" aria-hidden="true">↗</span></a>
                <a href="#faq" onClick={closeNav}>FAQ</a>
                <a href="#company" onClick={closeNav}>会社概要</a>
                <a href="#contact" className="s-cta-small" onClick={closeNav}>ご相談</a>
            </nav>
        </div>
    </header>

    {/* ====== HERO (full-screen billboard) ====== */}
    <section className="s-hero m-night m-hero-full">
        <div className="m-hero-bg" aria-hidden="true">
            <img src={heroDeskImg} alt="" />
        </div>
        <div className="m-aurora" aria-hidden="true">
            <span className="b1"></span>
            <span className="b2"></span>
            <span className="b3"></span>
        </div>
        <div className="m-hero-mesh" aria-hidden="true"></div>
        {fxOn
            ? (
                <Suspense fallback={<div className="m-hero-word" aria-hidden="true">SHIFT</div>}>
                    <ParticleHero />
                </Suspense>
            )
            : <div className="m-hero-word" aria-hidden="true">SHIFT</div>}
        <div className="s-container s-hero-inner m-hero-full-inner">
            <div>
                <div className="s-eyebrow">
                    <span className="s-eyebrow-brand">Edu<em>Shift</em></span>
                    <span className="s-eyebrow-rule"></span>
                    <span>小さな塾と、フリーランス講師の伴走者 — since 2024</span>
                </div>
                <h1>
                    <span className="m-line"><span><span className="s-accent-line">教える時間</span>を、</span></span><br />
                    <span className="m-line"><span>取り戻す。</span></span>
                    <small>EduShift — giving teachers their time back, with web, custom tools and AI.</small>
                </h1>
                <div className="m-hero-bottom">
                    <div>
                        <p className="s-hero-body">
                            集客も、事務も、教材づくりも——ひとりで抱える"教える以外"を、HP・専用ツール・AIで軽くします。自動添削SaaSを自社開発するEduShiftが、あなたの塾の「IT部門」として伴走します。
                        </p>
                        <div className="m-aieo">
                            <span className="m-aieo-tag">HP制作 × 塾DX</span>
                            <strong>AIに読まれるHPも、塾専用ツールも、¥19,800から。</strong>
                        </div>
                        <div className="s-hero-cta">
                            <a href="#contact" className="s-btn-primary m-btn-current" data-magnetic>
                                まずは、30分だけお話ししませんか
                                <span className="arrow">→</span>
                            </a>
                            <a href="#services" className="s-btn-ghost">サービスを見る</a>
                        </div>
                    </div>
                    <div className="s-hero-mini-chips m-chips-row" aria-label="EduShiftの3つの柱と実装手段">
                        <div className="s-mini-chip" data-reveal="up" data-reveal-delay="1">
                            <span className="num">Pillar · 01</span>
                            <span className="label">コンサル</span>
                        </div>
                        <div className="s-mini-chip" data-reveal="up" data-reveal-delay="2">
                            <span className="num">Pillar · 02</span>
                            <span className="label">アプリ開発</span>
                        </div>
                        <div className="s-mini-chip" data-reveal="up" data-reveal-delay="3">
                            <span className="num">Pillar · 03</span>
                            <span className="label">HP制作</span>
                        </div>
                        <div className="s-mini-chip tool" data-reveal="up" data-reveal-delay="4">
                            <span className="num">Tools</span>
                            <span className="label">AI × Web</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="m-scroll-cue" aria-hidden="true">Scroll</div>
    </section>

    {/* ====== MARQUEE (Shift Current band) ====== */}
    <div className="m-marquee" aria-hidden="true">
        <div className="m-marquee-track">
            {[0, 1].map(i => (
                <span key={i}>
                    <span>AI × Education</span>
                    <span>HP制作 ¥19,800〜</span>
                    <span>ツール開発 ¥19,800〜</span>
                    <span>保守運用 ¥980/月〜</span>
                    <span>自動添削システム 自社開発</span>
                    <span>伴走コンサル ¥9,800〜</span>
                    <span>EduShift</span>
                </span>
            ))}
        </div>
    </div>

    {/* ====== NUMBERS BAND ====== */}
    <section className="s-numbers" aria-label="EduShiftの3つの入り口">
        <div className="s-container">
            <div className="s-numbers-grid">
                <div className="s-numbers-stats">
                    <div className="s-numbers-eyebrow" data-reveal="up">— A three-step pricing ladder, transparent from day one</div>
                    <div className="s-stat" data-reveal="up" data-reveal-delay="1">
                        <div className="s-stat-eyebrow">Trial</div>
                        <div className="s-stat-num">¥0<span className="unit">完全無料</span></div>
                        <div className="s-stat-label">30分の初回オンライン相談は完全無料。<br />売り込みは、ひとつもいたしません。</div>
                    </div>
                    <div className="s-stat" data-reveal="up" data-reveal-delay="2">
                        <div className="s-stat-eyebrow">First project</div>
                        <div className="s-stat-num"><CountUp value={9800} prefix="¥" /><span className="unit">〜/回</span></div>
                        <div className="s-stat-label">単発スポット相談で、<br />具体的な改善案までを1回で完結します。</div>
                    </div>
                    <div className="s-stat" data-reveal="up" data-reveal-delay="3">
                        <div className="s-stat-eyebrow">Long-term</div>
                        <div className="s-stat-num"><CountUp value={980} prefix="¥" /><span className="unit">〜/月</span></div>
                        <div className="s-stat-label">HP保守運用プランは月額¥980から。<br />"持ち続けられる"価格で長く伴走します。</div>
                    </div>
                </div>
                <figure className="s-numbers-visual" data-reveal="zoom" data-reveal-delay="2">
                    <img src={paperFlatlayImg} alt="EduShiftの仕事道具：紺のノート、万年筆、本、懐中時計" className="s-numbers-image" />
                </figure>
            </div>
        </div>
    </section>

    {/* ====== EMPATHY ====== */}
    <section className="s-empathy" id="empathy">
        <div className="s-container">
            <div className="s-empathy-quote" data-reveal="up">
                <h3>
                    「良い授業をしているのに、<br />
                    生徒が来ない。」<br />
                    ——この違和感は、<br />
                    あなたのせいじゃありません。
                </h3>
                <p>— 首都圏で1人塾を営む、ある先生の言葉から</p>
            </div>

            <div className="s-pain-list">
                <div className="s-pain-card" data-num="No. 01" data-reveal="up" data-reveal-delay="1">
                    <h4>チラシも、口コミも、効かなくなってきた。</h4>
                    <p>保護者は「検索」で塾を選ぶ時代。HPがない、古い、更新されていない——たったそれだけで、候補から外されています。</p>
                </div>
                <div className="s-pain-card" data-num="No. 02" data-reveal="up" data-reveal-delay="2">
                    <h4>事務作業が、教育の時間を削っている。</h4>
                    <p>月謝管理、保護者対応、シフト、報告書。本当に時間を使うべき"生徒一人"との対話が、後回しになっていませんか。</p>
                </div>
                <div className="s-pain-card" data-num="No. 03" data-reveal="up" data-reveal-delay="3">
                    <h4>相談できる人が、どこにもいない。</h4>
                    <p>大手コンサルは高額で、同業者はライバル。経営の悩みを誰にも話せないまま、ひとりで抱え続けている先生は少なくありません。</p>
                </div>
            </div>
        </div>
    </section>

    {/* ====== SERVICES ====== */}
    <section className="s-services" id="services">
        <div className="s-container">
            <div className="s-sec-head" data-reveal="up">
                <div className="s-sec-num">CHAPTER I · 3 Pillars</div>
                <div className="s-sec-titles">
                    <h2><em>相談</em>も、<em>道具</em>も、<em>集客</em>も。<br />3つの柱で伴走する。</h2>
                    <p className="s-sec-lede">
                        <strong>EduShift</strong> の柱は3本。悩みに寄り添う「コンサルティング」、日々を軽くする「アプリ・ツール制作」、選ばれる入口を作る「HP制作」——教える人の毎日を、まるごと支えます。
                    </p>
                </div>
            </div>

            <div className="s-service-grid has-pillars">
                <div className="s-service-card pillar" data-reveal="left">
                    <div className="s-service-num">Pillar · 01</div>
                    <h3>コンサルティング</h3>
                    <div className="s-service-en">Consulting</div>
                    <p>塾経営も、独立も、AI活用も、月¥14,800からの伴走型。単発スポット相談¥9,800で今日から。相場の1/3以下で、実務者が隣に付きます。</p>
                    <div className="m-hp-prices">
                        <span className="m-hp-price-chip">単発 ¥9,800/回</span>
                        <span className="m-hp-price-chip">月額 ¥14,800〜</span>
                        <span className="m-hp-price-chip">縛りなし</span>
                    </div>
                    <div className="s-service-tags">
                        <span className="s-service-tag">塾経営</span>
                        <span className="s-service-tag">独立支援</span>
                        <span className="s-service-tag tech">AI活用</span>
                    </div>
                    <a href="/service/consulting" className="s-service-link">詳しく読む →</a>
                </div>

                <div className="s-service-card pillar" data-reveal="up">
                    <div className="s-service-num">Pillar · 02</div>
                    <h3>塾DX・ツール開発</h3>
                    <div className="s-service-en">School DX &amp; Development</div>
                    <p>初期¥19,800〜+月額。報告書自動化などの単機能ツールから、自動添削システム級のWebアプリまで。あなたの塾専用の道具を、作って育てます。</p>
                    <div className="m-hp-prices">
                        <span className="m-hp-price-chip">開発 ¥19,800〜</span>
                        <span className="m-hp-price-chip">月額 ¥980〜</span>
                        <span className="m-hp-price-chip">自動添削SaaS 自社開発</span>
                    </div>
                    <div className="s-service-tags">
                        <span className="s-service-tag">バックオフィス</span>
                        <span className="s-service-tag">教材制作</span>
                        <span className="s-service-tag tech">指導サポートAI</span>
                    </div>
                    <a href="/service/dx-development" className="s-service-link">詳しく読む →</a>
                </div>

                <div className="s-service-card pillar m-hp-featured" data-reveal="right" data-reveal-delay="1">
                    <span className="m-hp-ribbon">{HOME_EMPHASIS.hpCardBadge}</span>
                    <div className="s-service-num">Pillar · 03</div>
                    <h3>HP制作・保守運用</h3>
                    <div className="s-service-en">Web Production &amp; Care</div>
                    <p>初期19,800円〜、月々980円〜。「立派なHP」より「今日から選ばれるHP」を。ブログ更新もSEOも、Web担当者のように支えます。</p>
                    <div className="m-hp-prices">
                        <span className="m-hp-price-chip">制作 ¥19,800〜</span>
                        <span className="m-hp-price-chip">保守 ¥980/月〜</span>
                        <span className="m-hp-price-chip">最短1週間で公開</span>
                    </div>
                    <div className="s-service-tags">
                        <span className="s-service-tag">低価格HP</span>
                        <span className="s-service-tag">AIブログ</span>
                        <span className="s-service-tag">保守運用</span>
                    </div>
                    <a href="/service/hp-production" className="s-service-link">詳しく読む →</a>
                </div>
            </div>
        </div>
    </section>

    {/* ====== SHOWCASE : HP制作 Before / After ====== */}
    <section className="m-showcase" id="hp-showcase">
        <div className="m-giant-word" aria-hidden="true">PROOF</div>
        <div className="s-container">
            <div data-reveal="up">
                <div className="s-sec-num">SHOWCASE · HP制作の実力</div>
                <h2>同じ塾でも、<em>デザインで、ここまで変わる</em>。</h2>
                <p className="m-showcase-lede">
                    私たち自身がHP制作のプロであることを、言葉ではなく実物でお見せします。下のボタンでBefore / Afterを切り替えて、変化を見比べてみてください。
                </p>
            </div>
            <div className="m-showcase-grid">
                <div data-reveal="left">
                    <BeforeAfterSlider
                        beforeSrc={hpBeforePanelImg}
                        afterSrc={hpAfterPanelImg}
                        alt="同じ内容の塾HPを、コピーとデザインの改善でどこまで変えられるかのBefore/After比較"
                    />
                    <p className="m-showcase-note">※同じ掲載内容・1ページ内での比較（Before: 写真なし / After: 写真あり）</p>
                </div>
                <div className="m-showcase-points">
                    <div className="m-showcase-point" data-reveal="right" data-reveal-delay="1">
                        <span className="num">01</span>
                        <div>
                            <h4>テンプレート型スピード納品</h4>
                            <p>初期¥19,800〜。デザインの自由度をあえて絞ることで、最短1週間で「今日から選ばれるHP」を公開します。</p>
                        </div>
                    </div>
                    <div className="m-showcase-point" data-reveal="right" data-reveal-delay="2">
                        <span className="num">02</span>
                        <div>
                            <h4>AIEO — AIに読まれるHPへ</h4>
                            <p>検索エンジンだけでなく、ChatGPTやClaudeなどのAIに「紹介される」ための構造化を標準対応します。</p>
                        </div>
                    </div>
                    <div className="m-showcase-point" data-reveal="right" data-reveal-delay="3">
                        <span className="num">03</span>
                        <div>
                            <h4>作りっぱなしにしない保守運用</h4>
                            <p>月額¥980〜の3プランで、稼働監視からAI活用・MEO対策まで。あなたの塾の「Web担当者」として伴走します。</p>
                        </div>
                    </div>
                    <div className="m-showcase-cta" data-reveal="up" data-reveal-delay="4">
                        <a href="/service/hp-production" className="s-btn-primary m-btn-current" data-magnetic>
                            HP制作プランを詳しく見る
                            <span className="arrow">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ---- ライブデモ: 実際に触れる制作事例 ---- */}
            <DeviceShowcase />

            {/* ---- HP制作料金 3プラン（データはサービス詳細と共通） ---- */}
            {HP_PRICING && (
                <div className="m-build-pricing" id="hp-pricing">
                    <div className="m-build-pricing-head" data-reveal="up">
                        <div className="s-sec-num">HP Production · 3 Plans</div>
                        <h3>HP制作料金、<em>3つのプラン</em>。</h3>
                        <p>{HP_PRICING.lede}</p>
                    </div>
                    <div className="m-build-price-grid">
                        {HP_PRICING.tiers.map((tier, i) => (
                            <div
                                key={tier.name}
                                className={`m-build-price-card${tier.recommended ? ' featured' : ''}`}
                                data-reveal="up"
                                data-reveal-delay={String(i + 1)}
                            >
                                {tier.recommended && <span className="m-care-reco">おすすめ</span>}
                                <h4>{tier.name}</h4>
                                <p className="m-build-blurb">{tier.blurb}</p>
                                <div className="s-sub-price-amount">
                                    <span className="amount"><CountUp value={priceToNumber(tier.price)} prefix="¥" /></span>
                                    {tier.priceUnit && <span className="unit">{tier.priceUnit} · 初期費用</span>}
                                </div>
                                <ul className="s-sub-price-features">
                                    {tier.features.map(f => <li key={f}>{f}</li>)}
                                </ul>
                                {tier.notes?.map(n => (
                                    <p key={n} className="s-sub-price-note">{n}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                    <p className="m-build-footnote" data-reveal="up">
                        公開後の保守・運用は<a href="#maintenance">月額¥980〜の3プラン</a>をご用意しています。
                    </p>
                </div>
            )}
        </div>
    </section>

    {/* ====== DEV WORKS : 開発実績(自動添削) ====== */}
    <section className="m-devworks" id="devworks">
        <div className="s-container">
            <div className="s-sec-head" data-reveal="up">
                <div className="s-sec-num">DEV WORKS · 自社開発SaaS</div>
                <div className="s-sec-titles">
                    <h2>あなたの指導に合わせた、<em>専用ツール</em>を作ります。</h2>
                </div>
            </div>
            <div className="m-devworks-card" data-reveal="up">
                <a href="https://auto-tensaku-system.vercel.app/" target="_blank" rel="noopener" className="m-devworks-shot">
                    <img src={autoTensakuImg} alt="国語記述 自動添削システムの画面" loading="lazy" />
                </a>
                <div className="m-devworks-body">
                    <h3>Taskal AI — 国語記述 自動添削システム</h3>
                    <p>中学・高校受験の国語記述答案を、AIが数十秒で添削・採点。企画から開発・運用まで、EduShiftが自社で行っているWebサービスです。この開発力で、あなたの塾専用のツールを作ります。</p>
                    <div className="m-devworks-links">
                        <a href="https://auto-tensaku-system.vercel.app/" target="_blank" rel="noopener" className="s-btn-ghost">サービスを見る ↗</a>
                        <a href="/service/dx-development" className="s-service-link">塾DX・ツール開発について →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* ====== FOUNDER ====== */}
    <section className="s-manifesto s-founder" id="founder">
        <div className="s-container s-founder-inner">
            <div className="s-founder-photo" data-reveal="left">
                <img src={founderImg} alt="吉井 勝彦" />
                <div className="s-founder-photo-caption">
                    <span>Katsuhiko Yoshii</span>
                    <em>Founder &amp; CEO</em>
                </div>
            </div>
            <div data-reveal="right" data-reveal-delay="1">
                <div className="s-manifesto-label">
                    <div>❦</div>
                    Our Belief — 01
                </div>
                <h2>
                    私たちは、<span>"先生の味方"</span>でありたい。<br />
                    AIは、教壇に立つ人の<br />道具であり続けなければならない。
                </h2>
                <p>
                    EduShiftが生まれたのは、教育の現場で働く一人の人間として、こう思ったからです——「生徒と向き合う時間を、もっと先生に返したい」。
                </p>
                <p>
                    テクノロジーは、教育を冷たくするためのものではありません。むしろ、事務や雑務という"重力"から先生を解放し、人間にしかできない"温かい対話"のための時間を増やすための道具です。
                </p>
                <p>
                    私たちは、最新のAIと、泥臭い現場の知恵を融合させながら、教育に関わるすべての人の、最も近い相談相手でありたいと願っています。
                </p>
                <div className="s-founder-meta">
                    <div>
                        <span className="s-founder-meta-label">代表</span>
                        <span className="s-founder-meta-value">吉井 勝彦 <small>Katsuhiko Yoshii</small></span>
                    </div>
                    <div>
                        <span className="s-founder-meta-label">肩書</span>
                        <span className="s-founder-meta-value">EduShift 代表／教育コンサルタント</span>
                    </div>
                    <div>
                        <span className="s-founder-meta-label">経歴</span>
                        <span className="s-founder-meta-value">長年教育業界に身を置き、生徒の成長に立ち会いながら、経営や雑務のジレンマと向き合ってきた。最新のAIと現場の知恵を融合し、小さな塾と独立系教育者の最も近い相談相手であり続けることを志す。</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* ====== VOICE / TESTIMONIAL ====== */}
    <section className="s-voice" id="voice">
        <div className="s-container">
            <div className="s-sec-head" data-reveal="up">
                <div className="s-sec-num">CHAPTER II · 3つの約束</div>
                <div className="s-sec-titles">
                    <h2>小さな塾に、<em>はじめから</em>寄り添うために。</h2>
                    <p className="s-sec-lede">ご契約前にお読みいただきたい、EduShiftの運用ルールです。見えにくい部分ほど、先にはっきりさせておきたいと思っています。</p>
                </div>
            </div>

            <div className="s-voice-grid">
                <div className="s-voice-card" data-reveal="up" data-reveal-delay="1">
                    <div className="s-voice-quote-mark">I</div>
                    <blockquote>
                        <strong>縛らない。</strong><br />
                        <br />
                        期間コンサルは月単位で継続・解約が可能。<br />
                        顧問契約は個別の契約書に基づき、中途の取り扱いもその場で明文化します。
                    </blockquote>
                    <footer>
                        <div className="s-voice-avatar">①</div>
                        <div className="s-voice-name">
                            <strong>契約期間の縛りなし</strong>
                            <span>いつでも解約可能／料金プラン準拠</span>
                        </div>
                    </footer>
                </div>

                <div className="s-voice-card" data-reveal="up" data-reveal-delay="2">
                    <div className="s-voice-quote-mark">II</div>
                    <blockquote>
                        <strong>まず、話す。</strong><br />
                        <br />
                        ご契約前に無料相談（オンラインZoom）。<br />
                        単発スポット相談は¥9,800〜。"売り込み"は、ひとつもいたしません。
                    </blockquote>
                    <footer>
                        <div className="s-voice-avatar">②</div>
                        <div className="s-voice-name">
                            <strong>無料相談＋スポット診断</strong>
                            <span>Zoom基本／現地対応は首都圏</span>
                        </div>
                    </footer>
                </div>

                <div className="s-voice-card" data-reveal="up" data-reveal-delay="3">
                    <div className="s-voice-quote-mark">III</div>
                    <blockquote>
                        <strong>代表が、直接。</strong><br />
                        <br />
                        現場を知る代表・吉井がご相談から実行支援まで対応。<br />
                        途中で担当が変わることはありません。
                    </blockquote>
                    <footer>
                        <div className="s-voice-avatar">③</div>
                        <div className="s-voice-name">
                            <strong>代表が、はじめから最後まで</strong>
                            <span>少人数体制／顔の見える距離で</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </section>

    {/* ====== PRICING ====== */}
    <section className="s-pricing" id="pricing">
        <div className="s-container">
            <div className="s-sec-head" data-reveal="up">
                <div className="s-sec-num">CHAPTER III · 料金</div>
                <div className="s-sec-titles">
                    <h2>"ちょうどいい"を、<em>一緒に見つける。</em></h2>
                    <p className="s-sec-lede">
                        いきなり大きな契約はしません。まずは単発の相談から、あなたの塾の状況に合ったプランを、一緒に選んでいきましょう。契約期間の縛りはありません。
                    </p>
                </div>
            </div>

            <div className="s-price-grid">
                <div className="s-price-card" data-reveal="up" data-reveal-delay="1">
                    <div className="s-price-label">Plan · 01</div>
                    <h3>単発スポット</h3>
                    <p className="s-price-blurb">まずは一度、現状を見てもらいたい方へ</p>
                    <div className="s-price-amount">
                        <span className="amount"><CountUp value={9800} prefix="¥" /></span>
                        <span className="unit">〜 / 回</span>
                    </div>
                    <ul className="s-price-features">
                        <li>オンライン or 現地（首都圏）</li>
                        <li>現状のヒアリング・診断</li>
                        <li>改善案をその場で提示</li>
                        <li>無理な追加提案なし</li>
                    </ul>
                    <button className="s-price-cta">相談してみる</button>
                </div>

                <div className="s-price-card featured" data-reveal="up" data-reveal-delay="2">
                    <div className="s-price-label">Plan · 02  —  Recommended</div>
                    <h3>スタンダード</h3>
                    <p className="s-price-blurb">施策を一緒に実行する、本格伴走</p>
                    <div className="s-price-amount">
                        <span className="amount"><CountUp value={29800} prefix="¥" /></span>
                        <span className="unit">〜 / 月</span>
                    </div>
                    <ul className="s-price-features">
                        <li>月3回のオンライン面談</li>
                        <li>チャット相談 無制限</li>
                        <li>施策の実行・検証まで伴走</li>
                        <li>集客物・資料の添削込み</li>
                    </ul>
                    <button className="s-price-cta">詳しく話を聞く</button>
                </div>

                <div className="s-price-card" data-reveal="up" data-reveal-delay="3">
                    <div className="s-price-label">Plan · 03</div>
                    <h3>フル</h3>
                    <p className="s-price-blurb">AI活用まで含めた、まるごと顧問</p>
                    <div className="s-price-amount">
                        <span className="amount"><CountUp value={49800} prefix="¥" /></span>
                        <span className="unit">〜 / 月</span>
                    </div>
                    <ul className="s-price-features">
                        <li>月4回（週1ペース）のオンライン面談</li>
                        <li>AI活用ハンズオン</li>
                        <li>ツール開発・HP制作の優待価格</li>
                        <li>優先対応</li>
                    </ul>
                    <button className="s-price-cta">お問い合わせ</button>
                </div>
            </div>

            <p className="s-sub-price-cta-row" data-reveal="up">
                ライト（月2回面談 ¥14,800/月）など全プランの詳細は
                <a href="/service/consulting">コンサルティングのページ</a>
                へ。
            </p>

            {/* ====== Sub-pricing : HP保守・運用（3パターン / データ駆動） ====== */}
            <div className="s-sub-pricing m-care" id="maintenance">
                <div className="m-giant-word" aria-hidden="true">CARE</div>
                <div className="s-sub-pricing-head" data-reveal="up">
                    <div className="s-sub-num">HP Maintenance · 3 Plans</div>
                    <h3>HP制作後の、<em>保守・運用プラン</em></h3>
                    <p>
                        作りっぱなしにしない。成長し続けるHPのために、月額¥980〜の保守プランをご用意しています。稼働監視から、AI活用・MEO対策まで。
                    </p>
                </div>

                <div className="s-sub-price-grid">
                    {MAINTENANCE_PLANS.map((plan, i) => {
                        const isReco = plan.id === HOME_EMPHASIS.recommendedPlan;
                        return (
                            <div
                                key={plan.id}
                                className={`s-sub-price-card${isReco ? ' featured' : ''}`}
                                data-reveal="up"
                                data-reveal-delay={String(i + 1)}
                            >
                                {isReco && <span className="m-care-reco">いちばん選ばれています</span>}
                                <div className="s-sub-price-tier">{plan.tierEn}</div>
                                <h4>{plan.name}</h4>
                                <div className="s-sub-price-amount">
                                    <span className="amount"><CountUp value={plan.price} prefix="¥" /></span>
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

                <p className="s-sub-price-cta-row" data-reveal="up">
                    HP制作費は別途見積（初期¥19,800〜）。詳しくは
                    <a href="/service/hp-production">サービス詳細ページ</a>
                    をご覧ください。
                </p>
            </div>
        </div>
    </section>

    {/* ====== JOURNAL / BLOG ====== */}
    <section className="s-journal" id="journal">
        <div className="s-container">
            <div className="s-journal-head" data-reveal="up">
                <div>
                    <div className="s-sec-num">CHAPTER IV · 読みもの</div>
                    <h2>小さな塾のための、<em>思考のノート</em>。</h2>
                </div>
                <a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-journal-more">noteですべての記事を読む →</a>
            </div>

            <div className="s-journal-grid" id="journal-grid" data-reveal="up" data-reveal-delay="1">
                <a href="https://note.com/katsu_yossy/n/n773d255a24a6" target="_blank" rel="noopener" className="s-journal-card feat">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/263326116/rectangle_large_type_2_27918fe56697697903911e638e4a2a5a.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">Featured · AI対話</span>
                        <span className="s-journal-thumb-num">01</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat teal">AI活用</span>
                        <span>2026.03.30</span>
                        <span>·  note</span>
                    </div>
                    <h3>「なぜその解き方？」をClaudeに5回聞く<br />—— 算数・数学の理解を深める対話術</h3>
                    <p>解法を教わる時代から、"なぜ"を問い続ける時代へ。Claudeとの5回の対話で、生徒の理解がどう変わるか。指導現場からの実例。</p>
                </a>

                <a href="https://note.com/katsu_yossy/n/n0cca5f255779" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/262049143/rectangle_large_type_2_28ac737c7bf32eb6d02da61dd539a8e2.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">塾経営</span>
                        <span className="s-journal-thumb-num">02</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat">塾経営</span>
                        <span>2026.03.25</span>
                    </div>
                    <h3>Z会・代ゼミがAI導入を加速。<br />個人塾が今すぐできる差別化とは？</h3>
                </a>

                <a href="https://note.com/katsu_yossy/n/n3c70fd6b5f85" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/260979258/rectangle_large_type_2_1cc4635ae43f6ecfed4bced250df7db2.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">AI · Practice</span>
                        <span className="s-journal-thumb-num">03</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat teal">AI活用</span>
                        <span>2026.03.21</span>
                    </div>
                    <h3>過去問5年分をClaude Projectsに入れたら、<br />入試の傾向が見えてきた。</h3>
                </a>

                <a href="https://note.com/katsu_yossy/n/nb7dde512ed12" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/260561896/rectangle_large_type_2_51e859f56e8b84b662289a9d3f0c4baa.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">Workflow</span>
                        <span className="s-journal-thumb-num">04</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat blue">働き方</span>
                        <span>2026.03.20</span>
                    </div>
                    <h3>日記・メモのデータ化が、<br />AIを"使える部下"に変えていく。</h3>
                </a>

                <a href="https://note.com/katsu_yossy/n/n8298d03f3adc" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/259308050/rectangle_large_type_2_1bae7456f35a5514e1381c9a1c313e5b.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">Case Study</span>
                        <span className="s-journal-thumb-num">05</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat gold">事例</span>
                        <span>2026.03.15</span>
                    </div>
                    <h3>フリーランス講師のAI活用リアル<br />—— 導入2年の"できたこと・できないこと"。</h3>
                </a>
            </div>
        </div>
    </section>

    {/* ====== COMPANY ====== */}
    <section className="s-company" id="company">
        <div className="s-container">
            <div className="s-sec-head" data-reveal="up">
                <div className="s-sec-num">CHAPTER V · 会社概要</div>
                <div className="s-sec-titles">
                    <h2>About <em>EduShift</em>.</h2>
                    <p className="s-sec-lede">教育の現場に根ざした、小さな会社です。</p>
                </div>
            </div>

            <div className="s-company-grid">
                <aside className="s-company-aside">
                    <h3>顔の見える距離で、<br />伴走する。</h3>
                    <p>
                        大規模な代理店ではありません。代表・吉井を中心とした少人数のチームで、一件一件の塾・先生と、顔の見える距離でお付き合いをしています。
                    </p>
                    <p>
                        "成果を出すこと"と"現場に寄り添うこと"。この2つを両立できる規模を、私たちは大切にしています。
                    </p>
                    <div className="s-company-seal">Tokyo · Ebisu-nishi</div>
                </aside>

                <dl className="s-company-table">
                    <div className="s-company-row">
                        <dt>Name <span>屋号</span></dt>
                        <dd>EduShift</dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Founder <span>代表者</span></dt>
                        <dd>吉井 勝彦 <small>Katsuhiko Yoshii</small></dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Address <span>所在地</span></dt>
                        <dd>〒150-0021<br />東京都渋谷区恵比寿西2丁目4番8号<br />ウィンド恵比寿ビル8F</dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Services <span>事業内容</span></dt>
                        <dd>
                            学習塾・スクール向け経営コンサルティング／<br />
                            教育機関向けAI導入支援・DX推進／<br />
                            教育関連フリーランス独立支援・育成／<br />
                            教育アプリ・システム開発／<br />
                            Webサイト制作・保守運用支援
                        </dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Clients <span>主なお客さま</span></dt>
                        <dd>個人塾・中小規模の学習塾、独立系の先生、教育機関、フリーランス講師</dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Contact <span>お問い合わせ</span></dt>
                        <dd>info@edu-shift.com<small>（ご返信は2営業日以内）</small></dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Notation <span>法令表記</span></dt>
                        <dd><a href="/business-law" style={{"color": `var(--s-teal-deep)`, "textDecoration": `underline`}}>特定商取引法に基づく表記</a></dd>
                    </div>
                </dl>
            </div>
        </div>
    </section>

    {/* ====== FAQ ====== */}
    <section className="s-faq" id="faq">
        <div className="s-container">
            <div className="s-sec-head" data-reveal="up">
                <div className="s-sec-num">CHAPTER VI · よくあるご質問</div>
                <div className="s-sec-titles">
                    <h2>ご相談の前に、<em>よくいただく問い</em>。</h2>
                    <p className="s-sec-lede">それでも解消しない不安は、無料相談で直接お話しさせてください。</p>
                </div>
            </div>

            <div className="s-faq-list">
                <details className="s-faq-item" open>
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">契約期間の縛りはありますか？いつでも解約できますか？</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        ございません。期間コンサル（¥29,800/月〜）は月単位で継続・解約が可能です。顧問・年間契約の中途解約については、個別の契約書に定める条件に従います。<br />
                        <small style={{"color": `var(--s-ink-500)`}}>※ ご入金後の返金は、当方の都合でサービス提供できなくなった場合を除き、原則お受けしておりません。</small>
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">初回相談は無料ですか？まずは話だけ聞きたいのですが。</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        はい、契約前の無料相談（オンライン）をご用意しています。より深く現状を診断したい場合は、単発スポット（¥9,800〜/回）で具体的な改善案の提示までを1回で完結できます。売り込みのための面談は行いません。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">HP制作の料金と、制作時の修正回数を教えてください。</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        制作プランは、ライト ¥19,800、スタンダード ¥39,800、プレミアム ¥98,000（いずれも税抜・初期費用）。保守運用は月々 ¥980〜 ¥29,800 の3プランです。ライト／スタンダードプランの修正は「納品前まで3回」、プレミアムプランは「規定範囲内で詳細修正対応」として低価格を実現しています（以降は有償対応）。原稿・画像は指定フォーマット（Excel／Word）で全てご用意いただいた段階で着手します。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">支払い方法・支払い時期はどうなっていますか？</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        銀行振込またはクレジットカード決済に対応しています。銀行振込は請求書発行から1週間以内、クレジットカードは各カード会社の引き落とし日となります。詳細は<a href="/business-law" style={{"color": `var(--s-teal-deep)`}}>特定商取引法に基づく表記</a>をご参照ください。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">遠方でも依頼できますか？現地対応のエリアは？</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        お打ち合わせはZoom等オンラインが基本のため、全国どこからでもご依頼いただけます。単発スポット（¥9,800〜）の現地対応は首都圏を基本としています。そのほかの地域での対面対応をご希望の場合は、別途ご相談ください。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">サービス提供までの流れと、提供期間を教えてください。</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        単発スポットはご入金確認後、日程調整の上で実施します。期間コンサル・顧問契約は、契約締結後に合意した開始日から提供を開始します。サービス内容は、<a href="#services" style={{"color": `var(--s-teal-deep)`}}>3つのサービス</a>（コンサルティング／アプリ・ツール制作／HP制作・運用）の中から、現状と目的に合わせてご提案します。
                    </div>
                </details>
            </div>
        </div>
    </section>

    {/* ====== FINAL CTA ====== */}
    <section className="s-final" id="contact">
        <div className="m-giant-word" aria-hidden="true">TALK</div>
        <div className="s-container s-final-inner" data-reveal="up">
            <div className="s-final-brand">Edu<em>Shift</em></div>
            <div className="s-final-eyebrow">— 最後に、ひとことだけ。</div>
            <h2>
                一度、<em>お話ししませんか</em>。<br />
                きっと、新しい景色が見えます。
            </h2>
            <p>
                <strong>EduShift</strong> の30分無料面談で、あなたの塾の現状を一緒に見ていきます。<br />
                "売り込み"は、ひとつもいたしません。情報収集のためだけでも、歓迎です。
            </p>
            <a href="mailto:info@edu-shift.com?subject=%E7%84%A1%E6%96%99%E7%9B%B8%E8%AB%87%E3%81%AE%E4%BE%9D%E9%A0%BC&body=%E2%97%8B%E5%A1%BE%E5%90%8D%EF%BC%9A%0A%E2%97%8B%E5%9C%B0%E5%9F%9F%EF%BC%9A%0A%E2%97%8B%E7%94%9F%E5%BE%92%E6%95%B0%EF%BC%9A%0A%E2%97%8B%E3%81%94%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A%0A" className="s-final-cta">
                無料相談を予約する{'　'}→
            </a>
        </div>
    </section>

    {/* ====== FOOTER ====== */}
    <footer className="s-footer">
        <div className="s-container">
            <div className="s-footer-grid">
                <div>
                    <a href="#" className="s-footer-brand-logo" aria-label="EduShift">
                        <img src={logoImg} alt="EduShift" />
                        <span className="s-footer-brand-name-text">Edu<em>Shift</em></span>
                    </a>
                    <p style={{"fontFamily": `var(--s-serif-jp)`, "fontSize": `13px`, "lineHeight": `1.9`, "margin": `0`}}>
                        教育の"周辺"を、<br />いちばん近くで支える。
                    </p>
                </div>
                <div>
                    <h5>Services</h5>
                    <ul>
                        <li><a href="/service/consulting">コンサルティング</a></li>
                        <li><a href="/service/hp-production">HP制作・運用</a></li>
                        <li><a href="/service/dx-development">塾DX・ツール開発</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Company</h5>
                    <ul>
                        <li><a href="#founder">代表挨拶</a></li>
                        <li><a href="#company">会社概要</a></li>
                        <li><a href="#journal">ブログ（最新記事）</a></li>
                        <li><a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-footer-ext">note プロフィール<span aria-hidden="true">↗</span></a></li>
                        <li><a href="#faq">よくあるご質問</a></li>
                        <li><a href="#contact">お問い合わせ</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Legal</h5>
                    <ul>
                        <li><a href="/privacypolicy">プライバシーポリシー</a></li>
                        <li><a href="/business-law">特定商取引法</a></li>
                    </ul>
                </div>
            </div>
            <div className="s-footer-bottom">
                <span>© EduShift — All rights reserved.</span>
                <span>〒150-0021 東京都渋谷区恵比寿西2-4-8 ウィンド恵比寿ビル8F · info@edu-shift.com</span>
            </div>
        </div>
    </footer>

    {/* ====== Dynamic note articles loader ======
         Progressive enhancement: if assets/note-articles.json is reachable
         (same-origin fetch), the 5 Journal cards are re-rendered from the
         latest snapshot. Falls back to the static cards if fetch fails
         (file:// opens, no HTTP server, 404, etc).
         Refresh the JSON with: python3 scripts/fetch-note-articles.py */}
    


        </div>
    );
};
