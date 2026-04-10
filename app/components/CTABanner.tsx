"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-36 relative overflow-hidden" style={{ background: "var(--bg-muted)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(139, 107, 74, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="inner-max relative text-center" style={{ maxWidth: "52rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="font-serif mb-4"
            style={{ fontSize: "6rem", color: "rgba(139, 107, 74, 0.12)", lineHeight: 1 }}
          >
            φ
          </div>

          <span
            className="section-label"
            style={{ marginBottom: "1.5rem", display: "block" }}
          >
            Begin Now
          </span>

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              color: "var(--text-heading)",
              lineHeight: 1.0,
              marginBottom: "0.5rem",
            }}
          >
            Ready to Think{" "}
          </h2>
          <h2
            className="font-serif text-accent-gradient"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              lineHeight: 1.0,
              marginBottom: "2.5rem",
              display: "block",
            }}
          >
            Differently?
          </h2>

          <div className="divider-gold" style={{ marginBottom: "2.5rem" }} />

          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 300,
              color: "var(--text-muted)",
              lineHeight: 1.9,
              fontSize: "1rem",
              maxWidth: "36rem",
              margin: "0 auto 3rem",
            }}
          >
            Begin your philosophical journey with a one-on-one session. No experience
            required — only a genuine desire to question, reflect, and discover.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-session"
              className="btn-primary"
            >
              <span>Book a Session</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-outline">
              All Contact Options
            </Link>
          </div>

          {/* Trust line */}
          <div
            className="flex flex-wrap justify-center gap-8 mt-12"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {["PhD, MIT", "700+ sessions", "12 years practice", "No worldview imposed"].map((t) => (
              <span key={t}>
                <span style={{ color: "var(--sage)", marginRight: "0.4rem" }}>✓</span>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
