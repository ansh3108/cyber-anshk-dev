"use client";
import { useState, useEffect } from "react";

export const SolanaStats = () => {
  const [s, setS] = useState<any>(null);

  useEffect(() => {
    const f = () => fetch("/api/solana").then(r => r.json()).then(setS).catch(() => {});
    f();
    const i = setInterval(f, 15000);
    return () => clearInterval(i);
  }, []);

  if (!s) return <div className="text-[11px] text-[#8b949e] animate-pulse uppercase tracking-widest">syncing_mainnet...</div>;

  const b = Math.round((s.progress / 100) * 20);
  const p = "█".repeat(b) + "░".repeat(20 - b);

  return (
    <div className="space-y-4 text-[11px]">
      <div className="flex justify-between items-center border-b border-[#30363d] pb-2">
        <span className="text-[#8b949e] uppercase">solana_market</span>
        <span className="text-[#9333ea] font-bold">${s.price.toFixed(2)}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between uppercase text-[#8b949e]">
          <span>Epoch {s.epoch}</span>
          <span>{s.progress.toFixed(1)}%</span>
        </div>
        <div className="text-[#30363d] truncate">{p}</div>
        <div className="text-[9px] text-[#484f58] pt-1 uppercase">Slot: {s.slot.toLocaleString()}</div>
      </div>
    </div>
  );
};