import React from 'react';
import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

interface AuthorBoxProps {
  name: string;
  role?: string;
  bio?: string;
  image?: string;
}

export default function AuthorBox({ 
  name, 
  role = "Especialista em iGaming", 
  bio = "Jornalista apaixonado por esportes, cobre grandes eventos esportivos com análises detalhadas, estatísticas e odds de apostas.", 
  image = "/assets/Erico_Gomes_Copywriter.jpg" 
}: AuthorBoxProps) {
  return (
    <div className="mt-12 mb-8 bg-[#120826] border border-[#311B92] rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#50C0CC] flex-shrink-0 bg-[#0A051A]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
          onError={(e) => { 
            e.currentTarget.src = "/assets/dfolga-logo-novo.png"; 
            e.currentTarget.className = "w-full h-full object-contain p-2";
          }} 
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-sm font-semibold text-[#50C0CC] mb-3">{role}</p>
        <p className="text-[#b0b0b0] text-sm mb-4 leading-relaxed">
          {bio}
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4">
          {name.includes('Erico') && (
            <>
              <a href="https://www.facebook.com/erico.gomes1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#50C0CC] transition-colors" title="Facebook" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/ericogomes50/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#50C0CC] transition-colors" title="Instagram" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/erico-gomes-redator-seo/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#50C0CC] transition-colors" title="LinkedIn" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </>
          )}
          <a href={name.includes('Erico') ? "https://utimeoff.com/social" : "https://utimeoff.com/"} target="_blank" rel="noopener noreferrer" className="group relative block w-[25px] h-[25px]" title="uTimeOff" aria-label="uTimeOff">
            <img src="/assets/utimeoff-logo.png" alt="uTimeOff" className="w-full h-full object-contain absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity" onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }} />
            <div 
              className="absolute inset-0 bg-[#50C0CC] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ maskImage: `url(/assets/utimeoff-logo.png)`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: `url(/assets/utimeoff-logo.png)`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
