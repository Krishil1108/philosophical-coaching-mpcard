"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { urlFor } from "../lib/sanity";
import { PhilPeoplePublications } from "./PhilPeopleWidgets";

interface PublicationEdition {
  _key?: string;
  language?: string;
  label?: string;
  coverImage?: object;
  viewLink?: string;
  buyLink?: string;
}

interface Publication {
  _id: string;
  title: string;
  subtitle?: string;
  year?: number;
  publisher?: string;
  coverImage?: object;
  description?: string;
  viewLink?: string;
  buyLink?: string;
  editions?: PublicationEdition[];
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
    viewLink: "#",
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
    viewLink: "#",
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
    viewLink: "#",
    buyLink: "#",
  },
];

const languageTitles: Record<string, string> = {
  english: "English",
  german: "German",
  spanish: "Spanish",
  french: "French",
  italian: "Italian",
  portuguese: "Portuguese",
  other: "Other",
};

function editionLabel(edition: PublicationEdition) {
  if (edition.label) return edition.label;
  if (edition.language && languageTitles[edition.language]) return languageTitles[edition.language];
  if (edition.language) return edition.language;
  return "Edition";
}

function PublicationRow({ pub, index }: { pub: Publication; index: number }) {
  const editions = pub.editions || [];
  const defaultEditionKey = editions[0]?._key || "default";
  const [selectedEditionKey, setSelectedEditionKey] = useState(defaultEditionKey);

  const selectedEdition = useMemo(() => {
    if (!editions.length) return null;
    return editions.find((edition) => (edition._key || "") === selectedEditionKey) || editions[0];
  }, [editions, selectedEditionKey]);

  const activeCoverImage = selectedEdition?.coverImage || pub.coverImage;
  const activeViewLink = selectedEdition?.viewLink || pub.viewLink;
  const activeBuyLink = selectedEdition?.buyLink || pub.buyLink;

  return (
    <motion.div
      key={pub._id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
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
          <div
            className="font-cinzel"
            style={{
              fontSize: "0.875rem",
              color: "var(--accent)",
              letterSpacing: "0.2em",
              paddingTop: "0.5rem",
            }}
          >
            0{index + 1}
          </div>

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
            {activeCoverImage ? (
              <Image
                src={urlFor(activeCoverImage).width(360).height(480).url()}
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
                marginBottom: "1rem",
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

            {editions.length > 0 && (
              <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <label
                  htmlFor={`edition-${pub._id}`}
                  className="font-cinzel"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Language
                </label>
                <select
                  id={`edition-${pub._id}`}
                  value={selectedEditionKey}
                  onChange={(event) => setSelectedEditionKey(event.target.value)}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "999px",
                    background: "var(--bg)",
                    color: "var(--text-heading)",
                    padding: "0.4rem 0.9rem",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.75rem",
                    minWidth: "11rem",
                  }}
                >
                  {editions.map((edition, idx) => {
                    const key = edition._key || `edition-${idx}`;
                    return (
                      <option key={key} value={key}>
                        {editionLabel(edition)}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

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

          <div style={{ paddingTop: "0.5rem", flexShrink: 0, display: "flex", gap: "0.75rem", alignItems: "center" }}>
            {activeViewLink && activeViewLink !== "#" ? (
              <a href={activeViewLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                View
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ) : null}

            {activeBuyLink && activeBuyLink !== "#" ? (
              <a href={activeBuyLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Buy
              </a>
            ) : null}

            {!activeViewLink && !activeBuyLink && (
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
  );
}

export default function Publications({ data }: { data?: Publication[] }) {
  const publications = data?.length ? data : defaultPublications;

  return (
    <section style={{ background: "var(--bg)" }}>
      {publications.map((pub, i) => (
        <PublicationRow key={pub._id} pub={pub} index={i} />
      ))}

      {/* Forthcoming note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: "3rem 0", borderBottom: "1px solid var(--border)" }}
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

      {/* ─── PHILOSOPHICAL FOUNDATIONS ─────────────────── */}
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
              textAlign: "center",
            }}
          >
            Philosophical Practice — Foundational Principles
          </div>
          <blockquote
            className="font-italic"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              color: "var(--text-heading)",
              fontStyle: "italic",
              lineHeight: 1.2,
              maxWidth: "72rem",
              marginBottom: "2.5rem",
              textAlign: "center",
              margin: "0 auto 2.5rem",
            }}
          >
            "Philosophical practice must calibrate itself to the themes, problems and question-formulations that burden others, those who in their need have turned to philosophy for help."
          </blockquote>
          <cite
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontStyle: "normal",
              textAlign: "right",
              display: "block",
              width: "100%",
            }}
          >
            — Gerd B. Achenbach, <em>Philosophical Praxis</em> (Bloomsbury, 2024)
          </cite>
        </div>
      </motion.div>

      {/* ─── PHILPEOPLE PUBLICATIONS WIDGET ─────────────────── */}
      <PhilPeoplePublications />
    </section>
  );
}
