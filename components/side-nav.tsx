"use client";

import * as React from "react";

const SECTIONS = [
  { id: "hero", num: "00", label: "Home" },
  { id: "about", num: "01", label: "About" },
  { id: "projects", num: "02", label: "Selected Works" },
  { id: "experience", num: "03", label: "Experience" },
  { id: "dashboard", num: "04", label: "Dashboard" },
  { id: "contact", num: "05", label: "Contact" },
];

export function SideNav() {
  const [activeSection, setActiveSection] = React.useState("hero");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="print:hidden hidden xl:flex flex-col fixed left-5 lg:left-9 top-1/2 -translate-y-1/2 gap-3 z-30"
    >
      {SECTIONS.map(({ id, num, label }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="relative group flex items-center">
            <button
              onClick={() => scrollTo(id)}
              aria-label={`Scroll to ${label}`}
              aria-current={isActive ? "true" : undefined}
              className={`w-11 h-11 border-[3px] border-ink font-mono text-[13px] font-bold tracking-wider leading-none flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-ink text-paper shadow-[4px_4px_0_0_var(--color-grape)] -rotate-3"
                  : "bg-surface text-ink shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-sun hover:text-void hover:-translate-y-0.5"
              }`}
            >
              {num}
            </button>
            <span
              className={`pointer-events-none absolute left-14 border-[3px] border-ink px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
                isActive ? "bg-ink text-paper" : "bg-sun text-void"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
