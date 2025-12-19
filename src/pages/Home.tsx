
import { Sparkles, Brain, GraduationCap, ArrowRight, CheckCircle2, ChevronDown, Code2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/FadeIn';
import heroBg from '../assets/hero-bg.png';
import serviceSchool from '../assets/service-school-meeting.png';
import serviceAi from '../assets/service-ai.png';
import serviceFreelance from '../assets/service-online-tutor.png';
import aiGradingReport from '../assets/ai-grading-report.png';

import { AnimatedHeroTitle } from '../components/AnimatedHeroTitle';

export const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroBg}
                        alt="Advanced Education Technology"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 mix-blend-multiply"></div>

                    {/* Animated Blobs */}
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-sm font-semibold mb-6 animate-fade-in-up">
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-300" />
                                教育への情熱に、確かな翼を。
                            </span>
                        </div>

                        <AnimatedHeroTitle
                            text1="時代を超える教育を、"
                            text2="今、あなたの手で。"
                        />

                        <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed max-w-2xl text-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            変わらない想いを、変わりゆく技術で支える。<br className="hidden md:block" />
                            塾経営の洗練も、独立への挑戦も。<br className="hidden md:block" />
                            ここは、教育者のための滑走路です。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <a href="#contact" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-900/30 hover:bg-indigo-500 hover:scale-105 transition-all flex items-center justify-center gap-2 group ring-4 ring-indigo-600/30">
                                無料相談を予約する
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#services" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/20 transition-all text-center">
                                サービス詳細を見る
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="w-6 h-6" />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">教育の明日に、3つの『Shift』を。</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                経営の迷いには、確かな戦略を。現場の停滞には、AIの革新を。<br className="hidden md:block" />
                                個人の情熱には、独立への翼を。EduShiftは、教育のあらゆる局面でブレイクスルーを生み出します。
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Service 1 */}
                        <FadeIn delay={100}>
                            <Link to="/service/school-support" className="block h-full">
                                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col h-full cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img
                                            src={serviceSchool}
                                            alt="小規模塾経営サポート"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg">
                                            <GraduationCap className="h-8 w-8 text-indigo-600" />
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">小規模塾経営サポート</h3>
                                        <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                                            生徒集客から業務効率化、独自のカリキュラム作成まで、
                                            小規模塾ならではの強みを活かした経営戦略をご提案します。
                                        </p>
                                        <div className="border-t border-slate-100 pt-6">
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-indigo-500 flex-shrink-0" /> 収益構造の改善</li>
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-indigo-500 flex-shrink-0" /> ブランディング強化</li>
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-indigo-500 flex-shrink-0" /> 地域密着型マーケティング</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>

                        {/* Service 2 */}
                        <FadeIn delay={200}>
                            <Link to="/service/ai-consulting" className="block h-full">
                                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col h-full cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img
                                            src={serviceAi}
                                            alt="AI導入コンサルティング"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg">
                                            <Brain className="h-8 w-8 text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">AI導入コンサルティング</h3>
                                        <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                                            業務の自動化から教育ツールとしてのAI活用まで。
                                            最新技術を現場に定着させ、生産性を劇的に向上させます。
                                        </p>
                                        <div className="border-t border-slate-100 pt-6">
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" /> 業務フローの自動化</li>
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" /> AI教材の作成・導入</li>
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" /> スタッフ向けAI研修</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>

                        {/* Service 3 */}
                        <FadeIn delay={300}>
                            <Link to="/service/freelance-support" className="block h-full">
                                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col h-full cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img
                                            src={serviceFreelance}
                                            alt="フリーランス独立支援"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg">
                                            <Sparkles className="h-8 w-8 text-pink-600" />
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-pink-600 transition-colors">フリーランス独立支援</h3>
                                        <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                                            教育業界での経験を活かし、フリーランスとして独立するための
                                            スキルセット構築から案件獲得まで伴走します。
                                        </p>
                                        <div className="border-t border-slate-100 pt-6">
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" /> 事業計画の策定</li>
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" /> ポートフォリオ作成</li>
                                                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" /> 独自の強み発掘</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Development Section */}
            <section id="development" className="py-24 bg-slate-900 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-xl mb-6">
                                <Code2 className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-6">教育アプリ開発</h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                現場の「あったらいいな」をカタチに。<br className="hidden md:block" />
                                最新技術を活用した、実用的な教育ソリューションを開発しています。
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700 overflow-hidden flex flex-col lg:flex-row box-border">
                            {/* Image Side */}
                            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-slate-900/50 group overflow-hidden">
                                <img
                                    src={aiGradingReport}
                                    alt="AI記述式自動添削システム"
                                    className="absolute inset-0 w-full h-full object-contain bg-slate-100 transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/10"></div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold mb-6 w-fit">
                                    PICK UP PRODUCT
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">AI記述式自動添削システム</h3>
                                <p className="text-slate-300 mb-8 leading-relaxed">
                                    記述模試や定期テストの採点を、AIが強力にサポート。<br />
                                    手書き文字認識（OCR）と自然言語処理（NLP）を組み合わせ、
                                    従来の手作業に比べて採点工数を大幅に削減します。<br />
                                    一人ひとりに合わせたフィードバックコメントも自動生成可能です。<br />
                                    <span className="text-indigo-400 font-bold mt-2 inline-block">※ 初回登録で3回分の無料採点をお試しいただけます。</span>
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://auto-tensaku-system.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-indigo-900/30"
                                    >
                                        アプリを見る
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-700 grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-indigo-400 mb-1">OCR</div>
                                        <div className="text-xs text-slate-500">手書き認識</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-indigo-400 mb-1">NLP</div>
                                        <div className="text-xs text-slate-500">自然言語処理</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-indigo-400 mb-1">DX</div>
                                        <div className="text-xs text-slate-500">業務効率化</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">料金プラン</h2>
                            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                あなたのフェーズに合わせて選べる、<br className="hidden md:block" />
                                シンプルで透明性の高いプランをご用意しています。
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Plan 1 */}
                        <FadeIn delay={100}>
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">単発スポット</h3>
                                <p className="text-sm text-slate-500 mb-6">ピンポイントでの課題解決に</p>
                                <div className="mb-6">
                                    <span className="text-2xl font-bold text-slate-900">¥9,800</span>
                                    <span className="text-slate-500 text-sm">〜</span>
                                    <span className="text-2xl font-bold text-slate-900">¥15,800</span>
                                </div>
                                <div className="space-y-4 mb-8 flex-grow">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        <span className="font-bold text-indigo-600">オンライン</span> または <span className="font-bold text-indigo-600">現地（首都圏）</span>
                                    </p>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                            <span>現状のヒアリング・診断</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                            <span>具体的な改善案の提示</span>
                                        </li>
                                    </ul>
                                </div>
                                <a href="#contact" className="block w-full py-3 text-center rounded-xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-colors">
                                    相談する
                                </a>
                            </div>
                        </FadeIn>

                        {/* Plan 2 */}
                        <FadeIn delay={200}>
                            <div className="bg-white rounded-3xl p-8 border-2 border-indigo-600 shadow-2xl relative h-full flex flex-col overflow-hidden">
                                <div className="absolute top-5 right-5 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    人気No.1
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">期間コンサル</h3>
                                <p className="text-sm text-slate-500 mb-6">根本的な改善と実行支援に</p>
                                <div className="mb-6">
                                    <span className="text-sm text-slate-500 block mb-1">1ヶ月あたり</span>
                                    <span className="text-3xl font-bold text-slate-900">¥29,800</span>
                                    <span className="text-slate-500 text-sm">より</span>
                                </div>
                                <div className="space-y-4 mb-8 flex-grow">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        月額制の伴走型サポート
                                    </p>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                            <span>チャット相談し放題</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                            <span>月3回の定例ミーティング</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                            <span>施策の実行・検証サポート</span>
                                        </li>
                                    </ul>
                                </div>
                                <a href="#contact" className="block w-full py-3 text-center rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                    詳しく聞く
                                </a>
                            </div>
                        </FadeIn>

                        {/* Plan 3 */}
                        <FadeIn delay={300}>
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">顧問・年間契約</h3>
                                <p className="text-sm text-slate-500 mb-6">長期的な経営パートナーとして</p>
                                <div className="mb-6 flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-slate-900">要相談</span>
                                </div>
                                <div className="space-y-4 mb-8 flex-grow">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        事業規模・内容に応じたフルオーダー
                                    </p>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                            <span>経営戦略の立案・遂行</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                            <span>新規事業開発サポート</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                            <span>優先的なリソース確保</span>
                                        </li>
                                    </ul>
                                </div>
                                <a href="#contact" className="block w-full py-3 text-center rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-800 hover:text-white transition-colors">
                                    お問い合わせ
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">私たちについて</h2>
                            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                教育の現場を知るからこそ、できる支援がある。<br />
                                私たちは、先生と共に走る伴走者です。
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                        <FadeIn delay={100}>
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-indigo-100 pb-4">
                                        代表挨拶
                                    </h3>
                                    <div className="prose prose-slate text-slate-600 leading-relaxed">
                                        <p className="mb-4">
                                            「現場の先生が、もっと教育に集中できる環境をつくりたい」
                                        </p>
                                        <p className="mb-4">
                                            それが、EduShiftを立ち上げた原点です。
                                            私自身、長年教育業界に身を置き、生徒の成長に立ち会う喜びと同時に、
                                            経営や雑務に追われ、理想の教育を追求しきれないジレンマも感じてきました。
                                        </p>
                                        <p>
                                            AI技術の進化は、この課題を解決する大きな鍵となります。
                                            しかし、技術ありきではなく、あくまで「人の温かみ」を活かすための技術でなければなりません。
                                            私たちは、最新のテクノロジーと現場の泥臭い知見を融合させ、
                                            教育に関わるすべての人を、裏側から力強く支えていきます。
                                        </p>
                                    </div>
                                    <div className="mt-8 text-right">
                                        <p className="font-bold text-slate-900">EduShift 代表</p>
                                        <p className="text-slate-500 text-sm">吉井 勝彦</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                                <h3 className="text-lg font-bold text-slate-900 bg-slate-50 px-8 py-6 border-b border-slate-100">
                                    会社概要
                                </h3>
                                <div className="divide-y divide-slate-100">
                                    <div className="flex flex-col sm:flex-row p-6 hover:bg-slate-50 transition-colors">
                                        <div className="sm:w-32 font-medium text-slate-500 mb-2 sm:mb-0">屋号</div>
                                        <div className="text-slate-900 font-medium">EduShift</div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row p-6 hover:bg-slate-50 transition-colors">
                                        <div className="sm:w-32 font-medium text-slate-500 mb-2 sm:mb-0">代表者</div>
                                        <div className="text-slate-900">吉井 勝彦</div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row p-6 hover:bg-slate-50 transition-colors">
                                        <div className="sm:w-32 font-medium text-slate-500 mb-2 sm:mb-0">事業内容</div>
                                        <div className="text-slate-900">
                                            <ul className="list-disc list-inside space-y-1 text-sm">
                                                <li>学習塾・スクール向け経営コンサルティング</li>
                                                <li>教育機関向けAI導入支援・DX推進</li>
                                                <li>教育関連フリーランス独立支援・育成</li>
                                                <li>教育アプリ・システム開発</li>
                                                <li>Webサイト制作・マーケティング支援</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row p-6 hover:bg-slate-50 transition-colors">
                                        <div className="sm:w-32 font-medium text-slate-500 mb-2 sm:mb-0">所在地</div>
                                        <div className="text-slate-900">〒150-0021<br />東京都渋谷区恵比寿西2丁目4番8号ウィンド恵比寿ビル8F</div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">未来を切り拓く第一歩を。</h2>
                    <p className="text-slate-400 mb-12">
                        まずは無料相談から。あなたの現状と目標をお聞かせください。<br />
                        最適なプランをご提案いたします。
                    </p>

                    <form className="max-w-md mx-auto space-y-4 text-left">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">メールアドレス</label>
                            <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">お問い合わせ内容</label>
                            <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="ご相談内容をご記入ください"></textarea>
                        </div>
                        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-white shadow-lg shadow-indigo-900/50 transition-all">
                            送信する
                        </button>
                    </form>
                </div>
            </section>
        </div >
    );
};
