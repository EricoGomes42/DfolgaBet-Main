import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Send, X, MessageSquare, Mail, User, Phone, CheckCircle2, Upload, Briefcase, FileText } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function DfolgaBetFooter() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
    
    setFormStatus('submitting');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setFormStatus('success');
      setTimeout(() => {
        setIsContactModalOpen(false);
        setFormStatus('idle');
      }, 3000);
    } catch (err) {
      console.error(err);
      setFormStatus('idle');
    }
  };

  const handleSubmitCareer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setFormStatus('submitting');
    try {
      await fetch('/api/careers', {
        method: 'POST',
        body: formData, // FormData handles files automatically with correct multipart/form-data
      });
      setFormStatus('success');
      setTimeout(() => {
        setIsCareerModalOpen(false);
        setFormStatus('idle');
      }, 3000);
    } catch (err) {
      console.error(err);
      setFormStatus('idle');
    }
  };

  return (
    <footer className="bg-[#0A051A] text-white pt-[64px] pb-8 border-t border-[#1A0D35] ml-0 pl-0 -mt-[39px]">
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img 
                src="/assets/dfolgabet-oficial.png" 
                alt="DfolgaBet Logo" 
                className="object-contain transition-transform hover:scale-105 duration-300"
                style={{ marginRight: '4px', marginLeft: '-7px', paddingBottom: '0px', paddingRight: '13px', paddingTop: '0px', marginBottom: '22px', marginTop: '-72px', height: '159px', width: '255px' }}
              />
            </Link>
            <p className="-mt-[67px] text-gray-400 text-sm leading-relaxed max-w-md">
              O DfolgaBet é o seu guia definitivo de apostas esportivas. Nosso principal intuito é conduzir nossos usuários para casas de apostas legalizadas e seguras, sempre deixando claro os riscos envolvidos e disponibilizando acesso às principais entidades de ajuda ao jogo compulsivo.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-[#50C0CC]">Navegação</h4>
            <ul className="space-y-4 text-sm text-gray-300 font-medium">
              <li><Link to="/casas-de-apostas" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Melhores Casas</Link></li>
              <li><Link to="/bonus" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Bônus e Ofertas</Link></li>
              <li><Link to="/prognosticos" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Prognósticos</Link></li>
              <li><Link to="/dicas" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Dicas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-[#50C0CC]">Institucional</h4>
            <ul className="space-y-4 text-sm text-gray-300 font-medium">
              <li><Link to="/sobre" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Sobre o DfolgaBet</Link></li>
              <li><button onClick={() => setIsContactModalOpen(true)} className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-left cursor-pointer">Fale com a gente</button></li>
              <li><button onClick={() => setIsCareerModalOpen(true)} className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-left cursor-pointer">Trabalhe Conosco</button></li>
              <li><a href="/studio" target="_blank" rel="noopener noreferrer" className="hover:text-[#50C0CC] hover:translate-x-1 inline-block transition-all duration-300 flex items-center gap-2">Área do Colaborador</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-[#50C0CC]">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-300 font-medium">
              <li><Link to="/dfolgabet/jogo-responsavel" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Jogo Responsável</Link></li>
              <li><Link to="/dfolgabet/restricoes-apostadores" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Restrições de Apostadores</Link></li>
              <li><Link to="/dfolgabet/termos-e-condicoes" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Termos e Condições</Link></li>
              <li><Link to="/dfolgabet/politica-de-privacidade" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimers & Responsible Gaming */}
        <div className="border-t border-gray-800/60 pt-8 pb-8 flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-6 justify-center flex-wrap">
            <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-300 font-black text-[16px] shadow-[0_0_15px_rgba(80,192,204,0.1)] hover:border-[#50C0CC] hover:text-[#50C0CC] transition-colors duration-300">
              18+
            </div>
            <a href="https://gamblingtherapy.org/pt-br/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/assets/gambling%20terapy.jpg" alt="Gambling Therapy" className="h-[28px] object-contain rounded-sm" />
            </a>
            <a href="https://www.grupojaonline.com.br/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/assets/JA-400__1_.jpg" alt="Jogadores Anônimos" className="h-[28px] object-contain rounded-sm" />
            </a>
            <a href="https://ibjr.org/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/assets/logo-completo-IBJR.png" alt="Instituto Brasileiro de Jogo Responsável" className="h-[22px] object-contain brightness-0 invert" />
            </a>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 text-[11px] md:text-xs text-gray-500 font-medium leading-relaxed">
            <p>
              <strong className="text-gray-400">Aviso Legal:</strong> Ao utilizar este site, você concorda que leu e aceitou nossos Termos de Uso e nossa Política de Privacidade. O DfolgaBet atua de maneira 100% independente, publicando conteúdos educativos, análises e guias sobre sites de apostas. Não somos controlados por nenhuma casa de apostas, cassino online ou operador de jogos de azar. É estritamente proibida a reprodução do conteúdo desta página sem autorização prévia por escrito.
            </p>
            <p>
              <strong className="text-gray-400">Transparência:</strong> Embora o DfolgaBet possua modelos de afiliação e receba comissões quando nossos leitores se cadastram através de alguns banners ou links, nosso maior compromisso será sempre com a sua educação. O principal intuito da nossa plataforma não é empurrar o usuário ao jogo sem critérios, mas sim oferecer o máximo de esclarecimento, análises isentas e visões realistas. Acreditamos que um jogador consciente e focado em entretenimento seguro é fundamental para um mercado mais justo.
            </p>
            <p>
              <strong className="text-gray-400">O DfolgaBet NÃO é uma casa de apostas e NÃO aceita apostas reais nem organiza jogos remunerados.</strong>
            </p>
            <p>
              Este site é destinado unicamente a pessoas maiores de 18 anos. Jogue com responsabilidade. Apostas esportivas são atividades de lazer que envolvem alto risco financeiro; o risco de perda é sempre, matematicamente, maior do que a chance de ganho. Apostas jamais devem ser vistas como fonte de renda, profissão ou forma de resolver problemas financeiros. As casas analisadas e direcionadas estão ou operam visando total adequação ao mercado regulado.
            </p>
            <p>
              Caso sinta que o jogo deixou de ser diversão e precisa de ajuda, saiba que o vício em jogos é uma doença séria e tem tratamento. Entre em contato com as principais entidades de escuta e saúde mental com atendimento gratuito no mercado: <a href="https://gamblingtherapy.org/pt-br/" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:underline" title="Gambling Therapy" aria-label="Acessar Gambling Therapy">Gambling Therapy</a>, <a href="https://www.cvv.org.br/" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:underline" title="CVV - Centro de Valorização da Vida" aria-label="Acessar CVV">CVV (188)</a>, <a href="https://www.grupojaonline.com.br/" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:underline" title="Jogadores Anônimos" aria-label="Acessar Jogadores Anônimos">Jogadores Anônimos</a> ou informações pelo <a href="https://ibjr.org/" target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:underline" title="Instituto Brasileiro de Jogo Responsável" aria-label="Acessar IBJR">Instituto Brasileiro de Jogo Responsável (IBJR)</a>. Promovemos ecossistemas licenciados pela Secretaria de Prêmios e Apostas (SPA/MF).
            </p>
            <p>
              Nossa equipe fornece prognósticos e dados esportivos buscando orientar o leitor de forma informativa e educacional. Apesar dessas análises representarem a opinião de profissionais de nossa equipe, as informações sobre partidas, resultados ou expectativas jamais devem ser seguidas de forma cega, pois o mundo esportivo é imprevisível. Nossas publicações não têm garantia de ganho ou à prova de erros. Cabe a você ser responsável por suas ações dentro de sites terceiros.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800/60 pt-6 pb-6 flex flex-col items-center justify-center gap-2">
          <p className="text-xs text-gray-500 font-medium text-center">
            © {new Date().getFullYear()} DfolgaBet por ecKOay  |  CNPJ: 13.422.426/0001-85 |  Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500 font-medium text-center">
             Proibido para menores de 18 anos. Jogue com responsabilidade.
          </p>
        </div>
      </div>

      {/* Advanced Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
              animate={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
              exit={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsContactModalOpen(false)}
            />
            
            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#080214] border border-[#311B92] rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left Side: Branding & Info */}
              <div className="w-full md:w-[40%] bg-gradient-to-br from-[#1A0D35] to-[#0A051A] border-r border-[#311B92] p-8 flex flex-col items-start justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#50C0CC]/10 blur-3xl rounded-full" />
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-[#50C0CC]/10 border border-[#50C0CC]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(80,192,204,0.2)]">
                    <MessageSquare className="text-[#50C0CC]" size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Fale Conosco</h3>
                  <p className="text-[#b0b0b0] text-sm leading-relaxed mb-6">Estamos prontos para ouvir sua opinião, tirar dúvidas comerciais ou discutir parcerias premium.</p>
                </div>
              </div>

              {/* Right Side: Smart Form */}
              <div className="w-full md:w-[60%] p-8 relative">
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors bg-[#1A0D35] p-2 rounded-full border border-gray-800"
                >
                  <X size={16} />
                </button>

                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h4>
                    <p className="text-gray-400 text-sm">Recebemos seu contato com sucesso. Nossa equipe retornará no menor tempo possível.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitContact} className="space-y-4 pt-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={16} className="text-gray-500 group-focus-within:text-[#50C0CC] transition-colors" />
                      </div>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Nome Completo" 
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-[#120826] border border-gray-800 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#50C0CC] focus:ring-1 focus:ring-[#50C0CC] transition-all disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-500 group-focus-within:text-[#50C0CC] transition-colors" />
                      </div>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="E-mail Profissional" 
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-[#120826] border border-gray-800 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#50C0CC] focus:ring-1 focus:ring-[#50C0CC] transition-all disabled:opacity-50"
                      />
                    </div>

                    <div className="relative group">
                      <select 
                        required
                        name="subject"
                        defaultValue=""
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-[#120826] border border-gray-800 text-gray-300 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-[#50C0CC] focus:ring-1 focus:ring-[#50C0CC] transition-all appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="" disabled>Assunto do Contato</option>
                        <option value="duvida">Dúvida Geral</option>
                        <option value="parcerias">Parcerias</option>
                        <option value="parceria">Parceria Comercial</option>
                        <option value="sugestao">Sugestão de Pauta</option>
                        <option value="suporte">Suporte Técnico</option>
                        <option value="outro">Outro Assunto</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>

                    <div className="relative group">
                      <textarea 
                        required
                        name="message"
                        placeholder="Sua Mensagem..." 
                        rows={4}
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-[#120826] border border-gray-800 text-white text-sm rounded-xl py-3 px-4 resize-none focus:outline-none focus:border-[#50C0CC] focus:ring-1 focus:ring-[#50C0CC] transition-all disabled:opacity-50"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-gradient-to-r from-[#50C0CC] to-[#3caab6] hover:from-[#3caab6] hover:to-[#2e8c96] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[0_0_15px_rgba(80,192,204,0.4)] disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <>Processando...</>
                      ) : (
                        <>Enviar Mensagem <Send size={16} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Career Modal (Trabalhe Conosco) */}
      <AnimatePresence>
        {isCareerModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
              animate={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
              exit={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsCareerModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#080214] border border-[#311B92] rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-[40%] bg-gradient-to-br from-[#1A0D35] to-[#0A051A] border-r border-[#311B92] p-8 flex flex-col items-start justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F37021]/10 blur-3xl rounded-full" />
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-[#F37021]/10 border border-[#F37021]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(243,112,33,0.2)]">
                    <Briefcase className="text-[#F37021]" size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Trabalhe Conosco</h3>
                  <p className="text-[#b0b0b0] text-sm leading-relaxed mb-6">Venha fazer parte da maior equipe de especialistas em iGaming do Brasil.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 uppercase font-black tracking-widest">
                       Formatos aceitos
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {['PDF', 'JPG', 'PNG', 'DOCX'].map(ext => (
                         <span key={ext} className="px-2 py-1 bg-[#1A0D35] border border-[#311B92] rounded text-[10px] text-white font-bold">{ext}</span>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[60%] p-8 relative">
                <button 
                  onClick={() => setIsCareerModalOpen(false)}
                  className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors bg-[#1A0D35] p-2 rounded-full border border-gray-800"
                >
                  <X size={16} />
                </button>

                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Candidatura Enviada!</h4>
                    <p className="text-gray-400 text-sm">Boa sorte! Seus dados foram salvos e nosso RH analisará seu perfil com prioridade.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitCareer} className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User size={16} className="text-gray-500 group-focus-within:text-[#50C0CC] transition-colors" />
                        </div>
                        <input name="name" required type="text" placeholder="Nome Completo" disabled={formStatus === 'submitting'} className="w-full bg-[#120826] border border-gray-800 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#50C0CC] transition-all" />
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail size={16} className="text-gray-500 group-focus-within:text-[#50C0CC] transition-colors" />
                        </div>
                        <input name="email" required type="email" placeholder="Seu Melhor E-mail" disabled={formStatus === 'submitting'} className="w-full bg-[#120826] border border-gray-800 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#50C0CC] transition-all" />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <select name="position" required defaultValue="" disabled={formStatus === 'submitting'} className="w-full bg-[#120826] border border-gray-800 text-gray-300 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-[#50C0CC] transition-all appearance-none cursor-pointer">
                        <option value="" disabled>Selecione a Vaga</option>
                        <option value="copywriter">Copywriter / Redator</option>
                        <option value="editor">Editor de Vídeo</option>
                        <option value="designer">Designer Gráfico</option>
                        <option value="gestor">Gestor de Tráfego</option>
                        <option value="moderador">Moderador de Comunidade</option>
                        <option value="outro">Candidatura Espontânea</option>
                      </select>
                    </div>

                    <div className="relative group">
                      <textarea name="message" required placeholder="Fale um pouco sobre você..." rows={3} disabled={formStatus === 'submitting'} className="w-full bg-[#120826] border border-gray-800 text-white text-sm rounded-xl py-3 px-4 resize-none focus:outline-none focus:border-[#50C0CC] transition-all"></textarea>
                    </div>

                    <div className="relative group">
                      <label className="block w-full cursor-pointer">
                        <div className="flex items-center justify-between bg-[#120826] border border-dashed border-gray-700 hover:border-[#50C0CC] rounded-xl py-4 px-4 transition-all">
                           <div className="flex items-center gap-3">
                              <Upload size={20} className="text-[#50C0CC]" />
                              <span className="text-gray-400 text-xs font-medium">Anexar Currículo</span>
                           </div>
                           <span className="text-[10px] text-gray-500 italic">PDF, DOCX, JPG, PNG</span>
                        </div>
                        <input name="resume" required type="file" accept=".pdf,.docx,.jpg,.jpeg,.png" className="hidden" />
                      </label>
                    </div>

                    <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-gradient-to-r from-[#F37021] to-[#e67e22] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:brightness-110 disabled:opacity-50">
                      {formStatus === 'submitting' ? 'Enviando Candidatura...' : 'Enviar Currículo'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
