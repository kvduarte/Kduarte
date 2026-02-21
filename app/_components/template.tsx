"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Verifica se a rota atual é "showcase"
  const isShowcase = pathname.includes("showcase");

  // Se NÃO for a página showcase, renderiza normal sem animação
  if (!isShowcase) {
    return <>{children}</>;
  }

  // Se FOR showcase, aplica o efeito de entrada
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Ease "luxuoso" para combinar com o lírio
      }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}