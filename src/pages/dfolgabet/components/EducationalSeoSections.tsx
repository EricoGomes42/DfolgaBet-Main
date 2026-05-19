import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: number;
  title: string;
  content: React.ReactNode;
}

export default function EducationalSeoSections() {
  const [openSection, setOpenSection] = useState<number | null>(1); // Leave the first open by default or null

  const toggleSection = (id: number) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections: AccordionItem[] = [
    {
      id: 1,
      title: "Como Funciona o DfolgaBet e Qual é a Nossa Missão?",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Bem-vindo ao DfolgaBet, sua fonte educativa sobre o mercado de apostas esportivas.</p>
          <p>Ao longo do tempo civilizações adotaram o esporte como entretenimento e nós entendemos a paixão dos brasileiros.</p>
          <p>No entanto, o universo das apostas online deve ser sempre encarado com responsabilidade, informação e clareza.</p>
          <p><strong>Nosso escopo de trabalho não visa incentivar o uso de plataformas de jogos de forma irresponsável, mas sim instruir diligentemente o nosso público</strong> sobre quais operadoras provaram ser sérias no mercado, possuem as devidas licenças vigentes de operação e implementam rígidos protocolos de segurança cibernética para resguardar a privacidade do consumidor.</p>
          <p>Acreditamos que o público do DfolgaBet é feito de adultos responsáveis e por isso jamais subestimamos a inteligência dos nossos visitantes.</p>
          <p>Reforçamos com toda a clareza que: <strong>em qualquer atividade de aposta, as perdas e os riscos envolvidos são, sempre, incrivelmente maiores que potenciais ganhos</strong>.</p>
          <p>As empresas envolvidas nessa área possuem amplas e gigantescas vantagens matemáticas em todas as competições.</p>
          <p>Nossas análises de casas, guias em esportes como futebol brasileiro (Série A, Série B), basquete (NBB e NBA), tênis e eSports (como CS:GO), são todas embasadas em estudo para propocionar conhecimento – não com objetivo de passar "uma fórmula secreta para ganhar".</p>
          <p>É de interesse do DfolgaBet que você não enfrente perdas descabidas, sendo crucial apostar <strong>sempre fundos que você está perfeitamente disposto a não ter de volta</strong> e ver isso unicamente como entretenimento ocasional e não uma profissão ou fonte de renda passiva.</p>
        </div>
      )
    },
    {
      id: 2,
      title: "Análises, Dicas Educacionais e Prognósticos Responsáveis",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Muitas pessoas chegam aqui em busca pelo "melhor prognóstico" ou dica do dia.</p>
          <p>Embora existam diversas fontes pela internet que garantam lucro infálivel, a equipe do DfolgaBet garante de antemão: <strong>nenhuma dica é garantida; esportes dependem muito de sorte e aleatoriedade</strong>. O que nós oferecemos são <em>análises embasadas</em>.</p>
          <p>O que significa isso? Embasar palpites significa checar, por horas e horas, dados, times, suspensões ou mesmo características das competições locais.</p>
          <p>Verificamos dados como o desempenho do mandante versus visitante, por exemplo, na Copa do Brasil ou Liga dos Campeões da Europa e condensamos em nosso portal.</p>
          <p>Fazemos isso de modo analítico focado em 1x2 (resultado final), over/under de gols e outros mercados para te auxiliar a tomar uma decisão mais consciente e nunca agir ou apostar apenas por impulsividade.</p>
          <p>Nossos especialistas têm ampla cobertura nos principais torneios do mundo, como Brasileirão (Séries A, B e C), Copa Libertadores da América, Premier League, entre outros.</p>
          <p>Reforçamos contudo que, até o mais improvável time do campeonato pode e por vezes irá surpreender. Nossos leitores se preparam também para <strong>apostar e saber desistir (cashout)</strong> em vez de seguir com palpites mal planejados.</p>
        </div>
      )
    },
    {
      id: 3,
      title: "Riscos Graves, Saúde Mental e Cuidado Familiar (IBJR, JA)",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>É imprescindível entender que o excesso de estímulos nas apostas esportivas tem o potencial de tornar-se um vício pesado e muito nocivo para a própria pessoa e toda a sua base familiar.</p>
          <p><strong>Entenda que quando o hábito de apostar deixa de ser uma diversão de fim de semana controlada, ele passa a ser um problema de saúde mental que causa estragos.</strong></p>
          <p>Não tente cobrir "apenas mais uma aposta para recuperar a anterior".</p>
          <p>Se você vem lidando com perda contínua de limite de banca, aumento da irritabilidade, tem escondido da família, utilizado dinheiro indevido ou deixado o tempo de apostas impactar negativamente no seu trabalho – PARE AGORA!</p>
          <p>As próprias casas e as entidades públicas dispõem de sistemas de autoexclusão. Faça questão de acioná-los em caso de alerta.</p>
          <p>A DfolgaBet lembra a todos que a ajuda existe e possui total respeito por sua vida.</p>
          <p>Organizações fundamentais como o <strong>Instituto Brasileiro de Jogo Responsável (IBJR)</strong>, portal dos <strong>Jogadores Anônimos (grupojaonline.com.br)</strong> e o site britânico com acessibilidade mundial <strong>Gambling Therapy</strong> atuam diretamente sem tabus na ajuda à pessoa adicta.</p>
          <p>Entenda: o mercado de apostas legalizado trabalha ativamente no suporte para remover usuários vulneráveis de risco real aos cassinos e bancas de esportes.</p>
        </div>
      )
    }
  ];

  return (
    <div className="mt-8 mb-0">
      <div className="bg-[#1A0D35] border border-[#311B92] rounded-2xl overflow-hidden shadow-lg">
        {sections.map((section, index) => (
          <div 
            key={section.id}
            className={`${index !== sections.length - 1 ? 'border-b border-[#311B92]/50' : ''}`}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#50C0CC]/50 transition-colors hover:bg-white/[0.02]"
              aria-expanded={openSection === section.id}
            >
              <h3 className="text-xl md:text-2xl font-black text-white">{section.title}</h3>
              <ChevronDown 
                className={`text-[#50C0CC] w-6 h-6 transition-transform duration-300 flex-shrink-0 ${openSection === section.id ? 'rotate-180' : ''}`}
              />
            </button>
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openSection === section.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-sm md:text-base leading-relaxed bg-black/20">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
