"use client";

import { motion } from "framer-motion";

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
}

const defaultServices: Service[] = [
  {
    _id: "1",
    title: "Philosophy as Counsel",
    description:
      "An intimate philosophical dialogue where we examine the language underlying your deepest beliefs. Through Socratic questioning and semantic analysis, we reveal the hidden structures that shape how you see everything — and open up options you didn't know existed.",
    price: "$60–$100 USD",
    duration: "30 or 60 minutes",
    features: ["Socratic method", "Semantic belief analysis", "No preset worldview", "Live format", "Fully confidential"],
    ctaText: "Book via APPA Chat",
    ctaLink: "https://chat.appa.edu/product/chat-with-michael-picard-msc-phd/",
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

export default function Services({ data }: { data?: Service[] }) {
  const services = data?.length ? data : defaultServices;

  return (
    <section style={{ background: "var(--bg)" }}>
      {services.map((service, i) => (
        <motion.div
          key={service._id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: i * 0.1 }}
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "5rem 0",
          }}
        >
          <div className="inner-max" style={{ maxWidth: "88rem" }}>
            <div
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
                0{i + 1}
              </div>

              {/* Content */}
              <div>
                {/* Title row */}
                <div
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
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
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
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    marginBottom: "2.5rem",
                  }}
                  className="grid-cols-1 md:grid-cols-2"
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
    </section>
  );
}
