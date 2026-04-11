"use client";
import { useState, useEffect } from "react";

export const Sidebar = () => {
  const [time, setTime] = useState("");
  const [boot, setBoot] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { 
        timeZone: "Asia/Kolkata", 
        hour12: false 
      }));
    }, 1000);
    
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => setBoot(i), i * 120);
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="hidden md:flex flex-col w-[210px] bg-surface border-r border-border h-full p-4 shrink-0">
      <div className={`transition-opacity duration-300 ${boot >= 1 ? "opacity-100" : "opacity-0"}`}>
        <div className="text-[13px] font-bold text-purple">ansh</div>
        <div className="text-[11px] text-dim mb-4">@devbox</div>
      </div>

      <div className="h-px bg-border mb-4" />

      <div className={`space-y-1 transition-opacity duration-300 ${boot >= 2 ? "opacity-100" : "opacity-0"}`}>
        <div className="flex text-[11px]"><span className="w-[46px] text-[#555566]">loc</span><span>Delhi, IN</span></div>
        <div className="flex text-[11px]"><span className="w-[46px] text-[#555566]">avail</span><span className="text-solana">open</span></div>
        <div className="flex text-[11px]">
          <span className="w-[46px] text-[#555566]">stack</span>
          <div className="flex flex-col">
            <span>Rust</span>
            <span>Solana</span>
            <span>TypeScript</span>
          </div>
        </div>
        <div className="flex text-[11px]"><span className="w-[46px] text-[#555566]">focus</span><span className="text-purple">Web3 / AI</span></div>
      </div>

      <div className="h-px bg-border my-4" />

      <div className={`space-y-2 transition-opacity duration-300 ${boot >= 3 ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-center gap-2 text-[11px]">
          <div className="w-[7px] h-[7px] rounded-full bg-solana shadow-[0_0_4px_#14F19580]" /> building
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <div className="w-[7px] h-[7px] rounded-full bg-solana shadow-[0_0_4px_#14F19580]" /> learning
        </div>
        <div className="flex items-center gap-2 text-[11px] text-dim">
          <div className="w-[7px] h-[7px] rounded-full bg-[#2a2a38]" /> sleeping
        </div>
      </div>

      <div className={`mt-auto transition-opacity duration-300 ${boot >= 4 ? "opacity-100" : "opacity-0"}`}>
        <div className="text-solana text-[11px]">IST {time || "00:00:00"}</div>
        <div className="text-dim text-[10px]">uptime 24/7</div>
      </div>
    </aside>
  );
}; 