"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  items,
  speed = 28,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const direction = reverse ? "reverse" : "normal";

  return (
    <div
      aria-hidden
      className={`overflow-hidden border-y-4 border-ink bg-grape py-2.5 ${className}`}
    >
      <div
        className="flex w-max whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction,
        }}
      >
        {[0, 1].map((copy) =>
          items.map((item, i) => (
            <span key={`${copy}-${i}`} className="flex items-center">
              <span className="font-display uppercase text-3xl md:text-4xl text-bright px-5 tracking-tight">
                {item}
              </span>
              <span className="font-mono text-2xl text-sun select-none">✶</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
