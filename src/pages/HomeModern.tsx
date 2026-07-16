import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
    ArrowRight,
    BarChart3,
    Check,
    ChevronRight,
    Code2,
    Globe2,
    Mail,
    Menu,
    MessageSquareText,
    MonitorSmartphone,
    ShieldCheck,
    Sparkles,
    Workflow,
    X,
} from 'lucide-react';
import logoImg from '../assets/logo-shift-mark.png';
import sampleJukuHeroImg from '../assets/generated/stella-hero.webp';
import autoTensakuImg from '../assets/auto-tensaku-screenshot.jpg';
import starChartImg from '../assets/app-starchart.jpg';
import genpeiImg from '../assets/app-genpei.jpg';
import shokuensuiImg from '../assets/app-shokuensui.jpg';
import kairoImg from '../assets/app-kairo.jpg';
import zenchishiImg from '../assets/app-zenchishi.jpg';
import aiClassroomImg from '../assets/generated/edushift-ai-classroom.webp';
import aiWorkspaceImg from '../assets/generated/edushift-ai-workspace.webp';
import MetaTags from '../components/MetaTags';

const CONTACT_HREF = 'mailto:info@edu-shift.com?subject=%E7%84%A1%E6%96%99%E7%9B%B8%E8%AB%87%E3%81%AE%E4%BE%9D%E9%A0%BC&body=%E2%97%8B%E5%A1%BE%E5%90%8D%EF%BC%9A%0A%E2%97%8B%E5%9C%B0%E5%9F%9F%EF%BC%9A%0A%E2%97%8B%E7%94%9F%E5%BE%92%E6%95%B0%EF%BC%9A%0A%E2%97%8B%E3%81%94%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A%0A';

const NAV_ITEMS = [
    { label: '私たちについて', href: '#about' },
    { label: 'サービス', href: '#services' },
    { label: '制作・開発例', href: '#works' },
    { label: 'よくあるご質問', href: '#faq' },
];

const CAPABILITIES = [
    { label: '塾経営', Icon: BarChart3 },
    { label: 'HP制作', Icon: Globe2 },
    { label: '塾DX', Icon: Workflow },
    { label: 'AI教材', Icon: Sparkles },
    { label: '伴走支援', Icon: MessageSquareText },
];

const SERVICE_MENU = [
    {
        href: '/service/hp-production',
        en: 'WEB PRODUCTION & CARE',
        title: 'HP制作・保守運用',
        desc: '選ばれる塾のHPを、最短1週間・低価格で。公開後の保守まで対応。',
        accent: 'text-[#55D8CA]',
        items: [
            { name: '制作ライト（LP 1枚）', price: '¥19,800' },
            { name: '制作スタンダード（TOP＋3ページ）', price: '¥39,800' },
            { name: '制作プレミアム（TOP＋5〜7ページ）', price: '¥98,000' },
            { name: '保守・運用（3プラン）', price: '月額 ¥980〜' },
        ],
    },
    {
        href: '/service/dx-development',
        en: 'SCHOOL DX & DEVELOPMENT',
        title: '塾DX・専用ツール開発',
        desc: '報告書・教材・成績管理など、塾の繰り返し作業を専用ツールに。',
        accent: 'text-sky-300',
        items: [
            { name: 'ミニ（単機能ツール）', price: '¥19,800〜' },
            { name: 'スタンダード（業務アプリ）', price: '¥29,800〜' },
            { name: 'フル（Webサービス開発）', price: '¥98,000〜' },
            { name: '保守・改善相談つき', price: '月額 ¥980〜' },
        ],
    },
    {
        href: '/service/consulting',
        en: 'CONSULTING',
        title: '経営・独立・AI活用コンサル',
        desc: '塾経営の立て直し、講師の独立、AI活用を実務者が伴走支援。',
        accent: 'text-lime-300',
        items: [
            { name: '初回相談（30分・オンライン）', price: '無料' },
            { name: '単発スポット相談', price: '¥9,800/回' },
            { name: '月額伴走（ライト〜フル）', price: '¥14,800〜' },
            { name: 'AI活用ハンズオン（フル）', price: '¥49,800' },
        ],
    },
];

const FAQS = [
    {
        question: '初回相談は本当に無料ですか？',
        answer: 'はい。30分のオンライン相談は無料です。現状と課題を伺い、EduShiftで支援できる範囲を率直にお伝えします。相談後の営業連絡を前提にはしていません。',
    },
    {
        question: '小さな塾や、開業前の段階でも依頼できますか？',
        answer: 'はい。小規模塾と独立する先生が主な対象です。構想段階の整理から、集客導線、業務設計、HPや専用ツールの実装まで、必要な部分だけを選んで依頼できます。',
    },
    {
        question: 'HP制作や専用ツールの料金はいくらですか？',
        answer: 'HP制作と小規模な専用ツールは初期19,800円からです。要件やページ数、機能により変わるため、着手前に範囲と金額を明示します。HP保守は月額980円から用意しています。',
    },
    {
        question: 'AIに詳しくなくても利用できますか？',
        answer: '問題ありません。ツール名から決めるのではなく、今の業務を確認して、使う意味がある部分だけにAIを組み込みます。導入後に現場で使い続けられる形まで伴走します。',
    },
    {
        question: '塾のAI活用は、何から始めればいいですか？',
        answer: '効果が出やすいのは、教材・小テストの作成、記述添削、指導報告書や保護者向け文面の作成です。EduShiftはChatGPT・Claude・Geminiを業務と予算に合わせて選び、今日から使える形で導入まで伴走します。国語記述の自動添削SaaS「Taskal AI」の自社開発で得た実務ノウハウが土台です。',
    },
    {
        question: '遠方でも依頼できますか？',
        answer: '全国からオンラインで依頼できます。打ち合わせは原則オンラインで行い、訪問が必要な場合は内容と交通費を事前に相談します。',
    },
    {
        question: '契約期間の縛りはありますか？いつでも解約できますか？',
        answer: 'ございません。月額コンサル（ライト¥14,800〜フル¥49,800/月）はすべて月単位で継続・解約が可能です。なお、ご入金後の返金は、当方の都合でサービス提供できなくなった場合を除き、原則お受けしておりません。',
    },
    {
        question: '支払い方法・支払い時期はどうなっていますか？',
        answer: '銀行振込またはクレジットカード決済に対応しています。銀行振込は請求書発行から1週間以内、クレジットカードは各カード会社の引き落とし日となります。詳細は特定商取引法に基づく表記をご参照ください。',
    },
    {
        question: 'サービス提供までの流れと、提供期間を教えてください。',
        answer: '単発スポットはご入金確認後、日程調整の上で実施します。月額コンサル（スタンダード・フルなど）は、契約締結後に合意した開始日から提供を開始します。サービス内容は3つのサービス（コンサルティング／アプリ・ツール制作／HP制作・運用）の中から、現状と目的に合わせてご提案します。',
    },
];

type FadeInUpProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

const FadeInUp = ({ children, className = '', delay = 0 }: FadeInUpProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced || typeof IntersectionObserver === 'undefined') {
            const frame = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(frame);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setVisible(true);
                observer.disconnect();
            },
            { threshold: 0.14, rootMargin: '0px 0px -7% 0px' },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

type MotionMediaProps = {
    src: string;
    poster: string;
    alt: string;
    className: string;
};

const MotionMedia = ({ src, poster, alt, className }: MotionMediaProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const host = hostRef.current;
        if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        if (typeof IntersectionObserver === 'undefined') {
            const frame = requestAnimationFrame(() => setActive(true));
            return () => cancelAnimationFrame(frame);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setActive(true);
                observer.disconnect();
            },
            { threshold: 0.08, rootMargin: '180px 0px' },
        );
        observer.observe(host);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={hostRef} className={className} role="img" aria-label={alt}>
            {active ? (
                <video
                    className="h-full w-full object-cover"
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                />
            ) : (
                <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" aria-hidden="true" />
            )}
        </div>
    );
};

const HeroMedia = ({ poster }: { poster: string }) => {
    const [motionAllowed, setMotionAllowed] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);

    useEffect(() => {
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => setMotionAllowed(!motionPreference.matches);

        updatePreference();
        motionPreference.addEventListener('change', updatePreference);
        return () => motionPreference.removeEventListener('change', updatePreference);
    }, []);

    const mediaClassName = 'h-full w-full object-cover object-[68%_50%] opacity-70';

    if (!motionAllowed || videoFailed) {
        return (
            <img
                src={poster}
                alt=""
                className={`es-hero-image ${mediaClassName}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                aria-hidden="true"
            />
        );
    }

    return (
        <video
            className={mediaClassName}
            src="/videos/edushift-hero-classroom.mp4"
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
        />
    );
};

const Brand = ({ compact = false }: { compact?: boolean }) => (
    <span className={`inline-flex items-center ${compact ? 'gap-2.5' : 'gap-3.5'}`}>
        <img
            src={logoImg}
            alt=""
            className={`${compact ? 'h-10' : 'h-12 md:h-[60px]'} w-auto shrink-0`}
        />
        <span className={`es-wordmark ${compact ? 'text-[22px]' : 'text-2xl md:text-[28px]'}`}>
            Edu<em>Shift</em>
        </span>
        {!compact && <span className="hidden h-8 w-px bg-white/30 lg:block" />}
        {!compact && <span className="es-serif hidden whitespace-nowrap text-[11px] tracking-[0.3em] text-white/65 lg:block">学びの伴走者</span>}
    </span>
);

const SectionBadge = ({ children, tone = 'teal' }: { children: ReactNode; tone?: 'teal' | 'blue' | 'lime' }) => {
    const toneClass = tone === 'blue' ? 'text-sky-300' : tone === 'lime' ? 'text-lime-300' : 'text-[#55D8CA]';
    return (
        <div className={`mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] ${toneClass}`}>
            <Sparkles className="h-3.5 w-3.5" />
            {children}
        </div>
    );
};

export const HomeModern = () => {
    const [scrolled, setScrolled] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileNavRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = navOpen ? 'hidden' : '';
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape' || !navOpen) return;
            setNavOpen(false);
            menuButtonRef.current?.focus();
        };
        const focusTimer = navOpen
            ? window.setTimeout(() => mobileNavRef.current?.querySelector<HTMLElement>('a[href]')?.focus(), 50)
            : 0;
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
            window.clearTimeout(focusTimer);
        };
    }, [navOpen]);

    const closeNav = () => setNavOpen(false);

    return (
        <div className="es-dark min-h-screen overflow-x-clip bg-black text-white selection:bg-[#2DB3A0] selection:text-black">
            <MetaTags
                title="小規模塾・独立する先生のためのAI×Web経営パートナー"
                description="EduShiftは、小規模塾と独立する先生を、コンサルティング・塾DX・HP制作の3本柱で支えるAI×Web経営パートナーです。"
                url="/"
            />
            <style>{`
                html { scroll-behavior: smooth; scroll-padding-top: 88px; }
                body { background: #000; }
                .es-dark { font-family: "Inter", "Noto Sans JP", sans-serif; }
                .es-serif { font-family: "Shippori Mincho", "Noto Serif JP", serif; }
                .es-display { font-family: "Shippori Mincho", "Noto Serif JP", serif; }
                .es-wordmark { font-family: "Playfair Display", "Shippori Mincho", serif; font-weight: 700; line-height: 1; color: #fff; }
                .es-wordmark em { color: #0293f0; font-style: italic; font-weight: 500; }
                .es-header::before { content: ""; position: absolute; inset: 0; z-index: -1; background: rgba(0,0,0,.8); border-bottom: 1px solid rgba(255,255,255,.08); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); opacity: 0; transition: opacity .35s ease; }
                .es-header.is-scrolled::before, .es-header.is-open::before { opacity: 1; }
                .es-hero-image { animation: es-hero-drift 18s ease-in-out infinite alternate; }
                .es-marquee { -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent); mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent); }
                .es-marquee-track { animation: es-marquee 30s linear infinite; }
                .es-faq-grid { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s cubic-bezier(.16,1,.3,1); }
                .es-faq-grid.is-open { grid-template-rows: 1fr; }
                .es-faq-grid > div { overflow: hidden; }
                .es-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E"); }
                @keyframes es-marquee { to { transform: translateX(-33.333333%); } }
                @keyframes es-hero-drift { from { transform: scale(1.04) translate3d(0,0,0); } to { transform: scale(1.12) translate3d(-2%, -1.5%, 0); } }
                @media (prefers-reduced-motion: reduce) {
                    html { scroll-behavior: auto; }
                    .es-hero-image, .es-marquee-track { animation: none !important; }
                    .es-dark *, .es-dark *::before, .es-dark *::after {
                        animation-duration: .01ms !important;
                        animation-iteration-count: 1 !important;
                        scroll-behavior: auto !important;
                        transition-duration: .01ms !important;
                    }
                }
            `}</style>

            <a href="#main-content" className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:not-sr-only focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-black">
                本文へ移動
            </a>

            <header className={`es-header isolate fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${scrolled ? 'is-scrolled py-2' : 'py-3'}${navOpen ? ' is-open' : ''}`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
                    <a href="#about" aria-label="EduShift トップへ" onClick={closeNav}>
                        <Brand />
                    </a>

                    <nav className="hidden items-center gap-8 lg:flex" aria-label="主要ナビゲーション">
                        {NAV_ITEMS.map((item) => (
                            <a key={item.href} href={item.href} className="text-sm font-medium text-white/65 transition-colors hover:text-white">
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden lg:block">
                        <a href={CONTACT_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1F1F22] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2A2D]">
                            無料相談
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <button
                        ref={menuButtonRef}
                        type="button"
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
                        aria-label={navOpen ? 'メニューを閉じる' : 'メニューを開く'}
                        aria-expanded={navOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setNavOpen((open) => !open)}
                    >
                        {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                <div
                    ref={mobileNavRef}
                    id="mobile-navigation"
                    className={`absolute inset-x-4 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/10 bg-[#111113]/95 shadow-2xl shadow-black/60 transition-[opacity,transform,visibility] duration-300 lg:hidden ${navOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'}`}
                >
                    <nav className="flex flex-col p-3" aria-label="モバイルナビゲーション">
                        {NAV_ITEMS.map((item) => (
                            <a key={item.href} href={item.href} onClick={() => { closeNav(); menuButtonRef.current?.focus(); }} className="rounded-xl px-4 py-3.5 text-sm font-medium text-white/75 transition hover:bg-white/[0.06] hover:text-white">
                                {item.label}
                            </a>
                        ))}
                        <a href={CONTACT_HREF} onClick={() => { closeNav(); menuButtonRef.current?.focus(); }} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-black">
                            30分の無料相談
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </nav>
                </div>
            </header>

            <main id="main-content" tabIndex={-1}>
                <section id="about" className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-32 sm:px-6">
                    <div className="absolute inset-0 -z-20 bg-black">
                        <HeroMedia poster={aiClassroomImg} />
                    </div>
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,.42),rgba(0,0,0,.34)_36%,#000_96%)]" />
                    <div className="es-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.09]" aria-hidden="true" />
                    <div className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,179,160,.2),rgba(2,147,240,.08)_45%,transparent_70%)] blur-2xl" aria-hidden="true" />
                    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                        <FadeInUp>
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">
                                <Sparkles className="h-3.5 w-3.5 text-[#55D8CA]" />
                                小規模塾・独立する先生のための AI × Web パートナー
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={90}>
                            <h1 className="es-display text-balance text-5xl font-medium leading-[1.18] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
                                教える時間を、<br />
                                <span className="font-normal italic text-white">取り戻す。</span>
                            </h1>
                        </FadeInUp>

                        <FadeInUp delay={180}>
                            <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-8 text-white/55">
                                集客も、事務も、教材づくりも。ひとりで抱える「教える以外」を、HP・専用ツール・AIで軽くします。
                            </p>
                        </FadeInUp>

                        <FadeInUp delay={270} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                            <a href={CONTACT_HREF} className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90">
                                まずは無料で相談する
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a href="#services" className="inline-flex min-w-40 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1F1F22]/90 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2A2D]">
                                サービスを見る
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </FadeInUp>
                    </div>

                    <div className="mt-24 w-full max-w-7xl">
                        <p className="mb-8 text-center text-sm font-medium text-white/55">塾経営の周辺業務を、ひとつにつなぐ</p>
                        <div className="es-marquee overflow-hidden">
                            <div className="es-marquee-track flex w-max">
                                {[0, 1, 2].map((group) => (
                                    <div key={group} className="flex shrink-0 items-center" aria-hidden={group > 0}>
                                        {CAPABILITIES.map(({ label, Icon }) => (
                                            <div key={`${group}-${label}`} className="flex shrink-0 items-center gap-3 px-8 text-white/50 sm:px-10">
                                                <Icon className="h-5 w-5 stroke-[1.5]" />
                                                <span className="es-serif whitespace-nowrap text-base font-medium tracking-[0.08em]">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="services" className="border-t border-white/[0.06] px-5 py-24 sm:px-6 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <FadeInUp className="mx-auto mb-20 max-w-3xl text-center">
                            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#55D8CA]">THREE PILLARS</p>
                            <h2 className="es-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                                必要な支援を、<br className="sm:hidden" />ひとつの窓口で。
                            </h2>
                            <p className="mt-6 text-[16px] leading-8 text-white/55">
                                相談だけで終わらせず、設計から実装、公開後の改善まで。塾の規模と今の課題に合わせて組み合わせます。
                            </p>
                        </FadeInUp>

                        <div className="mb-8 grid gap-5 lg:grid-cols-3" aria-label="サービスメニュー一覧">
                            {SERVICE_MENU.map((service, index) => (
                                <FadeInUp key={service.href} delay={index * 90} className="h-full">
                                    <a
                                        href={service.href}
                                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0E0E10] p-7 transition duration-500 hover:-translate-y-2 hover:border-white/20"
                                    >
                                        <p className={`text-[10px] font-semibold tracking-[0.18em] ${service.accent}`}>{service.en}</p>
                                        <h3 className="es-serif mt-3 text-xl font-semibold text-white">{service.title}</h3>
                                        <p className="mt-3 text-sm leading-6 text-white/55">{service.desc}</p>
                                        <ul className="mt-6 flex-1 divide-y divide-white/[0.06] border-t border-white/[0.06]">
                                            {service.items.map((item) => (
                                                <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
                                                    <span className="text-[13px] leading-5 text-white/65">{item.name}</span>
                                                    <span className="shrink-0 text-sm font-semibold text-white">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${service.accent}`}>
                                            詳しく見る <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                        </span>
                                    </a>
                                </FadeInUp>
                            ))}
                        </div>
                        <FadeInUp>
                            <p className="text-center text-xs leading-6 text-white/45">
                                表示価格はすべて税抜です。各サービスの考え方と進め方は、このまま下へスクロールしてご覧いただけます。
                            </p>
                        </FadeInUp>

                        <div className="grid items-center gap-14 py-12 lg:grid-cols-2 lg:gap-20">
                            <FadeInUp>
                                <SectionBadge>HP制作・運用</SectionBadge>
                                <h3 className="es-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">選ばれる理由を、<br />一画面ずつ形にする。</h3>
                                <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/55">
                                    学習塾の検討者が知りたい情報を整理し、スマートフォンで読みやすく、AIにも内容が伝わるHPを制作します。初期19,800円から、保守は月額980円からです。
                                </p>
                                <ul className="mt-8 space-y-3 text-sm text-white/65">
                                    {['最短1週間のスピード公開', 'AI検索を見据えた情報設計', '公開後の更新・保守まで対応'].map((item) => (
                                        <li key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-[#55D8CA]" />{item}</li>
                                    ))}
                                </ul>
                                <a href="/service/hp-production" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">
                                    HP制作を詳しく見る <ArrowRight className="h-4 w-4" />
                                </a>
                            </FadeInUp>

                            <FadeInUp delay={120} className="relative min-h-[500px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0E0E10] p-5 shadow-2xl shadow-black sm:p-8">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,179,160,.18),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(2,147,240,.16),transparent_45%)]" />
                                <div className="relative mx-auto flex h-full max-w-[440px] flex-col justify-center">
                                    <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
                                        <div className="flex items-center gap-2 text-xs text-white/55"><MonitorSmartphone className="h-4 w-4 text-[#55D8CA]" />Responsive preview</div>
                                        <span className="rounded-full bg-[#2DB3A0]/15 px-2.5 py-1 text-[10px] font-semibold text-[#55D8CA]">LIVE</span>
                                    </div>
                                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_80px_rgba(0,0,0,.55)]">
                                        <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#F3F4F6] px-4 py-2.5">
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                                            <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10px] text-black/40">stella-academy.jp</span>
                                        </div>
                                        <div className="relative aspect-[4/3] overflow-hidden bg-[#101828]">
                                            <MotionMedia
                                                src="/videos/stella-hero.mp4"
                                                poster={sampleJukuHeroImg}
                                                alt="制作サンプル: 架空の学習塾「Stella Academy」のホームページ"
                                                className="absolute inset-0 h-full w-full"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
                                            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 px-5 py-3.5">
                                                <p className="es-wordmark text-[14px] tracking-[0.02em]">Stella <em>Academy</em></p>
                                                <div className="hidden items-center gap-3 text-[9px] font-medium text-white/85 sm:flex">
                                                    {['特長', 'コース', '合格実績', 'アクセス'].map((item) => <span key={item}>{item}</span>)}
                                                </div>
                                                <span className="rounded-full bg-[#1D4ED8] px-2.5 py-1 text-[9px] font-semibold text-white">無料体験</span>
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                                                <p className="es-serif text-2xl font-semibold leading-snug text-white sm:text-[28px]">願う星から、掴む星へ。</p>
                                                <p className="mt-1.5 text-[10px] leading-relaxed text-white/85 sm:text-[11px]">桜咲く春まで、一人ひとりの軌道を描く個別指導塾。</p>
                                                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-bold text-[#1D4ED8]">
                                                    無料体験授業に申し込む <ArrowRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 divide-x divide-black/[0.06] bg-white">
                                            {[
                                                ['合格実績', '地域トップ校 多数'],
                                                ['個別指導', '1:2 完全担任制'],
                                            ].map(([title, sub]) => (
                                                <div key={title} className="px-2 py-3 text-center">
                                                    <p className="text-[10px] font-bold text-[#1D4ED8]">{title}</p>
                                                    <p className="mt-0.5 text-[9px] text-black/55">{sub}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-3 -right-2 rounded-2xl border border-white/10 bg-[#1C1C1E]/90 p-4 shadow-xl backdrop-blur-xl sm:-bottom-5 sm:-right-4">
                                        <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Starting from</p>
                                        <p className="mt-1 text-xl font-semibold">¥19,800</p>
                                    </div>
                                </div>
                            </FadeInUp>
                        </div>

                        <div className="grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-20">
                            <FadeInUp delay={120} className="relative order-2 min-h-[500px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0E0E10] p-5 shadow-2xl shadow-black sm:p-8 lg:order-1">
                                <MotionMedia
                                    className="absolute inset-0 h-full w-full object-cover opacity-55"
                                    src="/videos/edushift-ai-classroom.mp4"
                                    poster={aiWorkspaceImg}
                                    alt="塾内でAIを活用するイメージ"
                                />
                                <div className="absolute inset-0 bg-black/35" />
                                <div className="relative flex min-h-[436px] items-end">
                                    <div className="w-full rounded-2xl border border-white/10 bg-[#1C1C1E]/90 p-5 shadow-2xl backdrop-blur-xl">
                                        <div className="mb-5 flex flex-wrap gap-2">
                                            {['教材を作る', '成績を分析', '保護者対応'].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/55">{item}</span>)}
                                        </div>
                                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3.5">
                                            <Code2 className="h-4 w-4 text-sky-300" />
                                            <span className="flex-1 text-sm text-white/55">塾に合う専用ツールを相談する...</span>
                                            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black"><ArrowRight className="h-4 w-4" /></span>
                                        </div>
                                    </div>
                                </div>
                            </FadeInUp>

                            <FadeInUp className="order-1 lg:order-2">
                                <SectionBadge tone="blue">塾DX・専用ツール開発</SectionBadge>
                                <h3 className="es-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">市販品に業務を合わせず、<br />業務に道具を合わせる。</h3>
                                <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/55">
                                    指導報告、教材制作、成績分析、日程調整。今の運用を確認し、繰り返し作業を減らす専用ツールを設計・開発します。小規模な開発は19,800円からです。
                                </p>
                                <ul className="mt-8 space-y-3 text-sm text-white/65">
                                    {['現場の手順から要件を整理', '実際に触れる試作品で確認', '導入後の修正と運用も支援'].map((item) => (
                                        <li key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-sky-300" />{item}</li>
                                    ))}
                                </ul>
                                <a href="/service/dx-development" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1F1F22] px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-[#2A2A2D]">
                                    ツール開発を詳しく見る <ArrowRight className="h-4 w-4" />
                                </a>
                            </FadeInUp>
                        </div>

                        <FadeInUp className="mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-[#0D0D0F] p-7 sm:p-10 md:p-12">
                            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
                                <div>
                                    <SectionBadge tone="lime">経営・独立・AI活用コンサルティング</SectionBadge>
                                    <h3 className="es-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">答えを渡すのではなく、<br />動ける状態まで一緒につくる。</h3>
                                    <p className="mt-5 text-[15px] leading-8 text-white/55">単発の壁打ちから継続伴走まで。課題の優先順位を決め、必要ならHPやツールの実装まで同じ窓口で進めます。</p>
                                    <a href="/service/consulting" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-lime-300 transition hover:text-lime-200">コンサルティングを詳しく見る <ArrowRight className="h-4 w-4" /></a>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {[
                                        ['無料', '初回30分', '現状の整理から'],
                                        ['¥9,800', '単発相談', '改善案まで提示'],
                                        ['¥14,800〜', '月額伴走', '実行と検証まで'],
                                    ].map(([price, label, sub]) => (
                                        <div key={label} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                                            <p className="text-2xl font-semibold tracking-tight">{price}</p>
                                            <p className="es-serif mt-5 text-base text-white/80">{label}</p>
                                            <p className="mt-2 text-xs leading-5 text-white/55">{sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </section>

                <section id="works" className="border-t border-white/[0.06] px-5 py-24 sm:px-6 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <FadeInUp className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-sky-300">PLAYABLE WORKS</p>
                                <h2 className="es-display text-4xl font-semibold tracking-tight sm:text-5xl">言葉より、触れる実例で。</h2>
                            </div>
                            <p className="max-w-xl text-[15px] leading-7 text-white/55">企画だけではなく、実際に動くWebサービスまで作れることを公開しています。以下は自社開発・公開中の例です。</p>
                        </FadeInUp>

                        <div className="grid gap-5 lg:grid-cols-3">
                            {[
                                {
                                    eyebrow: 'AI FEEDBACK',
                                    title: '国語記述 自動添削システム',
                                    text: '答案画像を読み取り、記述問題を数十秒で添削・採点。',
                                    href: 'https://auto-tensaku-system.vercel.app/',
                                    image: autoTensakuImg,
                                },
                                {
                                    eyebrow: 'INTERACTIVE LEARNING',
                                    title: '星座学習アプリ',
                                    text: '触って確かめる、立体的な星座・神話学習体験。',
                                    href: 'https://yossy6028.github.io/edushift-juku-apps/apps/starchart/',
                                    image: starChartImg,
                                    video: '/videos/app-starchart.mp4',
                                },
                                {
                                    eyebrow: 'HISTORY GAME',
                                    title: '源平合戦 学習アプリ',
                                    text: '物語と操作を組み合わせた歴史学習コンテンツ。',
                                    href: 'https://yossy6028.github.io/edushift-juku-apps/apps/genpei/',
                                    image: genpeiImg,
                                    video: '/videos/app-genpei.mp4',
                                },
                                {
                                    eyebrow: '3D MATH LAB',
                                    title: '食塩水の濃度ラボ',
                                    text: '3Dビーカーで「濃さ」を目で見る。まぜても濃度が足し算にならない理由を体感。',
                                    href: 'https://edushift-juku-apps.vercel.app/shokuensui/',
                                    image: shokuensuiImg,
                                },
                                {
                                    eyebrow: '3D CIRCUIT',
                                    title: '電流回路スロット',
                                    text: '電池と豆電球を3Dの机に置いて点灯。直列・並列・スイッチ付きを切り替えて比較。',
                                    href: 'https://edushift-juku-apps.vercel.app/kairo/',
                                    image: kairoImg,
                                },
                                {
                                    eyebrow: 'ENGLISH VISUAL',
                                    title: '前置詞ビジュアルラボ',
                                    text: '箱とボールのアニメで in・into・through の空間イメージを体感。クイズつき。',
                                    href: 'https://edushift-juku-apps.vercel.app/zenchishi/',
                                    image: zenchishiImg,
                                },
                            ].map((work, index) => (
                                <FadeInUp key={work.title} delay={index * 90}>
                                    <a href={work.href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E10] transition duration-500 hover:-translate-y-2 hover:border-white/20">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-[#161619]">
                                            {work.video ? (
                                                <MotionMedia src={work.video} poster={work.image} alt={`${work.title}のデモ`} className="h-full w-full transition duration-700 group-hover:scale-[1.04]" />
                                            ) : (
                                                <img src={work.image} alt={`${work.title}の画面`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                                            <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-black"><ArrowRight className="h-4 w-4 -rotate-45" /></span>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-[10px] font-semibold tracking-[0.18em] text-[#55D8CA]">{work.eyebrow}</p>
                                            <h3 className="es-serif mt-3 text-xl font-semibold">{work.title}</h3>
                                            <p className="mt-3 text-sm leading-6 text-white/55">{work.text}</p>
                                        </div>
                                    </a>
                                </FadeInUp>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-5 py-16 sm:px-6 md:py-24" aria-label="EduShiftの支援方針">
                    <FadeInUp className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(45,179,160,.11),rgba(2,147,240,.07)_48%,rgba(255,255,255,.03))] md:grid-cols-3">
                        {[
                            { Icon: ShieldCheck, title: '先に範囲と金額を決める', text: '着手後に話が膨らまないよう、含む作業と含まない作業を事前に明示します。' },
                            { Icon: Code2, title: '自分たちでも実装する', text: '提案だけで終わらず、必要なHP・仕組み・ツールを実際に形にします。' },
                            { Icon: MessageSquareText, title: '公開後も相談できる', text: '納品を終点にせず、運用で見えた課題を次の改善につなげます。' },
                        ].map(({ Icon, title, text }, index) => (
                            <div key={title} className={`p-7 sm:p-9 ${index ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}>
                                <Icon className="h-6 w-6 stroke-[1.5] text-[#55D8CA]" />
                                <h3 className="es-serif mt-6 text-lg font-semibold">{title}</h3>
                                <p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
                            </div>
                        ))}
                    </FadeInUp>
                </section>

                <section id="company" className="border-t border-white/[0.06] px-5 py-24 sm:px-6 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <FadeInUp className="mb-14">
                            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#55D8CA]">REPRESENTATIVE</p>
                            <h2 className="es-display text-4xl font-semibold tracking-tight sm:text-5xl">代表挨拶・会社概要</h2>
                        </FadeInUp>

                        <div className="grid gap-5 lg:grid-cols-2">
                            <FadeInUp delay={90}>
                                <div className="h-full rounded-2xl border border-white/10 bg-[#0E0E10] p-7 sm:p-9">
                                    <h3 className="es-serif border-b border-white/10 pb-5 text-xl font-semibold">代表挨拶</h3>
                                    <div className="mt-6 space-y-4 text-[15px] leading-8 text-white/65">
                                        <p className="es-serif text-white/85">「現場の先生が、もっと教育に集中できる環境をつくりたい」</p>
                                        <p>
                                            それが、EduShiftを立ち上げた原点です。
                                            私自身、長年教育業界に身を置き、生徒の成長に立ち会う喜びと同時に、
                                            経営や雑務に追われ、理想の教育を追求しきれないジレンマも感じてきました。
                                        </p>
                                        <p>
                                            AI技術の進化は、この課題を解決する大きな鍵となります。
                                            しかし、技術ありきではなく、あくまで「人の温かみ」を活かすための技術でなければなりません。
                                            私たちは、最新のテクノロジーと現場の泥臭い知見を融合させ、
                                            教育に関わるすべての人を、裏側から力強く支えていきます。
                                        </p>
                                    </div>
                                    <div className="mt-8 text-right">
                                        <p className="text-sm font-semibold text-white">EduShift 代表</p>
                                        <p className="mt-1 text-sm text-white/55">吉井 勝彦</p>
                                    </div>
                                </div>
                            </FadeInUp>

                            <FadeInUp delay={180}>
                                <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E10]">
                                    <h3 className="es-serif border-b border-white/10 px-7 py-6 text-xl font-semibold sm:px-9">会社概要</h3>
                                    <dl className="divide-y divide-white/[0.06]">
                                        <div className="flex flex-col gap-2 px-7 py-5 sm:flex-row sm:px-9">
                                            <dt className="shrink-0 text-sm font-medium text-white/55 sm:w-28">屋号</dt>
                                            <dd className="text-sm font-medium text-white">EduShift</dd>
                                        </div>
                                        <div className="flex flex-col gap-2 px-7 py-5 sm:flex-row sm:px-9">
                                            <dt className="shrink-0 text-sm font-medium text-white/55 sm:w-28">代表者</dt>
                                            <dd className="text-sm text-white/85">吉井 勝彦</dd>
                                        </div>
                                        <div className="flex flex-col gap-2 px-7 py-5 sm:flex-row sm:px-9">
                                            <dt className="shrink-0 text-sm font-medium text-white/55 sm:w-28">事業内容</dt>
                                            <dd className="text-sm text-white/85">
                                                <ul className="list-disc space-y-1.5 pl-5 marker:text-[#55D8CA]">
                                                    <li>学習塾・スクール向け経営コンサルティング</li>
                                                    <li>教育機関向けAI導入支援・DX推進</li>
                                                    <li>教育関連フリーランス独立支援・育成</li>
                                                    <li>教育アプリ・システム開発</li>
                                                    <li>Webサイト制作・保守運用支援</li>
                                                </ul>
                                            </dd>
                                        </div>
                                        <div className="flex flex-col gap-2 px-7 py-5 sm:flex-row sm:px-9">
                                            <dt className="shrink-0 text-sm font-medium text-white/55 sm:w-28">所在地</dt>
                                            <dd className="text-sm leading-6 text-white/85">〒150-0021<br />東京都渋谷区恵比寿西2丁目4番8号ウィンド恵比寿ビル8F</dd>
                                        </div>
                                    </dl>
                                </div>
                            </FadeInUp>
                        </div>
                    </div>
                </section>

                <section id="faq" className="px-5 py-24 sm:px-6 md:py-32">
                    <div className="mx-auto max-w-3xl">
                        <FadeInUp>
                            <p className="mb-5 text-center text-xs font-semibold tracking-[0.2em] text-[#55D8CA]">FAQ</p>
                            <h2 className="es-display mb-12 text-center text-4xl font-semibold tracking-tight sm:text-5xl">ご相談の前に、よくいただく問い。</h2>
                        </FadeInUp>
                        <FadeInUp delay={100} className="overflow-hidden rounded-xl border border-white/10 bg-transparent">
                            {FAQS.map((faq, index) => {
                                const isOpen = openFaq === index;
                                const answerId = `faq-answer-${index}`;
                                return (
                                    <div key={faq.question} className={index < FAQS.length - 1 ? 'border-b border-white/10' : ''}>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                                            aria-expanded={isOpen}
                                            aria-controls={answerId}
                                            onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        >
                                            <span className="text-[15px] font-medium leading-6 text-white sm:text-base">{faq.question}</span>
                                            <span className={`relative h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
                                                <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-white/65" />
                                                <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-white/65" />
                                            </span>
                                        </button>
                                        <div id={answerId} className={`es-faq-grid ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
                                            <div>
                                                <p className="px-6 pb-6 text-sm leading-7 text-white/55">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </FadeInUp>
                    </div>
                </section>

                <section id="contact" className="relative isolate overflow-hidden border-t border-white/[0.06] px-5 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36">
                    <div className="absolute inset-0 -z-20 bg-black" />
                    <div className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(2,147,240,.18),rgba(45,179,160,.09)_40%,transparent_70%)] blur-3xl" />
                    <FadeInUp className="mx-auto max-w-4xl text-center">
                        <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-[#55D8CA]">START WITH A CONVERSATION</p>
                        <h2 className="es-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">教えることに、<br /><span className="font-normal italic">もう一度集中する。</span></h2>
                        <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-8 text-white/55">30分の相談で、今いちばん時間を奪っている仕事から整理します。相談だけで終えても構いません。</p>
                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a href={CONTACT_HREF} className="inline-flex min-w-48 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5">
                                無料相談を申し込む <Mail className="h-4 w-4" />
                            </a>
                            <a href="#services" className="inline-flex min-w-40 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1F1F22] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2A2D]">サービスを見る</a>
                        </div>
                    </FadeInUp>
                </section>
            </main>

            <footer className="border-t border-white/[0.06] px-5 pb-9 pt-16 sm:px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 pb-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
                        <div>
                            <a href="#about" aria-label="EduShift トップへ"><Brand /></a>
                            <p className="mt-6 max-w-xs text-sm leading-7 text-white/55">小規模塾と、独立する先生へ。<br />AIとWebを、現場で使える形に。</p>
                        </div>
                        <div>
                            <h3 className="mb-5 text-xs font-semibold tracking-[0.16em] text-white/75">SERVICES</h3>
                            <div className="space-y-3 text-sm text-white/55">
                                <a className="block transition hover:text-white" href="/service/consulting">コンサルティング</a>
                                <a className="block transition hover:text-white" href="/service/dx-development">塾DX・ツール開発</a>
                                <a className="block transition hover:text-white" href="/service/hp-production">HP制作・運用</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-5 text-xs font-semibold tracking-[0.16em] text-white/75">COMPANY</h3>
                            <div className="space-y-3 text-sm text-white/55">
                                <a className="block transition hover:text-white" href="#company">代表挨拶・会社概要</a>
                                <a className="block transition hover:text-white" href="#faq">よくあるご質問</a>
                                <a className="block transition hover:text-white" href="https://note.com/katsu_yossy" target="_blank" rel="noopener noreferrer">note</a>
                                <a className="block transition hover:text-white" href="https://x.com/YSTConsulting" target="_blank" rel="noopener noreferrer">X</a>
                                <a className="block transition hover:text-white" href={CONTACT_HREF}>お問い合わせ</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-5 text-xs font-semibold tracking-[0.16em] text-white/75">LEGAL</h3>
                            <div className="space-y-3 text-sm text-white/55">
                                <a className="block transition hover:text-white" href="/privacypolicy">プライバシーポリシー</a>
                                <a className="block transition hover:text-white" href="/business-law">特定商取引法</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
                        <span>© 2026 EduShift. All rights reserved.</span>
                        <span>〒150-0021 東京都渋谷区恵比寿西2-4-8 ウィンド恵比寿ビル8F</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
