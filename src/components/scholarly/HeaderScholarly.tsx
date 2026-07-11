import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo-shift-mark.png';

type NavMode = 'home' | 'subpage';

export const HeaderScholarly = ({ mode = 'subpage' }: { mode?: NavMode }) => {
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const homePath = '/';
    const anchor = (hash: string) => (mode === 'home' ? `#${hash}` : `${homePath}#${hash}`);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = navOpen ? 'hidden' : '';
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setNavOpen(false);
                toggleRef.current?.focus();
                return;
            }
            if (event.key !== 'Tab' || !navOpen) return;

            const links = Array.from(navRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? []);
            const focusable = [toggleRef.current, ...links].filter((item): item is HTMLElement => Boolean(item));
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        const focusFrame = navOpen
            ? window.requestAnimationFrame(() => navRef.current?.querySelector<HTMLElement>('a[href]')?.focus())
            : 0;
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
            window.cancelAnimationFrame(focusFrame);
        };
    }, [navOpen]);

    const closeNav = () => setNavOpen(false);

    return (
        <header className={`s-header s-header-${mode}${scrolled ? ' is-scrolled' : ''}${navOpen ? ' is-nav-open' : ''}`}>
            <div className="s-container s-header-inner">
                <Link to={homePath} className="s-brand" onClick={closeNav}>
                    <img src={logoImg} alt="" />
                    <span className="s-brand-name">Edu<em>Shift</em></span>
                    <span className="s-brand-sep"></span>
                    <span className="s-brand-tag">学びの伴走者</span>
                </Link>
                <button
                    ref={toggleRef}
                    type="button"
                    className={`s-nav-toggle${navOpen ? ' is-open' : ''}`}
                    aria-label={navOpen ? 'メニューを閉じる' : 'メニューを開く'}
                    aria-expanded={navOpen}
                    aria-controls="scholarly-subpage-nav"
                    onClick={() => setNavOpen(open => !open)}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
                <nav ref={navRef} id="scholarly-subpage-nav" className={`s-nav${navOpen ? ' is-open' : ''}`} aria-label="主要ナビゲーション">
                    <a href={anchor('empathy')} onClick={closeNav}>塾経営の今</a>
                    <a href={anchor('services')} onClick={closeNav}>サービス</a>
                    <a href={anchor('founder')} onClick={closeNav}>代表</a>
                    <a href={anchor('journal')} onClick={closeNav}>ブログ</a>
                    <a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-nav-ext" aria-label="noteを別タブで開く" onClick={closeNav}>
                        note<span className="s-nav-ext-arrow" aria-hidden="true">↗</span>
                    </a>
                    <a href={anchor('faq')} onClick={closeNav}>FAQ</a>
                    <a href={anchor('company')} onClick={closeNav}>会社概要</a>
                    <a href={anchor('contact')} className="s-cta-small" onClick={closeNav}>ご相談</a>
                </nav>
            </div>
        </header>
    );
};
