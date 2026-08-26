import { 
  SiTypescript, SiJavascript, SiRust, SiCplusplus, SiPython,
  SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql, SiMongodb,
  SiDocker, SiGit, SiGithub, SiLinux, SiCloudflare,
  SiTailwindcss, SiC, SiSolana
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export function getTechIcon(name: string) {
  const normalized = name.toLowerCase().trim();
  switch (normalized) {
    case "typescript": return <SiTypescript color="#3178C6" className="w-[1.2em] h-[1.2em]" />;
    case "javascript": return <SiJavascript color="#F7DF1E" className="w-[1.2em] h-[1.2em]" />;
    case "rust": return <SiRust color="#DEA584" className="w-[1.2em] h-[1.2em]" />;
    case "c++": return <SiCplusplus color="#00599C" className="w-[1.2em] h-[1.2em]" />;
    case "c": return <SiC color="#A8B9CC" className="w-[1.2em] h-[1.2em]" />;
    case "python": return <SiPython color="#3776AB" className="w-[1.2em] h-[1.2em]" />;
    case "react": return <SiReact color="#61DAFB" className="w-[1.2em] h-[1.2em]" />;
    case "next.js": return <SiNextdotjs className="w-[1.2em] h-[1.2em] text-zinc-900 dark:text-zinc-100" />;
    case "node.js": return <SiNodedotjs color="#339939" className="w-[1.2em] h-[1.2em]" />;
    case "postgresql": return <SiPostgresql color="#4169E1" className="w-[1.2em] h-[1.2em]" />;
    case "mongodb": return <SiMongodb color="#47A248" className="w-[1.2em] h-[1.2em]" />;
    case "docker": return <SiDocker color="#2496ED" className="w-[1.2em] h-[1.2em]" />;
    case "git": return <SiGit color="#F05032" className="w-[1.2em] h-[1.2em]" />;
    case "github": return <SiGithub className="w-[1.2em] h-[1.2em] text-zinc-900 dark:text-zinc-100" />;
    case "linux": return <SiLinux color="#FCC624" className="w-[1.2em] h-[1.2em]" />;
    case "aws": return <FaAws color="#FF9900" className="w-[1.2em] h-[1.2em]" />;
    case "cloudflare": return <SiCloudflare color="#F38020" className="w-[1.2em] h-[1.2em]" />;
    case "tailwind css": return <SiTailwindcss color="#06B6D4" className="w-[1.2em] h-[1.2em]" />;
    case "solana": return <SiSolana color="#14F195" className="w-[1.2em] h-[1.2em]" />;
    default: return null;
  }
}

export function TechBadge({ name, className = "" }: { name: string, className?: string }) {
  const icon = getTechIcon(name);
  return (
    <span className={`inline-flex items-center gap-2.5 font-mono text-xs text-zinc-700 dark:text-zinc-300 uppercase tracking-widest ${className}`}>
      {icon && <span className="opacity-100 drop-shadow-sm">{icon}</span>}
      <span>{name}</span>
    </span>
  );
}
