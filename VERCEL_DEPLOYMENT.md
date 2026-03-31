# Vercel Deployment Guide — Philosophy Coaching

Complete guide to deploying the Michael Picard Philosophy Coaching website to Vercel with Sanity CMS integration.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Sanity project is created at [sanity.io/manage](https://sanity.io/manage)
- [ ] Sanity Project ID is copied (you'll need this for environment variables)
- [ ] Local development is working (`npm run dev` successfully runs)
- [ ] Content is added to Sanity Studio at `http://localhost:3000/studio`

---

## 🚀 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1 — Push to GitHub

If your project isn't already on GitHub:

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Philosophy Coaching site"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/philosophy-coaching.git
git branch -M main
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub for seamless integration)
2. Click **"Add New..."** → **"Project"**
3. Import your `philosophy-coaching` repository
4. Vercel will auto-detect Next.js — keep default settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Step 3 — Configure Environment Variables

Before clicking "Deploy", add these environment variables:

| Name | Value | Notes |
|------|-------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `your-actual-project-id` | Get from [sanity.io/manage](https://sanity.io/manage) → your project → Settings |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Default dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | API version for Sanity queries |

> **Important:** All three variables are required. The site won't load Sanity content without them.

### Step 4 — Deploy

1. Click **"Deploy"**
2. Wait 2–3 minutes for the build to complete
3. You'll get a URL like `https://philosophy-coaching-abc123.vercel.app`

---

## 🔧 Method 2: Deploy via Vercel CLI

### Step 1 — Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2 — Login

```bash
vercel login
```

Follow the prompt to authenticate via email or GitHub.

### Step 3 — Deploy

From the project root:

```bash
vercel
```

The CLI will ask:

```
? Set up and deploy "~/philosophy-coaching"? [Y/n] y
? Which scope do you want to deploy to? [Your Name]
? Link to existing project? [y/N] n
? What's your project's name? philosophy-coaching
? In which directory is your code located? ./
```

### Step 4 — Add Environment Variables

After initial deploy, add environment variables:

```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Paste your project ID when prompted

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Enter: production

vercel env add NEXT_PUBLIC_SANITY_API_VERSION
# Enter: 2024-01-01
```

Choose **"Production"** when asked which environments to add to.

### Step 5 — Redeploy with Environment Variables

```bash
vercel --prod
```

This triggers a production build with your environment variables.

---

## 🌐 Post-Deployment Configuration

### 1. Add Production Domain to Sanity CORS

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project
2. Navigate to **API → CORS Origins**
3. Click **"Add CORS origin"**
4. Add your Vercel URL: `https://philosophy-coaching-abc123.vercel.app`
5. Also add your custom domain if you have one (see below)

> **Why?** Sanity requires whitelisted origins for browser-based API requests.

### 2. Add Custom Domain (Optional)

In the Vercel dashboard:

1. Go to your project → **Settings → Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `michaelpicard.com`)
4. Follow DNS setup instructions:
   - **For root domain:** Add an `A` record pointing to Vercel's IP
   - **For subdomain:** Add a `CNAME` record pointing to `cname.vercel-dns.com`

Vercel automatically provisions SSL certificates via Let's Encrypt.

---

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:

| Trigger | Result |
|---------|--------|
| Push to `main` branch | Production deployment |
| Push to other branches | Preview deployment (unique URL) |
| Pull request opened | Automatic preview + comment on PR |

### Manual Redeploy

To redeploy without code changes:

**Via Dashboard:**
1. Go to project → **Deployments**
2. Click ⋯ on latest deployment → **Redeploy**

**Via CLI:**
```bash
vercel --prod
```

---

## 🧪 Testing the Deployment

After deployment, verify:

1. **Site loads:** Visit your Vercel URL
2. **Sanity content appears:** Check that Hero, About, Services, etc. display
3. **Studio works:** Visit `https://your-site.vercel.app/studio`
4. **Images load:** Verify gallery images from `cdn.sanity.io`
5. **YouTube videos work:** Test video embeds in `/videos`

---

## 📊 Environment Variables Reference

All required environment variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy        # Your Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=production         # Dataset name (usually "production")
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01     # API version for GROQ queries
```

> **Note:** The `NEXT_PUBLIC_` prefix makes these available to the browser (required for client-side Sanity Studio).

---

## 🎯 Build Optimization

This project is already optimized for Vercel:

✅ **Incremental Static Regeneration (ISR)** — Content revalidates every 60 seconds  
✅ **React Server Components** — Fast initial page loads  
✅ **Image Optimization** — Next.js Image component with Sanity CDN  
✅ **Automatic Code Splitting** — Per-route bundles  
✅ **Edge Functions** — Deployed globally for low latency  

---

## 🛠️ Troubleshooting

### Issue: "Sanity content not loading"

**Fix:**
1. Check environment variables are set in Vercel dashboard
2. Verify CORS origins include your Vercel URL in Sanity dashboard
3. Check browser console for CORS errors

### Issue: "Build fails with TypeScript errors"

**Fix:**
```bash
# Run build locally first to catch errors
npm run build

# Fix any TypeScript errors, then push
git add .
git commit -m "Fix build errors"
git push
```

### Issue: "Images not displaying"

**Fix:**
1. Verify `cdn.sanity.io` is in `next.config.ts` `remotePatterns` (already configured)
2. Check Sanity project has images uploaded
3. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct

### Issue: "Studio won't load"

**Fix:**
1. Visit `https://your-site.vercel.app/studio` directly
2. Check Sanity CORS origins include your domain
3. Verify you're logged into Sanity in that browser

---

## 🔐 Security Best Practices

✅ **Never commit `.env.local`** — Already in `.gitignore`  
✅ **Use environment variables** — All secrets stored in Vercel  
✅ **CORS whitelist** — Only your domains can access Sanity  
✅ **HTTPS enforced** — Automatic via Vercel SSL  

---

## 📈 Analytics & Monitoring

### Add Vercel Analytics (Optional)

1. In Vercel dashboard → **Analytics** → Enable
2. Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Monitor Build Times

- Dashboard → **Deployments** shows build duration
- Typical build time: 1–2 minutes
- Preview deployments are faster (cached dependencies)

---

## 🔄 Content Updates Workflow

Once deployed, content updates work like this:

```
1. Edit content in Sanity Studio
   ↓
2. Click "Publish" in Studio
   ↓
3. Content saved to Sanity Cloud (instant)
   ↓
4. Next.js ISR revalidates page within 60 seconds
   ↓
5. Visitors see updated content (no redeploy needed!)
```

> **No code deployment required** for content changes — that's the power of the headless CMS approach.

---

## 🚦 Deployment Checklist

Use this before going live:

- [ ] All environment variables set in Vercel
- [ ] Sanity CORS origins include production domain
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)
- [ ] Test all pages load correctly
- [ ] Verify Sanity Studio works at `/studio`
- [ ] Check images display from Sanity CDN
- [ ] Test YouTube video embeds
- [ ] Verify mobile responsiveness
- [ ] Check console for errors (DevTools)
- [ ] Test contact form/booking links work
- [ ] Analytics configured (optional)

---

## 📚 Additional Resources

| Resource | URL |
|----------|-----|
| Vercel Docs | [vercel.com/docs](https://vercel.com/docs) |
| Next.js Deployment | [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment) |
| Sanity CORS Setup | [sanity.io/docs/cors](https://www.sanity.io/docs/front-ends/cors) |
| Vercel CLI Reference | [vercel.com/docs/cli](https://vercel.com/docs/cli) |

---

## ✦ &nbsp; φ &nbsp; ✦

*"The only true wisdom is in knowing you know nothing."* — Socrates

Your philosophy coaching platform is now live on Vercel — where ancient wisdom meets modern infrastructure. 🏛️✨

---

**Need help?** Check [SANITY_SETUP.md](./SANITY_SETUP.md) for CMS configuration or [README.md](./README.md) for local development setup.
