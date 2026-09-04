"use client";

import { Printer, Layers, Briefcase } from "lucide-react";

export default function Resume() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-8 md:pt-16 px-0 mb-20 print:p-0 print:m-0 print:max-w-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 1cm; }
          body { background-color: white !important; color: black !important; -webkit-print-color-adjust: exact; }
          nav, aside, .bg-noise, .mobile-header, .grain, .pointer-events-none { display: none !important; }
          .max-w-4xl { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .glass-card, .bg-surface { background: none !important; border: none !important; box-shadow: none !important; color: black !important; }
          h1, h2, h3, h4, p, span, li { color: black !important; }
          .print\\:hidden { display: none !important; }
        }
      `}} />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 print:mb-8 print:flex-row print:items-start print:border-b print:border-gray-300 print:pb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2 print:text-4xl print:mb-1">Ansh Kumar</h1>
          <p className="text-zinc-500 print:text-sm print:font-medium">
            Full-Stack Builder & Hardware Engineer • Bengaluru, India
          </p>
          <div className="hidden print:flex print:flex-wrap print:gap-4 print:text-xs print:mt-2 print:text-gray-600">
            <span>hello@anshk.dev</span>
            <span>linkedin.com/in/ansh-kumar-tech/</span>
            <span>github.com/ansh3108</span>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 hover:border-zinc-500 hover:text-white text-zinc-400 font-medium transition-all print:hidden"
        >
          <Printer size={18} />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      <div className="space-y-12 print:space-y-8">
        
        {/* SKILLS */}
        <section className="print:mb-6">
          <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-3 print:mb-3 print:border-b print:border-gray-800 print:pb-1 print:text-lg print:uppercase print:tracking-widest relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#B8F34A] rounded-r-md hidden md:block"></div>
            <div className="p-2 bg-zinc-900/80 rounded-lg text-zinc-400 border border-zinc-800 print:hidden relative group">
              <div className="absolute inset-0 bg-[#B8F34A]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Layers size={20} className="relative z-10 group-hover:text-[#B8F34A] transition-colors" />
            </div>
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-1 print:gap-2">
            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl transition-colors print:p-0 print:border-none">
              <h4 className="text-zinc-300 font-semibold mb-2 text-[15px] print:mb-1 print:text-black print:text-sm">
                Programming Languages
              </h4>
              <p className="text-zinc-400 text-[15px] leading-relaxed print:text-black print:text-sm">
                Rust · TypeScript · JavaScript · Python · Solana · HTML/CSS
              </p>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl transition-colors print:p-0 print:border-none">
              <h4 className="text-zinc-300 font-semibold mb-2 text-[15px] print:mb-1 print:text-black print:text-sm">
                Technologies
              </h4>
              <p className="text-zinc-400 text-[15px] leading-relaxed print:text-black print:text-sm">
                React · Next.js · Tailwind CSS · Anchor · Node.js · Canvas
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl transition-colors print:p-0 print:border-none">
              <h4 className="text-zinc-300 font-semibold mb-2 text-[15px] print:mb-1 print:text-black print:text-sm">
                Hardware / Tools
              </h4>
              <p className="text-zinc-400 text-[15px] leading-relaxed print:text-black print:text-sm">
                PCB Design · Microcontrollers · EasyEDA · Git · Linux
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="print:mb-6">
          <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-3 print:mb-3 print:border-b print:border-gray-800 print:pb-1 print:text-lg print:uppercase print:tracking-widest relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#B8F34A] rounded-r-md hidden md:block"></div>
            <div className="p-2 bg-zinc-900/80 rounded-lg text-zinc-400 border border-zinc-800 print:hidden relative group">
              <div className="absolute inset-0 bg-[#B8F34A]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Briefcase size={20} className="relative z-10 group-hover:text-[#B8F34A] transition-colors" />
            </div>
            Work Experience
          </h2>
          <div className="relative border-l border-zinc-800 ml-4 space-y-12 pl-8 pb-4 print:border-none print:ml-0 print:pl-0 print:space-y-6">
            
            <div className="relative group print:mb-4">
              <div className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-zinc-950 border-2 border-zinc-700 ring-4 ring-[#080A09] z-10 group-hover:border-[#B8F34A]/50 transition-colors print:hidden"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 print:mb-1">
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors print:text-black print:text-base">
                  Software Developer & Maker
                </h3>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded border border-zinc-700 whitespace-nowrap print:bg-transparent print:border-none print:p-0 print:text-gray-600">
                  Dec 2022 – Jul 2026
                </span>
              </div>
              <div className="text-zinc-400 font-medium text-sm mb-4 print:mb-2 print:text-black">
                Hack Club · <span className="text-zinc-500 print:text-gray-600">Global (Remote)</span>
              </div>
              <ul className="space-y-3 print:space-y-1">
                <li className="text-zinc-400 text-sm leading-relaxed pl-0 flex gap-3 print:text-black print:block print:pl-4 print:relative">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 group-hover:bg-zinc-400 transition-colors print:absolute print:left-0 print:top-2 print:w-1.5 print:h-1.5 print:bg-black print:rounded-full"></span>
                  <span>Shipped multiple projects including hardware modules and interactive web tools.</span>
                </li>
                <li className="text-zinc-400 text-sm leading-relaxed pl-0 flex gap-3 print:text-black print:block print:pl-4 print:relative">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 group-hover:bg-zinc-400 transition-colors print:absolute print:left-0 print:top-2 print:w-1.5 print:h-1.5 print:bg-black print:rounded-full"></span>
                  <span>Collaborated with a global community of teenage hackers to build and scale open-source software.</span>
                </li>
              </ul>
            </div>

            

          </div>
        </section>

      </div>
    </div>
  );
}
