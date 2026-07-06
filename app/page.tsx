"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  GitBranch, Users, Star, Globe, MapPin,
  Code2, Rocket, ExternalLink, Mail,
  ArrowDown, ZoomIn, ZoomOut, Sparkles,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { SocialLinks } from "@/components/SocialLinks";

/* ─── Data ──────────────────────────────────────────── */

const projects = [
  {
    name: "USB Hub",
    description:
      "A hardware module providing four 5V output ports from a single USB input. Designed with custom circuit routing and fabricated PCB.",
    link: "https://oshwlab.com/itz.anshkumar/usb-hub",
    language: "Hardware / PCB",
    accent: "#22c55e",
  },
  {
    name: "Parallax",
    description:
      "2D projectile physics simulation built with HTML5 Canvas. Includes math for gravity, velocity, and collision detection.",
    link: "https://github.com/ansh3108/Parallax",
    language: "Javascript / Canvas",
    accent: "#eab308",
  },
  {
    name: "Commit-to-Quest",
    description:
      "Turns your GitHub activity into an 8-bit RPG adventure! Level up your character with every commit.",
    link: "https://github.com/ansh3108/Commit-to-Quest",
    language: "TypeScript",
    accent: "#3b82f6",
  },
  {
    name: "Terminal Quest",
    description:
      "Rust-based terminal productivity tool. Uses a custom TUI to track focused sessions while interfacing with local project environments.",
    link: "https://github.com/ansh3108/Terminal-Quest",
    language: "Rust / Anchor",
    accent: "#ce412b",
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

const tags = [
  { emoji: "🎓", text: "Student", color: "#9333ea" },
  { emoji: "⭐", text: "Hack Club", color: "#ec3750" },
  { emoji: "🔓", text: "Open Source", color: "#14F195" },
  { emoji: "⚙️", text: "Hardware", color: "#f59e0b" },
  { emoji: "🌐", text: "Web3", color: "#3b82f6" },
];

/* ─── Reusable Components ───────────────────────────── */

function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-8">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#9333ea]/10 text-[#9333ea]">
        {icon}
      </div>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
        {text}
      </span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="glass-card p-5 flex flex-col items-center gap-2 hover:border-white/15 transition-all group">
      <div className="text-white/30 group-hover:text-[#9333ea] transition-colors">
        {icon}
      </div>
      <div className="text-2xl font-black text-white tabular-nums">
        {value || "—"}
      </div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────── */

export default function Home() {
  const [profile, setProfile] = useState<Record<string, number> | null>(null);
  const [zoom, setZoom] = useState(10);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  // Fetch GitHub profile
  useEffect(() => {
    fetch("https://api.github.com/users/ansh3108")
      .then((res) => res.json())
      .then((d) => setProfile(d))
      .catch(() => {});
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
    };
  }, []);

  useEffect(() => {
    if (map.current) map.current.setZoom(zoom);
  }, [zoom]);

  return (
    <div className="relative min-h-screen font-mono text-[#e6edf3]">


      {/* Navbar */}
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* ═══ HERO ═══ */}
        <AnimatedSection
          id="home"
          className="min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-16"
        >
          {/* Avatar */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-br from-[#9333ea] via-[#7c3aed] to-[#6d28d9]">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#030303]">
                <img
                  src="/ansh.jpeg"
                  alt="Ansh Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-[3px] border-[#030303] shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Ansh Kumar
            <span className="text-[#9333ea]">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-white/40 max-w-lg mx-auto leading-relaxed text-base md:text-lg font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Building decentralized systems on{" "}
            <span className="text-[#14F195] font-semibold">Solana</span>.
            Shipping at{" "}
            <span className="text-[#ec3750] font-semibold">Hack Club</span> and
            contributing to open-source. Crafting hardware & chasing
            the next frontier in Web3.
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-2.5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {tags.map((tag) => (
              <div
                key={tag.text}
                className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] px-4 py-2 rounded-full text-xs font-medium hover:bg-white/[0.08] hover:border-white/15 transition-all cursor-default"
              >
                <span>{tag.emoji}</span>
                <span className="text-white/60">{tag.text}</span>
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
              </div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SocialLinks />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        </AnimatedSection>

        {/* ═══ ABOUT / DASHBOARD ═══ */}
        <AnimatedSection id="about" className="py-24 space-y-10">
          <SectionLabel icon={<Rocket size={16} />} text="Mission Control" />

          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Full-stack builder at the{" "}
            <span className="text-[#9333ea]">intersection</span>
            <br className="hidden md:block" /> of systems & the decentralized web.
          </h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
            {/* Map Card */}
            <div className="md:col-span-5 glass-card overflow-hidden group relative min-h-[340px]">
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={12} /> Location
                </span>
                <span className="text-[10px] text-white/30 tracking-wider uppercase">
                  Faridabad · India
                </span>
              </div>

              <div className="absolute inset-0 grayscale brightness-[0.7] contrast-125">
                <div ref={mapContainer} className="w-full h-full" />
              </div>

              <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-30">
                <button
                  onClick={() => setZoom((z) => Math.min(z + 1, 18))}
                  className="p-1.5 bg-black/70 border border-white/10 rounded-lg hover:border-[#9333ea]/50 text-white/60 hover:text-white transition-all"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(z - 1, 1))}
                  className="p-1.5 bg-black/70 border border-white/10 rounded-lg hover:border-[#9333ea]/50 text-white/60 hover:text-white transition-all"
                >
                  <ZoomOut size={14} />
                </button>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="md:col-span-7 glass-card p-8 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                <Code2 size={12} /> Tech Stack
              </span>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#9333ea]/30 hover:bg-white/[0.06] transition-all group cursor-default"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Users size={18} />}
              label="Followers"
              value={profile?.followers ?? "—"}
            />
            <StatCard
              icon={<GitBranch size={18} />}
              label="Repos"
              value={profile?.public_repos ?? "—"}
            />
            <StatCard icon={<Star size={18} />} label="Stars" value="156" />
            <StatCard
              icon={<Globe size={18} />}
              label="Status"
              value="Online"
            />
          </div>
        </AnimatedSection>

        {/* ═══ PROJECTS ═══ */}
        <AnimatedSection id="projects" className="py-24 space-y-10">
          <SectionLabel icon={<Sparkles size={16} />} text="Featured Work" />

          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group block glass-card p-7 hover:border-white/15 transition-all relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#9333ea] transition-colors">
                        {p.name}
                      </h3>
                      {p.wip && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          WIP
                        </span>
                      )}
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-1"
                    />
                  </div>

                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2 group-hover:text-white/50 transition-colors">
                    {p.description}
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.05]">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: p.accent }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                      {p.language}
                    </span>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{ backgroundColor: p.accent }}
                />
              </motion.a>
            ))}
          </div>
        </AnimatedSection>

        {/* ═══ CONTACT ═══ */}
        <AnimatedSection
          id="contact"
          className="py-32 flex flex-col items-center text-center space-y-10"
        >
          <SectionLabel icon={<Mail size={16} />} text="Get In Touch" />

          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95]">
            Let&apos;s build
            <br />
            <span className="text-[#9333ea]">something</span> together.
          </h2>

          <p className="text-white/35 max-w-md text-base leading-relaxed">
            Got a project, an idea, or just want to chat about Rust, Solana, or
            hardware? I&apos;m always open.
          </p>

          <a
            href="mailto:hey@anshk.dev"
            className="group relative inline-flex items-center gap-3 bg-white text-[#0a0a0a] px-10 py-4 rounded-full font-bold text-base hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg"
          >
            <Mail size={18} />
            hey@anshk.dev
            <div className="absolute inset-0 rounded-full bg-[#9333ea] blur-2xl opacity-0 group-hover:opacity-30 -z-10 transition-opacity duration-500" />
          </a>

          <SocialLinks className="pt-2" />
        </AnimatedSection>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.3em]">
          <span>© {new Date().getFullYear()} Ansh Kumar</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </footer>
      </div>
    </div>
  );
}