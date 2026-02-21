"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

/* easing bezier tipado corretamente */
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Showcase() {
  const [showBackgroundK, setShowBackgroundK] = useState(true);

  /* esconder marca d'água ao scroll */
  useEffect(() => {
    const handleScroll = () => {
      setShowBackgroundK(window.scrollY <= 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOutExpo,
      },
    },
  };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden"
      style={{
        background: "radial-gradient(circle at 0% 100%, #4a0404 20%, #1a0202 80%, #000000 100%)",
        backgroundColor: "#1a0202",
      }}
    >
      {/* LOGO K FUNDO */}
      <AnimatePresence>
        {showBackgroundK && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          >
            <div className="absolute top-0 right-[-5%] h-full flex flex-col invert justify-center items-end pr-10">
              {[...Array(6)].map((_, i) => (
                <img
                  key={i}
                  src="/k.svg"
                  alt=""
                  style={{ filter: `blur(${1 + i * 4}px)` }}
                  className="hidden md:block w-120 h-auto"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTEÚDO */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-24 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            /* Voltamos para o leading apertado [0.9] que você gosta */
            className="text-[11vw] md:text-[6.0rem] font-bold mb-6 leading-[0.9] tracking-tight text-white font-sans"
          >
            Soluções digitais com <br />
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
              /* py-4: Garante que o topo do 'p' respire dentro da área do gradiente.
                 -my-4: Compensa o padding acima para as linhas não se afastarem visualmente.
              */
              className="bg-clip-text text-transparent bg-linear-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] font-playfair italic font-medium inline-block py-4 -my-4 px-1"
            >
              personalidade
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed font-light mb-12"
          >
            Desenvolvo sistemas robustos e interfaces sob medida que elevam o padrão digital da sua
            <span className="text-white font-playfair italic ml-2 relative inline-block">
              Marca.
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#D4AF37]/30"></span>
            </span>
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="#projetos">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  letterSpacing: "0.5em",
                  backgroundColor: "rgba(212, 175, 55, 0.08)",
                  borderColor: "rgba(212, 175, 55, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 border border-[#D4AF37]/90 text-[#D4AF37] rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 backdrop-blur-sm"
              >
                Conhecer Projetos
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}