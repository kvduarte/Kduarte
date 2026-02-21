import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import CustomCursor from "./_components/customcursor";
import ScrollToTop from "./_components/scrolltop";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400","500","600","700"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "KDuarte | Portfolio",
  description: "Kamylle Duarte - Soluções digitais com personalidade",
  icons: { icon: "/lirio.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased text-white font-sans relative bg-black`}
        style={{ 
          minHeight: "100vh"
        }}
      >
        {/* TEXTURA DE GRÃO EDITORIAL (Z-INDEX ALTO PARA COBRIR TUDO) */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <ScrollToTop />
        <CustomCursor />
        <Navbar /> 
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}