"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function FloatingSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "1rem",
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(139, 107, 74, 0.3)",
              borderRadius: "16px",
              padding: "1.25rem",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              width: "240px",
            }}
          >
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Support the Practice
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(139, 107, 74, 0.15)",
                background: "white",
              }}
            >
              <Image
                src="/bmc_qr.png"
                alt="Buy Me a Coffee QR Code"
                fill
                style={{ objectFit: "contain", padding: "0.5rem" }}
              />
            </div>
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textAlign: "center",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              Fuel further philosophical inquiry. Scan to buy a coffee!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent) 0%, var(--sage) 100%)",
          border: "none",
          boxShadow: "0 8px 24px rgba(139, 107, 74, 0.3)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        aria-label="Support via Buy Me a Coffee"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
