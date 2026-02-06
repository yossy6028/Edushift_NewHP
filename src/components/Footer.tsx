
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-slate-950 py-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 flex flex-col items-center gap-6">
                <Link to="/">
                    <img src={logo} alt="EduShift" className="h-24 w-auto hover:opacity-90 transition-all" />
                </Link>
                <div className="flex gap-6 text-sm">
                    <Link to="/privacypolicy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</Link>
                    <Link to="/business-law" className="hover:text-slate-300 transition-colors">特定商取引法に基づく表記</Link>
                    <Link to="/#contact" className="hover:text-slate-300 transition-colors">お問い合わせ</Link>
                </div>
                <p>&copy; 2024 EduShift. All rights reserved.</p>
            </div>
        </footer>
    );
};
