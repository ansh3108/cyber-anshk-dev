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
    script.src = "https://rawgithub.com/adryd325/oneko.js/main/oneko.js";
    document.body.appendChild(script);
  };

  return (
    <>
      {konamiActivated && (
        <div className="fixed bottom-4 right-4 text-xs font-mono text-zinc-500 animate-pulse">
          Meow! 🐱
        </div>
      )}
    </>
  );
}
