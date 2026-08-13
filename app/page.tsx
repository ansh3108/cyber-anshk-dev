"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  GitBranch, Users, Star, MapPin, Code2, ExternalLink,
  ZoomIn, ZoomOut, GitCommit, GitFork, ArrowRight, Focus, Terminal as TerminalIcon, Check
} from "lucide-react";
import Link from "next/link";

/* ─── Signature Language Colors ────────────────────────── */
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Go: "#00ADD8",
  Shell: "#89e051",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Default: "#8b8b8b"
};

interface CommitEntry {
  repo: string;
  message: string;
  url: string;
  date: string;
}

interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
  return `${Math.floor(seconds / 2592000)}mo ago`;
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullWord = words[i];

      if (isDeleting) {
        setCurrentWord(fullWord.substring(0, currentWord.length - 1));
        setTypingSpeed(40);
      } else {
        setCurrentWord(fullWord.substring(0, currentWord.length + 1));
        setTypingSpeed(80);
      }

      if (!isDeleting && currentWord === fullWord) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && currentWord === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(100);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, loopNum, typingSpeed, words]);

  return (
    <span>
      {currentWord}
      <span className="animate-pulse text-[#9B8CFF]">_</span>
    </span>
  );
}

function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>(["Type 'help' for available commands."]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim().toLowerCase();
      const newOutput = [...output, `> ${cmd}`];
      
      switch (cmd) {
        case "help":
          newOutput.push("Commands: about, skills, contact, clear");
          break;
        case "about":
          newOutput.push("Ansh Kumar: Full-stack builder, hardware hacker, engineer.");
          break;
        case "skills":
          newOutput.push("Rust, TypeScript, React, Solana, PCB Design, Hardware");
          break;
        case "contact":
          newOutput.push("Email: hello@anshk.dev | X: @anshkdev");
          break;
        case "clear":
          setOutput([]);
          setInput("");
          return;
        default:
          newOutput.push(`Command not found: ${cmd}`);
      }
      
      setOutput(newOutput.slice(-6)); // Keep last 6 lines
      setInput("");
    }
  };

  return (
    <div className="bg-[#1A1B1F] border border-[#9B8CFF]/20 rounded-lg p-6 font-mono text-[13px] shadow-sm relative overflow-hidden group w-full mb-24">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
        <div className="flex gap-1.5 mr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
        </div>
        <TerminalIcon size={12} className="text-zinc-500" />
        <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Terminal</span>
      </div>
      <div className="space-y-1.5 mb-3 text-zinc-400">
        {output.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? "text-zinc-300" : line.includes("Command not found") ? "text-red-400" : "text-[#6EA8FF]"}>
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-zinc-300">
        <span className="text-[#9B8CFF] font-bold">➜ ~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none flex-1 text-zinc-300 placeholder:text-zinc-700 cursor-target"
          spellCheck={false}
          autoComplete="off"
          placeholder="try 'help'..."
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [profile, setProfile] = useState<Record<string, number> | null>(null);
  const [totalStars, setTotalStars] = useState<number | null>(null);
  const [totalForks, setTotalForks] = useState<number | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [recentCommits, setRecentCommits] = useState<CommitEntry[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [zoom, setZoom] = useState(10);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@anshk.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const res = await fetch('/api/github');
        if (!res.ok) {
          setLoadingStats(false);
          return;
        }
        const data = await res.json();
        
        if (data.profile) setProfile(data.profile);
        if (data.stars !== undefined) setTotalStars(data.stars);
        if (data.forks !== undefined) setTotalForks(data.forks);
        
        if (data.languages && Array.isArray(data.languages)) {
           const withColors = data.languages.map((l: any) => ({
             ...l,
             color: LANGUAGE_COLORS[l.name] || LANGUAGE_COLORS.Default
           }));
           setLanguages(withColors);
        }

        if (data.commits && Array.isArray(data.commits)) {
           setRecentCommits(data.commits);
        }
        
        setLoadingStats(false);
      } catch (e) {
        setLoadingStats(false);
      }
    }

    fetchGithubStats();
  }, []);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [77.209, 28.6139],
      zoom: zoom,
      interactive: true,
      attributionControl: false,
    });

    const marker = document.createElement("div");
    marker.innerHTML = `
      <div style="position:relative;width:0;height:0">
        <div style="position:absolute;width:60px;height:60px;border-radius:50%;background:rgba(139,124,255,0.3);transform:translate(-50%,-50%);animation:sonar 2.5s infinite"></div>
        <div style="position:absolute;width:12px;height:12px;border-radius:50%;background:#9B8CFF;border:2px solid #151618;transform:translate(-50%,-50%);box-shadow:0 0 20px 5px rgba(139,124,255,0.3)"></div>
      </div>
      <style>@keyframes sonar{0%{transform:translate(-50%,-50%) scale(0.5);opacity:1}100%{transform:translate(-50%,-50%) scale(4);opacity:0}}</style>
    `;
    new maplibregl.Marker({ element: marker }).setLngLat([77.209, 28.6139]).addTo(map.current);
    map.current.dragRotate.disable();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (map.current) map.current.setZoom(zoom);
  }, [zoom]);

  return (
    <div className="flex flex-col w-full mx-auto pb-20 max-w-[1200px] px-6 lg:px-12 pt-8 md:pt-24 lg:pt-32">
      
      {/* Hero Section */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 relative w-full text-left">
        <div className="relative inline-block mb-3">
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-bold tracking-tight text-[#55565E]">
            Building projects
          </h2>
          <div className="absolute top-1/2 left-0 right-0 h-1.5 md:h-2 xl:h-[10px] bg-[#E34B5F] -translate-y-1/2 transform rotate-1 rounded-full opacity-90"></div>
        </div>

        <h1 className="text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold tracking-tight text-[#F4F4F5] leading-[0.95] relative z-10 -mt-4 md:-mt-6 xl:-mt-8 mb-6 md:mb-10">
          Building Scalable<br />
          <span className="text-[#9B8CFF]">
            <Typewriter words={["Software", "Products", "Systems", "Tools", "Hardware"]} />
          </span>
        </h1>
        
        <div className="space-y-4 md:space-y-5 relative z-10 w-full max-w-[850px]">
          <h2 className="text-[#A1A1AA] font-normal tracking-wide text-[18px] md:text-[22px] lg:text-[24px]">
            Hi, I'm <span className="text-white font-bold">Ansh Kumar.</span>
          </h2>
          <p className="text-[#A1A1AA] text-[18px] md:text-[20px] lg:text-[22px] leading-[1.7] font-light max-w-full">
            I make CLI tools, craft hardware from circuit boards to microcontrollers, and passionate about Web3. I ship at <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="text-[#ec3750] font-medium underline decoration-1 underline-offset-4 hover:decoration-wavy">Hack Club</a>, and actively contribute to open-source.
            <br />
            <span className="italic text-white opacity-90 mt-3 block text-[16px] md:text-[18px] lg:text-[20px]">I'm also open to freelance collaborations.</span>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-5 pt-10 md:pt-14 pb-8 relative z-10 w-full">
          <button onClick={handleCopyEmail} className="cursor-target relative overflow-hidden inline-flex items-center justify-center gap-2 px-[32px] md:px-[40px] h-[60px] md:h-[64px] min-w-[220px] rounded-full bg-[#F4F4F5] text-black hover:bg-white hover:-translate-y-[1px] font-medium transition-all shadow-sm text-[17px] md:text-[18px]">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center gap-2"
                >
                  Email copied! <Check size={20} className="text-[#9B8CFF]" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center gap-2"
                >
                  Ask about me <ArrowRight size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Link href="/projects" className="cursor-target inline-flex items-center justify-center gap-2 px-[32px] md:px-[40px] h-[60px] md:h-[64px] rounded-full bg-zinc-900/30 hover:bg-zinc-900/60 hover:-translate-y-[1px] text-[#F4F4F5] border border-zinc-800 hover:border-zinc-700 transition-all font-medium text-[17px] md:text-[18px]">
            Projects completed
          </Link>
        </div>
      </div>

      <div className="w-full mt-16 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#686A73] font-mono text-[11px] uppercase tracking-[0.2em] font-bold">
            &gt;_
          </span>
          <div className="flex-1 h-px bg-zinc-800"></div>
        </div>
        <InteractiveTerminal />
      </div>

      {/* Base Station (Dashboard) */}
      <div className="space-y-8 my-16">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={16} className="text-zinc-500" />
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Statistics</h3>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Map Card */}
            <div className="md:col-span-7 bg-zinc-900/50 rounded-2xl overflow-hidden relative min-h-[350px] border border-zinc-800">
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-zinc-950/90 to-transparent">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={11} className="text-zinc-500" /> Location
                </span>
                <span className="text-[10px] text-zinc-500 tracking-wider uppercase">Delhi · India</span>
              </div>
              <div className="absolute inset-0 opacity-80 saturate-50 contrast-[1.1]">
                <div ref={mapContainer} className="w-full h-full" />
              </div>
              <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-30">
                <button onClick={() => setZoom((z) => Math.min(z + 1, 18))} className="p-1.5 bg-zinc-950/80 border border-zinc-800 rounded-lg hover:border-zinc-600 text-zinc-500 hover:text-white transition-all cursor-target">
                  <ZoomIn size={14} />
                </button>
                <button onClick={() => setZoom((z) => Math.max(z - 1, 1))} className="p-1.5 bg-zinc-950/80 border border-zinc-800 rounded-lg hover:border-zinc-600 text-zinc-500 hover:text-white transition-all cursor-target">
                  <ZoomOut size={14} />
                </button>
              </div>
            </div>

            {/* Recent Commits */}
            <div className="md:col-span-5 bg-zinc-900/50 rounded-2xl p-5 flex flex-col border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitCommit size={14} className="text-[#9B8CFF]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400">Recent Commits</span>
                </div>
              </div>
              <div className="flex-1 space-y-0.5">
                {recentCommits.length === 0 ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="py-2.5 border-b border-zinc-800 last:border-0">
                    <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse mb-1.5" />
                    <div className="h-3.5 w-full bg-zinc-800 rounded animate-pulse mb-1.5" />
                  </div>
                )) : recentCommits.slice(0, 5).map((commit, i) => (
                  <a key={`${commit.url}-${i}`} href={commit.url} target="_blank" rel="noopener noreferrer" className="cursor-target block py-2.5 border-b border-zinc-800/60 last:border-0 group/commit hover:bg-zinc-800/50 rounded-lg px-2 -mx-2 transition-colors">
                    <div className="text-[10px] font-bold text-[#9B8CFF]/90 uppercase tracking-widest mb-1">{commit.repo}</div>
                    <div className="text-[13px] text-zinc-300 group-hover/commit:text-white transition-colors flex items-center gap-2 min-w-0">
                      <span className="truncate">{commit.message}</span>
                      <ExternalLink size={12} className="shrink-0 opacity-0 group-hover/commit:opacity-100 text-[#E34B5F] transition-opacity" />
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">{timeAgo(commit.date)}</div>
                  </a>
                ))}
              </div>
              <a href="https://github.com/ansh3108" target="_blank" rel="noopener noreferrer" className="cursor-target mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-[#9B8CFF]/40 hover:bg-[#9B8CFF]/10 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all group">
                View on GitHub <ExternalLink size={11} className="text-zinc-500 group-hover:text-[#9B8CFF] transition-colors" />
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Languages Used */}
            <div className="md:col-span-7 bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={14} className="text-zinc-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Languages Used</span>
              </div>
              <div className="space-y-4">
                {loadingStats ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <div className="relative flex items-center justify-center w-8 h-8">
                      <div className="absolute w-full h-full border-2 border-zinc-800 border-t-[#9B8CFF] rounded-full animate-spin"></div>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">Fetching the Latest stats...</span>
                  </div>
                ) : languages.length === 0 ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between"><div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" /><div className="h-3 w-8 bg-zinc-800 rounded animate-pulse" /></div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full" />
                  </div>
                )) : languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                        <span className="text-[13px] font-semibold text-zinc-400">{lang.name}</span>
                      </div>
                      <span className="text-[12px] font-bold text-zinc-500 tabular-nums">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: lang.color }} initial={{ width: 0 }} whileInView={{ width: `${lang.percentage}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Stats Box */}
            <a href="https://github.com/ansh3108" target="_blank" rel="noopener noreferrer" className="cursor-target block md:col-span-5 bg-zinc-900/50 hover:bg-zinc-900/80 rounded-2xl p-6 flex flex-col justify-center border border-zinc-800 hover:border-[#9B8CFF]/40 transition-all group/stats">
              <div className="flex items-center gap-2 mb-6">
                <Star size={14} className="text-[#9B8CFF]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover/stats:text-white transition-colors">GitHub Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="text-zinc-500 group-hover/stats:text-[#9B8CFF] transition-colors"><GitBranch size={18} /></div>
                  {loadingStats ? (
                    <div className="h-8 w-12 bg-zinc-800 rounded animate-pulse my-1" />
                  ) : (
                    <div className="text-2xl font-black text-zinc-100 tabular-nums group-hover/stats:text-white transition-colors">{profile?.public_repos ?? "—"}</div>
                  )}
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em]">Repos</div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="text-zinc-500 group-hover/stats:text-[#9B8CFF] transition-colors"><Users size={18} /></div>
                  {loadingStats ? (
                    <div className="h-8 w-12 bg-zinc-800 rounded animate-pulse my-1" />
                  ) : (
                    <div className="text-2xl font-black text-zinc-100 tabular-nums group-hover/stats:text-white transition-colors">{profile?.followers ?? "—"}</div>
                  )}
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em]">Followers</div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="text-zinc-500 group-hover/stats:text-[#9B8CFF] transition-colors"><Star size={18} /></div>
                  <div className="text-2xl font-black text-zinc-100 tabular-nums group-hover/stats:text-white transition-colors">{totalStars ?? "—"}</div>
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em]">Stars</div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="text-zinc-500 group-hover/stats:text-[#9B8CFF] transition-colors"><GitFork size={18} /></div>
                  <div className="text-2xl font-black text-zinc-100 tabular-nums group-hover/stats:text-white transition-colors">{totalForks ?? "—"}</div>
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em]">Forks</div>
                </div>
              </div>
            </a>
          </div>
        </FadeIn>
      </div>

    </div>
  );
}
