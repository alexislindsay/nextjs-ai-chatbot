# Systeme.io Integration Guide

This guide shows how to use the marketing chatbot with **Systeme.io** for your affiliate marketing funnels.

## What is Systeme.io?

Systeme.io is an all-in-one marketing platform perfect for affiliate marketers with:
- ✅ Sales funnel builder
- ✅ Email marketing automation
- ✅ Membership sites
- ✅ Webinars
- ✅ Affiliate program management
- ✅ **FREE plan** for up to 2,000 contacts!

## The Challenge

Systeme.io provides page builders and hosting for static pages, but our Next.js marketing chatbot needs Node.js hosting.

## Solution: Hybrid Approach

Use Systeme.io for your funnels + email marketing, and host the chatbot separately (for FREE).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│  Systeme.io                                         │
│  - Landing pages                                    │
│  - Email sequences                                  │
│  - Payment processing                               │
│  - Affiliate management                             │
│                                                     │
│  [CTA Button] → Links to Marketing Chatbot         │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  Marketing Chatbot (Hosted on Vercel/Netlify)       │
│  - Free hosting                                     │
│  - 3 Conversational funnels                         │
│  - Collects email → Sends to Systeme.io webhook     │
│  - Product recommendations                          │
└─────────────────────────────────────────────────────┘
```

---

## Step-by-Step Setup

### Step 1: Deploy Marketing Chatbot (FREE)

#### Option A: Deploy to Vercel (Easiest)

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click **"Import Project"**
   - Select your GitHub repo
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Your chatbot is live! (e.g., `https://your-app.vercel.app/marketing`)

3. **No environment variables needed!** The marketing chatbot works without any backend.

#### Option B: Deploy to Netlify

1. **Push code to GitHub**
2. Go to https://netlify.com
3. Click **"Add new site"** → **"Import from Git"**
4. Select your repo
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Framework:** Next.js
6. Click **"Deploy"**

---

### Step 2: Integrate with Systeme.io

#### Method 1: Direct Link (Simplest)

1. In Systeme.io, create a button on your landing page
2. Link it to: `https://your-app.vercel.app/marketing`
3. Users click button → Taken to chatbot → Complete funnel → Return to Systeme.io for purchase

**Example Button:**
```html
<a href="https://your-app.vercel.app/marketing"
   class="btn btn-primary">
   Get Your Free Personalized Plan
</a>
```

#### Method 2: Embed in iFrame (More Seamless)

1. In Systeme.io page editor, add a **"Custom HTML"** block
2. Paste this code:

```html
<iframe
  src="https://your-app.vercel.app/marketing"
  width="100%"
  height="800px"
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>
```

3. Adjust height as needed (800px works well for most screens)

#### Method 3: Custom Domain (Most Professional)

1. Deploy chatbot to Vercel
2. In Vercel, go to **Settings** → **Domains**
3. Add custom domain: `chatbot.yourdomain.com`
4. Update DNS settings (Vercel will guide you)
5. Link from Systeme.io to: `https://chatbot.yourdomain.com/marketing`

---

### Step 3: Capture Leads and Send to Systeme.io

Currently, the marketing chatbot doesn't capture emails. Let's add that!

#### Add Email Capture

We'll modify the chatbot to ask for email at the end and send it to Systeme.io via webhook.

**Systeme.io provides webhooks** to receive leads. Here's how:

1. **Get Systeme.io Webhook URL**
   - In Systeme.io, go to **Contacts** → **Forms** → **Create form**
   - Enable **"Webhook"** integration
   - Copy the webhook URL

2. **Modify Marketing Chatbot** (we can do this for you!)
   - Add email capture step after the 3 questions
   - Send data to Systeme.io webhook
   - Tag leads based on which funnel they used

---

## Example Funnel Flow

### Systeme.io Landing Page
```
Hero Section: "Discover Your Perfect Meal Plan"
↓
[Button: Start Your Free Assessment]
↓
(Takes user to chatbot)
```

### Marketing Chatbot
```
1. Answer 3 personalized questions
2. Get customized recommendations
3. Enter email to receive full plan
4. See product offer
↓
(Lead sent to Systeme.io)
```

### Back to Systeme.io
```
- Email automation sequence starts
- Day 1: Welcome + value
- Day 3: Case study
- Day 5: Product offer
- Day 7: Discount code
```

---

## Cost Breakdown

| Service | Cost | What You Get |
|---------|------|--------------|
| **Systeme.io Free** | $0/month | 2,000 contacts, unlimited emails, 3 funnels |
| **Vercel/Netlify** | $0/month | Free hosting for chatbot |
| **Total** | **$0/month** | Complete funnel system! |

### When to Upgrade

- **Systeme.io Startup ($27/month):** 5,000 contacts, 10 funnels, remove branding
- **Systeme.io Webinar ($47/month):** 10,000 contacts, unlimited funnels, webinars
- **Systeme.io Unlimited ($97/month):** Unlimited everything + affiliate program

---

## Recommended Setup for Affiliate Marketers

### Free Tier (Start Here)
```
✅ Systeme.io Free (landing pages, email, 2K contacts)
✅ Vercel Free (host chatbot)
✅ Use chatbot to pre-qualify leads
✅ Collect emails → Auto-add to Systeme.io
✅ Automated email sequences in Systeme.io
✅ Affiliate links in product recommendations
```

### Growing Business ($27-47/month)
```
✅ Systeme.io Startup/Webinar
✅ Custom domain for chatbot
✅ Multiple chatbots for different niches
✅ A/B testing different funnels
✅ Webinar funnels in Systeme.io
```

---

## Product Recommendation Strategy

Update the product links in the chatbot to your affiliate links:

**Edit:** `components/marketing/marketing-chatbot.tsx`

```typescript
const product: Product = {
  name: 'The Mediterranean Diet Guide',
  description: 'A comprehensive guide...',
  link: 'https://your-affiliate-link.com/product?ref=yourID', // ← Your affiliate link
  imageUrl: 'https://placehold.co/400x200/2980b9/ffffff?text=Meal+Plan',
};
```

---

## Next Steps

1. **Deploy the chatbot** to Vercel (takes 5 minutes)
2. **Test it** at `https://your-app.vercel.app/marketing`
3. **Set up Systeme.io** free account
4. **Create landing page** in Systeme.io
5. **Link to chatbot** from your landing page
6. **Optional:** We can add email capture + Systeme.io webhook integration

Want us to help you add the email capture and webhook integration?

---

## Example Systeme.io Funnels Using This Chatbot

### Health & Wellness
- Landing Page: "Find Your Perfect Diet"
- Chatbot: Mediterranean Diet funnel
- Product: Diet guide (affiliate)
- Email: 7-day recipe sequence

### Personal Development
- Landing Page: "Manifest Your Dreams"
- Chatbot: Manifestation Journal funnel
- Product: Journal (affiliate)
- Email: Daily affirmations sequence

### Relationships
- Landing Page: "Transform Your Relationship"
- Chatbot: Relationship Reading funnel
- Product: Relationship guide (affiliate)
- Email: Relationship tips sequence

---

## Support

- Systeme.io Support: https://help.systeme.io
- Vercel Docs: https://vercel.com/docs
- Need help with integration? Ask us!
