"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "USB Hub",
    category: "Hardware",
    description: "A hardware module providing four 5V output ports from a single USB input. Custom circuit routing and fabricated PCB.",
    link: "https://oshwlab.com/itz.anshkumar/usb-hub",
    language: "Hardware / PCB",
    tech: ["EasyEDA", "Hardware", "PCB Routing", "Soldering"]
  },
  {
    name: "NFC Business Card",
    category: "Hardware",
    description: "An NFC-powered business card that harvests energy from nearby devices to instantly light up an LED.",
    link: "https://oshwlab.com/itz.anshkumar/nfc-business-card_copy_copy_copy",
    language: "Hardware / PCB",
    tech: ["EasyEDA", "Hardware", "PCB Routing"]
  },
  {
    name: "Commit-to-Quest",
    category: "Game / Software",
    description: "Turns your GitHub activity into an 8-bit RPG adventure. Level up with every commit.",
    link: "https://github.com/ansh3108/Commit-to-Quest",
    language: "TypeScript",
    tech: ["TypeScript", "Next.js", "GitHub API", "Tailwind CSS"]
  },
  {
    name: "Terminal Quest",
    category: "Developer Tool",
    description: "Rust-based terminal productivity tool. Custom TUI to track focused sessions while interfacing with local project environments.",
    link: "https://github.com/ansh3108/Terminal-Quest",
    language: "Rust / Anchor",
    wip: false,
    tech: ["Rust", "TUI", "Solana", "Anchor"]
  },
  {
    name: "Markdown CLI",
    category: "Tool",
    description: "CLI tool to convert Markdown files to a static website.",
    link: "https://github.com/ansh3108/markdown-cli",
    tech: ["Rust", "CLI", "TUI"]
  }
];

export default function Projects() {

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 md:pt-20 px-0 mb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Some cool stuff I&apos;ve built</h1>
        <p className="text-zinc-500 font-mono text-sm">
          A collection of projects showcasing hardware hacking, web3, and interactive apps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group relative flex flex-col border border-zinc-800 rounded-2xl transition-all duration-300 overflow-hidden bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8F34A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <a href={project.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-0 hidden md:block cursor-target"></a>

            <div className="p-6 flex flex-col flex-grow relative z-10 pointer-events-none md:pointer-events-auto">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-2">{project.category}</span>
                <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors cursor-target z-20">
                  <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h3 
                  className="text-xl font-bold text-zinc-100 transition-colors flex items-center flex-wrap gap-3 group-hover:text-white"
                >
                  <span>{project.name}</span>
                  {project.wip && (
                    <span 
                      className="px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 text-zinc-400 border-zinc-700 bg-zinc-800"
                    >
                      WIP
                    </span>
                  )}
                </h3>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-zinc-400 text-sm leading-relaxed flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-zinc-600"></span>
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono group-hover:border-[#B8F34A]/30 group-hover:text-zinc-300 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-target w-fit pt-2 z-20">
                  <ExternalLink size={14} /> Open Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
