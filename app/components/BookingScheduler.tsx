"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import BookingMessageBox from "./BookingMessageBox";

interface Slot {
  id: string;
  title: string;
  start: string;
  end: string;
}

interface SlotsResponse {
  slots?: Slot[];
  bookedSlotStarts?: string[];
  windowStart?: string;
  windowEnd?: string;
  error?: string;
}

interface BookingResult {
  id: string;
  start?: string;
  end?: string;
  meetLink: string | null;
  htmlLink: string | null;
}

interface BookingSchedulerProps {
  heading?: string;
  description?: string;
}

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CALENDAR_TIMEZONE = "America/Vancouver";

function dateFromKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function zonedDateKey(isoDate: string | Date | number) {
  const date = typeof isoDate === "string" || typeof isoDate === "number" ? new Date(isoDate) : isoDate;
  
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CALENDAR_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  
  const parts = formatter.formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDayLabel(dateValue: string) {
  const date = dateValue.includes("T") ? new Date(dateValue) : dateFromKey(dateValue);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  
  if (dateValue.includes("T")) {
    options.timeZone = CALENDAR_TIMEZONE;
  }
  
  return new Intl.DateTimeFormat("en-CA", options).format(date);
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatTimeRange(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CALENDAR_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
  });
  
  const tzFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CALENDAR_TIMEZONE,
    timeZoneName: "short"
  });
  
  const tzParts = tzFormatter.formatToParts(start);
  const tzName = tzParts.find((p) => p.type === "timeZoneName")?.value || "PT";

  return `${formatter.format(start)} - ${formatter.format(end)} ${tzName}`;
}

function getLocalTimeContext(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const localFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  
  const localTzFormatter = new Intl.DateTimeFormat(undefined, {
    timeZoneName: "short"
  });
  const tzParts = localTzFormatter.formatToParts(start);
  const localTzName = tzParts.find((p) => p.type === "timeZoneName")?.value || "";

  return `${localFormatter.format(start)} - ${localFormatter.format(end)} ${localTzName}`.trim();
}

function getMonthCells(monthDate: Date) {
  const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const firstCell = addDays(firstOfMonth, -mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(firstCell, index);
    return {
      key: toDateKey(date),
      date,
      isCurrentMonth: date.getMonth() === monthDate.getMonth(),
    };
  });
}

function pluralizeSlots(count: number) {
  return `${count} ${count === 1 ? "slot" : "slots"}`;
}

function statusCopy(slotCount: number, hasBookedSlot: boolean) {
  if (slotCount > 0) return `${pluralizeSlots(slotCount)} available`;
  if (hasBookedSlot) return "All slots booked";
  return "No slots released";
}

export default function BookingScheduler({ heading, description }: BookingSchedulerProps) {
  const todayKey = useMemo(() => zonedDateKey(new Date()), []);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookedSlotStarts, setBookedSlotStarts] = useState<string[]>([]);
  const [windowStartKey, setWindowStartKey] = useState<string | null>(null);
  const [windowEndKey, setWindowEndKey] = useState<string | null>(null);
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
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
        const data = (await response.json()) as SlotsResponse;

        if (!response.ok) {
          throw new Error(data.error || "Could not load slots");
        }

        const nextSlots = [...(data.slots || [])].sort((a, b) => a.start.localeCompare(b.start));
        const nextBookedStarts = data.bookedSlotStarts || [];
        const firstAvailableDate = nextSlots[0] ? zonedDateKey(nextSlots[0].start) : null;
        const firstBookedDate = nextBookedStarts[0] ? zonedDateKey(nextBookedStarts[0]) : null;
        const nextSelectedDate = firstAvailableDate || firstBookedDate || todayKey;

        setSlots(nextSlots);
        setBookedSlotStarts(nextBookedStarts);
        setWindowStartKey(data.windowStart ? zonedDateKey(data.windowStart) : null);
        setWindowEndKey(data.windowEnd ? zonedDateKey(data.windowEnd) : null);
        setSelectedDateKey(nextSelectedDate);
        setCalendarMonth(new Date(dateFromKey(nextSelectedDate).getFullYear(), dateFromKey(nextSelectedDate).getMonth(), 1));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not load slots";
        setSlotsError(message);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [todayKey]);

  const selectedSlot = useMemo(
    () => slots.find((slot) => slot.id === selectedSlotId) || null,
    [slots, selectedSlotId],
  );

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, Slot[]>>((acc, slot) => {
      const dateKey = zonedDateKey(slot.start);
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(slot);
      acc[dateKey].sort((a, b) => a.start.localeCompare(b.start));
      return acc;
    }, {});
  }, [slots]);

  const bookedDateKeys = useMemo(
    () => new Set(bookedSlotStarts.map((start) => zonedDateKey(start))),
    [bookedSlotStarts],
  );

  const monthCells = useMemo(() => getMonthCells(calendarMonth), [calendarMonth]);
  const selectedDaySlots = groupedSlots[selectedDateKey] || [];
  const selectedDayHasBookedSlots = bookedDateKeys.has(selectedDateKey);

  function isOutsideBookingWindow(dateKey: string) {
    return Boolean((windowStartKey && dateKey < windowStartKey) || (windowEndKey && dateKey > windowEndKey));
  }

  function handleSelectDate(dateKey: string) {
    if (isOutsideBookingWindow(dateKey)) return;

    const nextDate = dateFromKey(dateKey);
    setSelectedDateKey(dateKey);
    setSelectedSlotId(null);
    setSubmitError(null);
    setCalendarMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
  }

  function moveMonth(direction: -1 | 1) {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlotId || !selectedSlot) {
      setSubmitError("Please select a slot first.");
      return;
    }
    
    if (!email || !email.includes("@")) {
      setSubmitError("Please provide a valid email address so we can contact you.");
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

      const bookedDateKey = zonedDateKey(selectedSlot.start);

      setResult(data.booking as BookingResult);
      setSlots((prev) => prev.filter((slot) => slot.id !== selectedSlotId));
      setBookedSlotStarts((prev) => (prev.includes(selectedSlot.start) ? prev : [...prev, selectedSlot.start]));
      setSelectedDateKey(bookedDateKey);
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
      <div className="inner-max" style={{ maxWidth: "78rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] gap-10">
          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.54), rgba(243,239,232,0.92))",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "clamp(1.25rem, 3vw, 2rem)",
              boxShadow: "0 24px 60px rgba(73, 55, 35, 0.07)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5rem", marginBottom: "1.75rem" }}>
              <div>
                <span className="section-label">Live calendar</span>
                <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginTop: "0.5rem" }}>
                  {heading || "Choose a Date"}
                </h2>
              </div>
              <div
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  border: "1px solid rgba(125, 139, 111, 0.28)",
                  borderRadius: "999px",
                  color: "var(--sage)",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  padding: "0.55rem 0.85rem",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {slots.length} open
              </div>
            </div>

            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.65rem", maxWidth: "43rem" }}>
              {description || "Michael controls these sessions directly from Google Calendar. Pick a day first, then choose one of the available times for that day."}
            </p>

            {loadingSlots && <p style={{ color: "var(--text-muted)" }}>Loading available slots...</p>}

            {slotsError && (
              <p style={{ color: "#b83a3a", fontWeight: 600 }}>
                {slotsError}
              </p>
            )}

            {!loadingSlots && !slotsError && (
              <div className="booking-panel-grid">
                <div>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => moveMonth(-1)}
                      aria-label="Previous month"
                      className="booking-month-button"
                    >
                      &lt;
                    </button>
                    <h3
                      className="font-serif"
                      style={{
                        color: "var(--text-heading)",
                        fontSize: "1.45rem",
                        textAlign: "center",
                      }}
                    >
                      {formatMonthLabel(calendarMonth)}
                    </h3>
                    <button
                      type="button"
                      onClick={() => moveMonth(1)}
                      aria-label="Next month"
                      className="booking-month-button"
                    >
                      &gt;
                    </button>
                  </div>

                  <div className="booking-calendar-weekdays">
                    {weekdayLabels.map((weekday) => (
                      <span key={weekday}>{weekday}</span>
                    ))}
                  </div>

                  <div className="booking-calendar-grid">
                    {monthCells.map((cell) => {
                      const slotCount = groupedSlots[cell.key]?.length || 0;
                      const hasBookedSlot = bookedDateKeys.has(cell.key);
                      const isSelected = selectedDateKey === cell.key;
                      const isToday = todayKey === cell.key;
                      const isOutsideWindow = isOutsideBookingWindow(cell.key);
                      const status = slotCount > 0 ? "available" : hasBookedSlot ? "booked" : "empty";

                      return (
                        <button
                          key={cell.key}
                          type="button"
                          disabled={isOutsideWindow}
                          onClick={() => handleSelectDate(cell.key)}
                          aria-label={`${formatDayLabel(cell.key)}. ${statusCopy(slotCount, hasBookedSlot)}.`}
                          className={`booking-day booking-day-${status}${isSelected ? " is-selected" : ""}${
                            cell.isCurrentMonth ? "" : " is-adjacent-month"
                          }${isToday ? " is-today" : ""}`}
                        >
                          <span>{cell.date.getDate()}</span>
                          {slotCount > 0 && <strong>{slotCount}</strong>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="booking-calendar-legend" aria-label="Calendar legend">
                    <span><i style={{ background: "#6f8f64" }} /> Available</span>
                    <span><i style={{ background: "#b85b50" }} /> Fully booked</span>
                    <span><i style={{ background: "#c7c0b5" }} /> No slots</span>
                  </div>
                </div>

                <div className="booking-day-panel">
                  <span className="section-label" style={{ letterSpacing: "0.2em" }}>
                    Selected day
                  </span>
                  <h3 className="font-serif" style={{ fontSize: "1.65rem", marginTop: "0.55rem", marginBottom: "0.4rem" }}>
                    {formatDayLabel(selectedDateKey)}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {statusCopy(selectedDaySlots.length, selectedDayHasBookedSlots)}
                  </p>

                  {slots.length === 0 && !selectedDayHasBookedSlots && (
                    <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                      No sessions are currently available. Please check back soon.
                    </p>
                  )}

                  {selectedDaySlots.length === 0 && selectedDayHasBookedSlots && (
                    <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                      Every released session time for this date has already been booked.
                    </p>
                  )}

                  {selectedDaySlots.length === 0 && !selectedDayHasBookedSlots && slots.length > 0 && (
                    <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                      Choose a green date to see available session times.
                    </p>
                  )}

                  {selectedDaySlots.length > 0 && (
                    <div className="booking-slot-scroll">
                      {selectedDaySlots.map((slot) => {
                        const isActive = selectedSlotId === slot.id;
                        return (
                          <button
                            type="button"
                            key={slot.id}
                            onClick={() => {
                              setSelectedSlotId(slot.id);
                              setSubmitError(null);
                            }}
                            className={`booking-slot-button${isActive ? " is-active" : ""}`}
                          >
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.2rem" }}>
                              <span>{formatTimeRange(slot.start, slot.end)}</span>
                              <span style={{ fontSize: "0.8rem", opacity: 0.8, fontWeight: 400 }}>
                                Local: {getLocalTimeContext(slot.start, slot.end)}
                              </span>
                            </div>
                            <small>{isActive ? "Selected" : "Available"}</small>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "clamp(1.25rem, 3vw, 2rem)",
              boxShadow: "0 24px 60px rgba(73, 55, 35, 0.06)",
            }}
          >
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 2.65rem)", marginBottom: "0.75rem" }}>
              Book Selected Slot
            </h2>

            {selectedSlot ? (
              <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem", lineHeight: 1.65 }}>
                {formatDayLabel(selectedSlot.start)} at {formatTimeRange(selectedSlot.start, selectedSlot.end)}
                <br />
                <span style={{ fontSize: "0.85em", opacity: 0.85 }}>Local: {getLocalTimeContext(selectedSlot.start, selectedSlot.end)}</span>
              </p>
            ) : (
              <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem", lineHeight: 1.65 }}>
                Select a green day and time to continue.
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
                  borderRadius: "6px",
                  padding: "0.9rem 1rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                }}
              />

              <input
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (submitError && submitError.includes("email")) {
                    setSubmitError(null);
                  }
                }}
                required
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "0.9rem 1rem",
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
                  borderRadius: "6px",
                  padding: "0.9rem 1rem",
                  background: "var(--bg)",
                  color: "var(--text)",
                  resize: "vertical",
                }}
              />

              {submitError && (
                <p style={{ color: "#b83a3a", fontWeight: 600 }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedSlotId}
                className="btn-primary"
                style={{ width: "100%" }}
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>

            {result && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(125, 139, 111, 0.35)",
                  background: "rgba(125, 139, 111, 0.1)",
                }}
              >
                <p style={{ marginBottom: "0.4rem", color: "var(--text-heading)", fontWeight: 600 }}>
                  Booking request sent. Awaiting approval.
                </p>
                {result.start && result.end && (
                  <p style={{ color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                    {formatDayLabel(result.start)} at {formatTimeRange(result.start, result.end)}
                    <br />
                    <span style={{ fontSize: "0.85em", opacity: 0.85 }}>Local: {getLocalTimeContext(result.start, result.end)}</span>
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

            {/* Direct Message Inquiry Box */}
            <BookingMessageBox />
          </div>
        </div>
      </div>
    </section>
  );
}
