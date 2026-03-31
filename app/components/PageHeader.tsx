"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string };
}

export default function PageHeader({ label, title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #faf8f5 0%, #f5f1eb 100%)",
        paddingTop: "9rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--border)",
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
          background: "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
        }}
      />

      <div className="inner-max" style={{ maxWidth: "88rem" }}>
        {/* Breadcrumb + label row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          {breadcrumb && (
            <>
              <Link
                href={breadcrumb.href}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {breadcrumb.label}
              </Link>
              <span style={{ color: "var(--accent)", opacity: 0.4, fontSize: "10px" }}>›</span>
            </>
          )}
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {label}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="font-serif"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            color: "var(--text-heading)",
            lineHeight: 0.95,
            marginBottom: subtitle ? "3rem" : 0,
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: "5.5rem 1fr",
              gap: "3rem",
            }}
          >
            <div
              style={{
                width: "2px",
                height: "100%",
                background: "var(--accent)",
                justifySelf: "center",
                borderRadius: "1px",
                opacity: 0.4,
              }}
            />
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 300,
                color: "var(--text-muted)",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                maxWidth: "36rem",
              }}
            >
              {subtitle}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
