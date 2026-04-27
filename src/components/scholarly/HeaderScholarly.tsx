import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo-scholarly-mark.svg';

type NavMode = 'home' | 'subpage';

export const HeaderScholarly = ({ mode = 'subpage' }: { mode?: NavMode }) => {
    const homePath = '/';
    const anchor = (hash: string) => (mode === 'home' ? `#${hash}` : `${homePath}#${hash}`);
    return (
        <header className="s-header">
            <div className="s-container s-header-inner">
                <Link to={homePath} className="s-brand">
                    <img src={logoImg} alt="EduShift" />
                    <span className="s-brand-name">Edu<em>Shift</em></span>
                    <span className="s-brand-sep"></span>
                    <span className="s-brand-tag">学びの伴走者</span>
                </Link>
                <nav className="s-nav">
                    <a href={anchor('empathy')}>塾経営の今</a>
                    <a href={anchor('services')}>サービス</a>
                    <a href={anchor('founder')}>代表</a>
                    <a href={anchor('journal')}>ブログ</a>
                    <a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-nav-ext" aria-label="noteを別タブで開く">
                        note<span className="s-nav-ext-arrow" aria-hidden="true">↗</span>
                    </a>
                    <a href={anchor('faq')}>FAQ</a>
                    <a href={anchor('company')}>会社概要</a>
                    <a href={anchor('contact')} className="s-cta-small">ご相談</a>
                </nav>
            </div>
        </header>
    );
};
