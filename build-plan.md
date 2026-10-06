# Al-Baatin Technologies — build plan

Brochure site for Al-Baatin Technologies Limited (solar, security, ICT, NYSC SAED training).
Status key: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked on client

Last updated: 6 Oct 2026

---

## Stage 0 — Read content and agree the design  `[~]`

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

## Stage 6 — SEO, accessibility, polish  `[ ]`

- [ ] 6.1 Per-page titles/descriptions + Open Graph
- [x] 6.2 `LocalBusiness` JSON-LD
- [ ] 6.3 Accessibility pass: contrast, keyboard focus, alt text, reduced motion
- [ ] 6.4 Check at 375px and desktop
- [ ] 6.5 Lighthouse mobile ≥ 90

## Stage 7 — Ship  `[ ]`

- [ ] 7.1 `npm run build` produces `out/`
- [ ] 7.2 README: add a project/testimonial, run the media script, deploy to Cloudflare Pages, custom domain, Zoho MX note
- [ ] 7.3 Final placeholder list
- [ ] 7.4 Final list of files created/modified

---

## Decisions made (6 Oct 2026)

1. **Old demo components** — build fresh, do not restore. Done.
2. **Owner photo** — keep a clearly marked placeholder. Do not crop the MD out of `inverter-install-a/01`.
3. **Training** — gets its own `/training` page.
4. **Web3Forms key** — ships with the form disabled until `NEXT_PUBLIC_FORM_KEY` is set; documented in `.env.example`.
5. **ffmpeg** — installed (Gyan.FFmpeg 9.0.2 via winget).
6. **Placeholders ship.** Anything unanswered renders as a marked placeholder rather than blocking the build; the full list is kept below for chasing the client.

## Blocked on the client (placeholders until answered)

- Locations/dates/type for `inverter-install-a`, `inverter-install-c`
- ~~Town/state for Oasis Integrated Farms~~ — answered 6 Oct 2026: Lagos-Ibadan Expressway, Ibadan
- Date and system size for the NYSC Oyo coordinator's office
- Owner portrait + a few lines of his story
- Exact warranty terms (site will say "about 2 years" or omit)
- Photos of CCTV / intercom / electric fence / tracking / satellite work (none exist, so those service cards have no imagery)
