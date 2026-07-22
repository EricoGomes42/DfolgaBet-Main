import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Mail, Send } from 'lucide-react';

const BANNERS = [
  { 
    id: 1, 
    image: '/assets/betting/banners-homepage/banner-homepage-7k.webp', 
    alt: 'Banner 7K',
    link: 'https://go.aff.ana.partners/duv0tr53'
  },
  { 
    id: 2, 
    image: '/assets/betting/banners-homepage/banner-homepage-cassino.webp', 
    alt: 'Banner Cassino',
    link: 'https://go.aff.ana.partners/98a87n1j'
  },
  { 
    id: 3, 
    image: '/assets/betting/banners-homepage/banner-homepage-estrelabet.webp', 
    alt: 'Banner EstrelaBet',
    link: 'https://www.estrelabet.bet.br/cadastro?affid=397074&cxd=mosweqweavlnzdbskfjefrkypxfl'
  },
  { 
    id: 4, 
    image: '/assets/betting/banners-homepage/banner-homepage-verabet.webp', 
    alt: 'Banner VeraBet',
    link: 'https://go.aff.ana.partners/my9l8rcz'
  },
  { 
    id: 5, 
    image: '/assets/betting/banners-homepage/banner-homepage-vupi.webp', 
    alt: 'Banner Vupi',
    link: 'https://go.aff.estrelabetpartners.com/f846xdz3'
  },
];

export default function PromoSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        setSubmitStatus('success');
        setEmail('');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <section className="mt-16 pt-12 border-t border-[#311B92]/30 relative z-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CAROUSEL - 70% (8 cols) */}
        <div className="lg:col-span-8 flex flex-col w-full">
          <div 
            className="grid relative w-full aspect-[1.95/1] rounded-2xl overflow-hidden bg-[#120826] border border-[#311B92]/50 shadow-[0_10px_25px_rgba(0,0,0,0.5)] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="col-start-1 row-start-1 w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    handleNext();
                  } else if (swipe > 10000) {
                    handlePrev();
                  }
                }}
              >
                <a 
                  href={BANNERS[currentSlide].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                >
                  <img 
                    src={BANNERS[currentSlide].image} 
                    alt={BANNERS[currentSlide].alt}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-[#1A0D35] to-[#0A051A] flex items-center justify-center">
                    <span className="text-[#50C0CC]/50 font-black text-2xl md:text-4xl uppercase tracking-widest">
                      {BANNERS[currentSlide].alt}
                    </span>
                  </div>
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0A051A]/80 border border-[#311B92] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#50C0CC] hover:text-[#0A051A] z-10"
              aria-label="Banner anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0A051A]/80 border border-[#311B92] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#50C0CC] hover:text-[#0A051A] z-10"
              aria-label="Próximo banner"
            >
              <ChevronRight size={20} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? 'w-6 bg-[#50C0CC]' 
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Ir para banner ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* NEWSLETTER - 30% (4 cols) */}
        <div className="lg:col-span-4 flex w-full">
          <div className="relative w-full rounded-2xl bg-[#120826] border border-[#311B92]/50 shadow-[0_10px_25px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col overflow-hidden group">
            
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,#e67e22_0%,transparent_70%)] opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[radial-gradient(circle_at_bottom_left,#50C0CC_0%,transparent_70%)] opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center h-full max-w-[280px] mx-auto">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-[#e67e22]/10 flex items-center justify-center border border-[#e67e22]/20">
                  <Mail size={10} className="text-[#e67e22]" />
                </div>
                <span className="text-[#e67e22] font-semibold text-[9px] tracking-[0.15em] uppercase">Newsletter</span>
              </div>
              
              <h3 className="text-[16px] md:text-[18px] font-semibold text-white leading-snug mb-2">
                Receba as Melhores Oportunidades
              </h3>
              
              <p className="text-gray-400 text-[11px] md:text-[12px] mb-6 leading-relaxed">
                Receba promoções, bônus, novos artigos e apostas especiais.
              </p>
              
              <form className="w-full flex flex-col gap-3" onSubmit={handleSubscribe}>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail" 
                    className="w-full bg-[#0A051A]/60 border border-[#311B92]/60 text-white text-[12px] rounded-lg px-4 py-2 outline-none focus:border-[#50C0CC]/80 focus:ring-1 focus:ring-[#50C0CC]/50 transition-all placeholder:text-gray-500/80 text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] h-[38px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-b from-[#e67e22] to-[#d35400] hover:from-[#f39c12] hover:to-[#e67e22] text-white font-medium text-[12px] py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_2px_10px_rgba(230,126,34,0.15)] disabled:opacity-50 disabled:cursor-not-allowed border border-[#f39c12]/20 h-[38px]"
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Cadastrar gratuitamente'}</span>
                  {!isSubmitting && <Send size={12} className="opacity-80" />}
                </button>
                
                <div className="h-[20px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' ? (
                      <motion.p 
                        key="success"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[#50C0CC] text-[10px] font-medium"
                      >
                        Inscrição realizada com sucesso!
                      </motion.p>
                    ) : submitStatus === 'error' ? (
                      <motion.p 
                        key="error"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-[10px] font-medium"
                      >
                        Erro ao inscrever. Tente novamente.
                      </motion.p>
                    ) : (
                      <motion.p 
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-[9px] text-gray-500/80 font-normal"
                      >
                        Sem spam. Você poderá cancelar quando quiser.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
