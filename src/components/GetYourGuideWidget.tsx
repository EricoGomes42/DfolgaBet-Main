'use client';
import { useEffect, useRef } from 'react';

export default function GetYourGuideWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous content
    containerRef.current.innerHTML = '';
    
    // Recreate the div required for the widget
    const widgetDiv = document.createElement('div');
    widgetDiv.setAttribute('data-gyg-widget', 'auto');
    widgetDiv.setAttribute('data-gyg-partner-id', '8GL6DUH');
    containerRef.current.appendChild(widgetDiv);

    // GetYourGuide scripts often cache global state or check if the script is already loaded
    // By dynamically creating a fresh script element every mount, we ensure the widget initializes
    const script = document.createElement('script');
    script.src = `https://widget.getyourguide.com/dist/pa.umd.production.min.js?bust=${Date.now()}`;
    script.async = true;
    containerRef.current.appendChild(script);

  }, []);

  // We provide a container that we mutate manually via refs
  return <div ref={containerRef} className="min-h-[300px]" />;
}
