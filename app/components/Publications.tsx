"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { urlFor } from "../lib/sanity";

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

function mergeActionLinks(
  editionLinks?: PlatformLink[],
  editionSingleLink?: string,
  defaultLinks?: PlatformLink[],
  defaultSingleLink?: string
) {
  const merged = [
    ...normalizeLinks(editionLinks, editionSingleLink),
    ...normalizeLinks(defaultLinks, defaultSingleLink),
  ];

  const deduped: { label: string; url: string }[] = [];
  const seen = new Set<string>();
  for (const link of merged) {
    const key = link.url.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(link);
  }

  return deduped;
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
      <summary
        className={className}
        style={{ listStyle: "none", display: "inline-flex", alignItems: "center" }}
        aria-label={`${label} options`}
      >
        {label}
        <span
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            opacity: 0.72,
          }}
        >
          Options
        </span>
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
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
          padding: "0.35rem",
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
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-heading)",
              borderRadius: "4px",
              padding: "0.55rem 0.6rem",
              border: "1px solid var(--border)",
              background: "transparent",
              marginBottom: "0.25rem",
              transition: "border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease",
            }}
          >
            <span>{link.label}</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: "var(--accent)",
                whiteSpace: "nowrap",
              }}
            >
              Open now
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </details>
  );
}

function PublicationDescription({ text }: { text?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 240;

  if (!text) return null;
  if (text.length <= maxLength) {
    return (
      <p
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 300,
          color: "var(--text-muted)",
          lineHeight: 1.85,
          fontSize: "0.9375rem",
          maxWidth: "38rem",
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "38rem" }}>
      <p
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 300,
          color: "var(--text-muted)",
          lineHeight: 1.85,
          fontSize: "0.9375rem",
          whiteSpace: "pre-line",
        }}
      >
        {isExpanded ? text : `${text.slice(0, maxLength).trim()}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          color: "var(--accent)",
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          marginTop: "0.5rem",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <span>{isExpanded ? "Read Less" : "Read More"}</span>
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
    </div>
  );
}

function PublicationRow({ pub, index }: { pub: Publication; index: number }) {
  const editions = pub.editions || [];
  const defaultEditionKey = "default";
  const [selectedEditionKey, setSelectedEditionKey] = useState(defaultEditionKey);

  const selectedEdition = useMemo(() => {
    if (!editions.length || selectedEditionKey === defaultEditionKey) return null;
    return editions.find((edition) => (edition._key || "") === selectedEditionKey) || editions[0];
  }, [editions, selectedEditionKey]);

  const activeCoverImage = selectedEdition?.coverImage || pub.coverImage;
  const activeViewLinks = mergeActionLinks(selectedEdition?.viewLinks, selectedEdition?.viewLink, pub.viewLinks, pub.viewLink);
  const activeBuyLinks = mergeActionLinks(selectedEdition?.buyLinks, selectedEdition?.buyLink, pub.buyLinks, pub.buyLink);

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
              background: "transparent",
              overflow: "visible",
              flexShrink: 0,
            }}
          >
            {activeCoverImage ? (
              <Image
                src={urlFor(activeCoverImage).ignoreImageParams().width(360).height(480).fit("max").auto("format").url()}
                alt={pub.title}
                fill
                style={{ 
                  objectFit: "contain", 
                  objectPosition: "center",
                  filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.12))"
                }}
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
                  <option value={defaultEditionKey}>Default</option>
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

            <PublicationDescription text={pub.description} />
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

const ITEMS_PER_PAGE = 5;

interface PublicationsPageSettings {
  forthcomingText?: string;
  quoteText?: string;
  quoteAuthor?: string;
  quoteSource?: string;
  quotePublisher?: string;
  quoteContext?: string;
}

function PublicationsWrapper({
  data,
  pageSettings,
}: {
  data?: Publication[];
  pageSettings?: PublicationsPageSettings;
}) {
  const publications = data?.length ? data : defaultPublications;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPublications = useMemo(() => {
    if (!searchQuery.trim()) return publications;
    const query = searchQuery.toLowerCase();
    return publications.filter(
      (pub) =>
        pub.title?.toLowerCase().includes(query) ||
        pub.subtitle?.toLowerCase().includes(query) ||
        pub.publisher?.toLowerCase().includes(query) ||
        pub.description?.toLowerCase().includes(query)
    );
  }, [publications, searchQuery]);

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedPublications = filteredPublications.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section style={{ background: "var(--bg)" }}>
      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "3rem 0",
          background: "var(--bg-muted)",
        }}
      >
        <div className="inner-max" style={{ maxWidth: "88rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              alignItems: "center",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0 }}>
              <svg width="16" height="16" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M11 19a8 8 0 1 1 5.292-14.01A8 8 0 0 1 11 19Zm10 2-4.35-4.35" />
              </svg>
              <input
                type="text"
                aria-label="Search publications"
                placeholder="Search publications by title, subtitle, publisher, or description..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: "100%",
                  minWidth: "180px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "Space Grotesk, sans-serif",
                  color: "var(--text)",
                  fontSize: "0.9375rem",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.6875rem",
                color: "var(--accent)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                border: "1px solid var(--border)",
                borderRadius: "999px",
                padding: "0.45rem 0.75rem",
                whiteSpace: "nowrap",
              }}
            >
              {filteredPublications.length} result{filteredPublications.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Publications Grid */}
      <div style={{ background: "var(--bg)" }}>
        {paginatedPublications.length > 0 ? (
          paginatedPublications.map((pub, i) => (
            <PublicationRow key={pub._id} pub={pub} index={startIdx + i} />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "var(--text-muted)",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1rem",
            }}
          >
            No publications found matching your search.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "2rem 0",
            background: "var(--bg-muted)",
          }}
        >
          <div className="inner-max" style={{ maxWidth: "88rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "btn-ghost" : "btn-primary"}
                style={{
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                <span>← Previous</span>
              </button>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: currentPage === page ? "var(--accent)" : "var(--bg-card)",
                      color: currentPage === page ? "var(--bg)" : "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: currentPage === page ? 600 : 500,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "btn-ghost" : "btn-primary"}
                style={{
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                <span>Next →</span>
              </button>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "1rem",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
              }}
            >
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </motion.div>
      )}

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
              {pageSettings?.forthcomingText || "Two translations of Gerd Achenbach's works on Philosophical Praxis, published by Lexington Books."}
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
            {pageSettings?.quoteContext || "Philosophical Practice — Foundational Principles"}
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
            "{pageSettings?.quoteText || "Philosophical practice must calibrate itself to the themes, problems and question-formulations that burden others, those who in their need have turned to philosophy for help."}"
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
            — {pageSettings?.quoteAuthor || "Gerd B. Achenbach"}, <em>{pageSettings?.quoteSource || "Philosophical Praxis"}</em> ({pageSettings?.quotePublisher || "Bloomsbury, 2024"})
          </cite>
        </div>
      </motion.div>
    </section>
  );
}

export default PublicationsWrapper;
