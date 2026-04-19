"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface YoutubeVideo {
  _id: string;
  title: string;
  videoId: string;
  description?: string;
}

const placeholderVideos: YoutubeVideo[] = [
  {
    _id: "v1",
    title: "What Is Philosophical Coaching?",
    videoId: "placeholder1",
    description: "Michael explains the difference between philosophical coaching and therapy or counselling — and what makes the Socratic approach unique.",
  },
  {
    _id: "v2",
    title: "Café Philosophy: How It Works",
    videoId: "placeholder2",
    description: "An introduction to Café Philosophy — open dialogue for everyone, no background required. A look behind the weekly sessions.",
  },
  {
    _id: "v3",
    title: "Philosophy Sports in Action",
    videoId: "placeholder3",
    description: "Watch teams engage in structured philosophical debate in this original format developed by Michael Picard.",
  },
];

export default function VideoSection({ data }: { data?: YoutubeVideo[] }) {
  const videos = data?.length ? data : placeholderVideos;
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const isReal = (id: string) => !id.startsWith("placeholder");

  return (
    <section style={{ background: "var(--bg)" }}>
      {videos.map((video, i) => (
        <motion.div
          key={video._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="inner-max" style={{ maxWidth: "88rem" }}>
            <div
              className="video-row"
              style={{
                display: "grid",
                gridTemplateColumns: "5.5rem 1fr 380px",
                gap: "4rem",
                alignItems: "center",
                padding: "4rem 0",
              }}
            >
              {/* Number */}
              <div
                className="font-cinzel video-row-num"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                }}
              >
                0{i + 1}
              </div>

              {/* Text */}
              <div>
                <h2
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                    color: "var(--text-heading)",
                    lineHeight: 1.1,
                    marginBottom: "1rem",
                  }}
                >
                  {video.title}
                </h2>
                {video.description && (
                  <p
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      fontSize: "0.9375rem",
                      maxWidth: "34rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {video.description}
                  </p>
                )}
                {isReal(video.videoId) && (
                  <button
                    onClick={() => setActiveVideoId(video.videoId)}
                    className="btn-ghost"
                    style={{ background: "none", border: "none" }}
                  >
                    Watch Now
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Thumbnail */}
              <div
                className="video-row-thumb"
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  background: "var(--bg-card)",
                  overflow: "hidden",
                  cursor: isReal(video.videoId) ? "pointer" : "default",
                  flexShrink: 0,
                  borderRadius: "4px",
                }}
                onClick={() => isReal(video.videoId) && setActiveVideoId(video.videoId)}
              >
                {isReal(video.videoId) ? (
                  <>
                    <Image
                      src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    {/* Play overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(250, 248, 245, 0.4)",
                        transition: "background 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(250, 248, 245, 0.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(250, 248, 245, 0.4)")}
                    >
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "var(--accent)",
                          borderRadius: "4px",
                        }}
                      >
                        <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24" style={{ marginLeft: "3px" }}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(139, 107, 74, 0.08)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                      }}
                    >
                      <svg width="18" height="18" fill="var(--accent)" viewBox="0 0 24 24" style={{ marginLeft: "3px" }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.5625rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Add via Sanity Studio
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* ─── QUOTE SECTION ─────────────────── */}
      <motion.div
        className="video-quote-section"
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
            Philosophical Dialogue
          </div>
          <blockquote
            className="font-italic"
            style={{
              fontSize: "clamp(2rem, 4vw, 4rem)",
              color: "var(--text-heading)",
              fontStyle: "italic",
              lineHeight: 1.2,
              maxWidth: "72rem",
              marginBottom: "2.5rem",
              textAlign: "center",
              margin: "0 auto 2.5rem",
            }}
          >
            "It is not the philosopher who presses their questions upon others; rather, the questions of others press upon the philosopher."
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

      {/* Video modal */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoId(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              background: "rgba(45, 40, 32, 0.95)",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              style={{ position: "relative", width: "100%", maxWidth: "900px", aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
              />
              <button
                onClick={() => setActiveVideoId(null)}
                style={{
                  position: "absolute",
                  top: "-2.5rem",
                  right: 0,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(250, 248, 245, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
