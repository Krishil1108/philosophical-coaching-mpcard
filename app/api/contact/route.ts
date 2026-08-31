import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Philosophical Coaching <bookings@updates.philosophical-practice.com>",
      to: "michael@philosophicalcoaching.com",
      replyTo: email,
      subject: `New Contact Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
