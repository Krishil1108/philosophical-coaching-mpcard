import { NextResponse } from "next/server";
import { requestSlotBooking } from "@/app/lib/googleCalendar";

interface BookPayload {
  slotId?: string;
  name?: string;
  email?: string;
  notes?: string;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: BookPayload;

  try {
    payload = (await request.json()) as BookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const slotId = payload.slotId?.trim();
  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const notes = payload.notes?.trim();

  if (!slotId || !name || !email) {
    return NextResponse.json(
      { error: "slotId, name, and email are required." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const booking = await requestSlotBooking({ slotId, name, email, notes, baseUrl });
    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Failed to book slot", error);
    const message = error instanceof Error ? error.message : "Unable to book selected slot.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
