"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

interface Slot {
  id: string;
  title: string;
  start: string;
  end: string;
}

interface BookingResult {
  id: string;
  start?: string;
  end?: string;
  meetLink: string | null;
  htmlLink: string | null;
}

function formatDayLabel(dateValue: string) {
  const date = new Date(dateValue);
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function localDateKey(isoDate: string) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTimeRange(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const formatter = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

export default function BookingScheduler() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        setSlotsError(null);

        const response = await fetch("/api/booking/slots", { cache: "no-store" });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load slots");
        }

        setSlots((data.slots || []) as Slot[]);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not load slots";
        setSlotsError(message);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, []);

  const selectedSlot = useMemo(
    () => slots.find((slot) => slot.id === selectedSlotId) || null,
    [slots, selectedSlotId],
  );

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, Slot[]>>((acc, slot) => {
      const dateKey = localDateKey(slot.start);
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(slot);
      return acc;
    }, {});
  }, [slots]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlotId) {
      setSubmitError("Please select a slot first.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const response = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selectedSlotId, name, email, notes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking failed");
      }

      setResult(data.booking as BookingResult);
      setSlots((prev) => prev.filter((slot) => slot.id !== selectedSlotId));
      setSelectedSlotId(null);
      setName("");
      setEmail("");
      setNotes("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Booking failed";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-pad" style={{ background: "var(--bg)" }}>
      <div className="inner-max" style={{ maxWidth: "74rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "2rem",
            }}
          >
            <h2 className="font-serif" style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
              Available Slots
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Michael controls these slots directly from Google Calendar.
            </p>

            {loadingSlots && <p style={{ color: "var(--text-muted)" }}>Loading available slots...</p>}

            {slotsError && (
              <p style={{ color: "#b83a3a", fontWeight: 500 }}>
                {slotsError}
              </p>
            )}

            {!loadingSlots && !slotsError && slots.length === 0 && (
              <p style={{ color: "var(--text-muted)" }}>
                No slots are currently available. Please check back soon.
              </p>
            )}

            {!loadingSlots && !slotsError && slots.length > 0 && (
              <div style={{ display: "grid", gap: "1.25rem" }}>
                {Object.entries(groupedSlots)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([dateKey, daySlots]) => (
                    <div key={dateKey}>
                      <h3
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.875rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--accent)",
                          marginBottom: "0.625rem",
                        }}
                      >
                        {formatDayLabel(dateKey)}
                      </h3>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                        {daySlots.map((slot) => {
                          const isActive = selectedSlotId === slot.id;
                          return (
                            <button
                              type="button"
                              key={slot.id}
                              onClick={() => setSelectedSlotId(slot.id)}
                              style={{
                                border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                                background: isActive ? "rgba(139, 107, 74, 0.12)" : "transparent",
                                color: "var(--text)",
                                borderRadius: "999px",
                                padding: "0.55rem 1rem",
                                fontFamily: "Space Grotesk, sans-serif",
                                fontSize: "0.8125rem",
                                cursor: "pointer",
                              }}
                            >
                              {formatTimeRange(slot.start, slot.end)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "2rem",
            }}
          >
            <h2 className="font-serif" style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
              Book Selected Slot
            </h2>

            {selectedSlot ? (
              <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                {formatDayLabel(selectedSlot.start)} at {formatTimeRange(selectedSlot.start, selectedSlot.end)}
              </p>
            ) : (
              <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                Select a slot to continue.
              </p>
            )}

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.8rem 0.9rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                }}
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.8rem 0.9rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                }}
              />

              <textarea
                placeholder="Anything Michael should know before the session?"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={5}
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.8rem 0.9rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                  resize: "vertical",
                }}
              />

              {submitError && (
                <p style={{ color: "#b83a3a", fontWeight: 500 }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedSlotId}
                className="btn-primary"
                style={{ width: "100%", opacity: submitting || !selectedSlotId ? 0.7 : 1 }}
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>

            {result && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(125, 139, 111, 0.35)",
                  background: "rgba(125, 139, 111, 0.1)",
                }}
              >
                <p style={{ marginBottom: "0.4rem", color: "var(--text-heading)", fontWeight: 600 }}>
                  Session booked successfully.
                </p>
                {result.start && result.end && (
                  <p style={{ color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                    {formatDayLabel(result.start)} at {formatTimeRange(result.start, result.end)}
                  </p>
                )}

                {result.meetLink && (
                  <a
                    href={result.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ width: "100%" }}
                  >
                    Open Google Meet Link
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
