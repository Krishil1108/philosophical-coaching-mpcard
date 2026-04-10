"use client";

import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Practice", href: "/practice" },
  { label: "Publications", href: "/publications" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "Contact", href: "/contact" },
];

const externalLinks = [
  { 
    label: "Book Session", 
    href: "/book-session",
    icon: "calendar"
  },
  { 
    label: "PhilPeople", 
    href: "https://philpeople.org/profiles/michael-picard",
    icon: "academic"
  },
];

export default function Footer() {
  return (
    <footer 
      style={{ 
        background: "var(--bg-card)",
        borderTop: "2px solid var(--accent)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Element */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "-10%",
          width: "40%",
          height: "100%",
          background: "linear-gradient(135deg, transparent 0%, rgba(139, 107, 74, 0.03) 50%, transparent 100%)",
          transform: "skewX(-12deg)",
          pointerEvents: "none",
        }}
      />

      {/* Main Content */}
      <div className="inner-max" style={{ maxWidth: "88rem", padding: "4rem 2rem 2rem", position: "relative" }}>
        
        {/* Top Section: Philosophy Quote */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              color: "var(--accent)",
              opacity: 0.6,
              marginBottom: "1.5rem",
              fontFamily: "Georgia, serif",
            }}
          >
            φ
          </div>
          
          <blockquote
            className="font-italic"
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: "var(--text-heading)",
              fontStyle: "italic",
              lineHeight: 1.4,
              maxWidth: "42rem",
              margin: "0 auto 1.5rem",
              textAlign: "center",
            }}
          >
            "Philosophy is not a method, theory, or set of answers. It's a way of actively generating and inhabiting questions with greater clarity, purpose, and freedom."
          </blockquote>

          <div
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--accent)",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Middle Section: Navigation & Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "4rem",
            alignItems: "start",
            marginBottom: "3rem",
          }}
        >
          {/* Left: Quick Navigation */}
          <div>
            <h3
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "1.5rem",
              }}
            >
              Navigate
            </h3>
            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.9375rem",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-muted)";
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.paddingLeft = "1rem";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.paddingLeft = "0.75rem";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Brand */}
          <div style={{ textAlign: "center", minWidth: "200px" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  marginBottom: "1rem",
                }}
              >
                <h2
                  className="font-cinzel"
                  style={{
                    fontSize: "1.75rem",
                    color: "var(--text-heading)",
                    letterSpacing: "0.2em",
                    lineHeight: 1.2,
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-heading)")}
                >
                  MICHAEL
                  <br />
                  PICARD
                </h2>
              </div>
            </Link>

            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                lineHeight: 1.6,
              }}
            >
              <div style={{ marginBottom: "0.25rem" }}>Philosophical Practice</div>
              <div style={{ color: "var(--accent)", fontWeight: 500 }}>British Columbia, Canada</div>
            </div>

            {/* Credentials */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.25rem",
                background: "var(--bg-muted)",
                borderRadius: "50px",
                display: "inline-block",
              }}
            >
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                PhD · Douglas College
              </span>
            </div>
          </div>

          {/* Right: Connect */}
          <div style={{ textAlign: "right" }}>
            <h3
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "1.5rem",
              }}
            >
              Connect
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
              {externalLinks.map((link) => (
                // Internal booking links should stay in-tab; external resources open new tab.
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.9375rem",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    padding: "0.75rem 1.25rem",
                    border: "1px solid var(--border)",
                    borderRadius: "50px",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              ))}

              {/* Email Contact */}
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "var(--bg-muted)",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Questions?
                </div>
                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--accent)",
                    fontWeight: 500,
                  }}
                >
                  Get in touch
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Copyright */}
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span>© {new Date().getFullYear()} Michael Picard</span>
            <span style={{ color: "var(--accent)" }}>·</span>
            <span>All rights reserved</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "none",
              border: "1px solid var(--accent)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              color: "var(--accent)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
