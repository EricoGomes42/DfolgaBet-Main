import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function DfolgaBetPoliticaPrivacidade() {
  return (
    <div className="pt-8 pb-16 bg-[#0A051A] text-gray-300 font-sans">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-[#1a0033] to-[#2d0052] border border-[#00d4ff] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <ShieldCheck className="text-[#00d4ff] w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            Política de <span className="text-[#00d4ff]">Privacidade</span>
          </h1>
          <p className="text-gray-400">Proteção de dados em conformidade com as leis do Brasil.</p>
        </div>

        <article className="bg-[#120826] border border-[#311B92] rounded-2xl p-6 md:p-10 shadow-2xl leading-relaxed">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Apresentação</h2>
            <p className="mb-4">
              Na DfolgaBet, nossa prioridade é proteger e respeitar as informações e privacidades dos nossos visitantes em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong> do Brasil (Lei nº 13.709/2018).
            </p>
            <p>
              Esta página busca transparecer nossa visão e as estratégias em torno de coleta de dados durante os processos de acesso, retenção e processamento diário no website. Ao utilizar o site DfolgaBet, você declara ciência destas prerrogativas.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Cookies e Dados Coletados</h2>
            <p className="mb-4">
              Ao navegar pela DfolgaBet, podem ser coletadas informações contendo preferências, históricos de navegação ou registros em nossos sistemas mediante tecnologias como arquivos de cookies e <i>Google Analytics</i>.
            </p>
            <p>
              Tais informações nos permitem construir análises agregadas para direcionarmos melhor a experiência do consumidor (apresentando textos segmentados) e auxiliá-lo a encontrar as informações rapidamente. E vale informar em nenhum instante transacionamos seu telefone ou documentação com empresas terceira sem seu consentimento expresso.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Dados de Afiliados (Publicidade)</h2>
            <p className="mb-4">
              Frequentemente hospedamos em nosso endereço anúncios ou banners referenciados ou originados através de redes parceiras de apostas que funcionam no ecossistema de apostas licenciado em base à "SPA/MF". Nossos parceiros poderão, pelas próprias políticas de integridade deles, executar controles e monitoramentos por seu IP a partir do seu ato voluntário de clique ao ingressar em seus domínios.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Protegendo Menores de Idade e Usuários Restritos</h2>
            <p className="mb-4">
              A política de restrições por faixa delimitada no site indica severa atuação da nossa plataforma à adequação às regras brasileiras, de onde extraímos métodos de denúncia e conscientização no material visando a proibir participações diretas ou disfarçadas. 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Informações de Contato e Dúvidas</h2>
            <p className="mb-4">
              Toda interação e solicitações referente aos dados de um indivíduo deverá passar pela ouvidoria em respeito ao cumprimento da Lei Geral de Proteção de Dados.
            </p>
            <p>
              <strong>Você pode ter a segurança de contar e relatar com nossos endereços de e-mail ao menor sinal de inconformidades: <a href="mailto:contato@dfolgabet.com.br" className="text-[#00d4ff] hover:underline">contato@dfolgabet.com.br</a></strong>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
