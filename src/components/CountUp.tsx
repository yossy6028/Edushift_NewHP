import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
    /** Final value, e.g. 29800 */
    value: number;
    /** Rendered before the number, e.g. "¥" */
    prefix?: string;
    /** Duration in ms */
    duration?: number;
    className?: string;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Animates 0 → value with locale thousands separators when scrolled into view.
 * Falls back to the static value when reduced motion is requested.
 */
const prefersStatic = () =>
    typeof window === 'undefined' ||
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const CountUp = ({ value, prefix = '', duration = 1400, className }: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState(() => (prefersStatic() ? value : 0));
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersStatic()) return;

        const observer = new IntersectionObserver(
            entries => {
                if (!entries[0].isIntersecting || started.current) return;
                started.current = true;
                observer.disconnect();

                const t0 = performance.now();
                const tick = (now: number) => {
                    const p = easeOutExpo((now - t0) / duration);
                    setDisplay(Math.round(value * p));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            },
            { threshold: 0.5 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display.toLocaleString('ja-JP')}
        </span>
    );
};
