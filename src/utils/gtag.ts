// Google Analytics 4 ユーティリティ
// Measurement ID は環境変数から取得
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

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

// ページビュー計測（SPAでのルート変更時に使用）
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
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
