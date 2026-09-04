"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, Folder, Mail, Code, MessageSquare, Layers } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLink = (url: string) => {
    setOpen(false);
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[10000] px-4"
          >
            <Command
              className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-mono"
              loop
            >
              <div className="flex items-center border-b border-zinc-800 px-4 gap-2">
                <span className="text-zinc-500 font-bold">{'>'}</span>
                <Command.Input
                  autoFocus
                  placeholder="execute command..."
                  className="w-full bg-transparent text-zinc-300 placeholder:text-zinc-600 h-12 outline-none text-sm"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide text-zinc-400">
                <Command.Empty className="p-4 text-center text-sm text-red-400/80">
                  error: command not found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs font-bold text-zinc-600 px-2 py-3 [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2">
                  <Command.Item
                    onSelect={() => scrollTo("home")}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 rounded-md cursor-pointer aria-selected:bg-zinc-800/50 aria-selected:text-white transition-colors"
                  >
                    <Home size={14} className="text-zinc-500" /> Go to Home
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollTo("about")}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 rounded-md cursor-pointer aria-selected:bg-zinc-800/50 aria-selected:text-white transition-colors"
                  >
                    <User size={14} className="text-zinc-500" /> About Me
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollTo("projects")}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 rounded-md cursor-pointer aria-selected:bg-zinc-800/50 aria-selected:text-white transition-colors"
                  >
                    <Folder size={14} className="text-zinc-500" /> View Projects
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollTo("contact")}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 rounded-md cursor-pointer aria-selected:bg-zinc-800/50 aria-selected:text-white transition-colors"
                  >
                    <Mail size={14} className="text-zinc-500" /> Contact
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Socials" className="text-xs font-bold text-zinc-600 px-2 py-2 [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2 border-t border-zinc-800 mt-2 pt-4">
                  <Command.Item
                    onSelect={() => openLink("https://github.com/ansh3108")}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 rounded-md cursor-pointer aria-selected:bg-zinc-800/50 aria-selected:text-white transition-colors"
                  >
                    <Code size={14} className="text-zinc-500" /> GitHub
                  </Command.Item>
                  <Command.Item
                    onSelect={() => openLink("https://x.com/anshkdev")}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 rounded-md cursor-pointer aria-selected:bg-zinc-800/50 aria-selected:text-white transition-colors"
                  >
                    <MessageSquare size={14} className="text-zinc-500" /> Twitter / X
                  </Command.Item>
                  <Command.Item
                    onSelect={() => openLink("https://hackclub.com")}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 rounded-md cursor-pointer aria-selected:bg-zinc-800/50 aria-selected:text-white transition-colors"
                  >
                    <Layers size={14} className="text-zinc-500" /> Hack Club
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
