"use client";

import { motion } from "framer-motion";
import { defaultPracticePageData, type PracticePageData } from "../lib/practiceContent";

interface PhilosophySectionProps {
  data?: PracticePageData | null;
}

export default function PhilosophySection({ data }: PhilosophySectionProps) {
  const practiceData = data ?? defaultPracticePageData;
  const methods = practiceData.methods?.length ? practiceData.methods : defaultPracticePageData.methods;

  return (
    <section style={{ background: "var(--bg)" }}>

      {/* ─── OPENING STATEMENT ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "6rem 0",
          overflow: "hidden",
        }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div className="practice-opening-grid" style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
            <div />
            <div>
              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                  color: "var(--text-heading)",
                  lineHeight: 1.3,
                  maxWidth: "48rem",
                  marginBottom: "3rem",
                }}
              >
                {practiceData.openingStatement}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "3rem",
                  flexWrap: "wrap",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {practiceData.openingTags.map((t) => (
                  <span key={t}>
                    <span style={{ color: "var(--accent)", marginRight: "0.5rem" }}>—</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── LARGE PULL QUOTE ───────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "7rem 0",
          background: "var(--bg-muted)",
        }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div
            className="font-cinzel"
            style={{
              fontSize: "0.625rem",
              color: "var(--accent)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "3rem",
            }}
          >
            {practiceData.approachLabel}
          </div>
          <blockquote
            className="font-italic"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              color: "var(--text-heading)",
              fontStyle: "italic",
              lineHeight: 1.2,
              maxWidth: "72rem",
              marginBottom: "2.5rem",
            }}
          >
            {practiceData.approachQuote}
          </blockquote>
          <cite
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontStyle: "normal",
            }}
          >
            {practiceData.approachCite}
          </cite>
        </div>
      </motion.div>

      {/* ─── THREE METHODS ──────────────────────── */}
      {methods.map((m, i) => (
        <motion.div
          key={m.num}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "4.5rem 0",
          }}
        >
          <div className="inner-max" style={{ maxWidth: "88rem" }}>
            <div
              className="practice-method-row"
              style={{
                display: "grid",
                gridTemplateColumns: "5.5rem 14rem 1fr",
                gap: "3rem",
                alignItems: "start",
              }}
            >
              {/* Roman numeral */}
              <div
                className="font-cinzel"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.15em",
                  paddingTop: "0.5rem",
                }}
              >
                {m.num}
              </div>

              {/* Name + short */}
              <div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                    color: "var(--text-heading)",
                    lineHeight: 1.1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {m.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--sage)",
                    letterSpacing: "0.08em",
                    fontWeight: 500,
                  }}
                >
                  {m.short}
                </p>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  lineHeight: 1.9,
                  fontSize: "1rem",
                  maxWidth: "42rem",
                }}
              >
                {m.body}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
