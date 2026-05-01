
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
                        {/* Header */}
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

                        {/* AIEOとは */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-200 shadow-sm mb-10">
                            <div className="flex items-start gap-4 mb-5">
                                <div className="bg-emerald-100 text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-full shrink-0">DEFINITION</div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                                    AIEOとは何か——「答えに選ばれるための最適化」
                                </h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                AIEO（AI Engine Optimization）とは、ChatGPT・Perplexity・Google Gemini・Microsoft Copilot といった生成AIが質問に答える際に、自塾のHPを情報源として参照・引用してもらえるようにHPの構造とコンテンツを最適化する取り組みです。
                                日本語では「生成AI最適化」「AI検索最適化」とも呼ばれ、欧米では「GEO（Generative Engine Optimization）」という呼び方も並行して使われています。
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                従来のSEO（Search Engine Optimization）が「検索結果ページの上位10件に入る」ことを目指していたのに対し、AIEOが目指すのは「AIが生成する数行の回答の中に塾名と特徴が含まれる」ことです。
                                ユーザーは検索結果を1件ずつ開いて比較するのではなく、AIが要約した1つの回答を読んで判断します。つまり<strong className="text-emerald-700">「上位10件に入る」ではなく「3件の回答候補に入る」</strong>を狙う、より厳しい競争に変わったのです。
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                AIEOで重要になるのは、HPの「読まれやすさ」ではなく「引用されやすさ」。AIに「この一文を切り取れば、塾の特徴が完結する」と思わせる構造化と、固有名詞・数値・地名を明確に含む自然文の両立が鍵になります。
                            </p>
                        </div>

                        {/* なぜ今AIEOが必要なのか */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-100 shadow-sm mb-10">
                            <div className="flex items-start gap-4 mb-5">
                                <div className="bg-indigo-100 text-indigo-700 font-bold text-xs px-3 py-1.5 rounded-full shrink-0">BACKGROUND</div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                                    なぜ今、AIEO対策が必要なのか
                                </h3>
                            </div>

                            <h4 className="text-base font-bold text-slate-900 mt-2 mb-3">① 保護者の塾選びの起点が「検索」から「AIへの相談」に変わった</h4>
                            <p className="text-slate-700 leading-relaxed mb-5">
                                これまで塾選びの起点は、Googleで「地域名＋塾」と検索することでした。表示された10件の中から保護者がHPを開き、料金・実績・授業内容を比較するという、いわゆるSEOの時代です。
                                ところが2024年から2025年にかけて、保護者の行動は大きく変わりました。世界の生成AI週間アクティブユーザーは ChatGPT 単独で5億人を超え、日本でも保護者世代の利用率が急上昇しています。
                                「うちの子は中堅校志望、共働きで送り迎えが厳しい、月3万円以内で。飯能で合う塾を3つ教えて」——こうした<strong className="text-emerald-700">条件を文章でAIに相談し、AIが提示した数件だけを比較する</strong>パターンが、いまや塾検討の主流になりつつあります。
                            </p>

                            <h4 className="text-base font-bold text-slate-900 mb-3">② SEOで勝てているHPが、AIに引用されるとは限らない</h4>
                            <p className="text-slate-700 leading-relaxed mb-5">
                                AIが「どの塾を答えに含めるか」を決めているのは、HPの中身です。AIはクローラーで塾のHPを読み取り、構造化されたデータと自然文を解釈し、回答候補に入れるかどうかを判断します。
                                ところが、<strong className="text-emerald-700">SEOで上位を取れているHPが、必ずしもAIに引用されるとは限りません</strong>。Googleの検索アルゴリズムは「リンクの多さ」「ページ滞在時間」など人間の挙動を見ますが、AIは「データが構造化されているか」「事実が一文で完結しているか」「他媒体での言及と整合しているか」を見ます。
                                評価軸が違うため、SEOとAIEOは別々の最適化が必要です。とくに小規模塾は被リンク数で大手に勝てないため、SEOよりAIEOで先行する方が、コストパフォーマンスが高い戦略になります。
                            </p>

                            <h4 className="text-base font-bold text-slate-900 mb-3">③ AIに引用されないHPは「存在しないHP」になる</h4>
                            <p className="text-slate-700 leading-relaxed">
                                AIの回答に塾が出てこなければ、そもそも保護者の検討候補に入りません。SEOの場合は2ページ目・3ページ目に表示されていても「目立たない」だけで存在は認識されますが、AIの回答は数件で打ち切られるため、入らないHPは事実上「存在しないHP」と同じ扱いになります。
                                この変化は、HP制作の世界における産業革命級の転換です。AIEO対策をしないHPは、2025年以降、急速に問い合わせを失っていく可能性が高いと考えています。
                            </p>
                        </div>

                        {/* SEO vs AIEO 比較表 */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm mb-10">
                            <div className="flex items-start gap-4 mb-5">
                                <div className="bg-slate-100 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-full shrink-0">COMPARISON</div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                                    SEO と AIEO の違い
                                </h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                両者は対立するものではなく、補完関係にあります。EduShiftはSEOとAIEOを両立させる設計を、すべての制作プランで標準にしています。
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50">
                                            <th className="border border-slate-200 px-4 py-3 text-left font-bold text-slate-900">観点</th>
                                            <th className="border border-slate-200 px-4 py-3 text-left font-bold text-slate-900">SEO（従来型）</th>
                                            <th className="border border-slate-200 px-4 py-3 text-left font-bold text-emerald-700">AIEO（生成AI時代）</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-700">
                                        <tr>
                                            <td className="border border-slate-200 px-4 py-3 font-semibold">目的</td>
                                            <td className="border border-slate-200 px-4 py-3">検索結果の上位10件に入る</td>
                                            <td className="border border-slate-200 px-4 py-3">AIの回答3件以内に名前を出す</td>
                                        </tr>
                                        <tr className="bg-slate-50/50">
                                            <td className="border border-slate-200 px-4 py-3 font-semibold">評価軸</td>
                                            <td className="border border-slate-200 px-4 py-3">被リンク数・滞在時間・キーワード</td>
                                            <td className="border border-slate-200 px-4 py-3">構造化データ・事実の一文完結性</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-slate-200 px-4 py-3 font-semibold">勝負の場</td>
                                            <td className="border border-slate-200 px-4 py-3">検索結果ページ</td>
                                            <td className="border border-slate-200 px-4 py-3">AIが生成する数行の回答</td>
                                        </tr>
                                        <tr className="bg-slate-50/50">
                                            <td className="border border-slate-200 px-4 py-3 font-semibold">小規模塾の不利</td>
                                            <td className="border border-slate-200 px-4 py-3">被リンクで大手に劣る</td>
                                            <td className="border border-slate-200 px-4 py-3">構造化次第で逆転可能</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-slate-200 px-4 py-3 font-semibold">改善の見通し</td>
                                            <td className="border border-slate-200 px-4 py-3">3〜6か月かかる</td>
                                            <td className="border border-slate-200 px-4 py-3">数週間〜2か月で兆候が見える</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* EduShiftが実装する5つの対策 */}
                        <h3 className="text-center text-xl md:text-2xl font-bold text-slate-900 mb-2">
                            EduShiftが標準実装する5つのAIEO対策
                        </h3>
                        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">
                            すべてライトプラン（¥19,800）から標準で含まれます。追加料金は発生しません。
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 text-left mb-10">
                            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col">
                                <div className="text-emerald-600 font-bold text-sm mb-2">01</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">構造化データ（JSON-LD）の完全実装</h4>
                                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                    塾の所在地・対象学年・指導科目・営業時間・代表者名・合格実績などを、検索エンジンとAIが機械的に理解できる形式（JSON-LD）でHPに埋め込みます。
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    具体的には <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">LocalBusiness</code>／<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">EducationalOrganization</code>／<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">FAQPage</code> スキーマを使い、塾の基本情報を一意のデータとして提示。AIが「飯能市の小中高生向け塾」と質問されたときに、塾を候補として正しく列挙できる土台になります。
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
                            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col">
                                <div className="text-emerald-600 font-bold text-sm mb-2">04</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">FAQ・Q&A形式コンテンツの設置</h4>
                                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                    AIは「保護者が聞きそうな質問」と「その答え」が明示的にペアで書かれているページを高く評価します。料金・授業時間・体験申込の流れ・退塾ルールなど、よく聞かれる質問を10〜15個、自然文の問答形式でページに配置します。
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    さらに <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">FAQPage</code> スキーマで構造化することで、AIだけでなくGoogleの検索結果にも質問形式のリッチリザルトとして表示されやすくなります。SEOとAIEOの両方に効く、費用対効果の高い施策です。
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col md:col-span-2">
                                <div className="text-emerald-600 font-bold text-sm mb-2">05</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">一次情報の数値化と外部整合性の確保</h4>
                                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                    AIは「他のサイトでも同じ情報が載っているか」をチェックして信頼度を判定します。塾名・住所・電話番号・営業時間・代表者名がHP・Googleビジネスプロフィール・Mapsの口コミ・各種塾検索ポータルで一致しているかを点検し、ブレを解消します。これを<strong className="text-slate-900">「NAP一貫性」</strong>と呼び、AIEOとローカルSEOの両方の根幹になります。
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    加えて、合格実績・指導年数・在籍生徒数・講師の経歴などを「中堅校◯名合格」「指導歴12年」のように具体的な数値で記載します。AIは数値を含む一文を「引用に値する一次情報」として優先するため、感覚的な表現（「多くの生徒が合格」）よりも、明確な数字を載せた方が回答に採用される確率が大きく上がります。
                                </p>
                            </div>
                        </div>

                        {/* 期待される効果 */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 border border-indigo-100 shadow-sm mb-10">
                            <div className="flex items-start gap-4 mb-5">
                                <div className="bg-indigo-100 text-indigo-700 font-bold text-xs px-3 py-1.5 rounded-full shrink-0">EFFECT</div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                                    どのような効果が見込めるか
                                </h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                AIEO対策の効果は、実装直後・数か月後・半年〜1年後の3段階で現れます。
                            </p>

                            <div className="space-y-5">
                                <div className="border-l-4 border-emerald-500 pl-5 py-1">
                                    <h4 className="text-base font-bold text-slate-900 mb-2">短期（公開〜1か月）：AIに「認識」される塾になる</h4>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        構造化データとllms.txtの設置により、ChatGPTやPerplexityのクローラーが塾の存在を正しく認識します。AIに「○○市の塾を教えて」と聞いた際に、塾名が回答に含まれる確率が、実装前のほぼ0%から30〜50%程度まで上昇する事例が出始めます。
                                    </p>
                                </div>
                                <div className="border-l-4 border-indigo-500 pl-5 py-1">
                                    <h4 className="text-base font-bold text-slate-900 mb-2">中期（1〜3か月）：AI経由の問い合わせが目に見えて増える</h4>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        FAQと自然文コピーが整い、AIが「料金は？」「対象学年は？」と聞かれたときに塾の情報を正しく引用できるようになります。問い合わせフォームに「ChatGPTで知りました」「Perplexityで紹介されていて」というコメントが届き始めるのが、このフェーズの特徴です。AI経由の流入は、純粋に新規層の追加流入になります。
                                    </p>
                                </div>
                                <div className="border-l-4 border-slate-700 pl-5 py-1">
                                    <h4 className="text-base font-bold text-slate-900 mb-2">長期（3か月〜1年）：地域での「指名相談」が増える</h4>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        NAP一貫性と一次情報の数値化により、AIが塾を「信頼できる一次情報源」として記憶します。保護者が「飯能の中学受験塾といえば？」とAIに聞いたときに、地域内で先頭に名前が挙がる状態を作れます。これは大手塾相手でも逆転可能で、被リンクで勝てない小規模塾にとってAIEOが現実的な勝ち筋になる理由です。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 締め */}
                        <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white">
                            <h3 className="text-xl md:text-2xl font-bold mb-4">
                                EduShiftの方針：AIEO対策は、ライトプランから「あたりまえの仕様」
                            </h3>
                            <p className="leading-relaxed mb-4 text-emerald-50">
                                上記5つのAIEO対策は、ライトプラン（¥19,800）から全プランで標準実装します。プレミアムプランへの追加料金や、保守プランのオプションではありません。
                                AI時代に塾HPを作るうえで、これらは「あたりまえの仕様」だと考えているからです。
                            </p>
                            <p className="leading-relaxed text-emerald-50">
                                EduShiftの強みは、塾という業種に特化していること。塾の保護者が何を不安に思い、どんな質問をAIにするかを把握しているため、構造化データの粒度・FAQの質問設計・自然文コピーの言い回しを、塾向けに最適化できます。
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
