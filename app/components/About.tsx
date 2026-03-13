"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "../lib/sanity";

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
  "Michael Picard is a philosopher, author, and Socratic practitioner based in British Columbia, Canada. Educated at MIT, he has spent over two decades exploring philosophy as a living discipline — not merely an academic exercise.",
  "As the founder of Café Philosophy in Victoria, BC (weekly sessions running for 12 years), and Faculty at Douglas College, Michael brings rigorous philosophical inquiry into accessible conversation. His work focuses on examining the language behind our beliefs, probing the reasoning we rarely question, and helping individuals think more independently.",
  "His approach is neither therapeutic nor didactic. He acts as an impartial witness — using semantic analysis and Socratic questioning to reveal the hidden assumptions that shape how we see the world.",
];

export default function About({ data }: { data?: AboutData }) {
  const bio = data?.bio
    ? data.bio.map((b) => b.children?.map((c) => c.text).join("")).filter(Boolean)
    : defaultBio;

  const credentials = data?.credentials?.length
    ? data.credentials
    : ["PhD, Philosophy — MIT", "MSc — MIT", "Faculty, Douglas College", "Founder, Café Philosophy Victoria BC", "Creator, Philosophy Sports", "Author of 'How to Play Philosophy'"];

  return (
    <section style={{ background: "#0d0f14" }}>

      {/* ─── OPENING STATEMENT ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          padding: "5rem 0 5rem",
        }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
            <div />
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "white",
                lineHeight: 1.35,
                maxWidth: "44rem",
              }}
            >
              A philosopher who teaches at Douglas College, facilitates public dialogue, and practices Socratic inquiry one-on-one — bridging academic rigour and lived philosophy.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── MAIN SPLIT LAYOUT ─────────────────── */}
      <div style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div
          className="inner-max"
          style={{
            maxWidth: "88rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
          }}
        >
          {/* Left: Portrait column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              borderRight: "1px solid rgba(201,168,76,0.1)",
              padding: "5rem 4rem 5rem 0",
            }}
          >
            {/* Portrait */}
            <div
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                background: "#141720",
                marginBottom: "3rem",
                overflow: "hidden",
              }}
            >
              {data?.portrait ? (
                <Image
                  src={urlFor(data.portrait).width(600).height(800).url()}
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
                    background: "#141720",
                  }}
                >
                  <div
                    className="font-cinzel"
                    style={{ fontSize: "8rem", color: "rgba(201,168,76,0.1)", lineHeight: 1 }}
                  >
                    φ
                  </div>
                  <p
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.6875rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginTop: "1rem",
                    }}
                  >
                    Add portrait in Sanity Studio
                  </p>
                </div>
              )}
              {/* Gold accent line at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, var(--gold), transparent)",
                }}
              />
            </div>

            {/* Credentials as stacked list */}
            <div>
              <div
                className="section-label"
                style={{ marginBottom: "1.5rem" }}
              >
                Background
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {credentials.map((cred, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--gold)",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.1em",
                        flexShrink: 0,
                        paddingTop: "0.2rem",
                      }}
                    >
                      ✦
                    </span>
                    {cred}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + quote column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ padding: "5rem 0 5rem 4rem" }}
          >
            {/* Inline stats */}
            <div
              style={{
                display: "flex",
                gap: "3rem",
                flexWrap: "wrap",
                marginBottom: "3.5rem",
                paddingBottom: "3.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                { v: "700+", l: "Café Sessions" },
                { v: "12", l: "Years Practice" },
                { v: "2+", l: "Books Authored" },
                { v: "PhD", l: "Philosophy, MIT" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="font-cinzel font-bold"
                    style={{ fontSize: "2rem", color: "var(--gold)", letterSpacing: "0.04em" }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.5625rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3.5rem" }}>
              {bio.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: i === 0 ? 400 : 300,
                    color: i === 0 ? "var(--text)" : "var(--text-muted)",
                    lineHeight: 1.9,
                    fontSize: "1rem",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Philosophy quote */}
            <div
              style={{
                paddingLeft: "2rem",
                borderLeft: "2px solid var(--gold)",
              }}
            >
              <blockquote
                className="font-italic"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: "var(--text)",
                  fontStyle: "italic",
                  lineHeight: 1.55,
                  marginBottom: "1rem",
                }}
              >
                &ldquo;{data?.philosophyQuote || "Philosophy is not about having the right answers — it's about learning to ask better questions."}&rdquo;
              </blockquote>
              <cite
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontStyle: "normal",
                }}
              >
                — {data?.quoteAttribution || "Michael Picard"}
              </cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
