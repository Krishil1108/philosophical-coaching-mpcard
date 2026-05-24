import { NextResponse } from "next/server";
import { listBookingCalendar } from "@/app/lib/googleCalendar";

export async function GET() {
  try {
    const calendar = await listBookingCalendar();
    return NextResponse.json(calendar);
  } catch (error) {
    console.error("Failed to fetch booking slots", error);
    return NextResponse.json(
      { error: "Unable to load available booking slots right now." },
      { status: 500 },
    );
  }
}
