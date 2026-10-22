"use client";

import { useEffect, useState } from "react";
import { Sticker } from "@/components/Sticker";

type Stats = {
  stars: number;
  forks: number;
  languages: { name: string; percentage: number }[];
};

const BAR_COLORS = ["bg-acid", "bg-neon", "bg-sun", "bg-flamingo", "bg-grape"];

export function GithubStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: Stats | null) => {
        if (alive && json && json.languages?.length) setStats(json);
      })
      .catch(() => {
        // offline is fine — tile just stays a skeleton
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!stats) {
    return (
      <div className="p-5 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="h-10 w-20 bg-ink/20 animate-pulse" />
          <div className="h-10 w-20 bg-ink/20 animate-pulse" />
        </div>
        <div className="h-8 w-full bg-ink/10 animate-pulse" />
        <div className="h-4 w-2/3 bg-ink/10 animate-pulse" />
      </div>
    );
  }

  // One whole bar: top-5 language segments + an "Other" chip for the rest.
  const top = stats.languages.slice(0, 5);
  const otherPct = Math.max(0, Math.round(100 - top.reduce((sum, l) => sum + l.percentage, 0)));

  return (
    <div className="p-5 flex flex-col gap-4 h-full justify-center">
      {/* Big numbers */}
      <div className="flex gap-3">
        <div className="flex-1 border-[3px] border-ink bg-surface shadow-[3px_3px_0_0_var(--color-ink)] px-3 py-2 -rotate-1">
          <span className="block font-display text-2xl leading-none">{stats.stars}</span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50">
            stars
          </span>
        </div>
        <div className="flex-1 border-[3px] border-ink bg-surface shadow-[3px_3px_0_0_var(--color-ink)] px-3 py-2 rotate-1">
          <span className="block font-display text-2xl leading-none">{stats.forks}</span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50">
            forks
          </span>
        </div>
      </div>

      {/* The one whole bar */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50">
          languages ✶ share of bytes
        </span>
        <Sticker color="sun" deg={-4} className="shadow-none! hidden xl:inline-block">
          top 5 + other
        </Sticker>
      </div>

      <div className="flex h-9 w-full border-[3px] border-ink bg-surface overflow-hidden shadow-[4px_4px_0_0_var(--color-ink)] -rotate-[0.5deg]">
        {top.map((lang, i) => (
          <div
            key={lang.name}
            title={`${lang.name} ${lang.percentage}%`}
            style={{ width: `${lang.percentage}%` }}
            className={`h-full border-r-[3px] border-ink ${BAR_COLORS[i % BAR_COLORS.length]}`}
          />
        ))}
        {otherPct > 2 && (
          <div
            title={`Other ${otherPct}%`}
            style={{ width: `${otherPct}%` }}
            className="h-full bg-ink/25"
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {top.map((lang, i) => (
          <span
            key={lang.name}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider"
          >
            <span
              aria-hidden
              className={`w-3 h-3 border-2 border-ink inline-block shrink-0 ${BAR_COLORS[i % BAR_COLORS.length]}`}
            />
            {lang.name} <span className="text-ink/50">{lang.percentage}%</span>
          </span>
        ))}
        {otherPct > 2 && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
            <span aria-hidden className="w-3 h-3 border-2 border-ink bg-ink/25 inline-block shrink-0" />
            other <span className="text-ink/50">{otherPct}%</span>
          </span>
        )}
      </div>
    </div>
  );
}
