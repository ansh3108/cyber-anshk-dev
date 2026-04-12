"use client";

export const SocialLinks = () => {
  const links = [
    { n: "github", h: "https://github.com/ansh3108", color: "181717" },
    { n: "linkedin", h: "https://www.linkedin.com/in/ansh-kumar-tech/", color: "0A66C2" },
    { n: "x", h: "https://x.com/anshkdev", color: "ffffff" },
    { n: "discord", h: "https://discord.com/users/1034298845905027122", color: "5865F2" }
  ];

  return (
    <div className="flex gap-4">
      {links.map((l) => (
        <a 
          key={l.n} 
          href={l.h} 
          target="_blank" 
          rel="noreferrer"
          aria-label={l.n}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
        >
          <img 
            src={`https://cdn.simpleicons.org/${l.n}/${l.color}`} 
            alt={l.n} 
            className="h-5 w-5 opacity-85 transition-opacity group-hover:opacity-100" 
          />
        </a>
      ))}
    </div>
  );
};
