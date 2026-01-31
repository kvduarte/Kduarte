"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [petals, setPetals] = useState<any[]>([]);

  const goldFilter = { filter: "invert(73%) sepia(46%) saturate(542%) hue-rotate(1deg) brightness(95%) contrast(91%)" };

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

  // Correção de tipagem usando 'as const'
  const listVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  } as const;

  const itemVariants = {
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring" as const, stiffness: 100 } 
    },
    closed: { opacity: 0, x: 40 }
  } as const;

  return (
    <main className="min-h-dvh bg-[#0a0a0a] bg-linear-to-b from-[#4e0b0e] via-[#1a0809] to-black relative overflow-hidden font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* CAMADA DE PÉTALAS (Z-50 e pointer-events-auto para interatividade total) */}
      <div className="absolute inset-0 pointer-events-none z-50">
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
                x: { type: "spring" as const, stiffness: 40, damping: 15 } 
              }}
              onMouseEnter={() => movePetal(petal.id)}
              className="absolute pointer-events-auto"
              style={{ width: petal.size, ...goldFilter }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-16 py-8 z-100">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-24 md:w-32 cursor-pointer group">
          <img src="/k.svg" alt="Logo" className="w-full h-auto invert opacity-80 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        <div className="relative flex items-center" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
          <AnimatePresence>
            {!menuOpen && (
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
            className="w-14 h-14 md:w-20 md:h-20 z-50 relative drop-shadow-2xl"
            style={goldFilter}
          >
            <img src="/liriop.svg" alt="Menu" className="w-full h-full" />
          </motion.button>

          <motion.div
            initial={{ x: "100%" }}
            animate={menuOpen ? { x: 0 } : { x: "100%" }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
            className="fixed top-0 right-0 h-screen w-full max-w-87 bg-black/40 backdrop-blur-[20px] border-l border-white/5 flex flex-col items-center justify-center z-40"
          >
            <motion.ul variants={listVariants} initial="closed" animate={menuOpen ? "open" : "closed"} className="flex flex-col gap-8 text-white font-light uppercase text-2xl tracking-[0.3em]">
              {["Kamylle", "Projetos", "Skills", "Contato"].map((item) => (
                <motion.li key={item} variants={itemVariants} whileHover={{ x: -10, color: "#D4AF37" }} onClick={() => setMenuOpen(false)} className="cursor-pointer transition-colors">
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="absolute bottom-10 text-[9px] text-white/20 tracking-[0.5em] uppercase">© 2026 KDuarte Portfolio</div>
          </motion.div>
        </div>
      </nav>

      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <h1 className="text-6xl md:text-[6rem] font-bold mb-6 leading-[0.9] tracking-tighter text-white">
            Soluções digitais com <br /> 
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
              className="bg-clip-text text-transparent bg-linear-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]"
            >
              personalidade
            </motion.span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light">
            Desenvolvo sistemas robustos e interfaces sob medida que elevam o padrão digital da sua <span className="text-white font-normal italic">Marca.</span> 
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#D4AF37", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-12 py-5 border border-[#D4AF37]/40 text-[#D4AF37] transition-all duration-300 rounded-full text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            Conhecer Projetos
          </motion.button>
        </motion.div>
      </section>

      {/* BACKGROUND LOGOS */}
      <div className="absolute top-0 right-[-5%] h-full flex flex-col invert justify-center items-end gap-2 pointer-events-none select-none opacity-[0.05]">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.img key={i} src="/k.svg" style={{ filter: `blur(${1 + i * 4}px)` }} className="hidden md:block w-120 h-auto" />
        ))}
      </div>
    </main>
  );
}