# Sanity Seed Data

This directory contains seed/initial data for Sanity CMS documents.

## About Content

The `about-content.json` file contains all the hardcoded content from the website's About page, structured to match the Sanity `about` schema.

### To import this data:

**Option 1: Via Sanity CLI (Recommended)**

```bash
# Make sure you have Sanity credentials in .env.local
npx sanity dataset import sanity-data/about-content.json
```

**Option 2: Via the Sanity Studio UI**

1. Navigate to `http://localhost:3000/studio`
2. In the left sidebar, click on **About**
3. Manually create/update the document with fields from `about-content.json`

**Option 3: Via the seed script**

```bash
# Requires these environment variables set:
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

npm run seed:about
```

## Notes

- All field values match the currently hardcoded defaults in `app/components/About.tsx`
- The document ID is `michael-picard` and type is `about`
- After importing, the website will fetch this data from Sanity instead of using hardcoded fallbacks
