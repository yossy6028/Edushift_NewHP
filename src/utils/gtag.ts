// Google Analytics 4 ユーティリティ
// Measurement ID は環境変数から取得（未設定時は index.html で読み込んでいる本番タグと同じIDに揃える）
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-946EWSKPB9';

// gtag関数の型定義
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// gtag が読み込まれているか（広告ブロッカー等で欠落する場合がある）
const hasGtag = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

// ページビュー計測（SPAでのルート変更時に使用）
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || !hasGtag()) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// 問い合わせ導線クリック（GA4キーイベント）
// mailto / tel リンクのクリックを一括捕捉するグローバルリスナーを設置する。
// 個々のCTAコンポーネントに手を入れずに全ページ・将来のページも網羅するための方式。
// イベント名 cta_click はGA4プロパティ側で既にキーイベント登録済みの名前に合わせている。
export const attachContactClickTracking = () => {
  if (typeof document === 'undefined') return () => {};
  const handler = (e: MouseEvent) => {
    const anchor = (e.target as Element | null)?.closest?.('a[href^="mailto:"], a[href^="tel:"]');
    if (!anchor || !hasGtag()) return;
    const href = anchor.getAttribute('href') || '';
    window.gtag('event', 'cta_click', {
      contact_method: href.startsWith('tel:') ? 'tel' : 'mailto',
      link_text: (anchor.textContent || '').trim().slice(0, 100),
      page_path: window.location.pathname,
    });
  };
  document.addEventListener('click', handler, true);
  return () => document.removeEventListener('click', handler, true);
};

// カスタムイベント計測
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// コンバージョンイベント（推奨イベント名を使用）
export const trackConversion = {
  // フォーム送信
  formSubmit: (formName: string) => {
    event({
      action: 'generate_lead',
      category: 'engagement',
      label: formName,
    });
  },

  // CTAボタンクリック
  ctaClick: (ctaName: string, destination?: string) => {
    event({
      action: 'select_content',
      category: 'cta',
      label: ctaName,
    });
    // クリックイベントも追加で送信
    window.gtag('event', 'click', {
      event_category: 'cta_button',
      event_label: ctaName,
      link_url: destination,
    });
  },

  // 外部リンククリック
  outboundClick: (url: string, linkText: string) => {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: linkText,
      link_url: url,
    });
  },

  // サービスページ閲覧
  viewService: (serviceName: string) => {
    event({
      action: 'view_item',
      category: 'service',
      label: serviceName,
    });
  },
};
