import { Resend } from "resend";
import * as dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  const input = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    notes: "I would like to discuss my recent thoughts on existentialism.",
  };
  const eventDateTime = new Date();
  eventDateTime.setDate(eventDateTime.getDate() + 2); // 2 days from now
  const approveUrl = "http://localhost:3000/api/booking/approve?slotId=sample_slot_id_123";
  const rejectUrl = "http://localhost:3000/admin/booking/reject?slotId=sample_slot_id_123";

  // Use the email in .env or fallback
  const ownerEmail = "methexis8@gmail.com";

  console.log(`Attempting to send test email to ${ownerEmail}...`);

  try {
    const { data, error } = await resend.emails.send({
      from: "Philosophical Coaching <bookings@updates.philosophical-practice.com>",
      to: ownerEmail,
      subject: "Action Required: New Booking Request (Sample Preview)",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #8b6b4a;">New Booking Request</h2>
        <p>A new client has requested a session. Please approve it to finalize the booking and send them the Google Meet link, or reject it.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Notes:</strong> ${input.notes || "None"}</p>
            <p><strong>Time:</strong> ${eventDateTime.toLocaleString()}</p>
          </div>
          <div>
            <a href="${approveUrl}" style="background-color: #8b6b4a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-right: 10px;">Approve Booking</a>
            <a href="${rejectUrl}" style="background-color: #f9f9f9; color: #555; padding: 12px 24px; text-decoration: none; border-radius: 6px; border: 1px solid #ddd; display: inline-block; font-weight: bold;">Reject Booking</a>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error.message);
    } else {
      console.log("Success! Email sent with ID:", data?.id);
    }
  } catch (error) {
    console.error("Exception:", error);
  }
}

sendTestEmail();
