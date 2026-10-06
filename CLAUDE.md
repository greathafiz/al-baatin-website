@AGENTS.md

# Claude Code prompt: solar installer brochure website

## Content folder

```txt
content/
  logo.svg            (or logo.png — SVG preferred)
  business.md         name, tagline, phone, WhatsApp number, email, address,
                      service areas, years in business, no. of installations,
                      certifications, TikTok/Facebook/Instagram links,
                      Google Business Profile link, short owner bio
  services.md         one heading per service + 1–3 sentences each
                      (solar installation first)
  testimonials.md     one entry per client: name, town, quote, project type
  projects/
    project-slug/     one folder per job
      info.md         title, location, type (residential/commercial/other),
                      system size, date, 1–2 sentence description
      *.jpg / *.mp4   photos and short clips
  owner.jpg           photo of him or the team
```

If anything is missing, use clearly marked placeholders (e.g. `[PHONE]`) and list them for me at the end.

---

## PROMPT

You are building a brochure website for a solar installation business that also offers some related services. The goal: visitors see his real work, trust him, and contact him (mostly via WhatsApp). All business content is in `./content/`. Read it all before you start.

### Workflow

1. Read `content/` and summarise what's there and what's missing.
2. Extract the brand colours from `content/logo.*` (sample the actual pixel/SVG fill values). Propose a design plan: 4–6 named hex colours derived from the logo (plus neutrals), typefaces and their roles, a layout concept with a short ASCII wireframe of the homepage, and 2–3 design principles. Then review the plan: if any part looks like a generic template you'd produce for any business, revise it and say why. Wait for my approval before writing code.
3. Build in steps, and after each major step summarise what you did and what's next.
4. Before deleting, overwriting, or renaming any existing file, show me the change and wait for confirmation.

### Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS.
- Static export for Cloudflare Pages: in `next.config`, set `output: 'export'` and `images: { unoptimized: true }`. No API routes, no server actions, no middleware.
- Write content as typed data files (e.g. `src/data/*.ts`) generated from `content/`, so updating the site later means editing one file.
- Keep dependencies minimal. No UI kit and no heavy animation libraries.

### Pages and sections

**Homepage (`/`)**, in order:

1. Hero: the strongest finished-installation photo, a plain headline saying what he does and where, a one-line subhead, and two buttons: "Chat on WhatsApp" (primary) and "See our work".
2. Trust strip: years in business, installations completed, areas served (only the numbers we actually have).
3. Services: solar installation featured large, other services smaller.
4. Featured work: 6–8 best images and 1–2 short videos, plus a "View all projects" link.
5. How it works: Consultation → Site visit → Installation → Aftercare. This is a real sequence, so numbering is fine here.
6. Testimonials: text cards with name, town, and project type. Use a simple accessible carousel on mobile and a grid on desktop.
7. About: owner/team photo and a short, human story.
8. Contact: WhatsApp button, click-to-call phone, email, service areas, and a simple contact form.
9. Footer: logo, contact details, social links, and copyright with the current year.

**Projects page (`/projects`)**

- Grid of all projects with filter buttons: All / Residential / Commercial / Other.
- Clicking a project opens a lightbox or detail view with all its photos and videos, caption, location, and system size.
- Optionally, a detail page per project at `/projects/[slug]` (statically generated).

**Also:** a custom 404 page and `robots.txt` / `sitemap.xml`.

### Media rules (performance matters; many visitors are on mobile data)

- Write a script `scripts/optimize-media` (Node, using `sharp`) that converts images in `content/projects` to WebP at 1600px and 800px widths, quality ~75, into `public/media/`.
- Videos: max ~20s, compressed to 720p H.264 MP4 (provide an `ffmpeg` command in the README; don't run it if ffmpeg isn't installed). Always show a poster image and use `preload="none"`, muted, with playback only on tap. Never autoplay with sound.
- For longer videos, support embedding a TikTok post URL instead of a file.
- Lazy-load everything below the fold. Target a Lighthouse score of 90+ on mobile.

### Design direction

- Modern, elegant, simple, built to still look right in five years. That means restraint over trends: generous white space, a clear type scale, real photos doing the heavy lifting, and colour taken from the logo used with discipline (one main accent, not everything at once).
- Ground the look in the subject (sun, energy, roofs, clean engineering, reliability) without clichés like stock sun icons everywhere.
- Avoid generic AI/template tells: ALL-CAPS eyebrow labels above every heading, single highlighted words in headlines, identical rounded cards with the same soft shadow everywhere, gradient washes as decoration, "→" on every link, and fade-up animations on every section. Use at most one deliberate motion moment (e.g. the hero load).
- Mobile-first. A sticky WhatsApp button on mobile (bottom right) that doesn't cover content.
- Accessibility: good contrast, visible keyboard focus, alt text on every image, `prefers-reduced-motion` respected.

### Copy

- Plain, confident, specific language from the customer's point of view. No filler ("we are passionate about…"). Sentence case.
- Buttons say exactly what happens: "Chat on WhatsApp", "Call now", "Send message".

### Contact

- WhatsApp: `https://wa.me/<number>?text=` with a prefilled message like "Hi, I found you on your website and I'd like a quote for solar installation."
- Contact form: use a static-friendly service (Web3Forms or Formspree) via a client-side POST. Put the access key in an env variable `NEXT_PUBLIC_FORM_KEY`, and show clear success and error states.

### SEO and local search

- Per-page titles and descriptions, Open Graph image, favicon from the logo.
- `LocalBusiness` JSON-LD with name, phone, areas served, and social links.
- Link to his Google Business Profile.

### Deployment

- Add a README covering: how to add a new project or testimonial, how to run the media script, and how to deploy to Cloudflare Pages (build command `npm run build`, output directory `out`) and connect a custom domain.
- Note in the README that email is handled separately (e.g. Zoho Mail via MX records in Cloudflare DNS) and must not conflict with the site's DNS records.

### Done means

- `npm run build` succeeds with static output in `out/`.
- All pages work on a 375px-wide screen and on desktop.
- A list of every placeholder still needing real content.
- A list of all files you created or modified.

---

## Content update (6 Oct 2026): read this together with the brief above

The content folder has changed since the brief was written. Where this section and the brief disagree, this section wins.

### What is in `content/`

- `logo.jpg` (the official logo; a JPG on a white background; do not redesign it; the navy/green "AB" monogram seen on his social posts is NOT official)
- `business.md`, `services.md`, `testimonials.md`, `2026-10-05-questions-for-client.md` (open questions, ignore for the build)
- `projects/<site-name>/` with an `info.md`, photos (`01-*.jpg`...) and sometimes videos (`video-01-*.mp4`). Folders named after a site have a known location; `inverter-install-a` and `inverter-install-c` do not, so show only what we know for those.
- `training/nysc-saed/` (photos, one video, `info.md`): a dedicated training section or page. He is NYSC SAED accredited, trains corps members in solar, CCTV and intercom, costs N100,000 for the full year, certificate issued, no fixed class schedule (classes start when someone shows interest, so the call to action is WhatsApp). Corps members' photos may be shown (permission given).
- `team/`: crew photos for the About section. There is no owner photo yet: use a clearly marked placeholder.
- `testimonials/`: a WhatsApp screenshot, optional. Use the Google reviews in `testimonials.md` first; show the 5.0 rating and link to his Google listing so visitors can verify.
- `_unassigned/`: good photos not tied to a job (an MPPT charge-controller close-up, a crew on a rooftop wall, a car carrying panels, and the original sideways copy of a rooftop photo, which is ignored because a rotated copy exists in its project). Use these here and there where they fit (service cards, About, backgrounds, gallery filler). The car photo is the weakest; use it sparingly or not at all. Do not attach them to a specific project.
- `reference/al-baatin-flyer.pdf`: reference only.

### Images and videos: use as they are

- All photos are the highest quality he has. They will NOT be replaced with higher-resolution versions. Some are small (640 to 720px wide) or soft, so: never upscale, never stretch; pick the sharper photos for large placements (hero, featured work) and use the smaller ones as thumbnails, gallery items or in grids; crop with `object-fit: cover` and a sensible focal point.
- `scripts/optimize-media` should still make the WebP versions (1600px and 800px wide) but must not enlarge an image beyond its source width.
- Videos: keep each under about 20 seconds (one in `daffodil-gardens-estate-lagos` is 25s, trim it), compress to 720p H.264, always a poster image, `preload="none"`, muted, play on tap. For videos we do not have as files, embed the TikTok posts listed in `business.md`.

### Facts and wording rules

- Show all five phone numbers from `business.md`; the main line and WhatsApp number is 08032392690.
- Trust strip: "serving customers since 2010" (registered 2018) and "thousands" of installations and trained corps members. Nothing more specific than that.
- Clients may be named on the site (permission given), e.g. Oasis Integrated Farms, Rhema Chapel, Daffodil Gardens Estate.
- Services include smart home and access control as well as the flyer list. Brands he uses: Felicity, Novel, Welion, Itel, Starplus (tubular batteries). Warranty is "about 2 years": do not state an exact warranty on the site.
- Anything still unknown stays a clearly marked placeholder, and finish with a list of every placeholder.

---

## Design decisions locked in (6 Oct 2026): do not undo these

This section records choices that were made deliberately and verified. A later
pass that "improves" the design should treat these as constraints, not defaults.

### The design system is derived from his logo, not from a template

The palette comes from sampling `content/logo.jpg`, and the type pairing
(Fraunces display + Inter body) follows the serif in his own wordmark. A
generic recommendation engine will suggest things like Archivo/Space Grotesk
with a `#2563EB` blue and "certificate carousels" — that is a template for any
business and is a downgrade here. **The client's stated goal is a site that is
still right in 5-10 years**, which means restraint, real photographs, and
colour taken from his own brand. Do not swap the palette or fonts for a stock
combination.

### Accent colour rules (contrast-verified, do not change casually)

- `--color-signal` (`#46cf66`) is used **two ways only**: as a surface on the
  dark canopy field (canopy text on it = 6.28:1), and as text on canopy
  (6.28:1). It is **far too light to be text on bone** (1.87:1).
- `--color-signal-dark` (`#0c7f27`) is the accent **as text on light bone**
  (4.76:1).
- The earlier `#10a633` put canopy-on-signal at 3.95:1, which failed the 4.5:1
  threshold on the two most important buttons on the site (the Contact
  WhatsApp button and "Send message"). Do not revert it.
- Never use `--color-logo-green` (`#01fe01`) in the UI. It is logo artwork only.

### Spacing

Section rhythm is `py-12/16/20` scaling to `py-16/24/28`. An earlier pass used
`py-44` (176px top _and_ bottom = 352px between sections), which on a 375px
phone is most of a screen of emptiness between a heading and its content. That
reads as a broken page, not a generous one. Generous white space is right;
disconnected sections are not.

### Touch targets

Every phone number, email address and nav link is a minimum 44px tap target
(`min-h-11`). The phone links are the single most likely thing a visitor on a
phone will press — they were previously 19px tall. Keep them at 44px.

### Honesty constraints that also apply to markup

`LocalBusiness` JSON-LD lives in `src/components/StructuredData.tsx` and is
built from the same typed data as the visible page. It deliberately emits **no
`aggregateRating`**: the 5.0 is Google's own rating for his listing, and
re-publishing it as first-party review data is what Google penalises. The
listing is linked via `sameAs` instead.

### Single source of truth for the domain

`src/data/site.ts` holds `SITE_URL`, used by the sitemap, robots.txt, Open
Graph and the JSON-LD `@id`. It is a placeholder until he buys the domain —
correct it in that one file, not in five.

### Known broken tooling (not caused by the site code)

`npm run lint` fails: `typescript-eslint` does not support TypeScript 7. The
build runs its own TypeScript check and passes. Fix by downgrading TS or
waiting for typescript-eslint support — do not "fix" it by changing site code.
