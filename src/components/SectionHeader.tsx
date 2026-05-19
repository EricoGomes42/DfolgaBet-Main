import { useState } from "react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  icon?: string;
  href?: string;
  tabs?: string[];
  onTabChange?: (tab: string) => void;
}

export default function SectionHeader({ title, icon, href, tabs, onTabChange }: SectionHeaderProps) {
  const [activeTab, setActiveTab] = useState(tabs?.[0] || "");

  const handleTab = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 mb-4 pb-3 border-b border-[#e3e3e3]">
      {/* Badge título */}
      <h2 className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-base sm:text-sm font-bold text-white"
        style={{ backgroundColor: "#e67e22" }}
      >
        {icon && <span>{icon}</span>}
        {title}
      </h2>

      {/* Tabs */}
      <div className="flex items-center gap-0 sm:ml-auto w-full sm:w-auto overflow-x-auto"
           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {tabs?.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            className={`flex-shrink-0 whitespace-nowrap px-3 sm:px-4 py-1.5 text-[13px] sm:text-xs font-bold rounded-full transition-colors ${
              tab === "Tudo"
                ? activeTab === tab
                  ? "bg-[#50c0cc] text-white"
                  : "text-[#50c0cc] hover:bg-[#50c0cc] hover:text-white"
                : activeTab === tab
                  ? "bg-[#e67e22] text-white"
                  : "text-[#e67e22] hover:bg-[#e67e22] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
        {href && !tabs && (
          <Link to={href} className="text-xs font-medium hover:underline px-3 py-1.5"
            style={{ color: "#50c0cc" }}
          >
            Ver mais →
          </Link>
        )}
      </div>
    </div>
  );
}
