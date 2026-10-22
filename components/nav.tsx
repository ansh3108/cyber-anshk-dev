"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Command, Moon, Sun } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];

export function Nav() {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <nav className="print:hidden sticky top-0 z-40 -mx-6 sm:-mx-12 md:-mx-24 lg:-mx-32 xl:-mx-48 bg-paper border-b-4 border-ink px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 py-3 flex items-center justify-between gap-3">
      <Link
        href="/"
        className="brutal brutal-press bg-grape text-bright px-3 py-1.5 md:px-4 font-display uppercase text-xs md:text-sm tracking-wide -rotate-1 w-fit"
      >
        anshk.tech
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        {LINKS.map((link, i) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`brutal-sm brutal-press px-2.5 md:px-3 py-1.5 font-mono text-[9px] md:text-[11px] font-bold uppercase tracking-widest ${ROTATIONS[i % ROTATIONS.length]} ${
                active
                  ? "bg-ink text-paper"
                  : "bg-surface text-ink hover:bg-sun hover:text-void"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="brutal-sm brutal-press bg-surface text-ink hover:bg-neon hover:text-void px-2.5 py-1.5 flex items-center"
        >
          {/* Both icons ship; CSS picks the right one per theme */}
          <Sun size={14} strokeWidth={2.5} className="dark:hidden" />
          <Moon size={14} strokeWidth={2.5} className="hidden dark:block" />
        </button>

        <button
          onClick={() =>
            document.dispatchEvent(new CustomEvent("open-cmd-palette"))
          }
          aria-label="Open command palette"
          className="brutal-sm brutal-press hidden sm:flex items-center gap-1.5 bg-sun text-void px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest rotate-2"
        >
          <Command size={12} strokeWidth={2.5} />
          K
        </button>
      </div>
    </nav>
  );
}
