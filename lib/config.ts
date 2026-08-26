export const siteConfig = {
  name: "Ansh Kumar",
  username: "anshk.dev",
  description: "Full-stack builder, hardware hacker, engineer. I make CLI tools, craft hardware from circuit boards to microcontrollers, and am passionate about Web3.",
  url: "https://anshk.dev",
  links: {
    github: "https://github.com/ansh3108",
    twitter: "https://x.com/anshkdev",
    email: "mailto:hello@anshk.dev",
  },
  hero: {
    title: "Hi, I'm Ansh Kumar.",
    subtitle: "Builder, hardware hacker, and engineer crafting resilient systems and experiments.",
    description: "I make CLI tools, craft hardware from circuit boards to microcontrollers, and passionate about Web3. I ship at Hack Club, and actively contribute to open-source.",
  },
  about: {
    text: "I am a full-stack builder, hardware hacker, and engineer based in Delhi, India. I am passionate about crafting decentralized systems, open-source tools, and hardware. I work with Rust, Solana, TypeScript, PCB Design, and more. I am always learning and exploring new technologies.",
  },
  
  // DUMMY DATA FOR EXPERIENCE
  // Replace these objects with your real experience
  experience: [
    {
      company: "Acme Corp",
      role: "Senior Systems Engineer",
      period: "2024 — Present",
      location: "Remote",
      description: "Leading the core infrastructure team. Architected distributed microservices reducing latency by 40%.",
      technologies: ["Rust", "TypeScript", "PostgreSQL", "AWS", "Docker"],
      url: "https://example.com",
    },
    {
      company: "Hack Club",
      role: "Core Contributor",
      period: "2022 — 2024",
      location: "San Francisco, CA",
      description: "Developed hardware systems and open-source tooling for thousands of student developers globally.",
      technologies: ["C++", "React", "Next.js", "Linux"],
      url: "https://hackclub.com",
    }
  ],

  // DUMMY DATA FOR SELECTED WORKS
  // Replace these objects with your real projects
  projects: [
    {
      title: "Distributed KV Store",
      description: "A highly-available, distributed key-value store built from scratch implementing the Raft consensus algorithm. Designed for high throughput and fault tolerance in ephemeral environments.",
      year: "2026",
      tech: ["Rust", "Docker", "Linux"],
      github: "https://github.com/ansh3108",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Solana Analytics",
      description: "Real-time on-chain analytics dashboard processing millions of transactions to visualize decentralized exchange volume and liquidity pools.",
      year: "2025",
      tech: ["TypeScript", "Next.js", "Solana", "PostgreSQL"],
      github: "https://github.com/ansh3108",
      live: "https://example.com",
      featured: false,
    },
    {
      title: "Hardware Wallet",
      description: "Custom PCB design and firmware for a cold-storage hardware wallet supporting secp256k1 signing.",
      year: "2024",
      tech: ["C++", "React", "GitHub"],
      github: "https://github.com/ansh3108",
      live: "",
      featured: false,
    }
  ],

  ecosystem: {
    languages: ["Rust", "TypeScript", "C++", "Python", "JavaScript"],
    architecture: ["Next.js", "React", "Node.js", "Tailwind CSS", "PostgreSQL", "MongoDB"],
    systems: ["Solana", "Docker", "Git", "Linux", "AWS", "Cloudflare"]
  }
};
