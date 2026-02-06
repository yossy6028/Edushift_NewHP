
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import MetaTags from '../../components/MetaTags';
import serviceSchool from '../../assets/service-school-meeting.png';

export const SchoolSupport = () => {
    return (
        <div className="bg-white">
            <MetaTags
                title="小規模塾経営サポート"
                description="生徒数10〜50名規模の学習塾に特化した経営コンサルティング。集客・収益改善・業務効率化で、地域に愛される塾づくりを伴走支援します。"
                image="/ogp-school.png"
            />
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
                <div className="absolute inset-0">
                    <img src={serviceSchool} alt="小規模塾経営サポート" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">小規模塾経営サポート</h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        地域に愛される塾を、持続可能なビジネスへ。
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            「良い授業」だけでは、<br />塾は生き残れない時代へ。
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            少子化、大手塾の進出、オンライン教育の普及。小規模塾を取り巻く環境は年々厳しさを増しています。
                            しかし、地域密着型の小規模塾にしかできない「きめ細やかな指導」と「信頼関係」は、AI時代においても決して失われない価値です。
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            EduShiftは、その価値を最大限に高めながら、経営の「仕組み化」をサポートします。
                            属人化しがちな業務を整理し、安定した収益基盤と、先生自身が教育に向き合える時間を創出します。
                        </p>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">主なサポート内容</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">収益構造の適正化</h4>
                                        <p className="text-sm text-slate-600">適正な授業料設定、コース設計の見直しにより、利益率を改善します。</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">集客・ブランディング</h4>
                                        <p className="text-sm text-slate-600">チラシ頼みの集客から脱却し、WebやSNSを活用した現代的なマーケティングを構築します。</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">保護者対応のシステム化</h4>
                                        <p className="text-sm text-slate-600">対応品質を落とさずに、コミュニケーションコストを削減する仕組みを導入します。</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA */}
            <div className="bg-indigo-50 py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">あなたの塾の可能性を、一緒に広げませんか？</h2>
                    <div className="flex justify-center">
                        <Link to="/#contact" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-900/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
                            無料相談を予約する
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
