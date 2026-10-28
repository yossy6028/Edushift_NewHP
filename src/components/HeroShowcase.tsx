import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { HpSampleMock } from './HpSampleMock';
import { DX_APP_URLS } from '../data/dxAppLinks';
import '../styles/hero-showcase.css';

const VIDEO_SRC = '/videos/sns-video-sample.mp4';
const VIDEO_POSTER = '/videos/sns-video-sample-poster.webp';

type Slide = {
  id: 'timetable' | 'sns' | 'hp';
  no: string;
  tab: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
  ms: number;
};

const SLIDES: Slide[] = [
  {
    id: 'timetable',
    no: '01',
    tab: '時間割メーカー',
    title: '塾時間割メーカー',
    desc: '講師・生徒・ブースの条件から、週間時間割を数秒で自動生成。',
    cta: 'デモを見る',
    href: DX_APP_URLS.timetableDemo,
    external: true,
    ms: 6500,
  },
  {
    id: 'sns',
    no: '02',
    tab: 'SNS広告動画',
    title: 'SNS動画広告',
    desc: '定期テスト対策会などの告知を、縦型の短い動画に。',
    cta: '詳しく見る',
    href: '/service/sns-video',
    ms: 8500,
  },
  {
    id: 'hp',
    no: '03',
    tab: 'HP制作',
    title: 'HP制作',
    desc: '最短1週間で公開。スマホで読みやすい、塾のホームページ。',
    cta: '詳しく見る',
    href: '/service/hp-production',
    ms: 6500,
  },
];

const chars = (text: string) => Array.from(text);

// 時間割メーカーの画面（実物のデモと同じ構成を HTML/CSS で再現。ロゴ等は使わない）
const DAYS = ['月', '火', '水', '木', '金'];
const TEACHERS = ['田中先生', '鈴木先生', '高橋先生', '伊藤先生'];
const STATS: Array<[string, string]> = [
  ['割当', '11/11コマ'],
  ['1:2ペア率', '22%'],
  ['生成時間', '1ms'],
  ['制約違反', '0件'],
];
// [時刻, 各講師の列: [生徒, 科目, ブース, 色] | null]
type Lesson = [string, string, string, 'a' | 'b' | 'c'];
const GRID: Array<[string, Array<Lesson | null>]> = [
  ['16:00', [['小林', '国語', 'B1', 'a'], null, ['中村', '英語', 'B2', 'c'], null]],
  ['17:00', [['佐藤', '数学', 'B1', 'b'], ['小林・吉田', '数学', 'B2', 'a'], null, ['渡辺', '理科', 'B3', 'c']]],
  ['18:00', [null, ['山本', '英語', 'B2', 'c'], ['加藤', '国語', 'B1', 'a'], ['松本', '数学', 'B3', 'b']]],
];

function TimetableMock() {
  return (
    <div className="hs-tt" aria-hidden="true">
      <div className="hs-tt__chrome">
        <span /><span /><span />
        <b>juku-timetable.vercel.app</b>
      </div>
      <div className="hs-tt__body">
        <ul className="hs-tt__stats">
          {STATS.map(([label, value]) => (
            <li key={label}>{label}<b>{value}</b></li>
          ))}
        </ul>
        <ul className="hs-tt__days">
          {DAYS.map((day, index) => (
            <li key={day} className={index === 0 ? 'is-on' : ''}>{day}</li>
          ))}
        </ul>
        <div className="hs-tt__grid">
          <span />
          {TEACHERS.map((name) => (
            <span key={name} className="hs-tt__teacher">{name}</span>
          ))}
          {GRID.map(([time, cells], row) => (
            <div key={time} className="hs-tt__row">
              <span className="hs-tt__time">{time}</span>
              {cells.map((cell, col) => (
                <span key={`${time}-${col}`} className="hs-tt__cell">
                  {cell && (
                    <span
                      className={`hs-tt__lesson is-${cell[3]}`}
                      style={{ '--i': row * 4 + col } as CSSProperties}
                    >
                      <b>{cell[0]}</b>
                      <i>{cell[1]}・{cell[2]}</i>
                    </span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [hpKey, setHpKey] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const paused = hovering || !inView || !pageVisible;

  const goTo = (next: number) => {
    setIndex(next);
    if (SLIDES[next].id === 'hp') setHpKey((value) => value + 1); // 表示のたびに文字モーションを頭から再生
  };

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // 動画は初期表示（LCP）を妨げないよう、ページ読み込み完了後に読み込み開始する。
  // 動きを減らす設定・データセーバー時は読み込まず、ポスター画像のみ表示する。
  useEffect(() => {
    if (reduced) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setVideoReady(true), 1200);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  const isSns = SLIDES[index].id === 'sns';

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isSns) return;
    video.currentTime = 0;
  }, [isSns, videoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isSns && !paused && !reduced) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isSns, paused, reduced, videoReady]);

  const onFillEnd = () => goTo((index + 1) % SLIDES.length);

  return (
    <div
      ref={rootRef}
      className={`hs${paused ? ' is-paused' : ''}${reduced ? ' is-reduced' : ''}`}
      role="group"
      aria-roledescription="カルーセル"
      aria-label="サービスの実例（自動で切り替わります）"
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={(event) => event.target.matches(':focus-visible') && setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div className="hs__viewport">
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <section
              key={slide.id}
              className={`hs__slide${active ? ' is-active' : ''}`}
              aria-label={`${slideIndex + 1}／${SLIDES.length} ${slide.title}`}
              aria-hidden={!active}
              inert={!active}
            >
              <div className={`hs__media hs__media--${slide.id}`}>
                {slide.id === 'timetable' && <TimetableMock />}

                {slide.id === 'sns' && (
                  <>
                    <img src={VIDEO_POSTER} alt="" className="hs__backdrop" loading="lazy" decoding="async" aria-hidden="true" />
                    <div className="hs__phone">
                      <img src={VIDEO_POSTER} alt="" className="hs__phone-poster" loading="lazy" decoding="async" aria-hidden="true" />
                      {videoReady && (
                        <video
                          ref={videoRef}
                          className="hs__phone-video"
                          src={VIDEO_SRC}
                          poster={VIDEO_POSTER}
                          muted
                          loop
                          playsInline
                          preload="auto"
                          aria-label="SNS動画広告のサンプル（架空の塾の定期テスト対策会）"
                        />
                      )}
                    </div>
                    <span className="hs__sample-tag">SAMPLE</span>
                  </>
                )}

                {slide.id === 'hp' && <div className="hs__hp">{hpKey > 0 && <HpSampleMock key={hpKey} />}</div>}
              </div>

              <div className="hs__caption">
                <div className="hs__caption-text">
                  <p className="hs__eyebrow">{slide.no} / {String(SLIDES.length).padStart(2, '0')}</p>
                  <h2 className="hs__title" aria-label={slide.title}>
                    {chars(slide.title).map((char, charIndex) => (
                      <span key={`${char}-${charIndex}`} className="hs__mask" aria-hidden="true">
                        <span className="hs__char" style={{ '--d': `${0.12 + charIndex * 0.04}s` } as CSSProperties}>{char}</span>
                      </span>
                    ))}
                  </h2>
                  <p className="hs__desc">{slide.desc}</p>
                </div>
                <a
                  href={slide.href}
                  className="hs__cta"
                  {...(slide.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {slide.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </section>
          );
        })}
      </div>

      <div className="hs__tabs">
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <button
              key={slide.id}
              type="button"
              className={`hs__tab${active ? ' is-active' : ''}`}
              aria-label={`${slide.tab}を表示`}
              aria-current={active}
              onClick={() => !active && goTo(slideIndex)}
            >
              <span className="hs__tab-label">{slide.tab}</span>
              <span className="hs__tab-bar" aria-hidden="true">
                {active && (
                  <span
                    className="hs__tab-fill"
                    style={{ '--ms': `${slide.ms}ms` } as CSSProperties}
                    onAnimationEnd={reduced ? undefined : onFillEnd}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
