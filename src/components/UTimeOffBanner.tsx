import { Link } from "react-router-dom";

export default function UTimeOffBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-10 group border border-[#50c0cc]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
        alt="uTimeOff Background"
        className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6">
        <img 
          src="/assets/utimeoff-logo-original.png" 
          alt="uTimeOff" 
          className="h-8 sm:h-12 mb-3 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <h3 className="text-white text-xl sm:text-2xl font-serif italic mb-2">
          Discover Your Time Off
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm italic mb-6">
          Your AI guide to the perfect day off
        </p>
        <a
          href="https://utimeoff.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f5b041] hover:bg-[#e67e22] text-white px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          Build Your Time Off Here and Now!
        </a>
      </div>
    </div>
  );
}
