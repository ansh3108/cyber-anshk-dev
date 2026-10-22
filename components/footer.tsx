import { siteConfig } from "@/lib/config";

const LINKS = [
  { label: "GitHub", url: siteConfig.links.github },
  { label: "Twitter", url: siteConfig.links.twitter },
  { label: "Email", url: siteConfig.links.email },
];

const CHIP = [
  "bg-surface hover:bg-sun hover:text-void",
  "bg-surface hover:bg-neon hover:text-void",
  "bg-surface hover:bg-flamingo hover:text-bright",
];

export function Footer() {
  return (
    <footer className="print:hidden mt-28 border-t-4 border-ink pt-8 pb-24 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex flex-col gap-1.5">
        <p className="font-display uppercase text-2xl md:text-3xl leading-none tracking-tight">
          Built with too many colors <span className="text-flamingo">✶</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
          © {new Date().getFullYear()} Ansh Kumar — no template survived
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`brutal-sm brutal-press px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest ${CHIP[i % CHIP.length]}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
