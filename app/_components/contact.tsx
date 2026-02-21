"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiInstagram, FiLinkedin, FiSend } from "react-icons/fi";

export default function Contato() {
  return (
    <section 
      id="contato" 
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-20 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 80% 20%, #2e0505 0%, #0a0101 50%, #000000 100%)",
      }}
    >
      {/* Círculo Decorativo */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full border border-yellow-600/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Título */}
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-yellow-600 uppercase text-[10px] font-bold mb-4 tracking-[0.5em]"
          >
            Get In Touch
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white uppercase leading-none tracking-tighter"
          >
            Fale <span className="font-serif italic font-light text-yellow-600 capitalize">Comigo.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Formulário */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-10 rounded-2xl shadow-2xl"
          >
            <form className="space-y-6">
              <div>
                <label className="text-[9px] uppercase tracking-[0.3em] text-yellow-600/80 font-bold mb-2 block">Nome</label>
                <input type="text" className="w-full bg-white/5 border-b border-white/10 px-0 py-3 text-white focus:border-yellow-600 outline-none transition-all placeholder:text-white/10" placeholder="Seu nome completo" />
              </div>
              
              <div>
                <label className="text-[9px] uppercase tracking-[0.3em] text-yellow-600/80 font-bold mb-2 block">E-mail</label>
                <input type="email" className="w-full bg-white/5 border-b border-white/10 px-0 py-3 text-white focus:border-yellow-600 outline-none transition-all placeholder:text-white/10" placeholder="seu@email.com" />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.3em] text-yellow-600/80 font-bold mb-2 block">Mensagem</label>
                <textarea rows={3} className="w-full bg-white/5 border-b border-white/10 px-0 py-3 text-white focus:border-yellow-600 outline-none transition-all resize-none placeholder:text-white/10" placeholder="Como posso te ajudar?" />
              </div>

              <motion.button 
                whileHover={{ scale: 1.01, backgroundColor: "#ca8a04" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-600 text-black font-black uppercase tracking-[0.3em] text-xs py-5 rounded-lg flex items-center justify-center gap-3 transition-colors"
              >
                Enviar Mensagem <FiSend className="text-lg" />
              </motion.button>
            </form>
          </motion.div>

          {/* Informações Direita */}
          <div className="flex flex-col justify-between py-4">
            <div className="space-y-16">
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <h3 className="text-white text-xs font-bold mb-8 uppercase tracking-[0.4em]">Informações</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-5 text-white/40 hover:text-yellow-600 transition-all cursor-pointer group">
                    <FiMail className="text-xl" />
                    <span className="text-sm font-light">kamylleduarte1@gmail.com</span>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <h3 className="text-white text-xs font-bold mb-8 uppercase tracking-[0.4em]">Conecte-se</h3>
                <div className="flex gap-8">
                  {[
                    { icon: <FiInstagram />, href: "https://instagram.com/k.vduarte" },
                    { icon: <FiLinkedin />, href: "https://linkedin.com/in/kvduarte" }
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, color: "#ca8a04" }}
                      className="text-4xl text-white/10 transition-all"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <p className="mt-12 text-white/20 text-[10px] leading-loose uppercase tracking-[0.3em] max-w-xs">
              Disponível para novos projetos e colaborações em todo o Brasil.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-white/10 text-[9px] uppercase tracking-[0.4em]">
          <span>© 2024 — All Rights Reserved</span>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="hover:text-yellow-600 transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}