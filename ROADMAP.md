# CasitaCrew MVP Roadmap & Status

## Current Status: Stage 1 MVP Built & Deployed

**Latest Update:** August 15, 2026
**Repository:** GitHub (casitacrew)
**Live Site:** casitacrew.com (when deployed)

---

## What's Done ✅

### Brand & Foundations (CAS-5 to CAS-7)
- ✅ Domain purchased: casitacrew.com (via WHC)
- ✅ Brand identity locked: Logo (Lobster Two + CREW), colors (Navy/Teal/Brass), fonts (Archivo/Barlow)
- ✅ Launch trade categories locked: Cleaning, Handyman, Electrician, Plumber
- ✅ Tagline: "Vetted trades, no surprises"
- ✅ Voice: Plain-spoken, blue-collar, specific
- ✅ Subscription model: Single flat rate ($9/month)

### Stage 1: Homepage & Browse ✅
**Live Pages:**
- ✅ CAS-8: Next.js scaffold + Vercel deployment (built, pending deployment)
- ✅ CAS-9: Homepage (hero, categories, trust signals, how it works, testimonials, CTA)
- ✅ CAS-10: Browse/search page (filters by trade/location, sort by rating)
- ✅ CAS-11: Provider profile page (bio, services, pricing, verification, reviews)
- ✅ CAS-12: Pricing page ($9/month flat rate with FAQ)

**In Progress / Not Yet Built:**
- 🔄 CAS-13: Deploy to Vercel + connect casitacrew.com domain (DEPLOYMENT.md guide created)
- ⏳ CAS-14: Trade landing pages (/cleaning, /electrician, /plumber, /handyman)
- ⏳ CAS-15: "How it works" detailed page (customer + provider flows)
- ⏳ CAS-16: "Trust & Safety" page (verification explainer)
- ⏳ CAS-17: "About" page (story, mission, vision)
- ⏳ CAS-18: "Contact" page (form submission)

---

## What's Next (Prioritized)

### Immediate: Stage 1 Completion
1. **CAS-13: Deploy to Vercel + connect domain** (See DEPLOYMENT.md for step-by-step guide)
   - Push code to GitHub
   - Import repo into Vercel
   - Connect casitacrew.com domain
   - Test on live domain

2. **CAS-14: Trade landing pages** (SEO-critical for organic discovery)
   - /cleaning, /electrician, /plumber, /handyman
   - Each: hero, trade-specific content, top providers in trade, CTAs, schema markup

3. **CAS-15, CAS-16, CAS-17, CAS-18: Supporting pages** (build in order of importance)
   - How it works (traffic from homepage CTA)
   - Trust & Safety (differentiator for customer trust)
   - About (optional, builds narrative)
   - Contact (customer support + feedback)

### Phase 2: Provider Signup & Billing (Stage 2)
- **CAS-26**: Set up Supabase database schema + RLS
- **CAS-27**: Set up transactional emails (Resend)
- **CAS-19**: Build 5-step provider signup funnel + Stripe integration
- **CAS-20**: Build provider dashboard (7 pages)

### Phase 3: Booking & Messaging (Stage 3)
- **CAS-21**: Customer auth + dashboard
- **CAS-22**: Job request + booking confirmation flows
- **CAS-23**: Messaging + review system

### Phase 4: Admin & Verification (Stage 4)
- **CAS-24**: Admin provider approval queue
- **CAS-25**: Admin dashboard (inquiries, analytics, settings)

---

## Tech Stack

| Component | Technology | Notes |
|-----------|-----------|-------|
| **Frontend** | Next.js 16 (App Router, SSR) | TypeScript, Tailwind CSS |
| **Styling** | Tailwind + custom brand colors | Navy, Teal, Brass, Cream |
| **Typography** | Archivo (headers), Barlow (body) | Google Fonts |
| **Database** | Supabase (PostgreSQL) | RLS for data security |
| **Auth** | Supabase Auth | Email/password, JWT |
| **Provider Payments** | Stripe | Recurring subscriptions ($9/month) |
| **Job Payments** | Offline (v1.0) | Direct customer-to-provider (Stripe Connect in v1.1) |
| **File Storage** | Supabase Storage | Verification docs, profile photos |
| **Emails** | Resend | Transactional email templates |
| **Hosting** | Vercel | Auto-deploy on GitHub push |
| **Analytics** | Google Analytics / Fathom | User behavior, conversion tracking |
| **Project Mgmt** | Linear | Issue tracking (this project) |

---

## Mock Data

All pages currently use **mock provider data** from `app/lib/mockProviders.ts`:
- 8 test providers across all 4 trades
- Realistic profiles (name, rating, reviews, pricing, service area)
- Use for QA and design iteration

**Next:** Replace with real Supabase queries when Stage 2 launches.

---

## Key Metrics to Track

Once deployed, monitor:
- **Homepage bounce rate** (should be <50% for hero → browse)
- **Browse → profile click rate** (should be >30%)
- **Profile → inquiry/message rate** (call-to-action effectiveness)
- **Provider signup completion rate** (5-step funnel dropoff)
- **Subscription payment success rate** (Stripe errors, refusals)
- **Message response time** (provider engagement)
- **Review submission rate** (post-job feedback)

---

## Deployment Checklist

### Before Going Live (CAS-13)
- [ ] Push code to GitHub
- [ ] Import repo into Vercel
- [ ] Add environment variables (Supabase URLs, Stripe keys)
- [ ] Point casitacrew.com DNS to Vercel
- [ ] Test on casitacrew.com (mobile + desktop)
- [ ] Check HTTPS (green lock)
- [ ] Test all navigation links work
- [ ] Test provider profile mock data loads
- [ ] Test browse/filter functionality
- [ ] Verify images load properly
- [ ] Check for console errors (dev tools)

### After Deployment
- [ ] Set up Google Analytics
- [ ] Set up Sentry for error tracking
- [ ] Create admin account in Linear
- [ ] Plan next sprint (Stage 1 remaining pages vs Stage 2 start)

---

## How to Move Between Stages

**Stage 1 → Stage 2 Transition:**
Once trade landing pages + supporting pages are live, begin Stage 2:
1. Create Supabase schema (CAS-26)
2. Set up Resend emails (CAS-27)
3. Begin provider signup funnel (CAS-19)
4. In parallel: customer auth pages (CAS-21 prep work)

**Don't wait for:** Full Stage 1 completion before starting database schema. Supabase can be built independently.

---

## Support & Troubleshooting

**Build fails on Vercel?**
- Check Vercel build logs (Deployments tab)
- Common: missing env variables, TypeScript errors, CSS issues
- Solution: Check GitHub push, review console output, push fix to GitHub

**Domain not resolving?**
- DNS changes take 10 mins–24 hours
- Check with: https://www.whatsmydns.net/#A/casitacrew.com
- Verify DNS records match Vercel's requirements

**Pages look wrong?**
- Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- Check Vercel deployment is "Ready" (green)
- Verify CSS classes are spelled correctly

**Need help?**
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- Supabase docs: https://supabase.com/docs
- Stripe docs: https://stripe.com/docs

---

## Files to Know

| File | Purpose |
|------|---------|
| `DEPLOYMENT.md` | Step-by-step guide for GitHub → Vercel → domain |
| `app/lib/mockProviders.ts` | Mock provider data for development |
| `app/globals.css` | Brand colors, fonts, base styles |
| `app/components/Header.tsx` | Navigation header (on all pages) |
| `app/components/Footer.tsx` | Footer (on all pages) |
| `app/page.tsx` | Homepage |
| `app/browse/page.tsx` | Browse/search page |
| `app/provider/[id]/page.tsx` | Provider profile (dynamic) |
| `app/pricing/page.tsx` | Pricing page |
| `.env.local` (create this) | Local env vars (Supabase, Stripe) |

---

## Next Person Handoff

If handing off to another developer:
1. Share GitHub repo access
2. Share Vercel project access
3. Share Supabase project access (once created)
4. Share Linear workspace access
5. Provide casitacrew.com domain access / WHC account
6. Share Stripe account access
7. Review DEPLOYMENT.md and this README
8. Start with CAS-13 (deployment) to get live

---

## Success Metrics for MVP

**Launch Target:** September 2026 (mid-September)

**MVP Success = :**
- [ ] casitacrew.com live with Stage 1 complete
- [ ] 5+ providers signed up + approved
- [ ] 10+ customer accounts created
- [ ] 1–2 bookings made through platform
- [ ] Email notifications working
- [ ] Stripe subscriptions processing
- [ ] No critical bugs or downtime
- [ ] Mobile experience works smoothly

**Post-MVP Quick Wins:**
- Optimize for local SEO (Google My Business, citations)
- Reach out to first 5 providers manually (recruit)
- Collect early customer feedback
- Begin Stage 2 planning with learnings
