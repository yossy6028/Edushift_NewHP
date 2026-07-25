import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/MetaTags';
import '../../styles/scholarly.css';

/**
 * 自己アクセスをGA4計測から除外するための状態確認・切替ページ（社内用）。
 * index.html で先に定義される window.__edushiftOptout を使う。
 * 検索避けのため noindex（MetaTags側では扱わないので直接メタを立てる）。
 */
type OptoutApi = { KEY: string; has: () => boolean; save: (on: boolean) => void };

declare global {
    interface Window {
        __edushiftOptout?: OptoutApi;
    }
}

export const GaOptout = () => {
    const [excluded, setExcluded] = useState<boolean | null>(null);
    const [storageNote, setStorageNote] = useState('');

    const refresh = useCallback(() => {
        const api = window.__edushiftOptout;
        if (!api) {
            setExcluded(null);
            setStorageNote('計測制御スクリプトが読み込まれていません。ページを再読み込みしてください。');
            return;
        }
        setExcluded(api.has());
        let ls = false;
        try {
            localStorage.setItem('__t', '1');
            localStorage.removeItem('__t');
            ls = true;
        } catch {
            ls = false;
        }
        const cookieOk = navigator.cookieEnabled;
        setStorageNote(
            ls && cookieOk
                ? '保存先: localStorage と Cookie の両方が利用できます'
                : ls
                    ? '保存先: localStorage のみ（Cookieが無効です）'
                    : cookieOk
                        ? '保存先: Cookie のみ（プライベートブラウズの可能性があります）'
                        : '⚠️ localStorage も Cookie も使えないため、設定を保存できません',
        );
    }, []);

    useEffect(() => {
        refresh();
        // noindex をこのページ表示中だけ立てる
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => {
            document.head.removeChild(meta);
        };
    }, [refresh]);

    // 保存したうえで再読み込みする。再読み込み時に index.html のスクリプトが
    // gtag 読み込み前に ga-disable フラグを立てるので、確実に反映される。
    const toggle = (on: boolean) => {
        window.__edushiftOptout?.save(on);
        window.location.replace(`/ga-optout?ga_optout=${on ? '1' : '0'}`);
    };

    return (
        <div className="theme-scholarly">
            <MetaTags
                title="アクセス計測の除外設定"
                description="自分のアクセスをGoogleアナリティクスの計測から除外するための設定ページです。"
                url="/ga-optout"
            />
            <section className="s-optout">
                <div className="s-container s-optout-inner">
                    <p className="s-optout-eyebrow">EduShift 社内用</p>
                    <h1 className="s-optout-title">アクセス計測の除外設定</h1>

                    {excluded === null ? (
                        <div className="s-optout-status is-unknown">
                            <strong>状態を確認できません</strong>
                        </div>
                    ) : excluded ? (
                        <div className="s-optout-status is-off">
                            <strong>このブラウザは計測から除外されています</strong>
                            <span>あなたのアクセスはGoogleアナリティクスに記録されません。</span>
                        </div>
                    ) : (
                        <div className="s-optout-status is-on">
                            <strong>このブラウザは現在、計測対象です</strong>
                            <span>アクセスがアナリティクスの数値に含まれています。</span>
                        </div>
                    )}

                    <p className="s-optout-note">{storageNote}</p>

                    <div className="s-optout-actions">
                        {excluded ? (
                            <button type="button" className="s-optout-btn is-secondary" onClick={() => toggle(false)}>
                                除外を解除して計測対象に戻す
                            </button>
                        ) : (
                            <button type="button" className="s-optout-btn" onClick={() => toggle(true)}>
                                このブラウザを計測から除外する
                            </button>
                        )}
                    </div>

                    <div className="s-optout-help">
                        <h2>使い方</h2>
                        <ul>
                            <li>普段サイトを閲覧する端末・ブラウザごとに、1回ずつ「除外する」を押してください。</li>
                            <li>iPhone・iPad の Safari は、しばらく使わないと設定が消えることがあります。数値が急に増えたときは、このページで状態を確認してください。</li>
                            <li>プライベートブラウズでは設定が保存されません。通常のタブで開いてください。</li>
                        </ul>
                    </div>

                    <p className="s-optout-back">
                        <Link to="/">← サイトトップへ戻る</Link>
                    </p>
                </div>
            </section>
        </div>
    );
};
