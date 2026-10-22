"use client";

import { useEffect, useState } from "react";

export function EasterEggs() {
  const [konamiActivated, setKonamiActivated] = useState(false);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setKonamiActivated(true);
          konamiIndex = 0;
          initOneko();
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const initOneko = () => {
    // A simplified oneko script loader
    if (document.getElementById("oneko-script")) return;
    const script = document.createElement("script");
    script.id = "oneko-script";
    script.src = "https://cdn.jsdelivr.net/gh/adryd325/oneko.js@main/oneko.js";
    // Sprite: the script defaults to ./oneko.gif relative to the page,
    // so point it at the sprite on the CDN explicitly.
    script.dataset.cat = "https://cdn.jsdelivr.net/gh/adryd325/oneko.js@main/oneko.gif";
    document.body.appendChild(script);
  };

  return (
    <>
      {konamiActivated && (
        <div className="fixed bottom-4 right-4 z-50 border-[3px] border-ink bg-sun px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest shadow-[4px_4px_0_0_var(--color-ink)] rotate-2 animate-pulse">
          Meow! 🐱
        </div>
      )}
    </>
  );
}
