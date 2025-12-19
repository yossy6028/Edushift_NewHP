
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import serviceAi from '../../assets/service-ai.png';

export const AiConsulting = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
                <div className="absolute inset-0">
                    <img src={serviceAi} alt="AI導入コンサルティング" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">AI導入コンサルティング</h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        最新技術を、教育現場の「力」に変える。
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            AIは、先生の仕事を<br />奪うものではありません。
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            ChatGPTをはじめとするAI技術の進化は、教育業界にも大きな変革をもたらしています。
                            しかし、「使い方がわからない」「導入コストが不安」「温かみがなくなるのでは」といった懸念も少なくありません。
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            EduShiftが提案するのは、「先生をスーパーマンにする」ためのAI活用です。
                            事務作業の自動化で生徒と向き合う時間を増やし、AI教材で個別に最適化された指導を実現する。
                            現場に無理なく馴染む、実用的な導入支援を行います。
                        </p>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">主なサポート内容</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">業務フローの自動化</h4>
                                        <p className="text-sm text-slate-600">日報作成、保護者連絡、シフト管理など、煩雑な事務作業をAIで効率化します。</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">オリジナルAI教材の作成</h4>
                                        <p className="text-sm text-slate-600">塾独自のノウハウを学習させた、貴塾専用のAIチューターや教材生成ボットを開発します。</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">スタッフ向けAI研修</h4>
                                        <p className="text-sm text-slate-600">講師やスタッフがAIをツールとして使いこなせるよう、実践的な研修を行います。</p>
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
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">AI活用の第一歩、踏み出しませんか？</h2>
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
