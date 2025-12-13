import React from 'react';
import { FadeIn } from '../components/FadeIn';

export const BusinessLaw = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <h1 className="text-3xl font-bold text-slate-900 mb-12 text-center">特定商取引法に基づく表記</h1>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">販売業者</div>
                                <div className="text-slate-900 md:col-span-3">EduShift</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">運営統括責任者</div>
                                <div className="text-slate-900 md:col-span-3">吉井 勝彦</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">所在地</div>
                                <div className="text-slate-900 md:col-span-3">
                                    〒150-0021<br />
                                    東京都渋谷区恵比寿西2丁目4番8号ウィンド恵比寿ビル8F
                                </div>
                            </div>



                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">メールアドレス</div>
                                <div className="text-slate-900 md:col-span-3">info@edu-shift.com</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">販売価格</div>
                                <div className="text-slate-900 md:col-span-3">プランごとに記載（詳細は料金プランをご確認ください）</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">商品代金以外の<br className="hidden md:block" />必要料金</div>
                                <div className="text-slate-900 md:col-span-3">
                                    ・消費税<br />
                                    ・銀行振込手数料（銀行振込の場合）<br />
                                    ・インターネット接続料金、通信料金等（お客様の負担となります）
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">支払方法</div>
                                <div className="text-slate-900 md:col-span-3">銀行振込、クレジットカード決済</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">支払時期</div>
                                <div className="text-slate-900 md:col-span-3">
                                    ・銀行振込：請求書発行より1週間以内<br />
                                    ・クレジットカード：各カード会社の引き落とし日
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">役務の提供時期</div>
                                <div className="text-slate-900 md:col-span-3">
                                    ・単発スポット：ご入金確認後、日程調整の上実施<br />
                                    ・期間コンサル・顧問契約：契約締結後、合意した開始日より提供
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
                                <div className="font-bold text-slate-600 md:col-span-1">キャンセルについて</div>
                                <div className="text-slate-900 md:col-span-3">
                                    <p className="mb-2">原則として、ご入金後のキャンセル・返金はお受けしておりません。</p>
                                    <p className="text-sm text-slate-600">
                                        ただし、当方の都合によりサービス提供ができなくなった場合は、全額返金いたします。<br />
                                        顧問契約の中途解約については、契約書の定めに従います。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};
