# Al-Baatin Technologies — website

Brochure site for Al-Baatin Technologies Limited: solar and inverter
installation, security systems, ICT, and NYSC SAED accredited training.

Next.js (App Router) + TypeScript + Tailwind CSS, exported as a static site for
Cloudflare Pages.

See [build-plan.md](build-plan.md) for current progress and what is still
waiting on the client.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export into out/
```

## Media pipeline

Originals live in `content/`. They are never edited in place — the script reads
them and writes web-ready copies into `public/media/`, which is what the site
actually loads.

```bash
pnpm media        # images only: WebP at 1600px and 800px, quality 75
pnpm media:video  # the above, plus transcode videos and cut poster frames
pnpm media -- --force   # rebuild everything, ignoring the cache
```

The script tracks each source file's size and modification time in
`public/media/manifest.json` and skips anything already current, so re-running
it is cheap. The manifest also records real pixel dimensions for every file, so
components can set `width`/`height` and avoid layout shift.

**Images are never upscaled.** These photos are the best copies the client has,
and several are only 720–960px wide. A 720px source emits a 720px file in place
of the 1600px variant rather than an enlarged, softer one.

### Videos

`pnpm media:video` needs ffmpeg:

```bash
winget install Gyan.FFmpeg     # Windows
brew install ffmpeg            # macOS
```

It transcodes each clip to 720p H.264 (short side capped at 720, so portrait
phone clips stay portrait), caps length at 20 seconds, moves the metadata to
the front with `+faststart`, and extracts a poster frame one second in.

To do it by hand, the equivalent commands are:

```bash
# Transcode to 720p H.264, trimming to the first 20 seconds
ffmpeg -i input.mp4 -t 20 \
  -vf "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'" \
  -c:v libx264 -profile:v main -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 96k output.mp4

# Pull a poster frame one second in
ffmpeg -ss 1 -i output.mp4 -frames:v 1 poster.png
```

Videos always render with a poster image and `preload="none"`, muted, playing
only on tap — never autoplaying with sound. For clips that are too long to
trim sensibly, embed the TikTok post instead; the post IDs are in
`content/business.md`.

### Brand assets

```bash
node scripts/build-brand-assets.mjs
```

Regenerates `app/icon.png`, `app/apple-icon.png` and `public/og-image.png` from
`content/logo.jpg`. Only needed if the logo file changes. The favicon crops to
the three-bar mark rather than shrinking the full wordmark, which is illegible
at 32px.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Both values are
`NEXT_PUBLIC_*` and get baked into the static HTML at build time, so never put a
real secret there.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORM_KEY` | Web3Forms access key for the contact form. Without it the form renders disabled with a note pointing at WhatsApp. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash. Used by `sitemap.xml`, `robots.txt` and Open Graph tags. |

**These must also be set in Cloudflare Pages**, under *Settings → Environment
variables*, for the **Production** environment. `.env.local` is gitignored and
never reaches Cloudflare, so a build without them succeeds but silently ships a
disabled contact form and a sitemap pointing at the wrong domain. Add them, then
redeploy — Cloudflare does not rebuild automatically when a variable changes.

After the first deploy, confirm both: open the live site and check the contact
form shows its fields (not the "message form is not set up yet" notice), and
open `/sitemap.xml` and check the URLs use the real domain.

## Adding a new project

Everything the site says lives in `src/data/*.ts`, built by hand from the notes
in `content/`. Adding a job is three steps.

**1. Drop the files in.** Create `content/projects/<slug>/` and put the photos
in it, named so they sort in the order you want them shown:

```txt
content/projects/the-bridge-hotel-ibadan/
  01-inverter-wall.jpg
  02-crew-on-site.jpg
  video-01-walkthrough.mp4      (optional)
```

Use a slug that reads as a URL: lowercase, hyphens, no spaces. It becomes
`/projects/the-bridge-hotel-ibadan/`.

**2. Build the media.**

```bash
npm run media           # images -> WebP at 1600px and 800px, plus a social JPEG
npm run media:video     # only if you added a video; needs ffmpeg
```

This writes `public/media/` and updates `public/media/manifest.json`. Images are
never upscaled past their source, so a small phone photo stays small.

**3. Add the entry** to the `projects` array in `src/data/projects.ts`:

```ts
{
  slug: "the-bridge-hotel-ibadan",
  title: "The Bridge Hotel",
  location: "Ibadan",            // null if you do not know
  type: "commercial",            // "residential" | "commercial" | "other" | null
  systemSize: "8kVA hybrid · 15kWh storage",
  date: "November 2026",
  description: "One or two plain sentences about the job.",
  clientNamed: true,             // false unless he has given permission
  featured: false,               // true puts it on the homepage
  photos: [
    {
      key: "projects/the-bridge-hotel-ibadan/01-inverter-wall",
      alt: "Describe what is actually in the frame, not the filename.",
      focal: "center",
    },
  ],
  videos: [],
}
```

Rules worth keeping:

- **`key` is the path without the extension or the `-800`/`-1600` suffix.** If
  it is wrong the build fails with a clear error rather than shipping a gap.
- **`alt` is required and should describe the photo**, because it is read aloud
  by screen readers and shown if the image fails to load.
- **Use `null`, never `"N/A"`.** The page omits a missing row entirely.
- The sitemap picks the project up automatically. No other file to edit.

To feature it on the homepage, set `featured: true` and add an entry to the
`entries` array in `src/components/home/FeaturedWork.tsx`, which carries the
big display number (`45` / `kWh`) shown beside the photo.

## Adding a testimonial

Add to the `testimonials` array in `src/data/testimonials.ts`:

```ts
{
  name: "Adebayo O.",
  quote: "Their words, not a tidied-up version.",
  context: "Solar installation",  // what the job was; null if unknown
  source: "google",          // "google" | "whatsapp"
}
```

The homepage shows the first entry large. Google's rating and review count are
in `googleListings` in `src/data/business.ts` — update those by hand when they
change, since nothing fetches them at build time.

## Deployment — Cloudflare Pages

### First deploy

1. Push to GitHub (`git push origin main`).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
   Git**, and pick this repository.
3. Build settings:
   - Framework preset: **None** (do not pick "Next.js" — that preset expects a
     server runtime; this site is a static export)
   - Build command: `npm run build`
   - Output directory: `out`
4. Add the environment variables from the table above under **Settings →
   Environment variables → Production**. The build succeeds without them but
   silently ships a disabled contact form and a wrong-domain sitemap.
5. Deploy, then run the post-deploy checks above.

### Custom domain

In the project: **Custom domains → Set up a custom domain**, enter the domain,
and follow the prompts. If the domain is already on Cloudflare DNS, the record
is created for you. Then set `NEXT_PUBLIC_SITE_URL` to the real origin and
redeploy, so the sitemap, canonicals and Open Graph tags point at the live host
rather than the placeholder.

### Email: do not let the site break it

Email is handled separately — Zoho Mail via MX records on the same domain. The
site only needs the apex `A`/`CNAME` (and `www`). When adding the custom domain,
**do not remove or overwrite the `MX` records, or the `TXT` records holding SPF,
DKIM and the Zoho verification token.** Deleting those stops his mail silently:
the site stays up, and incoming email simply bounces. Check the DNS tab after
adding the domain and confirm the MX rows are still there.

## Performance notes

Lighthouse mobile on the production build: **accessibility, best practices and
SEO all 100**; performance 79–84 measured locally. Local figures are pessimistic
and swing by 15+ points run to run on a developer machine, mainly because
`npx serve` sends no cache headers — the "use efficient cache lifetimes" saving
Lighthouse reports disappears on Cloudflare Pages, which sets them. Re-measure
against the deployed URL before treating the number as real.

What has already been done, and should not be undone:

- Fonts are pinned to the weights actually used (Fraunces 400/600, Inter
  400/500). The full variable ranges were 249 KiB — heavier than every image on
  the homepage combined.
- Images are WebP at quality 68, never upscaled past source, with real
  `width`/`height` so CLS stays at 0.
- The hero is preloaded; it is the LCP element on every first visit.
- `og:image` points at a JPEG, not the WebP the page uses, because WhatsApp
  does not reliably render WebP link previews — and WhatsApp is how most of his
  work gets shared.
