# Sanity Setup Guide — Michael Picard Philosophy Coaching

## Overview

Sanity is used as the CMS (content management system) for this site. The Studio is embedded directly in the Next.js app at `/studio`. This guide covers everything needed to go from zero to a fully live CMS.

---

## Step 1 — Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage) and sign in (or create a free account)
2. Click **"New project"**
3. Name it something like `philosophy-coaching`
4. Choose the **"Production"** dataset (already the default)
5. After creation, copy your **Project ID** — it looks like `abc123xy`

---

## Step 2 — Set Environment Variables

Open `.env.local` in the project root and replace the placeholder:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id-here   ← replace this
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

> Once this is set, the app will start fetching real data. `hasSanityConfig()` in `app/lib/sanity.ts` checks for this value — if it's still the placeholder, all Sanity fetches are skipped.

---

## Step 3 — Add CORS Origin (for Local Dev)

1. In [sanity.io/manage](https://sanity.io/manage), open your project
2. Go to **API → CORS Origins**
3. Add `http://localhost:3000` (and `http://localhost:3001` if needed)
4. For production, also add your deployed URL (e.g., `https://yourdomain.com`)

---

## Step 4 — Deploy the Studio (Optional)

The Studio is embedded at `/studio` in the Next.js app — no separate deployment is strictly needed. But if you want a standalone Sanity Studio URL:

```bash
npx sanity deploy
```

This will give you a URL like `https://philosophy-coaching.sanity.studio`.

---

## Step 5 — Enter Content in the Studio

Visit `http://localhost:3000/studio` while the dev server is running. You'll see these content types in the left sidebar:

### Singletons (fill in once)

| Document | What to fill in |
|---|---|
| **Hero** | Headline, subheadline, CTA buttons, background image, quote |
| **About** | Name, portrait photo, bio (rich text), credentials, quote, stats |
| **Site Settings** | Site title, tagline, email, phone, social links |
| **Practice Page** | Page header, opening statement/tags, approach quote, methods, CTA section |

### Repeating Content (add as many as needed)

| Document | What to fill in |
|---|---|
| **Service** | Title, icon (emoji), description, price, duration, features, CTA, `order` for sorting |
| **YouTube Video** | Title, video ID (just the `v=...` part of the URL), description, `order` |
| **Publication** | Title, subtitle, year, publisher, cover image, description, buy link, `order` |
| **Testimonial** | Quote, author name, role (e.g., "Philosophy Coaching Client"), `order` |

> **Tip:** The `order` field on all repeating documents controls display order. Use `1, 2, 3...` to set the sequence.

---

## Step 6 — Add a YouTube Video ID

For `youtubeVideo` documents, the `videoId` field expects only the ID portion of the URL:

```
Full URL:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
Video ID:  dQw4w9WgXcQ   ← this is what goes in the field
```

---

## Step 7 — Images

All images uploaded to Sanity are served from `cdn.sanity.io` — already whitelisted in `next.config.ts`. The `urlFor()` helper in `app/lib/sanity.ts` handles building image URLs with transforms (width, height, auto format).

---

## How the Data Flows

```
Sanity Studio (/studio)
       ↓  content saved to
Sanity Cloud (cdn.sanity.io)
       ↓  fetched via GROQ queries in
app/lib/queries.ts
       ↓  used by
app/page.tsx + section components
```

---

## Schema Summary

| Schema Type | File | Type |
|---|---|---|
| `siteSettings` | `schemaTypes/siteSettings.ts` | Singleton |
| `hero` | `schemaTypes/hero.ts` | Singleton |
| `about` | `schemaTypes/about.ts` | Singleton |
| `practicePage` | `schemaTypes/practicePage.ts` | Singleton |
| `service` | `schemaTypes/service.ts` | Repeating |
| `youtubeVideo` | `schemaTypes/youtubeVideo.ts` | Repeating |
| `publication` | `schemaTypes/publication.ts` | Repeating |
| `testimonial` | `schemaTypes/testimonial.ts` | Repeating |

---

## Checklist

- [ ] Created Sanity project at sanity.io/manage
- [ ] Copied Project ID into `.env.local`
- [ ] Added `localhost:3000` to CORS origins
- [ ] Opened `/studio` and can see the Studio UI
- [ ] Filled in Hero content
- [ ] Filled in About content
- [ ] Filled in Site Settings
- [ ] Added at least one Service
- [ ] Added YouTube videos
- [ ] Added Publications
- [ ] Added Testimonials
- [ ] Added production domain to CORS origins before deploying
