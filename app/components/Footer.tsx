"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const navigationLinks = [
  { label: "About", href: "/about", glyph: "○", note: "Background, philosophy, and credentials." },
  { label: "Services", href: "/services", glyph: "◆", note: "Session formats and offerings." },
  { label: "Practice", href: "/practice", glyph: "∮", note: "Method and mode of inquiry." },
  { label: "Publications", href: "/publications", glyph: "✶", note: "Books, writing, and translations." },
  { label: "Videos", href: "/videos", glyph: "▶", note: "Talks, clips, and guided reflections." },
  { label: "Contact", href: "/contact", glyph: "↗", note: "Ways to connect directly." },
];

const externalLinks = [
  { label: "Book Session", href: "/book-session" },
  { label: "PhilPeople", href: "https://philpeople.org/profiles/michael-picard" },
];

const prompts = [
  "What belief are you currently living inside?",
  "What question refuses to leave you alone?",
  "What if clarity begins with language, not certainty?",
  "What assumption is quietly steering your day?",
  "Where in your life are you waiting for permission to think?",
  "What metaphor are you using to define yourself?",
  "What happens if your problem is actually a question?",
];

const pulseWords = [
  "Inquiry",
  "Language",
  "Clarity",
  "Presence",
  "Dialogue",
  "Attention",
  "Courage",
  "Reframing",
];

const sessionModes = [
  {
    id: "clarity",
    label: "Need Clarity",
    summary: "Surface hidden assumptions and get unstuck in your thinking.",
  },
  {
    id: "transition",
    label: "In Transition",
    summary: "Explore major life decisions without imposed worldview.",
  },
  {
    id: "practice",
    label: "Build Practice",
    summary: "Develop a more rigorous personal philosophy over time.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.08 },
  },
};

export default function Footer() {
  const pathname = usePathname();
  const [activePrompt, setActivePrompt] = useState(0);
  const [activeMode, setActiveMode] = useState(0);
  const [activePulse, setActivePulse] = useState(0);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [hoveredExplore, setHoveredExplore] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    setActivePrompt(now.getDay() % prompts.length);
    setCurrentYear(now.getFullYear());
  }, []);

  useEffect(() => {
    const rotatePrompt = window.setInterval(() => {
      setActivePrompt((prev) => (prev + 1) % prompts.length);
    }, 9000);

    return () => window.clearInterval(rotatePrompt);
  }, []);

  useEffect(() => {
    const pulseInterval = window.setInterval(() => {
      setActivePulse((prev) => (prev + 1) % pulseWords.length);
    }, 2400);

    return () => window.clearInterval(pulseInterval);
  }, []);

  const bookingHref = useMemo(() => {
    const intent = sessionModes[activeMode]?.id || "clarity";
    return `/book-session?intent=${encodeURIComponent(intent)}`;
  }, [activeMode]);

  const currentPrompt = prompts[activePrompt];
  const currentMode = sessionModes[activeMode];
  const focusLink =
    navigationLinks.find((link) => link.href === hoveredExplore) ||
    navigationLinks.find((link) => link.href === pathname) ||
    navigationLinks[0];

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(140% 90% at 10% 0%, rgba(139, 107, 74, 0.13) 0%, transparent 52%), radial-gradient(90% 120% at 100% 100%, rgba(163, 176, 148, 0.14) 0%, transparent 58%), linear-gradient(180deg, #f0ebe3 0%, #ebe4d7 100%)",
        borderTop: "1px solid rgba(139, 107, 74, 0.28)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(to right, rgba(139, 107, 74, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 107, 74, 0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          opacity: 0.24,
        }}
      />

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.3, 0.1, 0.2, 1] }}
        style={{
          position: "absolute",
          top: "-4rem",
          right: "4rem",
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "11rem",
          color: "rgba(139, 107, 74, 0.12)",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        φ
      </motion.div>

      <div className="inner-max" style={{ maxWidth: "90rem", paddingTop: "4.5rem", paddingBottom: "1.8rem", position: "relative" }}>
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            marginBottom: "2.2rem",
            padding: "1.1rem 1.25rem",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.56rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    display: "block",
                  }}
                >
                  Live Inquiry Deck
                </span>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setActivePrompt((prev) => (prev + 1) % prompts.length)}
                  style={{ padding: "0.35rem 0.65rem", fontSize: "0.56rem", letterSpacing: "0.17em" }}
                >
                  New Prompt
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={activePrompt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontFamily: "DM Serif Display, Georgia, serif",
                    fontSize: "clamp(1.05rem, 2.2vw, 1.55rem)",
                    lineHeight: 1.35,
                    color: "var(--text-heading)",
                  }}
                >
                  {currentPrompt}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="md:col-span-5">
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.56rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Session Compass
              </span>

              <div className="flex flex-wrap gap-2 mb-2">
                {sessionModes.map((mode, index) => {
                  const isActive = activeMode === index;
                  return (
                    <button
                      type="button"
                      key={mode.id}
                      onClick={() => setActiveMode(index)}
                      style={{
                        border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                        background: isActive ? "rgba(139, 107, 74, 0.14)" : "rgba(255, 255, 255, 0.58)",
                        color: isActive ? "var(--accent-dark)" : "var(--text-muted)",
                        borderRadius: "999px",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.11em",
                        textTransform: "uppercase",
                        padding: "0.36rem 0.66rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.84rem",
                    lineHeight: 1.55,
                    color: "var(--text-muted)",
                    marginTop: "0.45rem",
                  }}
                >
                  {currentMode.summary}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          style={{ marginBottom: "2.3rem" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.section
            className="lg:col-span-5"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "1.6rem",
              background: "rgba(255, 255, 255, 0.55)",
            }}
          >
            <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "0.8rem" }}>
              <h2
                className="font-cinzel"
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
                  letterSpacing: "0.15em",
                  lineHeight: 1.15,
                  color: "var(--text-heading)",
                }}
              >
                MICHAEL PICARD
              </h2>
            </Link>

            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                marginBottom: "1.15rem",
                maxWidth: "36rem",
              }}
            >
              Philosophical practice for real lives: private sessions, public dialogue, and rigorous inquiry grounded in clear language.
            </p>

            <div className="flex flex-wrap gap-2" style={{ marginBottom: "1rem" }}>
              {pulseWords.map((word, index) => {
                const isActive = index === activePulse;
                return (
                  <motion.span
                    key={word}
                    animate={{
                      y: isActive ? -2 : 0,
                      scale: isActive ? 1.04 : 1,
                    }}
                    transition={{ duration: 0.22 }}
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "0.38rem 0.62rem",
                      borderRadius: "999px",
                      color: isActive ? "var(--accent-dark)" : "var(--text-muted)",
                      border: isActive
                        ? "1px solid rgba(139, 107, 74, 0.35)"
                        : "1px solid rgba(139, 107, 74, 0.2)",
                      background: isActive ? "rgba(139, 107, 74, 0.12)" : "rgba(255, 255, 255, 0.45)",
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {["PhD, MIT", "Douglas College", "700+ sessions", "British Columbia"].map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.63rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.45rem 0.68rem",
                    borderRadius: "999px",
                    color: "var(--accent)",
                    border: "1px solid rgba(139, 107, 74, 0.28)",
                    background: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="lg:col-span-4"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "1.6rem",
              background: "rgba(255, 255, 255, 0.55)",
            }}
          >
            <h3
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.66rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "1rem",
              }}
            >
              Explore
            </h3>

              <div
                style={{
                  border: "1px solid rgba(139, 107, 74, 0.2)",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.6)",
                  padding: "0.75rem 0.8rem",
                  marginBottom: "0.85rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "0.35rem",
                  }}
                >
                  Focus
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={focusLink.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.82rem",
                      lineHeight: 1.5,
                      color: "var(--text-muted)",
                    }}
                  >
                    <span style={{ color: "var(--accent-dark)", marginRight: "0.4rem" }}>{focusLink.glyph}</span>
                    {focusLink.note}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-2">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href;
                  const isHovered = hoveredExplore === link.href;

                return (
                    <motion.div
                    key={link.href}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredExplore(link.href)}
                      onMouseLeave={() => setHoveredExplore(null)}
                    style={{
                      textDecoration: "none",
                      borderRadius: "8px",
                        padding: "0.55rem 0.62rem",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.86rem",
                        color: isActive || isHovered ? "var(--accent-dark)" : "var(--text-muted)",
                        background:
                          isActive || isHovered
                            ? "linear-gradient(135deg, rgba(139, 107, 74, 0.16) 0%, rgba(139, 107, 74, 0.08) 100%)"
                            : "transparent",
                        border:
                          isActive || isHovered
                            ? "1px solid rgba(139, 107, 74, 0.3)"
                            : "1px solid transparent",
                        transition: "all 0.22s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.45rem",
                    }}
                  >
                      <span>
                        <span style={{ marginRight: "0.35rem", opacity: 0.8 }}>{link.glyph}</span>
                        {link.label}
                      </span>
                      <span style={{ opacity: isActive || isHovered ? 0.9 : 0.35 }}>→</span>
                      </Link>
                    </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="lg:col-span-3"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "1.6rem",
              background: "rgba(255, 255, 255, 0.55)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.66rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.75rem",
                }}
              >
                Connect
              </h3>

              {/* Real brand logo links row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", justifyItems: "center", margin: "1.25rem 0" }}>
                {[
                  {
                    href: "https://www.linkedin.com/in/michaelpicard/",
                    label: "LinkedIn",
                    icon: (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )
                  },
                  {
                    href: "https://philpeople.org/profiles/michael-picard",
                    label: "PhilPeople",
                    icon: <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.3rem", fontWeight: 700, lineHeight: 1 }}>φ</span>
                  },
                  {
                    href: "https://www.goodreads.com/author/show/22260951.Michael_Picard",
                    label: "Goodreads",
                    icon: (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.116 12.441c-.815 0-1.477-.662-1.477-1.477 0-.814.662-1.477 1.477-1.477s1.477.663 1.477 1.477c0 .815-.662 1.477-1.477 1.477zm0-4.477c-2.484 0-4.5 2.016-4.5 4.5s2.016 4.5 4.5 4.5c1.472 0 2.78-.711 3.593-1.802v1.302c0 1.93-1.57 3.5-3.5 3.5-1.578 0-2.923-1.05-3.355-2.502l-2.617.523C6.985 21.05 9.317 22.5 12.116 22.5c4.136 0 7.5-3.364 7.5-7.5V1h-2.907v4.469c-.83-1.129-2.164-1.869-3.593-1.869c-2.484 0-4.5 2.016-4.5 4.5 0 2.484 2.016 4.5 4.5 4.5 1.429 0 2.763-.74 3.593-1.869v1.302c0-1.93-1.57-3.5-3.5-3.5z"/>
                      </svg>
                    )
                  },
                  {
                    href: "https://www.youtube.com/@michaelpicardmscphd",
                    label: "YouTube",
                    icon: (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.01C19.61 3.65 12 3.65 12 3.65s-7.61 0-9.48.502c-.98.262-1.748.98-2.02 1.96C0 8.04 0 12 0 12s0 3.96.502 5.837c.272.98 1.04 1.748 2.02 2.01C4.39 20.35 12 20.35 12 20.35s7.61 0 9.48-.502c.98-.262 1.748-.98 2.02-1.96C24 15.96 24 12 24 12s0-3.96-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    )
                  },
                  {
                    href: "https://www.facebook.com/philosophysports",
                    label: "Facebook",
                    icon: (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )
                  },
                  {
                    href: "https://www.instagram.com/infinitarian8/",
                    label: "Instagram",
                    icon: (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                    )
                  }
                ].map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    aria-label={item.label}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid rgba(139, 107, 74, 0.28)",
                      background: "rgba(255, 255, 255, 0.6)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.background = "var(--accent)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(139, 107, 74, 0.28)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.6)";
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {externalLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                const finalHref = link.label === "Book Session" ? bookingHref : link.href;
                return (
                  <Link
                    key={link.href}
                    href={finalHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={link.label === "Book Session" ? "btn-primary" : "btn-outline"}
                    style={{ width: "100%", justifyContent: "center", padding: "0.75rem 1rem" }}
                  >
                    {link.label === "Book Session" ? `Book: ${currentMode.label}` : link.label}
                  </Link>
                );
              })}
            </div>
          </motion.section>
        </motion.div>

        {/* ─── DIGITAL COORDINATES (QR CODES) ─────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          style={{
            marginBottom: "2.3rem",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "2.5rem 1.6rem",
            background: "rgba(255, 255, 255, 0.55)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h3
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem"
              }}
            >
              <span style={{ width: "2rem", height: "1px", background: "var(--accent)" }} />
              Digital Coordinates
              <span style={{ width: "2rem", height: "1px", background: "var(--accent)" }} />
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Buy Me a Coffee */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div style={{ position: "relative", width: "120px", height: "120px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(139, 107, 74, 0.2)", background: "white", padding: "0.5rem" }}>
                <img src="/bmc_qr.png" alt="Buy Me a Coffee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "DM Serif Display, serif", fontSize: "1.2rem", color: "var(--text-heading)", marginBottom: "0.3rem" }}>Support the Practice</div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>Scan to buy a coffee</div>
              </div>
            </motion.div>

            {/* 2. Tug of Logic */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div style={{ position: "relative", width: "120px", height: "120px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(139, 107, 74, 0.2)", background: "white", padding: "0.5rem" }}>
                <img src="/qrcode_www.tug-of-logic.com.png" alt="Tug of Logic" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "DM Serif Display, serif", fontSize: "1.2rem", color: "var(--text-heading)", marginBottom: "0.3rem" }}>Tug of Logic</div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>Play Philosophy Sports</div>
              </div>
            </motion.div>

            {/* 3. ORCID ID */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div style={{ position: "relative", width: "120px", height: "120px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(139, 107, 74, 0.2)", background: "white", padding: "0.5rem" }}>
                <img src="/MP_ORCID.png" alt="Michael Picard ORCID" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "DM Serif Display, serif", fontSize: "1.2rem", color: "var(--text-heading)", marginBottom: "0.3rem" }}>Academic Profile</div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>Scan for ORCID ID</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          style={{
            borderTop: "1px solid rgba(139, 107, 74, 0.2)",
            paddingTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
            }}
          >
            Copyright {currentYear ?? "----"} Michael Picard. Built for inquiry.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-outline"
            style={{ padding: "0.55rem 0.9rem", letterSpacing: "0.12em" }}
          >
            Back to Top
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
