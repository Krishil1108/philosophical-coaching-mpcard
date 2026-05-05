"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { PhilPeopleFollowButton } from "./PhilPeopleWidgets";

interface AboutData {
  name?: string;
  portrait?: object;
  bio?: Array<{ children: Array<{ text: string }> }>;
  credentials?: string[];
  philosophyQuote?: string;
  quoteAttribution?: string;
  yearsExperience?: number;
  sessionsHosted?: string;
  affiliation?: string;
}

const defaultBio = [
  "Michael Picard is a philosopher, author, and neo-socratic practitioner based in British Columbia, Canada. Educated at MIT, he has spent over two decades exploring philosophy as a living discipline — not merely an academic exercise.",
  "As the founder of Café Philosophy in Victoria, BC (weekly sessions running for 12 years), and Faculty at Douglas College, Michael brings rigorous philosophical inquiry into accessible conversation. His work focuses on examining the language behind our beliefs, probing the reasoning we rarely question, and helping individuals think more independently.",
  "His approach is neither therapeutic nor didactic. He acts as an impartial witness — using semantic analysis and neo-socratic questioning to reveal the hidden assumptions that shape how we see the world.",
];

export default function About({ data }: { data?: AboutData }) {
  const bio = data?.bio
    ? data.bio.map((b) => b.children?.map((c) => c.text).join("")).filter(Boolean)
    : defaultBio;

  const credentials = data?.credentials?.length
    ? data.credentials
    : ["PhD, Philosophy — MIT", "MSc — MIT", "Faculty, Douglas College", "Founder, Café Philosophy Victoria BC", "Creator, Philosophy Sports", "Author of 'How to Play Philosophy'"];

  return (
    <section style={{ background: "var(--bg)" }}>

      {/* ─── OPENING STATEMENT ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "5rem 0 5rem",
        }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div className="about-opening-grid" style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
            <div />
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "var(--text-heading)",
                lineHeight: 1.35,
                maxWidth: "44rem",
              }}
            >
              A philosopher who teaches at Douglas College, facilitates public dialogue, and practices neo-socratic inquiry one-on-one — bridging academic rigour and lived philosophy.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── MAIN COMPOSITION ─────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="inner-max" style={{ maxWidth: "88rem", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <motion.figure
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ margin: 0 }}
            >
              <div
                suppressHydrationWarning
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "23rem",
                  height: "34rem",
                  overflow: "hidden",
                  borderRadius: "14px",
                  border: "1px solid rgba(139, 107, 74, 0.25)",
                  background: "var(--bg-card)",
                  boxShadow: "0 20px 46px rgba(72, 58, 41, 0.16)",
                }}
              >
                {data?.portrait ? (
                  <Image
                    src={urlFor(data.portrait).width(920).height(1360).url()}
                    alt={data.name || "Michael Picard"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(140deg, rgba(139, 107, 74, 0.12), rgba(163, 176, 148, 0.1))",
                    }}
                  >
                    <div className="font-cinzel" style={{ fontSize: "5rem", color: "rgba(139, 107, 74, 0.2)", lineHeight: 1 }}>
                      φ
                    </div>
                    <p
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.62rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        marginTop: "0.9rem",
                      }}
                    >
                      Add portrait in Sanity Studio
                    </p>
                  </div>
                )}
              </div>
              <figcaption
                style={{
                  marginTop: "0.75rem",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.56rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {data?.name || "Michael Picard"} • BC, Canada
              </figcaption>
            </motion.figure>

            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "1rem",
                }}
              >
                Living Philosophy
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  lineHeight: 1.08,
                  color: "var(--text-heading)",
                  marginBottom: "1.15rem",
                  maxWidth: "52rem",
                }}
              >
                A Working Biography
              </h2>

              <p
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontSize: "clamp(1.2rem, 2.25vw, 1.65rem)",
                  lineHeight: 1.45,
                  color: "var(--text-heading)",
                  marginBottom: "1.35rem",
                  maxWidth: "50rem",
                }}
              >
                {bio[0]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ marginBottom: "1.4rem", maxWidth: "43rem" }}>
                {[
                  { label: "Experience", value: `${data?.yearsExperience || 20}+ years` },
                  { label: "Sessions", value: data?.sessionsHosted || "700+ dialogues" },
                  { label: "Affiliation", value: data?.affiliation || "Douglas College" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "0.72rem 0.78rem",
                      background: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.53rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        marginBottom: "0.28rem",
                      }}
                    >
                      {item.label}
                    </div>
                    <div className="font-cinzel" style={{ fontSize: "0.74rem", letterSpacing: "0.08em", color: "var(--text-heading)" }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "1.5rem" }}>
                {bio.slice(1).map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 400,
                      color: "var(--text-muted)",
                      fontSize: "1.01rem",
                      lineHeight: 1.88,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(139, 107, 74, 0.24)",
                  paddingTop: "1rem",
                  maxWidth: "46rem",
                }}
              >
                <blockquote
                  className="font-italic"
                  style={{
                    fontSize: "clamp(1.12rem, 1.9vw, 1.45rem)",
                    color: "var(--text-heading)",
                    fontStyle: "italic",
                    lineHeight: 1.52,
                    marginBottom: "0.68rem",
                  }}
                >
                  &ldquo;{data?.philosophyQuote || "Philosophy is not about having the right answers — it's about learning to ask better questions."}&rdquo;
                </blockquote>
                <cite
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.56rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    fontStyle: "normal",
                  }}
                >
                  — {data?.quoteAttribution || "Michael Picard"}
                </cite>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── FULL-WIDTH CREDENTIALS SECTION ─────────────────── */}
      <div style={{ 
        background: "linear-gradient(135deg, var(--bg-muted) 0%, var(--bg) 50%, var(--bg-card) 100%)", 
        padding: "5rem 0",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background decoration */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="font-cinzel"
          style={{
            position: "absolute",
            left: "-10rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "25rem",
            color: "rgba(139, 107, 74, 0.03)",
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          φ
        </motion.div>

        <div className="inner-max" style={{ maxWidth: "88rem", position: "relative", zIndex: 1 }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem"
              }}
            >
              <span style={{ width: "3rem", height: "1px", background: "var(--accent)" }} />
              Academic Journey
              <span style={{ width: "3rem", height: "1px", background: "var(--accent)" }} />
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--text-heading)",
                lineHeight: 1.2,
                maxWidth: "48rem",
                margin: "0 auto"
              }}
            >
              Two Decades of Philosophical Practice
            </h2>
          </motion.div>

          {/* Dynamic Grid Layout */}
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem"
          }}>
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                background: "var(--bg)",
                padding: "2.5rem",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, var(--accent) 0%, var(--sage) 100%)"
              }} />
              
              <div style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                background: "var(--accent)",
                borderRadius: "50%",
                margin: "0 auto 1.5rem",
                color: "white"
              }}>
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zm0 2.18L18.18 9 12 12.82 5.82 9 12 5.18zM17 15.09l-5 2.73-5-2.73v-3.27l5 2.73 5-2.73v3.27z"/>
                </svg>
              </div>
              
              <h3 style={{
                fontFamily: "DM Serif Display, serif",
                fontSize: "1.5rem",
                color: "var(--text-heading)",
                textAlign: "center",
                marginBottom: "2rem"
              }}>Education</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "var(--text-heading)",
                    marginBottom: "0.5rem"
                  }}>PhD, Philosophy</div>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontSize: "1rem",
                    color: "var(--accent)",
                    fontWeight: 500
                  }}>Massachusetts Institute of Technology</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "var(--text-heading)",
                    marginBottom: "0.5rem"
                  }}>MSc</div>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontSize: "1rem",
                    color: "var(--accent)",
                    fontWeight: 500
                  }}>Massachusetts Institute of Technology</div>
                </div>
              </div>
            </motion.div>

            {/* Teaching Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                background: "var(--bg)",
                padding: "2.5rem",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, var(--sage) 0%, var(--accent) 100%)"
              }} />
              
              <div style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                background: "var(--sage)",
                borderRadius: "50%",
                margin: "0 auto 1.5rem",
                color: "white"
              }}>
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
              </div>
              
              <h3 style={{
                fontFamily: "DM Serif Display, serif",
                fontSize: "1.5rem",
                color: "var(--text-heading)",
                textAlign: "center",
                marginBottom: "2rem"
              }}>Teaching</h3>
              
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  fontFamily: "Space Grotesk, sans-serif", 
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  color: "var(--text-heading)",
                  marginBottom: "0.5rem"
                }}>Faculty</div>
                <div style={{ 
                  fontFamily: "Space Grotesk, sans-serif", 
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  marginBottom: "1.5rem"
                }}>Douglas College</div>
                <div style={{ 
                  fontFamily: "Space Grotesk, sans-serif", 
                  fontSize: "0.875rem",
                  color: "var(--accent)",
                  fontStyle: "italic"
                }}>Bringing philosophy to life in the classroom</div>
              </div>
            </motion.div>

            {/* Innovation Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                background: "var(--bg)",
                padding: "2.5rem",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, var(--accent) 0%, var(--sage) 50%, var(--accent) 100%)"
              }} />
              
              <div style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                background: "linear-gradient(135deg, var(--accent), var(--sage))",
                borderRadius: "50%",
                margin: "0 auto 1.5rem",
                color: "white"
              }}>
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/>
                  <path d="M12 10.5V12h4.5c-.77 2.65-3.16 4.5-6 4.5A6.5 6.5 0 0 1 4 10.5H12z"/>
                </svg>
              </div>
              
              <h3 style={{
                fontFamily: "DM Serif Display, serif",
                fontSize: "1.5rem",
                color: "var(--text-heading)",
                textAlign: "center",
                marginBottom: "2rem"
              }}>Innovation</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--text-heading)",
                    marginBottom: "0.25rem"
                  }}>Founder</div>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontSize: "0.875rem",
                    color: "var(--text-muted)"
                  }}>Café Philosophy Victoria BC</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--text-heading)",
                    marginBottom: "0.25rem"
                  }}>Creator</div>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontSize: "0.875rem",
                    color: "var(--text-muted)"
                  }}>Philosophy Sports</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--text-heading)",
                    marginBottom: "0.25rem"
                  }}>Author</div>
                  <div style={{ 
                    fontFamily: "Space Grotesk, sans-serif", 
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    fontStyle: "italic"
                  }}>'How to Play Philosophy'</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ─── PHILOSOPHY AS LIBERATION ─────────────────── */}
      <section className="section-pad-lg" style={{ background: "var(--bg)" }}>
        <div className="inner-max" style={{ maxWidth: "72rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Why It Works</span>
              <h2 className="font-serif mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text-heading)" }}>
                Philosophy as Liberation
              </h2>
              <div className="divider-gold-left" />
              {[
                "Most of what we believe, we believe because we absorbed it — from culture, family, media, and social contagion. Very little of our thinking is genuinely our own.",
                "Michael calls these inherited structures 'zombie metaphors' — figurative language that moves us without our awareness. He helps you see them, name them, and choose what to do with them.",
                "The result is not a new worldview imposed from outside, but a more honest, more flexible relationship with your own mind.",
              ].map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 300,
                    color: i === 0 ? "var(--text)" : "var(--text-muted)",
                    lineHeight: 1.9,
                    fontSize: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              {[
                { symbol: "∮", term: "Examine Inherited Thinking", definition: "Question what you've absorbed from culture, family, and media without conscious choice." },
                { symbol: "§", term: "Identify Zombie Metaphors", definition: "See the figurative language that moves you without your awareness and decide what to do with it." },
                { symbol: "◎", term: "Develop Mental Freedom", definition: "Build a more honest, flexible relationship with your own mind and thinking patterns." },
              ].map((item) => (
                <div
                  key={item.term}
                  className="card-hover"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "2.25rem",
                  }}
                >
                  <div
                    className="font-serif mb-3"
                    style={{ fontSize: "2.25rem", color: "rgba(139, 107, 74, 0.3)", lineHeight: 1 }}
                  >
                    {item.symbol}
                  </div>
                  <h3
                    className="font-serif mb-3"
                    style={{ fontSize: "1.25rem", color: "var(--text-heading)" }}
                  >
                    {item.term}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILPEOPLE FOLLOW BUTTON ─────────────────── */}
      <PhilPeopleFollowButton />
    </section>
  );
}
