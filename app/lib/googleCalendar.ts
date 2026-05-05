import { randomUUID } from "node:crypto";
import { google } from "googleapis";

export interface BookingSlot {
  id: string;
  title: string;
  start: string;
  end: string;
}

interface BookingInput {
  slotId: string;
  name: string;
  email: string;
  notes?: string;
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

export async function listAvailableSlots(): Promise<BookingSlot[]> {
  const calendar = getCalendarClient();
  const { calendarId, windowDays, marker } = getConfig();

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

  return events
    .filter((event) => {
      if (!event.id || !event.start?.dateTime || !event.end?.dateTime) return false;
      return eventIsAvailable(event.summary, event.attendees, marker);
    })
    .map((event) => ({
      id: event.id as string,
      title: (event.summary || "Available session").replace(marker, "").trim(),
      start: event.start?.dateTime as string,
      end: event.end?.dateTime as string,
    }));
}

export async function bookSlot(input: BookingInput) {
  const calendar = getCalendarClient();
  const { calendarId, marker, timezone, hostName } = getConfig();

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

  const clean Title = (event.summary || "Available session").replace(marker, "").trim();
  const ownerEmail = process.env.BOOKING_OWNER_EMAIL;
  const attendees = ownerEmail
    ? [{ email: input.email }, { email: ownerEmail }]
    : [{ email: input.email }];

  const patch = await calendar.events.patch({
    calendarId,
    eventId: event.id,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Session with ${hostName}${cleanTitle ? ` - ${cleanTitle}` : ""}`,
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
