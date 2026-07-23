"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "3rem",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.75rem", color: "var(--text-heading)", marginBottom: "0.5rem" }}>
          Send a Message
        </h3>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Reach out for inquiries about Café Philosophy or other matters.
        </p>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(163, 176, 148, 0.15)",
            border: "1px solid rgba(163, 176, 148, 0.5)",
            borderRadius: "8px",
            padding: "1.5rem",
            textAlign: "center",
            color: "var(--sage)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: "0 auto 1rem" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}>Message sent successfully!</p>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.85rem", marginTop: "0.5rem", color: "var(--text-muted)" }}>
            I will get back to you as soon as possible.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="btn-outline"
            style={{ marginTop: "1.5rem", padding: "0.5rem 1rem" }}
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label htmlFor="name" style={{ display: "block", fontFamily: "Space Grotesk", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text)" }}>Name</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "var(--bg)",
                fontFamily: "Space Grotesk",
                color: "var(--text)",
                outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: "block", fontFamily: "Space Grotesk", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text)" }}>Email</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "var(--bg)",
                fontFamily: "Space Grotesk",
                color: "var(--text)",
                outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>
          <div>
            <label htmlFor="message" style={{ display: "block", fontFamily: "Space Grotesk", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text)" }}>Message</label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "var(--bg)",
                fontFamily: "Space Grotesk",
                color: "var(--text)",
                outline: "none",
                resize: "vertical",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          {status === "error" && (
            <div style={{ color: "red", fontSize: "0.85rem", fontFamily: "Space Grotesk" }}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          >
            <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
