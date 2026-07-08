"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function PCBBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[-1] opacity-20 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 100 0 L 100 200 L 250 350 L 250 800 M 80vw 0 L 80vw 400 L 60vw 600 L 60vw 100vh M 30vw 20vh L 50vw 40vh L 50vw 80vh M 0 60vh L 20vw 60vh L 40vw 80vh L 40vw 100vh"
          fill="transparent"
          stroke="#9333ea"
          strokeWidth="2"
          style={{ pathLength }}
        />
        {/* Vias (the little dots on PCBs) */}
        <motion.circle cx="100" cy="200" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
        <motion.circle cx="250" cy="350" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
        <motion.circle cx="80vw" cy="400" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
        <motion.circle cx="60vw" cy="600" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
        <motion.circle cx="30vw" cy="20vh" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
        <motion.circle cx="50vw" cy="40vh" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
        <motion.circle cx="20vw" cy="60vh" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
        <motion.circle cx="40vw" cy="80vh" r="4" fill="#9333ea" style={{ opacity: pathLength }} />
      </svg>
    </div>
  );
}
