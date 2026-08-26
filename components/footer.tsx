import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="py-12 mt-32 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
      <p>© {new Date().getFullYear()} {siteConfig.name}</p>
      <div className="flex items-center gap-6">
        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">GitHub</a>
        <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Twitter</a>
      </div>
    </footer>
  );
}
