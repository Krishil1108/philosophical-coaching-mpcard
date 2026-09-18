import type { Metadata } from "next";
import "./globals.css";
import { RootLayoutClient } from "./RootLayoutClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.philosophical-practice.com"),
  title: {
    default: "Michael Picard, PhD — Philosophical Practice & Coaching",
    template: "%s | Michael Picard, PhD",
  },
  description:
    "Think deeper. Live wiser. One-on-one philosophical coaching, Café Philosophy, and Philosophy Sports with Michael Picard, PhD (MIT).",
  keywords: [
    "philosophical coaching",
    "philosophy as counsel",
    "Michael Picard",
    "neo-socratic inquiry",
    "critical thinking",
    "Café Philosophy",
    "Philosophy Sports",
    "philosophical practitioner",
    "existential coaching",
    "dialogue and inquiry",
  ],
  authors: [{ name: "Michael Picard, PhD", url: "https://www.philosophical-practice.com" }],
  creator: "Michael Picard, PhD",
  publisher: "Michael Picard, PhD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.philosophical-practice.com",
    siteName: "Michael Picard — Philosophical Practice",
    title: "Michael Picard, PhD — Philosophical Practice & Coaching",
    description:
      "Examine the language behind your beliefs. One-on-one philosophical coaching, Café Philosophy, and public symposiums with Michael Picard, PhD.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Michael Picard, PhD — Philosophical Practice & Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Picard, PhD — Philosophical Practice & Coaching",
    description:
      "Examine the language behind your beliefs. One-on-one philosophical coaching, Café Philosophy, and public symposiums with Michael Picard, PhD.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png?v=4", type: "image/png" }],
    shortcut: "/icon.png?v=4",
    apple: "/icon.png?v=4",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.philosophical-practice.com/#person",
      name: "Michael Picard",
      jobTitle: "Philosophical Practitioner & Educator",
      honorificSuffix: "PhD",
      alumniOf: "Massachusetts Institute of Technology (MIT)",
      url: "https://www.philosophical-practice.com",
      image: "https://www.philosophical-practice.com/og-image.png",
      description:
        "Michael Picard, PhD, is an author, educator, and philosophical practitioner specializing in Neo-Socratic dialogue, Café Philosophy, and philosophical coaching.",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.philosophical-practice.com/#service",
      name: "Michael Picard — Philosophical Practice",
      url: "https://www.philosophical-practice.com",
      logo: "https://www.philosophical-practice.com/icon.png",
      image: "https://www.philosophical-practice.com/og-image.png",
      description:
        "One-on-one philosophical coaching, Café Philosophy sessions, and Philosophy Sports with Michael Picard, PhD.",
      founder: {
        "@id": "https://www.philosophical-practice.com/#person",
      },
      areaServed: "Global",
      serviceType: [
        "Philosophical Coaching",
        "Neo-Socratic Dialogue",
        "Café Philosophy",
        "Philosophy Sports",
        "Critical Thinking Facilitation",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
