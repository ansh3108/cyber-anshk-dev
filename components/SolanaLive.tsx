"use client";

import { useEffect, useState } from "react";
import { Sticker } from "@/components/Sticker";

type SolanaData = {
  slot: number;
  epoch: number;
  progress: number;
  price: number;
};

export function SolanaLive() {
  const [data, setData] = useState<SolanaData | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/solana");
        const json = (await res.json()) as SolanaData;
        if (alive && json && json.slot > 0) setData(json);
      } catch {
        // keep skeleton — tolerate network hiccups
      }
    };
    load();
    const interval = setInterval(load, 15000);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, []);

  if (!data) {
    return (
      <div className="p-5 flex flex-col gap-4">
        <div className="h-4 w-24 bg-ink/20 animate-pulse" />
        <div className="h-8 w-full bg-ink/20 animate-pulse" />
        <div className="h-3 w-full bg-ink/10 animate-pulse" />
      </div>
    );
  }

  const filled = Math.round((data.progress / 100) * 14);

  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <span className="live-dot" aria-hidden />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50">
          mainnet ✶ live
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-2 border-b-[3px] border-ink pb-2.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
          Epoch {data.epoch}
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
          {data.progress.toFixed(1)}%
        </span>
      </div>

      {/* Epoch progress blocks */}
      <div
        aria-hidden
        className="flex gap-[3px]"
        title={`${data.progress.toFixed(1)}% through epoch ${data.epoch}`}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`flex-1 h-3.5 border-[2px] border-ink ${i < filled ? "bg-acid" : "bg-surface"}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 mt-auto">
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50 truncate">
          slot {data.slot.toLocaleString()}
        </span>
        {data.price > 0 && (
          <Sticker color="grape" deg={2} className="shadow-none!">
            SOL ${data.price.toFixed(2)}
          </Sticker>
        )}
      </div>
    </div>
  );
}
