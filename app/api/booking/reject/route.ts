import { NextResponse } from "next/server";
import { rejectSlot } from "@/app/lib/googleCalendar";

export async function POST(request: Request) {
  try {
    const { slotId, comment } = await request.json();

    if (!slotId) {
      return NextResponse.json({ error: "Missing slotId" }, { status: 400 });
    }

    await rejectSlot(slotId, comment);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to reject slot", error);
    return NextResponse.json({ error: error.message || "Failed to reject slot" }, { status: 500 });
  }
}
