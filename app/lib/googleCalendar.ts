import { randomUUID } from "node:crypto";
import { google } from "googleapis";
import { Resend } from "resend";

export interface BookingSlot {
  id: string;
  title: string;
  start: string;
  end: string;
}

export interface BookingCalendar {
  slots: BookingSlot[];
  bookedSlotStarts: string[];
  windowStart: string;
  windowEnd: string;
}

interface BookingInput {
  slotId: string;
  name: string;
  email: string;
  notes?: string;
  baseUrl?: string;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getCalendarClient() {
  const clientId = getRequiredEnv("GOOGLE_CLIENT_ID");
  const clientSecret = getRequiredEnv("GOOGLE_CLIENT_SECRET");
  const refreshToken = getRequiredEnv("GOOGLE_REFRESH_TOKEN");

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return google.calendar({ version: "v3", auth: oauth2Client });
}

function getConfig() {
  return {
    calendarId: getRequiredEnv("GOOGLE_CALENDAR_ID"),
    timezone: process.env.BOOKING_TIMEZONE || "America/Vancouver",
    marker: process.env.BOOKING_SLOT_MARKER || "[AVAILABLE]",
    windowDays: Number(process.env.BOOKING_WINDOW_DAYS || 45),
    hostName: process.env.BOOKING_HOST_NAME || "Michael Picard",
  };
}

function eventIsAvailable(
  summary: string | null | undefined,
  attendees: Array<{ email?: string | null }> | null | undefined,
  marker: string,
) {
  const summaryText = summary || "";
  const hasMarker = summaryText.includes(marker);
  const hasAttendees = (attendees || []).some((attendee) => Boolean(attendee.email));
  return hasMarker && !hasAttendees;
}

function eventIsBookedSlot(
  summary: string | null | undefined,
  attendees: Array<{ email?: string | null }> | null | undefined,
  description: string | null | undefined,
  marker: string,
  hostName: string,
) {
  const summaryText = summary || "";
  const hasAttendees = (attendees || []).some((attendee) => Boolean(attendee.email));
  const wasMarkedSlot = summaryText.includes(marker);
  const wasBookedBySite =
    summaryText.startsWith(`Session with ${hostName}`) &&
    Boolean(description?.includes("--- Booking details ---"));

  return hasAttendees && (wasMarkedSlot || wasBookedBySite);
}

export async function listBookingCalendar(): Promise<BookingCalendar> {
  const calendar = getCalendarClient();
  const { calendarId, windowDays, marker, hostName } = getConfig();

  const now = new Date();
  const windowEnd = new Date(now);
  windowEnd.setDate(windowEnd.getDate() + windowDays);

  const response = await calendar.events.list({
    calendarId,
    singleEvents: true,
    orderBy: "startTime",
    timeMin: now.toISOString(),
    timeMax: windowEnd.toISOString(),
    maxResults: 250,
  });

  const events = response.data.items || [];
  const slots: BookingSlot[] = [];
  const bookedSlotStarts: string[] = [];

  for (const event of events) {
    if (!event.id || !event.start?.dateTime || !event.end?.dateTime) continue;

    if (eventIsAvailable(event.summary, event.attendees, marker)) {
      slots.push({
        id: event.id as string,
        title: (event.summary || "Available session").replace(marker, "").trim(),
        start: event.start.dateTime,
        end: event.end.dateTime,
      });
      continue;
    }

    if (eventIsBookedSlot(event.summary, event.attendees, event.description, marker, hostName)) {
      bookedSlotStarts.push(event.start.dateTime);
    }
  }

  return {
    slots,
    bookedSlotStarts,
    windowStart: now.toISOString(),
    windowEnd: windowEnd.toISOString(),
  };
}

export async function listAvailableSlots(): Promise<BookingSlot[]> {
  const calendar = await listBookingCalendar();
  return calendar.slots;
}

export async function requestSlotBooking(input: BookingInput) {
  const calendar = getCalendarClient();
  const { calendarId, marker, hostName } = getConfig();

  const existing = await calendar.events.get({
    calendarId,
    eventId: input.slotId,
  });

  const event = existing.data;
  if (!event.id || !event.start?.dateTime || !event.end?.dateTime) {
    throw new Error("Selected slot is no longer valid.");
  }

  if (!eventIsAvailable(event.summary, event.attendees, marker)) {
    throw new Error("Selected slot has already been booked.");
  }

  const cleanTitle = (event.summary || "Available session").replace(marker, "").trim();

  const patch = await calendar.events.patch({
    calendarId,
    eventId: event.id,
    requestBody: {
      summary: `[PENDING] Session with ${hostName}${cleanTitle ? ` - ${cleanTitle}` : ""}`,
      description: [
        event.description || "",
        "",
        "--- Booking details ---",
        `Client: ${input.name}`,
        `Email: ${input.email}`,
        `Notes: ${input.notes?.trim() || "No notes provided."}`,
      ]
        .filter(Boolean)
        .join("\n"),
    },
  });

  // Send email via Resend to the owner
  const resend = new Resend(process.env.RESEND_API_KEY);
  const baseUrl = input.baseUrl || "http://localhost:3000";
  const approveUrl = `${baseUrl}/api/booking/approve?slotId=${event.id}`;
  const ownerEmail = process.env.BOOKING_OWNER_EMAIL || "michael@philosophicalcoaching.com";

  await resend.emails.send({
    from: "Philosophical Coaching <onboarding@resend.dev>",
    to: ownerEmail,
    subject: "Action Required: New Booking Request",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #8b6b4a;">New Booking Request</h2>
        <p>A new client has requested a session. Please approve it to finalize the booking and send them the Google Meet link.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Notes:</strong> ${input.notes || "None"}</p>
          <p><strong>Time:</strong> ${new Date(event.start.dateTime).toLocaleString()}</p>
        </div>
        <a href="${approveUrl}" style="background-color: #8b6b4a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Approve Booking</a>
      </div>
    `,
  });

  return { status: "pending" };
}

export async function approveSlot(slotId: string) {
  const calendar = getCalendarClient();
  const { calendarId, timezone } = getConfig();

  const existing = await calendar.events.get({
    calendarId,
    eventId: slotId,
  });

  const event = existing.data;
  if (!event.id || !event.start?.dateTime || !event.end?.dateTime) {
    throw new Error("Selected slot is no longer valid.");
  }

  // Find client email from the description
  const desc = event.description || "";
  const emailMatch = desc.match(/Email:\s*([^\s]+)/);
  const clientEmail = emailMatch ? emailMatch[1] : null;

  if (!clientEmail) {
    throw new Error("Could not find client email in the event description.");
  }

  const cleanTitle = (event.summary || "").replace("[PENDING] ", "");
  const ownerEmail = process.env.BOOKING_OWNER_EMAIL;
  const attendees = ownerEmail
    ? [{ email: clientEmail }, { email: ownerEmail }]
    : [{ email: clientEmail }];

  const patch = await calendar.events.patch({
    calendarId,
    eventId: event.id,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: cleanTitle,
      attendees,
      start: {
        dateTime: event.start.dateTime,
        timeZone: event.start.timeZone || timezone,
      },
      end: {
        dateTime: event.end.dateTime,
        timeZone: event.end.timeZone || timezone,
      },
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  const updated = patch.data;
  const meetLink =
    updated.hangoutLink ||
    updated.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri ||
    null;

  return {
    id: updated.id,
    start: updated.start?.dateTime,
    end: updated.end?.dateTime,
    meetLink,
    htmlLink: updated.htmlLink,
  };
}
