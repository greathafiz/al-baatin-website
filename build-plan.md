# Al-Baatin Technologies — build plan

Brochure site for Al-Baatin Technologies Limited (solar, security, ICT, NYSC SAED training).
Status key: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked on client

Last updated: 6 Oct 2026

---

## Stage 0 — Read content and agree the design  `[x]`

- [x] 0.1 Read everything in `content/` and summarise what is there / missing
- [x] 0.2 Sample the real colours out of `content/logo.jpg`
- [x] 0.3 Measure every image and video (dimensions, file size, orientation)
- [~] 0.4 Design plan: palette, type, layout, principles — **waiting for approval**

## Stage 1 — Project foundation  `[x]`

- [x] 1.1 Build fresh (old demo components already removed in `d01aae1`)
- [x] 1.2 `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash`
- [x] 1.3 Tailwind v4 theme tokens (colours, type scale) in `app/globals.css`
- [x] 1.4 Fonts via `next/font` — Fraunces (display) + Inter (body), self-hosted
- [x] 1.5 Base layout, metadata defaults, skip link, focus styles, `prefers-reduced-motion`

## Stage 2 — Media pipeline  `[x]`

- [x] 2.1 `scripts/optimize-media.mjs` with sharp → WebP 1600px + 800px into `public/media/`, never upscaling past source width
- [x] 2.2 Video posters extracted with ffmpeg (installed 9.0.2); poster at 1s to avoid black frames
- [x] 2.3 Ran it: 84 WebP + 6 MP4 = 28MB. **Committed** to the repo — Cloudflare's build image has no ffmpeg, so generated media must be in the checkout
- [x] 2.4 Favicon + OG image derived from the logo (`scripts/build-brand-assets.mjs`); removed the stock `app/favicon.ico` which was overriding it
- [x] 2.5 ffmpeg commands documented in the README
- [x] 2.6 Incremental manifest (`public/media/manifest.json`) with real dimensions, so components can set width/height and avoid layout shift

## Stage 3 — Typed content data  `[x]`

- [x] 3.1 `src/data/business.ts` — name, phones (all five), email, addresses, socials, service areas
- [x] 3.2 `src/data/services.ts` — solar first, then the rest
- [x] 3.3 `src/data/projects.ts` — one entry per project folder, with media lists and alt text
- [x] 3.4 `src/data/testimonials.ts` — Google reviews + rating + listing links
- [x] 3.5 `src/data/training.ts` — NYSC SAED programme
- [x] 3.6 Shared types, `src/data/team.ts`, and a single `whatsappLink()` helper
- [x] 3.7 `src/lib/media.ts` — typed manifest access with srcSet and real dimensions

## Stage 4 — Homepage  `[x]`

- [x] 4.1 Header + nav (mobile menu)
- [x] 4.2 Hero
- [x] 4.3 Trust strip
- [x] 4.4 Services
- [x] 4.5 Featured work (8 images + 2 videos)
- [x] 4.6 How it works
- [x] 4.7 Testimonials (scroll-snap on mobile, grid on desktop)
- [x] 4.8 About — with the marked owner placeholder
- [x] 4.9 Contact + form (Web3Forms, disabled until `NEXT_PUBLIC_FORM_KEY` is set)
- [x] 4.10 Footer
- [x] 4.11 Sticky WhatsApp button (mobile), clear of the footer

## Stage 5 — Other pages  `[x]`

- [x] 5.1 `/projects` with All / Homes / Business / Other filters
- [x] 5.2 `/projects/[slug]` static detail pages (all 6 prerendered)
- [x] 5.3 Lightbox for project media
- [x] 5.4 `/training` — NYSC SAED page
- [x] 5.5 Custom 404
- [x] 5.6 `robots.txt` + `sitemap.xml`

## Stage 6 — SEO, accessibility, polish  `[~]`

- [x] 6.1 Per-page titles/descriptions + Open Graph + canonicals
- [x] 6.2 `LocalBusiness` JSON-LD
- [x] 6.3 Accessibility pass: contrast, keyboard focus, alt text, reduced motion
- [x] 6.4 Check at 375px and desktop
- [~] 6.5 Lighthouse mobile: a11y/BP/SEO 100, performance 79-84 locally (see README)

## Stage 7 — Ship  `[x]`

- [x] 7.1 `npm run build` produces `out/`
- [x] 7.2 README: add a project/testimonial, run the media script, deploy to Cloudflare Pages, custom domain, Zoho MX note
- [x] 7.3 Final placeholder list
- [x] 7.4 Final list of files created/modified

---

## Decisions made (6 Oct 2026)

1. **Old demo components** — build fresh, do not restore. Done.
2. **Owner photo** — keep a clearly marked placeholder. Do not crop the MD out of `inverter-install-a/01`.
3. **Training** — gets its own `/training` page.
4. **Web3Forms key** — form ships disabled until `NEXT_PUBLIC_FORM_KEY` is set. Key supplied 6 Oct 2026; the form is live locally and must also be set in Cloudflare Pages.
5. **ffmpeg** — installed (Gyan.FFmpeg 9.0.2 via winget).
6. **Placeholders ship.** Anything unanswered renders as a marked placeholder rather than blocking the build; the full list is in 7.3 below.
7. **Brand logos** — names set as type, never scraped manufacturer logos: no licence to display their marks, and doing so implies a dealer relationship he may not hold.
8. **No `aggregateRating` in JSON-LD** — the 5.0 is Google's rating of his listing, linked via `sameAs` rather than republished as first-party review data.

---

## 7.3 Final placeholder list (verified against the code, 6 Oct 2026)

Everything below renders as a clearly marked placeholder or is simply omitted.
Nothing is invented, and no row says "N/A".

### Blocks launch

1. **Domain.** `NEXT_PUBLIC_SITE_URL` in `.env.local`, falling back to
   `https://albaatintechnologies.com` in `src/data/site.ts`. It drives the
   sitemap, canonicals, Open Graph and the JSON-LD `@id`. Wrong here means
   search engines index the wrong host. One edit, one file.

### Visible placeholder on the site

2. **Owner portrait and bio.** `business.owner.photo` and `.bio` are both
   `null`, so the About section leads with a crew photo and shows a red-flagged
   note. Needs `content/owner.jpg` and a few lines in his own words: how he
   started in 2010, why solar, what he is proudest of.

### Missing project facts (the line is omitted, not faked)

3. `rhema-chapel-lekki-lagos` — **type** unconfirmed. It is a church, so it is
   certainly not residential, but we do not guess. It therefore never appears
   under the Homes/Business filters.
4. `inverter-install-c` — **location** unknown.
5. `nysc-oyo-coordinator-office` — **system size** and **date** unknown.

`daffodil-gardens-estate-lagos`, `oasis-integrated-farms` and
`inverter-install-a` are complete.

### Deliberately absent

6. **Warranty terms.** He says "about 2 years" and it varies by product, so the
   site states no figure at all. Confirm per product before publishing one.
7. **Service photography.** No photos exist of the CCTV, intercom, electric
   fence, tracking or satellite work, so those services are a plain text list
   rather than cards with stock icons — nine equal cards would imply a parity
   of evidence we do not have.
8. **Certificate document.** Not uploaded, deliberately: the two photos of
   corps members holding theirs prove more than a scan, and a filled-in
   certificate carries someone else's name and service number.

---

## 7.4 Files created and modified

Across this session (`3cde0ad..HEAD`), excluding regenerated media under
`public/media/`:

### Created

| File | Why |
| --- | --- |
| `app/robots.ts` | robots.txt, `force-static` for `output: export` |
| `app/sitemap.ts` | sitemap.xml, picks up projects automatically |
| `src/components/StructuredData.tsx` | `LocalBusiness` JSON-LD, no fabricated rating |
| `src/components/Lightbox.tsx` | Native `<dialog>` photo viewer, no dependency |
| `src/data/site.ts` | Single source of truth for the canonical origin |

### Modified

| File | Why |
| --- | --- |
| `app/globals.css` | Accent raised to #46cf66; skip link moved outside `@layer` |
| `app/layout.tsx` | Fonts pinned to used weights; canonical; JSON-LD mounted |
| `app/not-found.tsx` | Own title, `noindex`, `canonical: null` |
| `app/projects/[slug]/page.tsx` | Lightbox, per-project OG image, canonical |
| `app/projects/page.tsx` | Canonical |
| `app/training/page.tsx` | Certificates split out, heading levels, lightbox |
| `scripts/optimize-media.mjs` | JPEG social variant; WebP quality 75 -> 68 |
| `src/components/ContactForm.tsx` | `cursor-pointer`, `cursor-wait`, tap target |
| `src/components/ProjectGrid.tsx` | Filter buttons to 44px, `cursor-pointer` |
| `src/components/SiteHeader.tsx` | 44px tap targets, `cursor-pointer` |
| `src/components/SiteFooter.tsx` | 44px tap targets |
| `src/components/home/Contact.tsx` | Phone/email 44px; "WhatsApp" label contrast |
| `src/components/home/FeaturedWork.tsx` | Portrait photos keep their shape |
| `src/components/home/Hero.tsx` | LCP preload; secondary CTA tap target |
| `src/components/home/HowItWorks.tsx` | Numerals readable and `aria-hidden` |
| `src/components/home/Services.tsx` | Brands as type; "Also installed and serviced" |
| `src/components/home/Testimonials.tsx` | Google link tap target |
| `src/components/home/TrainingTeaser.tsx` | Named lead photo, tap target |
| `src/components/layout.tsx` | Section rhythm down from py-44 |
| `src/data/projects.ts` | Oasis alt text and focal point |
| `src/data/training.ts` | `classPhotos` / `certificatePhotos` split |
| `src/lib/media.ts` | `socialImage()` for og:image |
| `README.md` | Add a project/testimonial, Cloudflare deploy, Zoho MX warning |
| `CLAUDE.md` | Locked-in design decisions |
| `build-plan.md` | This file |

---

## Known issues

- **`npm run lint` fails**: `typescript-eslint` does not support TypeScript 7.
  Pre-existing and unrelated to the site code; `next build` runs its own
  TypeScript check and passes. Fix by downgrading TS or waiting for support.
- **Lighthouse performance 79-84 locally**, against a 90 target. Accessibility,
  best practices and SEO are all 100 and CLS is 0. The figure swings 15+ points
  per run on a developer machine and `npx serve` sends no cache headers, so the
  largest reported saving disappears on Cloudflare Pages. Re-measure against
  the deployed URL before treating it as real.
