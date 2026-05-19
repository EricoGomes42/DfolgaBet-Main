import React from 'react';
import { Share2 } from 'lucide-react';

export default function SocialShareRibbon() {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 mt-4">
      <div className="flex items-center gap-2 mr-2">
        <Share2 size={18} className="text-gray-400" />
        <span className="text-gray-400 font-medium text-sm">Compartilhar</span>
        <div className="h-6 w-[1px] bg-gray-700 mx-1"></div>
      </div>
      
      <a href="#" className="bg-[#25D366] text-white w-9 h-9 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
      </a>
      <a href="#" className="bg-[#1877F2] text-white w-9 h-9 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Facebook">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
      </a>
      <a href="#" className="bg-black text-white w-9 h-9 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="X">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
      </a>
      <a href="#" className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white w-9 h-9 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Instagram">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
      <a href="#" className="bg-[#0088cc] text-white w-9 h-9 rounded-md flex items-center justify-center pl-0.5 pt-0.5 hover:opacity-90 transition-opacity" aria-label="Telegram">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.05 1.577L.83 9.77a1.696 1.696 0 0 0 .044 3.16l5.772 1.83 2.186 6.892c.31.98.922 1.196 1.488.23l2.946-4.996 6.136 4.542c1.13.626 1.942.302 2.222-1.042l4.01-18.9c.404-1.922-.728-2.796-1.98-2.227h-1.604zM7.228 13.916l11.19-10.14c.536-.48-.052-.746-.826-.23L6.154 10.742l-4.704-1.492c-1.02-.317-1.036-1.01.214-1.5L20.44.536c1.18-.456 2.216.275 1.82 2.126l-4.012 18.903c-.22 1.036-.838 1.282-1.684.81l-6.206-4.593-3 2.92c-.332.332-.612.612-1.256.612l.44-6.2z"/></svg>
      </a>
      <a href="#" className="bg-[#0A66C2] text-white w-9 h-9 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="#" className="bg-[#E60023] text-white w-9 h-9 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Pinterest">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.349-.283 1.157-.32 1.309-.05.204-.15.247-.361.149-1.343-.623-2.183-2.585-2.183-4.161 0-3.385 2.459-6.495 7.108-6.495 3.743 0 6.649 2.668 6.649 6.223 0 3.722-2.348 6.721-5.611 6.721-1.096 0-2.126-.571-2.478-1.243l-.674 2.571c-.244.931-.904 2.094-1.348 2.808 1.053.303 2.163.468 3.303.468 6.621 0 11.988-5.367 11.988-11.988 0-6.62-5.367-11.987-11.988-11.987z"/></svg>
      </a>
      <a href="#" className="group relative block w-9 h-9 rounded-md overflow-hidden bg-gradient-to-br from-[#D99A5A] to-[#619B9D]" aria-label="uTimeOff">
         <div className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-0 delay-75">
           <img src="/assets/utimeoff-logo.png" alt="uTimeOff" className="w-[18px] h-[18px] object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
         </div>
         <div className="absolute inset-0 bg-[#50C0CC] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
            <div 
              className="w-[18px] h-[18px] bg-white"
              style={{ maskImage: `url(/assets/utimeoff-logo.png)`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: `url(/assets/utimeoff-logo.png)`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}
            />
         </div>
      </a>
    </div>

  );
};
