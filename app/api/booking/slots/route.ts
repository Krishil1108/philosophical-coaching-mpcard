import { NextResponse } from "next/server";
import { listAvailableSlots } from "@/app/lib/googleCalendar";

export async function GET() {
  try {
    const slots = await listAvailableSlots();
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Failed to fetch booking slots", error);
    return NextResponse.json(
      { error: "Unable to load available booking slots right now." },
      { status: 500 },
    );
  }
}
