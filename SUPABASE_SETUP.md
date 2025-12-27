# Supabase Setup Guide

This guide shows you how to use **Supabase** (free tier available) as your backend instead of Vercel services.

## What Supabase Provides (FREE)

✅ **PostgreSQL Database** - Replaces Vercel Postgres
✅ **Authentication** - Can replace NextAuth (optional)
✅ **File Storage** - Replaces Vercel Blob
✅ **Realtime** - Bonus feature for live updates

## What You Still Need

- ⚠️ **xAI API Key** - Get from https://console.x.ai (pay-as-you-go)
- ⚠️ **Redis** - Get from [Upstash](https://upstash.com) (has free tier)
- ⚠️ **Auth Secret** - Generate yourself (free)

---

## Step-by-Step Setup

### 1. Create Supabase Project (FREE)

1. Go to https://supabase.com
2. Sign up / Log in
3. Click **"New Project"**
4. Fill in:
   - **Name:** Your project name (e.g., "ai-chatbot")
   - **Database Password:** Generate a strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (includes 500 MB database, 1 GB storage)
5. Click **"Create new project"** (takes ~2 minutes)

---

### 2. Get PostgreSQL Connection String

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection String**
3. Select **"URI"** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres.xxxxxxxxxxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

**Environment Variable:**
```bash
POSTGRES_URL=postgresql://postgres.xxxxxxxxxxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

---

### 3. Get Blob Storage Token (Supabase Storage)

Supabase Storage works differently than Vercel Blob. You have two options:

#### Option A: Keep using Vercel Blob (easiest)
Just create a free Vercel Blob store and use `BLOB_READ_WRITE_TOKEN` as before.

#### Option B: Modify code to use Supabase Storage
This requires some code changes. We can help you with this if needed.

For now, **use Option A** to get started quickly.

---

### 4. Setup Redis (Upstash - FREE TIER)

1. Go to https://console.upstash.com
2. Sign up / Log in
3. Click **"Create Database"**
4. Fill in:
   - **Name:** ai-chatbot-redis
   - **Type:** Regional
   - **Region:** Choose same as Supabase
   - **Primary Region:** (auto-selected)
5. Click **"Create"**
6. Copy the **"UPSTASH_REDIS_REST_URL"** from the dashboard

**Environment Variable:**
```bash
REDIS_URL=your-upstash-redis-url-here
```

**Upstash Free Tier:**
- 10,000 commands per day
- 256 MB storage
- Perfect for getting started!

---

### 5. Get xAI API Key

1. Go to https://console.x.ai
2. Sign up / Log in with X (Twitter) account
3. Go to **API Keys** section
4. Click **"Create API Key"**
5. Copy your API key (starts with `xai-...`)

**Environment Variable:**
```bash
XAI_API_KEY=xai-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**xAI Pricing:**
- Pay-as-you-go (only pay for what you use)
- Grok-2: ~$2 per 1M input tokens
- Grok-3-mini: ~$0.40 per 1M input tokens

---

### 6. Generate Auth Secret

Run this in your terminal:

```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

**Environment Variable:**
```bash
AUTH_SECRET=your-generated-secret-here
```

---

## Complete .env.local File

Create a `.env.local` file in your project root with:

```bash
# Auth Secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-generated-secret-here

# xAI API Key (from console.x.ai)
XAI_API_KEY=xai-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Vercel Blob (easiest option for file storage)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxx

# Supabase PostgreSQL (from Supabase dashboard → Settings → Database)
POSTGRES_URL=postgresql://postgres.xxxxxxxxxxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres

# Upstash Redis (from Upstash dashboard)
REDIS_URL=https://xxxx-xxxxx.upstash.io
```

---

## Running Migrations

After setting up `.env.local`, run:

```bash
npm run db:migrate
```

This will create all the necessary database tables in your Supabase PostgreSQL database.

---

## Deployment Options

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify
1. Push code to GitHub
2. Import to Netlify
3. Add build command: `npm run build`
4. Add all environment variables
5. Deploy!

### Deploy to Your Own Server
1. Build: `npm run build`
2. Start: `npm start`
3. Set environment variables on your server

---

## Cost Breakdown (Starting from FREE)

| Service | Free Tier | Paid Plans Start At |
|---------|-----------|---------------------|
| **Supabase** | 500 MB DB, 1 GB storage, 2 GB bandwidth | $25/month (Pro) |
| **Upstash Redis** | 10K commands/day, 256 MB | $0.20/100K commands |
| **Vercel Blob** | 1 GB storage, 1 GB bandwidth | $0.15/GB/month |
| **xAI API** | No free tier | Pay per token (~$0.40-$2 per 1M tokens) |
| **Auth Secret** | Free! | Free! |

**Total to start:** Mostly FREE, only pay for xAI usage!

---

## For Marketing Chatbot ONLY (No Backend Needed)

If you **only** want the marketing chatbot (3 funnels), you don't need ANY of this!

The marketing chatbot is 100% client-side and can be deployed to:
- **Netlify** (free tier)
- **Vercel** (free tier)
- **GitHub Pages** (free)
- **Cloudflare Pages** (free)
- **Any static hosting**

Just build the Next.js app and deploy - no environment variables needed!

Navigate to `/marketing` to use the marketing chatbot.

---

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Upstash Docs: https://docs.upstash.com
- xAI Docs: https://docs.x.ai
- Next.js Deployment: https://nextjs.org/docs/deployment

---

## Alternative: Use Supabase Auth Instead of NextAuth

If you want to use Supabase's built-in auth instead of NextAuth, we can modify the code. This would simplify your setup even more. Let us know if you're interested!
