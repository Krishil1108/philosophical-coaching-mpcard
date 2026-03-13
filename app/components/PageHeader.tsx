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
        background: "#0d0f14",
        paddingTop: "9rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Very subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)",
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {breadcrumb.label}
              </Link>
              <span style={{ color: "rgba(201,168,76,0.3)", fontSize: "10px" }}>›</span>
            </>
          )}
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {label}
          </span>
        </motion.div>

        {/* Main title — very large */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="font-serif"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            color: "white",
            lineHeight: 0.95,
            marginBottom: subtitle ? "3rem" : 0,
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle — left aligned, narrow column */}
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
                width: "1px",
                height: "100%",
                background: "rgba(201,168,76,0.3)",
                justifySelf: "center",
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
