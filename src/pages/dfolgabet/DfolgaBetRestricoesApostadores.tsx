import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function DfolgaBetRestricoesApostadores() {
  return (
    <div className="pt-8 pb-16 bg-[#0A051A] text-gray-300 font-sans">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-[#1a0033] to-[#2d0052] border border-[#00d4ff] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <ShieldCheck className="text-[#00d4ff] w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">
            Restrições dos Apostadores
          </h1>
        </div>

        <article className="bg-[#120826] border border-[#311B92] rounded-2xl p-6 md:p-10 shadow-2xl">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">1. Idade Mínima</h2>
            <p className="leading-relaxed">
              As apostas esportivas e o uso dos nossos guias são estritamente proibidos para menores de 18 anos. É fundamental que as plataformas parceiras do DfolgaBet cumpram este requisito. Em nosso conteúdo, incentivamos constantemente uma supervisão rigorosa de menores na internet e o bloqueio de conteúdos relacionados a apostas em dispositivos utilizados por estes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">2. Proteção a Beneficiários de Programas Sociais</h2>
            <p className="leading-relaxed mb-4">
              Benefícios advindos de programas sociais vinculados ao Governo Federal, de prefeituras ou demais entes estaduais (ex: Bolsa Família, BPC/LOAS) <strong>são destinados à subsistência básica</strong>.
            </p>
            <p className="leading-relaxed text-[#ff6b35] font-medium">
              Sob a nova regulamentação brasileira (SPA/MF), as plataformas de apostas têm a obrigação de implementar controles que evitem que apostadores que recebem estes benefícios efetuem depósitos nos sites. O DfolgaBet repudia o uso de recursos essenciais e apoia a adoção de medidas governamentais que garantam que as plataformas vetem transações atreladas ao descumprimento desta regra.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">3. Autoexclusão e Políticas da Indústria</h2>
            <p className="leading-relaxed mb-4">
              Sugerimos que apostadores que detectem sinais de dependência procurem utilizar a "Plataforma Centralizada de Autoexclusão", mecanismo do Ministério da Fazenda para bloquear acesso a todas as plataformas regulares de apostas no Brasil simultaneamente.
            </p>
            <p className="leading-relaxed">
              O DfolgaBet se posiciona abertamente sobre a viabilidade e urgência de um mercado onde as restrições servem de escudo familiar e social para o jogador e sua rede de apoio.
            </p>
          </section>

          <section>
            <div className="bg-[#00d4ff]/10 p-5 rounded-lg border-l-4 border-[#00d4ff] flex items-start gap-4">
              <Info className="text-[#00d4ff] mt-1 shrink-0" />
              <p className="text-sm">
                Esta página serve como base educacional sobre quem pode ou não envolver-se com plataformas de apostas. Consulte sempre nossas publicações em "Jogo Responsável" para recursos adicionais.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
