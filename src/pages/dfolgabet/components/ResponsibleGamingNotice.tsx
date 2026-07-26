import React from 'react';
import { ShieldAlert, Info, Headphones, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResponsibleGamingNotice() {
  return (
    <section className="mt-10 md:mt-16 mb-8 md:mb-12 p-5 md:p-10 bg-[#120826] border-l-[5px] border-[#50C0CC] rounded-lg font-sans">
      <div className="max-w-[900px] mx-auto">
        <h2 className="text-white text-2xl font-bold mb-5 flex items-center gap-3">
          <ShieldAlert className="text-[#e67e22] w-7 h-7" />
          Aviso Importante: Jogo Responsável
        </h2>

        <p className="text-[#e0e0e0] text-base leading-relaxed mb-6 font-medium">
          A participação frequente em jogos expõe os participantes ao risco de dependência, distúrbios patológicos relacionados a jogos de apostas e perda de dinheiro apostado.
        </p>

        <div className="bg-[#e67e22]/10 border border-[#e67e22] rounded-md p-4 mb-6">
          <p className="text-[#e67e22] text-sm font-semibold m-0">
            ⚠️ Leia em nosso site <Link to="/dfolgabet/restricoes-apostadores" className="text-[#50C0CC] underline font-bold">aqui sobre as restrições dos apostadores</Link> antes de apostar.
          </p>
        </div>

        <p className="text-[#e0e0e0] text-base leading-relaxed mb-6">
          Jogue de forma responsável. <Link to="/dfolgabet/jogo-responsavel" className="text-[#50C0CC] underline font-bold">Saiba mais aqui</Link>.
        </p>

        <div className="bg-[#50C0CC]/5 border-l-4 border-[#50C0CC] p-4 mb-6 rounded-sm">
          <h3 className="text-[#50C0CC] text-base font-bold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Proteção de Benefícios Sociais
          </h3>
          <p className="text-[#e0e0e0] text-sm leading-relaxed m-0">
            Benefícios como Bolsa Família e BPC/LOAS são destinados a necessidades essenciais e não devem ser usados para apostas. Nosso site não permite, nem incentiva o uso desses recursos, conforme as normas vigentes.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-white text-base font-bold mb-4 flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            Recursos de Ajuda
          </h3>
          
          <p className="text-[#b0b0b0] text-sm mb-3">Se você ou alguém próximo enfrenta dificuldades com apostas, procure ajuda profissional:</p>
          
          <ul className="list-none p-0 m-0 space-y-2">
            <li className="pl-6 relative">
              <span className="absolute left-0 text-[#50C0CC] font-bold">→</span>
              <strong className="text-white">CVV (Centro de Valorização da Vida)</strong>
              <br className="md:hidden" />
              <a href="https://www.cvv.org.br" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] no-underline text-sm md:ml-2">www.cvv.org.br</a>
              <span className="text-[#b0b0b0] text-[13px] md:ml-1"> – Apoio emocional e orientação</span>
            </li>
            
            <li className="pl-6 relative">
              <span className="absolute left-0 text-[#50C0CC] font-bold">→</span>
              <strong className="text-white">Jogo Responsável</strong>
              <br className="md:hidden" />
              <a href="https://www.jogoresponsavel.org.br" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] no-underline text-sm md:ml-2">www.jogoresponsavel.org.br</a>
              <span className="text-[#b0b0b0] text-[13px] md:ml-1"> – Programa de informação e suporte</span>
            </li>
            
            <li className="pl-6 relative">
              <span className="absolute left-0 text-[#50C0CC] font-bold">→</span>
              <strong className="text-white">Gambling Therapy</strong>
              <br className="md:hidden" />
              <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] no-underline text-sm md:ml-2">www.gamblingtherapy.org</a>
              <span className="text-[#b0b0b0] text-[13px] md:ml-1"> – Terapia online gratuita</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#e67e22]/5 border-l-4 border-[#e67e22] p-4 rounded-sm">
          <h3 className="text-[#e67e22] text-base font-bold mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Conformidade Regulatória
          </h3>
          <p className="text-[#e0e0e0] text-sm leading-relaxed m-0">
            O DfolgaBet é uma plataforma de análise e informações sobre apostas esportivas que opera em conformidade com as normas da Secretaria de Prêmios e Apostas do Ministério da Fazenda (SPA/MF), conforme Portaria nº 259, de 7 de fevereiro de 2025. Atuamos como afiliados de plataformas de apostas licenciadas, oferecendo conteúdo educacional e palpites fundamentados em análise técnica. Todo o nosso conteúdo é produzido seguindo rigorosamente os padrões de transparência, educação financeira e jogo responsável estabelecidos pela legislação vigente.
          </p>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="rounded-full flex items-center justify-center font-black text-xl w-10 h-10 border-2 border-[#e67e22] text-[#e67e22]">18+</div>
          <p className="text-[#b0b0b0] text-sm m-0">
            Você deve ter 18 anos ou mais para apostar.
          </p>
        </div>

      </div>
    </section>
  );
}
