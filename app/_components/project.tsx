"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Alpha Consultoria",
    category: "Business Strategy",
    year: "2024",
    image: "/alpha.png",
    description: "Transformando desafios em oportunidades com foco em crescimento sólido e resultados mensuráveis.",
    link: "https://www.consultoriaalpha.com.br/"
  },
  {
    id: 2,
    title: "CIC Contabilidade",
    category: "Financial Design",
    year: "2024",
    image: "/cic.png",
    description: "Sistema de contabilidade moderno focado em gestão inteligente e transparência fiscal.",
    link: "https://ciccontabilidadebrasil.com.br/"
  },
  {
    id: 3,
    title: "KDuarte Portfólio",
    category: "Luxury Web Design",
    year: "2024",
    image: "/port.png",
    description: "Interface imersiva focada em micro-interações, tipografia refinada e experiência de luxo.",
    link: "#"
  }
];

export default function Projetos() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="projetos" 
      className="relative h-screen w-full flex flex-col justify-center px-4 md:px-12 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 0% 100%, #4a0404 20%, #1a0202 80%, #000000 100%)",
        backgroundColor: "#1a0202",
      }}
    >
      
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-[-5%] text-[18vw] font-black text-white/3 uppercase select-none leading-none italic">
          Works
        </div>
      </div>

      {/* Aumentei o max-w para 100% (full) para os cards expandirem mais */}
      <div className="max-w-[100%] mx-auto w-full relative z-10">
        
        {/* Cabeçalho alinhado com a nova largura */}
        <div className="mb-10 md:mb-12 px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-1 w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] uppercase tracking-[0.5em] text-[10px] font-bold">
              Portfolio Selecionado
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.85]"
          >
            Projetos <br />
            <span className="font-playfair italic font-light text-[#D4AF37] lowercase ml-0 md:ml-24">
              em destaque.
            </span>
          </motion.h2>
        </div>

        {/* AJUSTES DE LARGURA:
            1. Troquei gap-8 por gap-4 (cards ficam mais próximos e largos).
            2. px-4 md:px-12 no container pai para os cards chegarem mais perto da borda da tela.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-12 md:h-[55vh]">
          {projects.map((project, index) => (
            <Link key={project.id} href={project.link} target="_blank" className="h-full">
              <motion.div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group cursor-pointer h-[400px] md:h-full overflow-hidden rounded-xl border border-white/5 bg-zinc-950/40 shadow-2xl transition-all duration-700 hover:border-[#D4AF37]/30"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                {/* Imagem */}
                <div className="absolute inset-0 z-0">
                  <motion.img 
                    src={project.image}
                    alt={project.title}
                    animate={{ 
                      scale: hoveredIndex === index ? 1.05 : 1,
                      filter: hoveredIndex === index 
                        ? "grayscale(0%) brightness(0.6) contrast(1.1)" 
                        : "grayscale(100%) brightness(0.3) sepia(20%)" 
                    }}
                    className="w-full h-full object-cover object-center transition-all duration-[1.2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Número */}
                <div className="absolute top-6 right-6 text-white/5 font-sans text-6xl font-black italic group-hover:text-[#D4AF37]/10 transition-colors duration-500">
                  0{index + 1}
                </div>

                {/* Conteúdo Info */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-10">
                  <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.4em] font-black mb-2 opacity-80">
                    {project.category}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-tight">
                    {project.title.split(' ')[0]} <br />
                    <span className="font-playfair italic font-light text-[#D4AF37]">{project.title.split(' ')[1]}</span>
                  </h3>

                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/60 text-[15px] mt-4 font-light leading-relaxed max-w-[90%]">
                          {project.description}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-3">
                          <div className="h-1 w-8 bg-[#D4AF37]" />
                          <span className="text-[#D4AF37] text-[8px] font-black uppercase tracking-[0.3em]">
                            Visitar Site
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}