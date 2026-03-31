"use client";

import CounterAnimation from "./CounterAnimation";

const stats = [
  { value: 700, suffix: "+", label: "Café Sessions" },
  { value: 12, suffix: "", label: "Years Practice" },
  { value: 2, suffix: "", label: "Books Authored" },
  { value: null, suffix: "", label: "Philosophy, MIT", display: "PhD" },
];

export default function StatsSection() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="inner-max stats-grid"
        style={{
          maxWidth: "88rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "2.5rem 2rem",
              flex: "1 1 0",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              className="font-cinzel font-bold"
              style={{ fontSize: "2rem", color: "var(--accent)", letterSpacing: "0.04em" }}
            >
              {stat.value !== null ? (
                <CounterAnimation 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2.5}
                />
              ) : (
                stat.display
              )}
            </div>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.5625rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: "0.5rem",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
