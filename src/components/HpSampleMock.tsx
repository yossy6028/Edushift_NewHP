import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import classroomHeroImg from '../assets/generated/lumina-classroom-hero.webp';
import '../styles/hp-sample-mock.css';

const SCHOOL_NAME = 'ルミナ進学';
const SCHOOL_EN = 'LUMINA';
const DOMAIN = 'lumina-juku.example';
const CATCH_LINES = ['わかった瞬間が、', 'いちばん明るい。'] as const;
const SUB = '明るい教室で、先生の説明が届く個別指導。テスト対策から受験まで、一人ひとりのペースに合わせます。';
const NAV = ['特長', 'コース', '合格実績', 'アクセス'] as const;
const CHIPS: Array<[string, string]> = [
  ['合格実績', '地域トップ校多数'],
  ['指導形態', '1:2 完全担任制'],
  ['無料体験', 'いつでも予約可'],
];

const splitChars = (text: string) => Array.from(text);

type HpSampleMockProps = {
  className?: string;
};

export function HpSampleMock({ className = '' }: HpSampleMockProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [settled, setSettled] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      setSettled(true);
      return;
    }

    let loopTimer: number | undefined;
    let settleTimer: number | undefined;

    const play = () => {
      setSettled(false);
      setActive(false);
      window.requestAnimationFrame(() => {
        setCycle((value) => value + 1);
        setActive(true);
        if (settleTimer) window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => setSettled(true), 2400);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActive(false);
          setSettled(false);
          if (loopTimer) window.clearInterval(loopTimer);
          if (settleTimer) window.clearTimeout(settleTimer);
          return;
        }
        play();
        if (loopTimer) window.clearInterval(loopTimer);
        loopTimer = window.setInterval(play, 8200);
      },
      { threshold: 0.28, rootMargin: '40px 0px' },
    );

    observer.observe(host);
    return () => {
      observer.disconnect();
      if (loopTimer) window.clearInterval(loopTimer);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, []);

  const stateClass = `${active ? ' is-active' : ''}${settled ? ' is-settled' : ''}`;

  return (
    <div ref={hostRef} className={`relative mx-auto flex h-full max-w-[440px] flex-col justify-center ${className}`}>
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs text-white/55">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#55D8CA]/20 text-[10px] font-bold text-[#55D8CA]">HP</span>
          HP制作サンプル｜ライトプラン
        </div>
        <span className="rounded-full bg-[#2DB3A0]/15 px-2.5 py-1 text-[10px] font-semibold text-[#55D8CA]">SAMPLE</span>
      </div>

      <div className="hp-sample-mock__frame relative">
        <div className={`hp-sample-mock overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-[0_30px_80px_rgba(0,0,0,.55)]${stateClass}`} key={cycle}>
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#F3F4F6] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10px] text-black/40">{DOMAIN}</span>
          </div>

          <div className="hp-sample-mock__stage" role="img" aria-label={`HP制作サンプル（ライトプラン）: 架空の学習塾「${SCHOOL_NAME}」のホームページ`}>
            <img
              src={classroomHeroImg}
              alt=""
              className="hp-sample-mock__photo"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
            <div className="hp-sample-mock__veil" aria-hidden="true" />

            <div className="hp-sample-mock__nav">
              <div className="hp-sample-mock__brand">
                <span className="hp-sample-mock__brand-ja" aria-label={SCHOOL_NAME}>
                  {splitChars(SCHOOL_NAME).map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      className="hp-sample-mock__char"
                      style={{ animationDelay: `${0.12 + index * 0.05}s` } as CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="hp-sample-mock__brand-en">
                  {splitChars(SCHOOL_EN).map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      className="hp-sample-mock__char"
                      style={{ animationDelay: `${0.38 + index * 0.04}s` } as CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>
              <div className="hp-sample-mock__links" aria-hidden="true">
                {NAV.map((item, index) => (
                  <span
                    key={item}
                    className="hp-sample-mock__link"
                    style={{ animationDelay: `${0.45 + index * 0.07}s` } as CSSProperties}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className="hp-sample-mock__pill">無料体験</span>
            </div>

            <div className="hp-sample-mock__hero">
              <p className="hp-sample-mock__kicker">
                <span className="hp-sample-mock__kicker-dot" aria-hidden="true" />
                個別指導 × 明るい教室
              </p>
              <h3 className="hp-sample-mock__title">
                {CATCH_LINES.map((line, lineIndex) => (
                  <span className="hp-sample-mock__title-line" key={line}>
                    <span className="hp-sample-mock__title-mask">
                      <span
                        className="hp-sample-mock__title-inner"
                        style={{ animationDelay: `${0.45 + lineIndex * 0.12}s` } as CSSProperties}
                      >
                        {line}
                      </span>
                    </span>
                    {lineIndex === CATCH_LINES.length - 1 ? (
                      <span className="hp-sample-mock__marker" aria-hidden="true" />
                    ) : null}
                  </span>
                ))}
              </h3>
              <p className="hp-sample-mock__sub">{SUB}</p>
              <span className="hp-sample-mock__cta">
                <span className="hp-sample-mock__shine" aria-hidden="true" />
                無料体験授業に申し込む
                <ArrowRight className="h-3 w-3" />
              </span>

              <div className="hp-sample-mock__chips" aria-hidden="true">
                {CHIPS.map(([title, sub], index) => (
                  <div
                    key={title}
                    className="hp-sample-mock__chip"
                    style={{ animationDelay: `${1.4 + index * 0.08}s` } as CSSProperties}
                  >
                    <p className="hp-sample-mock__chip-label">{title}</p>
                    <p className="hp-sample-mock__chip-value">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`hp-sample-mock__badge${active ? ' is-active' : ''}${settled ? ' is-settled' : ''}`}>
          <p className="hp-sample-mock__badge-kicker">企画から公開まで</p>
          <p className="hp-sample-mock__badge-title">一貫して対応</p>
        </div>
      </div>
      <p className="mt-10 text-center text-[10px] tracking-[0.08em] text-white/35">※架空の学習塾サンプルです</p>
    </div>
  );
}

export default HpSampleMock;
