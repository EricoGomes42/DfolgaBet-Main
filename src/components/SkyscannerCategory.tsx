import React from 'react';
import { ChevronRight, Plane, Calendar, Search, Loader2, Bed, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkyscannerCategory({ posts, title, hasMore, onLoadMore, isFetching }: { posts: any[], title: string, hasMore?: boolean, onLoadMore?: () => void, isFetching?: boolean }) {
  if (posts.length === 0 && isFetching) {
    return (
      <div className="w-full flex justify-center py-20">
        <Loader2 size={40} className="animate-spin text-[#0770e3]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Presentation Text & Partnership */}
      <div className="prose prose-lg dark:prose-invert max-w-none px-4 mb-16 text-gray-700 dark:text-gray-300">
        <h2 className="text-[#e67e22] text-3xl font-extrabold mb-6 leading-tight">Chegou a hora de planejar sua próxima viagem!</h2>
        <p className="leading-relaxed mb-6">
          Seja para as férias, um final de semana prolongado ou apenas uma folga no meio da semana, organizar a sua viagem pode ser tarefa simples e econômica se você tiver as ferramentas certas em mãos.
        </p>
        <p className="leading-relaxed mb-8">
          Temos orgulho de anunciar que o <strong>dfolga.com</strong> é agora parceiro oficial do Skyscanner! Isso significa que trazemos as melhores ofertas globais de passagens, hospedagem e aluguel de carros diretamente para você.
          <br /><br />
          <a href="https://skyscanner.pxf.io/anKM2W" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#50c0cc] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#e67e22] hover:scale-105 transition-all w-fit no-underline">
            Descubra passagens no Skyscanner <ChevronRight size={18} />
          </a>
        </p>
      </div>

      {/* Skyscanner Interactive Widget Mockup (Complex version) */}
      <div className="bg-[#4fb9c9] rounded-xl p-5 md:p-7 mb-16 shadow-lg relative font-sans w-full max-w-5xl mx-auto">
        
        {/* Header / Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-[1.5px] border-white/40 pb-0 mb-4 gap-4">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
            <button className="flex items-center gap-2 text-white font-bold pb-2.5 border-b-[3px] border-blue-600 px-1">
              <Plane size={18} className="transform -rotate-45" /> Passagens Aéreas
            </button>
            <button className="flex items-center gap-2 text-white font-medium pb-2.5 hover:text-white/80 transition-colors px-1">
              <Bed size={18} /> Hotéis
            </button>
            <button className="flex items-center gap-2 text-white font-medium pb-2.5 hover:text-white/80 transition-colors px-1">
              <Car size={18} /> Aluguel De Carros
            </button>
          </div>
          <div className="flex items-center gap-2 text-white font-medium text-[11px] pb-3 md:pb-0">
            <span className="italic opacity-90">Powered by</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Skyscanner_Logo_2019.svg/1024px-Skyscanner_Logo_2019.svg.png" alt="Skyscanner" className="h-[14px] brightness-0 invert" />
          </div>
        </div>

        {/* Radio options */}
        <div className="flex items-center gap-5 text-white text-sm font-semibold mb-5 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="trip_type" className="w-4 h-4 text-blue-600 border-2 border-white bg-transparent outline-none focus:ring-0 checked:bg-blue-600 checked:border-blue-600 focus-visible:ring-offset-0 focus-visible:ring-0" defaultChecked />
            Ida e volta
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="trip_type" className="w-4 h-4 text-blue-600 border-2 border-white bg-transparent outline-none focus:ring-0 checked:bg-blue-600 checked:border-blue-600 focus-visible:ring-offset-0 focus-visible:ring-0" />
            Só ida
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="trip_type" className="w-4 h-4 text-blue-600 border-2 border-white bg-transparent outline-none focus:ring-0 checked:bg-blue-600 checked:border-blue-600 focus-visible:ring-offset-0 focus-visible:ring-0" />
            Várias cidades
          </label>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-white text-[13px] font-bold">De</label>
            <input type="text" className="w-full bg-white rounded-[4px] px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium" />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-white text-[13px] font-bold">Para</label>
            <input type="text" className="w-full bg-white rounded-[4px] px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium" />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-white text-[13px] font-bold">Ida</label>
            <input type="date" className="w-full bg-white rounded-[4px] px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium" defaultValue="2026-05-09" />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-white text-[13px] font-bold">Volta</label>
            <input type="date" className="w-full bg-white rounded-[4px] px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium" defaultValue="2026-05-16" />
          </div>
        </div>

        {/* Passengers and Class */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-[10px] md:text-[11px] font-bold flex flex-wrap items-center gap-1 leading-tight">Adultos <span className="font-normal opacity-70">Acima de 18 anos</span></label>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-[4px] bg-[#dceced] text-gray-400 font-bold flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">-</button>
              <span className="text-white font-bold text-lg w-4 text-center">1</span>
              <button className="w-8 h-8 rounded-[4px] bg-[#dceced] text-gray-600 font-bold flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">+</button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-[10px] md:text-[11px] font-bold flex flex-wrap items-center gap-1 leading-tight">Crianças <span className="font-normal opacity-70">De 0 a 17 anos</span></label>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-[4px] bg-[#dceced] text-gray-400 font-bold flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">-</button>
              <span className="text-white font-bold text-lg w-4 text-center">0</span>
              <button className="w-8 h-8 rounded-[4px] bg-[#dceced] text-gray-600 font-bold flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">+</button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-white text-[11px] font-bold">Classe de cabine</label>
            <select className="w-full bg-white rounded-[4px] px-3 py-2.5 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium">
              <option>Econômica</option>
              <option>Econômica Premium</option>
              <option>Executiva</option>
              <option>Primeira classe</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div>
           <a href="https://skyscanner.pxf.io/anKM2W" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#f2822a] hover:bg-[#d96c1f] text-white font-bold px-6 py-2.5 rounded-[5px] shadow-sm transition-colors text-lg w-full sm:w-auto mt-2">
             Pesquisar <Plane size={18} className="transform rotate-45" />
           </a>
        </div>
      </div>

      {/* Slides com Fundo Laranja - Posts em Grid elegante */}
      <h3 className="text-2xl font-extrabold text-[#e67e22] mb-8 border-l-4 border-[#e67e22] pl-4">
        Destinos e Dicas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.slug}`} className="group flex flex-col bg-[#e67e22] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
             <div className="relative h-56 md:h-64 overflow-hidden bg-white">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#e67e22]/80 via-transparent to-transparent opacity-90"></div>
             </div>
             <div className="p-6 md:p-8 flex flex-col flex-grow relative text-white">
                <h4 className="text-xl md:text-2xl font-bold mb-3 leading-snug group-hover:text-white/80 transition-colors" dangerouslySetInnerHTML={{ __html: post.title }}></h4>
                <p className="text-white/90 text-sm md:text-[15px] line-clamp-3 leading-relaxed mt-auto" dangerouslySetInnerHTML={{ __html: post.excerpt || 'Descubra mais dicas sobre este destino maravilhoso e prepare suas malas.' }}></p>
             </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center pb-6">
          <button 
            onClick={onLoadMore}
            disabled={isFetching}
            className="group flex items-center justify-center gap-3 w-max mx-auto border-2 border-[#0770e3] text-[#0770e3] bg-transparent hover:bg-[#0770e3] hover:text-white transition-all duration-300 font-extrabold uppercase tracking-[0.2em] rounded-full py-4 px-10 shadow-lg text-sm"
          >
            {isFetching ? "Carregando..." : "Carregar Mais"}
            {!isFetching && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      )}
    </div>
  );
}
