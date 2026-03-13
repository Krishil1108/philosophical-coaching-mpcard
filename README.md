<div align="center">

```
██████╗ ██╗  ██╗██╗██╗      ██████╗ ███████╗ ██████╗ ██████╗ ██╗  ██╗██╗ ██████╗ █████╗ ██╗
██╔══██╗██║  ██║██║██║     ██╔═══██╗██╔════╝██╔═══██╗██╔══██╗██║  ██║██║██╔════╝██╔══██╗██║
██████╔╝███████║██║██║     ██║   ██║███████╗██║   ██║██████╔╝███████║██║██║     ███████║██║
██╔═══╝ ██╔══██║██║██║     ██║   ██║╚════██║██║   ██║██╔═══╝ ██╔══██║██║██║     ██╔══██║██║
██║     ██║  ██║██║███████╗╚██████╔╝███████║╚██████╔╝██║     ██║  ██║██║╚██████╗██║  ██║███████╗
╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝
```

### φ &nbsp;&nbsp; *Where ancient wisdom meets modern practice* &nbsp;&nbsp; φ

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity_v5-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://www.sanity.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

<br/>

> **A luxury dark-editorial web experience for Michael Picard — PhD philosopher, author & practitioner.**
> Built with the Next.js 16 App Router, powered by Sanity CMS, and wrapped in an antique gold aesthetic that reads like a high-end academic journal crossed with a luxury brand.

<br/>

</div>

---

<div align="center">

## ✦ &nbsp; φ &nbsp; ✦

*"Philosophy is not a doctrine, but an activity."*
— Ludwig Wittgenstein

</div>

---

## ◈ &nbsp; What Is This?

A **full-stack portfolio and booking platform** for a philosophical practitioner offering 1-on-1 coaching, Café Philosophy sessions, Philosophy Sports, and academic publications.

The site is engineered with a strict **near-black + antique gold + white** design system — evoking the weight of classical thought while remaining razor-sharp and modern. Every detail — from the ghost phi (φ) watermark to the fluid `clamp()` typography — is intentional.

---

## ◈ &nbsp; Feature Showcase

| ✦ | Feature | Details |
|---|---|---|
| 🎨 | **Luxury Design System** | Near-black `#0d0f14` + antique gold `#c9a84c` with a 4-variant button system |
| ⚡ | **React Server Components** | Next.js 16 App Router with ISR — Sanity content refreshes every 60s, zero rebuilds |
| 🖋️ | **Editorial Typography** | Cinzel · DM Serif Display · Space Grotesk · Cormorant Garamond |
| 🎭 | **Framer Motion Animations** | Glassmorphism navbar, animated mobile menu, card lift effects |
| 📱 | **Fully Responsive** | Fluid `clamp()` typography, mobile-first at 768px & 1024px breakpoints |
| 🔮 | **Embedded CMS Studio** | Sanity Studio lives at `/studio` — edit everything from a browser, no separate deployment |
| 🖼️ | **Image Carousel** | Swiper.js powered gallery with gold-themed pagination & navigation |
| 🎥 | **YouTube Integration** | `react-youtube` embeds with live thumbnail previews |
| 🛡️ | **Graceful Degradation** | Falls back to rich hardcoded content if CMS is unconfigured |
| 📜 | **Signature Details** | Ghost φ watermark · gold text gradient · vertical section labels · custom gold scrollbar |

---

## ◈ &nbsp; Pages & Routes

```
app/
├── /                    →  Home          Hero · Stats · Contents Index · Featured Quote
├── /about               →  About         Bio · Credentials · Philosophy Quote · Stats
├── /services            →  Services      1-on-1 Coaching · Café Philosophy · Philosophy Sports
├── /practice            →  The Practice  Socratic Inquiry · Semantic Analysis · Impartial Witness
├── /gallery             →  Gallery       Swiper carousel of sessions & public dialogues
├── /publications        →  Publications  Books, covers, buy links & forthcoming translations
├── /videos              →  Videos        Talks · Demos · Café Philosophy · Philosophy Sports
├── /contact             →  Contact       Booking details & direct links
└── /studio/[[...tool]]  →  CMS Studio    Full embedded Sanity Studio (admin catch-all route)
```

---

## ◈ &nbsp; Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| **Framework** | Next.js 16 · App Router | Server Components, ISR, file-based routing |
| **Language** | TypeScript 5 | End-to-end type safety across all components |
| **Styling** | Tailwind CSS v4 | Utility-first with custom CSS design tokens |
| **CMS** | Sanity v5 | Embedded Studio, GROQ queries, CDN-served images |
| **Animation** | Framer Motion 12 | Navbar entry, mobile menu, scroll-aware effects |
| **Carousel** | Swiper 12 | Gallery with custom gold-themed pagination |
| **Video** | react-youtube | YouTube embeds with thumbnail preview |
| **Images** | @sanity/image-url | CDN-optimised, hotspot-aware image transforms |

</div>

---

## ◈ &nbsp; Design System

### Color Palette

| Swatch | Variable | Hex | Usage |
|:---:|---|:---:|---|
| ![](https://img.shields.io/badge/■■■-0d0f14?style=flat-square) | `--bg` | `#0d0f14` | Primary page background |
| ![](https://img.shields.io/badge/■■■-141720?style=flat-square) | `--bg-card` | `#141720` | Cards, stats bar, mobile menu |
| ![](https://img.shields.io/badge/■■■-1c2030?style=flat-square) | `--bg-muted` | `#1c2030` | Hover states |
| ![](https://img.shields.io/badge/■■■-c9a84c?style=flat-square) | `--gold` | `#c9a84c` | Primary accent — buttons, borders, icons |
| ![](https://img.shields.io/badge/■■■-e6c96a?style=flat-square) | `--gold-light` | `#e6c96a` | Gold gradient highlight end |
| ![](https://img.shields.io/badge/■■■-a68832?style=flat-square) | `--gold-dark` | `#a68832` | Gold gradient shadow, scrollbar thumb |
| ![](https://img.shields.io/badge/■■■-e8e6e1?style=flat-square) | `--text` | `#e8e6e1` | Body text (warm off-white) |
| ![](https://img.shields.io/badge/■■■-9a97a0?style=flat-square) | `--text-muted` | `#9a97a0` | Secondary / subdued text |

### Typography Stack

```
Cinzel              →  Logo · Numbered labels · Decorative display headings
DM Serif Display    →  All h1–h6 · Major section headings
Space Grotesk       →  Body copy · UI labels · Navigation links · Captions
Cormorant Garamond  →  Pull quotes · Blockquotes · Italic display text
```

---

## ◈ &nbsp; CMS Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  SANITY STUDIO  (/studio)                    │
│   Hero · About · Services · Gallery · Videos                │
│   Publications · Testimonials · Site Settings               │
└──────────────────────────┬──────────────────────────────────┘
                           │  content saved to cloud
                           ▼
┌─────────────────────────────────────────────────────────────┐
│            SANITY CLOUD  (cdn.sanity.io)                     │
│        Project: Philosophical Practice                      │
│        Dataset: production  ·  ISR revalidate: 60s         │
└──────────────────────────┬──────────────────────────────────┘
                           │  GROQ queries  (app/lib/queries.ts)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│          NEXT.JS SERVER COMPONENTS                          │
│   app/page.tsx · /about · /services · /gallery · …         │
└──────────────────────────┬──────────────────────────────────┘
                           │  typed props
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  REACT COMPONENTS                           │
│  Hero · About · Services · ImageCarousel · VideoSection     │
│  Publications · Testimonials · CTABanner · Navbar · Footer  │
└─────────────────────────────────────────────────────────────┘
```

---

## ◈ &nbsp; Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity](https://sanity.io) account (free forever)

### 1 · Clone & Install

```bash
git clone https://github.com/Krishil1108/philosophical-coaching-mpcard.git
cd philosophical-coaching-mpcard
npm install
```

### 2 · Configure Environment

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

> Get your Project ID from [sanity.io/manage](https://sanity.io/manage) → your project → Settings → API

### 3 · Add CORS Origin

Sanity dashboard → **API → CORS Origins** → add `http://localhost:3000`

### 4 · Run

```bash
npm run dev
```

| URL | What you get |
|---|---|
| `http://localhost:3000` | The live site |
| `http://localhost:3000/studio` | Sanity CMS editor |

> See [`SANITY_SETUP.md`](./SANITY_SETUP.md) for the full step-by-step CMS content guide.

---

## ◈ &nbsp; Project Structure

```
philosophy-coaching/
│
├── app/
│   ├── components/              # All reusable UI components
│   │   ├── Navbar.tsx           # Glassmorphism + Framer Motion animated nav
│   │   ├── Footer.tsx           # 3-col grid + phi watermark + scroll-to-top
│   │   ├── Hero.tsx             # Hero section component
│   │   ├── About.tsx            # Bio, portrait, credentials, stats
│   │   ├── Services.tsx         # Service cards with featured highlight
│   │   ├── ImageCarousel.tsx    # Swiper.js gallery with gold pagination
│   │   ├── VideoSection.tsx     # YouTube video embeds
│   │   ├── Publications.tsx     # Book grid with buy links
│   │   ├── Testimonials.tsx     # Client quote cards
│   │   ├── CTABanner.tsx        # Full-width call to action
│   │   ├── PageHeader.tsx       # Reusable page heading with breadcrumb
│   │   ├── PhilosophySection.tsx# Methodology content block
│   │   └── SiteLayout.tsx       # Root layout: Navbar + children + Footer
│   │
│   ├── lib/
│   │   ├── sanity.ts            # Client · urlFor() · hasSanityConfig()
│   │   └── queries.ts           # 7 GROQ queries (one per content type)
│   │
│   ├── studio/[[...tool]]/      # Embedded Sanity Studio (catch-all)
│   ├── about/                   # /about page
│   ├── services/                # /services page
│   ├── practice/                # /practice page
│   ├── gallery/                 # /gallery page
│   ├── publications/            # /publications page
│   ├── videos/                  # /videos page
│   ├── contact/                 # /contact page
│   ├── globals.css              # Design tokens + utility classes
│   ├── layout.tsx               # Root layout + Google Fonts
│   └── page.tsx                 # Home — ISR 60s revalidation
│
├── schemaTypes/                 # Sanity CMS schema definitions
│   ├── hero.ts
│   ├── about.ts
│   ├── service.ts
│   ├── galleryImage.ts
│   ├── youtubeVideo.ts
│   ├── publication.ts
│   ├── testimonial.ts
│   └── siteSettings.ts
│
├── sanity.config.ts             # Sanity Studio config + plugins
├── SANITY_SETUP.md              # Full CMS setup & content guide
└── next.config.ts               # Image domains + Next.js config
```

---

## ◈ &nbsp; CMS Content Types

<div align="center">

| Type | Kind | Key Fields |
|---|:---:|---|
| `hero` | Singleton | Headline, subheadline, CTA buttons, background image, quote |
| `about` | Singleton | Portrait, bio (rich text), credentials array, stats, philosophy quote |
| `siteSettings` | Singleton | Title, tagline, email, phone, social links |
| `service` | Repeating | Title, icon, description, price, duration, features list, CTA, `order` |
| `galleryImage` | Repeating | Image (hotspot), caption, alt text, `order` |
| `youtubeVideo` | Repeating | Title, video ID, description, `order` |
| `publication` | Repeating | Title, year, publisher, cover image, description, buy link, `order` |
| `testimonial` | Repeating | Quote, author, role, `order` |

</div>

---

<div align="center">

## ✦ &nbsp; φ &nbsp; ✦

*"The unexamined life is not worth living."*
— Socrates

<br/>

Built with care by **[Krishil](https://github.com/Krishil1108)** &nbsp;·&nbsp; Designed for **Michael Picard, PhD**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=flat-square&logo=sanity&logoColor=white)](https://sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>
