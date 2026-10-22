"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Command } from "lucide-react";

export function KbdNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("has-seen-kbd");
    if (hasSeen) return;

    // Show after a short delay (also detect platform inside the callback
    // rather than synchronously in the effect body)
    const timer = setTimeout(() => {
      setIsMac(navigator.userAgent.includes("Mac"));
      setIsVisible(true);
    }, 1500);

    // Hide after a few seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("has-seen-kbd", "true");
    }, 7500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="print:hidden fixed top-20 right-6 md:right-10 z-50 bg-surface border-4 border-ink shadow-[6px_6px_0_0_var(--color-ink)] rounded-none px-4 py-3 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-wider text-ink pointer-events-none"
        >
          <Command size={15} className="text-grape" strokeWidth={2.5} />
          <span>Press</span>
          <div className="flex gap-1.5 items-center">
            <kbd className="min-w-[22px] h-6 flex items-center justify-center bg-sun border-[3px] border-ink text-[11px]">
              {isMac ? "⌘" : "Ctrl"}
            </kbd>
            <kbd className="min-w-[22px] h-6 flex items-center justify-center bg-sun border-[3px] border-ink text-[11px]">
              K
            </kbd>
          </div>
          <span>for shortcuts</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
