import React from 'react';
import { FileText } from 'lucide-react';

export default function DfolgaBetTermosCondicoes() {
  return (
    <div className="pt-8 pb-16 bg-[#0A051A] text-gray-300 font-sans">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-[#1a0033] to-[#2d0052] border border-[#00d4ff] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <FileText className="text-[#00d4ff] w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            Termos <span className="text-[#00d4ff]">E Condições</span>
          </h1>
          <p className="text-gray-400">Última atualização: 12 de Maio de 2026</p>
        </div>

        <article className="bg-[#120826] border border-[#311B92] rounded-2xl p-6 md:p-10 shadow-2xl leading-relaxed">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">1. Regras gerais</h2>
            <p className="mb-4">
              Estes termos e condições ("Termos e Condições") entram em vigor a partir da data de acesso do nosso website. Ao utilizar qualquer um dos produtos ou serviços oferecidos no presente site, considera-se que você concorda com estes Termos e Condições.
            </p>
            <p className="mb-4">
              O DfolgaBet atua como um agregador de notícias, palpites e guias sobre conteúdos relacionados a apostas esportivas, porém <strong>não é uma casa de apostas</strong>.
            </p>
            <p>
              Qualquer informação fornecida é apenas um guia. Embora façamos todos os esforços para garantir que as informações fornecidas e indicadas (inclusive links, cotações/odds informativas e bônus exibidos de operadores externos) a você estejam corretas na data da publicação, é sua responsabilidade exclusiva garantir que entende quando aposta na plataforma externa parceira.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">2. Responsabilidade do cliente</h2>
            <p className="mb-4">
              Para consumir nosso material educativo em plenitude, reafirmamos que ele se destina a um público com 18 (dezoito) anos completos ou mais. 
            </p>
            <p>
              Em caso de redirecionamento para operadores, aplicam-se restrições rigorosas e processos de Conheça seu Cliente (KYC) onde seus dados serão exigidos (incluindo CPF e biometria associada a provedores de pagamento licenciados), conforme SPA/MF nº 249/2025 ou normativas de parceiros. Reafirma-se total oposição ao jogo para beneficiários do Bolsa Família e pessoas bloqueadas em processos de autoexclusão.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">3. Transações de Pagamento e Apostas</h2>
            <p className="mb-4">
              Nenhuma transação financeira (depósitos, saques ou registro de apostas) é efetuada no ambiente DfolgaBet.
            </p>
            <p>
              Eventuais dúvidas sobre Cash Out, bônus, transações com Pix e limites prudenciais deverão ser orientadas juntamente à <strong>casa de aposta</strong> pela qual o jogador tenha concretizado a aposta, por meio da Central de Ajuda dessa instituição. O DfolgaBet não se responsabiliza por prejuízos econômicos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">4. Erros e Omissões</h2>
            <p>
              Disponibilizamos análises, prognósticos, cotações e recomendações com o mais alto nível de dedicação, baseados em métricas ou softwares. Entretanto, no mundo dos esportes os resultados não têm garantia e podem variar. O uso de nosso portal é de sua total autonomia e responsabilidade.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">5. Propriedade Intelectual</h2>
            <p>
              Ao acessar as páginas do DfolgaBet, você concorda em não reproduzir, veicular cópias ou apropriar-se do conteúdo original construído sem autorização escrita e explícita fornecida pelo grupo de operação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Lei Aplicável e Jurisdição</h2>
            <p>
              O uso do site é regido pelas leis do Brasil e está em conformidade com as diretivas emitidas pela Secretaria de Prêmios e Apostas do Ministério da Fazenda do Brasil (SPA/MF). O conteúdo provido em nosso site tem fins de suporte informativo para um cenário lícito de entretenimento.
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}
