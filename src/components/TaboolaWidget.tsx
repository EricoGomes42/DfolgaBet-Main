'use client';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    _taboola?: any[];
  }
}

interface TaboolaWidgetProps {
  key?: string | number | null;
  mode?: string;
  container?: string;
  placement?: string;
  targetType?: string;
  className?: string;
  exactId?: boolean;
}

export default function TaboolaWidget({
  mode = 'thumbnails-RR',
  container = 'taboola-right-rail-thumbnails',
  placement = 'Right Rail Thumbnails',
  targetType = 'mix',
  className = '',
  exactId = false
}: TaboolaWidgetProps) {
  const initialized = useRef(false);
  const idRef = useRef(exactId ? container : `${container}-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    window._taboola = window._taboola || [];
    
    // Inject the main Taboola loader script if it doesn't exist
    if (!document.getElementById('tb_loader_script')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.id = 'tb_loader_script';
      script.src = '//cdn.taboola.com/libtrc/dfolga-publisher/loader.js';
      document.head.appendChild(script);
    }

    // Push this specific widget config using the dynamically generated ID
    window._taboola.push({ mode, container: idRef.current, placement, target_type: targetType });

    // Try to trigger flush after a short delay to ensure widgets are registered
    setTimeout(() => {
      window._taboola?.push({flush: true});
    }, 100);
  }, [mode, container, placement, targetType]);

  return <div id={idRef.current} className={className} />;
}
