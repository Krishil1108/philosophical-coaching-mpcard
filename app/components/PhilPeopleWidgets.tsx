"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SafeWidgetContainer = React.memo(
  () => {
    return (
      <div
        className="ppl-widget-container"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "0.9375rem",
          lineHeight: 1.8,
          color: "var(--text)",
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />
    );
  },
  () => true
);

/**
 * PhilPeople Publications Widget
 * Displays academic publications from PhilPapers/PhilPeople
 */
export function PhilPeoplePublications({
  settings,
}: {
  settings?: {
    philPeopleLabel?: string;
    philPeopleCategory?: string;
    philPeopleTitle?: string;
    philPeopleDesc?: string;
  };
}) {
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://philpeople.org/widget/97554.js";
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).philpeople_embed_init === "function") {
        (window as any).philpeople_embed_init();
      }
      const target = document.querySelector(".ppl-widget-container") as HTMLElement;
      if (target) {
        target.style.opacity = "1";
      }
      const loader = document.getElementById("ppl-widget-loader");
      if (loader) {
        loader.style.display = "none";
      }
    };
    script.onerror = () => setHasError(true);
    
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      style={{
        padding: "6rem 0",
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-muted) 50%, var(--bg) 100%)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="font-cinzel"
        style={{
          position: "absolute",
          right: "-5rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "20rem",
          color: "rgba(139, 107, 74, 0.02)",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        φ
      </motion.div>

      <div className="inner-max" style={{ maxWidth: "88rem", position: "relative", zIndex: 1 }}>
        <div className="philpeople-grid" style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "3rem" }}>
          {/* Side label with animation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.5rem",
              color: "var(--accent)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              textAlign: "right",
              alignSelf: "start",
              paddingTop: "0.5rem",
            }}
          >
            {settings?.philPeopleLabel || "PhilPapers"}
          </motion.div>

          <div>
            {/* Enhanced Header */}
            <div style={{ marginBottom: "3rem" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "1px",
                    background: "var(--accent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.625rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    fontWeight: 500,
                  }}
                >
                  {settings?.philPeopleCategory || "Academic Work"}
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-serif"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "var(--text-heading)",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                {settings?.philPeopleTitle || "Scholarly Publications"}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  fontWeight: 300,
                  maxWidth: "36rem",
                  lineHeight: 1.8,
                }}
              >
                {settings?.philPeopleDesc || "Peer-reviewed papers, book chapters, and scholarly contributions indexed on PhilPapers — exploring philosophical practice, phenomenology, and public philosophy."}
              </motion.p>
            </div>

            {/* Enhanced Widget container */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{
                background: "var(--bg)",
                borderRadius: "12px",
                padding: "2.5rem",
                border: "1px solid var(--border)",
                minHeight: "250px",
                position: "relative",
                overflow: "hidden",
                boxShadow: isHovered ? "0 8px 24px rgba(0, 0, 0, 0.06)" : "0 2px 8px rgba(0, 0, 0, 0.02)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Animated gradient border */}
              <motion.div
                animate={{
                  background: isHovered
                    ? "linear-gradient(90deg, var(--accent), var(--sage), var(--accent))"
                    : "linear-gradient(90deg, var(--accent), var(--sage), transparent)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  borderRadius: "12px 12px 0 0",
                }}
              />

              {/* Loading state with better animation */}
              {!hasError && (
                <div
                  id="ppl-widget-loader"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.25rem",
                    minHeight: "200px",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "3px solid var(--border)",
                      borderTopColor: "var(--accent)",
                      borderRadius: "50%",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Loading publications...
                  </p>
                </div>
              )}

              {/* Error state */}
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    textAlign: "center",
                    padding: "3rem 2rem",
                  }}
                >
                  <div
                    className="font-cinzel"
                    style={{
                      fontSize: "2.5rem",
                      color: "rgba(139, 107, 74, 0.15)",
                      marginBottom: "1rem",
                      lineHeight: 1,
                    }}
                  >
                    φ
                  </div>
                  <p
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.9375rem",
                      color: "var(--text-muted)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Unable to load publications widget
                  </p>
                  <a
                    href="https://philpapers.org/profile/97554"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    View on PhilPapers
                  </a>
                </motion.div>
              )}

              {/* Actual widget container with enhanced styling */}
              <SafeWidgetContainer />
            </motion.div>

            {/* Enhanced direct link button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <motion.a
                href="https://philpapers.org/profile/97554"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.8125rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.75rem 1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  background: "var(--bg)",
                  transition: "all 0.2s ease",
                  fontWeight: 500,
                  letterSpacing: "0.025em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--bg-card)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--bg)";
                }}
              >
                View Complete Profile
                <motion.svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const SafeFollowButtonContainer = React.memo(
  () => {
    return (
      <div
        id="philpeople-component-follow_btn"
        style={{
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: 0,
          transform: "translateY(10px)",
        }}
      />
    );
  },
  () => true
);

/**
 * PhilPeople Follow Button Widget
 * Allows visitors to follow on PhilPeople
 */
export function PhilPeopleFollowButton() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://philpeople.org/components/follow_btn?props%5B%3Aprofile_id_prop%5D=97554&props%5Bcontext%5D=external";
    script.async = true;
    script.onload = () => {
      const target = document.getElementById("philpeople-component-follow_btn");
      if (target) {
        target.style.opacity = "1";
        target.style.transform = "translateY(0)";
      }
      const loader = document.getElementById("follow-btn-loader");
      if (loader) {
        loader.style.display = "none";
      }
    };
    
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{
        padding: "1rem 0 1rem",
        background: "linear-gradient(135deg, var(--bg-muted) 0%, var(--bg) 50%, var(--bg-card) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="font-cinzel"
        style={{
          position: "absolute",
          left: "-3rem",
          top: "20%",
          fontSize: "12rem",
          color: "var(--accent)",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 300,
          lineHeight: 1,
        }}
      >
        φ
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="font-cinzel"
        style={{
          position: "absolute",
          right: "-2rem",
          bottom: "10%",
          fontSize: "8rem",
          color: "var(--sage)",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        φ
      </motion.div>

      <div className="inner-max" style={{ maxWidth: "88rem", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Enhanced title section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: "1rem" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  width: "32px",
                  height: "1px",
                  background: "var(--accent)",
                  transformOrigin: "left",
                }}
              />
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 500,
                }}
              >
                Connect
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  width: "32px",
                  height: "1px",
                  background: "var(--accent)",
                  transformOrigin: "right",
                }}
              />
            </div>

            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                color: "var(--text-heading)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              Follow My Academic Journey
            </motion.h4>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1rem",
                color: "var(--text-muted)",
                fontWeight: 300,
                maxWidth: "28rem",
                lineHeight: 1.8,
              }}
            >
              Stay updated with new publications, research, and philosophical contributions on PhilPeople
            </motion.p>
          </motion.div>

          {/* Enhanced widget container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0.2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.25rem",
              padding: "2.5rem 3rem",
              background: "var(--bg)",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              minWidth: "240px",
              position: "relative",
              boxShadow: isHovered ? "0 12px 32px rgba(0, 0, 0, 0.08)" : "0 4px 16px rgba(0, 0, 0, 0.04)",
              transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
            }}
          >
            {/* Animated gradient borders */}
            <motion.div
              animate={{
                background: isHovered
                  ? "linear-gradient(45deg, var(--accent), var(--sage), var(--accent), var(--sage))"
                  : "linear-gradient(90deg, var(--accent), var(--sage))",
                backgroundSize: isHovered ? "200% 200%" : "100% 100%",
                backgroundPosition: isHovered ? "0% 50%" : "0% 0%",
              }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                borderRadius: "0 0 4px 4px",
              }}
            />

            {/* Corner decorations */}
            <motion.div
              animate={{ opacity: isHovered ? 0.1 : 0.05 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontSize: "1.5rem",
                color: "var(--accent)",
                fontFamily: "serif",
              }}
            >
              φ
            </motion.div>

            {/* Loading state with enhanced animation */}
            <div
              id="follow-btn-loader"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "24px",
                  height: "24px",
                  border: "3px solid var(--border)",
                  borderTopColor: "var(--accent)",
                  borderRadius: "50%",
                }}
              />
              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.025em",
                }}
              >
                Loading follow button...
              </p>
            </div>

            {/* PhilPeople button container with fade-in */}
            <SafeFollowButtonContainer />
          </motion.div>

          {/* Enhanced profile link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{ marginTop: "2rem" }}
          >
            <motion.a
              href="https://philpeople.org/profiles/michael-picard"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                border: "1px solid transparent",
                transition: "all 0.2s ease",
                letterSpacing: "0.025em",
                fontWeight: 400,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "transparent";
              }}
            >
              View Complete Profile
              <motion.svg
                width="11"
                height="11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                whileHover={{ x: 3, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
