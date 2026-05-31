# Al-Baatin Technologies Solar Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, single-page brochure website for Al-Baatin Technologies (solar engineer, Ibadan Nigeria) that builds trust and converts visitors to WhatsApp/phone inquiries.

**Architecture:** One Next.js App Router page (`app/page.tsx`) rendering a sequence of server components (one per section), with three client components for interactive behaviour (Navbar scroll effect, Contact form, floating WhatsApp button). Design tokens live in `globals.css` via Tailwind v4's `@theme` block.

**Tech Stack:** Next.js 16.2.6, React 19, Tailwind CSS v4, TypeScript, `next/font/google` (Sora + Inter), `next/image`

---

## File Map

```
app/
  layout.tsx                   MODIFY — fonts, metadata, root HTML
  globals.css                  MODIFY — design tokens, base styles, pulse animation
  page.tsx                     REPLACE — compose all section components
  components/
    Navbar.tsx                 CREATE — 'use client', sticky + scroll-aware
    Hero.tsx                   CREATE — server component, hero section
    WhySolar.tsx               CREATE — server component, pain points
    Services.tsx               CREATE — server component, 4 service cards
    Gallery.tsx                CREATE — server component, photo grid
    HowItWorks.tsx             CREATE — server component, 3-step process
    Testimonials.tsx           CREATE — server component, quote cards
    Brands.tsx                 CREATE — server component, brand logo pills
    Contact.tsx                CREATE — 'use client', CTA + WhatsApp form
    Footer.tsx                 CREATE — server component, minimal footer
    WhatsAppButton.tsx         CREATE — 'use client', fixed floating button
  lib/
    constants.ts               CREATE — PHONE, WhatsApp URL helpers
next.config.ts                 MODIFY — images.remotePatterns for Unsplash placeholder
.gitignore                     MODIFY — ignore .superpowers/
```

---

### Task 1: Design tokens, fonts, constants, and config

**Files:**
- Create: `app/lib/constants.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Create constants file**

```typescript
// app/lib/constants.ts
export const PHONE = "[PHONE]"
export const WHATSAPP_NUMBER = "234[PHONE_WITHOUT_LEADING_ZERO]"
export const WHATSAPP_MESSAGE =
  "Hi, I'm interested in a solar installation. Please can you help me?"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
```

- [ ] **Step 2: Replace globals.css with design tokens and base styles**

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-navy-deep: #0a1628;
  --color-navy-mid: #112240;
  --color-amber: #f5a623;
  --color-amber-hover: #e09515;
  --color-slate-light: #f1f5f9;
  --color-body-gray: #64748b;
  --color-whatsapp: #25d366;
  --font-sora: var(--font-sora);
  --font-inter: var(--font-inter);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-inter);
}

@keyframes pulse-slow {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
```

- [ ] **Step 3: Replace layout.tsx with Sora + Inter and updated metadata**

```tsx
// app/layout.tsx
import type { Metadata } from "next"
import { Sora, Inter } from "next/font/google"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Al-Baatin Technologies — Solar Installations in Ibadan",
  description:
    "Professional solar panel installation for homes and businesses in Ibadan, Oyo State. Get a free assessment today.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Update next.config.ts to allow Unsplash images**

```typescript
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 5: Verify fonts load**

Run: `bun dev`

Open `http://localhost:3000`. Open DevTools → Network → filter "font". You should see Sora and Inter font files served from `localhost` (self-hosted by Next.js). No requests to `fonts.googleapis.com`.

- [ ] **Step 6: Commit**

```bash
git add app/lib/constants.ts app/globals.css app/layout.tsx next.config.ts
git commit -m "feat: design tokens, Sora+Inter fonts, site metadata, image config"
```

---

### Task 2: Navbar

**Files:**
- Create: `app/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**

```tsx
// app/components/Navbar.tsx
"use client"

import { useEffect, useState } from "react"
import { PHONE } from "@/app/lib/constants"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy-deep shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber text-xl select-none">☀</span>
          <span className="font-sora font-bold text-white text-lg tracking-tight">
            Al-Baatin Technologies
          </span>
        </div>
        <a
          href={`tel:${PHONE}`}
          className="bg-amber hover:bg-amber-hover text-navy-deep font-sora font-semibold text-sm px-4 py-2 rounded-full transition-colors duration-200"
        >
          📞 Call Now
        </a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Navbar temporarily to page.tsx to verify**

Replace `app/page.tsx` with:

```tsx
// app/page.tsx (temporary — will be replaced in Task 13)
import Navbar from "@/app/components/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-navy-deep min-h-screen" />
    </>
  )
}
```

Run `bun dev`. You should see a dark page with a transparent navbar. Scroll down — the navbar should transition to solid dark navy.

- [ ] **Step 3: Commit**

```bash
git add app/components/Navbar.tsx app/page.tsx
git commit -m "feat: sticky scroll-aware navbar"
```

---

### Task 3: Hero section

**Files:**
- Create: `app/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

```tsx
// app/components/Hero.tsx
import { PHONE, WHATSAPP_URL } from "@/app/lib/constants"

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center md:justify-start bg-navy-deep"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy-deep/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-28 pb-20 text-center md:text-left">
        {/* Location label */}
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4">
          Solar Energy · Ibadan, Oyo State
        </p>

        {/* Amber accent rule */}
        <div className="w-12 h-0.5 bg-amber mb-6 mx-auto md:mx-0" />

        {/* Headline */}
        <h1 className="font-sora font-extrabold text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
          Power Your Home &amp; Office —<br />
          <span className="text-amber">Without NEPA.</span>
        </h1>

        {/* Subtext */}
        <p className="font-inter text-slate-300 text-lg md:text-xl max-w-xl mb-10 mx-auto md:mx-0">
          Al-Baatin Technologies installs clean, reliable solar systems for homes
          and businesses across Ibadan. No more generator fumes. No more
          darkness.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href={`tel:${PHONE}`}
            className="bg-amber hover:bg-amber-hover text-navy-deep font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 text-center"
          >
            📞 Call Now
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white hover:bg-white/10 font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 text-center flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page.tsx and verify**

```tsx
// app/page.tsx (temporary)
import Navbar from "@/app/components/Navbar"
import Hero from "@/app/components/Hero"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  )
}
```

Run `bun dev`. Hero should fill the viewport: solar panel background image with dark overlay, amber headline, two CTA buttons stacking vertically on mobile.

- [ ] **Step 3: Commit**

```bash
git add app/components/Hero.tsx app/page.tsx
git commit -m "feat: hero section with background image and CTAs"
```

---

### Task 4: Why Solar section

**Files:**
- Create: `app/components/WhySolar.tsx`

- [ ] **Step 1: Create WhySolar component**

```tsx
// app/components/WhySolar.tsx
const painPoints = [
  {
    icon: "⚡",
    title: "NEPA Wahala",
    body: "Constant outages disrupt your work, your sleep, your life. You deserve better than waiting for light.",
  },
  {
    icon: "⛽",
    title: "Generator Costs",
    body: "Fuel prices keep rising. Maintenance never stops. A generator is a money pit — solar pays for itself.",
  },
  {
    icon: "📈",
    title: "Rising Electricity Bills",
    body: "Even when NEPA shows up, the bills are climbing. Lock in your energy cost now, permanently.",
  },
]

export default function WhySolar() {
  return (
    <section className="bg-slate-light py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          The Problem
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl text-center mb-4 leading-tight">
          Tired of Living on<br />NEPA&apos;s Schedule?
        </h2>

        <p className="font-inter text-body-gray text-lg text-center mb-12 max-w-xl mx-auto">
          Every Nigerian knows the story. But there&apos;s a better way.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-amber"
            >
              <div className="text-3xl mb-4">{point.icon}</div>
              <h3 className="font-sora font-bold text-navy-deep text-lg mb-2">
                {point.title}
              </h3>
              <p className="font-inter text-body-gray text-sm leading-relaxed">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <p className="font-sora font-bold text-navy-deep text-xl sm:text-2xl text-center">
          Solar isn&apos;t a luxury anymore. It&apos;s the smart move.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<WhySolar />` after `<Hero />` in `app/page.tsx`. Run `bun dev`. You should see 3 white cards with amber top borders on a light slate background below the hero.

- [ ] **Step 3: Commit**

```bash
git add app/components/WhySolar.tsx app/page.tsx
git commit -m "feat: Why Solar pain points section"
```

---

### Task 5: Services section

**Files:**
- Create: `app/components/Services.tsx`

- [ ] **Step 1: Create Services component**

```tsx
// app/components/Services.tsx
const services = [
  {
    icon: "🏠",
    title: "Residential Installation",
    body: "Complete solar setup for your home. We handle everything — design, installation, and testing.",
  },
  {
    icon: "🏢",
    title: "Commercial Installation",
    body: "Power your office, shop, or warehouse. We size systems for business loads and budget.",
  },
  {
    icon: "🔋",
    title: "Solar Products",
    body: "Panels, inverters, batteries — we supply and install quality equipment built to last.",
  },
  {
    icon: "🔧",
    title: "Maintenance & Repairs",
    body: "Existing system underperforming? We diagnose, service, and repair all brands.",
  },
]

export default function Services() {
  return (
    <section className="bg-navy-deep py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          What We Do
        </p>

        <h2 className="font-sora font-bold text-white text-3xl sm:text-4xl md:text-5xl text-center mb-16 leading-tight">
          Everything Solar,<br />Done Right.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-navy-mid rounded-2xl p-6 flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center text-2xl">
                {service.icon}
              </div>
              <div>
                <h3 className="font-sora font-bold text-white text-lg mb-2">
                  {service.title}
                </h3>
                <p className="font-inter text-slate-400 text-sm leading-relaxed">
                  {service.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="font-sora font-semibold text-amber text-base hover:text-amber-hover transition-colors duration-200"
          >
            Get a Free Assessment →
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Services />` after `<WhySolar />`. Run `bun dev`. You should see a dark navy section with 4 cards in a 2×2 grid (desktop) / single column (mobile), each card with an amber icon circle.

- [ ] **Step 3: Commit**

```bash
git add app/components/Services.tsx app/page.tsx
git commit -m "feat: Services section with 4 service cards"
```

---

### Task 6: Gallery section

**Files:**
- Create: `app/components/Gallery.tsx`

- [ ] **Step 1: Create Gallery component**

The `photos` array uses Unsplash as a placeholder. When the client supplies real photos, put them in `public/gallery/` and update the `src` values to `/gallery/photo-1.jpg` etc. Remove the `?sig=N` query string trick (used here to force distinct Unsplash cache entries) when switching to real photos.

```tsx
// app/components/Gallery.tsx
import Image from "next/image"

const photos = Array.from({ length: 9 }, (_, i) => ({
  src: `https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=70&sig=${i}`,
  alt: `Solar installation ${i + 1} by Al-Baatin Technologies, Ibadan`,
}))

export default function Gallery() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          Our Work
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl text-center mb-4 leading-tight">
          20+ Installations<br />Across Ibadan.
        </h2>

        <p className="font-inter text-body-gray text-lg text-center mb-12">
          Every job done clean. Every system built to last.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
                loading={i < 6 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <p className="font-inter text-body-gray text-sm text-center">
          ✅ All installations completed by certified technicians
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Gallery />` after `<Services />`. Run `bun dev`. You should see a 3-column photo grid on desktop and 2-column on mobile. Hover a photo on desktop — it should scale slightly with a navy tint overlay.

- [ ] **Step 3: Commit**

```bash
git add app/components/Gallery.tsx app/page.tsx
git commit -m "feat: Gallery section with photo grid"
```

---

### Task 7: How It Works section

**Files:**
- Create: `app/components/HowItWorks.tsx`

- [ ] **Step 1: Create HowItWorks component**

```tsx
// app/components/HowItWorks.tsx
const steps = [
  {
    number: "01",
    title: "Reach Out",
    body: "Call or WhatsApp us — no forms, no stress.",
  },
  {
    number: "02",
    title: "Free Assessment",
    body: "We visit your site, assess your needs, and give you a free quote.",
  },
  {
    number: "03",
    title: "We Install",
    body: "Our team handles the full setup. Clean, fast, and guaranteed.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-navy-deep py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          The Process
        </p>

        <h2 className="font-sora font-bold text-white text-3xl sm:text-4xl md:text-5xl text-center mb-16 leading-tight">
          Getting Started<br />Is Simple.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14 relative">
          {/* Dashed connector line — desktop only */}
          <div className="hidden sm:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px border-t-2 border-dashed border-amber/30" />

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber flex items-center justify-center mb-6 relative z-10">
                <span className="font-sora font-bold text-navy-deep text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="font-sora font-bold text-white text-xl mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-slate-400 text-sm leading-relaxed max-w-xs">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-block bg-amber hover:bg-amber-hover text-navy-deep font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200"
          >
            Get Your Free Quote Today
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<HowItWorks />` after `<Gallery />`. Run `bun dev`. Dark navy section with 3 amber numbered circles. On desktop you should see a dashed amber line connecting the circles.

- [ ] **Step 3: Commit**

```bash
git add app/components/HowItWorks.tsx app/page.tsx
git commit -m "feat: How It Works 3-step section"
```

---

### Task 8: Testimonials section

**Files:**
- Create: `app/components/Testimonials.tsx`

- [ ] **Step 1: Create Testimonials component**

```tsx
// app/components/Testimonials.tsx
const testimonials = [
  {
    quote:
      "Before Al-Baatin installed our system, we were spending ₦40,000 a month on fuel alone. Now our electricity is almost free. Best investment we ever made.",
    name: "[Customer Name]",
    location: "Ibadan",
  },
  {
    quote:
      "The installation was so clean and fast. They finished in one day and everything has been working perfectly for months. I've already referred three of my neighbours.",
    name: "[Customer Name]",
    location: "Ibadan",
  },
  {
    quote:
      "My shop used to lose thousands every time NEPA took light. Since Al-Baatin set up our solar, we haven't lost a single hour of business.",
    name: "[Customer Name]",
    location: "Ibadan",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-slate-light py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          What Customers Say
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl text-center mb-16 leading-tight">
          Real People.<br />Real Results.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-amber"
            >
              <div className="font-sora text-amber text-5xl leading-none mb-4 select-none">
                &ldquo;
              </div>
              <p className="font-inter text-body-gray text-sm leading-relaxed mb-6">
                {t.quote}
              </p>
              <div>
                <p className="font-sora font-bold text-navy-deep text-sm">
                  {t.name}
                </p>
                <p className="font-inter text-body-gray text-xs">{t.location}</p>
                <p className="text-amber text-sm mt-2 tracking-widest">★★★★★</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Testimonials />` after `<HowItWorks />`. Run `bun dev`. Light slate section with 3 white cards, amber left border, large amber open-quote mark, and 5 stars.

- [ ] **Step 3: Commit**

```bash
git add app/components/Testimonials.tsx app/page.tsx
git commit -m "feat: Testimonials section"
```

---

### Task 9: Brands section

**Files:**
- Create: `app/components/Brands.tsx`

- [ ] **Step 1: Create Brands component**

Logos shown as styled text pills. When SVG logo files are available, replace the `<span>` inside each pill with `<Image src="/logos/luminous.svg" ... />`.

```tsx
// app/components/Brands.tsx
const brands = ["Luminous", "Felicity", "Victron"]

export default function Brands() {
  return (
    <section className="bg-navy-deep py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4">
          Brands We Work With
        </p>

        <h2 className="font-sora font-bold text-white text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
          Quality Equipment<br />You Can Trust.
        </h2>

        <p className="font-inter text-slate-400 text-lg mb-12 max-w-lg mx-auto">
          We only install brands with proven track records in the Nigerian market.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="bg-navy-mid rounded-xl px-10 py-5 flex items-center justify-center"
            >
              <span className="font-sora font-bold text-white text-lg tracking-wide">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Brands />` after `<Testimonials />`. Run `bun dev`. Dark navy section with 3 centered brand name pills.

- [ ] **Step 3: Commit**

```bash
git add app/components/Brands.tsx app/page.tsx
git commit -m "feat: Brands section"
```

---

### Task 10: Contact section

**Files:**
- Create: `app/components/Contact.tsx`

- [ ] **Step 1: Create Contact component**

The form sends to WhatsApp on submit — no backend required. The `name`, `phone`, and `message` values are composed into a pre-filled WhatsApp message URL.

```tsx
// app/components/Contact.tsx
"use client"

import { useState, type FormEvent } from "react"
import { PHONE, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/app/lib/constants"

export default function Contact() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = `Hi, I'm ${name}. My number is ${phone}. ${message || WHATSAPP_MESSAGE}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const whatsappDirect = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="contact" className="bg-slate-light py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4">
          Get In Touch
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
          Ready to Go Solar?<br />Let&apos;s Talk.
        </h2>

        <p className="font-inter text-body-gray text-lg mb-10">
          We serve homes and businesses across Ibadan.<br />
          Reach out — the consultation is completely free.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={`tel:${PHONE}`}
            className="bg-amber hover:bg-amber-hover text-navy-deep font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 text-center"
          >
            📞 Call Now
          </a>
          <a
            href={whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp hover:bg-green-500 text-white font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 text-center"
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-navy-deep/10" />
          <span className="font-inter text-body-gray text-sm whitespace-nowrap">
            or leave a message
          </span>
          <div className="flex-1 h-px bg-navy-deep/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-navy-deep/20 rounded-xl px-4 py-3 font-inter text-sm text-navy-deep placeholder:text-body-gray focus:outline-none focus:ring-2 focus:ring-amber bg-white"
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-navy-deep/20 rounded-xl px-4 py-3 font-inter text-sm text-navy-deep placeholder:text-body-gray focus:outline-none focus:ring-2 focus:ring-amber bg-white"
          />
          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full border border-navy-deep/20 rounded-xl px-4 py-3 font-inter text-sm text-navy-deep placeholder:text-body-gray focus:outline-none focus:ring-2 focus:ring-amber bg-white resize-none"
          />
          <button
            type="submit"
            className="bg-amber hover:bg-amber-hover text-navy-deep font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200"
          >
            Send Message via WhatsApp
          </button>
        </form>

        <p className="font-inter text-body-gray text-sm mt-8">
          Monday – Saturday · 8:00 AM – 6:00 PM
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Contact />` after `<Brands />`. Run `bun dev`. You should see: two large CTA buttons (amber "Call Now", green "WhatsApp Us"), a divider, then a 3-field form. Fill in the form and submit — it should open WhatsApp in a new tab with a pre-filled message.

- [ ] **Step 3: Commit**

```bash
git add app/components/Contact.tsx app/page.tsx
git commit -m "feat: Contact section with WhatsApp-powered form"
```

---

### Task 11: Footer

**Files:**
- Create: `app/components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
// app/components/Footer.tsx
import { PHONE, WHATSAPP_URL } from "@/app/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-white/5 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
            <span className="text-amber select-none">☀</span>
            <span className="font-sora font-bold text-white text-base">
              Al-Baatin Technologies
            </span>
          </div>
          <p className="font-inter text-slate-500 text-xs">
            Solar Installations · Ibadan, Oyo State
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`tel:${PHONE}`}
            className="font-inter text-slate-400 hover:text-white text-sm transition-colors duration-200"
          >
            📞 {PHONE}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-slate-400 hover:text-whatsapp text-sm transition-colors duration-200"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center">
        <p className="font-inter text-slate-600 text-xs">
          © {new Date().getFullYear()} Al-Baatin Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Footer />` after `<Contact />` (outside `<main>`). Run `bun dev`. Dark footer with brand name, phone, WhatsApp link, copyright line.

- [ ] **Step 3: Commit**

```bash
git add app/components/Footer.tsx app/page.tsx
git commit -m "feat: Footer"
```

---

### Task 12: Floating WhatsApp button

**Files:**
- Create: `app/components/WhatsAppButton.tsx`

- [ ] **Step 1: Create WhatsAppButton component**

```tsx
// app/components/WhatsAppButton.tsx
"use client"

import { WHATSAPP_URL } from "@/app/lib/constants"

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 animate-pulse-slow"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<WhatsAppButton />` at the bottom of the page (outside `<main>` and `<Footer />`). Run `bun dev`. A green pulsing circle should appear fixed at the bottom-right of the screen. Hover it — it should scale up. Click it — it should open WhatsApp with the pre-filled message.

- [ ] **Step 3: Commit**

```bash
git add app/components/WhatsAppButton.tsx app/page.tsx
git commit -m "feat: floating WhatsApp button with pulse animation"
```

---

### Task 13: Final page.tsx — compose all sections

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx with the final composition**

```tsx
// app/page.tsx
import Navbar from "@/app/components/Navbar"
import Hero from "@/app/components/Hero"
import WhySolar from "@/app/components/WhySolar"
import Services from "@/app/components/Services"
import Gallery from "@/app/components/Gallery"
import HowItWorks from "@/app/components/HowItWorks"
import Testimonials from "@/app/components/Testimonials"
import Brands from "@/app/components/Brands"
import Contact from "@/app/components/Contact"
import Footer from "@/app/components/Footer"
import WhatsAppButton from "@/app/components/WhatsAppButton"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhySolar />
        <Services />
        <Gallery />
        <HowItWorks />
        <Testimonials />
        <Brands />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
```

- [ ] **Step 2: Full walkthrough**

Run `bun dev`. Scroll through the entire page and verify:

- Navbar: transparent over hero → dark navy on scroll ✓
- Hero: background image, amber headline, two CTA buttons ✓
- Why Solar: light section, 3 amber-bordered cards, pivot line ✓
- Services: dark section, 2×2 card grid ✓
- Gallery: white section, 3-col desktop / 2-col mobile photo grid, hover effect ✓
- How It Works: dark section, 3 amber numbered steps, dashed connector (desktop) ✓
- Testimonials: light section, 3 amber left-border cards with stars ✓
- Brands: dark section, 3 centered brand pills ✓
- Contact: light section, amber + green CTAs, 3-field form ✓
- Footer: dark, brand + phone + WhatsApp ✓
- Floating WhatsApp button: green, bottom-right, pulsing ✓

Check on a narrow window (mobile sim): all grids collapse to single column, CTAs stack, text scales down.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose full page — all sections wired up"
```

---

### Task 14: Type check, build, and gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add .superpowers to .gitignore**

```bash
echo "" >> .gitignore
echo "# Superpowers brainstorm sessions" >> .gitignore
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 2: TypeScript check**

```bash
bunx tsc --noEmit
```

Expected output: no errors, no warnings. If type errors appear, fix them before proceeding.

- [ ] **Step 3: Production build**

```bash
bun run build
```

Expected: build succeeds. Note the page size in the output — the single route should be under 200kB first load JS.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/, verify build passes"
```

---

## When real photos arrive

Put them in `public/gallery/` named `photo-01.jpg` through `photo-N.jpg`. Then update the `photos` array in `app/components/Gallery.tsx`:

```typescript
const photos = [
  { src: "/gallery/photo-01.jpg", alt: "Solar installation 1 by Al-Baatin Technologies, Ibadan" },
  { src: "/gallery/photo-02.jpg", alt: "Solar installation 2 by Al-Baatin Technologies, Ibadan" },
  // ... etc
]
```

Remove the `remotePatterns` entry for `images.unsplash.com` from `next.config.ts` once all Unsplash placeholders are replaced.

## When real phone number is available

Update `app/lib/constants.ts`:
- Set `PHONE` to the full number e.g. `"08012345678"`
- Set `WHATSAPP_NUMBER` to the international format without `+` or leading zero e.g. `"2348012345678"`
