"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  GitBranch, Users, Star, Globe, MapPin,
  Code2, ExternalLink, Mail,
  ArrowDown, ZoomIn, ZoomOut, ArrowUpRight,
  GitCommit, GitFork,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { SocialLinks } from "@/components/SocialLinks";
import TargetCursor from "@/components/TargetCursor";
import { TextReveal } from "@/components/TextReveal";
import { Marquee } from "@/components/Marquee";
import { GitHubCalendar } from "react-github-calendar";
import { GlowCard } from "@/components/GlowCard";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { CommandPalette } from "@/components/CommandPalette";

/* ─── Data ──────────────────────────────────────────── */

const projects = [
  {
    name: "USB Hub",
    description:
      "A hardware module providing four 5V output ports from a single USB input. Custom circuit routing and fabricated PCB.",
    link: "https://oshwlab.com/itz.anshkumar/usb-hub",
    language: "Hardware / PCB",
    accent: "#22c55e",
    number: "01",
  },
  {
    name: "Parallax",
    description:
      "2D projectile physics simulation built with HTML5 Canvas. Math for gravity, velocity, and collision detection.",
    link: "https://github.com/ansh3108/Parallax",
    language: "Javascript / Canvas",
    accent: "#eab308",
    number: "02",
  },
  {
    name: "Commit-to-Quest",
    description:
      "Turns your GitHub activity into an 8-bit RPG adventure. Level up with every commit.",
    link: "https://github.com/ansh3108/Commit-to-Quest",
    language: "TypeScript",
    accent: "#3b82f6",
    number: "03",
  },
  {
    name: "Terminal Quest",
    description:
      "Rust-based terminal productivity tool. Custom TUI to track focused sessions while interfacing with local project environments.",
    link: "https://github.com/ansh3108/Terminal-Quest",
    language: "Rust / Anchor",
    accent: "#ce412b",
    number: "04",
    wip: true,
  },
];

const skills = [
  { name: "Rust", color: "#ce412b" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Solana", color: "#14F195" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "PCB Design", color: "#22c55e" },
  { name: "Microcontrollers", color: "#94a3b8" },
];

/* ─── GitHub Language Colors ────────────────────────── */

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Ruby: "#701516",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  PHP: "#4F5D95",
  Lua: "#000080",
  C: "#555555",
  SCSS: "#c6538c",
  Vue: "#41b883",
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

/* ─── Animated Section Wrapper ──────────────────────── */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Project Card ──────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group block relative cursor-target"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <TiltCard className="block">
        <GlowCard className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-white/[0.04] h-full w-full">
          {/* Number */}
          <span className="absolute top-6 right-8 text-[80px] md:text-[120px] font-black text-white/[0.02] leading-none select-none group-hover:text-white/[0.04] transition-colors duration-500">
            {project.number}
          </span>

          <div className="relative z-10 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#9333ea] transition-colors duration-300">
                    {project.name}
                  </h3>
                  {project.wip && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      WIP
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25">
                    {project.language}
                  </span>
                </div>
              </div>

              <Magnetic intensity={0.2}>
                <div
                  data-cursor="pointer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] group-hover:border-[#9333ea]/30 group-hover:bg-[#9333ea]/10 transition-all duration-300"
                >
                  <ArrowUpRight
                    size={16}
                    className="text-white/30 group-hover:text-[#9333ea] transition-colors duration-300"
                  />
                </div>
              </Magnetic>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-white/30 leading-relaxed max-w-xl group-hover:text-white/45 transition-colors duration-300">
              {project.description}
            </p>
          </div>

          {/* Hover gradient */}
          <div
            className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: project.accent }}
          />
        </GlowCard>
      </TiltCard>
    </motion.a>
  );
}

/* ─── Main Page ─────────────────────────────────────── */

export default function Home() {
  const [profile, setProfile] = useState<Record<string, number> | null>(null);
  const [totalStars, setTotalStars] = useState<number | null>(null);
  const [totalForks, setTotalForks] = useState<number | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [recentCommits, setRecentCommits] = useState<CommitEntry[]>([]);
  const [zoom, setZoom] = useState(10);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Fetch GitHub profile, repo stats & recent commits
  useEffect(() => {
    fetch("https://api.github.com/users/ansh3108")
      .then((res) => res.json())
      .then((d) => setProfile(d))
      .catch(() => {});

    // Fetch repo stats: stars, forks, languages (paginates through all repos)
    async function fetchRepoStats() {
      try {
        let page = 1;
        let stars = 0;
        let forks = 0;
        const langMap: Record<string, number> = {};
        let hasMore = true;
        
        while (hasMore && page <= 10) { // arbitrary limit of 10 pages (1000 repos) to prevent infinite loops
          const res = await fetch(
            `https://api.github.com/users/ansh3108/repos?per_page=100&page=${page}`
          );
          const repos = await res.json();
          
          if (!Array.isArray(repos)) {
            // If rate limited on the first page, don't set total to 0
            if (page === 1) return; 
            break;
          }

          for (const r of repos) {
            stars += r.stargazers_count ?? 0;
            forks += r.forks_count ?? 0;
            if (!r.fork && r.language && r.size > 0) {
              langMap[r.language] = (langMap[r.language] || 0) + r.size;
            }
          }
          
          hasMore = repos.length === 100;
          page++;
        }
        
        setTotalStars(stars);
        setTotalForks(forks);

        const totalSize = Object.values(langMap).reduce((a, b) => a + b, 0);
        if (totalSize > 0) {
          const sorted = Object.entries(langMap)
            .map(([name, size]) => ({
              name,
              percentage: Math.round((size / totalSize) * 1000) / 10,
              color: LANGUAGE_COLORS[name] || "#8b8b8b",
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);
          setLanguages(sorted);
        }
      } catch {
        // silently fail
      }
    }

    // Fetch recent commits from search API (more reliable than events feed)
    async function fetchCommits() {
      try {
        const res = await fetch(
          "https://api.github.com/search/commits?q=author:ansh3108&sort=author-date&order=desc",
          { headers: { Accept: "application/vnd.github.cloak-preview" } }
        );
        if (!res.ok) {
          // If rate limited, clear to null so we don't show infinite skeleton
          setRecentCommits([]);
          return;
        }
        
        const data = await res.json();
        if (!data || !Array.isArray(data.items)) return;

        const commits: CommitEntry[] = data.items.slice(0, 6).map((item: any) => ({
          repo: item.repository.name,
          message: item.commit.message.split("\n")[0],
          url: item.html_url,
          date: item.commit.author.date,
        }));
        
        setRecentCommits(commits);
      } catch {
        // silently fail
      }
    }

    fetchRepoStats();
    fetchCommits();
  }, []);

  // Init map
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
        <div style="position:absolute;width:60px;height:60px;border-radius:50%;background:rgba(147,51,234,0.15);transform:translate(-50%,-50%);animation:sonar 2.5s infinite"></div>
        <div style="position:absolute;width:14px;height:14px;border-radius:50%;background:#9333ea;border:2.5px solid #ffffff;transform:translate(-50%,-50%);box-shadow:0 0 30px 10px rgba(147,51,234,0.6)"></div>
      </div>
      <style>@keyframes sonar{0%{transform:translate(-50%,-50%) scale(0.5);opacity:1}100%{transform:translate(-50%,-50%) scale(4);opacity:0}}</style>
    `;

    new maplibregl.Marker({ element: marker })
      .setLngLat([77.209, 28.6139])
      .addTo(map.current);
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
    <div className="relative min-h-screen font-mono text-[#e6edf3] grain">
      {/* Custom Cursor */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColor="#9333ea"
        cursorColorOnTarget="#c084fc"
        targetSelector=".cursor-target"
      />
      
      {/* Background & Command Palette */}
      <CommandPalette />

      {/* Navbar */}
      <Navbar />

      {/* ═══════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════ */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative z-10 text-center px-6"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Status */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-[clamp(3rem,12vw,10rem)] font-black tracking-[-0.04em] text-white leading-[0.85] mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            ANSH
            <br />
            KUMAR<span className="text-[#9333ea]">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[13px] md:text-sm font-medium uppercase tracking-[0.35em] text-white/25 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Builder · Hacker · Engineer
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.4em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#9333ea]/[0.03] blur-[150px] pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: MANIFESTO (Scroll-reveal text)
          ═══════════════════════════════════════════════ */}
      <section id="about" className="relative py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9333ea]/60 mb-10 block">
              About
            </span>
          </FadeIn>

          <TextReveal
            text="I build decentralized systems on Solana. I ship at Hack Club and contribute to open-source. I craft hardware from circuit boards to microcontrollers, and chase the next frontier in Web3."
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight"
            highlights={[
              {
                phrase: "Hack Club",
                href: "https://hackclub.com",
                color: "#ec3136",
              },
            ]}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: SKILLS MARQUEE
          ═══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 space-y-4 overflow-hidden">
        <Marquee
          items={["RUST", "SOLANA", "TYPESCRIPT", "REACT", "PCB DESIGN", "WEB3"]}
          speed={25}
        />
        <Marquee
          items={["NEXT.JS", "TAILWIND", "HARDWARE", "OPEN SOURCE", "MICROCONTROLLERS", "ANCHOR"]}
          speed={30}
          reverse
        />
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: TECH STACK (Detail Grid)
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-12">
              <Code2 size={16} className="text-[#9333ea]/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">
                Tech Stack
              </span>
            </div>
          </FadeIn>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <FadeIn key={skill.name} delay={i * 0.05}>
                <div className="cursor-target flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#9333ea]/25 hover:bg-white/[0.04] transition-all duration-300 group cursor-default">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="text-sm font-semibold text-white/50 group-hover:text-white/80 transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider mx-6 md:mx-auto md:max-w-5xl" />

      {/* ═══════════════════════════════════════════════
          SECTION 5: PROJECTS
          ═══════════════════════════════════════════════ */}
      <section id="projects" className="relative py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <FadeIn>
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9333ea]/60">
                Featured Work
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                Projects
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-5">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider mx-6 md:mx-auto md:max-w-5xl" />

      {/* ═══════════════════════════════════════════════
          SECTION 6: DASHBOARD
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={16} className="text-[#9333ea]/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">
                Base Station
              </span>
            </div>
          </FadeIn>

          {/* Row 1: Map + Recent Commits */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Map Card */}
              <div className="md:col-span-7 glass-card overflow-hidden relative min-h-[350px]">
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-[#030303]/90 to-transparent">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin size={11} /> Location
                  </span>
                  <span className="text-[10px] text-white/20 tracking-wider uppercase">
                    Faridabad · India
                  </span>
                </div>

                <div className="absolute inset-0 grayscale brightness-[0.65] contrast-125">
                  <div ref={mapContainer} className="w-full h-full" />
                </div>

                <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-30">
                  <button
                    data-cursor="pointer"
                    onClick={() => setZoom((z) => Math.min(z + 1, 18))}
                    className="p-1.5 bg-black/70 border border-white/10 rounded-lg hover:border-[#9333ea]/40 text-white/40 hover:text-white transition-all"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    data-cursor="pointer"
                    onClick={() => setZoom((z) => Math.max(z - 1, 1))}
                    className="p-1.5 bg-black/70 border border-white/10 rounded-lg hover:border-[#9333ea]/40 text-white/40 hover:text-white transition-all"
                  >
                    <ZoomOut size={14} />
                  </button>
                </div>
              </div>

              {/* Recent Commits */}
              <div className="md:col-span-5 glass-card p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GitCommit size={14} className="text-[#9333ea]/60" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">
                      Recent Commits
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-0.5">
                  {recentCommits.length === 0
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="py-2.5 border-b border-white/[0.04] last:border-0">
                          <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse mb-1.5" />
                          <div className="h-3.5 w-full bg-white/[0.04] rounded animate-pulse mb-1.5" />
                          <div className="h-2.5 w-14 bg-white/[0.04] rounded animate-pulse" />
                        </div>
                      ))
                    : recentCommits.map((commit, i) => (
                        <a
                          key={`${commit.url}-${i}`}
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target block py-2.5 border-b border-white/[0.04] last:border-0 group/commit hover:bg-white/[0.02] rounded-lg px-2 -mx-2 transition-colors"
                        >
                          <div className="text-[10px] font-bold text-[#9333ea]/50 uppercase tracking-wider mb-0.5">
                            {commit.repo}
                          </div>
                          <div className="text-[13px] text-white/60 group-hover/commit:text-white/90 transition-colors flex items-center gap-1.5 min-w-0">
                            <span className="truncate">{commit.message}</span>
                            <ExternalLink size={10} className="shrink-0 opacity-0 group-hover/commit:opacity-50 transition-opacity" />
                          </div>
                          <div className="text-[10px] text-white/20 mt-0.5">
                            {timeAgo(commit.date)}
                          </div>
                        </a>
                      ))}
                </div>

                <a
                  href="https://github.com/ansh3108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#9333ea]/30 hover:bg-[#9333ea]/5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-all"
                >
                  View on GitHub
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Row 2: Languages + Stats Box */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Languages Used */}
              <div className="md:col-span-7 glass-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Code2 size={14} className="text-[#9333ea]/60" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">
                    Languages Used
                  </span>
                </div>

                <div className="space-y-4">
                  {languages.length === 0
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between">
                            <div className="h-3 w-16 bg-white/[0.04] rounded animate-pulse" />
                            <div className="h-3 w-8 bg-white/[0.04] rounded animate-pulse" />
                          </div>
                          <div className="h-2 w-full bg-white/[0.04] rounded-full" />
                        </div>
                      ))
                    : languages.map((lang) => (
                        <div key={lang.name} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: lang.color }}
                              />
                              <span className="text-[13px] font-semibold text-white/60">
                                {lang.name}
                              </span>
                            </div>
                            <span className="text-[12px] font-bold text-white/30 tabular-nums">
                              {lang.percentage}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: lang.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {/* GitHub Stats Box */}
              <div className="md:col-span-5 glass-card cursor-target p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <Star size={14} className="text-[#9333ea]/60" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">
                    GitHub Stats
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {/* Repos */}
                  <div className="flex flex-col items-center gap-1.5 group">
                    <div className="text-white/15 group-hover:text-[#9333ea]/50 transition-colors">
                      <GitBranch size={18} />
                    </div>
                    <div className="text-2xl font-black text-white tabular-nums">
                      {profile?.public_repos ?? "—"}
                    </div>
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.25em]">
                      Repos
                    </div>
                  </div>

                  {/* Followers */}
                  <div className="flex flex-col items-center gap-1.5 group">
                    <div className="text-white/15 group-hover:text-[#9333ea]/50 transition-colors">
                      <Users size={18} />
                    </div>
                    <div className="text-2xl font-black text-white tabular-nums">
                      {profile?.followers ?? "—"}
                    </div>
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.25em]">
                      Followers
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex flex-col items-center gap-1.5 group">
                    <div className="text-white/15 group-hover:text-[#9333ea]/50 transition-colors">
                      <Star size={18} />
                    </div>
                    <div className="text-2xl font-black text-white tabular-nums">
                      {totalStars ?? "—"}
                    </div>
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.25em]">
                      Stars
                    </div>
                  </div>

                  {/* Forks */}
                  <div className="flex flex-col items-center gap-1.5 group">
                    <div className="text-white/15 group-hover:text-[#9333ea]/50 transition-colors">
                      <GitFork size={18} />
                    </div>
                    <div className="text-2xl font-black text-white tabular-nums">
                      {totalForks ?? "—"}
                    </div>
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.25em]">
                      Forks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contribution Graph */}
          <FadeIn delay={0.2}>
            <div className="glass-card p-6 md:p-8 flex flex-col items-center overflow-x-auto">
              <GitHubCalendar
                username="ansh3108"
                colorScheme="dark"
                theme={{
                  dark: ["#161b22", "#3b1e5d", "#592789", "#7830b5", "#9333ea"]
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7: CONTACT
          ═══════════════════════════════════════════════ */}
      <section
        id="contact"
        className="relative py-32 md:py-48 px-6 flex flex-col items-center text-center"
      >
        <FadeIn className="space-y-8 flex flex-col items-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9333ea]/60">
            Contact
          </span>

          <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.9]">
            Let&apos;s build
            <br />
            <span className="text-gradient">something</span> together.
          </h2>

          <p className="text-white/25 max-w-md text-base leading-relaxed">
            Got a project, an idea, or just want to talk about Rust, Solana, or
            hardware? I&apos;m always open.
          </p>

          <Magnetic intensity={0.3}>
            <a
              href="mailto:hello@anshk.dev"
              data-cursor="pointer"
              className="cursor-target group relative inline-flex items-center gap-3 bg-white text-[#0a0a0a] px-10 py-4 rounded-full font-bold text-base hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg"
            >
              <Mail size={18} />
              hello@anshk.dev
              <div className="absolute inset-0 rounded-full bg-[#9333ea] blur-2xl opacity-0 group-hover:opacity-25 -z-10 transition-opacity duration-500" />
            </a>
          </Magnetic>

          <SocialLinks className="pt-4" />
        </FadeIn>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#9333ea]/[0.02] blur-[120px] pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════ */}
      <footer className="px-6 py-12 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-white/15 uppercase tracking-[0.3em]">
          <span>© {new Date().getFullYear()} Ansh Kumar</span>
          <div className="flex items-center gap-1.5 text-sm text-white/60 normal-case tracking-wide">
            <span>Made with 💖 + Typescript! and open source</span>
            <a
              href="https://github.com/ansh3108/cyber-anshk-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cursor-target font-semibold text-white hover:text-[#0ff] underline decoration-white/30 hover:decoration-[#0ff]/50 underline-offset-4 transition-colors"
            >
              here!
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}