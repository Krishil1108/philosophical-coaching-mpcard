"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function RejectForm() {
  const searchParams = useSearchParams();
  const slotId = searchParams.get("slotId");
  
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!slotId) {
    return <div style={{ textAlign: "center", padding: "40px", color: "red" }}>Missing slotId parameter.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reject booking");
      }

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "#8b6b4a", marginBottom: "1rem" }}>Booking Rejected</h2>
        <p style={{ color: "#555" }}>The client has been notified via email, and the slot is available again.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <label htmlFor="comment" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
          Optional message for the client:
        </label>
        <textarea
          id="comment"
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="e.g., I'm currently fully booked this week, please try next week."
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
      </div>

      {status === "error" && (
        <div style={{ color: "red", fontSize: "0.9rem" }}>{errorMsg}</div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: status === "loading" ? "#ccc" : "#8b6b4a",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Processing..." : "Confirm Rejection"}
      </button>
    </form>
  );
}

export default function RejectPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fdfdfc", padding: "20px" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "12px", border: "1px solid #eaeaea", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", maxWidth: "500px", width: "100%" }}>
        <h1 style={{ color: "#8b6b4a", marginTop: 0, marginBottom: "20px", textAlign: "center" }}>Reject Booking</h1>
        <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
          <RejectForm />
        </Suspense>
      </div>
    </div>
  );
}
