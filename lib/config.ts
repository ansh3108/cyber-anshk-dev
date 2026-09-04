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
    text: "I am a full-stack builder, hardware hacker, and engineer based in Bengaluru, India. I am passionate about crafting decentralized systems, open-source tools, and hardware. I work with Rust, Solana, TypeScript, PCB Design, and more. I am always learning and exploring new technologies.",
  },
  
  // DUMMY DATA FOR EXPERIENCE
  // Replace these objects with your real experience
  experience: [
    {
      company: "Hack Club",
      role: "Core Contributor",
      period: "2022 — 2026",
      location: "Remote",
      description: "Made 180+ projects in different domains -- games, websites, CLI tools, hardware and a lot of other things.",
      technologies: ["Rust", "React", "Next.js", "TypeScript"],
      url: "https://hackclub.com",
    }
  ],

  // DUMMY DATA FOR SELECTED WORKS
  // Replace these objects with your real projects
  projects: [
    {
      title: "USB HUB",
      description: "A hardware module providing four 5V output ports from a single USB input. Custom circuit routing and fabricated PCB.",
      year: "2024",
      tech: ["Hardware", "EasyEDA", "PCB Design", "Circuit Routing"],
      github: "https://oshwlab.com/itz.anshkumar/usb-hub",
      live: "https://oshwlab.com/itz.anshkumar/usb-hub",
      featured: false,
    },
    {
      title: "NFC Business Card",
      description: "An NFC-powered business card that harvests energy from nearby devices to instantly light up an LED.",
      year: "2025",
      tech: ["Hardware", "EasyEDA", "PCB Design"],
      github: "https://oshwlab.com/itz.anshkumar/nfc-business-card_copy_copy_copy",
      live: "https://oshwlab.com/itz.anshkumar/nfc-business-card_copy_copy_copy",
      featured: false,
    },
    {
      title: "Commit to Quest",
      description: "Turns your GitHub activity into an 8-bit RPG adventure. Level up with every commit.",
      year: "2024",
      tech: ["Next.js", "React", "GitHub"],
      github: "https://github.com/ansh3108/Commit-to-Quest",
      live: "https://commit-to-quest.vercel.app/",
      featured: false,
    },
    {
      title: "Terminal Quest",
      description: "Rust based terminal game that pushes you to be more productive!",
      year: "2026",
      tech: ["Typescript", "Next.js", "Github API", "Tailwind CSS"],
      live: "https://github.com/ansh3108/Commit-to-Quest",
      featured: false,
    }

  ],

  ecosystem: {
    languages: ["Rust", "TypeScript", "C++", "Python", "JavaScript"],
    architecture: ["Next.js", "React", "Node.js", "Tailwind CSS", "MongoDB"],
    systems: ["Solana", "Docker", "Linux",]
  }
};
