"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "../lib/sanity";

interface Publication {
  _id: string;
  title: string;
  subtitle?: string;
  year?: number;
  publisher?: string;
  coverImage?: object;
  description?: string;
  buyLink?: string;
}

const defaultPublications: Publication[] = [
  {
    _id: "pub1",
    title: "How to Play Philosophy",
    subtitle: "A Practical Guide to Philosophical Inquiry",
    year: 2022,
    publisher: "Independent",
    description:
      "An engaging guide to philosophy as a living practice. Michael Picard invites readers to explore ideas not as abstract puzzles but as tools for living — and for playing — more fully.",
    buyLink: "#",
  },
  {
    _id: "pub2",
    title: "This is Not a Book",
    subtitle: "A Philosophical Experiment",
    year: 2012,
    publisher: "Independent",
    description:
      "A meta-exploration of what a book is, what reading means, and how language shapes reality — structured as the very experiment it describes.",
    buyLink: "#",
  },
  {
    _id: "pub3",
    title: "Café Conversations",
    subtitle: "Democracy and Dialogue in Public Spaces",
    year: 2024,
    publisher: "Rock's Mills Press",
    description:
      "Editor and contributor. Explores how public philosophical dialogue strengthens democratic life and civil discourse in contemporary society.",
    buyLink: "#",
  },
];

export default function Publications({ data }: { data?: Publication[] }) {
  const publications = data?.length ? data : defaultPublications;

  return (
    <section style={{ background: "var(--bg)" }}>
      {publications.map((pub, i) => (
        <motion.div
          key={pub._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          style={{
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="inner-max" style={{ maxWidth: "88rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5.5rem 240px 1fr auto",
                gap: "3.5rem",
                alignItems: "start",
                padding: "4.5rem 0",
              }}
            >
              {/* Number */}
              <div
                className="font-cinzel"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                  paddingTop: "0.5rem",
                }}
              >
                0{i + 1}
              </div>

              {/* Cover image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  background: "var(--bg-card)",
                  overflow: "hidden",
                  flexShrink: 0,
                  borderRadius: "4px",
                }}
              >
                {pub.coverImage ? (
                  <Image
                    src={urlFor(pub.coverImage).width(360).height(480).url()}
                    alt={pub.title}
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
                      padding: "2rem",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1.25rem",
                        fontStyle: "italic",
                        color: "var(--text)",
                        textAlign: "center",
                        lineHeight: 1.3,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {pub.title}
                    </div>
                    {pub.year && (
                      <div
                        className="font-cinzel"
                        style={{ fontSize: "0.625rem", color: "var(--accent)", letterSpacing: "0.2em" }}
                      >
                        {pub.year}
                      </div>
                    )}
                  </div>
                )}
                {/* Accent top edge */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "var(--accent)",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
              </div>

              {/* Text content */}
              <div style={{ paddingTop: "0.25rem" }}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <h2
                    className="font-serif"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                      color: "var(--text-heading)",
                      lineHeight: 1.1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {pub.title}
                  </h2>
                  {pub.subtitle && (
                    <p
                      className="font-italic"
                      style={{
                        fontSize: "1rem",
                        color: "var(--sage)",
                        fontStyle: "italic",
                      }}
                    >
                      {pub.subtitle}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  {pub.year && (
                    <span
                      className="font-cinzel"
                      style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}
                    >
                      {pub.year}
                    </span>
                  )}
                  {pub.publisher && (
                    <span
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {pub.publisher}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 300,
                    color: "var(--text-muted)",
                    lineHeight: 1.85,
                    fontSize: "0.9375rem",
                    maxWidth: "38rem",
                  }}
                >
                  {pub.description}
                </p>
              </div>

              {/* CTA */}
              <div style={{ paddingTop: "0.5rem", flexShrink: 0 }}>
                {pub.buyLink && pub.buyLink !== "#" ? (
                  <a
                    href={pub.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    View
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <span
                    className="font-cinzel"
                    style={{
                      fontSize: "0.5625rem",
                      color: "var(--accent)",
                      opacity: 0.5,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    Coming&nbsp;Soon
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Forthcoming note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: "3rem 0" }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
            <div />
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                fontWeight: 300,
              }}
            >
              <span style={{ color: "var(--accent)" }}>Forthcoming — </span>
              Two translations of Gerd Achenbach&apos;s works on Philosophical Praxis, published by Lexington Books.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
