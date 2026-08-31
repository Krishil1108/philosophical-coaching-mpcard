"use client";

import { motion, Variants } from "framer-motion";

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

                {/* Description + features side by side on larger screens */}
                <div
                  className="service-body-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
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
                    <ul style={{ listStyle: "none", padding: 0 }}>
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
                </div>

                {/* QR Codes for Philosophy as Counsel */}
                {(i === 0 || service.title?.toLowerCase().includes("counsel")) && (
                  <div
                    style={{
                      marginTop: "1.5rem",
                      marginBottom: "3rem",
                      padding: "1.75rem 2rem",
                      background: "rgba(139, 107, 74, 0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  >
                    <div style={{ marginBottom: "1.25rem" }}>
                      <span
                        className="section-label"
                        style={{
                          fontSize: "0.625rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                          display: "block",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Compensation & Support
                      </span>
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: "1.35rem",
                          color: "var(--text-heading)",
                          marginBottom: "0.35rem",
                        }}
                      >
                        Settling Remuneration & Support
                      </h3>
                      <p
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.85rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.6,
                          fontWeight: 300,
                          maxWidth: "40rem",
                        }}
                      >
                        To compensate for individual sessions, public Café events, or to support ongoing dialogue practice, you may use the digital coordinates below.
                      </p>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "1.25rem",
                        maxWidth: "44rem",
                      }}
                    >
                      {/* 1. Buy Me a Coffee QR */}
                      <div
                        className="card-hover"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "1rem 1.25rem",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "84px",
                            height: "84px",
                            flexShrink: 0,
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid rgba(139, 107, 74, 0.25)",
                            background: "white",
                            padding: "0.35rem",
                          }}
                        >
                          <img
                            src="/bmc_qr.png"
                            alt="Buy Me a Coffee QR Code"
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                        <div>
                          <h4
                            className="font-serif"
                            style={{
                              fontSize: "1.05rem",
                              color: "var(--text-heading)",
                              marginBottom: "0.25rem",
                            }}
                          >
                            Buy Me a Coffee
                          </h4>
                          <p
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.775rem",
                              color: "var(--text-muted)",
                              lineHeight: 1.45,
                              fontWeight: 300,
                            }}
                          >
                            Scan to support or contribute via Buy Me a Coffee.
                          </p>
                        </div>
                      </div>

                      {/* 2. PayPal QR */}
                      <div
                        className="card-hover"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "1rem 1.25rem",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "84px",
                            height: "84px",
                            flexShrink: 0,
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid rgba(139, 107, 74, 0.25)",
                            background: "white",
                            padding: "0.35rem",
                          }}
                        >
                          <img
                            src="/paypal_qr.png"
                            alt="PayPal QR Code"
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                        <div>
                          <h4
                            className="font-serif"
                            style={{
                              fontSize: "1.05rem",
                              color: "var(--text-heading)",
                              marginBottom: "0.25rem",
                            }}
                          >
                            PayPal Payment
                          </h4>
                          <p
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.775rem",
                              color: "var(--text-muted)",
                              lineHeight: 1.45,
                              fontWeight: 300,
                            }}
                          >
                            Scan with your PayPal app or phone camera for card and international payments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
    </motion.section>
  );
}
