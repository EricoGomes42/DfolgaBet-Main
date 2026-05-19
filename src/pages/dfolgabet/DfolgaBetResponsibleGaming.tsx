import { ShieldAlert, Info, ArrowRight } from 'lucide-react';
import SocialShareRibbon from './components/SocialShareRibbon';

export default function DfolgaBetResponsibleGaming() {
  return (
    <div className="pt-8 pb-16 bg-[#0A051A] text-gray-300 font-sans">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-tr from-[#1a0033] to-[#2d0052] border border-[#00d4ff] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <ShieldAlert className="text-[#00d4ff] w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            Política de Jogo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#50C0CC]">Responsável</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            O DfolgaBet está comprometido em fomentar apostas responsáveis e promover a conscientização sobre apostas problemáticas.
          </p>
        </div>

        {/* Content */}
        <article className="bg-[#120826] border border-[#311B92] rounded-2xl p-6 md:p-10 shadow-2xl">
          <SocialShareRibbon />
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-[#e67e22] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Nosso Comprometimento
            </h2>
            <p className="mb-4 leading-relaxed">
              A Política de Jogo Responsável do DfolgaBet define nosso comprometimento em minimizar os efeitos negativos de apostas problemáticas e promover práticas de apostas saudáveis.
            </p>
            <p className="leading-relaxed">
              Acreditamos que é nossa responsabilidade para com vocês, nossos leitores e clientes, garantir que desfrutem as experiências em apostas mantendo a conscientização total a respeito dos prejuízos sociais e financeiros associados.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-[#e67e22] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Práticas Recomendadas
            </h2>
            <p className="mb-6 leading-relaxed">
              O jogo deve ser efetuado com moderação e como forma de lazer. Recomendamos as seguintes práticas em plataformas de apostas parceiras:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#00d4ff] before:rounded-full pl-5">
                <div><strong>Aposte o que está disposto a perder:</strong> Utilize ferramentas de controle em operadores de apostas para gerir o seu dinheiro gasto.</div>
              </li>
              <li className="flex gap-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#00d4ff] before:rounded-full pl-5">
                <div><strong>Nunca tente recuperar as suas perdas:</strong> Se o fizer é mais provável que perca dinheiro.</div>
              </li>
              <li className="flex gap-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#00d4ff] before:rounded-full pl-5">
                <div><strong>Conheça as regras:</strong> Atente-se para compreender como funciona o produto ou serviço antes de apostar.</div>
              </li>
              <li className="flex gap-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#00d4ff] before:rounded-full pl-5">
                <div><strong>Equilibre as atividades:</strong> Tente sempre intercalar apostas com outras opções de lazer.</div>
              </li>
              <li className="flex gap-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#00d4ff] before:rounded-full pl-5">
                <div><strong>Evite jogar sob influência:</strong> Não jogue sob efeito de álcool, drogas ou emoções fortes.</div>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-[#e67e22] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Sinais de Alerta
            </h2>
            <p className="mb-6 leading-relaxed">
              Transtornos patológicos do jogo resultam em quando a atividade deixa de ser lazer e consome saúde ou finanças. Preste atenção aos sinais abaixo:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="bg-[#0A051A]/80 p-4 rounded-xl border border-gray-800">Gastar mais dinheiro ou tempo do que o planejado.</li>
              <li className="bg-[#0A051A]/80 p-4 rounded-xl border border-gray-800">Apostar sozinho para tentar não chamar atenção de amigos.</li>
              <li className="bg-[#0A051A]/80 p-4 rounded-xl border border-gray-800">Omitir ou mentir sobre prejuízos oriundos das apostas.</li>
              <li className="bg-[#0A051A]/80 p-4 rounded-xl border border-gray-800">Recusar a presença no trabalho ou em atividades sociais para apostar.</li>
              <li className="bg-[#0A051A]/80 p-4 rounded-xl border border-gray-800">Tentar recorrer a garantias de empréstimos e cartões de crédito.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-[#e67e22] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              Recursos e Suporte
            </h2>
            <p className="mb-6 leading-relaxed">
              Encorajamos apostadores problemáticos a contatar as seguintes organizações especializadas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="https://www.cvv.org.br" target="_blank" rel="noreferrer" className="block bg-[#1A0D35] p-6 rounded-2xl border border-[#311B92] hover:border-[#00d4ff] transition-all group">
                <h3 className="font-bold text-[#00d4ff] mb-2 flex items-center justify-between">
                  CVV
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-400">Atendimento e apoio gratuito, focado em suporte emocional.</p>
              </a>
              <a href="https://www.jogoresponsavel.org.br" target="_blank" rel="noreferrer" className="block bg-[#1A0D35] p-6 rounded-2xl border border-[#311B92] hover:border-[#00d4ff] transition-all group">
                <h3 className="font-bold text-[#00d4ff] mb-2 flex items-center justify-between">
                  Jogo Responsável
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-400">Conscientização para uma conduta de respeito sem transtornos.</p>
              </a>
              <a href="https://gamblersanonymous.org/ga/?q=address/brazil" target="_blank" rel="noreferrer" className="block bg-[#1A0D35] p-6 rounded-2xl border border-[#311B92] hover:border-[#00d4ff] transition-all group">
                <h3 className="font-bold text-[#00d4ff] mb-2 flex items-center justify-between">
                  Jogadores Anônimos
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-400">Irmandade de homens e mulheres que compartilham suas próprias experiências para ajudar os outros.</p>
              </a>
            </div>
          </section>

          <section>
            <div className="bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-xl p-6 text-center">
              <p className="text-[#ff6b35] font-bold text-lg mb-2 uppercase tracking-wide">Para Maiores de 18 Anos</p>
              <p className="text-gray-400 text-sm">
                As apostas e o DfolgaBet são recomendados apenas para indivíduos maiores de 18 anos. Aplicamos restrições rigorosas se você suspeitar de condutas infantis.
              </p>
            </div>
          </section>

          <div className="mt-8">
            <SocialShareRibbon />
          </div>

        </article>
      </div>
    </div>
  );
}
