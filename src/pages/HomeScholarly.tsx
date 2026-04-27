import { useEffect } from 'react';
import logoImg from '../assets/logo-scholarly-mark.svg';
import founderImg from '../assets/founder.webp';
import '../styles/scholarly.css';

type NoteContent = {
    key: string;
    name: string;
    description?: string;
    eyecatch?: string;
    publishAt?: string;
};

const CATEGORIES = [
    { label: 'Featured · AI対話', cat: 'AI活用', catClass: 'teal' },
    { label: '塾経営',            cat: '塾経営',   catClass: '' },
    { label: 'AI · Practice',     cat: 'AI活用',   catClass: 'teal' },
    { label: 'Workflow',          cat: '働き方',   catClass: 'blue' },
    { label: 'Case Study',        cat: '事例',     catClass: 'gold' },
];

const fmtDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
};

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const HomeScholarly = () => {
    useEffect(() => {
        const grid = document.getElementById('journal-grid');
        if (!grid) return;

        fetch('/note-articles.json', { cache: 'no-cache' })
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('fetch failed: ' + r.status))))
            .then((data) => {
                const items: NoteContent[] = data?.data?.contents ?? [];
                if (!items.length) return;
                const top = items.slice(0, 5);
                grid.innerHTML = top
                    .map((item, idx) => {
                        const cls = CATEGORIES[idx] ?? CATEGORIES[CATEGORIES.length - 1];
                        const num = String(idx + 1).padStart(2, '0');
                        const isFeat = idx === 0;
                        const link = `https://note.com/katsu_yossy/n/${escapeHtml(item.key)}`;
                        const title = escapeHtml(item.name);
                        const thumb = escapeHtml(item.eyecatch ?? '');
                        const date = fmtDate(item.publishAt);
                        const extra = isFeat ? '<span>· note</span>' : '';
                        const lead =
                            isFeat && item.description
                                ? `<p>${escapeHtml(item.description).slice(0, 140)}</p>`
                                : '';
                        return `
            <a href="${link}" target="_blank" rel="noopener" class="s-journal-card${isFeat ? ' feat' : ''}">
                <div class="s-journal-thumb photo" style="background-image: url('${thumb}');">
                    <span class="s-journal-thumb-label">${escapeHtml(cls.label)}</span>
                    <span class="s-journal-thumb-num">${num}</span>
                </div>
                <div class="s-journal-meta">
                    <span class="cat${cls.catClass ? ' ' + cls.catClass : ''}">${escapeHtml(cls.cat)}</span>
                    <span>${date}</span>
                    ${extra}
                </div>
                <h3>${title}</h3>
                ${lead}
            </a>`;
                    })
                    .join('\n');
                grid.setAttribute('data-source', '/note-articles.json');
            })
            .catch(() => {
                // Silent fallback — static cards remain.
            });
    }, []);

    return (
        <div className="theme-scholarly">

    {/* ====== HEADER ====== */}
    <header className="s-header">
        <div className="s-container s-header-inner">
            <a href="#" className="s-brand">
                <img src={logoImg} alt="EduShift" />
                <span className="s-brand-name">Edu<em>Shift</em></span>
                <span className="s-brand-sep"></span>
                <span className="s-brand-tag">学びの伴走者</span>
            </a>
            <nav className="s-nav">
                <a href="#empathy">塾経営の今</a>
                <a href="#services">サービス</a>
                <a href="#founder">代表</a>
                <a href="#journal">ブログ</a>
                <a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-nav-ext" aria-label="noteを別タブで開く">note<span className="s-nav-ext-arrow" aria-hidden="true">↗</span></a>
                <a href="#faq">FAQ</a>
                <a href="#company">会社概要</a>
                <a href="#contact" className="s-cta-small">ご相談</a>
            </nav>
        </div>
    </header>

    {/* ====== HERO ====== */}
    <section className="s-hero">
        <div className="s-hero-paper"></div>
        <div className="s-hero-grid"></div>
        <div className="s-container s-hero-inner">
            <div>
                <div className="s-eyebrow">
                    <span className="s-eyebrow-brand">Edu<em>Shift</em></span>
                    <span className="s-eyebrow-rule"></span>
                    <span>小さな塾と、独立する先生の伴走者 — since 2024</span>
                </div>
                <h1>
                    <span className="s-accent-line">小さな塾</span>と、<br />
                    <span className="s-accent-line">独立する先生</span>を、<br />
                    AIとWebで支える。
                    <small>EduShift — A long-form partner for small schools and independent tutors, powered by AI &amp; Web.</small>
                </h1>
                <p className="s-hero-body">
                    経営、集客、事務、保護者対応、教材づくり——。<br />
                    本当は、生徒と向き合う時間がいちばん長いはずでした。<br />
                    EduShiftは、教える人の"周辺"をテクノロジーで軽くして、<br />
                    小さな塾と、独立する先生を、ひとりで抱えない時代へ導きます。
                </p>
                <div className="s-hero-cta">
                    <a href="#contact" className="s-btn-primary">
                        まずは、30分だけお話ししませんか
                        <span className="arrow">→</span>
                    </a>
                    <a href="#services" className="s-btn-ghost">サービスを見る</a>
                </div>
            </div>

            <div className="s-hero-diagram">
                <div className="s-hero-diagram-label">We focus on</div>
                <div className="s-hero-diagram-pillars">
                    <div className="s-pillar-chip">
                        <span className="num">Pillar · 01</span>
                        <span className="label">小規模塾</span>
                        <span className="sub">School Management</span>
                    </div>
                    <div className="s-pillar-chip">
                        <span className="num">Pillar · 02</span>
                        <span className="label">独立する先生</span>
                        <span className="sub">Freelance Tutor</span>
                    </div>
                </div>
                <div className="s-hero-diagram-connector">Implement with</div>
                <div className="s-hero-diagram-tools">
                    <div className="s-tool-chip">
                        <span className="tag">Tool · 01</span>
                        <span className="name">AI</span>
                        <span className="jp">業務自動化・教材生成</span>
                    </div>
                    <div className="s-tool-chip">
                        <span className="tag">Tool · 02</span>
                        <span className="name">Web</span>
                        <span className="jp">HP・ブログ・集客</span>
                    </div>
                </div>
                <p className="s-hero-diagram-out">
                    = <strong>選ばれる塾</strong>・<strong>選ばれる先生</strong>を、今日から。
                </p>
            </div>
        </div>
    </section>

    {/* ====== EMPATHY ====== */}
    <section className="s-empathy" id="empathy">
        <div className="s-container">
            <div className="s-empathy-quote">
                <h3>
                    「良い授業をしているのに、<br />
                    生徒が来ない。」<br />
                    ——この違和感は、<br />
                    あなたのせいじゃありません。
                </h3>
                <p>— 首都圏で1人塾を営む、ある先生の言葉から</p>
            </div>

            <div className="s-pain-list">
                <div className="s-pain-card" data-num="No. 01">
                    <h4>チラシも、口コミも、効かなくなってきた。</h4>
                    <p>保護者は「検索」で塾を選ぶ時代。HPがない、古い、更新されていない——たったそれだけで、候補から外されています。</p>
                </div>
                <div className="s-pain-card" data-num="No. 02">
                    <h4>事務作業が、教育の時間を削っている。</h4>
                    <p>月謝管理、保護者対応、シフト、報告書。本当に時間を使うべき"生徒一人"との対話が、後回しになっていませんか。</p>
                </div>
                <div className="s-pain-card" data-num="No. 03">
                    <h4>相談できる人が、どこにもいない。</h4>
                    <p>大手コンサルは高額で、同業者はライバル。経営の悩みを誰にも話せないまま、ひとりで抱え続けている先生は少なくありません。</p>
                </div>
            </div>
        </div>
    </section>

    {/* ====== SERVICES ====== */}
    <section className="s-services" id="services">
        <div className="s-container">
            <div className="s-sec-head">
                <div className="s-sec-num">CHAPTER I · 2 Pillars × 2 Tools</div>
                <div className="s-sec-titles">
                    <h2><em>小規模塾</em>と、<em>独立する先生</em>を、<br />テクノロジーで実践する。</h2>
                    <p className="s-sec-lede">
                        <strong>EduShift</strong> が本気で向き合う対象は、この2つ。「小規模塾の経営」と「一人で独立する先生の成長」——その両方を、AIとWebの力で実現します。
                    </p>
                </div>
            </div>

            <div className="s-service-grid has-pillars">
                <div className="s-service-card pillar">
                    <div className="s-service-num">Pillar · 01</div>
                    <h3>小規模塾経営サポート</h3>
                    <div className="s-service-en">School Management</div>
                    <p>生徒10〜50名規模の塾に特化。収益構造、集客、ブランディング——"先生一人の塾"が持続できる仕組みを、AIと実データを味方につけて一緒に整えます。</p>
                    <div className="s-service-tags">
                        <span className="s-service-tag">収益改善</span>
                        <span className="s-service-tag">地域集客</span>
                        <span className="s-service-tag">ブランディング</span>
                        <span className="s-service-tag tech">AIデータ分析</span>
                    </div>
                    <a href="/v2/service/school-support" className="s-service-link">詳しく読む →</a>
                </div>

                <div className="s-service-card pillar">
                    <div className="s-service-num">Pillar · 02</div>
                    <h3>フリーランス独立支援</h3>
                    <div className="s-service-en">Independent Tutor Support</div>
                    <p>「教えるのは好き、経営は苦手」——その気持ちに寄り添う3ヶ月の伴走プログラム。事業計画から初案件獲得まで、AI活用と自前HPで"選ばれる先生"になる道を、一緒に歩きます。</p>
                    <div className="s-service-tags">
                        <span className="s-service-tag">事業計画</span>
                        <span className="s-service-tag">ポートフォリオ</span>
                        <span className="s-service-tag">案件獲得</span>
                        <span className="s-service-tag tech">AI活用 × Web発信</span>
                    </div>
                    <a href="/v2/service/freelance-support" className="s-service-link">詳しく読む →</a>
                </div>

                <div className="s-service-bridge">
                    <span className="s-bridge-rule">— and the tools that make it real —</span>
                    <h4>ふたつの柱を、<em>AI</em> と <em>Web</em> の力で、今日から実装する。</h4>
                </div>

                <div className="s-service-card tool">
                    <div className="s-service-num">Tool · 01</div>
                    <h3>AI導入コンサルティング</h3>
                    <div className="s-service-en">AI Integration</div>
                    <p>AIは"人の温かみ"を奪うものではなく、取り戻すもの。週5〜10時間の事務を削って、先生が教育に集中できる環境をつくります。</p>
                    <div className="s-service-tags">
                        <span className="s-service-tag">業務自動化</span>
                        <span className="s-service-tag">AI教材</span>
                        <span className="s-service-tag">スタッフ研修</span>
                    </div>
                    <a href="/v2/service/ai-consulting" className="s-service-link">詳しく読む →</a>
                </div>

                <div className="s-service-card tool">
                    <div className="s-service-num">Tool · 02</div>
                    <h3>HP制作・保守運用</h3>
                    <div className="s-service-en">Web Production &amp; Care</div>
                    <p>初期19,800円〜、月々980円〜。「立派なHP」より「今日から選ばれるHP」を。ブログ更新もSEOも、Web担当者のように支えます。</p>
                    <div className="s-service-tags">
                        <span className="s-service-tag">低価格HP</span>
                        <span className="s-service-tag">AIブログ</span>
                        <span className="s-service-tag">保守運用</span>
                    </div>
                    <a href="/v2/service/hp-production" className="s-service-link">詳しく読む →</a>
                </div>
            </div>
        </div>
    </section>

    {/* ====== FOUNDER ====== */}
    <section className="s-manifesto s-founder" id="founder">
        <div className="s-container s-founder-inner">
            <div className="s-founder-photo">
                <img src={founderImg} alt="吉井 勝彦" />
                <div className="s-founder-photo-caption">
                    <span>Katsuhiko Yoshii</span>
                    <em>Founder &amp; CEO</em>
                </div>
            </div>
            <div>
                <div className="s-manifesto-label">
                    <div>❦</div>
                    Our Belief — 01
                </div>
                <h2>
                    私たちは、<span>"先生の味方"</span>でありたい。<br />
                    AIは、教壇に立つ人の<br />道具であり続けなければならない。
                </h2>
                <p>
                    EduShiftが生まれたのは、教育の現場で働く一人の人間として、こう思ったからです——「生徒と向き合う時間を、もっと先生に返したい」。
                </p>
                <p>
                    テクノロジーは、教育を冷たくするためのものではありません。むしろ、事務や雑務という"重力"から先生を解放し、人間にしかできない"温かい対話"のための時間を増やすための道具です。
                </p>
                <p>
                    私たちは、最新のAIと、泥臭い現場の知恵を融合させながら、教育に関わるすべての人の、最も近い相談相手でありたいと願っています。
                </p>
                <div className="s-founder-meta">
                    <div>
                        <span className="s-founder-meta-label">代表</span>
                        <span className="s-founder-meta-value">吉井 勝彦 <small>Katsuhiko Yoshii</small></span>
                    </div>
                    <div>
                        <span className="s-founder-meta-label">肩書</span>
                        <span className="s-founder-meta-value">EduShift 代表／教育コンサルタント</span>
                    </div>
                    <div>
                        <span className="s-founder-meta-label">経歴</span>
                        <span className="s-founder-meta-value">長年教育業界に身を置き、生徒の成長に立ち会いながら、経営や雑務のジレンマと向き合ってきた。最新のAIと現場の知恵を融合し、小さな塾と独立系教育者の最も近い相談相手であり続けることを志す。</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* ====== VOICE / TESTIMONIAL ====== */}
    <section className="s-voice" id="voice">
        <div className="s-container">
            <div className="s-sec-head">
                <div className="s-sec-num">CHAPTER II · 3つの約束</div>
                <div className="s-sec-titles">
                    <h2>小さな塾に、<em>はじめから</em>寄り添うために。</h2>
                    <p className="s-sec-lede">ご契約前にお読みいただきたい、EduShiftの運用ルールです。見えにくい部分ほど、先にはっきりさせておきたいと思っています。</p>
                </div>
            </div>

            <div className="s-voice-grid">
                <div className="s-voice-card">
                    <div className="s-voice-quote-mark">I</div>
                    <blockquote>
                        <strong>縛らない。</strong><br />
                        <br />
                        期間コンサルは月単位で継続・解約が可能。<br />
                        顧問契約は個別の契約書に基づき、中途の取り扱いもその場で明文化します。
                    </blockquote>
                    <footer>
                        <div className="s-voice-avatar">①</div>
                        <div className="s-voice-name">
                            <strong>契約期間の縛りなし</strong>
                            <span>いつでも解約可能／料金プラン準拠</span>
                        </div>
                    </footer>
                </div>

                <div className="s-voice-card">
                    <div className="s-voice-quote-mark">II</div>
                    <blockquote>
                        <strong>まず、話す。</strong><br />
                        <br />
                        ご契約前に無料相談（オンラインZoom）。<br />
                        単発スポット相談は¥9,800〜。"売り込み"は、ひとつもいたしません。
                    </blockquote>
                    <footer>
                        <div className="s-voice-avatar">②</div>
                        <div className="s-voice-name">
                            <strong>無料相談＋スポット診断</strong>
                            <span>Zoom基本／現地対応は首都圏</span>
                        </div>
                    </footer>
                </div>

                <div className="s-voice-card">
                    <div className="s-voice-quote-mark">III</div>
                    <blockquote>
                        <strong>代表が、直接。</strong><br />
                        <br />
                        現場を知る代表・吉井がご相談から実行支援まで対応。<br />
                        途中で担当が変わることはありません。
                    </blockquote>
                    <footer>
                        <div className="s-voice-avatar">③</div>
                        <div className="s-voice-name">
                            <strong>代表が、はじめから最後まで</strong>
                            <span>少人数体制／顔の見える距離で</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </section>

    {/* ====== PRICING ====== */}
    <section className="s-pricing" id="pricing">
        <div className="s-container">
            <div className="s-sec-head">
                <div className="s-sec-num">CHAPTER III · 料金</div>
                <div className="s-sec-titles">
                    <h2>"ちょうどいい"を、<em>一緒に見つける。</em></h2>
                    <p className="s-sec-lede">
                        いきなり大きな契約はしません。まずは単発の相談から、あなたの塾の状況に合ったプランを、一緒に選んでいきましょう。契約期間の縛りはありません。
                    </p>
                </div>
            </div>

            <div className="s-price-grid">
                <div className="s-price-card">
                    <div className="s-price-label">Plan · 01</div>
                    <h3>単発スポット</h3>
                    <p className="s-price-blurb">まずは一度、現状を見てもらいたい方へ</p>
                    <div className="s-price-amount">
                        <span className="amount">¥9,800</span>
                        <span className="unit">〜 / 回</span>
                    </div>
                    <ul className="s-price-features">
                        <li>オンライン or 現地（首都圏）</li>
                        <li>現状のヒアリング・診断</li>
                        <li>改善案をその場で提示</li>
                        <li>無理な追加提案なし</li>
                    </ul>
                    <button className="s-price-cta">相談してみる</button>
                </div>

                <div className="s-price-card featured">
                    <div className="s-price-label">Plan · 02  —  Recommended</div>
                    <h3>期間コンサル</h3>
                    <p className="s-price-blurb">伴走者として、本気で向き合うなら</p>
                    <div className="s-price-amount">
                        <span className="amount">¥29,800</span>
                        <span className="unit">〜 / 月</span>
                    </div>
                    <ul className="s-price-features">
                        <li>チャット相談し放題</li>
                        <li>月3回の定例ミーティング</li>
                        <li>施策の実行・検証サポート</li>
                        <li>月単位で継続 / 解約可</li>
                    </ul>
                    <button className="s-price-cta">詳しく話を聞く</button>
                </div>

                <div className="s-price-card">
                    <div className="s-price-label">Plan · 03</div>
                    <h3>顧問・年間契約</h3>
                    <p className="s-price-blurb">長期的な経営パートナーとして</p>
                    <div className="s-price-amount">
                        <span className="amount">要相談</span>
                    </div>
                    <ul className="s-price-features">
                        <li>事業規模に応じたフルオーダー</li>
                        <li>経営戦略の立案・遂行</li>
                        <li>新規事業開発サポート</li>
                        <li>優先的なリソース確保</li>
                    </ul>
                    <button className="s-price-cta">お問い合わせ</button>
                </div>
            </div>

            {/* ====== Sub-pricing : HP保守・運用 ====== */}
            <div className="s-sub-pricing">
                <div className="s-sub-pricing-head">
                    <div className="s-sub-num">HP Maintenance · Add-on</div>
                    <h3>HP制作後の、<em>保守・運用プラン</em></h3>
                    <p>
                        作りっぱなしにしない。成長し続けるHPのために、月額¥980〜の保守プランをご用意しています。稼働監視から、AI活用・MEO対策まで。
                    </p>
                </div>

                <div className="s-sub-price-grid">
                    <div className="s-sub-price-card">
                        <div className="s-sub-price-tier">Insurance</div>
                        <h4>ライト</h4>
                        <div className="s-sub-price-amount">
                            <span className="amount">¥980</span>
                            <span className="unit">/ 月</span>
                        </div>
                        <ul className="s-sub-price-features">
                            <li>稼働監視（自動）</li>
                            <li>SSL期限チェック（自動）</li>
                            <li>定期バックアップ作成（自動）</li>
                            <li>月1回のお知らせ更新代行</li>
                        </ul>
                        <p className="s-sub-price-note">※個別修正・個別サポート対応は含みません</p>
                    </div>

                    <div className="s-sub-price-card featured">
                        <div className="s-sub-price-tier">Office Assistant</div>
                        <h4>ベーシック</h4>
                        <div className="s-sub-price-amount">
                            <span className="amount">¥2,980</span>
                            <span className="unit">/ 月</span>
                        </div>
                        <ul className="s-sub-price-features">
                            <li>チャットでの更新・技術相談</li>
                            <li>月1回の画像 / テキスト修正代行</li>
                            <li>お知らせ更新代行（週1回まで）</li>
                        </ul>
                        <p className="s-sub-price-note">※ライトプランのすべての内容を含みます</p>
                    </div>

                    <div className="s-sub-price-card">
                        <div className="s-sub-price-tier">Strategic Partner</div>
                        <h4>アドバンス</h4>
                        <div className="s-sub-price-amount">
                            <span className="amount">¥29,800</span>
                            <span className="unit">/ 月</span>
                        </div>
                        <ul className="s-sub-price-features">
                            <li>AI活用支援（ブログ構成案提供等）</li>
                            <li>MEO対策（Map順位監視）</li>
                            <li>月1回Zoom定例会（30分）</li>
                            <li>アクセス解析レポート送付</li>
                        </ul>
                        <p className="s-sub-price-note">※Web担当者の代替として機能します</p>
                    </div>
                </div>

                <p className="s-sub-price-cta-row">
                    HP制作費は別途見積（初期¥19,800〜）。詳しくは
                    <a href="/v2/service/hp-production">サービス詳細ページ</a>
                    をご覧ください。
                </p>
            </div>
        </div>
    </section>

    {/* ====== JOURNAL / BLOG ====== */}
    <section className="s-journal" id="journal">
        <div className="s-container">
            <div className="s-journal-head">
                <div>
                    <div className="s-sec-num">CHAPTER IV · 読みもの</div>
                    <h2>小さな塾のための、<em>思考のノート</em>。</h2>
                </div>
                <a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-journal-more">noteですべての記事を読む →</a>
            </div>

            <div className="s-journal-grid" id="journal-grid">
                <a href="https://note.com/katsu_yossy/n/n773d255a24a6" target="_blank" rel="noopener" className="s-journal-card feat">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/263326116/rectangle_large_type_2_27918fe56697697903911e638e4a2a5a.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">Featured · AI対話</span>
                        <span className="s-journal-thumb-num">01</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat teal">AI活用</span>
                        <span>2026.03.30</span>
                        <span>·  note</span>
                    </div>
                    <h3>「なぜその解き方？」をClaudeに5回聞く<br />—— 算数・数学の理解を深める対話術</h3>
                    <p>解法を教わる時代から、"なぜ"を問い続ける時代へ。Claudeとの5回の対話で、生徒の理解がどう変わるか。指導現場からの実例。</p>
                </a>

                <a href="https://note.com/katsu_yossy/n/n0cca5f255779" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/262049143/rectangle_large_type_2_28ac737c7bf32eb6d02da61dd539a8e2.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">塾経営</span>
                        <span className="s-journal-thumb-num">02</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat">塾経営</span>
                        <span>2026.03.25</span>
                    </div>
                    <h3>Z会・代ゼミがAI導入を加速。<br />個人塾が今すぐできる差別化とは？</h3>
                </a>

                <a href="https://note.com/katsu_yossy/n/n3c70fd6b5f85" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/260979258/rectangle_large_type_2_1cc4635ae43f6ecfed4bced250df7db2.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">AI · Practice</span>
                        <span className="s-journal-thumb-num">03</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat teal">AI活用</span>
                        <span>2026.03.21</span>
                    </div>
                    <h3>過去問5年分をClaude Projectsに入れたら、<br />入試の傾向が見えてきた。</h3>
                </a>

                <a href="https://note.com/katsu_yossy/n/nb7dde512ed12" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/260561896/rectangle_large_type_2_51e859f56e8b84b662289a9d3f0c4baa.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">Workflow</span>
                        <span className="s-journal-thumb-num">04</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat blue">働き方</span>
                        <span>2026.03.20</span>
                    </div>
                    <h3>日記・メモのデータ化が、<br />AIを"使える部下"に変えていく。</h3>
                </a>

                <a href="https://note.com/katsu_yossy/n/n8298d03f3adc" target="_blank" rel="noopener" className="s-journal-card">
                    <div className="s-journal-thumb photo" style={{"backgroundImage": `url('https://assets.st-note.com/production/uploads/images/259308050/rectangle_large_type_2_1bae7456f35a5514e1381c9a1c313e5b.jpeg?fit=bounds&quality=85&width=1280')`}}>
                        <span className="s-journal-thumb-label">Case Study</span>
                        <span className="s-journal-thumb-num">05</span>
                    </div>
                    <div className="s-journal-meta">
                        <span className="cat gold">事例</span>
                        <span>2026.03.15</span>
                    </div>
                    <h3>フリーランス講師のAI活用リアル<br />—— 導入2年の"できたこと・できないこと"。</h3>
                </a>
            </div>
        </div>
    </section>

    {/* ====== COMPANY ====== */}
    <section className="s-company" id="company">
        <div className="s-container">
            <div className="s-sec-head">
                <div className="s-sec-num">CHAPTER V · 会社概要</div>
                <div className="s-sec-titles">
                    <h2>About <em>EduShift</em>.</h2>
                    <p className="s-sec-lede">教育の現場に根ざした、小さな会社です。</p>
                </div>
            </div>

            <div className="s-company-grid">
                <aside className="s-company-aside">
                    <h3>顔の見える距離で、<br />伴走する。</h3>
                    <p>
                        大規模な代理店ではありません。代表・吉井を中心とした少人数のチームで、一件一件の塾・先生と、顔の見える距離でお付き合いをしています。
                    </p>
                    <p>
                        "成果を出すこと"と"現場に寄り添うこと"。この2つを両立できる規模を、私たちは大切にしています。
                    </p>
                    <div className="s-company-seal">Tokyo · Ebisu-nishi</div>
                </aside>

                <dl className="s-company-table">
                    <div className="s-company-row">
                        <dt>Name <span>屋号</span></dt>
                        <dd>EduShift</dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Founder <span>代表者</span></dt>
                        <dd>吉井 勝彦 <small>Katsuhiko Yoshii</small></dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Address <span>所在地</span></dt>
                        <dd>〒150-0021<br />東京都渋谷区恵比寿西2丁目4番8号<br />ウィンド恵比寿ビル8F</dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Services <span>事業内容</span></dt>
                        <dd>
                            学習塾・スクール向け経営コンサルティング／<br />
                            教育機関向けAI導入支援・DX推進／<br />
                            教育関連フリーランス独立支援・育成／<br />
                            教育アプリ・システム開発／<br />
                            Webサイト制作・保守運用支援
                        </dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Clients <span>主なお客さま</span></dt>
                        <dd>個人塾・中小規模の学習塾、独立系の先生、教育機関、フリーランス講師</dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Contact <span>お問い合わせ</span></dt>
                        <dd>info@edu-shift.com<small>（ご返信は2営業日以内）</small></dd>
                    </div>
                    <div className="s-company-row">
                        <dt>Notation <span>法令表記</span></dt>
                        <dd><a href="/v2/business-law" style={{"color": `var(--s-teal-deep)`, "textDecoration": `underline`}}>特定商取引法に基づく表記</a></dd>
                    </div>
                </dl>
            </div>
        </div>
    </section>

    {/* ====== FAQ ====== */}
    <section className="s-faq" id="faq">
        <div className="s-container">
            <div className="s-sec-head">
                <div className="s-sec-num">CHAPTER VI · よくあるご質問</div>
                <div className="s-sec-titles">
                    <h2>ご相談の前に、<em>よくいただく問い</em>。</h2>
                    <p className="s-sec-lede">それでも解消しない不安は、無料相談で直接お話しさせてください。</p>
                </div>
            </div>

            <div className="s-faq-list">
                <details className="s-faq-item" open>
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">契約期間の縛りはありますか？いつでも解約できますか？</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        ございません。期間コンサル（¥29,800/月〜）は月単位で継続・解約が可能です。顧問・年間契約の中途解約については、個別の契約書に定める条件に従います。<br />
                        <small style={{"color": `var(--s-ink-500)`}}>※ ご入金後の返金は、当方の都合でサービス提供できなくなった場合を除き、原則お受けしておりません。</small>
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">初回相談は無料ですか？まずは話だけ聞きたいのですが。</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        はい、契約前の無料相談（オンライン）をご用意しています。より深く現状を診断したい場合は、単発スポット（¥9,800〜/回）で具体的な改善案の提示までを1回で完結できます。売り込みのための面談は行いません。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">HP制作の料金と、制作時の修正回数を教えてください。</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        制作プランは、ライト ¥19,800、スタンダード ¥39,800、SEO特化 ¥98,000（いずれも税抜・初期費用）。保守運用は月々 ¥980〜 ¥29,800 の3プランです。ライト／スタンダードプランでは制作時の修正は「納品前確認の1回のみ」として低価格を実現しています（以降は有償対応）。原稿・画像は指定フォーマット（Excel／Word）で全てご用意いただいた段階で着手します。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">支払い方法・支払い時期はどうなっていますか？</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        銀行振込またはクレジットカード決済に対応しています。銀行振込は請求書発行から1週間以内、クレジットカードは各カード会社の引き落とし日となります。詳細は<a href="/v2/business-law" style={{"color": `var(--s-teal-deep)`}}>特定商取引法に基づく表記</a>をご参照ください。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">遠方でも依頼できますか？現地対応のエリアは？</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        お打ち合わせはZoom等オンラインが基本のため、全国どこからでもご依頼いただけます。単発スポット（¥9,800〜）の現地対応は首都圏を基本としています。そのほかの地域での対面対応をご希望の場合は、別途ご相談ください。
                    </div>
                </details>

                <details className="s-faq-item">
                    <summary className="s-faq-q">
                        <span className="s-faq-marker">Q.</span>
                        <span className="s-faq-text">サービス提供までの流れと、提供期間を教えてください。</span>
                        <span className="s-faq-toggle">+</span>
                    </summary>
                    <div className="s-faq-a">
                        <span className="s-faq-a-marker">A.</span>
                        単発スポットはご入金確認後、日程調整の上で実施します。期間コンサル・顧問契約は、契約締結後に合意した開始日から提供を開始します。サービス内容は、<a href="#services" style={{"color": `var(--s-teal-deep)`}}>4つのサービス</a>（小規模塾経営サポート／AI導入コンサル／独立支援／HP制作・運用）の中から、現状と目的に合わせてご提案します。
                    </div>
                </details>
            </div>
        </div>
    </section>

    {/* ====== FINAL CTA ====== */}
    <section className="s-final" id="contact">
        <div className="s-container s-final-inner">
            <div className="s-final-brand">Edu<em>Shift</em></div>
            <div className="s-final-eyebrow">— 最後に、ひとことだけ。</div>
            <h2>
                一度、<em>お話ししませんか</em>。<br />
                きっと、新しい景色が見えます。
            </h2>
            <p>
                <strong>EduShift</strong> の30分無料面談で、あなたの塾の現状を一緒に見ていきます。<br />
                "売り込み"は、ひとつもいたしません。情報収集のためだけでも、歓迎です。
            </p>
            <a href="mailto:info@edu-shift.com?subject=%E7%84%A1%E6%96%99%E7%9B%B8%E8%AB%87%E3%81%AE%E4%BE%9D%E9%A0%BC&body=%E2%97%8B%E5%A1%BE%E5%90%8D%EF%BC%9A%0A%E2%97%8B%E5%9C%B0%E5%9F%9F%EF%BC%9A%0A%E2%97%8B%E7%94%9F%E5%BE%92%E6%95%B0%EF%BC%9A%0A%E2%97%8B%E3%81%94%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A%0A" className="s-final-cta">
                無料相談を予約する　→
            </a>
        </div>
    </section>

    {/* ====== FOOTER ====== */}
    <footer className="s-footer">
        <div className="s-container">
            <div className="s-footer-grid">
                <div>
                    <a href="#" className="s-footer-brand-logo" aria-label="EduShift">
                        <img src={logoImg} alt="EduShift" />
                        <span className="s-footer-brand-name-text">Edu<em>Shift</em></span>
                    </a>
                    <p style={{"fontFamily": `var(--s-serif-jp)`, "fontSize": `13px`, "lineHeight": `1.9`, "margin": `0`}}>
                        教育の"周辺"を、<br />いちばん近くで支える。
                    </p>
                </div>
                <div>
                    <h5>Services</h5>
                    <ul>
                        <li><a href="/v2/service/school-support">小規模塾経営サポート</a></li>
                        <li><a href="/v2/service/ai-consulting">AI導入コンサル</a></li>
                        <li><a href="/v2/service/freelance-support">独立支援</a></li>
                        <li><a href="/v2/service/hp-production">HP制作・運用</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Company</h5>
                    <ul>
                        <li><a href="#founder">代表挨拶</a></li>
                        <li><a href="#company">会社概要</a></li>
                        <li><a href="#journal">ブログ（最新記事）</a></li>
                        <li><a href="https://note.com/katsu_yossy" target="_blank" rel="noopener" className="s-footer-ext">note プロフィール<span aria-hidden="true">↗</span></a></li>
                        <li><a href="#faq">よくあるご質問</a></li>
                        <li><a href="#contact">お問い合わせ</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Legal</h5>
                    <ul>
                        <li><a href="/v2/privacypolicy">プライバシーポリシー</a></li>
                        <li><a href="/v2/business-law">特定商取引法</a></li>
                    </ul>
                </div>
            </div>
            <div className="s-footer-bottom">
                <span>© EduShift — All rights reserved.</span>
                <span>〒150-0021 東京都渋谷区恵比寿西2-4-8 ウィンド恵比寿ビル8F · info@edu-shift.com</span>
            </div>
        </div>
    </footer>

    {/* ====== Dynamic note articles loader ======
         Progressive enhancement: if assets/note-articles.json is reachable
         (same-origin fetch), the 5 Journal cards are re-rendered from the
         latest snapshot. Falls back to the static cards if fetch fails
         (file:// opens, no HTTP server, 404, etc).
         Refresh the JSON with: python3 scripts/fetch-note-articles.py */}
    


        </div>
    );
};
