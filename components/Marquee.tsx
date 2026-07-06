"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  items,
  speed = 30,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const direction = reverse ? "reverse" : "normal";

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="inline-flex items-center hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction,
        }}
      >
        {[0, 1].map((copy) =>
          items.map((item, i) => (
            <span key={`${copy}-${i}`} className="inline-flex items-center">
              <span
                className="text-7xl md:text-9xl font-black uppercase tracking-tighter px-4 shrink-0"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {item}
              </span>
              <span className="text-2xl text-white/10 px-4 shrink-0 select-none">
                ◆
              </span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
