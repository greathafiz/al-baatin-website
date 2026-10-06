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

## Deployment

Covered in Stage 7 — Cloudflare Pages, custom domain, and the note about
keeping Zoho Mail MX records clear of the site's DNS.
