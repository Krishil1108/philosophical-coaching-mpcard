"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigationLinks = [
  { label: "About", href: "/about", glyph: "○" },
  { label: "Services", href: "/services", glyph: "◆" },
  { label: "The Practice", href: "/practice", glyph: "∮" },
  { label: "Publications", href: "/publications", glyph: "✶" },
  { label: "Videos & Talks", href: "/videos", glyph: "▶" },
  { label: "Contact & Booking", href: "/contact", glyph: "↗" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    handle: "Michael Picard, PhD",
    href: "https://www.linkedin.com/in/michaelpicard/",
    category: "Professional Network",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@michaelpicardmscphd",
    href: "https://www.youtube.com/@michaelpicardmscphd",
    category: "Talks & Video Series",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.01C19.61 3.65 12 3.65 12 3.65s-7.61 0-9.48.502c-.98.262-1.748.98-2.02 1.96C0 8.04 0 12 0 12s0 3.96.502 5.837c.272.98 1.04 1.748 2.02 2.01C4.39 20.35 12 20.35 12 20.35s7.61 0 9.48-.502c.98-.262 1.748-.98 2.02-1.96C24 15.96 24 12 24 12s0-3.96-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "PhilPeople",
    handle: "michael-picard",
    href: "https://philpeople.org/profiles/michael-picard",
    category: "Academic Works & Papers",
    icon: (
      <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.2rem", fontWeight: 700, lineHeight: 1 }}>φ</span>
    ),
  },
  {
    name: "Goodreads",
    handle: "Michael Picard",
    href: "https://www.goodreads.com/author/show/22260951.Michael_Picard",
    category: "Author Profile & Books",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.116 12.441c-.815 0-1.477-.662-1.477-1.477 0-.814.662-1.477 1.477-1.477s1.477.663 1.477 1.477c0 .815-.662 1.477-1.477 1.477zm0-4.477c-2.484 0-4.5 2.016-4.5 4.5s2.016 4.5 4.5 4.5c1.472 0 2.78-.711 3.593-1.802v1.302c0 1.93-1.57 3.5-3.5 3.5-1.578 0-2.923-1.05-3.355-2.502l-2.617.523C6.985 21.05 9.317 22.5 12.116 22.5c4.136 0 7.5-3.364 7.5-7.5V1h-2.907v4.469c-.83-1.129-2.164-1.869-3.593-1.869c-2.484 0-4.5 2.016-4.5 4.5 0 2.484 2.016 4.5 4.5 4.5 1.429 0 2.763-.74 3.593-1.869v1.302c0-1.93-1.57-3.5-3.5-3.5z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "philosophysports",
    href: "https://www.facebook.com/philosophysports",
    category: "Community & Events",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@infinitarian8",
    href: "https://www.instagram.com/infinitarian8/",
    category: "Daily Thoughts & Visuals",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export default function Footer() {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(140% 90% at 10% 0%, rgba(139, 107, 74, 0.12) 0%, transparent 52%), radial-gradient(90% 120% at 100% 100%, rgba(163, 176, 148, 0.12) 0%, transparent 58%), linear-gradient(180deg, #f2ece4 0%, #ebe4d7 100%)",
        borderTop: "1px solid rgba(139, 107, 74, 0.28)",
      }}
    >
      {/* Subtle background grid pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(to right, rgba(139, 107, 74, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 107, 74, 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.2,
        }}
      />

      {/* Decorative Greek Phi Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-3rem",
          right: "3rem",
          fontFamily: "Cinzel, Cormorant Garamond, serif",
          fontSize: "14rem",
          color: "rgba(139, 107, 74, 0.05)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        φ
      </div>

      <div className="inner-max" style={{ maxWidth: "90rem", paddingTop: "4.5rem", paddingBottom: "2rem", position: "relative" }}>
        {/* Main Footer Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
          style={{ marginBottom: "3.5rem" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Column 1: Brand & Philosophy Statement */}
          <motion.div
            className="lg:col-span-4 flex flex-col justify-between"
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <span style={{ width: "20px", height: "1px", background: "var(--accent)" }} />
                Philosophical Practice
              </div>

              <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "0.6rem" }}>
                <h2
                  className="font-cinzel"
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
                    letterSpacing: "0.12em",
                    lineHeight: 1.15,
                    color: "var(--text-heading)",
                    fontWeight: 700,
                  }}
                >
                  MICHAEL PICARD
                </h2>
              </Link>

              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--accent)",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  marginBottom: "1.25rem",
                }}
              >
                PhD from MIT · Faculty at Douglas College
              </div>

              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.9375rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: "1.75rem",
                  maxWidth: "28rem",
                  fontWeight: 300,
                }}
              >
                Philosophical practice for real lives: private 1-on-1 coaching, public Café Philosophy dialogue, and rigorous inquiry grounded in clear language.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/book-session"
                className="btn-primary"
                style={{ padding: "0.75rem 1.4rem", fontSize: "0.8125rem", letterSpacing: "0.08em" }}
              >
                Book a Session
              </Link>
              <Link
                href="/contact"
                className="btn-outline"
                style={{ padding: "0.75rem 1.4rem", fontSize: "0.8125rem", letterSpacing: "0.08em" }}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.75rem",
                background: "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(4px)",
                height: "100%",
              }}
            >
              <h3
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ width: "12px", height: "1px", background: "var(--accent)" }} />
                Explore
              </h3>

              <nav className="flex flex-col gap-1.5">
                {navigationLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div key={link.href} whileHover={{ x: 3 }} transition={{ duration: 0.18 }}>
                      <Link
                        href={link.href}
                        style={{
                          textDecoration: "none",
                          borderRadius: "8px",
                          padding: "0.6rem 0.75rem",
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.9rem",
                          color: isActive ? "var(--accent-dark)" : "var(--text-heading)",
                          background: isActive
                            ? "linear-gradient(135deg, rgba(139, 107, 74, 0.14) 0%, rgba(139, 107, 74, 0.06) 100%)"
                            : "transparent",
                          border: isActive ? "1px solid rgba(139, 107, 74, 0.3)" : "1px solid transparent",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontWeight: isActive ? 500 : 400,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = "rgba(139, 107, 74, 0.08)";
                            e.currentTarget.style.color = "var(--accent)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--text-heading)";
                          }
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span style={{ color: "var(--accent)", fontSize: "0.75rem", opacity: 0.85 }}>
                            {link.glyph}
                          </span>
                          {link.label}
                        </span>
                        <span style={{ opacity: isActive ? 0.9 : 0.3, fontSize: "0.8rem" }}>→</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Column 3: Emphasized Social Media & Academic Networks Showcase */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.75rem",
                background: "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(4px)",
                height: "100%",
              }}
            >
              <div style={{ marginBottom: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "0.35rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ width: "12px", height: "1px", background: "var(--accent)" }} />
                  Connect & Media
                </h3>
                <p
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  Follow new publications, video lectures, discussions & research updates.
                </p>
              </div>

              {/* Emphasized 2-Column Grid of Social Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="card-hover"
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(139, 107, 74, 0.22)",
                      background: "rgba(255, 255, 255, 0.7)",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(139, 107, 74, 0.22)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: "rgba(139, 107, 74, 0.1)",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        className="font-serif"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--text-heading)",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.6875rem",
                          color: "var(--text-muted)",
                          fontWeight: 300,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginTop: "0.1rem",
                        }}
                      >
                        {item.category}
                      </div>
                    </div>
                    <span style={{ color: "var(--accent)", fontSize: "0.75rem", opacity: 0.7 }}>↗</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            borderTop: "1px solid rgba(139, 107, 74, 0.2)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
            }}
          >
            © {currentYear ?? "----"} Michael Picard, PhD. All rights reserved. · <span style={{ opacity: 0.75 }}>Built for inquiry.</span>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-outline"
            style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", letterSpacing: "0.12em" }}
          >
            Back to Top ↑
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
