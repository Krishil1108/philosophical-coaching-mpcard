import SiteLayout from "./components/SiteLayout";
import Link from "next/link";
import ImageCarousel from "./components/ImageCarousel";
import StatsSection from "./components/StatsSection";
import { hasSanityConfig, client } from "./lib/sanity";
import { heroQuery, galleryQuery } from "./lib/queries";

export const revalidate = 60;

async function getHero() {
  if (!hasSanityConfig()) return null;
  return client.fetch(heroQuery);
}

async function getGalleryData() {
  if (!hasSanityConfig()) return [];
  return client.fetch(galleryQuery);
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
    href: "/gallery",
    title: "Gallery",
    desc: "Sessions · Events · Public Dialogue · The Philosophical Life in Images",
  },
  {
    num: "05",
    href: "/publications",
    title: "Publications",
    desc: "How to Play Philosophy · This is Not a Book · Café Conversations · Forthcoming Translations",
  },
  {
    num: "06",
    href: "/videos",
    title: "Videos",
    desc: "Talks · Demonstrations · Café Philosophy · Philosophy Sports in Action",
  },
];

export default async function Home() {
  const hero = await getHero();
  const galleryData = await getGalleryData();

  const headline = hero?.headline || "Think\nDeeply.";
  const subheadline =
    hero?.subheadline ||
    "One-on-one philosophical coaching that examines the language behind your deepest beliefs — and reveals what you didn't know you were free to think.";

  return (
    <SiteLayout>

      {/* ══════════════════════════════════════════
          HERO — light, warm, elegant
          ══════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(180deg, #faf8f5 0%, #f5f1eb 100%)",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "5rem",
          position: "relative",
          overflow: "visible",
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

        <div className="inner-max" style={{ maxWidth: "88rem", position: "relative", zIndex: 1 }}>

          {/* Headline */}
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(4rem, 11vw, 11rem)",
              lineHeight: 1.1,
              color: "var(--text-heading)",
              marginBottom: "3.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {headline.split("\n").map((line: string, i: number) => (
              <span
                key={i}
                className={i === 1 ? "text-accent-gradient" : ""}
                style={{ display: "block" }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Subheadline + CTA row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "4rem",
              alignItems: "end",
              borderTop: "1px solid var(--border)",
              paddingTop: "2.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 300,
                color: "var(--text-muted)",
                fontSize: "clamp(0.9375rem, 1.75vw, 1.125rem)",
                lineHeight: 1.85,
                maxWidth: "40rem",
              }}
            >
              {subheadline}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flexShrink: 0 }}>
              <a
                href="https://chat.appa.edu/product/chat-with-michael-picard-msc-phd/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Book a Session</span>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link href="/about" className="btn-outline">
                Explore the Practice
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS LINE
          ══════════════════════════════════════════ */}
      <StatsSection />

      {/* ══════════════════════════════════════════
          GALLERY CAROUSEL
          ══════════════════════════════════════════ */}
      <ImageCarousel data={galleryData} />

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
              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                  color: "var(--text-heading)",
                  lineHeight: 1.3,
                  maxWidth: "52rem",
                  marginBottom: "2.5rem",
                }}
              >
                Most of what we believe, we believe because we absorbed it. Very little of our thinking is genuinely our own. That is where philosophy begins.
              </p>
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
      <div style={{ background: "var(--bg-card)" }}>
        {contents.map((item) => (
          <Link
            key={item.num}
            href={item.href}
            className="index-row"
            style={{ display: "block", textDecoration: "none" }}
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
              &ldquo;Thinking is both our greatest limitation and our most powerful form of liberation. The question is: whose thinking is it, really?&rdquo;
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
