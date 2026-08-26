"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/config";

export function Nav() {
  return (
    <nav className="flex items-center justify-between py-12 md:py-16">
      <Link href="/" className="font-serif text-2xl tracking-tight hover:opacity-50 transition-opacity">
        {siteConfig.username}
      </Link>
      <div className="flex items-center gap-8">
        <button 
          onClick={() => document.dispatchEvent(new CustomEvent('open-cmd-palette'))}
          className="text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase tracking-[0.2em]"
        >
          Menu
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
