"use client";
import Showcase from "./_components/showcase";
import Kamylle from "./_components/kamylle";
import Project from "./_components/project";
import Skill from "./_components/skills";
import Contact from "./_components/contact";

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      <div className="relative z-10 flex flex-col">
        <section id="showcase"><Showcase /></section>
        <section id="kamylle"><Kamylle /></section>
        <section id="projetos"><Project /></section>
        <section id="skills"><Skill /></section>
        <section id="contato"><Contact /></section>
      </div>
    </main>
  );
}