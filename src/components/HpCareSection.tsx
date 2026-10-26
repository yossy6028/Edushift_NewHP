import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type RefObject } from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { HOME_EMPHASIS, MAINTENANCE_PLANS } from '../data/maintenancePlans';

/**
 * 後から納品される横型ループ動画（1920×1080）の置き場所。
 * public/videos/ に同名ファイルを置くと、このパスで配信される。
 */
const HOSYU_LOOP_MP4 = '/videos/hosyu-loop.mp4';
const HOSYU_LOOP_WEBM = '/videos/hosyu-loop.webm';
const HOSYU_LOOP_POSTER = '/videos/hosyu-loop-poster.jpg';

const LAZY_LOAD_ROOT_MARGIN = '0px';
const LAZY_LOAD_THRESHOLD = 0.01;
const MISSING_MEDIA_FALLBACK_MS = 1500;
const POSTER_ONLY_MAX_WIDTH_PX = 479;
const POSTER_ONLY_QUERY = `(max-width: ${POSTER_ONLY_MAX_WIDTH_PX}px)`;
const VULNERABILITY_CHECK_PREFIX = '脆弱性チェック：';

const containedMediaStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
};

const frameStyle: CSSProperties = {
    aspectRatio: '16 / 9',
};

const VIDEO_LABEL = 'HP、作って終わりにしない。保守と脆弱性チェックで、塾のHPを毎月守ります。';

const vulnerabilityFrequency = (features: readonly string[]) => {
    const line = features.find((feature) => feature.startsWith(VULNERABILITY_CHECK_PREFIX));
    return line ? line.slice(VULNERABILITY_CHECK_PREFIX.length) : '';
};

type MotionPreference = 'pending' | 'allow' | 'reduce';

const formatMonthlyPrice = (price: number) => `¥${price.toLocaleString('ja-JP')}`;

const useMatchesMedia = (query: string) => useSyncExternalStore(
    (onStoreChange) => {
        const media = window.matchMedia(query);
        media.addEventListener('change', onStoreChange);
        return () => media.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
);

const useMotionPreference = (): MotionPreference => {
    const [preference, setPreference] = useState<MotionPreference>('pending');

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => setPreference(media.matches ? 'reduce' : 'allow');
        apply();
        media.addEventListener('change', apply);
        return () => media.removeEventListener('change', apply);
    }, []);

    return preference;
};

const useInViewport = (hostRef: RefObject<HTMLElement | null>, enabled: boolean) => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!enabled) return;
        const host = hostRef.current;
        if (!host) return;

        if (typeof IntersectionObserver === 'undefined') {
            const frame = requestAnimationFrame(() => setInView(true));
            return () => cancelAnimationFrame(frame);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                setInView(true);
                observer.disconnect();
            },
            { rootMargin: LAZY_LOAD_ROOT_MARGIN, threshold: LAZY_LOAD_THRESHOLD },
        );
        observer.observe(host);
        return () => observer.disconnect();
    }, [enabled, hostRef]);

    return inView;
};

const PosterFrame = () => (
    <img
        src={HOSYU_LOOP_POSTER}
        alt={VIDEO_LABEL}
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="bg-black"
        style={containedMediaStyle}
    />
);

/**
 * 画面内に入るまで動画を読まない。
 * 動きを減らす設定、または幅 479px 以下ではポスターだけを出す。
 * 再生時は object-fit: contain の 16:9 で、映像内の見出しを切らない。
 */
const HosyuLoopVideo = () => {
    const hostRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const motion = useMotionPreference();
    const posterOnly = useMatchesMedia(POSTER_ONLY_QUERY);
    const inView = useInViewport(hostRef, motion === 'allow' && !posterOnly);
    const [failed, setFailed] = useState(false);
    const playable = motion === 'allow' && inView && !failed && !posterOnly;

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !playable) return;

        video.muted = true;
        video.defaultMuted = true;
        const giveUpIfUnplayable = () => {
            const noSource = video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
            if (video.error || noSource) setFailed(true);
        };
        // source 要素の失敗では外さない。WebM が読めなくても MP4 へ進む。
        const onError = (event: Event) => {
            if (event.target === video) giveUpIfUnplayable();
        };
        video.addEventListener('error', onError);
        const fallbackTimer = window.setTimeout(giveUpIfUnplayable, MISSING_MEDIA_FALLBACK_MS);
        video.play().catch(() => giveUpIfUnplayable());
        return () => {
            window.clearTimeout(fallbackTimer);
            video.removeEventListener('error', onError);
        };
    }, [playable]);

    return (
        <div ref={hostRef} className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl shadow-black md:mt-14">
            <div className="relative w-full" style={frameStyle}>
                {playable ? (
                    <video
                        ref={videoRef}
                        className="bg-black"
                        style={containedMediaStyle}
                        poster={HOSYU_LOOP_POSTER}
                        muted
                        autoPlay
                        loop
                        playsInline
                        controls
                        preload="none"
                        width={1920}
                        height={1080}
                        aria-label={VIDEO_LABEL}
                    >
                        <source src={HOSYU_LOOP_WEBM} type="video/webm" />
                        <source src={HOSYU_LOOP_MP4} type="video/mp4" />
                    </video>
                ) : (
                    <PosterFrame />
                )}
            </div>
        </div>
    );
};

const BulletList = ({ items, accentClass }: { items: readonly string[]; accentClass: string }) => (
    <ul className="mt-6 space-y-3">
        {items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm leading-6 text-white/80">
                <Check className={`h-4 w-4 shrink-0 ${accentClass}`} />
                {item}
            </li>
        ))}
    </ul>
);

type HpCareSectionProps = {
    contactHref: string;
};

export const HpCareSection = ({ contactHref }: HpCareSectionProps) => (
    <section id="hp-care" aria-labelledby="hp-care-title" className="mt-16 border-t border-white/[0.06] pt-16 md:mt-20 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#55D8CA]">ホームページの保守</p>
            <h2 id="hp-care-title" className="es-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                HP、作って終わりにしない。
            </h2>
            <p className="mt-6 text-[16px] leading-8 text-white/55">
                保守と脆弱性チェックで、塾のHPを毎月守ります。
            </p>
        </div>

        <HosyuLoopVideo />

        <div className="mt-8 grid items-stretch gap-5 lg:mt-10 lg:grid-cols-12 lg:gap-6">
            <article className="relative overflow-hidden rounded-[28px] border border-[#55D8CA]/35 bg-[#0E0E10] p-8 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-10 lg:col-span-7" aria-labelledby="hp-care-maintenance-title">
                <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#55D8CA]/20 blur-3xl" aria-hidden="true" />
                <p className="text-[10px] font-semibold tracking-[0.18em] text-[#55D8CA]">01</p>
                <h3 id="hp-care-maintenance-title" className="es-display relative mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    HP保守
                </h3>
                <p className="relative mt-4 max-w-xl text-[15px] leading-8 text-white/60">
                    公開したホームページの更新と見守りを、毎月続けます。
                </p>
                <BulletList
                    accentClass="text-[#55D8CA]"
                    items={['更新', '定期バックアップ', '稼働監視・SSL管理']}
                />
            </article>

            <article className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#0E0E10] p-7 md:p-8 lg:col-span-5" aria-labelledby="hp-care-vulnerability-title">
                <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-[#0293f0]/20 blur-3xl" aria-hidden="true" />
                <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-sky-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    02
                </p>
                <h3 id="hp-care-vulnerability-title" className="es-display relative mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    脆弱性チェック
                </h3>
                <p className="relative mt-4 text-sm leading-7 text-white/60">
                    すべての保守プランに含まれています。確認の頻度は、プランごとに異なります。
                </p>
                <BulletList
                    accentClass="text-sky-300"
                    items={['既知の脆弱性の見張り', '見つかった際の対応・報告']}
                />
                <p className="relative mt-6 border-l-2 border-sky-300 pl-4 text-sm font-medium leading-7 text-white">
                    放置されたHPは攻撃の入口になる
                </p>
            </article>
        </div>

        <article className="mt-5 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-[#0E0E10]/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:px-8" aria-labelledby="hp-care-aieo-title">
            <div className="shrink-0">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/40">03</p>
                <h3 id="hp-care-aieo-title" className="es-serif mt-1 text-lg font-semibold text-white/90">
                    AIEO対策
                </h3>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/55">
                AIの回答に塾名が出やすくなる情報設計です。詳細は、無料相談でご説明します。
            </p>
        </article>

        <div className="mt-14 md:mt-16">
            <h3 className="es-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                料金は、いまの保守プランのままです。
            </h3>
            <p className="mt-4 max-w-3xl text-[15px] leading-8 text-white/60">
                脆弱性チェックは、次の3つの保守プランすべてに含まれます。新しい料金はありません。確認の頻度だけが、プランごとに異なります。
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3" aria-label="保守プランと脆弱性チェックの頻度">
                {MAINTENANCE_PLANS.map((plan) => {
                    const recommended = plan.id === HOME_EMPHASIS.recommendedPlan;
                    return (
                        <article
                            key={plan.id}
                            className={`rounded-[24px] border bg-[#0E0E10] p-6 ${recommended ? 'border-[#55D8CA]/45' : 'border-white/10'}`}
                        >
                            {recommended && (
                                <p className="mb-4 inline-flex rounded-full bg-[#2DB3A0]/15 px-2.5 py-1 text-[10px] font-semibold text-[#55D8CA]">
                                    {HOME_EMPHASIS.hpCardBadge}
                                </p>
                            )}
                            <h4 className="es-serif text-xl font-semibold text-white">{plan.name}</h4>
                            <p className="mt-4 flex items-baseline gap-1.5">
                                <span className="es-display text-4xl font-semibold tracking-tight">{formatMonthlyPrice(plan.price)}</span>
                                <span className="text-sm text-white/50">/ 月</span>
                            </p>
                            <p className="mt-1 text-xs text-white/40">税抜</p>
                            <div className="mt-5 border-t border-white/[0.06] pt-4">
                                <p className="text-[10px] font-semibold tracking-[0.16em] text-[#55D8CA]">脆弱性チェック</p>
                                <p className="mt-2 text-sm leading-6 text-white">{vulnerabilityFrequency(plan.features)}</p>
                            </div>
                        </article>
                    );
                })}
            </div>

            <p className="mt-6 text-sm leading-7 text-white/50">
                表示価格は、すべて税抜です。更新回数などの詳細は、HP制作・保守運用のページでご確認いただけます。
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <a
                    href={contactHref}
                    className="inline-flex min-w-48 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                    30分の無料相談
                    <ArrowRight className="h-4 w-4" />
                </a>
                <a
                    href="/service/hp-production"
                    className="inline-flex min-w-48 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1F1F22] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2A2D]"
                >
                    保守プランの詳細を見る
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </div>
    </section>
);
