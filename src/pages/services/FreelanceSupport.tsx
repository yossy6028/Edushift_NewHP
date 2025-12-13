import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import serviceFreelance from '../../assets/service-online-tutor.png';

export const FreelanceSupport = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
                <div className="absolute inset-0">
                    <img src={serviceFreelance} alt="フリーランス独立支援" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">フリーランス独立支援</h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        あなたの「教える力」を、自由なキャリアへ。
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            組織に縛られない、<br />新しい教育者の生き方を。
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            「もっと一人ひとりの生徒に向き合いたい」「自分の理想とする教育を追求したい」
                            そんな想いを持つ教育者にとって、フリーランスや独立開業は有力な選択肢です。
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            しかし、教育スキルと経営スキルは別物です。集客、契約、経理、セルフブランディング……。
                            EduShiftは、教育業界での経験を活かし、あなたが「稼げる教育者」として自立するためのトータルサポートを提供します。
                            孤独になりがちな独立への道を、私たちが伴走します。
                        </p>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">主なサポート内容</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-pink-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">事業計画・ポジショニング</h4>
                                        <p className="text-sm text-slate-600">あなたの強みを分析し、競合と差別化できる独自の立ち位置と収益モデルを構築します。</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-pink-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">Web集客・ブランディング</h4>
                                        <p className="text-sm text-slate-600">HP制作、SNS運用、ポートフォリオ作成など、理想の生徒に出会うための発信力を強化します。</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-pink-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800">契約・実務サポート</h4>
                                        <p className="text-sm text-slate-600">トラブルを防ぐ契約書のひな形提供や、確定申告などの実務面もアドバイスします。</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
                            受講者の声
                            <span className="block text-base font-normal text-slate-500 mt-4">未経験から理想の働き方を実現した事例をご紹介します</span>
                        </h2>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-12">
                                <div className="md:w-1/3 flex flex-col items-center text-center">
                                    <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                                        👨‍🏫
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">元小学校教員 Sさん</h3>
                                    <p className="text-indigo-600 font-bold mb-4">現在：非常勤講師 ＋ オンライン家庭教師</p>
                                    <div className="bg-white p-4 rounded-xl w-full text-left text-sm text-slate-600 border border-slate-100">
                                        <div className="mb-2"><span className="font-bold block text-slate-800">経歴</span>小学校教員13年（担任・生徒指導主事）</div>
                                        <div><span className="font-bold block text-slate-800">専門</span>中学受験国語</div>
                                    </div>
                                </div>

                                <div className="md:w-2/3 space-y-10">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-sm">Q</span>
                                            受講前の状況と悩み
                                        </h4>
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                            <p className="text-slate-600 leading-relaxed">
                                                中学受験の経験も知識もなく、全くの未経験でした。「本当に指導できるのか？」「家族を養っていけるのか？」という不安が大きく、集客方法も全くわからない状態からのスタートでした。
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm">A</span>
                                            コンサルで得られた変化
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full -mr-8 -mt-8"></div>
                                                <h5 className="font-bold text-slate-900 mb-3 text-sm">指導・成約スキルの向上</h5>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    本文の読み方・解き方など基礎から指導いただき、生徒の「間違える理由」や「正答への思考プロセス」を深く分析できるようになりました。保護者対応のポイントも学び、スムーズな成約に繋がっています。
                                                </p>
                                            </div>
                                            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-full -mr-8 -mt-8"></div>
                                                <h5 className="font-bold text-slate-900 mb-3 text-sm">集客と実績の拡大</h5>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    SNSやブログの指導を受け地道に発信を続けた結果、お問い合わせが定期的に入るように。開始3ヶ月で1人だった生徒が、1年半で12人まで増加しました。
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                                        <h4 className="font-bold text-slate-900 mb-2">今後の展望</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            教員時代の「雑務に追われ授業準備ができない」ストレスから解放され、今は生徒一人ひとりのためにしっかり準備・指導できるやりがいを感じています。来年度は教員時代の収入を超える見込みです。
                                        </p>
                                        <p className="text-indigo-600 font-bold text-sm">
                                            「理想の働き方を考えて、必要な行動をしていくことが大切です」
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA */}
            <div className="bg-indigo-50 py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">理想のキャリアを、ここから始めましょう。</h2>
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
