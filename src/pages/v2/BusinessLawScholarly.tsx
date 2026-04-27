import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderScholarly } from '../../components/scholarly/HeaderScholarly';
import { FooterScholarly } from '../../components/scholarly/FooterScholarly';
import '../../styles/scholarly.css';

export const BusinessLawScholarly = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div className="theme-scholarly">
            <HeaderScholarly />
            <section className="s-legal-doc">
                <div className="s-container">
                    <nav className="s-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <span className="current">特定商取引法に基づく表記</span>
                    </nav>

                    <h1>特定商取引法に基づく表記</h1>
                    <p className="s-legal-updated">Based on Act on Specified Commercial Transactions</p>

                    <dl>
                        <dt>販売業者</dt>
                        <dd>EduShift</dd>

                        <dt>運営統括責任者</dt>
                        <dd>吉井 勝彦</dd>

                        <dt>所在地</dt>
                        <dd>〒150-0021<br />東京都渋谷区恵比寿西2丁目4番8号<br />ウィンド恵比寿ビル8F</dd>

                        <dt>メールアドレス</dt>
                        <dd>info@edu-shift.com</dd>

                        <dt>販売価格</dt>
                        <dd>プランごとに記載（詳細は料金プランをご確認ください）</dd>

                        <dt>商品代金以外の必要料金</dt>
                        <dd>
                            ・消費税<br />
                            ・銀行振込手数料（銀行振込の場合）<br />
                            ・インターネット接続料金、通信料金等（お客様の負担となります）
                        </dd>

                        <dt>支払方法</dt>
                        <dd>銀行振込、クレジットカード決済</dd>

                        <dt>支払時期</dt>
                        <dd>
                            ・銀行振込：請求書発行より1週間以内<br />
                            ・クレジットカード：各カード会社の引き落とし日
                        </dd>

                        <dt>役務の提供時期</dt>
                        <dd>
                            ・単発スポット：ご入金確認後、日程調整の上実施<br />
                            ・期間コンサル・顧問契約：契約締結後、合意した開始日より提供
                        </dd>

                        <dt>キャンセルについて</dt>
                        <dd>
                            原則として、ご入金後のキャンセル・返金はお受けしておりません。<br />
                            ただし、当方の都合によりサービス提供ができなくなった場合は、全額返金いたします。<br />
                            顧問契約の中途解約については、契約書の定めに従います。
                        </dd>
                    </dl>
                </div>
            </section>
            <FooterScholarly />
        </div>
    );
};
