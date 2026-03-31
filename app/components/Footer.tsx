"use client";

import Link from "next/link";

const cols = [
  {
    heading: "Practice",
    links: [
      { label: "About Michael",   href: "/about" },
      { label: "Services",        href: "/services" },
      { label: "The Practice",    href: "/practice" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Publications",    href: "/publications" },
      { label: "Gallery",         href: "/gallery" },
      { label: "Videos",          href: "/videos" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact",         href: "/contact" },
      { label: "Book a Session",  href: "https://chat.appa.edu/product/chat-with-michael-picard-msc-phd/" },
      { label: "PhilPeople",      href: "https://philpeople.org/profiles/michael-picard" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-muted)" }}>

      {/* ── TOP: Brand identity ─────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "5rem 0 4.5rem",
          textAlign: "center",
        }}
      >
        {/* Phi mark */}
        <div
          className="font-cinzel"
          style={{
            fontSize: "4rem",
            color: "rgba(139, 107, 74, 0.15)",
            lineHeight: 1,
            marginBottom: "1.75rem",
            letterSpacing: "0.1em",
          }}
        >
          φ
        </div>

        {/* Brand name */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <h2
            className="font-cinzel"
            style={{
              fontSize: "clamp(1.75rem, 5.5vw, 5.5rem)",
              color: "var(--text-heading)",
              letterSpacing: "0.28em",
              lineHeight: 1,
              marginBottom: "1.25rem",
              fontWeight: 600,
            }}
          >
            MICHAEL PICARD
          </h2>
        </Link>

        {/* Accent rule */}
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "var(--accent)",
            margin: "0 auto 1.5rem",
            borderRadius: "1px",
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.5625rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Philosophical Practice · British Columbia, Canada
        </p>
      </div>

      {/* ── MIDDLE: 3-column nav grid ────────────── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-card)" }}>
        <div
          className="inner-max"
          style={{
            maxWidth: "72rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          {cols.map((col, i) => (
            <div
              key={col.heading}
              style={{
                padding: "3.5rem 3rem",
                borderRight:
                  i < cols.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                textAlign: "center",
              }}
            >
              {/* Column heading */}
              <h4
                className="font-cinzel"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: "1.75rem",
                }}
              >
                {col.heading}
              </h4>

              {/* Links */}
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="footer-link"
                      style={{
                        fontFamily: "DM Serif Display, serif",
                        fontSize: "1.125rem",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontWeight: 400,
                        fontStyle: "italic",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "inline-block",
                        position: "relative",
                        letterSpacing: "0.02em",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                        e.currentTarget.style.transform = "translateX(10px) scale(1.05)";
                        e.currentTarget.style.letterSpacing = "0.08em";
                        e.currentTarget.style.textShadow = "0 2px 8px rgba(139, 107, 74, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-muted)";
                        e.currentTarget.style.transform = "translateX(0) scale(1)";
                        e.currentTarget.style.letterSpacing = "0.02em";
                        e.currentTarget.style.textShadow = "none";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: copyright bar ───────────────── */}
      <div style={{ background: "var(--bg-muted)" }}>
        <div
          className="inner-max"
          style={{
            maxWidth: "72rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 0",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
              fontWeight: 300,
            }}
          >
            © {new Date().getFullYear()} Michael Picard. All rights reserved.
          </span>

          {/* Minimal credential */}
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.5625rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              opacity: 0.6,
            }}
          >
            PhD · Douglas College
          </span>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.5625rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            Back to top
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>

    </footer>
  );
}
