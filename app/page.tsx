"use client";

import * as React from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/config";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { TechBadge, getTechIcon } from "@/components/tech-icon";

// Minimal fade up for sections
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Standardized 2-column structural wrapper (Nav is external)
// Desktop: 3 cols for label, 9 cols for content
// Tablet: 4 cols for label, 8 cols for content
// Mobile: 1 col stacked
const SectionLayout = ({ index, title, children, id }: { index: string; title: string; children: React.ReactNode; id: string }) => (
  <section id={id} className="scroll-mt-32 w-full">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Section Metadata Column */}
      <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-32 flex flex-col gap-2">
        <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
          [ {index} ]
        </span>
        <h2 className="text-3xl lg:text-4xl font-serif tracking-tight leading-tight">{title}</h2>
      </div>

      {/* Main Content Column */}
      <div className="md:col-span-8 lg:col-span-9 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  </section>
);

export default function Home() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col gap-32 md:gap-40 pb-24 w-full">
      
      {/* 00: HERO */}
      <section id="hero" className="min-h-[calc(100svh-160px)] flex flex-col justify-start relative w-full pt-2 md:pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 lg:gap-y-4 items-start w-full">
          
          {/* Rail */}
          <div className="md:col-span-1 flex flex-col mt-2 md:mt-4">
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block">
              [ 00 ]
            </span>
          </div>

          {/* Main Hero Content Area */}
          <div className="md:col-span-11 flex flex-col w-full relative z-10 -ml-[0.04em] min-w-0">
            
            {/* ROW 1: Name */}
            <FadeIn>
              <h1 className="text-[5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10.5rem] font-serif leading-[0.85] tracking-tighter text-zinc-900 dark:text-zinc-100 flex flex-col break-words">
                <span>Ansh</span>
                <span className="pl-6 lg:pl-16 xl:pl-32 text-zinc-700 dark:text-zinc-400">Kumar.</span>
              </h1>
            </FadeIn>

            {/* ROW 2: Meta (Left) & Description (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-x-6 gap-y-12 mt-8 md:mt-12 xl:mt-12 w-full">
              
              {/* Meta */}
              <div className="md:col-span-5 lg:col-span-4 pl-2 lg:pl-16 xl:pl-32">
                <FadeIn delay={0.1}>
                  <div className="flex flex-col gap-6 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    <div className="flex flex-col gap-1.5 border-l border-zinc-200 dark:border-zinc-800/50 pl-5">
                      <span className="block text-zinc-400 dark:text-zinc-600">Focus</span>
                      <span className="text-zinc-800 dark:text-zinc-300">Systems / WEB3</span>
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-zinc-200 dark:border-zinc-800/50 pl-5">
                      <span className="block text-zinc-400 dark:text-zinc-600">Location</span>
                      <span className="text-zinc-800 dark:text-zinc-300">Bengaluru, India</span>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Description & Links */}
              <div className="md:col-span-6 lg:col-span-7 xl:col-span-6 xl:col-start-6 flex flex-col items-end text-right gap-6 min-w-0">
                <FadeIn delay={0.2}>
                  <p className="text-xl sm:text-2xl lg:text-3xl xl:text-[2rem] font-light text-zinc-700 dark:text-zinc-300 leading-[1.4] max-w-[28ch]">
                    {siteConfig.hero.subtitle}
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap justify-end gap-5 font-mono text-xs">
                    {Object.entries(siteConfig.links).map(([name, url]) => (
                      <a 
                        key={name} 
                        href={url} 
                        target={url.startsWith("http") ? "_blank" : undefined}
                        rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-2.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative overflow-hidden"
                      >
                        {name === "github" && getTechIcon("github")}
                        <span className="relative z-10">{name}</span>
                        <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0" />
                      </a>
                    ))}
                  </div>
                </FadeIn>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 01: ABOUT */}
      <SectionLayout id="about" index="01" title="About">
        <FadeIn>
          <p className="text-lg md:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light max-w-[55ch]">
            {siteConfig.about.text}
          </p>
        </FadeIn>
      </SectionLayout>

      {/* 02: SELECTED WORKS */}
      <SectionLayout id="projects" index="02" title="Selected Works">
        <div className="flex flex-col border-t border-zinc-200 dark:border-zinc-800/50 w-full min-w-0">
          {siteConfig.projects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a 
                href={project.live || project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group block py-12 md:py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800/50 transition-colors w-full min-w-0`}
              >
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
                  
                  {/* Year / Featured */}
                  <div className="xl:col-span-2 flex xl:flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 xl:pt-2">
                    <span>{String(i + 1).padStart(2, "0")} / {project.year}</span>
                    {project.featured && <span className="text-zinc-900 dark:text-zinc-300">Featured</span>}
                  </div>

                  {/* Content */}
                  <div className={`xl:col-span-7 flex flex-col gap-4 lg:gap-6 min-w-0`}>
                    <h3 className={`text-4xl md:text-5xl font-serif text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-500 transition-colors truncate whitespace-normal break-words`}>
                      {project.title}
                    </h3>
                    <p className={`text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-[55ch] text-lg lg:text-xl`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech */}
                  <div className={`xl:col-span-3 flex flex-col justify-between items-start xl:items-end h-full gap-8 mt-4 xl:mt-0 min-w-0`}>
                    <ArrowRight size={24} className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:-rotate-45 transition-all duration-300 hidden xl:block shrink-0" />
                    
                    <div className="flex flex-wrap xl:flex-col gap-3 xl:items-end w-full">
                      {project.tech.map((t) => (
                        <TechBadge key={t} name={t} />
                      ))}
                    </div>
                  </div>

                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </SectionLayout>

      {/* 03: EXPERIENCE */}
      <SectionLayout id="experience" index="03" title="Experience">
        <div className="flex flex-col border-t border-zinc-200 dark:border-zinc-800/50 w-full min-w-0">
          {siteConfig.experience.map((exp, i) => (
            <FadeIn key={i}>
              <div className="group flex flex-col xl:flex-row gap-6 xl:gap-8 py-12 md:py-16 lg:py-20 border-b border-zinc-200 dark:border-zinc-800/50 last:border-0 relative min-w-0 w-full">
                
                {/* Period */}
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest xl:w-40 shrink-0 xl:pt-3">
                  {exp.period}
                </div>
                
                {/* Main Content */}
                <div className="flex flex-col xl:flex-row justify-between w-full gap-8 min-w-0">
                  <div className="flex flex-col gap-4 max-w-[55ch] min-w-0">
                    <div className="flex flex-col gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest truncate">
                        {exp.role}
                      </span>
                      <h4 className="text-3xl font-serif text-zinc-900 dark:text-zinc-100 break-words whitespace-normal">
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-500 transition-colors inline-flex items-center gap-3">
                          {exp.company} <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0" />
                        </a>
                      </h4>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 font-light text-lg leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  </div>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap xl:flex-col gap-3 xl:items-end mt-4 xl:mt-0 min-w-0">
                    {exp.technologies.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </SectionLayout>

      {/* 04: ECOSYSTEM */}
      <SectionLayout id="tech-stack" index="04" title="Ecosystem">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 w-full min-w-0 pt-2 lg:pt-0">
            <div className="flex flex-col gap-6 min-w-0">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">
                Languages
              </span>
              <div className="flex flex-col gap-4">
                {siteConfig.ecosystem.languages.map((tech) => (
                  <TechBadge key={tech} name={tech} className="w-fit" />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 min-w-0">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">
                Architecture
              </span>
              <div className="flex flex-col gap-4">
                {siteConfig.ecosystem.architecture.map((tech) => (
                  <TechBadge key={tech} name={tech} className="w-fit" />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 min-w-0">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">
                Systems
              </span>
              <div className="flex flex-col gap-4">
                {siteConfig.ecosystem.systems.map((tech) => (
                  <TechBadge key={tech} name={tech} className="w-fit" />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionLayout>

      {/* 05: ACTIVITY */}
      <SectionLayout id="github" index="05" title="Activity">
        <FadeIn>
          <div className="flex flex-col gap-8 w-full min-w-0 pt-2 lg:pt-0">
            <div className="flex flex-col gap-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                {getTechIcon("github")} GitHub Contributions
              </span>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-300 hover:opacity-50 transition-opacity">
                @ansh3108
              </a>
            </div>
            
            <div className="w-full max-w-full overflow-hidden [&_svg]:w-full [&_svg]:h-auto [&_svg]:min-w-0">
              <GitHubCalendar 
                username="ansh3108" 
                colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                fontSize={12}
                blockSize={12}
                blockMargin={5}
                blockRadius={2}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </div>
        </FadeIn>
      </SectionLayout>

      {/* 06: CONTACT */}
      <section id="contact" className="scroll-mt-32 pt-24 md:pt-48 border-t border-zinc-200 dark:border-zinc-800 w-full min-w-0">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start w-full min-w-0">
            <div className="md:col-span-4 lg:col-span-3 flex flex-col">
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
                [ 06 ]
              </span>
            </div>
            <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-12 min-w-0">
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif tracking-tight leading-[1] text-zinc-900 dark:text-zinc-100 max-w-[20ch] break-words">
                Have an interesting project, idea, or conversation?
              </h2>
              
              <div className="flex flex-col gap-8 font-mono text-sm md:text-base mt-8">
                <a 
                  href={siteConfig.links.email} 
                  className="group inline-flex items-center gap-6 text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors w-fit"
                >
                  <span className="uppercase tracking-widest text-[10px] text-zinc-500 w-16">Email</span>
                  <span className="text-xl sm:text-2xl md:text-3xl border-b border-transparent group-hover:border-current transition-colors pb-1 truncate">
                    hello@anshk.dev
                  </span>
                  <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                </a>

                <div className="flex flex-col gap-6 mt-4">
                  <a 
                    href={siteConfig.links.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group inline-flex items-center gap-6 text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors w-fit"
                  >
                    <span className="uppercase tracking-widest text-[10px] text-zinc-500 w-16">Twitter</span>
                    <span className="text-lg md:text-xl border-b border-transparent group-hover:border-current transition-colors pb-1">
                      @anshkdev
                    </span>
                  </a>
                  <a 
                    href={siteConfig.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group inline-flex items-center gap-6 text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors w-fit"
                  >
                    <span className="uppercase tracking-widest text-[10px] text-zinc-500 w-16">GitHub</span>
                    <span className="text-lg md:text-xl border-b border-transparent group-hover:border-current transition-colors pb-1">
                      github.com/ansh3108
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
