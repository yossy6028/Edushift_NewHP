import { useEffect, useRef } from 'react';
import { CursorFX } from './immersive/CursorFX';
import '../styles/page-motion.css';
import '../styles/immersive.css';

type PageMotionVariant = 'service' | 'legal' | 'studio';

const REVEAL_SELECTORS = [
    '.s-breadcrumb',
    '.s-detail-hero-meta',
    '.s-detail-title',
    '.s-detail-lead',
    '.s-detail-narrative-left > *',
    '.s-detail-support',
    '.s-detail-extra-card',
    '.s-aieo-head',
    '.s-aieo-card',
    '.s-aieo-measures-head',
    '.s-aieo-measure',
    '.s-aieo-closing',
    '.dx-product-gallery [data-reveal]',
    '.s-detail-pricing-head',
    '.s-detail-price-card',
    '.s-sub-pricing-head',
    '.s-sub-price-card',
    '.s-voice-detail-head',
    '.s-voice-detail-card',
    '.s-detail-cta h2',
    '.s-detail-cta p',
    '.s-detail-cta-row',
    '.s-legal-hero h1',
    '.s-legal-updated',
    '.s-legal-paper > p',
    '.s-legal-paper > h2',
    '.s-legal-paper > ul',
    '.s-legal-paper > dl > *',
    '.s-logo-intro > *',
    '.s-logo-variant',
].join(',');

export const PageMotion = ({ variant }: { variant: PageMotionVariant }) => {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = document.querySelector<HTMLElement>('[data-page-motion]');
        if (!root) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const revealItems = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTORS));

        revealItems.forEach((element, index) => {
            element.dataset.pmReveal = '';
            element.style.setProperty('--pm-delay', `${Math.min(index % 4, 3) * 70}ms`);
        });

        let observer: IntersectionObserver | undefined;
        if (reduced || !('IntersectionObserver' in window)) {
            revealItems.forEach(element => element.classList.add('is-visible'));
        } else {
            observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add('is-visible');
                        observer?.unobserve(entry.target);
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
            );
            revealItems.forEach(element => observer?.observe(element));
        }

        let scrollFrame = 0;
        const updateScroll = () => {
            scrollFrame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? window.scrollY / max : 0;
            progressRef.current?.style.setProperty('transform', `scaleX(${progress})`);
        };
        const onScroll = () => {
            if (scrollFrame) return;
            scrollFrame = window.requestAnimationFrame(updateScroll);
        };

        let pointerFrame = 0;
        let pointerX = 0;
        let pointerY = 0;
        const updatePointer = () => {
            pointerFrame = 0;
            root.style.setProperty('--pm-shift-x', `${pointerX}px`);
            root.style.setProperty('--pm-shift-y', `${pointerY}px`);
            root.style.setProperty('--pm-shift-x-soft', `${pointerX * 0.6}px`);
            root.style.setProperty('--pm-shift-y-soft', `${pointerY * 0.6}px`);
            root.style.setProperty('--pm-shift-x-reverse', `${pointerX * -1}px`);
            root.style.setProperty('--pm-shift-y-reverse', `${pointerY * -0.7}px`);
        };
        const onPointerMove = (event: PointerEvent) => {
            if (reduced || event.pointerType !== 'mouse') return;
            pointerX = ((event.clientX / window.innerWidth) - 0.5) * 24;
            pointerY = ((event.clientY / window.innerHeight) - 0.5) * 18;
            if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
        };

        updateScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true });

        return () => {
            observer?.disconnect();
            window.removeEventListener('scroll', onScroll);
            if (!reduced) window.removeEventListener('pointermove', onPointerMove);
            window.cancelAnimationFrame(scrollFrame);
            window.cancelAnimationFrame(pointerFrame);
        };
    }, [variant]);

    return (
        <>
            <CursorFX />
            <div className="pm-progress" ref={progressRef} aria-hidden="true" />
            <div className={`pm-ambient pm-ambient--${variant}`} aria-hidden="true">
                <span className="pm-orb pm-orb--one" />
                <span className="pm-orb pm-orb--two" />
                <span className="pm-grid" />
            </div>
            <div className="pm-route-curtain" aria-hidden="true">
                <span>Edu<em>Shift</em></span>
            </div>
        </>
    );
};
