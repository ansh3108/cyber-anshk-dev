"use client";

import * as React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { ArrowUpRight } from "lucide-react";
import { ActivityCalendar } from "react-activity-calendar";
import githubData from "@/lib/data/github-data.json";
import { TechBadge, getTechIcon } from "@/components/tech-icon";
import { Sticker } from "@/components/Sticker";
import { Marquee } from "@/components/Marquee";
import { GithubStats } from "@/components/GithubStats";
import { RecentCommits } from "@/components/RecentCommits";
import { BengaluruMap } from "@/components/BengaluruMap";

// Minimal fade up for sections
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Section scaffold: rotated number chip, display title, accent underline
const SectionLayout = ({
  index,
  title,
  accent,
  children,
  id,
}: {
  index: string;
  title: string;
  accent: string;
  children: React.ReactNode;
  id: string;
}) => (
  <section id={id} className="scroll-mt-28 w-full pt-28 md:pt-36">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="@container md:col-span-4 lg:col-span-3 md:sticky md:top-24 flex flex-col gap-3 items-start">
        <span className="brutal-sm brutal-press bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 -rotate-2">
          [ {index} ]
        </span>
        {/* Font size is a % of the column's own width (cqw), so single-word
            titles like "Experience" can never bleed into the content column. */}
        <h2 className="font-display uppercase leading-[0.95] tracking-tight text-[clamp(1.2rem,12.5cqw,2.9rem)]">
          {title}
        </h2>
        <div className={`h-3.5 w-28 border-[3px] border-ink shadow-[4px_4px_0_0_var(--color-ink)] ${accent}`} />
      </div>

      <div className="md:col-span-8 lg:col-span-9 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  </section>
);

const LINK_STYLES: Record<string, string> = {
  email: "bg-grape text-bright",
  github: "bg-surface",
  twitter: "bg-surface",
};

const WORK_COLORS = ["bg-acid", "bg-flamingo", "bg-neon", "bg-sun"];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* 00: HERO — asymmetric split */}
      <section id="hero" className="relative min-h-[78svh] flex flex-col justify-center pt-14 md:pt-20 pb-14 w-full">

        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* Left: type */}
          <div className="lg:col-span-7 flex flex-col min-w-0">
            <FadeIn>
              <span className="brutal-sm brutal-press bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 -rotate-2 w-fit">
                [ 00 — Hello ]
              </span>

              {/* 10vw so "KUMAR." always fits on one line — never breaks mid-word */}
              <h1 className="mt-8 font-display uppercase leading-[0.85] tracking-tight text-[clamp(3rem,10vw,9rem)]">
                <span className="block" style={{ textShadow: "6px 6px 0 var(--color-acid)" }}>
                  Ansh
                </span>
                <span className="block whitespace-nowrap text-grape pl-[6%]" style={{ textShadow: "6px 6px 0 var(--color-ink)" }}>
                  Kumar.
                </span>
              </h1>

              <p className="mt-8 font-serif italic text-2xl md:text-4xl leading-snug max-w-[24ch]">
                {siteConfig.hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="flex flex-wrap gap-4 mt-10">
                {Object.entries(siteConfig.links).map(([name, url], i) => (
                  <a
                    key={name}
                    href={url}
                    target={url.startsWith("http") ? "_blank" : undefined}
                    rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`brutal-sm brutal-press group inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest ${LINK_STYLES[name] ?? "bg-surface"} ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
                  >
                    {name === "github" && getTechIcon("github")}
                    <span>{name}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: ID badge + polaroid cluster */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6 relative">
            <FadeIn delay={0.2} className="w-full max-w-[280px]">
              <div className="rotate-2 brutal bg-surface p-5 flex flex-col gap-2.5 hover:rotate-1 transition-transform duration-300 w-full">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50 border-b-[3px] border-dashed border-ink/30 pb-2">
                </span>
                {[
                  ["Name", "Ansh Kumar"],
                  ["Role", "Builder / Engineer"],
                  ["Where", "Bengaluru, IN"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50">{k}</span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-right">{v}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 border-t-[3px] border-dashed border-ink/30 pt-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                  </span>
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-ink/40 mt-1">
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="w-fit max-w-full">
              <div className="relative -rotate-2 brutal-sm bg-surface p-2.5 pb-8 w-fit hover:rotate-1 transition-transform duration-300">
                <span aria-hidden className="absolute -top-3.5 left-1/2 -translate-x-1/2 -rotate-6 w-24 h-7 bg-sun/80 border border-ink/20 shadow-sm" />
                <Sticker color="neon" deg={-6} className="absolute -left-12 top-5 z-10 hidden lg:inline-block">
                  shipping since 2022
                </Sticker>
                <Image
                  src="/Ansh.png"
                  alt="Ansh Kumar"
                  width={600}
                  height={600}
                  className="w-44 md:w-56 aspect-square object-cover border-[3px] border-ink"
                  priority
                />
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-ink/60">
                  ansh, probably debugging
                </p>
                <Sticker color="acid" deg={9} className="absolute -bottom-4 -right-7 hidden md:inline-block">
                  pcb guy ✶
                </Sticker>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skill marquee band */}
      <FadeIn>
        <Marquee
          className="-mx-6 sm:-mx-12 md:-mx-24 lg:-mx-32 xl:-mx-48"
          items={[
            "Rust", "Solana", "TypeScript", "PCB Design", "Next.js",
            "Docker", "Firmware", "Open Source", "C++", "EasyEDA",
          ]}
        />
      </FadeIn>

      {/* 01: ABOUT — dossier + quick facts */}
      <SectionLayout id="about" index="01" title="The Dossier" accent="bg-sun">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          <FadeIn className="lg:col-span-8">
            <div className="relative h-full">
              <Sticker color="grape" deg={-4} className="absolute -top-4 left-6 z-10">
                the human behind the keyboard
              </Sticker>
              <div className="brutal bg-sun p-6 md:p-9 h-full text-void">
                <p className="text-xl md:text-3xl font-medium leading-relaxed max-w-[54ch]">
                  {siteConfig.about.text}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="lg:col-span-4">
            <div className="brutal-sm bg-surface p-5 flex flex-col gap-3 rotate-1 h-full">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50 border-b-[3px] border-dashed border-ink/30 pb-2">
                quick facts
              </span>
              {[
                ["180+", "projects shipped"],
                ["2022", "started at Hack Club"],
                ["web3", "solana ✶ rust ✶ anchor"],
              ].map(([big, small]) => (
                <div key={big} className="flex items-baseline gap-3">
                  <span className="font-display text-2xl shrink-0 w-16">{big}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60 leading-tight">
                    {small}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </SectionLayout>

      {/* 02: SELECTED WORKS — editorial rows */}
      <SectionLayout id="projects" index="02" title="Selected Works" accent="bg-acid">
        <div className="flex flex-col gap-8 w-full">
          {siteConfig.projects.map((project, i) => (
            <FadeIn key={project.title} delay={(i % 2) * 0.1}>
              <a
                href={project.live || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block brutal brutal-press bg-surface w-full"
              >
                {project.featured && (
                  <Sticker color="sun" deg={6} className="absolute -top-4 right-24 z-10">
                    ★ Featured
                  </Sticker>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">

                  {/* Accent index block */}
                  <div className={`${WORK_COLORS[i % WORK_COLORS.length]} md:col-span-3 border-b-4 md:border-b-0 md:border-r-4 border-ink px-5 py-4 md:py-6 flex md:flex-col justify-between gap-2`}>
                    <span className="font-display uppercase leading-none text-4xl md:text-6xl text-void">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-void md:mt-auto md:text-left text-right">
                      {project.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-6 px-5 md:px-8 py-6 flex flex-col gap-4 min-w-0">
                    <h3 className="font-display uppercase text-2xl md:text-4xl leading-none tracking-tight decoration-flamingo decoration-wavy decoration-[3px] underline-offset-4 group-hover:underline break-words">
                      {project.title}
                    </h3>
                    <p className="text-ink/80 font-medium leading-relaxed max-w-[52ch]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {project.tech.map((t) => (
                        <TechBadge key={t} name={t} />
                      ))}
                    </div>
                  </div>

                  {/* Action cell */}
                  <div className="md:col-span-3 border-t-4 md:border-t-0 md:border-l-4 border-ink bg-paper px-5 py-4 md:py-6 flex md:flex-col items-center md:items-end justify-between gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50">
                      {project.live ? "Visit live" : "View code"}
                    </span>
                    <ArrowUpRight
                      size={34}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:rotate-45 shrink-0"
                    />
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </SectionLayout>

      {/* 03: EXPERIENCE — the ticket */}
      <SectionLayout id="experience" index="03" title="Experience" accent="bg-flamingo">
        <div className="flex flex-col gap-8 w-full">
          {siteConfig.experience.map((exp) => (
            <FadeIn key={exp.company}>
              <div className="brutal bg-surface">
                <div className="bg-flamingo text-bright border-b-4 border-ink px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <h4 className="font-display uppercase text-2xl md:text-3xl tracking-tight leading-none">
                      {exp.company}
                    </h4>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-bright/90">
                      {exp.role}
                    </span>
                  </div>
                  <span className="bg-ink text-paper border-[3px] border-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest rotate-2">
                    {exp.period}
                  </span>
                </div>

                <div className="px-5 md:px-8 py-6 flex flex-col gap-5">
                  <p className="text-lg md:text-xl font-medium leading-relaxed max-w-[62ch]">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {exp.technologies.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>

                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-t-4 border-ink bg-paper px-5 md:px-8 py-3 hover:bg-neon hover:text-void transition-colors"
                >
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
                    {exp.url.replace("https://", "").replace("/", "")}
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionLayout>

      {/* 04: DASHBOARD — bento of live tiles */}
      <SectionLayout id="dashboard" index="04" title="Dashboard" accent="bg-neon">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 gap-y-8 w-full items-start">

          {/* Languages */}
          <FadeIn className="sm:col-span-2">
            <div className="brutal bg-surface h-full">
              <div className="bg-neon text-void border-b-4 border-ink px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Languages</span>
                <span className="font-display text-2xl text-void">{siteConfig.ecosystem.languages.length}</span>
              </div>
              <div className="p-5 flex flex-wrap gap-2.5">
                {siteConfig.ecosystem.languages.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Architecture */}
          <FadeIn>
            <div className="brutal bg-surface h-full">
              <div className="bg-acid text-void border-b-4 border-ink px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Architecture</span>
                <span className="font-display text-2xl text-void">{siteConfig.ecosystem.architecture.length}</span>
              </div>
              <div className="p-5 flex flex-wrap gap-2.5">
                {siteConfig.ecosystem.architecture.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Systems */}
          <FadeIn>
            <div className="brutal bg-surface h-full">
              <div className="bg-sun text-void border-b-4 border-ink px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Systems</span>
                <span className="font-display text-2xl text-void">{siteConfig.ecosystem.systems.length}</span>
              </div>
              <div className="p-5 flex flex-wrap gap-2.5">
                {siteConfig.ecosystem.systems.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* GitHub stats */}
          <FadeIn className="sm:col-span-2 md:col-span-3">
            <div className="brutal bg-surface h-full">
              <div className="bg-flamingo text-bright border-b-4 border-ink px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">GitHub Stats</span>
                <span className="font-display text-2xl text-bright">∑</span>
              </div>
              <GithubStats />
            </div>
          </FadeIn>

          {/* Recent commits */}
          <FadeIn>
            <div className="brutal bg-surface h-full">
              <div className="bg-neon text-void border-b-4 border-ink px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Commits</span>
                <span className="font-mono text-[10px]">&gt;_</span>
              </div>
              <RecentCommits />
            </div>
          </FadeIn>

          {/* Activity calendar — wide */}
          <FadeIn className="sm:col-span-2 md:col-span-4">
            <div className="relative w-full">
              <Sticker color="acid" deg={-3} className="absolute -top-4 left-5 z-10">
                last year on github
              </Sticker>
              <div className="brutal bg-surface p-5 md:p-7 w-full">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
                    {githubData.stats.totalContributions} contributions in the last year ✶ @ansh3108
                  </span>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-sm brutal-press group inline-flex items-center gap-2 bg-ink text-paper px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest"
                  >
                    open profile
                    <ArrowUpRight size={13} strokeWidth={2.5} className="transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </div>
                {/* Vector trick: the calendar's own SVG stretches to 100% width,
                    so the whole year is always visible — no horizontal scroll. */}
                <div className="w-full [&_svg]:w-full [&_svg]:h-auto [&_svg]:min-w-0">
                  <ActivityCalendar
                    data={githubData.contributions}
                    colorScheme="light"
                    fontSize={12}
                    blockRadius={1}
                    showColorLegend={false}
                    showTotalCount={false}
                    theme={{
                      light: ["#C9BFA8", "#C5F06E", "#93E03A", "#4FCB2F", "#1F7A33"],
                      dark: ["#C9BFA8", "#C5F06E", "#93E03A", "#4FCB2F", "#1F7A33"],
                    }}
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionLayout>

      {/* 05: CONTACT — split CTA + map */}
      <section id="contact" className="scroll-mt-28 pt-28 md:pt-36 mt-10 w-full">
        <FadeIn>
          <span className="brutal-sm brutal-press bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 -rotate-2 w-fit">
            [ 05 ]
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-10 w-full">

          {/* CTA card */}
          <FadeIn className="min-w-0">
            <div className="relative h-full brutal bg-grape p-6 md:p-10">
              <Sticker color="sun" deg={-3} className="absolute -top-5 left-6 z-10">
                open to weird ideas
              </Sticker>
              <Sticker color="acid" deg={8} className="absolute -top-4 right-6 z-10 hidden md:inline-block">
                replies fast ✶
              </Sticker>

              <h2 className="font-display uppercase text-bright leading-[0.9] tracking-tight text-4xl md:text-5xl xl:text-6xl">
                Got an idea?
                <span className="block text-sun" style={{ textShadow: "5px 5px 0 var(--color-void)" }}>
                  Let&apos;s build it.
                </span>
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={siteConfig.links.email}
                  className="brutal-sm brutal-press inline-flex items-center gap-3 bg-sun text-void px-6 py-4 font-mono font-bold text-lg md:text-2xl tracking-tight"
                >
                  itz.anshkumar@gmail.com
                  <ArrowUpRight size={20} strokeWidth={3} />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-sm brutal-press bg-surface text-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest"
                >
                  github.com/ansh3108
                </a>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-sm brutal-press bg-surface text-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest"
                >
                  @anshkdev
                </a>
              </div>

              <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-bright/80">
                Usually replies within 24h ✶ Bengaluru, India
              </p>
            </div>
          </FadeIn>

          {/* Map tile — hand-drawn "city as PCB", no tiles, no attribution */}
          <FadeIn delay={0.12} className="min-w-0">
            <div className="relative h-full min-h-[360px] lg:min-h-full brutal-sm bg-surface">
              <Sticker color="neon" deg={-2} className="absolute -top-6 left-5 z-10">
                bengaluru
              </Sticker>
              <div className="absolute inset-0 flex items-center justify-center p-4 pt-9 pb-11">
                <BengaluruMap />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 border-t-4 border-ink bg-surface px-3 py-1.5 flex items-center justify-between gap-3">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest truncate">
                </span>
                <span className="font-mono text-[9px] tracking-wider text-ink/50 shrink-0">
                  ✶ no tiles
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
