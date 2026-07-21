import type { Metadata } from "next";
import "./globals.css";
import { RootLayoutClient } from "./RootLayoutClient";

export const metadata: Metadata = {
  title: "Michael Picard — Philosophical Coaching",
  description: "Think deeper. Live wiser. One-on-one philosophical coaching, Café Philosophy, and Philosophy Sports with Michael Picard, PhD (MIT).",
  keywords: ["philosophical coaching", "philosophy", "Michael Picard", "neo-socratic inquiry", "critical thinking", "café philosophy"],
  icons: {
    icon: [
      { url: '/icon.png?v=4', type: 'image/png' },
    ],
    shortcut: '/icon.png?v=4',
    apple: '/icon.png?v=4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
