import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import classroomHeroImg from '../assets/generated/lumina-classroom-hero.webp';
import '../styles/hp-sample-mock.css';

const SCHOOL_NAME = 'ひなた学舎';
const SCHOOL_MAIN = 'ひなた';
const SCHOOL_SUB = '学舎';
const SCHOOL_EN = 'HINATA ACADEMY';
const DOMAIN = 'hinata-gakusha.example';
const CATCH_LINES = ['わからないを、', 'そのままにしない。'] as const;
const CATCH_EMPHASIS = 'そのまま';
const SUB = '授業のあとに「なるほど」が残るまで付き合う、小1から高3までの個別指導塾です。';
const NAV = ['特長', 'コース', '合格実績', 'アクセス'] as const;
const FACTS: Array<[string, string]> = [
  ['対象', '小1–高3'],
  ['指導形態', '1:2'],
  ['無料体験', '随時'],
];

const chars = (text: string) => Array.from(text);
const at = (seconds: number): CSSProperties => ({ '--d': `${seconds}s` } as CSSProperties);

type HpSampleMockProps = {
  className?: string;
};

export function HpSampleMock({ className = '' }: HpSampleMockProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cycle, setCycle] = useState(0);

  // 画面に入るたびに1回だけ再生する。ベースのCSSが「完成状態」なので、
  // 未再生・再生後・reduced-motion のいずれでも文字は完全に読める。
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCycle((value) => value + 1);
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      { threshold: 0.3, rootMargin: '40px 0px' },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={`relative mx-auto flex h-full max-w-[460px] flex-col justify-center ${className}`}>
      <div className="mb-3 flex items-baseline justify-between px-1 text-[11px] tracking-[0.06em] text-white/60">
        <span>HP制作サンプル｜ライトプラン</span>
        <span className="font-medium tracking-[0.22em] text-white/40">SAMPLE</span>
      </div>

      <div className="hsm" key={cycle}>
        <div className="hsm__chrome" aria-hidden="true">
          <span className="hsm__dot" />
          <span className="hsm__dot" />
          <span className="hsm__dot" />
          <span className="hsm__url">{DOMAIN}</span>
        </div>

        <div
          className={`hsm__page${playing ? ' is-playing' : ''}`}
          role="img"
          aria-label={`HP制作サンプル（ライトプラン）: 架空の学習塾「${SCHOOL_NAME}」のホームページ。キャッチコピーは「${CATCH_LINES.join('')}」`}
        >
          <div className="hsm__nav" aria-hidden="true">
            <ul className="hsm__links">
              {NAV.map((item, index) => (
                <li key={item} className="hsm__fade" style={at(0.1 + index * 0.06)}>{item}</li>
              ))}
            </ul>
            <span className="hsm__nav-cta hsm__fade" style={at(0.45)}>無料体験</span>
          </div>

          <header className="hsm__brand" aria-hidden="true">
            <h3 className="hsm__logo">
              <span className="hsm__logo-ja">
                <span className="hsm__logo-main">
                  {chars(SCHOOL_MAIN).map((char, index) => (
                    <span key={`${char}-${index}`} className="hsm__logo-mask">
                      <span className="hsm__logo-char" style={at(0.2 + index * 0.09)}>{char}</span>
                    </span>
                  ))}
                </span>
                <span className="hsm__logo-sub">
                  {chars(SCHOOL_SUB).map((char, index) => (
                    <span key={`${char}-${index}`} className="hsm__logo-mask">
                      <span className="hsm__logo-char hsm__logo-char--light" style={at(0.2 + (SCHOOL_MAIN.length + index) * 0.09)}>{char}</span>
                    </span>
                  ))}
                </span>
                <span className="hsm__sun-mask">
                  <span className="hsm__sun" style={at(0.95)} />
                </span>
              </span>
            </h3>
            <div className="hsm__lockup">
              <span className="hsm__en" style={at(0.8)}>{SCHOOL_EN}</span>
              <span className="hsm__rule" style={at(0.9)} />
              <span className="hsm__tag hsm__fade" style={at(1.3)}>学習塾</span>
            </div>
          </header>

          <figure className="hsm__figure" aria-hidden="true">
            <div className="hsm__photo-mask" style={at(1.05)}>
              <img src={classroomHeroImg} alt="" className="hsm__photo" decoding="async" style={at(1.05)} />
            </div>
            <figcaption className="hsm__caption hsm__fade" style={at(2.0)}>
              <span className="hsm__caption-no">Fig.01</span>
              ホワイトボードを使った授業の様子
            </figcaption>
          </figure>

          <div className="hsm__copy" aria-hidden="true">
            <p className="hsm__catch">
              {CATCH_LINES.map((line, lineIndex) => (
                <span className="hsm__catch-line" key={line}>
                  {chars(line).map((char, index) => {
                    const offset = CATCH_LINES.slice(0, lineIndex).join('').length;
                    const inEmphasis = lineIndex === 1 && index < CATCH_EMPHASIS.length;
                    return (
                      <span key={`${char}-${index}`} className="hsm__catch-mask">
                        <span
                          className={`hsm__catch-char${inEmphasis ? ' is-emphasis' : ''}`}
                          style={at(1.7 + (offset + index) * 0.045)}
                        >
                          {char}
                        </span>
                      </span>
                    );
                  })}
                  {lineIndex === 1 ? (
                    <span className="hsm__underline" style={{ ...at(2.9), width: `${CATCH_EMPHASIS.length}em` }} />
                  ) : null}
                </span>
              ))}
            </p>
            <p className="hsm__sub hsm__fade" style={at(2.45)}>{SUB}</p>
            <span className="hsm__cta hsm__fade" style={at(2.65)}>
              無料体験授業を予約する
              <ArrowRight className="hsm__cta-arrow" strokeWidth={2} />
            </span>
          </div>

          <dl className="hsm__facts" aria-hidden="true">
            {FACTS.map(([label, value], index) => (
              <div key={label} className="hsm__fact hsm__fade" style={at(2.8 + index * 0.08)}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] tracking-[0.08em] text-white/50">※架空の学習塾サンプルです</p>
    </div>
  );
}

export default HpSampleMock;
