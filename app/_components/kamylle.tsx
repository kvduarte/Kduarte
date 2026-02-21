"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function SobreMim() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultImage = "/eu.png";
  const goldFilter = { filter: "invert(73%) sepia(46%) saturate(542%) hue-rotate(1deg) brightness(95%) contrast(91%)" };

  const playlist = [
    { id: 0, artist: "JENNIE - GAMBINO", track: "DAMN RIGHT", file: "/audio/damn-right.mp3", image: "/jennie.jpg" },
    { id: 1, artist: "IRENE & SEULGI", track: "WHAT'S YOUR PROBLEM", file: "/audio/whats-your-problem.mp3", image: "/whats.jpg" },
    { id: 2, artist: "NO-NA", track: "SUPERSTITIOUS", file: "/audio/superstitious.mp3", image: "/nona.jpg" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dx = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const dy = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 30);
    mouseY.set((clientY - innerHeight / 2) / 30);
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (currentTrack !== null && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackSelect = (index: number) => {
    if (currentTrack === index) togglePlay();
    else setCurrentTrack(index);
  };

  const shouldBeExpanded = isIntersecting || isHovered;

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center px-6 md:px-24 overflow-hidden text-white"
      /* O estilo abaixo aplica o degradê do #4a0404 para o preto à direita */
      style={{ background: "linear-gradient(to right, #4a0404 0%, #2a0202 60%, #000000 100%)" }}
    >
      {/* BACKGROUND WATERMARK (RETO) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.h1 style={{ x: dx, y: dy }} className="text-[16vw] italic font-bold text-white/3 uppercase tracking-tighter whitespace-nowrap select-none">
          Kamylle Duarte
        </motion.h1>
      </div>

      <audio ref={audioRef} src={currentTrack !== null ? playlist[currentTrack].file : ""} onEnded={() => setCurrentTrack((currentTrack! + 1) % playlist.length)} />

      <AnimatePresence>
        {currentTrack !== null && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} 
            animate={{ 
              y: 0, opacity: 1,
              width: shouldBeExpanded ? "auto" : "64px",
            }} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-12 right-8 z-100 flex items-center p-2 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <div className="relative flex-light-0 w-12 h-12 cursor-pointer" onClick={togglePlay}>
                <img src={playlist[currentTrack].image} className="w-full h-full rounded-full object-cover " alt="Capa" />
                {!shouldBeExpanded && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                      {isPlaying ? (
                        <div className="flex gap-1px items-end h-2">
                           <motion.div animate={{ height: [2, 6, 2] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 bg-[#D4AF37]" />
                           <motion.div animate={{ height: [6, 2, 6] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 bg-[#D4AF37]" />
                        </div>
                      ) : (
                        <div className="ml-1 w-0 h-0 border-t-4 border-t-transparent border-l-[7px] border-l-[#D4AF37] border-b-4 border-b-transparent" />
                      )}
                   </div>
                )}
            </div>

            {shouldBeExpanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 px-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-[7px] uppercase tracking-widest text-[#D4AF37] font-bold">{playlist[currentTrack].artist}</span>
                  <span className="text-[10px] font-medium">{playlist[currentTrack].track}</span>
                </div>
                <button onClick={togglePlay} className="text-[#D4AF37] hover:scale-110 transition-transform">
                   {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-12 h-[2px] accent-[#D4AF37] cursor-pointer" />
                <button onClick={() => setCurrentTrack(null)} className="text-white/20 hover:text-white transition-colors ml-1"><XIcon /></button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10 pointer-events-none">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="md:col-span-7 pointer-events-auto">
          <h2 className="text-6xl md:text-[6.5rem] font-bold tracking-tighter text-white leading-[0.9] mb-8 uppercase">
            Kamylle <br /> <span className="font-playfair italic font-medium text-[#D4AF37] lowercase"> Duarte.</span>
          </h2>
          
          <div className="space-y-8 border-l border-[#D4AF37]/20 pl-8">
            <div className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-xl space-y-4">
              <p>
                Minha criação nasce da sensibilidade aos detalhes das cores que escolho aos símbolos que me representam, 
                das flores que me atravessam à música que acompanha cada narrativa enquanto tudo toma forma.
              </p>
              <p>
                Cada projeto carrega identidade, intenção e personalidade. Este espaço não foi feito apenas para mostrar projetos, 
                mas para revelar presença.
              </p>
              
            </div>

            <div className="flex flex-wrap gap-3">
              {playlist.map((song, index) => (
                <button 
                  key={song.id} 
                  onClick={() => handleTrackSelect(index)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 border text-[11px] font-bold tracking-widest uppercase ${
                    currentTrack === index 
                    ? "bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
                    : "bg-black/40 border-white/10 text-white hover:border-[#D4AF37]/50"
                  }`}
                >
                  <div className="flex gap-[2.5px] items-center">
                    <span className="opacity-40 text-[8px]"></span>
                    <div className="flex gap-[1.5px] items-end h-2 ml-1">
                      {[1, 2, 3].map((i) => (
                        <motion.div 
                          key={i} 
                          animate={currentTrack === index && isPlaying ? { height: [3, 8, 4, 8, 3] } : { height: 3 }} 
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} 
                          className={`w-[1.5px] ${currentTrack === index ? "bg-black" : "bg-[#D4AF37]"}`} 
                        />
                      ))}
                    </div>
                  </div>
                  {song.track}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="md:col-span-5 relative flex justify-end items-center pointer-events-auto">
          <motion.div style={{ x: dx, y: dy }} className="relative w-full max-w-[340px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 z-10 bg-black shadow-2xl">
              <img src={defaultImage} className="w-full h-full object-cover opacity-90" alt="Kamylle" />
            </div>

            <motion.div 
              className="absolute -right-16 -bottom-16 w-48 h-48 md:w-56 md:h-56 z-20 flex items-center justify-center" 
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }} 
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full scale-110">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="fill-[#D4AF37] text-[3.8px] uppercase tracking-[0.6em] font-medium opacity-70">
                  <textPath href="#circlePath">
                    {isPlaying ? `now playing • ${playlist[currentTrack!]?.track} • ${playlist[currentTrack!]?.artist} • ` : "kamylle duarte • visual artist • aesthetics • "}
                  </textPath>
                </text>
              </svg>
              <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div key={playlist[currentTrack!].image} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="w-full h-full">
                      <img src={playlist[currentTrack!].image} className="w-full h-full rounded-full object-cover shadow-2xl" alt="Capa Disco" />
                    </motion.div>
                  ) : (
                    <motion.div key="lily-svg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-20 h-20 md:w-24 md:h-24">
                      <img src="/liriop.svg" style={goldFilter} className="w-full h-full opacity-80" alt="Lirio" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const PlayIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
);
const PauseIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5h2v9h-2v-9zm3 0h2v9h-2v-9z"/></svg>
);
const XIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
);