"use client";

export const SocialLinks = () => {
  const links = [
    { n: "github", h: "https://github.com/ansh3108", icon: <GitHubLogo /> },
    { n: "linkedin", h: "https://www.linkedin.com/in/ansh-kumar-tech/", icon: <LinkedInLogo /> },
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
          {l.icon ?? (
            <img
              src={`https://cdn.simpleicons.org/${l.n}/${l.color}`}
              alt={l.n}
              className="h-5 w-5 opacity-85 transition-opacity group-hover:opacity-100"
            />
          )}
        </a>
      ))}
    </div>
  );
};

function GitHubLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="12" fill="#181717" />
      <path
        fill="#ffffff"
        d="M12 4.5a7.5 7.5 0 0 0-2.37 14.62c.38.07.52-.16.52-.36v-1.27c-2.12.46-2.57-1-2.57-1-.35-.9-.86-1.14-.86-1.14-.7-.48.06-.47.06-.47.77.05 1.18.79 1.18.79.69 1.18 1.8.84 2.24.64.07-.5.27-.84.5-1.03-1.69-.19-3.47-.85-3.47-3.78 0-.84.3-1.52.79-2.06-.08-.2-.34-1 .08-2.08 0 0 .65-.21 2.12.79a7.4 7.4 0 0 1 3.87 0c1.47-1 2.12-.79 2.12-.79.42 1.08.16 1.88.08 2.08.49.54.79 1.22.79 2.06 0 2.94-1.78 3.59-3.48 3.78.28.24.53.71.53 1.44v2.14c0 .2.14.43.53.35A7.5 7.5 0 0 0 12 4.5Z"
      />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        fill="#ffffff"
        d="M7.5 9.2H5.4V18h2.1V9.2Zm-1-1.1a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM12.5 9.2h-2V18h2v-4.8c0-1.3.2-2.5 1.8-2.5 1.5 0 1.5 1.4 1.5 2.6V18h2v-5.4c0-2.6-.6-4.6-3.6-4.6-1.4 0-2.3.8-2.7 1.5h0V9.2Z"
      />
    </svg>
  );
}
