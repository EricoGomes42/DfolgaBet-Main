import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../../../lib/sanity';

export default function SidebarCassinoBlock() {
  const [featuredPost, setFeaturedPost] = useState<any>(null);

  useEffect(() => {
    async function fetchAviator() {
      try {
        const query = `*[_type == "post" && slug.current == "como-jogar-aviator-confira-bets-que-pagam"][0] {
          title, mainImage, slug
        }`;
        const data = await client.fetch(query);
        if (data) {
          setFeaturedPost(data);
        }
      } catch (e) {}
    }
    fetchAviator();
  }, []);

  return (
    <div className="bg-[#120826] border border-[#311B92] rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#50C0CC]/10 border border-[#50C0CC]/30 flex items-center justify-center">
            <PlayCircle className="text-[#50C0CC]" size={18} />
          </div>
          <h3 className="text-white font-black text-sm uppercase tracking-wider">Cassino DfolgaBet</h3>
        </div>
        <span className="bg-red-600/20 text-red-500 border border-red-600/30 text-[10px] px-2 py-0.5 rounded font-black">18+</span>
      </div>

      <p className="text-[#b0b0b0] text-[11px] leading-relaxed italic border-l-2 border-[#50C0CC] pl-3 mb-6">
        Jogos populares, guias e ofertas em análise. Jogue com responsabilidade.
      </p>

      {/* Aviator Guide Banner */}
      <Link to={featuredPost ? `/dfolgabet/post/${featuredPost.slug.current}` : "/dfolgabet/post/como-jogar-aviator-confira-bets-que-pagam"} className="block relative aspect-[16/9] rounded-xl overflow-hidden mb-6 group/banner">
        {featuredPost?.mainImage ? (
          <img 
            src={urlFor(featuredPost.mainImage).width(800).height(450).url()} 
            alt="Aviator Guide" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-110"
          />
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?auto=format&fit=crop&w=800&q=80" 
            alt="Aviator Guide" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A051A] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end gap-2">
             <div className="flex-1">
                <span className="bg-[#311B92] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded mb-1 inline-block">CRASH</span>
                <h4 className="text-white font-bold text-xs leading-snug drop-shadow-lg group-hover/banner:text-[#50C0CC] transition-colors line-clamp-2">
                  {featuredPost?.title || "Como Jogar Aviator? Confira Bets que Pagam"}
                </h4>
             </div>
             <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[8px] font-black text-green-400 uppercase tracking-widest animate-pulse">Lançamento</span>
                <button className="bg-[#F37021] text-white text-[9px] font-black uppercase px-2 py-1.5 rounded shadow-lg transition-transform hover:scale-105">Ler Guia</button>
             </div>
          </div>
        </div>
      </Link>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-2">
        {['SLOTS', 'CRASH', 'ROLETA', 'CARTAS'].map(cat => (
          <button key={cat} className="bg-[#0A051A]/80 border border-[#311B92] hover:border-[#50C0CC] text-white text-[10px] font-black py-2 rounded-lg transition-all hover:bg-[#120826]">
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
           18+. JOGUE COM RESPONSABILIDADE. CONTEÚDO INFORMATIVO.
        </p>
      </div>
    </div>
  );
}
