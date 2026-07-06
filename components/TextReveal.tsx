"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span className="mr-[0.25em] inline-block" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export function TextReveal({ text, className }: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={
        className ??
        "text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white"
      }
    >
      {words.map((word, i) => {
        const start = (i / words.length) * 0.7;
        const end = ((i + 1) / words.length) * 0.7 + 0.3;

        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
