"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function GlitchText({ text, className = "", as: Component = "span" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Randomly glitch every few seconds
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200); // Quick glitch duration
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <Component
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className={isGlitching ? "opacity-0" : "opacity-100"}>{text}</span>
      
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-[2px] text-[#0ff] mix-blend-screen"
            animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-[-2px] text-[#f0f] mix-blend-screen"
            animate={{ x: [2, -2, 1, 0], y: [-1, 1, 0, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
          >
            {text}
          </motion.span>
          <span className="absolute top-0 left-0 text-white">{text}</span>
        </>
      )}
    </Component>
  );
}
