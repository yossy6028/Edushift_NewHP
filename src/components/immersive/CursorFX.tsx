import { useEffect, useRef } from 'react';

/**
 * カスタムカーソル「照準ロック＋彗星軌跡」。
 * - 本体: teal→blue のグラデーション球（白/紺どちらの背景でも見えるよう明色コア＋暗色影の二重シャドウ）
 * - 移動: canvas にブランド色の光の尾（彗星トレイル）を描画
 * - ホバー: a / button 等の対象に四隅ブラケットが吸着する「ターゲットロック」
 * - クリック: 粒子が放射状に弾けるバースト
 * - input等のテキスト入力・iframe上ではOS標準カーソルへ退避
 * - タッチ端末（pointer: coarse）と prefers-reduced-motion では一切マウントしない
 */

const HOVER_SEL = 'a, button, [role="button"], [data-magnetic]';
const NATIVE_SEL = 'input, textarea, select, iframe, [contenteditable]';
const MAGNET_SEL = '[data-magnetic]';

// ブランド「Shift Current」パレット（teal → blue）
const TRAIL_COLORS: Array<[number, number, number]> = [
    [0, 194, 199],   // teal bright
    [0, 164, 168],   // teal
    [46, 168, 255],  // blue bright
    [2, 147, 240],   // blue
];

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;   // 1 → 0
    decay: number;
    r: number;
    c: [number, number, number];
};

const MAX_PARTICLES = 320;
const LOCK_PAD = 8;      // ブラケットと対象の余白(px)
const LOCK_LERP = 0.22;  // ブラケット吸着の追従率

export const CursorFX = () => {
    const orbRef = useRef<HTMLDivElement>(null);
    const lockRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const orb = orbRef.current;
        const lock = lockRef.current;
        const canvas = canvasRef.current;
        if (!orb || !lock || !canvas) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        document.body.classList.add('has-fx-cursor');

        // ---- canvas（彗星軌跡）----
        const dpr = Math.min(window.devicePixelRatio, 2);
        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const particles: Particle[] = [];
        const spawn = (x: number, y: number, n: number, speed: number, size: number) => {
            for (let i = 0; i < n; i++) {
                if (particles.length >= MAX_PARTICLES) particles.shift();
                const a = Math.random() * Math.PI * 2;
                const v = speed * (0.3 + Math.random());
                particles.push({
                    x, y,
                    vx: Math.cos(a) * v,
                    vy: Math.sin(a) * v + 0.15,
                    life: 1,
                    decay: 0.028 + Math.random() * 0.03,
                    r: size * (0.5 + Math.random()),
                    c: TRAIL_COLORS[(Math.random() * TRAIL_COLORS.length) | 0],
                });
            }
        };

        // ---- 状態 ----
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let px = x;
        let py = y;
        let shown = false;
        let native = false;
        let magnetEl: HTMLElement | null = null;
        let lockEl: Element | null = null;
        // ブラケット枠の現在値（カーソル位置の点から対象矩形へ滑らかに展開する）
        const box = { x, y, w: 0, h: 0, o: 0 };
        let raf = 0;

        const setShown = (v: boolean) => {
            if (shown === v) return;
            shown = v;
            orb.style.opacity = v ? '1' : '0';
            if (!v) { lockEl = null; box.o = 0; lock.style.opacity = '0'; }
        };

        const onMove = (e: PointerEvent) => {
            x = e.clientX;
            y = e.clientY;
            setShown(true);
            orb.style.transform = `translate(${x}px, ${y}px)`;

            // 軌跡: 移動距離に応じて粒子を落とす（静止中は出さない）
            const dist = Math.hypot(x - px, y - py);
            if (!native && dist > 3) spawn(x, y, Math.min(3, (dist / 8) | 0) || 1, 0.5, 2.2);
            px = x;
            py = y;

            const t = e.target instanceof Element ? e.target : null;
            native = !!t?.closest(NATIVE_SEL);
            orb.classList.toggle('is-native', native);
            lock.classList.toggle('is-native', native);

            lockEl = native ? null : (t?.closest(HOVER_SEL) ?? null);

            const m = (t?.closest(MAGNET_SEL) as HTMLElement | null) ?? null;
            if (m !== magnetEl) {
                if (magnetEl) magnetEl.style.transform = '';
                magnetEl = m;
            }
            if (m) {
                const r = m.getBoundingClientRect();
                m.style.transform = `translate(${(x - (r.left + r.width / 2)) * 0.22}px, ${(y - (r.top + r.height / 2)) * 0.22}px)`;
            }
        };
        const onLeave = () => setShown(false);
        const onDown = () => {
            orb.classList.add('is-down');
            if (!native) spawn(x, y, 16, 3.2, 2.8);
        };
        const onUp = () => orb.classList.remove('is-down');

        // ---- メインループ: ブラケット追従＋軌跡描画 ----
        const loop = () => {
            // ターゲットロック: 対象矩形へ展開 / 非ロック時はカーソル点へ収束
            let tx = x;
            let ty = y;
            let tw = 0;
            let th = 0;
            let to = 0;
            if (lockEl && lockEl.isConnected) {
                const r = lockEl.getBoundingClientRect();
                tx = r.left - LOCK_PAD;
                ty = r.top - LOCK_PAD;
                tw = r.width + LOCK_PAD * 2;
                th = r.height + LOCK_PAD * 2;
                to = 1;
            }
            box.x += (tx - box.x) * LOCK_LERP;
            box.y += (ty - box.y) * LOCK_LERP;
            box.w += (tw - box.w) * LOCK_LERP;
            box.h += (th - box.h) * LOCK_LERP;
            box.o += (to - box.o) * 0.18;
            lock.style.transform = `translate(${box.x}px, ${box.y}px)`;
            lock.style.width = `${box.w}px`;
            lock.style.height = `${box.h}px`;
            lock.style.opacity = String(box.o);
            orb.classList.toggle('is-locked', !!lockEl);

            // 彗星軌跡
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life -= p.decay;
                if (p.life <= 0) { particles.splice(i, 1); continue; }
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;
                const a = p.life * p.life * 0.85;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, ${a})`;
                ctx.fill();
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            if (magnetEl) magnetEl.style.transform = '';
            document.body.classList.remove('has-fx-cursor');
        };
    }, []);

    return (
        <div aria-hidden="true">
            <canvas ref={canvasRef} className="fx-trail" />
            <div ref={lockRef} className="fx-lock">
                <span></span><span></span><span></span><span></span>
            </div>
            <div ref={orbRef} className="fx-orb" />
        </div>
    );
};
