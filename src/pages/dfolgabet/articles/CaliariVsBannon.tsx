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

export default function CaliariVsBannon() {
  const [authorImage, setAuthorImage] = useState<string | null>(null);

  useEffect(() => {
    client.fetch(`*[_type == "author" && name match "Erico*"][0].image`).then((img: any) => {
      if (img) setAuthorImage(urlFor(img).width(200).height(200).url());
    }).catch(console.error);
  }, []);
  const structuredDataNewsArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Palpites UFC: Nicolle Caliari vs. Shauna Bannon – Análise Completa para Apostas Esportivas",
    "alternativeHeadline": "Nicolle Caliari vs. Shauna Bannon - Odds, Estatísticas e Palpites para UFC Fight Night",
    "description": "Análise completa da luta Nicolle Caliari vs. Shauna Bannon no UFC Fight Night de 16 de maio de 2026. Confira estatísticas, odds, palpites e informações sobre plataformas licenciadas para apostas.",
    "image": [
      "https://dfolgabet.com/assets/articles/capas/capa_caliari_bannon_ufc.webp",
      "https://dfolgabet.com/assets/articles/infograficos/tabela_comparativa_caliari_bannon.jpg",
      "https://dfolgabet.com/assets/articles/infograficos/odds_e_palpites_caliari_bannon.jpg"
    ],
    "datePublished": "2026-05-12T10:00:00Z",
    "dateModified": "2026-05-12T10:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "DfolgaBet",
      "url": "https://dfolgabet.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DfolgaBet",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dfolgabet.com/logo.png",
        "width": 600,
        "height": 60
      }
    },
    "mainEntity": {
      "@type": "Event",
      "name": "UFC Fight Night: Nicolle Caliari vs. Shauna Bannon",
      "startDate": "2026-05-16T22:00:00Z",
      "location": {
        "@type": "Place",
        "name": "Meta APEX",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "Nevada",
          "addressCountry": "US"
        }
      },
      "performer": [
        {
          "@type": "Person",
          "name": "Nicolle Caliari"
        },
        {
          "@type": "Person",
          "name": "Shauna Bannon"
        }
      ]
    }
  };

  const structuredDataBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "DfolgaBet",
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
        "name": "Palpites",
        "item": "https://dfolgabet.com/ufc/palpites"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Nicolle Caliari vs. Shauna Bannon",
        "item": "https://dfolgabet.com/ufc-caliari-vs-bannon"
      }
    ]
  };

  const structuredDataFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Onde apostar na luta Nicolle Caliari vs. Shauna Bannon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Você pode apostar em plataformas licenciadas como Lottoland e Sorte Online, ambas autorizadas pela SPA/MF conforme Portaria 259/2025."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a favorita na luta entre Nicolle Caliari e Shauna Bannon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shauna Bannon é favorita com odds de +195, refletindo seu cartel mais impressionante (7-1) e controle de luta superior."
        }
      },
      {
        "@type": "Question",
        "name": "Como apostar com responsabilidade?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aposte apenas o dinheiro que pode perder, defina limites de depósito, e procure ajuda profissional se notar sinais de dependência."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Nicolle Caliari vs. Shauna Bannon: Palpites, Odds e Análise UFC 2026</title>
        <meta name="description" content="Análise completa de Nicolle Caliari vs. Shauna Bannon. Confira odds, estatísticas, palpites e onde apostar com segurança no UFC Fight Night." />
        <meta name="keywords" content="UFC, MMA, Nicolle Caliari, Shauna Bannon, UFC Fight Night, palpites UFC, apostas MMA, análise UFC, odds UFC" />
        <meta name="author" content="DfolgaBet" />
        <meta name="language" content="pt-BR" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        <link rel="canonical" href="https://dfolgabet.com/ufc-caliari-vs-bannon" />

        {/* OPEN GRAPH - FACEBOOK, LINKEDIN, PINTEREST */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://dfolgabet.com/ufc-caliari-vs-bannon" />
        <meta property="og:title" content="Nicolle Caliari vs. Shauna Bannon: Palpites, Odds e Análise UFC 2026" />
        <meta property="og:description" content="Análise completa da luta Nicolle Caliari vs. Shauna Bannon no UFC Fight Night de 16 de maio de 2026. Confira odds, estatísticas, palpites e informações sobre plataformas licenciadas para apostas." />
        <meta property="og:image" content="https://dfolgabet.com/assets/articles/capas/capa_caliari_bannon_ufc.webp" />
        <meta property="og:image:width" content="2560" />
        <meta property="og:image:height" content="1440" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Nicolle Caliari em postura ofensiva com iluminação roxo-azul vs. Shauna Bannon em postura técnica com iluminação laranja no octógono UFC" />
        <meta property="og:site_name" content="DfolgaBet" />
        <meta property="og:locale" content="pt_BR" />

        {/* OPEN GRAPH - ARTIGO */}
        <meta property="article:published_time" content="2026-05-12T10:00:00Z" />
        <meta property="article:modified_time" content="2026-05-12T10:00:00Z" />
        <meta property="article:author" content="https://dfolgabet.com" />
        <meta property="article:section" content="UFC" />
        <meta property="article:tag" content="UFC" />
        <meta property="article:tag" content="MMA" />
        <meta property="article:tag" content="Nicolle Caliari" />
        <meta property="article:tag" content="Shauna Bannon" />
        <meta property="article:tag" content="Palpites UFC" />
        <meta property="article:tag" content="Apostas Esportivas" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://dfolgabet.com/ufc-caliari-vs-bannon" />
        <meta name="twitter:title" content="Nicolle Caliari vs. Shauna Bannon: Palpites, Odds e Análise UFC 2026" />
        <meta name="twitter:description" content="Análise completa de Nicolle Caliari vs. Shauna Bannon com odds, estatísticas e palpites para o UFC Fight Night de 16 de maio." />
        <meta name="twitter:image" content="https://dfolgabet.com/assets/articles/capas/capa_caliari_bannon_ufc.webp" />
        <meta name="twitter:image:alt" content="Nicolle Caliari vs. Shauna Bannon - UFC Fight Night 2026" />
        <meta name="twitter:creator" content="@DfolgaBet" />
        <meta name="twitter:site" content="@DfolgaBet" />

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
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/prognosticos" className="hover:text-white transition-colors">Palpites</Link>
            <ChevronRight size={12} />
            <span className="text-[#50C0CC]">UFC - Caliari vs Bannon</span>
          </nav>

          {/* Capa */}
          <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
            <img 
              src="/assets/articles/capas/capa_caliari_bannon_ufc.webp" 
              alt="Capa UFC Nicolle Caliari vs. Shauna Bannon" 
              className="w-full object-cover"
              loading="lazy"
            />
          </div>

          <header className="mb-10 text-center">
            <div className="inline-block bg-[#e67e22] text-white text-[10px] font-black uppercase px-3 py-1 rounded mb-4">
              MMA
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white max-w-[1000px] mx-auto leading-tight mb-6">
              Palpites UFC: Nicolle Caliari vs. Shauna Bannon – Análise Completa para Apostas Esportivas
            </h1>
            <p className="text-gray-400 text-lg max-w-4xl mx-auto mb-6">
              O UFC Fight Night traz um confronto eletrizante na divisão peso-palha. Analise dados, odds, palpites e estratégias de apostas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <img src={authorImage || "/assets/dfolga-logo-novo.png"} alt="Erico Gomes" className="w-6 h-6 rounded-full object-cover border border-[#50C0CC]" onError={(e) => { e.currentTarget.src = "/assets/dfolga-logo-novo.png"; }} />
                Erico Gomes
              </span>
              <span className="flex items-center gap-1"><Calendar size={14} /> 12 de Maio de 2026</span>
            </div>
          </header>

          <div className="category-sync-layout">
            <main className="category-content-track">
              <div className="bg-[#1A0D35] rounded-2xl p-4 sm:p-5 md:p-10 border border-[#311B92] shadow-xl text-gray-300 overflow-x-clip break-words">
                
                <SocialShareRibbon />

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <Info className="text-[#e67e22]" /> A Luta que Promete Agitar o Octógono
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                <p className="mb-6 leading-relaxed">
                  O UFC Fight Night de 16 de maio de 2026 traz um confronto eletrizante na divisão peso-palha entre <strong>Nicolle Caliari</strong>, do Brasil, e <strong>Shauna Bannon</strong>, da Irlanda. 
                </p>
                <p className="mb-8 leading-relaxed">
                  Este artigo analisa a luta de forma equilibrada, apresentando dados técnicos e estatísticas para quem deseja compreender melhor o evento. Lembramos que apostas são entretenimento, nunca renda.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <User className="text-[#e67e22]" /> Quem São os Lutadores: Perfis Técnicos e Histórico
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>

                <h3 className="text-xl font-bold text-[#e67e22] mb-4">Nicolle Caliari: A Agressividade Brasileira</h3>
                <p className="mb-4 leading-relaxed">
                  Nicolle Caliari, com 29 anos e 160 cm de altura, chega ao confronto com um cartel de 8 vitórias e 3 derrotas. 
                </p>
                <p className="mb-4 leading-relaxed">
                  A lutadora brasileira se destaca pela ofensiva agressiva e pela capacidade de finalização, especialmente por submissão.
                </p>
                <p className="mb-4 leading-relaxed">
                  Suas últimas três lutas resultaram em vitórias por diferentes métodos: submissão, decisão dividida e TKO, demonstrando versatilidade técnica. 
                </p>
                <p className="mb-6 leading-relaxed">
                  Em termos de estatísticas, Caliari conecta em média 9,9 golpes significativos a cada 35 tentativas, resultando em uma taxa de acerto de aproximadamente 28,3%. 
                </p>
                <p className="mb-8 leading-relaxed border-l-4 border-[#e67e22] pl-4 bg-[#0A051A] py-2">
                  Seus golpes se distribuem entre cabeça (5,4 por round), corpo (2,7) e pernas (1,7). No grappling, ela registra uma média de 1 acerto em 1 tentativa de submissão, indicando eficiência nessa área.
                </p>

                <h3 className="text-xl font-bold text-[#e67e22] mb-4">Shauna Bannon: A Experiência Irlandesa com Controle de Luta</h3>
                <p className="mb-4 leading-relaxed">
                  Shauna Bannon, aos 32 anos com 165 cm de altura, apresenta um cartel impressionante de 7 vitórias e apenas 1 derrota. 
                </p>
                <p className="mb-4 leading-relaxed">
                  A lutadora irlandesa é conhecida por seu controle de luta superior e grappling técnico. 
                </p>
                <p className="mb-6 leading-relaxed">
                  Suas últimas três lutas foram todas vitórias, duas por submissão e uma por decisão dividida, mostrando consistência em diferentes cenários.
                </p>
                <p className="mb-6 leading-relaxed">
                  Bannon se destaca nas estatísticas com média de 18,3 acertos significativos a cada 48,8 tentativas, representando uma taxa de acerto de 37,5%. 
                </p>
                <p className="mb-8 leading-relaxed border-l-4 border-[#50C0CC] pl-4 bg-[#0A051A] py-2">
                  Seus golpes se concentram em cabeça (7,9 por round), corpo (7,6) e pernas (2,8). No aspecto de derrubadas, ela registra 3,7 acertos em 9,3 tentativas, demonstrando força no wrestling e controle de posição.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <Trophy className="text-[#e67e22]" /> Análise Comparativa: Estatísticas que Definem o Confronto
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>
                
                <div className="mb-10">
                  <img 
                    src="/assets/articles/infograficos/tabela_comparativa_caliari_bannon.jpg" 
                    alt="Tabela Comparativa Nicolle Caliari vs. Shauna Bannon" 
                    className="w-full rounded-xl border border-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2 font-mono">Comparativo de Estatísticas de Luta</p>
                </div>

                <div className="overflow-x-auto mb-8 border border-gray-800 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-white uppercase bg-[#0A051A]">
                      <tr>
                        <th className="px-6 py-4 rounded-tl-lg">Aspecto</th>
                        <th className="px-6 py-4 text-[#50C0CC]">Nicolle Caliari</th>
                        <th className="px-6 py-4 text-[#e67e22] rounded-tr-lg">Shauna Bannon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      <tr className="bg-[#1A0D35]">
                        <td className="px-6 py-4 font-bold text-white">Cartel</td>
                        <td className="px-6 py-4">8-3-0</td>
                        <td className="px-6 py-4">7-1-0</td>
                      </tr>
                      <tr className="bg-[#140a2b]">
                        <td className="px-6 py-4 font-bold text-white">Idade</td>
                        <td className="px-6 py-4">29 anos</td>
                        <td className="px-6 py-4">32 anos</td>
                      </tr>
                      <tr className="bg-[#1A0D35]">
                        <td className="px-6 py-4 font-bold text-white">Altura</td>
                        <td className="px-6 py-4">160 cm</td>
                        <td className="px-6 py-4">165 cm</td>
                      </tr>
                      <tr className="bg-[#140a2b]">
                        <td className="px-6 py-4 font-bold text-white">Taxa de Acerto</td>
                        <td className="px-6 py-4">28,3%</td>
                        <td className="px-6 py-4">37,5%</td>
                      </tr>
                      <tr className="bg-[#1A0D35]">
                        <td className="px-6 py-4 font-bold text-white">Golpes por Round</td>
                        <td className="px-6 py-4">9,9/35</td>
                        <td className="px-6 py-4">18,3/48,8</td>
                      </tr>
                      <tr className="bg-[#140a2b]">
                        <td className="px-6 py-4 font-bold text-white">Derrubadas por 15 min</td>
                        <td className="px-6 py-4">0/0,5</td>
                        <td className="px-6 py-4">3,7/9,3</td>
                      </tr>
                      <tr className="bg-[#1A0D35]">
                        <td className="px-6 py-4 font-bold text-white">Submissões por 15 min</td>
                        <td className="px-6 py-4">1/1</td>
                        <td className="px-6 py-4">0,5/0,5</td>
                      </tr>
                      <tr className="bg-[#140a2b]">
                        <td className="px-6 py-4 font-bold text-white rounded-bl-lg">Controle de Posição</td>
                        <td className="px-6 py-4">2:21/5:08</td>
                        <td className="px-6 py-4 rounded-br-lg">3:24/12:06</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-8 leading-relaxed">
                  A tabela acima revela diferenças significativas entre as lutadoras. Bannon apresenta volume de golpes superior, maior taxa de acerto e domínio claro no wrestling. Caliari, por sua vez, se destaca na eficiência de submissões e agressividade ofensiva.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <ShieldCheck className="text-[#e67e22]" /> Palpites e Estratégias de Aposta
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>

                <div className="mb-10">
                  <img 
                    src="/assets/articles/infograficos/odds_e_palpites_caliari_bannon.jpg" 
                    alt="Odds e Palpites de Apostas UFC" 
                    className="w-full rounded-xl border border-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2 font-mono">Consenso de Tipsters e Odds Iniciais</p>
                </div>

                <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4 border-l-4 border-l-[#e67e22] bg-[#0A051A]/80">
  <h3 className="text-white font-bold text-lg mb-3">Palpite Principal: Vencedor da Luta - Shauna Bannon</h3>
  <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
    <p></p>
    <p></p>
    <p></p>
  </div>
</div>
                <div className="bg-[#0A051A] p-4 rounded-xl border border-[#311B92] mb-6">
                  <p className="text-sm">Ao considerar esta aposta, leve em conta que Bannon tem vantagem técnica, mas Caliari possui potencial para virar o jogo em momentos específicos.</p>
                </div>

                <h3 className="text-xl font-bold text-[#e67e22] mb-4">Método da Vitória</h3>
                <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">
                  <li><strong>Para Shauna Bannon:</strong> Uma vitória por decisão é o cenário mais provável, considerando seu controle de luta e volume de golpes.</li>
                  <li><strong>Para Nicolle Caliari:</strong> Uma finalização por submissão ou TKO é mais provável, dada sua agressividade e eficiência em finalizações.</li>
                </ul>

                <h3 className="text-xl font-bold text-[#e67e22] mb-4">Total de Rounds (Over/Under)</h3>
                <p className="mb-4 leading-relaxed">
                  Este mercado depende do ritmo que as lutadoras impõem. Bannon tende a controlar e estender a luta, enquanto Caliari busca finalizações rápidas. 
                </p>
                <p className="mb-4 leading-relaxed">
                  Um Over 2,5 rounds pode ser interessante se você acredita que Bannon controlará e a luta se estenderá. 
                </p>
                <p className="mb-8 leading-relaxed">
                  Um Under 2,5 rounds seria a escolha se você prevê uma finalização rápida de Caliari.
                </p>

                <div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <LinkIcon className="text-[#e67e22]" /> Onde Apostar: Plataformas Autorizadas e Seguras
                </h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>

                <div className="mb-10">
                  <img 
                    src="/assets/articles/infograficos/plataformas_afiliadas_caliari_bannon.jpg" 
                    alt="Plataformas Afiliadas e Jogo Responsável" 
                    className="w-full rounded-xl border border-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2 font-mono">Lottoland, Sorte Online e Recursos de Segurança</p>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">Lottoland: Variedade de Mercados e Segurança</h3>
                <p className="mb-4 leading-relaxed">
                  A Lottoland é uma plataforma licenciada conforme a Portaria SPA/MF nº 259, de 7 de fevereiro de 2025. 
                </p>
                <p className="mb-4 leading-relaxed">
                  Oferece diversos mercados para apostas esportivas, incluindo MMA, com métodos de pagamento como Pix, transferência bancária e carteiras virtuais. 
                </p>
                <p className="mb-6 leading-relaxed">
                  A plataforma prioriza a segurança dos dados e oferece suporte em português.
                </p>

                <h3 className="text-xl font-bold text-white mb-4">Sorte Online: Interface Intuitiva e Suporte Local</h3>
                <p className="mb-4 leading-relaxed">
                  A Sorte Online também opera sob licença federal e oferece experiência similar à Lottoland. 
                </p>
                <p className="mb-4 leading-relaxed">
                  Sua interface é intuitiva, facilitando a navegação para encontrar eventos de MMA. 
                </p>
                <p className="mb-8 leading-relaxed">
                  Os métodos de pagamento incluem Pix, permitindo depósitos e saques rápidos.
                </p>

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
