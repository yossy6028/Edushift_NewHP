
import { CheckCircle2, ArrowRight, Shield, Zap, Settings, MessageSquare, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import MetaTags from '../../components/MetaTags';
import serviceHp from '../../assets/service-hp.png';

// Updated: 2026-04-03 - Campaign ended, prices reverted to normal
export const HpProduction = () => {
    return (
        <div className="bg-white">
            <MetaTags
                title="HP制作・保守運用"
                description="塾に問い合わせが来ない。その原因、HPにあるかもしれません。小規模塾専門のHP制作・保守サービス。月々980円〜、あなたの塾を「選ばれる塾」に変えます。"
                image="/ogp-hp.png"
            />
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">塾のWeb、まるごとサポート。</h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-4 animate-fade-in-up max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
                        塾に問い合わせが来ない。<br className="md:hidden" />その原因、HPにあるかもしれません。
                    </p>
                    <p className="text-base md:text-lg text-slate-300 animate-fade-in-up max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.4s' }}>
                        小規模塾専門のHP制作・保守サービス。月々980円〜、あなたの塾を「選ばれる塾」に変えます。
                    </p>
                </div>
            </div>

            {/* Strategy Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">HPに関するこんな困りごとありませんか？</h2>
                        <div className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed text-left bg-slate-50 rounded-3xl p-8 border border-slate-100">
                            <p className="mb-4">
                                HPを作ったのに、問い合わせがほぼゼロ<br />
                                チラシは配っているのに、ネット経由の問い合わせがない<br />
                                大手塾と比べてHPが見劣りする気がして、URLを教えにくい
                            </p>
                            <p className="text-slate-700 font-medium">
                                1つでも当てはまるなら、EduShiftにご相談ください。<br />
                                低コストで始めて、成果が出たら一緒に育てる。それがEduShiftのスタイルです。
                            </p>
                        </div>
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
                                まず「ある状態」にする。完璧より、スピード。
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                HPがない塾に、毎月どれだけの問い合わせが流れているか、考えたことはありますか？<br /><br />
                                EduShiftの制作プランは「完璧なHP」より「今すぐある状態」を優先します。
                                テンプレートを活用し、デザインの自由度をあえて絞ることで、圧倒的なスピードと低価格を実現。<br /><br />
                                浮いた時間とお金を、授業の質や生徒対応に使ってください。
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
                                HPは、作った後が重要。
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                多くの塾が、HPを作った後に止まります。
                                更新されないサイトは、Googleからも保護者からも「活動していない塾」と判断されます。<br /><br />
                                EduShiftの保守プランは「壊れたら直す」だけじゃありません。
                                ブログ更新・SEO改善・集客レポート——あなたの塾の「Web担当者」として、毎月継続サポートします。
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
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">あなたの塾の状況に合わせて選べる、3つのプラン</h2>
                            <p className="text-slate-600">初期費用を抑えた流し込みプランから、本格的なSEO特化プランまで。</p>

                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Light Plan */}
                        <FadeIn delay={100}>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">ライト</h3>
                                    <p className="text-sm text-slate-500 mb-4">最速1週間で公開。まず"存在する塾"になる</p>
                                    <div className="text-3xl font-bold text-slate-900">¥29,800<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
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
                                    <p className="text-sm text-slate-500 mb-4">問い合わせ導線から地図まで。選ばれる仕組みを整える</p>
                                    <div className="text-3xl font-bold text-slate-900">¥49,800<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
                                </div>
                                <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> TOP + 下層3ページ</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ブログ・お知らせ機能</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Googleマップ連携</li>
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
                                    <p className="text-sm text-slate-500 mb-4">"うちを選ぶ理由"を言語化。地域で頭ひとつ抜け出すHP</p>
                                    <div className="text-3xl font-bold text-slate-900">¥98,000<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
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
                            <p className="text-slate-600">作りっぱなしにしない。成長し続けるHPのために。</p>

                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Minimum Plan */}
                        <FadeIn delay={100}>
                            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 flex flex-col h-full">
                                <div className="mb-6">
                                    <span className="text-indigo-600 font-bold text-sm uppercase mb-2 block tracking-widest">Insurance</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">ライト</h3>
                                    <div className="text-2xl font-bold text-slate-900">¥980<span className="text-sm font-normal text-slate-400">/月</span></div>
                                </div>
                                <ul className="space-y-4 text-sm text-slate-600 flex-grow border-t border-slate-200 pt-6">
                                    <li className="flex items-start gap-3">
                                        <Settings className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>稼働監視（自動）</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Settings className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>SSL期限チェック（自動）</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Settings className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>定期バックアップ作成（自動）</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>月1回のお知らせ更新代行</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-slate-400 mt-6">※個別修正・個別サポート対応は含みません</p>
                            </div>
                        </FadeIn>

                        {/* Basic Plan */}
                        <FadeIn delay={200}>
                            <div className="p-8 rounded-3xl border border-indigo-100 bg-indigo-50 flex flex-col h-full shadow-lg">
                                <div className="mb-6">
                                    <span className="text-indigo-600 font-bold text-sm uppercase mb-2 block tracking-widest">Office Assistant</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">ベーシック</h3>
                                    <div className="text-2xl font-bold text-slate-900">¥2,980<span className="text-sm font-normal text-slate-400">/月</span></div>
                                </div>
                                <ul className="space-y-4 text-sm text-slate-600 flex-grow border-t border-indigo-200 pt-6">
                                    <li className="flex items-start gap-3">
                                        <MessageSquare className="w-5 h-5 text-indigo-600 shrink-0" />
                                        <span>チャットでの更新・技術相談</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                                        <span>月1回の画像/テキスト修正代行</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                                        <span>お知らせ更新代行（週1回まで）</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-slate-500 mt-6">※ライトプランのすべての内容を含みます</p>
                            </div>
                        </FadeIn>

                        {/* Advance Plan */}
                        <FadeIn delay={300}>
                            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900 flex flex-col h-full text-white shadow-xl">
                                <div className="mb-6">
                                    <span className="text-indigo-400 font-bold text-sm uppercase mb-2 block tracking-widest">Strategic Partner</span>
                                    <h3 className="text-xl font-bold mb-2">アドバンス</h3>
                                    <div className="text-2xl font-bold">¥29,800<span className="text-sm font-normal text-slate-400">/月</span></div>
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
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">低価格を実現するための、シンプルなルール</h3>
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
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">制作をスムーズに進めるための準備について</h3>
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
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">プランに応じた、最適なコミュニケーション方法</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        プランにより連絡手段が異なります。ライトプランはメールのみ、ベーシック以上はLINE/Chatwork等のチャットツールが解禁となります。
                                        迅速なコミュニケーションが必要な場合は、上位プランへの移行をご検討ください。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                                    <BrainCircuit className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">AIでブログ更新の悩みをゼロに（アドバンス限定）</h3>
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
                    <h2 className="text-3xl font-bold mb-6">今のHPで競合他塾に勝てますか？</h2>
                    <p className="text-indigo-100 mb-10 text-lg">まず現在のWeb状況を、無料で診断します。しつこい営業は一切しません。お気軽にどうぞ。</p>
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
