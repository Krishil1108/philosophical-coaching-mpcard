"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroData {
  headline?: string;
  subheadline?: string;
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  backgroundImage?: { asset: { url: string } };
  quote?: string;
  quoteAuthor?: string;
}

export default function Hero({ data }: { data?: HeroData }) {
  const headline = data?.headline || "Thinking\nwith Care...";
  const subheadline =
    data?.subheadline ||
    "Philosophical coaching that examines the language behind your beliefs — revealing hidden options and empowering genuinely independent thought.";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f7f4ef 0%, #faf8f5 50%, #f5f2eb 100%)" }}
    >
      {/* Soft decorative background */}
      <div className="absolute inset-0 z-0">
        {data?.backgroundImage?.asset?.url ? (
          <>
            <Image
              src={data.backgroundImage.asset.url}
              alt="Hero background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(250, 248, 245, 0.75) 0%, rgba(250, 248, 245, 0.5) 50%, rgba(250, 248, 245, 0.95) 100%)",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 25% 50%, rgba(139, 107, 74, 0.05) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(125, 139, 111, 0.06) 0%, transparent 50%)",
            }}
          />
        )}
      </div>

      <div className="relative z-10" style={{ maxWidth: "76rem", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-10"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.625rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          <span className="inline-block w-8 h-px" style={{ background: "var(--accent)" }} />
          PhD (MIT) · Philosophical Practitioner
          <span className="inline-block w-8 h-px" style={{ background: "var(--accent)" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-serif"
          style={{
            fontSize: "clamp(4.5rem, 12vw, 11rem)",
            lineHeight: 0.93,
            color: "var(--text-heading)",
            marginBottom: "3rem",
            whiteSpace: "pre-line",
          }}
        >
          {headline.split("\n").map((line, i) => (
            <span
              key={i}
              className={i === 1 ? "text-accent-gradient" : ""}
              style={{ display: "block" }}
            >
              {line}
            </span>
          ))}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="divider-gold"
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            color: "var(--text-muted)",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            lineHeight: 1.9,
            maxWidth: "38rem",
            margin: "0 auto 3.5rem",
          }}
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={data?.ctaSecondaryLink || "/about"}
            className="btn-outline"
          >
            {data?.ctaSecondary || "Explore My Work"}
          </Link>
        </motion.div>

        {/* Optional quote */}
        {data?.quote && (
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="font-italic mt-20"
            style={{
              maxWidth: "40rem",
              margin: "5rem auto 0",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--text-muted)",
              fontStyle: "italic",
              lineHeight: 1.65,
            }}
          >
            &ldquo;{data.quote}&rdquo;
            {data.quoteAuthor && (
              <cite
                className="block mt-3"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontStyle: "normal",
                }}
              >
                — {data.quoteAuthor}
              </cite>
            )}
          </motion.blockquote>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.5625rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Scroll
        </span>
        <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
      </motion.div>
    </section>
  );
}
