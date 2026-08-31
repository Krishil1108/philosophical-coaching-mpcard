"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

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
