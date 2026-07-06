"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Inner dot — instant tracking via raw motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring — spring-delayed tracking
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.1 });

  // ---------- SSR & mobile guard ----------
  useEffect(() => {
    setIsMounted(true);

    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // ---------- Mouse position ----------
  useEffect(() => {
    if (!isMounted || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMounted, isMobile, cursorX, cursorY]);

  // ---------- Hover detection on interactive elements ----------
  const handleEnter = useCallback(() => setIsHovering(true), []);
  const handleLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    if (!isMounted || isMobile) return;

    const selector = "a, button, [data-cursor='pointer']";
    const elements = document.querySelectorAll<HTMLElement>(selector);

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isMounted, isMobile, handleEnter, handleLeave]);

  // ---------- Click effect ----------
  useEffect(() => {
    if (!isMounted || isMobile) return;

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isMounted, isMobile]);

  // ---------- Bail out for SSR / mobile ----------
  if (!isMounted || isMobile) return null;

  // ---------- Derived scales ----------
  const outerScale = isClicking ? 0.8 : isHovering ? 1.5 : 1;
  const innerScale = isHovering ? 0.5 : 1;

  const outerBorderColor = isHovering
    ? "rgba(255, 255, 255, 0.6)"
    : "rgba(147, 51, 234, 0.5)";

  return (
    <>
      {/* Inner dot — instant */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#9333ea",
          pointerEvents: "none",
          zIndex: 9999,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: innerScale }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Outer ring — spring-delayed */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: outerScale,
          borderColor: outerBorderColor,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        initial={{
          borderWidth: 1.5,
          borderStyle: "solid",
          borderColor: "rgba(147, 51, 234, 0.5)",
        }}
      />
    </>
  );
}
