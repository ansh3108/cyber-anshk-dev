"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, User, FolderGit2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: <Home size={20} /> },
  { label: "Resume", href: "/resume", icon: <User size={20} /> },
  { label: "Projects", href: "/projects", icon: <FolderGit2 size={20} /> },
];

export function SidebarLeft() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#151618]/80 backdrop-blur-md border-b border-zinc-800 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center relative z-10 overflow-hidden">
              <Image 
                src="/Ansh.png" 
                alt="Ansh Kumar" 
                fill 
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#151618] rounded-full flex items-center justify-center border border-[#151618] z-20">
              <div className="w-1.5 h-1.5 bg-[#9B8CFF] rounded-full"></div>
            </div>
          </div>
          <span className="text-sm font-bold text-zinc-100 tracking-tight">Ansh Kumar</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-zinc-400 hover:text-zinc-100 rounded-lg transition-colors cursor-target"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Left Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full z-40 
          bg-[#151618]/80 backdrop-blur-xl border-r border-white/5
          transition-transform duration-300 ease-in-out
          flex flex-col items-center py-6 gap-8
          md:translate-x-0 md:w-20
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between w-full px-6 md:px-0 md:justify-center mb-4 pt-2">
          {/* Avatar / Initial */}
          <div className="relative group cursor-target block outline-none">
            <div className="relative w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 overflow-hidden shadow-none transition-all group-hover:border-[#9B8CFF]/50 group-hover:shadow-[0_0_15px_rgba(139,124,255,0.15)]">
              <Image 
                src="/Ansh.png" 
                alt="Ansh Kumar" 
                fill 
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#151618] rounded-full flex items-center justify-center border-2 border-[#151618] z-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#9B8CFF] opacity-30 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9B8CFF]"></span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full px-4 md:px-0 md:items-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-4 px-4 md:px-0 md:justify-center h-10 rounded-lg transition-all duration-300 cursor-target md:w-10 md:h-10 ${
                  isActive
                    ? "bg-[#9B8CFF]/10 text-[#9B8CFF] shadow-[0_0_10px_rgba(139,124,255,0.1)] border border-[#9B8CFF]/20"
                    : "text-zinc-500 hover:text-[#9B8CFF] hover:bg-[#9B8CFF]/5 hover:border hover:border-[#9B8CFF]/20 border border-transparent"
                }`}
              >
                {link.icon}
                <span className="font-medium text-sm md:hidden text-zinc-100">{link.label}</span>
                <span className="hidden md:block absolute left-14 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {link.label}
                </span>
                {isActive && (
                  <div className="hidden md:block absolute -left-[1px] top-2 bottom-2 w-0.5 bg-[#9B8CFF] rounded-r-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
