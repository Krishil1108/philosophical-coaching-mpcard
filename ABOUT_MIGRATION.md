# About Page Content Migration to Sanity — Complete Setup

## What Has Been Done

✅ **About Page Schema Extended** in Sanity with 40+ fields matching all website content
✅ **Page Component Wired** to fetch from Sanity (`app/about/page.tsx`)
✅ **About Component Updated** with fallback values for each field (`app/components/About.tsx`)
✅ **GROQ Query Complete** with all About fields (`app/lib/queries.ts`)
✅ **Seed Data Created** with all hardcoded values from website (`sanity-data/about-content.json`)
✅ **Seeding Scripts Provided** to import data into Sanity

## Current State

The About page is now **wired to read from Sanity**, but the data hasn't been imported yet. Currently:
- The page fetches from Sanity's `about` document
- If no data exists in Sanity, it falls back to hardcoded defaults
- All hardcoded content is preserved in the fallback values

## What's in the Seed Data

The `sanity-data/about-content.json` file contains:
- **Page Header**: Label, title, subtitle
- **Bio Section**: Opening statement, bio section labels/titles, location
- **Credentials**: Section labels and titles  
- **Education Items**: PhD and MSc from MIT
- **Teaching**: Faculty role at Douglas College
- **Innovation Items**: Café Philosophy founder, Philosophy Sports creator, author
- **Liberation Section**: Full title, 3 paragraphs, 3 cards with symbols and definitions
- **Philosophy Quote**: Quote and attribution
- **Stats**: 20 years experience, 700+ dialogues, Douglas College affiliation

## How to Import the Data

### Option 1: Via Sanity Studio (Manual, Recommended for Testing)

1. Start the dev server: `npm run dev`
2. Go to `http://localhost:3000/studio`
3. Click **About** in the left sidebar
4. You'll see empty fields — fill them from `sanity-data/about-content.json`
5. Hit **Publish**

### Option 2: Via Sanity CLI

```bash
# First, ensure you have .env.local with:
# NEXT_PUBLIC_SANITY_PROJECT_ID=your-id
# NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_TOKEN=your-token

npx sanity dataset import sanity-data/about-content.json --replace
```

### Option 3: Via Seed Script

```bash
# Set these environment variables, then run:
export NEXT_PUBLIC_SANITY_PROJECT_ID=your-id
export NEXT_PUBLIC_SANITY_DATASET=production
export SANITY_API_TOKEN=your-token

npm run seed:about
```

## How the Data Flows

```
Sanity Studio (http://localhost:3000/studio)
  ↓ content saved to
Sanity Cloud
  ↓ fetched via aboutQuery
app/lib/queries.ts
  ↓ used by
app/about/page.tsx (server component)
  ↓ passed to
app/components/About.tsx (client component)
  ↓ renders with fallbacks if Sanity data empty
```

## Verification

After importing the seed data, you can verify it by:

1. **In Sanity Studio**: Go to `/studio` → **About** → should see all fields populated
2. **On Website**: Visit `/about` → should see the same content as before (now from Sanity)
3. **In Browser Console**: Check Network tab → you'll see the GROQ query fetching from Sanity's API

## Next Steps

Once this About content is in Sanity, you can:
- **Edit any field** from the Studio and see changes instantly on the live site
- **No more hardcoded values** — all content is CMS-managed
- **Extend to other pages** using the same pattern (home, services, contact, videos, publications)

## Files Changed

- `package.json` — added `seed:about` script and `tsx` + `dotenv` dev dependencies
- `scripts/seed-about-api.ts` — API-based seeding script
- `scripts/seed-about.ts` — Alternative seeding approach (uses next-sanity client)
- `sanity-data/about-content.json` — Seed data export
- `sanity-data/README.md` — Seeding documentation

## Notes

- The hardcoded fallback values in `About.tsx` remain in place as a safety net
- If Sanity returns data, it takes priority over fallbacks
- The seed data ID is `michael-picard` (can be changed if needed)
- All field names in the seed match the `about` schema in `schemaTypes/about.ts`
