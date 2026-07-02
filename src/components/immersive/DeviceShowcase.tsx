import { useRef, useState } from 'react';

/**
 * 制作事例のライブデモ。3DチルトするノートPCモックアップの画面内に
 * 実際のサイトを iframe で表示し、訪問者がその場でスクロール・操作できる。
 * - 非アクティブ時: マウス位置に追従してPCが立体的に傾く（iframeは操作不可）
 * - 「実際に操作してみる」クリックでチルト停止＋iframe操作解禁
 * - タブでサイト切替（切替時は操作モード解除＆再読込）
 */

type SampleSite = {
    label: string;  // タブに出す名称
    url: string;    // 埋め込むURL（X-Frame-Options が無いこと）
    note: string;   // 画面下に出す一言（例: '公式サイト制作事例'）
};

// 掲載サイトは塾長判断で確定（2026-07-02: クライアント実サイトは掲載せず自作サンプルのみ）
const SAMPLE_SITES: SampleSite[] = [
    {
        label: '塾HPサンプル',
        url: 'https://yossy6028.github.io/creo-study-mita-handoff/creo-study-mita-A-soft-light.html',
        note: '学習塾向けモダンLPのサンプル制作例',
    },
];

const REDUCED = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const DeviceShowcase = () => {
    const [idx, setIdx] = useState(0);
    const [live, setLive] = useState(false);
    const [frameKey, setFrameKey] = useState(0);
    const stageRef = useRef<HTMLDivElement>(null);
    const laptopRef = useRef<HTMLDivElement>(null);
    const raf = useRef(0);

    const site = SAMPLE_SITES[idx];
    if (!site) return null;

    const onMove = (e: React.PointerEvent) => {
        if (live || REDUCED() || e.pointerType !== 'mouse') return;
        const stage = stageRef.current;
        const laptop = laptopRef.current;
        if (!stage || !laptop) return;
        const r = stage.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => {
            laptop.style.transform = `rotateY(${nx * 10}deg) rotateX(${-ny * 8}deg)`;
        });
    };
    const resetTilt = () => {
        cancelAnimationFrame(raf.current);
        if (laptopRef.current) laptopRef.current.style.transform = '';
    };
    const select = (i: number) => {
        setIdx(i);
        setLive(false);
        setFrameKey(k => k + 1);
    };
    const enterLive = () => {
        setLive(true);
        resetTilt();
    };

    return (
        <div className={`dsc${live ? ' is-live' : ''}`}>
            <div className="dsc-head" data-reveal="up">
                <div className="s-sec-num">LIVE DEMO · 実際に触れる制作事例</div>
                <h3>読むより、<em>触ってみてください</em>。</h3>
                <p>下の画面の中身は画像ではなく、実際に公開中のサイトです。スクロールもクリックも、そのまま動きます。</p>
            </div>
            {SAMPLE_SITES.length > 1 && (
                <div className="dsc-tabs" role="tablist" aria-label="制作事例の切り替え" data-reveal="up" data-reveal-delay="1">
                    {SAMPLE_SITES.map((s, i) => (
                        <button
                            key={s.url}
                            type="button"
                            role="tab"
                            aria-selected={i === idx}
                            className={`dsc-tab${i === idx ? ' is-active' : ''}`}
                            onClick={() => select(i)}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            )}
            <div
                ref={stageRef}
                className="dsc-stage"
                data-reveal="zoom"
                data-reveal-delay="2"
                onPointerMove={onMove}
                onPointerLeave={resetTilt}
            >
                <div ref={laptopRef} className="dsc-laptop">
                    <div className="dsc-cam" aria-hidden="true"></div>
                    <div className="dsc-screen">
                        <iframe
                            key={frameKey}
                            src={site.url}
                            title={`制作事例: ${site.label}`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                        />
                        {!live && (
                            <div className="dsc-overlay">
                                <button type="button" className="dsc-go" data-magnetic onClick={enterLive}>
                                    実際に操作してみる
                                    <span className="arrow" aria-hidden="true">→</span>
                                </button>
                                <span className="dsc-hint">マウスを動かすと画面が傾きます</span>
                            </div>
                        )}
                    </div>
                    <div className="dsc-base" aria-hidden="true"></div>
                </div>
            </div>
            <div className="dsc-foot">
                <span className="dsc-note">{site.note}</span>
                <span className="dsc-actions">
                    {live && (
                        <button type="button" className="dsc-exit" onClick={() => setLive(false)}>
                            操作を終了
                        </button>
                    )}
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                        新しいタブで開く <span aria-hidden="true">↗</span>
                    </a>
                </span>
            </div>
        </div>
    );
};
