"use client";

import * as React from "react";

const SECTIONS = [
  { id: "hero", label: "00 / Home" },
  { id: "about", label: "01 / About" },
  { id: "projects", label: "02 / Selected Works" },
  { id: "experience", label: "03 / Experience" },
  { id: "tech-stack", label: "04 / Technologies" },
  { id: "github", label: "05 / Activity" },
  { id: "contact", label: "06 / Contact" },
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
    <div className="hidden xl:flex flex-col fixed left-8 lg:left-12 top-1/2 -translate-y-1/2 space-y-6 z-50 mix-blend-difference text-white">
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="relative group flex items-center">
            <button
              onClick={() => scrollTo(id)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out ${
                isActive
                  ? "bg-white scale-150"
                  : "bg-zinc-500 hover:bg-zinc-300 hover:scale-125"
              }`}
              aria-label={`Scroll to ${label}`}
            />
            <span 
              className={`absolute left-6 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap transition-all duration-500 ease-out ${
                isActive 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-50 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
