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
  viewLinks?: PlatformLink[];
  buyLinks?: PlatformLink[];
}

interface PlatformLink {
  label?: string;
  url?: string;
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
  viewLinks?: PlatformLink[];
  buyLinks?: PlatformLink[];
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

function getPlatformLabel(url: string, index: number) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return `Option ${index + 1}`;
  }
}

function normalizeLinks(links?: PlatformLink[], singleLink?: string) {
  const normalized: { label: string; url: string }[] = [];

  for (const link of links || []) {
    const url = link?.url?.trim();
    if (!url || url === "#") continue;
    normalized.push({ label: link?.label?.trim() || "", url });
  }

  const legacy = singleLink?.trim();
  if (legacy && legacy !== "#") {
    normalized.push({ label: "", url: legacy });
  }

  const deduped: { label: string; url: string }[] = [];
  const seen = new Set<string>();
  normalized.forEach((item, index) => {
    const key = item.url.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    deduped.push({
      label: item.label || getPlatformLabel(item.url, index),
      url: item.url,
    });
  });

  return deduped;
}

function resolveActionLinks(
  editionLinks?: PlatformLink[],
  editionSingleLink?: string,
  defaultLinks?: PlatformLink[],
  defaultSingleLink?: string
) {
  const editionResolved = normalizeLinks(editionLinks, editionSingleLink);
  if (editionResolved.length > 0) return editionResolved;
  return normalizeLinks(defaultLinks, defaultSingleLink);
}

function PublicationAction({
  label,
  links,
  className,
  arrow,
}: {
  label: string;
  links: { label: string; url: string }[];
  className: string;
  arrow?: boolean;
}) {
  if (!links.length) return null;

  if (links.length === 1) {
    return (
      <a href={links[0].url} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        {arrow ? (
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        ) : null}
      </a>
    );
  }

  return (
    <details style={{ position: "relative" }}>
      <summary className={className} style={{ listStyle: "none" }}>
        {label}
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 0.5rem)",
          right: 0,
          minWidth: "13rem",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          boxShadow: "0 10px 24px rgba(0, 0, 0, 0.08)",
          padding: "0.45rem",
          zIndex: 15,
        }}
      >
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textDecoration: "none",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--text-heading)",
              borderRadius: "4px",
              padding: "0.55rem 0.6rem",
              border: "1px solid transparent",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </details>
  );
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
  const activeViewLinks = resolveActionLinks(selectedEdition?.viewLinks, selectedEdition?.viewLink, pub.viewLinks, pub.viewLink);
  const activeBuyLinks = resolveActionLinks(selectedEdition?.buyLinks, selectedEdition?.buyLink, pub.buyLinks, pub.buyLink);

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
          className="pub-row"
          style={{
            display: "grid",
            gridTemplateColumns: "5.5rem 240px 1fr auto",
            gap: "3.5rem",
            alignItems: "start",
            padding: "4.5rem 0",
          }}
        >
          <div
            className="font-cinzel pub-row-num"
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
            className="pub-cover"
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
              <div className="pub-language-row" style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                  className="pub-language-select"
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

          <div className="pub-cta-col" style={{ paddingTop: "0.5rem", flexShrink: 0, display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <PublicationAction label="View" links={activeViewLinks} className="btn-ghost" arrow />

            <PublicationAction label="Buy" links={activeBuyLinks} className="btn-outline" />

            {!activeViewLinks.length && !activeBuyLinks.length && (
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
          <div className="pub-forthcoming-grid" style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
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
