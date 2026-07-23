import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageView } from '../lib/analytics';

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // We delay slightly to allow document.title to potentially update
    const timeout = setTimeout(() => {
      pageView(
        window.location.href,
        location.pathname + location.search,
        document.title
      );
    }, 100);

    return () => clearTimeout(timeout);
  }, [location]);

  return null;
}
