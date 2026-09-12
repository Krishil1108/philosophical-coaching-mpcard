import { Resend } from "resend";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error("❌ RESEND_API_KEY is missing from environment.");
  process.exit(1);
}

const resend = new Resend(apiKey);
const rawOwnerEmail = process.env.BOOKING_OWNER_EMAIL || "qs65c6l18@mozmail.com";
const ownerEmails = rawOwnerEmail.split(",").map((e) => e.trim()).filter(Boolean);
const ownerEmailTarget = ownerEmails.length === 1 ? ownerEmails[0] : ownerEmails;

async function testAllResendFlows() {
  console.log("🚀 Starting Resend API key verification tests...\n");

  // Test 1: Contact Form Email Flow
  console.log("1️⃣ Testing Contact Form Email Flow...");
  try {
    const contactResult = await resend.emails.send({
      from: "Philosophical Coaching <bookings@updates.philosophical-practice.com>",
      to: ownerEmailTarget,
      replyTo: "test.visitor@example.com",
      subject: "[General Inquiry] Test Message from Visitor (test.visitor@example.com)",
      text: "Inquiry Topic: General Inquiry\nFrom: Test Visitor\nEmail: test.visitor@example.com\n\nMessage:\nTesting Resend contact form delivery.",
    });

    if (contactResult.error) {
      console.error("❌ Contact Form Test Failed:", contactResult.error.message);
    } else {
      console.log("✅ Contact Form Test Passed! Email ID:", contactResult.data?.id);
    }
  } catch (err) {
    console.error("❌ Contact Form Test Error:", err);
  }

  // Test 2: New Booking Request Notification Email Flow
  console.log("\n2️⃣ Testing New Booking Request Email Flow...");
  try {
    const bookingResult = await resend.emails.send({
      from: "Philosophical Coaching <bookings@updates.philosophical-practice.com>",
      to: ownerEmailTarget,
      subject: "Action Required: New Booking Request (Verification Test)",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #8b6b4a;">New Booking Request</h2>
          <p>A new client has requested a session.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> Test Client</p>
            <p><strong>Email:</strong> testclient@example.com</p>
            <p><strong>Notes:</strong> Resend API test run</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    if (bookingResult.error) {
      console.error("❌ Booking Notification Test Failed:", bookingResult.error.message);
    } else {
      console.log("✅ Booking Notification Test Passed! Email ID:", bookingResult.data?.id);
    }
  } catch (err) {
    console.error("❌ Booking Notification Test Error:", err);
  }

  // Test 3: Booking Rejection Email Flow
  console.log("\n3️⃣ Testing Booking Rejection Email Flow...");
  try {
    const rejectionResult = await resend.emails.send({
      from: "Philosophical Coaching <bookings@updates.philosophical-practice.com>",
      to: ownerEmailTarget, // Sending to owner email for testing safety
      subject: "Update regarding your Philosophical Coaching session (Verification Test)",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #8b6b4a;">Session Update</h2>
          <p>Dear Test Client,</p>
          <p>Thank you so much for reaching out and requesting a philosophical coaching session.</p>
          <p>Unfortunately, I am unable to accommodate your requested time slot.</p>
          <p style="margin-top: 20px;">If you would like to explore other available times, please feel free to check the calendar on my website again.</p>
          <p>Warm regards,<br/><br/><strong>Michael Picard</strong><br/>Philosophical Practice</p>
        </div>
      `,
    });

    if (rejectionResult.error) {
      console.error("❌ Booking Rejection Test Failed:", rejectionResult.error.message);
    } else {
      console.log("✅ Booking Rejection Test Passed! Email ID:", rejectionResult.data?.id);
    }
  } catch (err) {
    console.error("❌ Booking Rejection Test Error:", err);
  }

  console.log("\n🎉 Resend API Verification Completed.");
}

testAllResendFlows();
