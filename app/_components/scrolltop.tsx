"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Desativa a memória de scroll do navegador (impede que ele volte onde parou)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Força o scroll para o topo absoluto
    window.scrollTo(0, 0);
  }, []);

  return null; // Não renderiza nada na tela
}