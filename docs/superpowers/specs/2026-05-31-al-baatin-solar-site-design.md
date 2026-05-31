# Al-Baatin Technologies — Solar Engineer Website Design Spec

**Date:** 2026-05-31  
**Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript  
**Goal:** One-page brochure site that builds credibility and converts visitors into WhatsApp/phone inquiries.

---

## Business Context

- **Business:** Al-Baatin Technologies — Solar Installations
- **Location:** Ibadan, Oyo State, Nigeria
- **Primary conversion actions:** Call Now, Chat on WhatsApp
- **Audience:** Homeowners and business owners in Ibadan; majority mobile users
- **Phone:** `[PHONE]` — placeholder, to be filled in by owner
- **WhatsApp pre-fill message:** "Hi, I'm interested in a solar installation. Please can you help me?"

---

## Design Direction: "Power & Precision"

High-contrast alternating dark/light section rhythm. Premium, credible, conversion-focused.

### Color Tokens

| Token          | Hex       | Usage                                    |
| -------------- | --------- | ---------------------------------------- |
| Navy Deep      | `#0A1628` | Hero, dark sections, footer              |
| Navy Mid       | `#112240` | Cards on dark sections, nav on scroll    |
| Amber          | `#F5A623` | Primary CTA buttons, accents, highlights |
| Amber Hover    | `#E09515` | Button hover state                       |
| White          | `#FFFFFF` | Text on dark; light section backgrounds  |
| Slate          | `#F1F5F9` | Alternate light section backgrounds      |
| Body Gray      | `#64748B` | Body text on light sections              |
| WhatsApp Green | `#25D366` | Floating button, WhatsApp CTAs           |

### Typography

- **Headings:** Sora (Google Fonts) — Bold weight
- **Body:** Inter (Google Fonts) — Regular/Medium

### Spacing

- Base unit: 8px
- Section vertical padding: 96px desktop / 64px mobile
- Container max-width: 1200px, centered

### Section Rhythm (top to bottom)

```
Navbar (sticky)
Hero (dark)
Why Solar (light)
Services (dark)
Gallery (light)
How It Works (dark)
Testimonials (light)
Brands (dark)
Contact / CTA (light)
Footer (dark)
Floating WhatsApp button (fixed)
```

---

## Navbar

- **Behaviour:** Sticky. Starts transparent over hero, transitions to `#0A1628` with shadow on scroll.
- **Left:** "Al-Baatin Technologies" in Sora + small amber sun icon (SVG or emoji)
- **Right:** Single "📞 Call Now" button — amber filled, links to `tel:[PHONE]`
- **Mobile:** Logo left, call button right (no hamburger needed — single page)

---

## Section 1: Hero

- **Background:** `#0A1628` with a background image of solar panels on a rooftop, dark overlay `rgba(10, 22, 40, 0.82)`
- **Height:** 100vh desktop / 90vh mobile

**Content (left-aligned on desktop, centered on mobile):**

- Small amber label: `SOLAR ENERGY · IBADAN, OYO STATE`
- Thin amber horizontal rule (2px × 48px) — decorative accent
- H1 (white, Sora Bold): `Power Your Home & Office — Without NEPA.`
- Subtext (Inter, light gray): `Al-Baatin Technologies installs clean, reliable solar systems for homes and businesses across Ibadan. No more generator fumes. No more darkness.`
- Two CTAs (side by side, stack on mobile):
  - Amber filled: `📞 Call Now` → `tel:[PHONE]`
  - White outlined: `💬 Chat on WhatsApp` → WhatsApp deep link with pre-filled message

---

## Section 2: Why Solar?

- **Background:** `#F1F5F9`

**Content:**

- Section label (amber, small caps): `THE PROBLEM`
- H2 (navy, Sora Bold): `Tired of Living on NEPA's Schedule?`
- Subtext: `Every Nigerian knows the story. But there's a better way.`
- 3 cards (white, soft shadow, 3px amber top border, 16px border-radius):
  1. ⚡ **NEPA Wahala** — Constant outages disrupt your work, your sleep, your life. You deserve better than waiting for light.
  2. ⛽ **Generator Costs** — Fuel prices keep rising. Maintenance never stops. A generator is a money pit — solar pays for itself.
  3. 📈 **Rising Electricity Bills** — Even when NEPA shows up, the bills are climbing. Lock in your energy cost now, permanently.
- Bold pivot line (navy, Sora): `Solar isn't a luxury anymore. It's the smart move.`

**Card layout:** 3-col desktop → 1-col mobile

---

## Section 3: Services

- **Background:** `#0A1628`

**Content:**

- Section label (amber, small caps): `WHAT WE DO`
- H2 (white, Sora Bold): `Everything Solar, Done Right.`
- 4 service cards (`#112240` background, amber icon circle, white title, light gray body):
  1. 🏠 **Residential Installation** — Complete solar setup for your home. We handle everything — design, installation, and testing.
  2. 🏢 **Commercial Installation** — Power your office, shop, or warehouse. We size systems for business loads and budget.
  3. 🔋 **Solar Products** — Panels, inverters, batteries — we supply and install quality equipment built to last.
  4. 🔧 **Maintenance & Repairs** — Existing system underperforming? We diagnose, service, and repair all brands.
- Bottom CTA (amber, Sora): `Get a Free Assessment →` — scrolls to Contact section

**Card layout:** 2×2 grid desktop → 1-col mobile

---

## Section 4: Gallery

- **Background:** `#FFFFFF`

**Content:**

- Section label (amber, small caps): `OUR WORK`
- H2 (navy, Sora Bold): `20+ Installations Across Ibadan.`
- Subtext: `Every job done clean. Every system built to last.`
- Photo grid: 3-col desktop / 2-col mobile, masonry layout, 8px border-radius on images
- Hover state (desktop only): subtle navy overlay on photo
- Trust badge below grid: `✅ All installations completed by certified technicians`

**Images:** Real photos supplied by client. Placeholder: gray boxes with dimensions labeled during development.

---

## Section 5: How It Works

- **Background:** `#0A1628`

**Content:**

- Section label (amber, small caps): `THE PROCESS`
- H2 (white, Sora Bold): `Getting Started Is Simple.`
- 3 steps (horizontal row desktop, stacked mobile):
  1. **① Reach Out** — Call or WhatsApp us — no forms, no stress.
  2. **② Free Assessment** — We visit your site, assess your needs, and give you a free quote.
  3. **③ We Install** — Our team handles the full setup. Clean, fast, and guaranteed.
- Connecting element (desktop): dashed amber horizontal line between step number circles
- Step numbers: large amber circle, navy number inside
- Bottom CTA (amber filled): `Get Your Free Quote Today` — scrolls to Contact

---

## Section 6: Testimonials

- **Background:** `#F1F5F9`

**Content:**

- Section label (amber, small caps): `WHAT CUSTOMERS SAY`
- H2 (navy, Sora Bold): `Real People. Real Results.`
- 3 quote cards (white, soft shadow, 4px solid amber left border):
  - Large amber open-quote mark at top
  - Placeholder testimonial text (2-3 sentences, Naira amounts, Ibadan references)
  - Customer name in bold navy
  - 5 amber stars (★★★★★)

**Card layout:** 3-col desktop → 1-col mobile

**Placeholder format example:**

> "Before Al-Baatin installed our system, we were spending ₦40,000 a month on fuel alone. Now our electricity is almost free. Best investment we made." — [Customer Name], Ibadan

---

## Section 7: Brands

- **Background:** `#0A1628`

**Content:**

- Section label (amber, small caps): `BRANDS WE WORK WITH`
- H2 (white, Sora Bold): `Quality Equipment You Can Trust.`
- Subtext (light gray): `We only install brands with proven track records in the Nigerian market.`
- 3 brand logos in a centered horizontal row, displayed in white/monochrome on `#112240` pill containers:
  - Luminous
  - Felicity
  - Victron
- Mobile: wraps to 2-then-1 or single row with smaller logos

---

## Section 8: Contact / CTA

- **Background:** `#F1F5F9`

**Content:**

- Section label (amber, small caps): `GET IN TOUCH`
- H2 (navy, Sora Bold): `Ready to Go Solar? Let's Talk.`
- Subtext: `We serve homes and businesses across Ibadan. Reach out — the consultation is completely free.`
- Two primary CTAs (side by side, stack on mobile):
  - Amber filled: `📞 Call Now` → `tel:[PHONE]`
  - Green filled: `💬 WhatsApp Us` → WhatsApp deep link with pre-filled message
- Thin divider
- Backup contact form (3 fields):
  - Name (text input)
  - Phone (tel input)
  - Message (textarea, optional)
  - Submit button: `Send Message` (amber)
- Business hours: `Monday – Saturday · 8:00 AM – 6:00 PM`

**Note:** Contact form is a backup only. Primary conversion is via call/WhatsApp buttons. Form can use a simple mailto action or a serverless handler (Formspree, Resend, etc.) — to be decided during implementation.

---

## Footer

- **Background:** `#0A1628`
- Left: "Al-Baatin Technologies" + "Solar Installations · Ibadan"
- Right: `📞 [PHONE]` and `💬 WhatsApp`
- Bottom row: `© 2025 Al-Baatin Technologies. All rights reserved.`
- Minimal — no nav links needed for a single-page site

---

## Floating WhatsApp Button

- **Position:** Fixed, bottom-right, 24px from edges
- **Appearance:** `#25D366` circle, WhatsApp icon in white (SVG)
- **Behaviour:** Subtle pulse animation on mobile to draw attention. Links to WhatsApp deep link with pre-filled message.
- **Always visible** on all scroll positions

---

## Responsive Breakpoints

| Breakpoint | Width      | Key changes                                |
| ---------- | ---------- | ------------------------------------------ |
| Mobile     | < 640px    | Single column, CTAs stack, nav simplified  |
| Tablet     | 640–1024px | 2-col grids, larger text                   |
| Desktop    | > 1024px   | Full 3-col grids, horizontal process steps |

---

## Implementation Notes

- **Images:** Use Next.js `<Image>` component with `fill` or explicit dimensions for all photos. Lazy load gallery images.
- **Fonts:** Load Sora and Inter via `next/font/google` for optimal performance.
- **Smooth scroll:** Native CSS `scroll-behavior: smooth` on `html`.
- **Navbar scroll effect:** `IntersectionObserver` or a scroll event listener to toggle nav background.
- **WhatsApp link format:** `https://wa.me/234[PHONE_WITHOUT_LEADING_ZERO]?text=Hi%2C%20I'm%20interested%20in%20a%20solar%20installation.%20Please%20can%20you%20help%20me%3F`
- **Background hero image:** Use a royalty-free photo from Unsplash (solar panels on rooftop) as a placeholder until client supplies a real photo.
- **No external UI library needed** — Tailwind CSS v4 is sufficient for this design.
- **Next.js docs:** Read `node_modules/next/dist/docs/` before writing any code (per AGENTS.md).
