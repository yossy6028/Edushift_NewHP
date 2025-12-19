
import { CheckCircle2, ArrowRight, Shield, Zap, Settings, MessageSquare, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import serviceHp from '../../assets/service-hp.png';

export const HpProduction = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
                <div className="absolute inset-0">
                    <img src={serviceHp} alt="HP制作・保守運用" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/70 shadow-inner" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-indigo-100 text-sm font-semibold mb-6 animate-fade-in-up">
                        EduShift Web Solution
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">HP制作・保守運用</h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-8 animate-fade-in-up max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
                        「低価格なHP構築」から始まる、<br className="md:hidden" />塾経営のデジタルトランスフォーメーション。
                    </p>
                </div>
            </div>

            {/* Strategy Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">プロジェクトの目的</h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            EduShiftのHP制作は、単に「サイトを作る」ことだけを目的としません。<br />
                            小規模学習塾の皆様が、<strong>低コストでプロフェッショナルなWeb基盤</strong>を持ち、<br className="hidden md:block" />
                            その後の<strong>保守・コンサルティングを通じてLTV（顧客生涯価値）を最大化</strong>することを目指しています。
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <FadeIn delay={100}>
                        <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <Zap className="w-24 h-24 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-indigo-600" />
                                制作（ショット）の考え方
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                下位プランでは、厳選されたテンプレートを使用し、あえて「デザイン修正」を制限することで、圧倒的なコストパフォーマンスとスピード感を実現します。
                                浮いたコストと時間を、教育の質を高めるための「コンテンツ作成」や「経営改善」に充てていただく。それがEduShiftの提案です。
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <Shield className="w-24 h-24 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Shield className="w-6 h-6 text-blue-600" />
                                保守（ストック）の考え方
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                HPは作ってからが本番です。単なる「維持管理（サーバー・ドメイン管理）」に留まらず、上位プランではAIを活用したブログ記事案の提供や、集客の右腕としてのコンサルティングを組み込み、貴塾の成長を継続的に支えます。
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Production Plans */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">HP構築プラン</h2>
                            <p className="text-slate-600">初期費用を抑えた流し込みプランから、本格的なSEO特化プランまで。</p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Light Plan */}
                        <FadeIn delay={100}>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">ライト</h3>
                                    <p className="text-sm text-slate-500 mb-4">まずは名刺代わりの1枚が欲しい方に</p>
                                    <div className="text-3xl font-bold text-indigo-600">¥29,800<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
                                </div>
                                <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> LP（1枚構成）</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 厳選テンプレート使用</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> スマートフォン対応</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 問合せフォーム設置</li>
                                    <li className="flex items-center gap-2 font-semibold border-t pt-2">※原稿・画像は完全支給</li>
                                    <li className="flex items-center gap-2">※修正は誤字脱字のみ対応</li>
                                </ul>
                                <Link to="/#contact" className="w-full py-3 bg-slate-900 text-white rounded-xl text-center font-bold hover:bg-slate-800 transition-colors">問い合わせる</Link>
                            </div>
                        </FadeIn>

                        {/* Standard Plan */}
                        <FadeIn delay={200}>
                            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-500 h-full flex flex-col relative scale-105 z-10">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    Recommended
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">スタンダード</h3>
                                    <p className="text-sm text-slate-500 mb-4">集客に必要な基本構成を網羅</p>
                                    <div className="text-3xl font-bold text-indigo-600">¥49,800<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
                                </div>
                                <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> TOP + 下層3ページ</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ブログ・お知らせ機能</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> WordPress構築</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 過去サイトからの移行相談</li>
                                    <li className="flex items-center gap-2 font-semibold border-t pt-2">※基本レイアウトへの流し込み</li>
                                    <li className="flex items-center gap-2">※納品前の確認1回のみ対応</li>
                                </ul>
                                <Link to="/#contact" className="w-full py-3 bg-indigo-600 text-white rounded-xl text-center font-bold hover:bg-indigo-700 transition-colors">問い合わせる</Link>
                            </div>
                        </FadeIn>

                        {/* Premium Plan */}
                        <FadeIn delay={300}>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">プレミアム</h3>
                                    <p className="text-sm text-slate-500 mb-4">競合に勝つ、強み訴求の本格サイト</p>
                                    <div className="text-3xl font-bold text-indigo-600">¥98,000<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
                                </div>
                                <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> TOP + 下層5~7ページ</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 戦略的ライティング支援</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Googleマップ(MEO)連携</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 内部SEO初期設定</li>
                                    <li className="flex items-center gap-2 font-semibold border-t pt-2">※オリジナル要素の追加</li>
                                    <li className="flex items-center gap-2">※詳細な修正対応（規定範囲内）</li>
                                </ul>
                                <Link to="/#contact" className="w-full py-3 bg-slate-900 text-white rounded-xl text-center font-bold hover:bg-slate-800 transition-colors">問い合わせる</Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Maintenance Plans */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">保守・運用プラン</h2>
                            <p className="text-slate-600">サイトの健康を保つ維持管理から、経営を加速させるパートナーシップまで。</p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Minimum Plan */}
                        <FadeIn delay={100}>
                            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 flex flex-col h-full">
                                <div className="mb-6">
                                    <span className="text-indigo-600 font-bold text-sm uppercase mb-2 block tracking-widest">Insurance</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">ミニマム</h3>
                                    <div className="text-2xl font-bold text-slate-900">¥2,900<span className="text-sm font-normal text-slate-400">/月</span></div>
                                </div>
                                <ul className="space-y-4 text-sm text-slate-600 flex-grow border-t border-slate-200 pt-6">
                                    <li className="flex items-start gap-3">
                                        <Settings className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>ドメイン・サーバー維持管理</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Settings className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>WP本体/プラグインの更新</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Settings className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>定期バックアップ作成</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-slate-400 mt-6">※一切の修正・サポート対応を含みません</p>
                            </div>
                        </FadeIn>

                        {/* Basic Plan */}
                        <FadeIn delay={200}>
                            <div className="p-8 rounded-3xl border border-indigo-100 bg-indigo-50 flex flex-col h-full shadow-lg">
                                <div className="mb-6">
                                    <span className="text-indigo-600 font-bold text-sm uppercase mb-2 block tracking-widest">Office Assistant</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">ベーシック</h3>
                                    <div className="text-2xl font-bold text-slate-900">¥11,000<span className="text-sm font-normal text-slate-400">/月</span></div>
                                </div>
                                <ul className="space-y-4 text-sm text-slate-600 flex-grow border-t border-indigo-200 pt-6">
                                    <li className="flex items-start gap-3">
                                        <MessageSquare className="w-5 h-5 text-indigo-600 shrink-0" />
                                        <span>LINEチャットでの技術相談</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                                        <span>月1回の画像/テキスト修正代行</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                                        <span>お知らせ更新代行</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-slate-500 mt-6">※ミニマムプランのすべての内容を含みます</p>
                            </div>
                        </FadeIn>

                        {/* Advance Plan */}
                        <FadeIn delay={300}>
                            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900 flex flex-col h-full text-white shadow-xl">
                                <div className="mb-6">
                                    <span className="text-indigo-400 font-bold text-sm uppercase mb-2 block tracking-widest">Strategic Partner</span>
                                    <h3 className="text-xl font-bold mb-2">アドバンス</h3>
                                    <div className="text-2xl font-bold">¥22,000<span className="text-sm font-normal text-slate-400">/月</span></div>
                                </div>
                                <ul className="space-y-4 text-sm text-slate-400 flex-grow border-t border-slate-700 pt-6">
                                    <li className="flex items-start gap-3">
                                        <BrainCircuit className="w-5 h-5 text-indigo-400 shrink-0" />
                                        <span>AI活用支援（ブログ構成案提供等）</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                                        <span>MEO対策（Map順位監視）</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                                        <span>月1回Zoom定例会（30分）</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                                        <span>アクセス解析レポート送付</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-slate-500 mt-6">※Web担当者の代替として機能します</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Rules Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center underline decoration-indigo-200 decoration-8 underline-offset-4">運用・コミュニケーションルール</h2>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                                    <Settings className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">修正回数の制限</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        ライト/スタンダードプランの制作時修正は「納品前確認の1回のみ」とさせていただきます。
                                        これにより制作コストを極限まで抑え、低価格での提供を実現しています。以降は有償での対応となります。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">素材提供のルール</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        ライトプラン等、低価格プランでの制作においては、指定フォーマット（Excel/Word）ですべての原稿・画像が揃ってから着手いたします。
                                        五月雨式の提出は別途管理工数が発生するため、お控えいただけますようお願いいたします。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                                    <MessageSquare className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">連絡手段の分離</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        プランにより連絡手段が異なります。ミニマムプランはメールのみ、ベーシック以上はLINE/Chatwork等のチャットツールが解禁となります。
                                        迅速なコミュニケーションが必要な場合は、上位プランへの移行をご検討ください。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                                    <BrainCircuit className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">AI活用の組み込み</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        アドバンスプランでは、AI（ChatGPT等）を用いたブログ記事構成案の提案を月に1回行います。
                                        「何を書いていいかわからない」という課題を解消し、サイトの更新頻度を維持することでSEO効果を最大化します。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA */}
            <div className="bg-indigo-600 py-20 text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">低価格で高品質なHPを、貴塾の新たな武器に。</h2>
                    <p className="text-indigo-100 mb-10 text-lg">まずは現在のWeb状況の診断から承ります。お気軽にご相談ください。</p>
                    <div className="flex justify-center">
                        <Link to="/#contact" className="px-10 py-5 bg-white text-indigo-600 rounded-full font-bold shadow-2xl hover:bg-slate-50 transition-all flex items-center gap-2 text-lg">
                            無料で相談・見積もりを依頼する
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
