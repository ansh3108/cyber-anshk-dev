"use client";

import { Printer, Layers, Briefcase } from "lucide-react";
import { siteConfig } from "@/lib/config";

const SKILL_GROUPS = [
  {
    label: "Programming Languages",
    icon: <Layers size={18} />,
    header: "bg-neon",
    items: ["Rust", "TypeScript", "JavaScript", "Python", "Solana", "HTML/CSS"],
  },
  {
    label: "Technologies",
    icon: <Briefcase size={18} />,
    header: "bg-acid",
    items: ["React", "Next.js", "Tailwind CSS", "Anchor", "Node.js", "Canvas"],
  },
  {
    label: "Hardware / Tools",
    icon: <Printer size={18} />,
    header: "bg-sun",
    items: ["PCB Design", "Microcontrollers", "EasyEDA", "Git", "Linux"],
  },
];

export default function Resume() {
  return (
    <div className="pt-10 md:pt-16 mb-10 w-full print:mb-0">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-12 print:mb-6">
        <div className="flex flex-col gap-3">
          <span className="w-fit border-[3px] border-ink bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 -rotate-2 print:hidden">
            [ CV ]
          </span>
          <h1 className="font-display uppercase text-4xl md:text-6xl leading-[0.95] tracking-tight print:text-4xl">
            Ansh <span className="text-grape" style={{ textShadow: "4px 4px 0 var(--color-ink)" }}>Kumar</span>
          </h1>
          <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/60">
            Full-Stack Builder & Hardware Engineer ✶ Bengaluru, India
          </p>
          <div className="hidden print:flex print:flex-wrap print:gap-4 print:text-xs print:mt-2 print:text-gray-600">
            <span>itz.anshkumar@gmail.com</span>
            <span>linkedin.com/in/ansh-kumar-tech/</span>
            <span>github.com/ansh3108</span>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="brutal brutal-press w-fit inline-flex items-center gap-2.5 px-5 py-3 bg-sun font-mono text-[11px] font-bold uppercase tracking-widest print:hidden"
        >
          <Printer size={16} strokeWidth={2.5} />
          Print / Save as PDF
        </button>
      </div>

      <div className="flex flex-col gap-10">

        {/* SKILLS */}
        <section className="print:mb-4">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-display uppercase text-2xl md:text-3xl tracking-tight print:text-lg print:uppercase print:tracking-widest print:border-b print:border-gray-800 print:pb-1">
              Technical Skills
            </h2>
            <div className="h-3 w-20 border-[3px] border-ink bg-flamingo print:hidden" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-1 print:gap-3">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className="brutal bg-surface print:shadow-none print:border-2">
                <div className={`${group.header} border-b-4 border-ink px-4 py-2 flex items-center gap-2 text-void print:border-b print:border-gray-400`}>
                  <span className="print:hidden text-void">{group.icon}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                    {group.label}
                  </span>
                </div>
                <div className="p-4 flex flex-wrap gap-2.5 print:p-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border-[3px] border-ink bg-surface px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest print:border print:border-gray-500 print:font-normal"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="print:mb-4">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-display uppercase text-2xl md:text-3xl tracking-tight print:text-lg print:uppercase print:tracking-widest print:border-b print:border-gray-800 print:pb-1">
              Work Experience
            </h2>
            <div className="h-3 w-20 border-[3px] border-ink bg-neon print:hidden" />
          </div>

          <div className="relative border-l-4 border-dashed border-ink/40 ml-3 pl-7 flex flex-col gap-8 print:border-none print:pl-0 print:gap-4">

            <div className="relative">
              {/* Timeline node */}
              <span className="absolute -left-[46px] top-3 w-5 h-5 bg-flamingo border-[3px] border-ink z-10 rotate-3 print:hidden" />

              <div className="brutal bg-surface print:shadow-none print:border-2">
                <div className="bg-flamingo text-bright border-b-4 border-ink px-5 py-4 flex flex-wrap items-center justify-between gap-3 print:border-b print:border-gray-400">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-display uppercase text-xl md:text-2xl tracking-tight print:text-base print:text-black">
                      Software Developer & Maker
                    </h3>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-bright/90 print:text-gray-600">
                      Hack Club ✶ Global (Remote)
                    </span>
                  </div>
                  <span className="border-[3px] border-ink bg-surface text-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest rotate-2 print:border print:border-gray-400 print:rotate-0 print:text-gray-600 print:font-normal">
                    Dec 2022 – Present
                  </span>
                </div>

                <ul className="px-5 py-5 flex flex-col gap-3.5 print:px-3 print:py-2">
                  <li className="flex items-start gap-2.5 text-ink/80 font-medium leading-relaxed print:text-black print:text-sm">
                    <span className="mt-1.5 text-grape font-bold print:text-black">✶</span>
                    Shipped multiple projects including hardware modules and interactive web tools.
                  </li>
                  <li className="flex items-start gap-2.5 text-ink/80 font-medium leading-relaxed print:text-black print:text-sm">
                    <span className="mt-1.5 text-grape font-bold print:text-black">✶</span>
                    Collaborated with a global community of teenage hackers to build and scale open-source software.
                  </li>
                </ul>

                {/* Footer bar */}
                <div className="flex items-center gap-3 border-t-4 border-ink bg-paper px-5 py-3 print:border-t print:border-gray-300">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Focus</span>
                  <div className="flex flex-wrap gap-2">
                    {["Rust", "React", "Next.js", "TypeScript"].map((tech) => (
                      <span
                        key={tech}
                        className="border-[3px] border-ink bg-surface px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest print:border print:border-gray-500 print:font-normal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40 print:hidden">
              ✶ more entries coming as they ship
            </div>
          </div>
        </section>

        {/* LINKS */}
        <section className="print:hidden">
          <h2 className="font-display uppercase text-2xl md:text-3xl tracking-tight mb-5">Elsewhere</h2>
          <div className="brutal bg-grape p-6 md:p-8 flex flex-wrap gap-4 items-center">
            <a
              href={siteConfig.links.email}
              className="brutal-sm brutal-press bg-sun text-void px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest"
            >
              itz.anshkumar@gmail.com
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-sm brutal-press bg-surface text-ink px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/ansh-kumar-tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-sm brutal-press bg-surface text-ink px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
