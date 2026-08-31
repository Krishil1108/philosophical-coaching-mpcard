"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface Service {
  _id: string;
  title: string;
  icon?: string;
  description?: string;
  price?: string;
  duration?: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  featured?: boolean;
  showWhatToExpect?: boolean;
  whatToExpect?: {
    n: string;
    title: string;
    body: string;
  }[];
}

const defaultServices: Service[] = [
  {
    _id: "1",
    title: "Philosophy as Counsel",
    description:
      "An intimate philosophical dialogue where we examine the language underlying your deepest beliefs. Through neo-socratic questioning and semantic analysis, we reveal the hidden structures that shape how you see everything — and open up options you didn't know existed.",
    price: "$60–$100 USD",
    duration: "30 or 60 minutes",
    features: ["Neo-socratic method", "Semantic belief analysis", "No preset worldview", "Live format", "Fully confidential"],
    ctaText: "Book a Session",
    ctaLink: "/book-session",
    featured: true,
  },
  {
    _id: "2",
    title: "Dialogue Facilitation",
    description:
      "Public philosophical dialogue in a relaxed, open setting. Inspired by 12+ years of weekly sessions in Victoria, BC — open to everyone regardless of background. A space where questioning together is the only requirement.",
    price: "Community-based",
    duration: "90 minutes",
    features: ["Group facilitation", "Democratic topics", "700+ sessions", "All backgrounds welcome"],
    ctaText: "Enquire",
    ctaLink: "/contact",
    featured: false,
  },
  {
    _id: "3",
    title: "Editorial / Translation",
    description:
      "Michael's original format — competitive yet collaborative philosophical debate where teams engage in structured intellectual play. A uniquely energising way to sharpen critical thinking in educational and corporate contexts.",
    price: "Custom",
    duration: "Variable",
    features: ["Team-based inquiry", "Structured argumentation", "Institutions & corporates", "Original methodology"],
    ctaText: "Enquire",
    ctaLink: "/contact",
    featured: false,
  },
];

function numberToRoman(num: number): string {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return romanNumerals[num - 1] || num.toString();
}

export default function Services({ data }: { data?: Service[] }) {
  const services = data?.length ? data : defaultServices;
  const [zoomedQR, setZoomedQR] = useState<{
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    link?: string;
    linkText?: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomedQR(null);
      }
    };
    if (zoomedQR) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [zoomedQR]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Authentic staggered cascading 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <motion.section 
      style={{ background: "var(--bg)" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {services.map((service, i) => (
        <motion.div
          key={service._id}
          variants={itemVariants}
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "5rem 0",
          }}
        >
          <div className="inner-max" style={{ maxWidth: "88rem" }}>
            <div
              className="service-row-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "5.5rem 1fr",
                gap: "3rem",
                alignItems: "start",
              }}
            >
              {/* Large number */}
              <div
                className="font-cinzel"
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                  paddingTop: "0.625rem",
                }}
              >
                {numberToRoman(i + 1)}
              </div>

              {/* Content */}
              <div>
                {/* Title row */}
                <div
                  className="service-title-row"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "2rem",
                    paddingBottom: "2rem",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <h2
                    className="font-serif"
                    style={{
                      fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                      color: "var(--text-heading)",
                      lineHeight: 1.0,
                    }}
                  >
                    {service.title}
                  </h2>
                  <div className="service-meta" style={{ textAlign: "right", flexShrink: 0 }}>
                    {service.price && (
                      <div
                        className="font-cinzel"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--accent)",
                          letterSpacing: "0.08em",
                          fontWeight: 600,
                        }}
                      >
                        {service.price}
                      </div>
                    )}
                    {service.duration && (
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.6875rem",
                          color: "var(--text-muted)",
                          letterSpacing: "0.12em",
                          marginTop: "0.25rem",
                        }}
                      >
                        {service.duration}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description + features side by side (and QR column for Counsel / Dialogue) */}
                <div
                  className="service-body-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: (
                      (i === 0 || service.title?.toLowerCase().includes("counsel")) ||
                      (i === 1 || service.title?.toLowerCase().includes("dialogue") || service.title?.toLowerCase().includes("facilitation"))
                    ) ? "1.2fr 1fr auto" : "1fr 1fr",
                    gap: (
                      (i === 0 || service.title?.toLowerCase().includes("counsel")) ||
                      (i === 1 || service.title?.toLowerCase().includes("dialogue") || service.title?.toLowerCase().includes("facilitation"))
                    ) ? "2.5rem" : "4rem",
                    alignItems: "start",
                    marginBottom: "2.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.9,
                      fontSize: "1rem",
                    }}
                  >
                    {service.description}
                  </p>

                  {service.features && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {service.features.map((f, fi) => (
                        <li
                          key={fi}
                          style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "0.875rem",
                            color: "var(--text)",
                            paddingBottom: "0.75rem",
                            marginBottom: "0.75rem",
                            borderBottom: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.875rem",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "var(--sage)",
                              flexShrink: 0,
                            }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Philosophy as Counsel QR Codes */}
                  {(i === 0 || service.title?.toLowerCase().includes("counsel")) && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.875rem",
                        minWidth: "225px",
                      }}
                    >
                      {/* 1. Buy Me a Coffee QR */}
                      <div
                        className="card-hover"
                        onClick={() =>
                          setZoomedQR({
                            src: "/bmc_qr.png",
                            alt: "Buy Me a Coffee QR Code",
                            title: "Buy Me a Coffee",
                            subtitle: "Scan to support or contribute to the philosophical practice.",
                          })
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.875rem",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "0.75rem 0.875rem",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        title="Click to zoom QR code"
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "76px",
                            height: "76px",
                            flexShrink: 0,
                            borderRadius: "6px",
                            overflow: "hidden",
                            border: "1px solid rgba(139, 107, 74, 0.25)",
                            background: "white",
                            padding: "0.3rem",
                          }}
                        >
                          <img
                            src="/bmc_qr.png"
                            alt="Buy Me a Coffee QR Code"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              imageRendering: "pixelated",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4
                            className="font-serif"
                            style={{
                              fontSize: "0.9375rem",
                              color: "var(--text-heading)",
                              marginBottom: "0.2rem",
                              lineHeight: 1.2,
                            }}
                          >
                            Buy Me a Coffee
                          </h4>
                          <span
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.725rem",
                              color: "var(--text-muted)",
                              fontWeight: 300,
                              display: "block",
                            }}
                          >
                            Scan to support
                          </span>
                          <span
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.65rem",
                              color: "var(--accent)",
                              fontWeight: 500,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.2rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            🔍 Click to zoom
                          </span>
                        </div>
                      </div>

                      {/* 2. PayPal QR */}
                      <div
                        className="card-hover"
                        onClick={() =>
                          setZoomedQR({
                            src: "/paypal_qr.png",
                            alt: "PayPal QR Code",
                            title: "PayPal Payment",
                            subtitle: "Scan with your phone camera or PayPal app for card and international payments.",
                          })
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.875rem",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "0.75rem 0.875rem",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        title="Click to zoom QR code"
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "76px",
                            height: "76px",
                            flexShrink: 0,
                            borderRadius: "6px",
                            overflow: "hidden",
                            border: "1px solid rgba(139, 107, 74, 0.25)",
                            background: "white",
                            padding: "0.3rem",
                          }}
                        >
                          <img
                            src="/paypal_qr.png"
                            alt="PayPal QR Code"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              imageRendering: "pixelated",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4
                            className="font-serif"
                            style={{
                              fontSize: "0.9375rem",
                              color: "var(--text-heading)",
                              marginBottom: "0.2rem",
                              lineHeight: 1.2,
                            }}
                          >
                            PayPal Payment
                          </h4>
                          <span
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.725rem",
                              color: "var(--text-muted)",
                              fontWeight: 300,
                              display: "block",
                            }}
                          >
                            Scan to pay
                          </span>
                          <span
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.65rem",
                              color: "var(--accent)",
                              fontWeight: 500,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.2rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            🔍 Click to zoom
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dialogue Facilitation QR Code (Tug of Logic) */}
                  {(i === 1 || service.title?.toLowerCase().includes("dialogue") || service.title?.toLowerCase().includes("facilitation")) && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.875rem",
                        minWidth: "225px",
                      }}
                    >
                      <div
                        className="card-hover"
                        onClick={() =>
                          setZoomedQR({
                            src: "/qrcode_www.tug-of-logic.com.png",
                            alt: "Tug of Logic QR Code",
                            title: "Tug of Logic",
                            subtitle: "Play Philosophy Sports — competitive yet collaborative philosophical inquiry.",
                            link: "https://www.tug-of-logic.com",
                            linkText: "Visit tug-of-logic.com ↗",
                          })
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.875rem",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "0.75rem 0.875rem",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        title="Click to zoom QR code"
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "76px",
                            height: "76px",
                            flexShrink: 0,
                            borderRadius: "6px",
                            overflow: "hidden",
                            border: "1px solid rgba(139, 107, 74, 0.25)",
                            background: "white",
                            padding: "0.3rem",
                          }}
                        >
                          <img
                            src="/qrcode_www.tug-of-logic.com.png"
                            alt="Tug of Logic QR Code"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              imageRendering: "pixelated",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4
                            className="font-serif"
                            style={{
                              fontSize: "0.9375rem",
                              color: "var(--text-heading)",
                              marginBottom: "0.2rem",
                              lineHeight: 1.2,
                            }}
                          >
                            Tug of Logic
                          </h4>
                          <span
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.725rem",
                              color: "var(--text-muted)",
                              fontWeight: 300,
                              display: "block",
                              lineHeight: 1.3,
                            }}
                          >
                            Play Philosophy Sports
                          </span>
                          <span
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.65rem",
                              color: "var(--accent)",
                              fontWeight: 500,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.2rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            🔍 Click to zoom
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {service.showWhatToExpect !== false && service.whatToExpect && service.whatToExpect.length > 0 && (
                  <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                    <div className="text-left mb-10">
                      <span className="section-label" style={{ marginBottom: "1rem", display: "block" }}>Process</span>
                      <h3 className="font-serif" style={{ fontSize: "2rem", color: "var(--text-heading)" }}>
                        What to Expect
                      </h3>
                      <div className="divider-gold" style={{ marginLeft: 0 }} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {service.whatToExpect.map((item: any) => (
                        <div
                          key={item.n}
                          className="card-hover"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            padding: "2rem",
                          }}
                        >
                          <div
                            className="font-cinzel font-bold mb-3"
                            style={{ fontSize: "0.8125rem", color: "var(--accent)", letterSpacing: "0.2em" }}
                          >
                            {item.n}
                          </div>
                          <h4
                            className="font-serif mb-3"
                            style={{ fontSize: "1.25rem", color: "var(--text-heading)" }}
                          >
                            {item.title}
                          </h4>
                          <p
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontWeight: 300,
                              color: "var(--text-muted)",
                              lineHeight: 1.7,
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <a
                  href={service.ctaLink || "/contact"}
                  target={service.ctaLink?.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={service.featured ? "btn-primary" : "btn-ghost"}
                >
                  <span>{service.ctaText || "Learn More"}</span>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Lightbox / Zoomed QR Code Modal */}
      <AnimatePresence>
        {zoomedQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setZoomedQR(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(18, 14, 10, 0.78)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "420px",
                width: "100%",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "2.25rem 2rem 1.75rem 2rem",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
                textAlign: "center",
              }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setZoomedQR(null)}
                aria-label="Close zoomed QR"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                ✕
              </button>

              {/* Big High-Res QR Code Display */}
              <div
                style={{
                  position: "relative",
                  width: "250px",
                  height: "250px",
                  margin: "0.5rem auto 1.5rem auto",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid rgba(139, 107, 74, 0.35)",
                  background: "white",
                  padding: "0.85rem",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src={zoomedQR.src}
                  alt={zoomedQR.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    imageRendering: "pixelated",
                  }}
                />
              </div>

              {/* Title */}
              <h3
                className="font-serif"
                style={{
                  fontSize: "1.5rem",
                  color: "var(--text-heading)",
                  marginBottom: "0.4rem",
                }}
              >
                {zoomedQR.title}
              </h3>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  marginBottom: zoomedQR.link ? "1.25rem" : "0.5rem",
                  fontWeight: 300,
                }}
              >
                {zoomedQR.subtitle}
              </p>

              {/* Optional Link button */}
              {zoomedQR.link && (
                <a
                  href={zoomedQR.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    width: "100%",
                    padding: "0.75rem 1.25rem",
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {zoomedQR.linkText || "Open Link Directly ↗"}
                </a>
              )}

              <div
                style={{
                  marginTop: "1rem",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.725rem",
                  color: "var(--text-muted)",
                  opacity: 0.75,
                }}
              >
                Press Escape or tap outside to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
