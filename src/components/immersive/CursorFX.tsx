import { useEffect, useRef } from 'react';

/**
 * カスタムカーソル演出。
 * - 中心ドット（即時追従）＋リング（lerp遅延追従）。mix-blend-mode: difference で明暗両背景に対応
 * - a / button ホバーでリング拡大、[data-magnetic] 要素はカーソルへ吸着（磁気ボタン）
 * - input等のテキスト入力・iframe上ではOS標準カーソルへ退避
 * - タッチ端末（pointer: coarse）と prefers-reduced-motion では一切マウントしない
 */

const HOVER_SEL = 'a, button, [role="button"], [data-magnetic]';
const NATIVE_SEL = 'input, textarea, select, iframe, [contenteditable]';
const MAGNET_SEL = '[data-magnetic]';

export const CursorFX = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.body.classList.add('has-fx-cursor');

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let rx = x;
        let ry = y;
        let raf = 0;
        let shown = false;
        let magnetEl: HTMLElement | null = null;

        const onMove = (e: PointerEvent) => {
            x = e.clientX;
            y = e.clientY;
            if (!shown) {
                shown = true;
                dot.style.opacity = '1';
                ring.style.opacity = '1';
            }
            dot.style.transform = `translate(${x}px, ${y}px)`;

            const t = e.target instanceof Element ? e.target : null;
            const native = !!t?.closest(NATIVE_SEL);
            ring.classList.toggle('is-hover', !native && !!t?.closest(HOVER_SEL));
            ring.classList.toggle('is-native', native);
            dot.classList.toggle('is-native', native);

            const m = (t?.closest(MAGNET_SEL) as HTMLElement | null) ?? null;
            if (m !== magnetEl) {
                if (magnetEl) magnetEl.style.transform = '';
                magnetEl = m;
            }
            if (m) {
                const r = m.getBoundingClientRect();
                const dx = x - (r.left + r.width / 2);
                const dy = y - (r.top + r.height / 2);
                m.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
            }
        };
        const onLeave = () => {
            shown = false;
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        };
        const onDown = () => ring.classList.add('is-down');
        const onUp = () => ring.classList.remove('is-down');
        const loop = () => {
            rx += (x - rx) * 0.16;
            ry += (y - ry) * 0.16;
            ring.style.transform = `translate(${rx}px, ${ry}px)`;
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);

        return () => {
            cancelAnimationFrame(raf);
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
            <div ref={ringRef} className="fx-ring" />
            <div ref={dotRef} className="fx-dot" />
        </div>
    );
};
