"use client";

import { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { 
  Cpu, Gamepad2, Terminal, Mail, Star, 
  ExternalLink, GitBranch, Users, MapPin, 
  Code2, Rocket, Globe, ZoomIn, ZoomOut 
} from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function Home() {
  const [uptime, setUptime] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [languages, setLanguages] = useState<{name: string, percent: number}[]>([]);
  const [zoom, setZoom] = useState(10);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const clock = setInterval(() => setUptime(prev => prev + 1), 1000);

    const sync = async () => {
      try {
        const [u, r] = await Promise.all([
          fetch("https://api.github.com/users/ansh3108").then(res => res.json()),
          fetch("https://api.github.com/users/ansh3108/repos?sort=updated&per_page=50").then(res => res.json())
        ]);
        
        setProfile(u);
        setRepos(r.slice(0, 6));

        const counts: Record<string, number> = {};
        r.forEach((repo: any) => {
          if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
        });

        setLanguages(
          Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({
              name,
              percent: Math.round((count / r.length) * 100)
            }))
        );
      } catch (err) {
        console.error("Signal lost:", err);
      }
    };

    sync();
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const coords: [number, number] = [77.2090, 28.6139];

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: coords,
      zoom: zoom,
      interactive: true,
      attributionControl: false,
    });

    const el = document.createElement('div');
    el.innerHTML = `
      <div style="position:relative;width:0;height:0">
        <div style="position:absolute;width:72px;height:72px;border-radius:50%;background:radial-gradient(circle, rgba(147,51,234,0.24) 0%, rgba(147,51,234,0.1) 34%, rgba(147,51,234,0) 72%);transform:translate(-50%,-50%);animation:pulse-ring 2.2s cubic-bezier(0.4,0,0.2,1) infinite"></div>
        <div style="position:absolute;width:48px;height:48px;border-radius:50%;background:radial-gradient(circle, rgba(167,139,250,0.22) 0%, rgba(147,51,234,0.16) 42%, rgba(147,51,234,0) 74%);transform:translate(-50%,-50%);animation:pulse-core 1.8s ease-in-out infinite"></div>
        <div style="position:absolute;width:18px;height:18px;border-radius:50%;background:radial-gradient(circle at 35% 35%, #ffffff 0%, #f5d0fe 14%, #c084fc 34%, #9333ea 62%, #6d28d9 100%);border:2px solid rgba(255,255,255,0.98);transform:translate(-50%,-50%);box-shadow:0 0 16px 5px rgba(147,51,234,0.95), 0 0 38px 14px rgba(147,51,234,0.5), 0 0 70px 20px rgba(147,51,234,0.18);filter:drop-shadow(0 0 20px #9333ea)"></div>
      </div>
      <style>
        @keyframes pulse-ring {
          0% { transform: translate(-50%,-50%) scale(0.42); opacity: 0.0; }
          18% { opacity: 0.7; }
          55% { opacity: 0.32; }
          100% { transform: translate(-50%,-50%) scale(3.2); opacity: 0; }
        }
        @keyframes pulse-core {
          0%, 100% { transform: translate(-50%,-50%) scale(0.92); opacity: 0.78; }
          50% { transform: translate(-50%,-50%) scale(1.08); opacity: 1; }
        }
      </style>
    `;

    new maplibregl.Marker({ element: el }).setLngLat(coords).addTo(map.current);
    map.current.dragRotate.disable();

    return () => map.current?.remove();
  }, []);

  useEffect(() => {
    if (map.current) map.current.setZoom(zoom);
  }, [zoom]);

  const colors: Record<string, string> = {
    Rust: "#ce412b",
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    Python: "#3776ab",
    Solidity: "#aa67ff",
    Java: "#b07219",
    "Next.js": "#ffffff"
  };

  const games = [
    { n: "Last of Us", s: "playstation", color: "003791" },
    { n: "GTA V", s: "rockstargames", color: "ffffff" },
    { n: "Minecraft", icon: <MinecraftLogo />, accent: "rgba(125,207,106,0.15)" },
    { n: "Forza Horizon 5", icon: <ForzaHorizonLogo />, accent: "rgba(249,115,22,0.16)" },
    { n: "God of War", s: "playstation", color: "003791" }
  ];

  return (
    <div className="relative min-h-screen font-mono text-[#e6edf3] selection:bg-[#9333ea]/30">
      <div className="fixed inset-0 -z-10">
        <BeamsBackground />
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/30 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex justify-between items-center">
        <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-[#8b949e] mx-auto md:ml-20">
          <a href="#home" className="hover:text-white transition-colors">/home</a>
          <a href="#dashboard" className="hover:text-white transition-colors">/dashboard</a>
          <a href="#projects" className="hover:text-white transition-colors">/projects</a>
          <a href="#contact" className="hover:text-white transition-colors">/contact</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <section id="home" className="pt-48 pb-32 flex flex-col md:flex-row items-center justify-between gap-16 text-center md:text-left">
          <div className="flex-1 space-y-8 order-2 md:order-1">
            <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white leading-none">
              Ansh K<span className="text-[#9333ea]">.</span>
            </h1>
            <p className="text-[#8b949e] max-w-lg mx-auto md:mx-0 leading-relaxed text-lg font-medium">
              Building decentralized systems on Solana. 
              Shipping at Hack Club and contributing to the open-source galaxy. 
              Always moving towards the next frontier in Web3.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Tag emoji="🎓" text="student" color="#9333ea" />
              <Tag emoji="⭐" text="hack club" color="#f1c40f" />
              <Tag emoji="🔓" text="open-source" color="#14F195" />
              <Tag emoji="🟣" text="solana" color="#3498db" />
            </div>
            <div className="flex justify-center md:justify-start pt-2">
              <SocialLinks />
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-white/10 p-2 relative group">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#9333ea]/20 transition-transform duration-500 group-hover:scale-[1.02] bg-[#0d1117]">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Ansh Profile" 
                    className="w-full h-full object-cover grayscale-[10%] contrast-[1.1]"
                  />
                ) : (
                  <div className="w-full h-full animate-pulse bg-white/5" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#9333ea] rounded-full border-4 border-[#0a0a0a] shadow-[0_0_20px_#9333ea]" />
            </div>
          </div>
        </section>

        <section id="dashboard" className="py-24 space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Mission Control</h2>
            <Rocket className="text-[#9333ea] animate-bounce" size={28} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group relative h-full min-h-[350px]">
              <div className="p-4 border-b border-white/5 flex items-center justify-between relative z-20 bg-black/60 backdrop-blur-md">
                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} /> Delhi_Node
                </span>
                <span className="text-[10px] text-white/50 tracking-tighter">28.6139° N, 77.2090° E</span>
              </div>
              
              <div className="absolute inset-0 bg-[#08080c] grayscale brightness-75 contrast-125">
                <div ref={mapContainer} className="w-full h-full" />
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-30">
                  <button onClick={() => setZoom(z => Math.min(z + 1, 18))} className="p-2 bg-black/80 border border-white/10 rounded hover:border-[#9333ea] transition-all text-white"><ZoomIn size={16} /></button>
                  <button onClick={() => setZoom(z => Math.max(z - 1, 1))} className="p-2 bg-black/80 border border-white/10 rounded hover:border-[#9333ea] transition-all text-white"><ZoomOut size={16} /></button>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-2 mb-8">
                <Code2 size={12} /> Tech_Proficiency
              </span>
              <div className="space-y-5">
                {languages.length > 0 ? (
                  languages.map(l => (
                    <div key={l.name} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-tighter">
                        <span className="text-white/80">{l.name}</span>
                        <span className="text-[#484f58]">{l.percent}%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-1000" style={{ width: `${l.percent}%`, backgroundColor: colors[l.name] || "#9333ea" }} />
                      </div>
                    </div>
                  ))
                ) : <div className="h-40 bg-white/5 animate-pulse rounded" />}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat icon={<Users />} label="Followers" val={profile?.followers} />
            <Stat icon={<GitBranch />} label="Repos" val={profile?.public_repos} />
            <Stat icon={<Star />} label="Stars" val="156" />
            <Stat icon={<Globe />} label="Uptime" val="Live" />
          </div>
        </section>

        <section id="projects" className="py-24 space-y-12">
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Recent Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map(r => (
              <a key={r.id} href={r.html_url} target="_blank" className="group block bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:border-[#9333ea]/40 transition-all relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#9333ea]">{r.name}</h3>
                    <ExternalLink size={18} className="text-[#484f58]" />
                  </div>
                  <p className="text-sm text-[#8b949e] line-clamp-2 h-10">{r.description || "Deploying decentralized infrastructure."}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest">
                    <span className="px-2 py-1 bg-[#9333ea]/10 text-[#9333ea] rounded lowercase tracking-normal font-medium">{r.language || "code"}</span>
                    <span className="flex items-center gap-2 text-[#484f58]"><Star size={14} /> {r.stargazers_count}</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#9333ea] blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
            ))}
          </div>
        </section>

        <section className="py-24 space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Currently Surviving</h2>
            <Gamepad2 className="text-[#9333ea]" size={28} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {games.map(g => (
              <div key={g.n} className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-[#9333ea]/40">
                <div
                  className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at center, ${g.accent ?? "rgba(147,51,234,0.15)"} 0%, transparent 70%)` }}
                />
                <div className="relative z-10 flex h-full items-center justify-center">
                  {g.icon ?? (
                    <img 
                      src={`https://cdn.simpleicons.org/${g.s}/${g.color ?? "ffffff"}`} 
                      className="w-7 h-7 opacity-70 transition-all group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
                      alt={g.n} 
                    />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/35 px-2 py-2 text-center backdrop-blur-sm">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-white/75">{g.n}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-40 text-center space-y-16">
          <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase underline decoration-[#9333ea] decoration-4 underline-offset-8">Contact</h2>
          <div className="flex flex-col items-center gap-8">
            <a href="mailto:hey@anshk.dev" className="group relative flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:scale-[1.03] transition-all shadow-[0_0_30px_rgba(147,51,234,0.1)]">
              <Mail size={24} /> shoot me an email!
              <div className="absolute inset-0 bg-[#9333ea] rounded-full -z-10 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity" />
            </a>
            <SocialLinks />
          </div>
        </section>

        <footer className="py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-[#484f58] uppercase tracking-[0.4em]">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#9333ea] animate-ping" />
            You're here for: {Math.floor(uptime / 60)}:{uptime % 60 < 10 ? `0${uptime % 60}` : uptime % 60}
          </div>
          <div className="flex items-center gap-8">
            <span></span>
            <span className="text-[#9333ea]"></span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Tag({ emoji, text, color }: { emoji: string; text: string; color: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold hover:bg-white/10 transition-colors">
      <span>{emoji}</span><span className="text-white/80">{text}</span><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

function Stat({ icon, label, val }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-2 hover:border-[#9333ea]/30 transition-all">
      <div className="text-[#8b949e]">{icon}</div><div className="text-3xl font-black text-white">{val || "0"}</div><div className="text-[10px] font-bold text-[#484f58] uppercase tracking-widest">{label}</div>
    </div>
  );
}

function MinecraftLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9 drop-shadow-[0_0_12px_rgba(125,207,106,0.35)]">
      <path d="M20 17h24l8 8v22l-8 8H20l-8-8V25l8-8Z" fill="#8b5a2b" />
      <path d="M20 17h24l8 8H12l8-8Z" fill="#7dcf6a" />
      <path d="M18 25h28v18H18z" fill="#67b35b" />
      <path d="M24 31h6v6h-6zm10 0h6v6h-6z" fill="#1b1b1b" opacity="0.9" />
      <path d="M26 37h12v3H26z" fill="#1b1b1b" opacity="0.55" />
    </svg>
  );
}

function ForzaHorizonLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9 drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]">
      <defs>
        <linearGradient id="forza-horizon-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="55%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect x="10" y="14" width="44" height="36" rx="12" fill="rgba(255,255,255,0.06)" stroke="url(#forza-horizon-badge)" strokeWidth="2" />
      <path d="M16 23h18l-6 6H16z" fill="url(#forza-horizon-badge)" opacity="0.95" />
      <path d="M16 33h32l-6 6H16z" fill="#f5f5f5" opacity="0.95" />
      <path d="M39 20l9 9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M22 42h20" stroke="url(#forza-horizon-badge)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}