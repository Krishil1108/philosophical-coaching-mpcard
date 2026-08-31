"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingMessageBox() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Philosophy as Counsel (1-on-1 Dialogue)");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) {
      setErrorMessage("Email and message are compulsory.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Visitor",
          email: email.trim(),
          topic,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setEmail("");
      setMessage("");
      setName("");
    } catch (err: any) {
      console.error("Error sending message:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        paddingTop: "1.75rem",
        borderTop: "1px dashed var(--border)",
      }}
    >
      <div style={{ marginBottom: "1.25rem" }}>
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.625rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            display: "block",
            marginBottom: "0.25rem",
          }}
        >
          Have a Question First?
        </span>
        <h3
          className="font-serif"
          style={{
            fontSize: "1.25rem",
            color: "var(--text-heading)",
            marginBottom: "0.25rem",
            lineHeight: 1.25,
          }}
        >
          Send Me a Message
        </h3>
        <p
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            lineHeight: 1.5,
            fontWeight: 300,
          }}
        >
          Prefer to inquire before booking or need a custom time? Write directly to Michael below.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(163, 176, 148, 0.15)",
              border: "1px solid rgba(163, 176, 148, 0.4)",
              borderRadius: "8px",
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--sage)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
            <h4
              className="font-serif"
              style={{ fontSize: "1.05rem", color: "var(--text-heading)", marginBottom: "0.25rem" }}
            >
              Message Sent
            </h4>
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                lineHeight: 1.5,
              }}
            >
              Thank you! Your message has been forwarded to Michael. He will reply directly to your email.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="btn-outline"
              style={{ marginTop: "1rem", padding: "0.4rem 0.85rem", fontSize: "0.75rem" }}
            >
              Send Another Note
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
          >
            {/* 1. Dropdown (Topic) */}
            <div>
              <label
                htmlFor="booking-msg-topic"
                style={{
                  display: "block",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--text)",
                  marginBottom: "0.35rem",
                }}
              >
                Inquiry Topic
              </label>
              <select
                id="booking-msg-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "0.75rem 0.85rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.85rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="Philosophy as Counsel (1-on-1 Dialogue)">Philosophy as Counsel (1-on-1)</option>
                <option value="Dialogue Facilitation & Public Café">Dialogue Facilitation & Café</option>
                <option value="Editorial & Translation Inquiry">Editorial & Translation</option>
                <option value="Scheduling / Timezone Question">Scheduling / Timezone Question</option>
                <option value="General Question / Other">General Question / Other</option>
              </select>
            </div>

            {/* 2. Email Address (Compulsory) */}
            <div>
              <label
                htmlFor="booking-msg-email"
                style={{
                  display: "block",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--text)",
                  marginBottom: "0.35rem",
                }}
              >
                Your Email Address <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <input
                id="booking-msg-email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "0.75rem 0.85rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
              />
            </div>

            {/* 3. Textbox (Message - Compulsory) */}
            <div>
              <label
                htmlFor="booking-msg-content"
                style={{
                  display: "block",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--text)",
                  marginBottom: "0.35rem",
                }}
              >
                Your Message <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <textarea
                id="booking-msg-content"
                required
                rows={3}
                placeholder="Type your message or question here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "0.75rem 0.85rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.85rem",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            {status === "error" && (
              <p style={{ color: "#b83a3a", fontSize: "0.78rem", fontWeight: 500, margin: 0 }}>
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-outline"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.7rem 1rem",
                fontSize: "0.8125rem",
                marginTop: "0.25rem",
              }}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
