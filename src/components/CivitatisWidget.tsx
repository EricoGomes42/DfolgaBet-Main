"use client";

import { useEffect, useState } from "react";

const ALL_CITIES = [
  { id: 16, cmp: "Widget_Paris_PT" },
  { id: 3, cmp: "Widget_Roma_PT" },
  { id: 57, cmp: "Widget_Londres_PT" },
  { id: 33, cmp: "Widget_Barcelona_PT" },
  { id: 30, cmp: "Widget_Lisboa_PT" },
  { id: 60, cmp: "Widget_Amsterda_PT" },
  { id: 59, cmp: "Widget_Berlim_PT" },
  { id: 58, cmp: "Widget_Praga_PT" },
  { id: 24, cmp: "Widget_Viena_PT" },
  { id: 31, cmp: "Widget_Madri_PT" },
];

function pickRandom3() {
  const shuffled = [...ALL_CITIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

const TABS = ["✈️ Opção 1", "✈️ Opção 2", "✈️ Opção 3"];

export default function CivitatisWidget() {
  const [activeCity, setActiveCity] = useState(0);
  const [cities] = useState(() => pickRandom3());

  // Auto-rotação a cada 15 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCity((prev) => (prev + 1) % 3);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Injetar iframeResizer para redimensionamento automático
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.civitatis.com/f/js/vendor/iframeResizer.min.js";
    script.onload = () => {
      if (typeof (window as any).iFrameResize === "function") {
        (window as any).iFrameResize({
          checkOrigin: false,
          initCallback: (iframe: HTMLIFrameElement) => {
            setTimeout(() => {
              iframe.dispatchEvent(new Event("resize"));
            });
          },
        });
      }
    };
    document.head.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const city = cities[activeCity];

  return (
    <div className="w-full">
      {/* Abas */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {TABS.map((label, i) => (
          <button
            key={i}
            onClick={() => setActiveCity(i)}
            style={{
              flex: 1,
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 0",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              background: i === activeCity ? "#e67e22" : "transparent",
              color: i === activeCity ? "#ffffff" : "#e67e22",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Iframe Civitatis */}
      <iframe
        key={city.id}
        src={`https://www.civitatis.com/widget-activities/?affiliated=10340&display=grid&cant=6&lang=pt&currency=BRL&destination=${city.id}&category=9,7,6,4,3,1&transfer=0&cmp=${city.cmp}&width=100%&hideButton=0&centerContent=1&typeSelection=category&color=e67e22&typography=Courier+Prime&removeBackground=1&showShadow=1&roundedButtons=1`}
        width="100%"
        frameBorder={0}
        style={{ maxWidth: "100%", minHeight: 400, border: "none" }}
        title={`Civitatis - Atividades - Opção ${activeCity + 1}`}
      />
    </div>
  );
}
