"use client";
import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Configuração para o círculo externo (mais suave/lento)
  const outerSpring = { damping: 20, stiffness: 200, mass: 0.6 };
  // Configuração para o ponto central (mais rápido/preciso)
  const innerSpring = { damping: 20, stiffness: 400, mass: 0.1 };

  const cursorX = useSpring(0, outerSpring);
  const cursorY = useSpring(0, outerSpring);
  
  const dotX = useSpring(0, innerSpring);
  const dotY = useSpring(0, innerSpring);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Centraliza o círculo (w-8 = 32px, então -16)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      // Centraliza o ponto (w-1 = 4px, então -2)
      dotX.set(e.clientX - 2);
      dotY.set(e.clientY - 2);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        ["A", "BUTTON", "INPUT", "TEXTAREA"].includes(target.tagName) ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer");
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-[#D4AF37] rounded-full pointer-events-none z-9999 hidden md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isActive ? 0.7 : (isHovered ? 1.5 : 1),
          opacity: isHovered ? 0.5 : 1,
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-[#FCF6BA] rounded-full pointer-events-none z-9999 hidden md:block shadow-[0_0_10px_rgba(212,175,55,0.8)]"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isActive ? 1.5 : 1,
        }}
      />
    </>
  );
}