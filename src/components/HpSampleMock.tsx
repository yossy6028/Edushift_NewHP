import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import classroomHeroImg from '../assets/generated/lumina-classroom-hero.webp';
import '../styles/hp-sample-mock.css';

const SCHOOL_NAME = 'ひなた学舎';
const SCHOOL_MAIN = 'ひなた';
const SCHOOL_SUB = '学舎';
const SCHOOL_EN = 'HINATA ACADEMY';
const DOMAIN = 'hinata-gakusha.example';
const CATCH_LINES = ['みんなで考えて、', 'ひとりで解ける。'] as const;
const CATCH_EMPHASIS = 'みんなで';
const SUB_LINES = ['定員12名の少人数クラス。', '発問と議論で考える力を育てる、', '小4から中3までの学習塾です。'] as const;
const VERTICAL = '少人数制の集団授業';
const NAV = ['特長', 'コース', '合格実績', 'アクセス'] as const;
const FACTS: Array<[string, string]> = [
  ['対象', '小4–中3'],
  ['クラス定員', '12名'],
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
    <div ref={hostRef} className={`relative mx-auto flex h-full max-w-[640px] flex-col justify-center ${className}`}>
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
          aria-label={`HP制作サンプル（ライトプラン）: 架空の学習塾「${SCHOOL_NAME}」のホームページ。定員12名の少人数制集団授業。キャッチコピーは「${CATCH_LINES.join('')}」`}
        >
          <div className="hsm__nav" aria-hidden="true">
            <span className="hsm__wordmark hsm__fade" style={at(0.1)}>{SCHOOL_EN}</span>
            <ul className="hsm__links">
              {NAV.map((item, index) => (
                <li key={item} className="hsm__fade" style={at(0.14 + index * 0.06)}>{item}</li>
              ))}
              <li className="hsm__nav-cta hsm__fade" style={at(0.45)}>無料体験</li>
            </ul>
          </div>

          <div className="hsm__hero" aria-hidden="true">
            <figure className="hsm__figure">
              <div className="hsm__photo-mask" style={at(0.5)}>
                <img src={classroomHeroImg} alt="" className="hsm__photo" decoding="async" style={at(0.5)} />
              </div>
              <figcaption className="hsm__caption hsm__fade" style={at(1.7)}>
                <span className="hsm__caption-no">Fig.01</span>
                定員12名の教室
              </figcaption>
            </figure>

            <h3 className="hsm__logo">
              <span className="hsm__logo-ja">
                <span className="hsm__logo-main">
                  {chars(SCHOOL_MAIN).map((char, index) => (
                    <span key={`${char}-${index}`} className="hsm__logo-mask">
                      <span className="hsm__logo-char" style={at(0.15 + index * 0.09)}>{char}</span>
                    </span>
                  ))}
                </span>
                <span className="hsm__logo-sub">
                  {chars(SCHOOL_SUB).map((char, index) => (
                    <span key={`${char}-${index}`} className="hsm__logo-mask">
                      <span className="hsm__logo-char hsm__logo-char--light" style={at(0.15 + (SCHOOL_MAIN.length + index) * 0.09)}>{char}</span>
                    </span>
                  ))}
                </span>
                <span className="hsm__sun-mask">
                  <span className="hsm__sun" style={at(0.9)} />
                </span>
              </span>
            </h3>

            <div className="hsm__cut">
              <p className="hsm__catch">
                {CATCH_LINES.map((line, lineIndex) => (
                  <span className="hsm__catch-line" key={line}>
                    {chars(line).map((char, index) => {
                      const offset = CATCH_LINES.slice(0, lineIndex).join('').length;
                      const inEmphasis = lineIndex === 0 && index < CATCH_EMPHASIS.length;
                      return (
                        <span key={`${char}-${index}`} className="hsm__catch-mask">
                          <span
                            className={`hsm__catch-char${inEmphasis ? ' is-emphasis' : ''}`}
                            style={at(1.5 + (offset + index) * 0.04)}
                          >
                            {char}
                          </span>
                        </span>
                      );
                    })}
                    {lineIndex === 0 ? (
                      <span className="hsm__underline" style={{ ...at(2.3), width: `${CATCH_EMPHASIS.length}em` }} />
                    ) : null}
                  </span>
                ))}
              </p>
            </div>

            <div className="hsm__vert">
              <span className="hsm__vert-rule" style={at(1.2)} />
              <span className="hsm__vert-text hsm__fade" style={at(1.4)}>{VERTICAL}</span>
            </div>
          </div>

          <div className="hsm__body" aria-hidden="true">
            <div className="hsm__row">
              <p className="hsm__sub hsm__fade" style={at(2.2)}>
                {SUB_LINES.map((line) => (
                  <span key={line} className="hsm__sub-line">{line}</span>
                ))}
              </p>
              <span className="hsm__cta hsm__fade" style={at(2.4)}>
                無料体験を予約する
                <ArrowRight className="hsm__cta-arrow" strokeWidth={2} />
              </span>
            </div>

            <dl className="hsm__facts">
              {FACTS.map(([label, value], index) => (
                <div key={label} className="hsm__fact hsm__fade" style={at(2.55 + index * 0.08)}>
                  <dt>
                    <span className="hsm__fact-no">{`0${index + 1}`}</span>
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] tracking-[0.08em] text-white/50">※架空の学習塾サンプルです</p>
    </div>
  );
}

export default HpSampleMock;
