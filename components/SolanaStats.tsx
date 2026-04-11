"use client";
import { useState, useEffect } from "react";

export const SolanaStats = () => {
  const [stats, setStats] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/solana");
      const data = await res.json();
      setStats(data);
    } catch (e) {
      setStats({ slot: 0, epoch: 0, progress: 0, price: 0 });
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="text-dim text-[11px] animate-pulse">connecting to mainnet-beta...</div>;

  const activeBars = Math.round((stats.progress / 100) * 20);
  const progressBar = "█".repeat(activeBars) + "░".repeat(20 - activeBars);

  return (
    <div className="space-y-2 text-[11px]">
      <div className="flex justify-between max-w-[300px]">
        <span className="text-muted">SOL/USD</span>
        <span className="text-solana">
          ${stats.price > 0 ? stats.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
        </span>
      </div>
      
      <div className="flex justify-between max-w-[300px]">
        <span className="text-muted">Current Slot</span>
        <span className="text-primary">
          {stats.slot > 0 ? stats.slot.toLocaleString() : "connecting..."}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between max-w-[300px]">
          <span className="text-muted">Epoch {stats.epoch || "..."}</span>
          <span className="text-purple">{stats.progress > 0 ? `${stats.progress.toFixed(1)}%` : "0%"}</span>
        </div>
        <div className="text-dim tracking-tighter leading-none">{progressBar}</div>
      </div>
    </div>
  );
};
