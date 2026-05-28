import { LineChart, Trophy, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const sportsCategories = [
  { name: 'Futebol', image: '/assets/betting/banner-modalidades/01_futebol.png', leagues: ['Brasileirão', 'Champions League', 'Libertadores', 'Premier League'] },
  { name: 'Voleibol', image: '/assets/betting/banner-modalidades/02_voleibol.png', leagues: ['Superliga', 'Liga das Nações', 'VNL'] },
  { name: 'UFC | MMA', image: '/assets/betting/banner-modalidades/03_ufc_mma.png', leagues: ['UFC Fight Night', 'UFC Numerados', 'Bellator', 'PFL'] },
  { name: 'Basquete', image: '/assets/betting/banner-modalidades/04_basquete.png', leagues: ['NBA', 'NBB', 'Euroliga', 'WNBA'] },
  { name: 'Futsal', image: '/assets/betting/banner-modalidades/05_futsal.png', leagues: ['LNF', 'Champions League Futsal'] },
  { name: 'Tênis', image: '/assets/betting/banner-modalidades/06_tenis.png', leagues: ['Grand Slams', 'ATP Tour', 'WTA Tour', 'Challenger'] },
  { name: 'Hóquei no Gelo', image: '/assets/betting/banner-modalidades/07_hoquei_gelo.png', leagues: ['NHL', 'KHL', 'SHL'] },
  { name: 'eSports', image: '/assets/betting/banner-modalidades/08_esports.png', leagues: ['CS2', 'League of Legends', 'Valorant', 'Dota 2'] },
  { name: 'Beisebol', image: '/assets/betting/banner-modalidades/09_beisebol.png', leagues: ['MLB', 'NPB', 'KBO'] },
  { name: 'Tênis de Mesa', image: '/assets/betting/banner-modalidades/10_tenis_mesa.png', leagues: ['WTT Series', 'Campeonato Mundial'] },
  { name: 'Críquete', image: '/assets/betting/banner-modalidades/11_criquet.png', leagues: ['IPL', 'T20 World Cup', 'Test Matches'] },
  { name: 'Handebol', image: '/assets/betting/banner-modalidades/12_handebol.png', leagues: ['Champions League', 'Bundesliga', 'Liga ASOBAL'] },
  { name: 'Badminton', image: '/assets/betting/banner-modalidades/13_badminton.png', leagues: ['BWF World Tour', 'Thomas Cup'] },
  { name: 'Futebol Americano', image: '/assets/betting/banner-modalidades/14_futebol_americano.png', leagues: ['NFL', 'NCAA'] },
  { name: 'Boxe', image: '/assets/betting/banner-modalidades/15_boxe.png', leagues: ['WBA', 'WBC', 'IBF', 'WBO'] },
  { name: 'Bandy', image: '/assets/betting/banner-modalidades/16_bandy.png', leagues: ['World Championship', 'Elitserien'] },
  { name: 'Bowls', image: '/assets/betting/banner-modalidades/17_bowls.png', leagues: ['World Bowls Championship', 'Premier League'] },
  { name: 'Curling', image: '/assets/betting/banner-modalidades/18_curling.png', leagues: ['World Men\'s Curling', 'Winter Olympics'] },
  { name: 'Dardos', image: '/assets/betting/banner-modalidades/19_dardos.png', leagues: ['PDC World Darts', 'Premier League'] },
  { name: 'Floorball', image: '/assets/betting/banner-modalidades/20_floorball.png', leagues: ['World Floorball', 'Swedish Superligan'] },
  { name: 'Futebol Australiano', image: '/assets/betting/banner-modalidades/21_futebol_australiano.png', leagues: ['AFL', 'AFL Women\'s'] },
  { name: 'Futebol de Areia', image: '/assets/betting/banner-modalidades/22_futebol_areia.png', leagues: ['Beach Soccer World Cup', 'Euro League'] },
  { name: 'Hóquei em Campo', image: '/assets/betting/banner-modalidades/23_hoquei_campo.png', leagues: ['FIH Pro League', 'World Cup'] },
  { name: 'Pesäpallo', image: '/assets/betting/banner-modalidades/24_pesapallo.png', leagues: ['Superpesis'] },
  { name: 'Pólo Aquático', image: '/assets/betting/banner-modalidades/25_polo_aquatico.png', leagues: ['LEN Champions League', 'World Championships'] },
  { name: 'Rugby League', image: '/assets/betting/banner-modalidades/26_rugby_league.png', leagues: ['NRL', 'Super League'] },
  { name: 'Rugby Union', image: '/assets/betting/banner-modalidades/27_rugby_union.png', leagues: ['Six Nations', 'Super Rugby', 'Premiership'] },
  { name: 'Snooker', image: '/assets/betting/banner-modalidades/28_snooker.png', leagues: ['World Championship', 'UK Championship'] },
  { name: 'Squash', image: '/assets/betting/banner-modalidades/29_squash.png', leagues: ['PSA World Tour', 'World Championship'] },
  { name: 'Vôlei de Praia', image: '/assets/betting/banner-modalidades/30_volei_praia.png', leagues: ['FIVB World Tour', 'Olympic Games'] },
  { name: 'Xadrez', image: '/assets/betting/banner-modalidades/31_xadrez.png', leagues: ['FIDE World Championship', 'Candidates'] },
  { name: 'Automobilismo', image: '/assets/betting/banner-modalidades/32_automobilismo.png', leagues: ['Fórmula 1', 'MotoGP', 'Stock Car', 'IndyCar'] },
];

export default function DfolgaBetPredictions() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-[#000000] rounded-2xl border border-[#F37021]/30 shadow-[0_0_30px_rgba(243,112,33,0.15)] mb-6">
          <LineChart size={32} className="text-[#50C0CC]" />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#ffffff] mb-6 tracking-tight">
           Prognósticos por <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37021] to-[#50c0cc]">Modalidade</span>
        </h1>
        <p className="text-base md:text-xl text-[#a2d9ce] max-w-3xl mx-auto font-light leading-relaxed">
          Nossa equipe cobre os principais eventos esportivos ao redor do globo. Escolha sua modalidade ou campeonato favorito para ler prognósticos detalhados e encontrar as melhores oportunidades.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {sportsCategories.map((sport, index) => (
          <div key={index} className="bg-[#0A051A] rounded-[2rem] border border-[#311B92]/50 hover:border-[#50C0CC] transition-all duration-300 overflow-hidden group shadow-lg hover:shadow-[0_15px_30px_rgba(80,192,204,0.15)] flex flex-col">
            
            {/* Image Banner */}
            <div className="h-40 w-full relative overflow-hidden">
               <img src={sport.image} alt={sport.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A051A] via-[#0A051A]/60 to-transparent"></div>
               <div className="absolute bottom-4 left-4 flex items-center gap-2">
                 <h2 className="text-2xl font-black text-white drop-shadow-md">{sport.name}</h2>
               </div>
            </div>

            {/* Content & Leagues */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                 <Trophy size={16} className="text-[#F37021]" />
                 <span className="text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Principais Torneios</span>
              </div>
              
              <ul className="space-y-3 flex-1 mb-6">
                {sport.leagues.map((league, idx) => (
                  <li key={idx}>
                    <Link 
                      to={`/dfolgabet/prognosticos/${league.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`} 
                      className="group/link flex items-center justify-between text-sm text-[#a2d9ce] hover:text-white transition-colors p-2 bg-[#1A0D35]/30 rounded-xl border border-transparent hover:border-[#311B92]"
                    >
                      <span>{league}</span>
                      <ArrowRight size={14} className="text-[#50C0CC] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* View All Button */}
              <Link 
                to={`/dfolgabet/prognosticos/${sport.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                className="w-full mt-auto bg-[#1A0D35] hover:bg-gradient-to-r hover:from-[#50C0CC] hover:to-[#3caab6] group-hover:bg-gradient-to-r group-hover:from-[#50C0CC] group-hover:to-[#3caab6] border border-[#311B92] hover:border-transparent text-white hover:text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                Ver Todos os Jogos <Activity size={16} />
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

