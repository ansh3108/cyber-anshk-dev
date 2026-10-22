import * as React from "react";

const COLORS = {
  grape: "bg-grape text-bright",
  acid: "bg-acid text-void",
  flamingo: "bg-flamingo text-bright",
  sun: "bg-sun text-void",
  neon: "bg-neon text-void",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-paper",
} as const;

interface StickerProps {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
  deg?: number;
  className?: string;
}

/**
 * A rotated, bordered, hard-shadowed label chip — the signature
 * neo-brutalist "sticker" scattered across the site.
 */
export function Sticker({
  children,
  color = "sun",
  deg = -2,
  className = "",
}: StickerProps) {
  return (
    <span
      style={{ transform: `rotate(${deg}deg)` }}
      className={`inline-block w-fit border-[3px] border-ink px-3 py-1 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest shadow-[4px_4px_0_0_var(--color-ink)] ${COLORS[color]} ${className}`}
    >
      {children}
    </span>
  );
}
