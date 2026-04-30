import { useEffect, useState } from 'react';

interface FloatingCTAProps {
    href?: string;
    contactSelector?: string;
    heroSelector?: string;
    label?: string;
    sublabel?: string;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
    href = '#contact',
    contactSelector = '#contact',
    heroSelector = '.s-hero',
    label = '無料相談',
    sublabel = '30分・オンライン',
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hero = document.querySelector(heroSelector);
        const contact = document.querySelector(contactSelector);
        let heroOut = false;
        let contactIn = false;

        const update = () => setVisible(heroOut && !contactIn);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.target === hero) heroOut = !e.isIntersecting;
                if (e.target === contact) contactIn = e.isIntersecting;
            });
            update();
        }, { threshold: 0.1 });

        if (hero) observer.observe(hero);
        if (contact) observer.observe(contact);

        return () => observer.disconnect();
    }, [contactSelector, heroSelector]);

    return (
        <a
            href={href}
            className={`s-floating-cta${visible ? ' is-visible' : ''}`}
            aria-label={`${label}（${sublabel}）`}
        >
            <span className="s-floating-cta-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </span>
            <span className="s-floating-cta-text">
                <span className="s-floating-cta-label">{label}</span>
                <span className="s-floating-cta-sub">{sublabel}</span>
            </span>
            <span className="s-floating-cta-arrow" aria-hidden="true">→</span>
        </a>
    );
};
