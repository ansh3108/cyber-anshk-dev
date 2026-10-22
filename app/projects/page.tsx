import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "USB Hub",
    category: "Hardware",
    description:
      "A hardware module providing four 5V output ports from a single USB input. Custom circuit routing and fabricated PCB.",
    link: "https://oshwlab.com/itz.anshkumar/usb-hub",
    tech: ["EasyEDA", "Hardware", "PCB Routing", "Soldering"],
  },
  {
    name: "NFC Business Card",
    category: "Hardware",
    description:
      "An NFC-powered business card that harvests energy from nearby devices to instantly light up an LED.",
    link: "https://oshwlab.com/itz.anshkumar/nfc-business-card_copy_copy_copy",
    tech: ["EasyEDA", "Hardware", "PCB Routing"],
  },
  {
    name: "Commit-to-Quest",
    category: "Game / Software",
    description:
      "Turns your GitHub activity into an 8-bit RPG adventure. Level up with every commit.",
    link: "https://github.com/ansh3108/Commit-to-Quest",
    tech: ["TypeScript", "Next.js", "GitHub API", "Tailwind CSS"],
  },
  {
    name: "Terminal Quest",
    category: "Developer Tool",
    description:
      "Rust-based terminal productivity tool. Custom TUI to track focused sessions while interfacing with local project environments.",
    link: "https://github.com/ansh3108/Terminal-Quest",
    wip: true,
    tech: ["Rust", "TUI", "Solana", "Anchor"],
  },
  {
    name: "Markdown CLI",
    category: "Tool",
    description: "CLI tool to convert Markdown files to a static website.",
    link: "https://github.com/ansh3108/markdown-cli",
    tech: ["Rust", "CLI", "TUI"],
  },
];

const HEADER_COLORS = [
  "bg-acid text-void",
  "bg-flamingo text-bright",
  "bg-neon text-void",
  "bg-sun text-void",
  "bg-grape text-bright",
];

export default function Projects() {
  return (
    <div className="pt-10 md:pt-16 mb-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12">
        <span className="brutal-sm brutal-press bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 -rotate-2 w-fit">
          [ Dir ]
        </span>
        <h1 className="font-display uppercase text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-[16ch]">
          Some cool stuff I&apos;ve{" "}
          <span className="text-grape" style={{ textShadow: "4px 4px 0 var(--color-ink)" }}>
            built
          </span>
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="brutal-sm bg-neon text-void px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest rotate-1">
            {projects.length} projects
          </span>
          <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/60 max-w-[40ch]">
            hardware hacking ✶ web3 ✶ interactive apps
          </p>
        </div>
      </div>

      {/* Card grid — the whole card is the link, so it works on mobile too */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 gap-y-12">
        {projects.map((project, i) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block brutal brutal-press bg-surface h-full"
          >
            <div className={`${HEADER_COLORS[i % HEADER_COLORS.length]} border-b-4 border-ink px-5 py-2.5 flex items-center justify-between gap-3`}>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                {project.category}
              </span>
              <span className="font-display uppercase text-lg tracking-tight">
                No. {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="px-5 py-6 flex flex-col gap-4">
              <div className="flex items-start flex-wrap gap-2.5">
                <h3 className="font-display uppercase text-2xl leading-none tracking-tight decoration-flamingo decoration-wavy decoration-[3px] underline-offset-4 group-hover:underline">
                  {project.name}
                </h3>
                {project.wip && (
                  <span className="border-[3px] border-ink bg-sun text-void px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest -rotate-3">
                    WIP
                  </span>
                )}
              </div>

              <p className="text-ink/80 font-medium leading-relaxed max-w-[52ch]">
                <span className="text-grape font-bold mr-1.5">✶</span>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="border-[3px] border-ink bg-surface text-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest group-hover:bg-sun group-hover:text-void group-hover:-translate-y-0.5 transition-all"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t-4 border-ink px-5 py-3 flex items-center justify-between bg-paper">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
                Open project
              </span>
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
