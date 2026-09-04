"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Command } from "lucide-react";

export function KbdNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Check if mac for cmd key
    setIsMac(typeof window !== "undefined" && navigator.userAgent.includes("Mac"));
    
    // Check if they've dismissed it in the past (optional, but good UX)
    const hasSeen = localStorage.getItem("has-seen-kbd");
    if (!hasSeen) {
      // Show after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      // Hide after 6 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("has-seen-kbd", "true");
      }, 7500);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="fixed top-8 right-8 md:top-12 md:right-12 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-full px-4 py-2.5 flex items-center gap-3 font-mono text-xs text-zinc-600 dark:text-zinc-400 pointer-events-none"
        >
          <Command size={14} className="text-zinc-900 dark:text-zinc-100" />
          <span>Press</span>
          <div className="flex gap-1 items-center font-sans text-[10px] font-semibold text-zinc-900 dark:text-zinc-100">
            <kbd className="min-w-[20px] h-5 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
              {isMac ? "⌘" : "Ctrl"}
            </kbd>
            <kbd className="min-w-[20px] h-5 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
              K
            </kbd>
          </div>
          <span>to open menu</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
