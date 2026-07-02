import { useEffect } from 'react';

/**
 * Scroll-driven reveal system.
 * Observes every element carrying [data-reveal] and adds .is-revealed
 * when it enters the viewport. Variants and stagger are handled in CSS:
 *   data-reveal="up" | "left" | "right" | "zoom" | "draw"
 *   data-reveal-delay="1".."6"  → transition-delay steps of 90ms
 * Respects prefers-reduced-motion: everything is revealed immediately.
 */
export const useReveal = () => {
    useEffect(() => {
        const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
        if (!targets.length) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced || !('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('is-revealed'));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        );

        targets.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
};
