import { NextResponse } from "next/server";
import { approveSlot } from "@/app/lib/googleCalendar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slotId = searchParams.get("slotId");

  if (!slotId) {
    return new NextResponse("Missing slotId", { status: 400 });
  }

  try {
    const booking = await approveSlot(slotId);
    
    // Return a styled HTML success page
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Approved</title>
          <style>
            body { font-family: sans-serif; background: #fdfdfc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #333; }
            .card { background: white; padding: 40px; border-radius: 12px; border: 1px solid #eaeaea; box-shadow: 0 10px 40px rgba(0,0,0,0.03); text-align: center; max-width: 500px; }
            h1 { color: #8b6b4a; margin-top: 0; margin-bottom: 15px; }
            a { display: inline-block; margin-top: 25px; color: white; background: #8b6b4a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Booking Approved!</h1>
            <p>The session has been finalized. A Google Meet link has been generated and calendar invites have been sent to you and the client.</p>
            <a href="${booking.htmlLink}" target="_blank">View on Google Calendar</a>
          </div>
        </body>
      </html>
    `;
    
    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  } catch (error: any) {
    console.error("Failed to approve slot", error);
    return new NextResponse(`Error approving slot: ${error.message}`, { status: 500 });
  }
}
