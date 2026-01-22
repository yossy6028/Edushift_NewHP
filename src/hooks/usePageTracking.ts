import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview, GA_MEASUREMENT_ID } from '../utils/gtag';

/**
 * SPAでのページビュー計測フック
 * ルート変更時に自動でGA4にページビューを送信
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // ルート変更時にページビューを送信
    pageview(location.pathname + location.search);
  }, [location]);
};
