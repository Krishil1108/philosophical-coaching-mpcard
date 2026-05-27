"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function UIEnhancements() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsClient(true);
    let rafId: number;

    const updateMousePosition = (e: MouseEvent) => {
      // Using requestAnimationFrame to ensure buttery smooth performance
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* 1. Reading Progress Line */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "var(--accent)",
          transformOrigin: "0%",
          scaleX,
          zIndex: 99999, // On top of everything
          opacity: 0.9,
        }}
      />

      {/* 2. Ambient Reading Glow tracking the cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 1.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          // A very soft, warm diffusion mimicking a reading light
          background: "radial-gradient(circle, rgba(139, 107, 74, 0.05) 0%, rgba(139, 107, 74, 0) 70%)",
          pointerEvents: "none",
          zIndex: 90, // Positioned behind modals and text but above base background
        }}
      />
    </>
  );
}
