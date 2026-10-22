"use client";

import * as React from "react";
import { Command } from "cmdk";
import { siteConfig } from "@/lib/config";
import {
  Home,
  User,
  Briefcase,
  Code2,
  FolderGit2,
  Mail,
  Code,
  MessageSquare,
} from "lucide-react";

const ITEM =
  "flex cursor-pointer items-center gap-2.5 rounded-none border-[3px] border-transparent px-3 py-2 text-sm font-medium text-ink transition-all hover:border-ink hover:bg-sun hover:text-void hover:translate-x-1 aria-selected:border-ink aria-selected:bg-grape aria-selected:text-bright";

export function CmdPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const openMenu = () => setOpen(true);

    document.addEventListener("keydown", down);
    document.addEventListener("open-cmd-palette", openMenu);

    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("open-cmd-palette", openMenu);
    };
  }, []);

  // Lock page scroll while the palette is open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh]">
      <div
        className="fixed inset-0 bg-void/60"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg px-4">
        <Command className="brutal flex w-full flex-col overflow-hidden bg-surface shadow-[12px_12px_0_0_var(--color-ink)]">
          <div className="flex items-center gap-3 border-b-4 border-ink bg-sun px-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-void/60">
              ⌘
            </span>
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-ink/40 text-ink"
              autoFocus
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2.5 scrollbar-hide">
            <Command.Empty className="py-6 text-center font-mono text-sm text-ink/60">
              Nothing here. Ctrl+Z your search.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="px-1 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50"
            >
              <Command.Item onSelect={() => runCommand(() => scrollTo("hero"))} className={ITEM}>
                <Home size={15} /> Home
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("about"))} className={ITEM}>
                <User size={15} /> About
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("projects"))} className={ITEM}>
                <FolderGit2 size={15} /> Projects
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("experience"))} className={ITEM}>
                <Briefcase size={15} /> Experience
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("tech-stack"))} className={ITEM}>
                <Code2 size={15} /> Dashboard
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("contact"))} className={ITEM}>
                <Mail size={15} /> Contact
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Social"
              className="mt-2 px-1 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50"
            >
              <Command.Item
                onSelect={() => runCommand(() => window.open(siteConfig.links.github, "_blank"))}
                className={ITEM}
              >
                <Code size={15} /> GitHub
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open(siteConfig.links.twitter, "_blank"))}
                className={ITEM}
              >
                <MessageSquare size={15} /> Twitter
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
