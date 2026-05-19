import { Link } from 'react-router-dom';

export default function SidebarPrognosticosBlock() {
  const categories = [
    { name: 'Futebol', link: '/dfolgabet/prognosticos/futebol' },
    { name: 'Brasileirão Série A', link: '/dfolgabet/prognosticos/brasileirao' },
    { name: 'Copa do Brasil', link: '/dfolgabet/prognosticos/copa-do-brasil' },
    { name: 'Libertadores', link: '/dfolgabet/prognosticos/libertadores' },
    { name: 'Champions League', link: '/dfolgabet/prognosticos/champions-league' },
    { name: 'Premier League', link: '/dfolgabet/prognosticos/premier-league' },
    { name: 'LaLiga', link: '/dfolgabet/prognosticos/laliga' },
    { name: 'Tênis', link: '/dfolgabet/prognosticos/tenis' },
    { name: 'Basquete', link: '/dfolgabet/prognosticos/basquete' },
    { name: 'NBA', link: '/dfolgabet/prognosticos/nba' },
    { name: 'eSports', link: '/dfolgabet/prognosticos/esports' },
    { name: 'MMA', link: '/dfolgabet/prognosticos/mma' },
  ];

  return (
    <div className="bg-[#120826] border border-[#311B92] rounded-[1.5rem] p-5 shadow-inner">
      <div className="flex items-center gap-3 mb-4 border-b border-[#311B92] pb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#50C0CC] shadow-[0_0_8px_rgba(80,192,204,0.6)]"></div>
        <h3 className="text-[#50C0CC] font-black text-xs uppercase tracking-[0.2em]">Prognósticos</h3>
      </div>
      
      <ul className="space-y-0.5">
        {categories.map((cat, i) => (
          <li key={i}>
            <Link to={cat.link} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#311B92]/20 text-gray-400 hover:text-white transition-all text-xs font-bold group">
               <span className="text-[10px] text-[#311B92] group-hover:text-[#50C0CC] transition-colors">▶</span>
               {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
