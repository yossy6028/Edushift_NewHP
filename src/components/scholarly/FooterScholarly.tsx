import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo-scholarly-mark.svg';

export const FooterScholarly = ({ mode = 'subpage' }: { mode?: 'home' | 'subpage' }) => {
    const anchor = (hash: string) => (mode === 'home' ? `#${hash}` : `/v2#${hash}`);
    return (
        <footer className="s-footer">
            <div className="s-container">
                <div className="s-footer-grid">
                    <div>
                        <Link to="/v2" className="s-footer-brand-logo" aria-label="EduShift">
                            <img src={logoImg} alt="EduShift" />
                            <span className="s-footer-brand-name-text">Edu<em>Shift</em></span>
                        </Link>
                        <p style={{ fontFamily: 'var(--s-serif-jp)', fontSize: '13px', lineHeight: '1.9', margin: 0 }}>
                            教育の"周辺"を、<br />いちばん近くで支える。
                        </p>
                    </div>
                    <div>
                        <h5>Services</h5>
                        <ul>
                            <li><Link to="/v2/service/school-support">小規模塾経営サポート</Link></li>
                            <li><Link to="/v2/service/ai-consulting">AI導入コンサル</Link></li>
                            <li><Link to="/v2/service/freelance-support">独立支援</Link></li>
                            <li><Link to="/v2/service/hp-production">HP制作・運用</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Company</h5>
                        <ul>
                            <li><a href={anchor('founder')}>代表挨拶</a></li>
                            <li><a href={anchor('company')}>会社概要</a></li>
                            <li><a href={anchor('journal')}>ブログ（最新記事）</a></li>
                            <li><a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-footer-ext">note プロフィール<span aria-hidden="true">↗</span></a></li>
                            <li><a href={anchor('faq')}>よくあるご質問</a></li>
                            <li><a href={anchor('contact')}>お問い合わせ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Legal</h5>
                        <ul>
                            <li><Link to="/v2/privacypolicy">プライバシーポリシー</Link></li>
                            <li><Link to="/v2/business-law">特定商取引法</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="s-footer-bottom">
                    <span>© EduShift — All rights reserved.</span>
                    <span>〒150-0021 東京都渋谷区恵比寿西2-4-8 ウィンド恵比寿ビル8F · info@edu-shift.com</span>
                </div>
            </div>
        </footer>
    );
};
