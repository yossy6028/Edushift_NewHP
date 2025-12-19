import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img src={logo} alt="EduShift" className="h-20 w-auto hover:opacity-90 transition-opacity" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/#services" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">サービス</Link>
                        <Link to="/service/hp-production" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">HP制作・保守</Link>
                        <Link to="/#about" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">私たちについて</Link>
                        <Link to="/#contact" className="px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 font-medium">
                            お問い合わせ
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-indigo-600 p-2">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl animate-in slide-in-from-top-5">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/#services" className="block px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">サービス</Link>
                        <Link to="/service/hp-production" className="block px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">HP制作・保守</Link>
                        <Link to="/#about" className="block px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">私たちについて</Link>
                        <Link to="/#contact" className="block px-4 py-3 text-indigo-600 font-medium bg-indigo-50 rounded-lg mt-4">お問い合わせ</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
