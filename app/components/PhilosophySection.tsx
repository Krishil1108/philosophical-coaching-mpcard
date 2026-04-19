"use client";

import { motion } from "framer-motion";

export default function PhilosophySection() {
  const methods = [
    {
      num: "I",
      name: "Questionless Inquiry",
      short: "Philosophy also listens.",
      body: "Tell Michael your story. He will respect you by not promising solutions. You can talk with him about the answerless, the unquestioned, and the unquestionable. Michael will not question your questions or dismiss your answers. But expect to be respectfully challenged in thought.",
    },
    {
      num: "II", 
      name: "Approximately-Socratic Inquiry",
      short: "Socrates is dead and he's not coming back.",
      body: "Arguably he proffers no definite replicable method. Michael does not pretend to offer an imitation. Socrates could listen and think ahead. Michael will hear you out, and think alongside. Irony is not a method. Michael says: \"I don't pretend to know the answers to your problems, or that the answers I know pertain to your problems. I promise open ears for the time it takes for you to say what you need. And I will engage you. But I don't know what I will say. Yet, I won't say what I can't know, except to mention it. Still, if I never say what I don't know, I would forever remain silent. Come, let's talk. Risk your time.\"",
    },
    {
      num: "III",
      name: "Thoughtless Belief",
      short: "Our deepest convictions are often laziest.",
      body: "Resting on unexamined metaphors— what Michael calls 'zombie metaphors'. By examining the specific usages of words that describe our intentions, beliefs and actions, the invisible architecture beneath thought is laid bare. This foundation may be built upon or rebuilt through thoughtful belief. Every belief lives in language, and many die there. The examined life is in large measure an examination of what we say or would say about what we do or would do; and what is related to that. But life rarely offers opportunities for examination. Michael can help with that.",
    },
  ];

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
                There is no agenda but truth that is the property of no one. "Philosophy goes second." — Marc Sautet (1947-1998)
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
                {["Socratic method", "Semantic analysis", "Independent thinking"].map((t) => (
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
            Approach
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
            Philosophy is cohabitation — actively generating and inhabiting questions with greater clarity, purpose, and freedom.
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
            — The Practice
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
