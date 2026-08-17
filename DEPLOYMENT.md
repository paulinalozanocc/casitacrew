# CasitaCrew Deployment Guide

## Overview
This guide walks you through deploying the CasitaCrew Next.js app to Vercel and connecting your casitacrew.com domain.

---

## Step 1: Create a GitHub Repository

### 1.1 Initialize Git locally
```bash
cd /home/claude/casitacrew
git init
git add .
git commit -m "Initial commit: Stage 1 homepage, browse, provider profiles"
```

### 1.2 Create a GitHub account (if you don't have one)
Go to https://github.com/signup and create an account.

### 1.3 Create a new repository on GitHub
- Go to https://github.com/new
- Repository name: `casitacrew`
- Description: "Two-sided marketplace for blue-collar trades in Toronto"
- Make it **Private** (only you can see the code)
- Do NOT initialize with README, .gitignore, or license (you already have these locally)
- Click "Create repository"

### 1.4 Push code to GitHub
GitHub will give you instructions. Copy and run these commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/casitacrew.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy to Vercel

### 2.1 Create a Vercel account
Go to https://vercel.com/signup and sign up (you can use GitHub login for faster setup).

### 2.2 Import your GitHub repo
1. Go to https://vercel.com/new
2. Under "Import Git Repository," paste: `https://github.com/YOUR_USERNAME/casitacrew`
3. Click "Continue"
4. Vercel will ask to authenticate with GitHub — click "Authorize"

### 2.3 Configure the project
On the "Create Project" page:
- **Project name**: `casitacrew` (default is fine)
- **Framework preset**: Vercel auto-detects "Next.js" ✓
- **Root directory**: `./` (default)
- **Build command**: `npm run build` (auto-filled)
- **Output directory**: `.next` (auto-filled)
- **Install command**: `npm install` (auto-filled)

Environment variables (leave blank for MVP, we'll add Supabase/Stripe keys later):
- Skip for now

### 2.4 Deploy
Click "Deploy" and wait ~2–3 minutes.

Vercel will give you a live URL like: `casitacrew-xxxxxxx.vercel.app`

**Test it:** Open that URL in your browser. You should see the homepage live.

---

## Step 3: Connect Your Domain (casitacrew.com)

### 3.1 Point domain to Vercel (via WHC DNS)

You have two options:

**Option A: Nameserver delegation (cleanest)**
1. In Vercel project settings, go to **Domains**
2. Add domain: `casitacrew.com`
3. Vercel shows you 4 nameservers to add
4. Log in to WHC (your domain registrar control panel)
5. Change the nameservers to Vercel's (usually in "Nameservers" or "DNS" section)
6. Wait 10 minutes to 24 hours for DNS to propagate
7. Vercel will show a checkmark when it's live

**Option B: CNAME record (if you want to keep WHC as registrar)**
1. In Vercel project settings, go to **Domains**
2. Add domain: `casitacrew.com`
3. Vercel tells you to add a CNAME record to your DNS provider
4. Log in to WHC control panel → DNS settings
5. Add CNAME record:
   - Name: (leave blank or `@` depending on WHC's UI)
   - Value: `cname.vercel-dns.com`
6. Wait 10–24 hours for DNS to propagate
7. Vercel will verify and show a checkmark

**Recommendation:** Option A (nameserver delegation) is simpler long-term. Do this now.

### 3.2 Verify the domain is live
Once DNS propagates (usually 10 mins–a few hours):
- Open `casitacrew.com` in your browser
- You should see the CasitaCrew homepage
- Check that it's secure (HTTPS with green lock) — Vercel auto-provisions an SSL certificate

---

## Step 4: Connect to Supabase (Database)

### 4.1 Create a Supabase project
1. Go to https://supabase.com/dashboard
2. Sign up (use GitHub for faster setup)
3. Click "New project"
4. **Project name**: `casitacrew`
5. **Database password**: Generate a strong password (Supabase generates one for you)
6. **Region**: Choose the closest to Toronto (e.g., "us-east-1" or "ca-central-1" if available)
7. Click "Create new project" and wait ~2 minutes

### 4.2 Get Supabase connection keys
Once the project is live:
1. Go to **Settings** → **API**
2. Copy your **Project URL** (e.g., `https://xxxxx.supabase.co`)
3. Copy your **anon public key** (the one labeled "anon / public")
4. Copy your **service_role key** (secret — keep this private)

### 4.3 Add to Vercel environment variables
1. In Vercel project settings, go to **Environment Variables**
2. Add three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Paste the Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Paste the anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Paste the service_role key (secret)

3. Click "Save"
4. Vercel will automatically redeploy with the new variables

---

## Step 5: Connect to Stripe (Provider Subscriptions)

### 5.1 Create a Stripe account
1. Go to https://stripe.com and click "Get started"
2. Sign up with your email
3. Fill in your business info (CasitaCrew, Toronto, etc.)

### 5.2 Get Stripe API keys
1. Go to **Developers** → **API keys** (https://dashboard.stripe.com/apikeys)
2. You'll see "Publishable key" and "Secret key"
3. **Test mode** (use these for MVP): 
   - Copy the publishable key (starts with `pk_test_`)
   - Copy the secret key (starts with `sk_test_`)

### 5.3 Add to Vercel environment variables
1. In Vercel, add two more variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Paste the publishable key
   - `STRIPE_SECRET_KEY`: Paste the secret key (keep private)

2. Click "Save"
3. Vercel will redeploy

---

## Step 6: Deploy Updates

From now on, any code changes you push to GitHub will **auto-deploy** to Vercel:

```bash
# Make changes to your code
git add .
git commit -m "Add trade landing pages"
git push origin main
```

Vercel watches your GitHub repo and redeploys automatically within 1–2 minutes.

---

## Troubleshooting

### Domain not resolving
- DNS changes can take 10 mins–24 hours
- Check propagation: https://www.whatsmydns.net/#A/casitacrew.com
- Still down after 24h? Check Vercel's DNS settings match what you configured in WHC

### Build fails on Vercel
- Check Vercel's build logs: **Deployments** → (latest) → **Build & Deploy logs**
- Most common: missing environment variables or typos in `.env`
- Push a fix to GitHub and Vercel will automatically redeploy

### Homepage shows 404
- Make sure you've deployed at least once
- Check Vercel's deployment status is "Ready" (green checkmark)
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### HTTPS not working
- Vercel auto-provisions SSL, but it can take 30 mins after domain is added
- Wait and refresh. If still no HTTPS after 1h, regenerate the certificate in Vercel project settings

---

## What's Next

Once deployed:
1. Test all pages on casitacrew.com (homepage, browse, provider profile, pricing)
2. On mobile: test responsiveness
3. Create remaining Stage 1 pages (trade landing pages, how-it-works, about, contact)
4. Start Stage 2: provider signup flow + Stripe subscription integration

---

## Useful Vercel & GitHub Commands

**Check deployment status:**
```bash
# In Vercel dashboard, click "Deployments" to see build logs
```

**Rollback to previous version:**
```bash
# In Vercel Deployments tab, click "Promote" on an older deployment
```

**View live environment variables:**
```bash
# In Vercel project settings → Environment Variables
```

---

## Support

- Vercel docs: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/deployment
- Supabase docs: https://supabase.com/docs
- Stripe docs: https://stripe.com/docs
