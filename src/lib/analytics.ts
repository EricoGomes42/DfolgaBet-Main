export const GA_MEASUREMENT_ID = 'G-ER150BFKYS';

// Extend window object to include dataLayer and gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const pageView = (url: string, path: string, title: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_location: url,
      page_path: path,
      page_title: title
    });
  }
};

export const updateConsent = (granted: boolean) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const status = granted ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status
    });
  }
};
