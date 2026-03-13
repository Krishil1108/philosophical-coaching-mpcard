import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Picard — Philosophical Coaching",
  description: "Think deeper. Live wiser. One-on-one philosophical coaching, Café Philosophy, and Philosophy Sports with Michael Picard, PhD (MIT).",
  keywords: ["philosophical coaching", "philosophy", "Michael Picard", "Socratic inquiry", "critical thinking", "café philosophy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
