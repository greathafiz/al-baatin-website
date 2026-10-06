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

## Stage 1 — Project foundation  `[ ]`

- [ ] 1.1 Decide on the existing `app/` code: delete the old demo components or keep (needs confirmation — see "Open decisions")
- [ ] 1.2 `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`, drop the unsplash remote pattern
- [ ] 1.3 Tailwind v4 theme tokens (colours, type scale, spacing) in the global stylesheet
- [ ] 1.4 Fonts via `next/font` (self-hosted, no network request at runtime)
- [ ] 1.5 Base layout, metadata defaults, skip link, focus styles, `prefers-reduced-motion`

## Stage 2 — Media pipeline  `[ ]`

- [ ] 2.1 `scripts/optimize-media.mjs` with sharp → WebP 1600px + 800px into `public/media/`, never upscaling past source width
- [ ] 2.2 Video posters: extract a frame per video (needs ffmpeg — **not installed**, so use a hand-picked still or document the command)
- [ ] 2.3 Run it, confirm output sizes, add `public/media/` handling to `.gitignore` or commit it (decide)
- [ ] 2.4 Favicon + OG image derived from the logo
- [ ] 2.5 Document the ffmpeg commands for trimming/compressing video in the README (do not run — ffmpeg absent)

## Stage 3 — Typed content data  `[ ]`

- [ ] 3.1 `src/data/business.ts` — name, phones (all five), email, addresses, socials, service areas
- [ ] 3.2 `src/data/services.ts` — solar first, then the rest
- [ ] 3.3 `src/data/projects.ts` — one entry per project folder, with media lists and alt text
- [ ] 3.4 `src/data/testimonials.ts` — Google reviews + rating + listing links
- [ ] 3.5 `src/data/training.ts` — NYSC SAED programme
- [ ] 3.6 Shared types and a single `whatsappLink()` helper

## Stage 4 — Homepage  `[ ]`

- [ ] 4.1 Header + nav (mobile menu)
- [ ] 4.2 Hero
- [ ] 4.3 Trust strip
- [ ] 4.4 Services
- [ ] 4.5 Featured work (images + video)
- [ ] 4.6 How it works
- [ ] 4.7 Testimonials (carousel on mobile, grid on desktop)
- [ ] 4.8 About
- [ ] 4.9 Contact + form (Web3Forms, `NEXT_PUBLIC_FORM_KEY`)
- [ ] 4.10 Footer
- [ ] 4.11 Sticky WhatsApp button (mobile)

## Stage 5 — Other pages  `[ ]`

- [ ] 5.1 `/projects` with All / Residential / Commercial / Other filters
- [ ] 5.2 `/projects/[slug]` static detail pages
- [ ] 5.3 Lightbox for project media
- [ ] 5.4 `/training` — NYSC SAED page
- [ ] 5.5 Custom 404
- [ ] 5.6 `robots.txt` + `sitemap.xml`

## Stage 6 — SEO, accessibility, polish  `[ ]`

- [ ] 6.1 Per-page titles/descriptions + Open Graph
- [ ] 6.2 `LocalBusiness` JSON-LD
- [ ] 6.3 Accessibility pass: contrast, keyboard focus, alt text, reduced motion
- [ ] 6.4 Check at 375px and desktop
- [ ] 6.5 Lighthouse mobile ≥ 90

## Stage 7 — Ship  `[ ]`

- [ ] 7.1 `npm run build` produces `out/`
- [ ] 7.2 README: add a project/testimonial, run the media script, deploy to Cloudflare Pages, custom domain, Zoho MX note
- [ ] 7.3 Final placeholder list
- [ ] 7.4 Final list of files created/modified

---

## Open decisions (need your call)

1. **The existing `app/` demo components** — git shows them already deleted in the working tree. Confirm I should build fresh rather than restore them.
2. **Owner photo** — there is no dedicated portrait, but the MD appears in `inverter-install-a/01`. Use a crop of that for About, or keep a marked placeholder?
3. **Training** — its own `/training` page, or a homepage section only? (Plan currently assumes a page plus a homepage block.)
4. **Web3Forms key** — I need `NEXT_PUBLIC_FORM_KEY`, or the form ships disabled with a clear note.

## Blocked on the client (placeholders until answered)

- Locations/dates/type for `inverter-install-a`, `inverter-install-c`
- ~~Town/state for Oasis Integrated Farms~~ — answered 6 Oct 2026: Lagos-Ibadan Expressway, Ibadan
- Date and system size for the NYSC Oyo coordinator's office
- Owner portrait + a few lines of his story
- Exact warranty terms (site will say "about 2 years" or omit)
- Photos of CCTV / intercom / electric fence / tracking / satellite work (none exist, so those service cards have no imagery)
