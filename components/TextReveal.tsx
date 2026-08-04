"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

export interface TextHighlight {
  phrase: string;
  href: string;
  color: string;
}

interface TextRevealProps {
  text: string;
  className?: string;
  highlights?: TextHighlight[];
}

function AnimatedWord({
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
    <motion.span className="inline" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export function TextReveal({ text, className, highlights = [] }: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  // Build highlight ranges: { startIdx, endIdx, href, color }
  const highlightRanges: { startIdx: number; endIdx: number; href: string; color: string }[] = [];

  for (const hl of highlights) {
    const phraseWords = hl.phrase.split(" ");
    for (let i = 0; i <= words.length - phraseWords.length; i++) {
      let match = true;
      for (let j = 0; j < phraseWords.length; j++) {
        if (words[i + j] !== phraseWords[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        highlightRanges.push({
          startIdx: i,
          endIdx: i + phraseWords.length - 1,
          href: hl.href,
          color: hl.color,
        });
        break;
      }
    }
  }

  // Build a set of indices that belong to a highlight for quick lookup
  const highlightedIndices = new Set<number>();
  for (const range of highlightRanges) {
    for (let i = range.startIdx; i <= range.endIdx; i++) {
      highlightedIndices.add(i);
    }
  }

  // Render words, grouping highlighted phrases under a single <a>
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < words.length) {
    const range = highlightRanges.find((r) => r.startIdx === i);

    if (range) {
      // Render the entire highlighted phrase inside one <a> tag
      const phraseElements: React.ReactNode[] = [];
      for (let j = range.startIdx; j <= range.endIdx; j++) {
        const start = (j / words.length) * 0.7;
        const end = ((j + 1) / words.length) * 0.7 + 0.3;
        
        phraseElements.push(
          <AnimatedWord
            key={`${words[j]}-${j}`}
            progress={scrollYProgress}
            range={[start, end]}
          >
            {words[j]}
          </AnimatedWord>
        );

        if (j < range.endIdx) {
          phraseElements.push(" ");
        }
      }

      elements.push(
        <a
          key={`hl-${range.startIdx}`}
          href={range.href}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-target hackclub-link inline whitespace-nowrap"
          style={{ color: range.color }}
        >
          {phraseElements}
        </a>
      );
      
      if (range.endIdx < words.length - 1) {
        elements.push(" ");
      }

      i = range.endIdx + 1;
    } else {
      const start = (i / words.length) * 0.7;
      const end = ((i + 1) / words.length) * 0.7 + 0.3;

      elements.push(
        <AnimatedWord
          key={`${words[i]}-${i}`}
          progress={scrollYProgress}
          range={[start, end]}
        >
          {words[i]}
        </AnimatedWord>
      );
      
      if (i < words.length - 1) {
        elements.push(" ");
      }

      i++;
    }
  }

  return (
    <p
      ref={containerRef}
      className={
        className ??
        "text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white"
      }
    >
      {elements}
    </p>
  );
}
