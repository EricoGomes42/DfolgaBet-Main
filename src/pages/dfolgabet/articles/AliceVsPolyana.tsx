import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar, User, Info, Trophy, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import DfolgaBetSidebar from '../components/DfolgaBetSidebar';
import ResponsibleGamingNotice from '../components/ResponsibleGamingNotice';
import RelatedPosts from '../components/RelatedPosts';
import AuthorBox from '../components/AuthorBox';
import SocialShareRibbon from '../components/SocialShareRibbon';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../../../lib/sanity';

export default function AliceVsPolyana() {
  const [authorImage, setAuthorImage] = useState<string | null>(null);

  useEffect(() => {
    client.fetch(`*[_type == "author" && name match "Erico*"][0].image`).then((img: any) => {
      if (img) setAuthorImage(urlFor(img).width(200).height(200).url());
    }).catch(console.error);
  }, []);
  const structuredDataNewsArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Alice Ardelean x Polyana Viana: Análise Completa e Palpites para o UFC Fight Night",
    "description": "Análise técnica, odds reais de Lottoland e Sorte Online, e palpites para Alice Ardelean vs Polyana Viana no UFC Fight Night de 16/05/2026.",
    "image": [
      "https://dfolgabet.com/assets/articles/capas/capa_alice_polyana_final%20(1).webp",
      "https://dfolgabet.com/assets/articles/infograficos/analise_tecnica_final.png",
      "https://dfolgabet.com/assets/articles/infograficos/odds_comparacao_final.png",
      "https://dfolgabet.com/assets/articles/infograficos/predicoes_especialistas_final.png"
    ],
    "datePublished": "2026-05-13T00:00:00Z",
    "dateModified": "2026-05-13T00:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "DfolgaBet"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DfolgaBet"
    }
  };

  const structuredDataBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://dfolgabet.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "UFC",
        "item": "https://dfolgabet.com/ufc"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "UFC Fight Night",
        "item": "https://dfolgabet.com/ufc-fight-night"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Alice Ardelean x Polyana Viana",
        "item": "https://dfolgabet.com/alice-ardelean-polyana-viana-ufc-fight-night/"
      }
    ]
  };

  const structuredDataFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que significa a odd de 1.42 para Alice Ardelean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A odd de 1.42 indica que, se você apostar R$ 100 em Ardelean e ela vencer, você receberá R$ 142 (incluindo o valor inicial apostado)."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a diferença entre Lottoland e Sorte Online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ambas são plataformas autorizadas pela SPA/MF e oferecem mercados similares para UFC."
        }
      },
      {
        "@type": "Question",
        "name": "Posso usar cartão de crédito para apostar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não. A legislação brasileira proíbe o uso de cartões de crédito para apostas esportivas."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Alice Ardelean x Polyana Viana: Análise, Odds e Palpites UFC</title>
        <meta name="description" content="Análise técnica, odds reais de Lottoland e Sorte Online, e palpites para Alice Ardelean vs Polyana Viana no UFC Fight Night de 16/05/2026." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dfolgabet.com/alice-ardelean-polyana-viana-ufc-fight-night/" />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Alice Ardelean x Polyana Viana: Análise, Odds e Palpites UFC" />
        <meta property="og:description" content="Análise técnica, odds reais de Lottoland e Sorte Online, e palpites para Alice Ardelean vs Polyana Viana no UFC Fight Night de 16/05/2026." />
        <meta property="og:image" content="https://dfolgabet.com/assets/articles/capas/capa_alice_polyana_final%20(1).webp" />
        <meta property="og:url" content="https://dfolgabet.com/alice-ardelean-polyana-viana-ufc-fight-night/" />
        <meta property="og:site_name" content="DfolgaBet" />
        <meta property="og:locale" content="pt_BR" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alice Ardelean x Polyana Viana: Análise, Odds e Palpites UFC" />
        <meta name="twitter:description" content="Análise técnica, odds reais de Lottoland e Sorte Online, e palpites para Alice Ardelean vs Polyana Viana no UFC Fight Night de 16/05/2026." />
        <meta name="twitter:image" content="https://dfolgabet.com/assets/articles/capas/capa_alice_polyana_final%20(1).webp" />

        <script type="application/ld+json">
          {JSON.stringify(structuredDataNewsArticle)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataBreadcrumb)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataFAQ)}
        </script>
      </Helmet>

      <div className="pt-8 pb-16 bg-[#0A051A]">
        <div className="max-w-[1024px] mx-auto px-4 lg:px-8 mb-4">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/prognosticos" className="hover:text-white transition-colors">Palpites</Link>
            <ChevronRight size={12} />
            <span className="text-[#50C0CC]">UFC - Alice vs Polyana</span>
          </nav>

          {/* Capa */}
          <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
            <img 
              src="/assets/articles/capas/capa_alice_polyana_final%20(1).webp" 
              alt="Imagem cinética com dois portraits de lutadoras em posição de combate, iluminação neon teal e laranja, fundo roxo profundo" 
              className="w-full object-cover"
              loading="lazy"
            />
          </div>

          <header className="mb-10 text-center">
            <div className="inline-block bg-[#e67e22] text-white text-[10px] font-black uppercase px-3 py-1 rounded mb-4">
              MMA
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white max-w-[1000px] mx-auto leading-tight mb-6">
              Alice Ardelean x Polyana Viana: Análise Completa e Palpites para o UFC Fight Night
            </h1>
            <p className="text-gray-400 text-lg max-w-4xl mx-auto mb-6">
              Análise técnica, odds de mercado e informações detalhadas sobre o confronto no peso-palha feminino do UFC Fight Night em Las Vegas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <img src={authorImage || "/assets/dfolga-logo-novo.png"} alt="Erico Gomes" className="w-6 h-6 rounded-full object-cover border border-[#50C0CC]" onError={(e) => { e.currentTarget.src = "/assets/dfolga-logo-novo.png"; }} />
                Erico Gomes
              </span>
              <span className="flex items-center gap-1"><Calendar size={14} /> 13 de Maio de 2026</span>
            </div>
          </header>

          <div className="category-sync-layout">
            <main className="category-content-track">
              <div className="bg-[#1A0D35] rounded-2xl p-4 sm:p-5 md:p-10 border border-[#311B92] shadow-xl text-gray-300 relative overflow-hidden">
                
                <SocialShareRibbon />

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <Info className="text-[#e67e22]" size={32} /> O Confronto do UFC Fight Night de 16 de Maio
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  O UFC Fight Night de 16 de maio de 2026 traz um confronto relevante na divisão feminina dos pesos-palha.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Alice Ardelean, lutadora romena com carreira em ascensão, enfrenta Polyana Viana, veterana brasileira com experiência consolidada na organização.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Ambas buscam uma vitória importante para se posicionarem melhor no ranking.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  Este artigo apresenta uma análise equilibrada do confronto, considerando dados técnicos, odds de mercado e informações sobre plataformas de apostas autorizadas no Brasil.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <User className="text-[#e67e22]" /> Quem é Alice Ardelean?
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  Alice Ardelean é uma lutadora romena que vem construindo sua carreira no UFC com resultados consistentes.
                </p>
                {/* Alice Ardelean Profile Imagem */}
                <div className="mb-8 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
                  <img 
                    src="/assets/avatars/sports/fighters/alice_ardelean_profile.png" 
                    alt="Card de perfil da lutadora com nome, stats (18 wins, 5 losses, 89% striking) e iluminação neon teal"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mb-4 leading-relaxed text-base">
                  Com um cartel de 18 vitórias e 5 derrotas, ela se destaca pela precisão técnica e capacidade de controle de distância.
                </p>
                <p className="mb-6 leading-relaxed text-base">
                  Seu estilo combina boxe defensivo com movimentação inteligente, permitindo-lhe manter a iniciativa em grande parte de seus combates.
                </p>

                <h3 className="text-xl font-bold text-[#50C0CC] mb-4">Atributos técnicos principais:</h3>
                <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">
                  <li>Acurácia em golpes de pé: 89%</li>
                  <li>Defesa contra derrubadas: 45%</li>
                  <li>Experiência em eventos principais do UFC: 8 lutas</li>
                  <li>Tendência: vitórias por decisão (60% de seus triunfos)</li>
                </ul>

                <p className="mb-4 leading-relaxed text-base">
                  Ardelean treina em academias de elite europeia e tem se preparado especificamente para o mercado norte-americano.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  Sua luta anterior resultou em vitória por decisão unânime, consolidando seu momentum antes deste confronto.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <User className="text-[#e67e22]" /> Quem é Polyana Viana?
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  Polyana Viana é uma lutadora brasileira com mais de uma década de experiência no MMA profissional.
                </p>
                {/* Polyana Viana Profile Imagem */}
                <div className="mb-8 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
                  <img 
                    src="/assets/avatars/sports/fighters/polyana_viana_profile.png" 
                    alt="Card de perfil da lutadora com nome, stats (15 wins, 8 losses, 78% striking) e iluminação neon laranja"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mb-4 leading-relaxed text-base">
                  Com um cartel de 15 vitórias e 8 derrotas, ela é conhecida por sua versatilidade e capacidade de adaptação dentro do octógono.
                </p>
                <p className="mb-6 leading-relaxed text-base">
                  Seu estilo combina wrestling defensivo com transições rápidas para o jogo de pé.
                </p>

                <h3 className="text-xl font-bold text-[#50C0CC] mb-4">Atributos técnicos principais:</h3>
                <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">
                  <li>Acurácia em golpes de pé: 78%</li>
                  <li>Defesa contra derrubadas: 62%</li>
                  <li>Experiência em eventos principais do UFC: 12 lutas</li>
                  <li>Tendência: vitórias por decisão (55% de seus triunfos)</li>
                </ul>

                <p className="mb-4 leading-relaxed text-base">
                  Viana treina em academias reconhecidas do Rio de Janeiro e tem se preparado para neutralizar a movimentação de adversárias técnicas.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  Sua luta anterior resultou em vitória por decisão, mantendo seu ritmo competitivo.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <Trophy className="text-[#e67e22]" /> Análise Técnica do Confronto
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  O confronto entre Ardelean e Viana apresenta dinâmicas interessantes do ponto de vista técnico.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Ardelean possui vantagem em acurácia de golpes e controle de distância.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Viana apresenta defesa superior contra derrubadas e experiência em situações adversas.
                </p>
                <p className="mb-6 leading-relaxed text-base">
                  A luta tende a ser decidida no jogo de pé, onde ambas têm capacidade de impor seu ritmo.
                </p>

                <h3 className="text-xl font-bold text-[#50C0CC] mb-4">Pontos-chave da análise:</h3>
                <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">
                  <li>Ardelean pode usar sua movimentação para frustrar o avanço de Viana</li>
                  <li>Viana pode explorar sua defesa para neutralizar a ofensiva de Ardelean</li>
                  <li>Ambas têm histórico de lutas competitivas e decisões cerradas</li>
                  <li>O fator experiência favorece Viana, enquanto o fator momentum favorece Ardelean</li>
                </ul>

                <p className="mb-4 leading-relaxed text-base">
                  A dinâmica do confronto dependerá de qual lutadora conseguir impor seu ritmo desde o primeiro round.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  Ardelean tende a começar mais agressiva, enquanto Viana pode se adaptar conforme a luta progride.
                </p>

                {/* Análise Técnica Imagem */}
                <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
                  <img 
                    src="/assets/articles/infograficos/analise_tecnica_final.png" 
                    alt="Infográfico comparativo de estatísticas técnicas - Alice Ardelean 18 vitórias, 89% acurácia vs Polyana Viana 15 vitórias, 78% acurácia"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2 pb-2 font-mono italic">
                    Comparativo Estatístico Oficial UFC - Análise de Strikes e Defesas
                  </p>
                </div>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <LinkIcon className="text-[#e67e22]" /> Odds e Casas de Apostas Autorizadas
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  No Brasil, apenas plataformas autorizadas pela Secretaria de Prêmios e Apostas (SPA) do Ministério da Fazenda podem oferecer apostas esportivas legalmente.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Duas casas de apostas reconhecidas que disponibilizam mercados para o UFC são a Lottoland e a Sorte Online.
                </p>
                <p className="mb-6 leading-relaxed text-base">
                  Ambas operam sob a Portaria SPA/MF nº 259/2025.
                </p>

                <div className="overflow-x-auto mb-8 border border-gray-800 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                  <table className="w-full text-left bg-[#120826] border-collapse">
                    <thead className="bg-[#311B92] text-white">
                      <tr>
                        <th className="p-4 font-semibold">Casa de Apostas</th>
                        <th className="p-4 font-semibold">Alice Ardelean</th>
                        <th className="p-4 font-semibold">Polyana Viana</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#311B92]/30 transition-colors border-t border-white/10">
                        <td className="p-4 font-bold text-white">Lottoland</td>
                        <td className="p-4 font-bold text-[#50C0CC]">1.42</td>
                        <td className="p-4">2.62</td>
                      </tr>
                      <tr className="hover:bg-[#311B92]/30 transition-colors border-t border-white/10">
                        <td className="p-4 font-bold text-white">Sorte Online</td>
                        <td className="p-4 font-bold text-[#50C0CC]">1.42</td>
                        <td className="p-4">2.62</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Odds Imagem */}
                <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
                  <img 
                    src="/assets/articles/infograficos/odds_comparacao_final.png" 
                    alt="Infográfico com comparação de odds de Lottoland e Sorte Online, mostrando Alice Ardelean 1.42 vs Polyana Viana 2.62"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2 pb-2 font-mono italic">
                    As cotações estão sujeitas a variações até o início do combate
                  </p>
                </div>

                <p className="mb-4 leading-relaxed text-base">
                  As odds refletem a probabilidade implícita de cada resultado.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Ardelean está cotada com 70,4% de chance de vitória.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Viana está com 38,2% de chance.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  É importante compreender que as odds mudam conforme a movimentação de mercado e o volume de apostas.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <ShieldCheck className="text-[#e67e22]" /> Como Funcionam as Apostas Esportivas no Brasil
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  As apostas esportivas no Brasil são regulamentadas desde 2023 pela Lei nº 14.790/23.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Plataformas autorizadas devem manter domínio terminado em .bet.br e seguir rigorosos critérios de segurança, transparência e proteção ao jogador.
                </p>
                <p className="mb-6 leading-relaxed text-base">
                  Todas as operadoras licenciadas são obrigadas a implementar ferramentas de jogo responsável e alertas sobre riscos de ludopatia.
                </p>

                <h3 className="text-xl font-bold text-[#50C0CC] mb-4">Para realizar uma aposta, o processo é simples:</h3>
                <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">
                  <li>Criar conta na plataforma autorizada</li>
                  <li>Realizar depósito via Pix, transferência bancária ou cartão de débito</li>
                  <li>Selecionar o evento desejado (neste caso, UFC Fight Night)</li>
                  <li>Escolher o mercado de aposta (vitória de Ardelean ou Viana)</li>
                  <li>Definir o valor e confirmar a aposta</li>
                </ul>

                <p className="mb-4 leading-relaxed text-base">
                  Métodos de pagamento permitidos por lei incluem Pix, transferência bancária, cartões de débito e carteiras virtuais.
                </p>
                <p className="mb-8 font-bold text-[#e67e22] text-base">
                  Cartões de crédito e criptomoedas não são permitidos para apostas esportivas no Brasil.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <ShieldCheck className="text-[#e67e22]" /> Métodos de Saque nas Plataformas Autorizadas
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  Após a conclusão de uma aposta, o jogador pode solicitar o saque de seus ganhos através dos mesmos canais utilizados para depósito.
                </p>
                <p className="mb-6 leading-relaxed text-base">
                  Plataformas como Lottoland e Sorte Online oferecem processamento de saque em até 2 horas, dependendo do método escolhido.
                </p>

                <h3 className="text-xl font-bold text-[#50C0CC] mb-4">O processo de saque funciona da seguinte forma:</h3>
                <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">
                  <li>Acessar a seção "Minha Conta" ou "Saques"</li>
                  <li>Selecionar o método de saque desejado</li>
                  <li>Informar o valor a ser sacado</li>
                  <li>Confirmar a transação</li>
                  <li>Aguardar a confirmação e transferência dos fundos</li>
                </ul>

                <p className="mb-4 leading-relaxed text-base">
                  É importante verificar se há saldo disponível para saque. Alguns bônus podem ter restrições.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  O jogador deve verificar se atendeu aos requisitos de rollover, caso tenha recebido ofertas legalmente válidas como odds aumentadas ou bônus sem depósito.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <Info className="text-[#e67e22]" size={32} /> Jogo Responsável e Proteção ao Jogador
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  As apostas esportivas são uma forma de entretenimento eventual, permitida apenas para maiores de 18 anos.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Não devem ser consideradas como fonte de renda ou solução para problemas financeiros.
                </p>
                <p className="mb-6 leading-relaxed text-base">
                  O risco de desenvolvimento de ludopatia (vício em jogos) é real e afeta muitas pessoas no Brasil.
                </p>

                <h3 className="text-xl font-bold text-[#50C0CC] mb-4">Sinais de alerta para uso problemático de apostas:</h3>
                <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">
                  <li>Apostar mais do que se pode perder</li>
                  <li>Tentar recuperar perdas com novas apostas</li>
                  <li>Negligenciar responsabilidades pessoais ou profissionais</li>
                  <li>Sentir ansiedade ou irritabilidade quando não está apostando</li>
                  <li>Mentir sobre o tempo ou dinheiro gasto com apostas</li>
                </ul>

                <p className="mb-4 leading-relaxed text-base">
                  Se você ou alguém próximo apresenta esses sinais, existem recursos disponíveis.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  O CVV (Centro de Valorização da Vida) oferece atendimento gratuito em <a href="https://cvv.org.br" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:text-[#e67e22] underline" title="CVV - Centro de Valorização da Vida" aria-label="Acessar CVV">cvv.org.br</a>.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  O programa Jogo Responsável também disponibiliza orientações e suporte em <a href="https://jogoresponsavel.org.br" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:text-[#e67e22] underline" title="Jogo Responsável" aria-label="Acessar plataforma Jogo Responsável">jogoresponsavel.org.br</a>.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  Plataformas autorizadas oferecem ferramentas como limite de depósito, autoexclusão temporária e bloqueio permanente da conta.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <Info className="text-[#e67e22]" size={32} /> Perguntas Frequentes
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                
                <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
                  <h3 className="text-white font-bold mb-2">O que significa a odd de 1.42 para Alice Ardelean?</h3>
                  <p className="text-[#b0b0b0] text-[15px] leading-relaxed">A odd de 1.42 indica que, se você apostar R$ 100 em Ardelean e ela vencer, você receberá R$ 142 (incluindo o valor inicial apostado). Quanto menor a odd, maior a probabilidade implícita de vitória.</p>
                </div>

                <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
                  <h3 className="text-white font-bold mb-2">Qual é a diferença entre Lottoland e Sorte Online?</h3>
                  <p className="text-[#b0b0b0] text-[15px] leading-relaxed">Ambas são plataformas autorizadas pela SPA/MF e oferecem mercados similares para UFC. As principais diferenças estão na interface, velocidade de processamento de saques e ofertas legalmente válidas disponíveis. Ambas operam com segurança e transparência conforme a regulamentação brasileira.</p>
                </div>

                <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
                  <h3 className="text-white font-bold mb-2">Posso usar cartão de crédito para apostar?</h3>
                  <p className="text-[#b0b0b0] text-[15px] leading-relaxed">Não. A legislação brasileira proíbe o uso de cartões de crédito para apostas esportivas. Você pode usar Pix, transferência bancária, cartões de débito ou carteiras virtuais.</p>
                </div>

                <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
                  <h3 className="text-white font-bold mb-2">O que é um bônus sem depósito?</h3>
                  <p className="text-[#b0b0b0] text-[15px] leading-relaxed">Um bônus sem depósito é uma oferta legalmente válida no Brasil onde a plataforma credita um valor em sua conta sem exigir um depósito prévio. Este valor pode ser utilizado para realizar apostas, mas geralmente está sujeito a requisitos de rollover antes de poder ser sacado.</p>
                </div>

                <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
                  <h3 className="text-white font-bold mb-2">Como faço para autoexcluir minha conta?</h3>
                  <p className="text-[#b0b0b0] text-[15px] leading-relaxed">Você pode solicitar autoexclusão temporária ou permanente através da seção de configurações de sua conta. Você também pode entrar em contato com o suporte da plataforma. A autoexclusão permanente impede que você acesse a plataforma por um período indefinido.</p>
                </div>

                <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
                  <h3 className="text-white font-bold mb-2">As odds podem mudar antes da luta?</h3>
                  <p className="text-[#b0b0b0] text-[15px] leading-relaxed">Sim. As odds são dinâmicas e mudam conforme o volume de apostas e movimentação de mercado. É comum ver variações significativas nos dias anteriores ao evento.</p>
                </div>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <Trophy className="text-[#e67e22]" /> Considerações Finais
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-4 leading-relaxed text-base">
                  O confronto entre Alice Ardelean e Polyana Viana representa um duelo técnico interessante no UFC Fight Night de 16 de maio.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Ambas as lutadoras apresentam capacidades relevantes e históricos competitivos. As odds refletem uma leve preferência por Ardelean, mas o resultado permanece em aberto.
                </p>
                <p className="mb-4 leading-relaxed text-base">
                  Se você escolher participar de apostas esportivas, faça-o de forma responsável. Utilize apenas plataformas autorizadas como Lottoland e Sorte Online.
                </p>
                <p className="mb-8 leading-relaxed text-base">
                  Lembre-se de que as apostas são entretenimento eventual, não uma forma de renda. Estabeleça limites claros de quanto está disposto a apostar e nunca tente recuperar perdas com novas apostas.
                </p>

                {/* Previsões Imagem */}
                <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
                  <img 
                    src="assets/articles/infograficos/predicoes_especialistas_final.png" 
                    alt="Infográfico com previsões de especialistas, 72% favor Alice vs 28% favor Polyana, com análise de confiança"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="mt-8 mb-8">
                  <SocialShareRibbon />
                </div>

                <AuthorBox name="Erico Gomes" image={authorImage || "/assets/dfolga-logo-novo.png"} />

                <div className="mt-8 border-l-4 border-l-[#e67e22] bg-[#0A051A]/50 p-6 rounded-r-xl">
  <p className="mb-2 text-sm text-[#c0c0c0]"><strong>Aviso Legal:</strong> Este artigo é informativo e não constitui recomendação de aposta. As odds estão sujeitas a alterações. Aposte apenas o que pode perder. Menores de 18 anos não podem participar de apostas esportivas. Jogue com responsabilidade.</p>
  <p className="text-sm text-[#c0c0c0]"><strong>Regulamentação:</strong> Conteúdo em conformidade com a Lei nº 14.790/23 e Portaria SPA/MF nº 259/2025.</p>
</div>

<ResponsibleGamingNotice />

                <RelatedPosts />

              </div>
            </main>

            <aside className="category-sidebar-track">
              <DfolgaBetSidebar />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
