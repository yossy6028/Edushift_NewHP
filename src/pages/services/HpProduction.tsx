
import { CheckCircle2, ArrowRight, Shield, Zap, Settings, MessageSquare, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import MetaTags from '../../components/MetaTags';
import serviceHp from '../../assets/service-hp.png';

// Updated: 2026-04-04 - Prices adjusted: Light ¥19,800, Standard ¥39,800 (force rebuild)
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
                    <div
                        className="inline-flex items-center gap-3 mt-8 px-5 py-2.5 rounded-full border border-emerald-300/60 bg-emerald-400/10 backdrop-blur-md animate-fade-in-up"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <span className="px-2.5 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-bold tracking-wider">
                            NEW · AIEO対策
                        </span>
                        <strong className="text-white text-sm md:text-base font-semibold">
                            AIに読まれるHPを作ります。
                        </strong>
                    </div>
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


            {/* AIEO Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 border-y border-emerald-100">
                <div className="max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold tracking-wider mb-4">
                                NEW · AIEO対策（AI Engine Optimization）
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                AIに読まれるHPを、作ります。
                            </h2>
                            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
                                保護者が塾を探す方法は、Google検索からChatGPT・Perplexity・Google Geminiへの「相談」へと急速に移っています。<br />
                                EduShiftの全プランは、こうした生成AIに正しく読み取られ、正しく引用されるための構造を標準実装します。
                            </p>
                        </div>

                        {/* なぜ今AIEOが必要なのか */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-100 shadow-sm mb-10">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                                なぜ今、AIEO対策が必要なのか
                            </h3>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                これまで塾選びの起点は、Googleで「地域名＋塾」と検索することでした。表示された10件の中から保護者が比較検討するという、いわゆるSEO（検索エンジン最適化）の時代です。
                                ところが2024年以降、保護者の行動は大きく変わりました。「うちの子に合う、飯能の中学受験塾を教えて」とAIに直接相談し、AIが提示した数件の塾だけを比較する。検索結果ページを開かずに、AIの回答だけで意思決定が進むケースが増えています。
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                このとき、AIが「どの塾を答えに含めるか」を決めているのは、HPの中身です。AIは塾のHPをクロールし、構造化されたデータと自然文のテキストを読み取り、回答候補に含めるかどうかを判断します。
                                ここで問題なのは、<strong className="text-emerald-700">SEOで上位を取れているHPが、必ずしもAIに引用されるとは限らない</strong>という点です。両者は別の評価軸で動いており、AIには別の最適化が必要になります。これがAIEO（AI Engine Optimization）です。
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                EduShiftは、SEOとAIEOを両立させる構造をすべての制作プランに組み込みます。Googleの検索結果でも、ChatGPTの回答でも、保護者の選択肢として正しく挙げてもらえる状態を、最初から作ります。
                            </p>
                        </div>

                        <h3 className="text-center text-xl md:text-2xl font-bold text-slate-900 mb-8">
                            EduShiftが標準実装する3つのAIEO対策
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
                            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col">
                                <div className="text-emerald-600 font-bold text-sm mb-2">01</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">構造化データ（JSON-LD）の完全実装</h4>
                                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                    塾の所在地・対象学年・指導科目・営業時間・代表者名・実績などを、検索エンジンとAIが機械的に理解できる形式（JSON-LD）でHPに埋め込みます。
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    具体的には <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">LocalBusiness</code>／<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">EducationalOrganization</code> スキーマを使い、塾の基本情報を一意のデータとして提示。AIが「飯能市の小中高生向け塾」と質問されたときに、塾を候補として正しく列挙できる土台になります。
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col">
                                <div className="text-emerald-600 font-bold text-sm mb-2">02</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">llms.txt の設置と運用</h4>
                                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                    AIクローラー専用の案内書として、サイトのルートに <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">/llms.txt</code> を配置します。これは、AIに対して「このサイトの何を優先的に読み、どう要約してほしいか」を明示するファイルです。
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    塾の強み（少人数指導／合格実績／指導料金）、対象地域、料金体系、問い合わせ動線を簡潔にまとめ、AIが誤解せずに塾を紹介できるようにします。HPの本文を増やしすぎると逆に焦点がぼやけるため、AI向けの要約として独立して用意することが効きます。
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col">
                                <div className="text-emerald-600 font-bold text-sm mb-2">03</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">AI引用に最適化された自然文コピー</h4>
                                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                    AIが回答に引用しやすい文章には、共通の特徴があります。固有名詞（塾名・地域名・対象学年）が文中に明示されていること、合格実績や指導方針が完結した一文で表現されていること、抽象論ではなく具体的な数値で語られていること。
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    EduShiftはコピーライティングの段階で「AIが切り取って引用したくなる一文」を意識的に組み込みます。たとえば「飯能市の中高生がGMARCH以上を目指す通い放題の学習塾です」のように、地域・対象・目標・特徴が一文で完結する書き方を全ページに散りばめます。
                                </p>
                            </div>
                        </div>

                        {/* 実装後の効果 */}
                        <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white">
                            <h3 className="text-xl md:text-2xl font-bold mb-4">
                                AIEO対策で変わる、塾の見つけられ方
                            </h3>
                            <p className="leading-relaxed mb-4 text-emerald-50">
                                3つの対策を実装すると、ChatGPTやPerplexityで保護者が「○○市の中学受験塾でおすすめは？」と質問したときに、塾名が回答候補として挙がる確率が大きく変わります。
                                AIに引用される塾は、検索結果の最上位に表示されるのと同じか、それ以上のインパクトを持ちます。なぜならAIの回答は数件しか提示されないからです。
                            </p>
                            <p className="leading-relaxed text-emerald-50">
                                EduShiftはライト（¥19,800）プランから、これら3つのAIEO対策をすべて標準で含めます。プレミアムプランへの追加料金ではなく、塾HP制作の「あたりまえの仕様」として全プランに含める方針です。<br />
                                AI時代に取り残されないHPを、初期費用を抑えながら今日から始めていただけます。
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
                            <p className="text-slate-600">初期費用を抑えた流し込みプランから、SEO・MEO対応のプレミアムプランまで。</p>

                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Light Plan */}
                        <FadeIn delay={100}>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">ライト</h3>
                                    <p className="text-sm text-slate-500 mb-4">最速1週間で公開。まず"存在する塾"になる</p>
                                    <div className="text-3xl font-bold text-slate-900">¥19,800<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
                                </div>
                                <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> LP（1枚構成）</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 厳選テンプレート使用</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> スマートフォン対応</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 問合せフォーム設置</li>
                                    <li className="flex items-center gap-2 font-semibold border-t pt-2">※原稿・画像は完全支給</li>
                                    <li className="flex items-center gap-2">※修正は納品前まで3回まで対応</li>
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
                                    <div className="text-3xl font-bold text-slate-900">¥39,800<span className="text-sm font-normal text-slate-400"> (税抜)</span></div>
                                </div>
                                <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> TOP + 下層3ページ</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ブログ・お知らせ機能</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Googleマップ連携</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 過去サイトからの移行相談</li>
                                    <li className="flex items-center gap-2 font-semibold border-t pt-2">※基本レイアウトへの流し込み</li>
                                    <li className="flex items-center gap-2">※修正は納品前まで3回まで対応</li>
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
                                        <Settings className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>データ保管・ストレージ管理</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>月1回の更新代行（修正3回まで）</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-slate-400 mt-6">※修正4回目以降は別途有償対応となります</p>
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
                                        <span>月4回の更新代行（各更新につき修正3回まで）</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                                        <span>お知らせ・画像・テキスト修正含む</span>
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
