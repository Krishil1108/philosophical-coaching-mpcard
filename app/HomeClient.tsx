"use client";

import SiteLayout from "./components/SiteLayout";
import Link from "next/link";
import StatsSection from "./components/StatsSection";
import Typewriter from "./components/Typewriter";
import AboutShowcaseCarousel from "./components/AboutShowcaseCarousel";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HomeClientProps {
  hero?: any;
}

const contents = [
  {
    num: "01",
    href: "/about",
    title: "About",
    desc: "PhD from MIT · Faculty at Douglas College · 12 years of public dialogue · Author of How to Play Philosophy",
  },
  {
    num: "02",
    href: "/services",
    title: "Services",
    desc: "1-on-1 Philosophical Coaching · Café Philosophy · Philosophy Sports",
  },
  {
    num: "03",
    href: "/practice",
    title: "The Practice",
    desc: "Socratic Inquiry · Semantic Analysis · Impartial Witness · No Preset Agenda",
  },
  {
    num: "04",
    href: "/publications",
    title: "Publications",
    desc: "How to Play Philosophy · This is Not a Book · Café Conversations · Forthcoming Translations",
  },
  {
    num: "05",
    href: "/videos",
    title: "Videos",
    desc: "Talks · Demonstrations · Café Philosophy · Philosophy Sports in Action",
  },
];

export default function HomeClient({ 
  hero,
}: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const headline = hero?.headline || "Thinking\nwith Care...";
  const subheadline =
    hero?.subheadline ||
    "Philosophical practice is not philosophy on sale. It is a situational deployment of philosophy for purposes of life. It is not a monopoly. Try it.";

  // Debug: log what we're getting from Sanity
  console.log('Raw headline from Sanity:', JSON.stringify(headline));
  
  // Ensure we have proper line breaks for styling
  // If the headline doesn't have line breaks, split it intelligently
  let processedHeadline = headline;
  if (headline && !headline.includes('\n')) {
    // If it's the expected text, add the line break
    if (headline.toLowerCase().includes('thinking with')) {
      processedHeadline = headline.replace(/thinking\s+with/i, 'Thinking\nwith');
    }
  }
  
  console.log('Processed headline:', JSON.stringify(processedHeadline));

  return (
    <SiteLayout>

      {/* ══════════════════════════════════════════
          HERO — light, warm, elegant
          ══════════════════════════════════════════ */}
      <motion.section
        ref={containerRef}
        style={{
          opacity,
          scale,
          background: "linear-gradient(180deg, #faf8f5 0%, #f5f1eb 100%)",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--accent) 0%, var(--sage) 50%, transparent 100%)",
          }}
        />

        {/* Huge background phi symbol */}
        <div
          className="font-cinzel"
          style={{
            position: "absolute",
            right: "-2rem",
            top: "50%",
            transform: "translateY(-55%)",
            fontSize: "clamp(24rem, 45vw, 55rem)",
            lineHeight: 1,
            color: "rgba(139, 107, 74, 0.04)",
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: 900,
          }}
        >
          φ
        </div>

        <div style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif"
            style={{
              fontSize: "clamp(4rem, 11vw, 11rem)",
              lineHeight: 1.1,
              color: "var(--text-heading)",
              marginBottom: "3.5rem",
              whiteSpace: "pre-line",
              textAlign: "center",
              marginLeft: "0",
              paddingLeft: "0",
            }}
          >
            {processedHeadline.split("\n").map((line: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={i === 1 ? "text-accent-gradient" : ""}
                style={{ display: "block" }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p
              className="font-serif"
              style={{
                fontFamily: "DM Serif Display, Georgia, serif",
                fontWeight: 400,
                color: "var(--text-muted)",
                fontSize: "clamp(0.9375rem, 1.75vw, 1.125rem)",
                lineHeight: 1.85,
                maxWidth: "40rem",
              }}
            >
              {subheadline}
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: "2rem" }}
            >
              <Link href="/about" className="btn-outline">
                Explore the Practice
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════
          STATS LINE
          ══════════════════════════════════════════ */}
      <StatsSection />

      <AboutShowcaseCarousel showcasePhotos={hero?.showcasePhotos || []} />

      {/* ══════════════════════════════════════════
          OPENING STATEMENT
          ══════════════════════════════════════════ */}
      <div
        style={{
          background: "var(--bg)",
          padding: "7rem 0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
            <div />
            <div>
              <Typewriter
                text="Most of what we believe, we believe because we absorbed it. Very little of our thinking is genuinely our own. That is where philosophy begins."
                speed={30}
                className="font-serif"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                  color: "var(--text-heading)",
                  lineHeight: 1.3,
                  maxWidth: "52rem",
                  marginBottom: "2.5rem",
                }}
              />
              <Link href="/practice" className="btn-ghost">
                The Practice
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENTS / INDEX
          ══════════════════════════════════════════ */}
      <div style={{ background: "var(--bg-card)", position: "relative", overflow: "hidden", isolation: "isolate" }}>
        {/* Cubist Art Side Design */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "45%",
            backgroundImage: "url('/side-art.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {/* Subtle overlay to blend with the page */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(250, 248, 245, 0.3) 0%, transparent 25%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Content rows */}
        {contents.map((item) => (
          <Link
            key={item.num}
            href={item.href}
            className="index-row"
            style={{ display: "block", textDecoration: "none", position: "relative", zIndex: 1 }}
          >
            <div
              className="inner-max"
              style={{
                maxWidth: "88rem",
                display: "grid",
                gridTemplateColumns: "5.5rem 1fr auto",
                gap: "3rem",
                alignItems: "center",
                padding: "2.5rem 0",
              }}
            >
              {/* Number */}
              <span
                className="font-cinzel"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                }}
              >
                {item.num}
              </span>

              {/* Title + desc */}
              <div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                    color: "var(--text-heading)",
                    marginBottom: "0.4rem",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </div>
              </div>

              {/* Arrow */}
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="index-row-arrow"
                style={{ color: "var(--border-strong)", flexShrink: 0, transition: "color 0.25s" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          LARGE FEATURED QUOTE
          ══════════════════════════════════════════ */}
      <div
        style={{
          background: "var(--bg-muted)",
          padding: "8rem 0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.5rem",
                color: "var(--accent)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                textAlign: "right",
                alignSelf: "center",
              }}
            >
              How to Play Philosophy
            </div>
            <blockquote
              className="font-italic"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 4rem)",
                color: "var(--text-heading)",
                fontStyle: "italic",
                lineHeight: 1.2,
                maxWidth: "64rem",
              }}
            >
              &ldquo;Philosophy is not a method, theory, or set of answers. It's a way of actively generating and inhabiting questions with greater clarity, purpose, and freedom. To examine an answer is to inhabit a question. Philosophy is cohabitation.&rdquo;
              <cite
                style={{
                  display: "block",
                  marginTop: "2rem",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontStyle: "normal",
                }}
              >
                — Michael Picard
              </cite>
            </blockquote>
          </div>
        </div>
      </div>

    </SiteLayout>
  );
}
