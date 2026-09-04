"use client";

import { useState } from "react";
import { Mail, MapPin, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function SidebarRight() {
  const [copied, setCopied] = useState(false);
  
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@anshk.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="hidden xl:flex flex-col w-full p-3 xl:p-5 gap-3 sticky top-0 h-screen overflow-y-auto border-l border-white/5 bg-transparent z-40">
      {/* Welcome Panel */}
      <div className="rounded-xl px-4 py-3 bg-[#191A1E] border border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[14px]">👋</span>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            Welcome
          </span>
        </div>
        <h3 className="text-zinc-100 text-[16px] font-bold mb-1.5">Glad to have you here.</h3>
        <p className="text-zinc-400 text-[13px] mb-4 leading-relaxed">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-4 text-[15px] text-zinc-400 hover:text-white transition-colors group cursor-target text-left"
          >
            <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute"
                  >
                    <Check size={18} className="text-[#9B8CFF]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mail"
                    initial={{ scale: 0, opacity: 0, rotate: 90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: -90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute"
                  >
                    <Mail size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative flex-1 overflow-hidden h-6 flex items-center min-w-[150px]">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied-text"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 whitespace-nowrap"
                  >
                    Copied to clipboard!
                  </motion.span>
                ) : (
                  <motion.span
                    key="mail-text"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 group-hover:translate-x-1 transition-transform whitespace-nowrap"
                  >
                    Send an email
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </button>
          <a
            href="https://github.com/ansh3108"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 text-[15px] text-zinc-400 hover:text-white transition-colors group cursor-target"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current transition-colors">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">GitHub Profile</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ansh-kumar-tech/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 text-[15px] text-zinc-400 hover:text-white transition-colors group cursor-target"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current transition-colors">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">LinkedIn Profile</span>
          </a>
          <a
            href="https://x.com/anshkdev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 text-[15px] text-zinc-400 hover:text-white transition-colors group cursor-target"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current transition-colors">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Twitter / X</span>
          </a>
        </div>
      </div>

      {/* Tech Skills Panel */}
      <div className="rounded-xl px-4 py-3 bg-[#191A1E] border border-zinc-800 shadow-sm relative overflow-hidden group/skills">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(139,124,255,0.02)_0%,transparent_70%)] pointer-events-none" />
        <h3 className="text-zinc-100 font-bold mb-3 text-[13px] tracking-wide uppercase">
          Technical Skills
        </h3>
        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-zinc-500 text-[10px] font-bold mb-1.5 uppercase tracking-wider">
              Programming Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Rust", "TypeScript", "JavaScript", "Python", "Solana"].map(skill => (
                <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[12px] font-sans hover:border-[#9B8CFF]/40 hover:text-zinc-100 transition-colors cursor-target">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-zinc-500 text-[10px] font-bold mb-1.5 uppercase tracking-wider">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Tailwind CSS", "Anchor", "Node.js"].map(skill => (
                <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[12px] font-sans hover:border-[#9B8CFF]/40 hover:text-zinc-100 transition-colors cursor-target">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-zinc-500 text-[10px] font-bold mb-1.5 uppercase tracking-wider">
              Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {["PCB Design", "Microcontrollers", "EasyEDA", "Linux", "Git", "GitHub"].map(skill => (
                <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[12px] font-sans hover:border-[#9B8CFF]/40 hover:text-zinc-100 transition-colors cursor-target">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-auto pt-2 pb-2 border-t border-white/5 text-center">
        <p className="flex items-center justify-center gap-2 text-zinc-600 text-xs">
          <MapPin size={12} />
          Bengaluru, India
        </p>
      </div>
    </aside>
  );
}
