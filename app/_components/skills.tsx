"use client";

import { motion } from "framer-motion";
import { FiCode, FiDatabase, FiCpu, FiGlobe } from "react-icons/fi"; 

const capabilities = [
  {
    title: "Software Development",
    icon: <FiCode className="w-6 h-6" />,
    tools: ["React.js", "Java", "Python", "C/C++"],
    desc: "Desenvolvimento robusto com foco em lógica de programação, resolução de problemas e algoritmos."
  },
  {
    title: "Web & Systems",
    icon: <FiGlobe className="w-6 h-6" />,
    tools: ["Next.js", "PHP", "HTML/CSS", "Tailwind"],
    desc: "Criação de sites institucionais responsivos, sistemas dinâmicos e arquitetura de informação."
  },
  {
    title: "Data & Backend",
    icon: <FiDatabase className="w-6 h-6" />,
    tools: ["MySQL", "Modelagem", "Integração"],
    desc: "Estruturação de bancos de dados, consultas e integração eficiente entre front-end e dados."
  },
  {
    title: "Automation & Logic",
    icon: <FiCpu className="w-6 h-6" />,
    tools: ["Bots", "Debugging", "Workflow"],
    desc: "Criação de automações de fluxos, bots inteligentes e investigação técnica de erros (Debugging)."
  }
];

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="relative h-screen w-full flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      style={{
        /* Degradê ajustado para manter a unidade com o Showcase e Projetos */
        background: "radial-gradient(circle at 50% 100%, #3b0303 0%, #1a0202 50%, #000000 100%)",
        backgroundColor: "#000000",
      }}
    >
      {/* Background Decorativo - Texto Gigante Suave */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[25vw] font-black uppercase tracking-tighter italic">Expertise</span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] uppercase tracking-[0.5em] text-[10px] font-bold">Hardcore Skills</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none"
            >
              Domínio <br />
              <span className="font-playfair italic font-light text-[#D4AF37]">Multidisciplinar.</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 text-sm max-w-xs md:text-right font-light leading-relaxed"
          >
            Aliando fundamentos sólidos de computação ao desenvolvimento de soluções modernas e escaláveis.
          </motion.p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm group transition-all duration-500 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/20"
            >
              {/* Ícone e Número */}
              <div className="flex justify-between items-start mb-12">
                <div className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  {cap.icon}
                </div>
                <span className="text-white/5 font-black text-4xl group-hover:text-[#D4AF37]/10 transition-colors">
                  0{index + 1}
                </span>
              </div>

              {/* Título e Descrição */}
              <h3 className="text-white text-xl font-bold mb-3 tracking-tight">{cap.title}</h3>
              <p className="text-white/40 text-[11px] leading-relaxed mb-6 group-hover:text-white/60 transition-colors min-h-[48px]">
                {cap.desc}
              </p>

              {/* Tags de Ferramentas */}
              <div className="flex flex-wrap gap-2">
                {cap.tools.map((tool, tIdx) => (
                  <span 
                    key={tIdx}
                    className="text-[8px] md:text-[9px] uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[#D4AF37] font-bold"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}