"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "USB Hub",
    category: "Hardware",
    description: "A hardware module providing four 5V output ports from a single USB input. Custom circuit routing and fabricated PCB.",
    link: "https://oshwlab.com/itz.anshkumar/usb-hub",
    language: "Hardware / PCB",
    milestones: [
      { date: "Oct 2025", title: "Circuit Design", desc: "Started designing the schematic for the USB Hub in EasyEDA." },
      { date: "Nov 2025", title: "PCB Routing", desc: "Completed the complex trace routing and power planes." },
      { date: "Dec 2025", title: "Fabrication", desc: "Sent the Gerber files for manufacturing and assembled the final board." }
    ],
    tech: ["EasyEDA", "Hardware", "PCB Routing", "Soldering"]
  },
  {
    name: "Parallax",
    category: "Software",
    description: "2D projectile physics simulation built with HTML5 Canvas. Math for gravity, velocity, and collision detection.",
    link: "https://github.com/ansh3108/Parallax",
    language: "Javascript / Canvas",
    milestones: [
      { date: "Mar 2025", title: "Math Engine", desc: "Implemented the core physics equations for gravity and velocity." },
      { date: "Apr 2025", title: "Canvas Renderer", desc: "Built the rendering engine using HTML5 Canvas." },
      { date: "May 2025", title: "Collision Detection", desc: "Added boundaries and elastic collision detection." }
    ],
    tech: ["JavaScript", "HTML5 Canvas", "Physics Engine"]
  },
  {
    name: "Commit-to-Quest",
    category: "Web3 / Software",
    description: "Turns your GitHub activity into an 8-bit RPG adventure. Level up with every commit.",
    link: "https://github.com/ansh3108/Commit-to-Quest",
    language: "TypeScript",
    milestones: [
      { date: "Jun 2025", title: "GitHub API Integration", desc: "Successfully fetched commit histories and webhooks." },
      { date: "Jul 2025", title: "RPG Logic", desc: "Created the leveling system and experience calculations." },
      { date: "Aug 2025", title: "Launch", desc: "Released the MVP with 8-bit themed UI." }
    ],
    tech: ["TypeScript", "Next.js", "GitHub API", "Tailwind CSS"]
  },
  {
    name: "Terminal Quest",
    category: "Developer Tool",
    description: "Rust-based terminal productivity tool. Custom TUI to track focused sessions while interfacing with local project environments.",
    link: "https://github.com/ansh3108/Terminal-Quest",
    language: "Rust / Anchor",
    wip: true,
    milestones: [
      { date: "Sep 2025", title: "TUI Foundation", desc: "Started building the Terminal UI using ratatui in Rust." },
      { date: "Oct 2025", title: "Session Tracking", desc: "Added logic to measure focus time and active windows." },
      { date: "Present", title: "Solana Anchor Integration", desc: "Currently integrating Solana for on-chain proof of work." }
    ],
    tech: ["Rust", "TUI", "Solana", "Anchor"]
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
