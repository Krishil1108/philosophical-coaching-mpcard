import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, topic, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const receiverEmailRaw = process.env.CONTACT_RECEIVER_EMAIL || process.env.BOOKING_OWNER_EMAIL || "qs65c6l18@mozmail.com";
    const receiverEmails = receiverEmailRaw.split(",").map((e) => e.trim()).filter(Boolean);
    const senderName = name?.trim() || "Visitor";
    const topicLine = topic?.trim() ? `[${topic.trim()}] ` : "";

    const { data, error } = await resend.emails.send({
      from: "Philosophical Coaching <bookings@updates.philosophical-practice.com>",
      to: receiverEmails.length === 1 ? receiverEmails[0] : receiverEmails,
      replyTo: email,
      subject: `${topicLine}New Message from ${senderName} (${email})`,
      text: `Inquiry Topic: ${topic || "General Inquiry"}\nFrom: ${senderName}\nEmail: ${email}\n\nMessage:\n${message}`,
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

