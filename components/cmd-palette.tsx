"use client";

import * as React from "react";
import { Command } from "cmdk";
import { siteConfig } from "@/lib/config";
import { Home, User, Briefcase, Code2, FolderGit2, Mail, Code, MessageSquare } from "lucide-react";

export function CmdPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg px-4">
        <Command className="flex w-full flex-col overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800">
          <Command.Input 
            placeholder="Type a command or search..." 
            className="flex h-12 w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800"
            autoFocus
          />
          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">No results found.</Command.Empty>
            
            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-zinc-500">
              <Command.Item onSelect={() => runCommand(() => scrollTo("hero"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <Home size={14} /> Home
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("about"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <User size={14} /> About
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("projects"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <FolderGit2 size={14} /> Projects
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("experience"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <Briefcase size={14} /> Experience
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("tech-stack"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <Code2 size={14} /> Tech Stack
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => scrollTo("contact"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <Mail size={14} /> Contact
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Social" className="px-2 py-1.5 text-xs font-medium text-zinc-500 mt-2">
              <Command.Item onSelect={() => runCommand(() => window.open(siteConfig.links.github, "_blank"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <Code size={14} /> GitHub
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.open(siteConfig.links.twitter, "_blank"))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800">
                <MessageSquare size={14} /> Twitter
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
