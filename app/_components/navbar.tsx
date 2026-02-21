"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [petals, setPetals] = useState<any[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const goldFilter = { filter: "invert(73%) sepia(46%) saturate(542%) hue-rotate(1deg) brightness(95%) contrast(91%)" };

  // Detecta scroll para alternar entre Logo e Botão Seta
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para scroll suave e fechar menu
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
    handleLinkClick();
  };

  const dropPetal = useCallback(() => {
    const id = Date.now() + Math.random();
    const newPetal = {
      id,
      x: Math.random() * 95,
      rotate: Math.random() * 360,
      size: Math.random() * 15 + 10,
      drift: (Math.random() - 0.5) * 10,
      duration: Math.random() * 2 + 4,
      extraOffset: 0,
    };
    setPetals((prev) => [...prev, newPetal].slice(-50));
  }, []);

  const movePetal = (id: number) => {
    setPetals((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, extraOffset: p.extraOffset + (Math.random() > 0.5 ? 12 : -12) } : p
      )
    );
  };

  useEffect(() => {
    if (menuOpen) {
      const interval = setInterval(dropPetal, 400);
      return () => clearInterval(interval);
    }
  }, [menuOpen, dropPetal]);

  const handleLinkClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsTransitioning(false);
    }, 800);
  };

  const listVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  } as const;

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
    closed: { opacity: 0, x: 40 }
  } as const;

  return (
    <>
      {/* TRANSIÇÃO ESTILO LIVRO */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#D4AF37] z-[200]"
          />
        )}
      </AnimatePresence>

      {/* CAMADA DE PÉTALAS */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {petals.map((petal) => (
            <motion.img
              key={petal.id}
              src="/petalap.svg"
              initial={{ y: -50, x: `${petal.x}vw`, rotate: petal.rotate, opacity: 0 }}
              animate={{ 
                y: "95vh", 
                x: `${petal.x + petal.drift + petal.extraOffset}vw`,
                opacity: [0, 0.7, 0.7], 
                rotate: petal.rotate + 180 
              }}
              transition={{ 
                y: { duration: petal.duration, ease: "linear" },
                x: { type: "spring", stiffness: 40, damping: 15 } 
              }}
              onMouseEnter={() => movePetal(petal.id)}
              className="absolute pointer-events-auto"
              style={{ width: petal.size, ...goldFilter }}
            />
          ))}
        </AnimatePresence>
      </div>

      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-16 py-8 z-100">
        
        {/* LADO ESQUERDO: LOGO AJUSTADA (Menor e mais transparente) */}
        <div className="z-50">
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              <motion.div key="logo" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Link href="/">
                  {/* Ajustado: w-16 md:w-20 (menor) e opacity-40 (mais transparente) */}
                  <div className="relative w-16 md:w-30 cursor-pointer group">
                    <img 
                      src="/k.svg" 
                      alt="Logo" 
                      className="w-full h-auto invert opacity-40 group-hover:opacity-100 transition-opacity duration-500" 
                    />
                  </div>
                </Link>
              </motion.div>
            ) : (
              <motion.div key="only-arrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group flex items-center justify-center bg-transparent border-none outline-none cursor-pointer p-2"
                >
                  <svg 
                    width="28" height="28" viewBox="0 0 24 24" fill="none" 
                    stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:-translate-x-1.5 transition-transform duration-300 ease-out"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LADO DIREITO: MENU LÍRIO */}
        <div className="relative flex items-center" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
          <AnimatePresence>
            {!menuOpen && !isScrolled && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute right-24 md:right-28 flex items-center gap-3 pointer-events-none">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-bold whitespace-nowrap">Explore aqui</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            animate={menuOpen ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
            transition={menuOpen ? { repeat: Infinity, duration: 2 } : {}}
            className="w-14 h-14 md:w-20 md:h-20 z-50 relative drop-shadow-2xl outline-none"
            style={goldFilter}
          >
            <img src="/liriop.svg" alt="Menu" className="w-full h-full" />
          </motion.button>

          <motion.div
            initial={{ x: "100%" }}
            animate={menuOpen ? { x: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 right-0 h-screen w-full max-w-87 bg-black/40 backdrop-blur-[20px] border-l border-white/5 flex flex-col items-center justify-center z-40"
          >
            <motion.ul variants={listVariants} initial="closed" animate={menuOpen ? "open" : "closed"} className="flex flex-col gap-8 text-white font-light uppercase text-2xl tracking-[0.3em]">
              <motion.li 
                variants={itemVariants} 
                whileHover={{ x: -10, color: "#D4AF37" }} 
                className="cursor-pointer transition-colors"
                onClick={() => scrollToSection("kamylle")}
              >
                Kamylle
              </motion.li>
              {["Projetos", "Skills", "Contato"].map((item) => (
                <motion.li 
                  key={item} 
                  variants={itemVariants} 
                  whileHover={{ x: -10, color: "#D4AF37" }} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="cursor-pointer transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <div className="absolute bottom-10 text-[9px] text-white/20 tracking-[0.5em] uppercase">© 2026 KDuarte Portfolio</div>
          </motion.div>
        </div>
      </nav>
    </>
  );
}