#!/usr/bin/env node
/**
 * Build the web-ready media set in public/media/ from the originals in content/.
 *
 *   node scripts/optimize-media.mjs            # images only (no ffmpeg needed)
 *   node scripts/optimize-media.mjs --video    # images + video transcode/posters
 *   node scripts/optimize-media.mjs --force    # redo work even if up to date
 *
 * Images  -> WebP at 1600px and 800px wide, quality 75.
 * Videos  -> 720p H.264 MP4 (<= MAX_VIDEO_SECONDS) plus a WebP poster frame.
 *
 * These photos are the best copies the client has and will not be re-shot, so
 * the script NEVER enlarges past the source width. A 720px-wide original emits
 * a 720px "1600" variant rather than an upscaled, softer one.
 */
import { createHash } from "node:crypto"
import { execFile } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { promisify } from "node:util"
import sharp from "sharp"

const execFileAsync = promisify(execFile)

const CONTENT_DIR = "content"
const OUT_DIR = path.join("public", "media")
const MANIFEST = path.join(OUT_DIR, "manifest.json")

const WIDTHS = [1600, 800]
const QUALITY = 75
const MAX_VIDEO_SECONDS = 20
const POSTER_AT = 1.0 // seconds into the clip; 0 often lands on a black frame

/** Folders under content/ whose media belongs on the site. */
const INCLUDE = ["projects", "training", "team", "testimonials", "_unassigned"]

const args = new Set(process.argv.slice(2))
const DO_VIDEO = args.has("--video")
const FORCE = args.has("--force")

/* ------------------------------------------------------------------ helpers */

const walk = async (dir) => {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

/** content/projects/foo/01-bar.jpg -> projects/foo/01-bar */
const slugFor = (file) =>
  path
    .relative(CONTENT_DIR, file)
    .replace(/\\/g, "/")
    .replace(/\.[^.]+$/, "")

const fingerprint = async (file) => {
  const { size, mtimeMs } = await fs.stat(file)
  return createHash("sha1").update(`${size}:${Math.round(mtimeMs)}`).digest("hex").slice(0, 12)
}

const readManifest = async () => {
  if (FORCE) return {}
  try {
    return JSON.parse(await fs.readFile(MANIFEST, "utf8"))
  } catch {
    return {}
  }
}

/** Resolve an ffmpeg-family binary from PATH, falling back to the winget install. */
const resolveBinary = async (name) => {
  try {
    await execFileAsync(name, ["-version"])
    return name
  } catch {
    /* not on PATH — try the standard winget location below */
  }
  const local = process.env.LOCALAPPDATA
  if (local) {
    const candidate = path.join(
      local,
      "Microsoft/WinGet/Packages",
      "Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe",
      "ffmpeg-9.0.2-full_build/bin",
      `${name}.exe`,
    )
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      /* fall through */
    }
  }
  return null
}

/* ------------------------------------------------------------------- images */

async function processImage(file, manifest, next) {
  const slug = slugFor(file)
  const hash = await fingerprint(file)
  const meta = await sharp(file).metadata()

  // EXIF-rotated phone photos report pre-rotation dimensions; autoOrient fixes
  // the pixels, so measure the orientation-corrected size for the cap below.
  const upright = meta.orientation && meta.orientation >= 5
  const srcWidth = upright ? meta.height : meta.width
  const srcHeight = upright ? meta.width : meta.height

  const variants = {}
  let wrote = 0

  for (const target of WIDTHS) {
    const width = Math.min(target, srcWidth) // never upscale
    const dest = path.join(OUT_DIR, `${slug}-${target}.webp`)
    variants[target] = {
      src: `/media/${slug}-${target}.webp`,
      width,
      height: Math.round((width / srcWidth) * srcHeight),
    }

    if (manifest[slug]?.hash === hash) {
      try {
        await fs.access(dest)
        continue // already built from this exact source
      } catch {
        /* missing on disk — rebuild */
      }
    }

    await fs.mkdir(path.dirname(dest), { recursive: true })
    await sharp(file)
      .autoOrient()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest)
    wrote++
  }

  next[slug] = { hash, type: "image", width: srcWidth, height: srcHeight, variants }
  return wrote
}

/* ------------------------------------------------------------------- videos */

async function processVideo(file, manifest, next, bins) {
  const slug = slugFor(file)
  const hash = await fingerprint(file)
  const destVideo = path.join(OUT_DIR, `${slug}.mp4`)
  const destPoster = path.join(OUT_DIR, `${slug}-poster.webp`)

  const { stdout } = await execFileAsync(bins.ffprobe, [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height:format=duration",
    "-of", "default=nw=1:nk=1",
    file,
  ])
  const [w, h, dur] = stdout.trim().split(/\s+/)
  const duration = Number(dur)
  const trimmed = duration > MAX_VIDEO_SECONDS

  const entry = {
    hash,
    type: "video",
    src: `/media/${slug}.mp4`,
    poster: `/media/${slug}-poster.webp`,
    width: Number(w),
    height: Number(h),
    duration: Math.min(duration, MAX_VIDEO_SECONDS),
    trimmed,
  }

  if (manifest[slug]?.hash === hash) {
    try {
      await fs.access(destVideo)
      await fs.access(destPoster)
      next[slug] = entry
      return 0
    } catch {
      /* missing on disk — rebuild */
    }
  }

  await fs.mkdir(path.dirname(destVideo), { recursive: true })

  // Scale so the SHORT side is at most 720 — these are portrait phone clips, so
  // capping height would leave them needlessly small.
  const scale = "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'"
  await execFileAsync(bins.ffmpeg, [
    "-y", "-i", file,
    ...(trimmed ? ["-t", String(MAX_VIDEO_SECONDS)] : []),
    "-vf", scale,
    "-c:v", "libx264", "-profile:v", "main", "-crf", "26", "-preset", "slow",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", // metadata first so playback starts sooner
    "-c:a", "aac", "-b:a", "96k",
    destVideo,
  ])

  // Poster frame, so nothing downloads until the viewer taps play.
  const posterRaw = path.join(OUT_DIR, `${slug}-poster-raw.png`)
  await execFileAsync(bins.ffmpeg, [
    "-y", "-ss", String(Math.min(POSTER_AT, duration / 2)),
    "-i", destVideo, "-frames:v", "1", posterRaw,
  ])
  await sharp(posterRaw)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(destPoster)
  await fs.rm(posterRaw, { force: true })

  next[slug] = entry
  return 1
}

/* --------------------------------------------------------------------- main */

async function main() {
  const roots = []
  for (const dir of INCLUDE) {
    const full = path.join(CONTENT_DIR, dir)
    try {
      await fs.access(full)
      roots.push(full)
    } catch {
      /* optional folder */
    }
  }

  const files = (await Promise.all(roots.map(walk))).flat()
  const images = files.filter((f) => /\.(jpe?g|png)$/i.test(f))
  const videos = files.filter((f) => /\.mp4$/i.test(f))

  const manifest = await readManifest()
  const next = {}

  console.log(`Images: ${images.length} source file(s)`)
  let built = 0
  for (const file of images) built += await processImage(file, manifest, next)
  console.log(`  ${built} variant(s) written, ${images.length * WIDTHS.length - built} already current`)

  if (!DO_VIDEO) {
    console.log(`\nVideos: skipped (${videos.length} found). Re-run with --video to transcode.`)
    // Preserve previously built video entries so the manifest stays complete.
    for (const [slug, entry] of Object.entries(manifest)) {
      if (entry.type === "video" && !next[slug]) next[slug] = entry
    }
  } else {
    const bins = {
      ffmpeg: await resolveBinary("ffmpeg"),
      ffprobe: await resolveBinary("ffprobe"),
    }
    if (!bins.ffmpeg || !bins.ffprobe) {
      console.error(
        "\nffmpeg/ffprobe not found. Install with:  winget install Gyan.FFmpeg" +
          "\nSkipping video; images above are done.",
      )
    } else {
      console.log(`\nVideos: ${videos.length} source file(s)`)
      for (const file of videos) {
        const n = await processVideo(file, manifest, next, bins)
        console.log(`  ${n ? "built" : "current"}  ${slugFor(file)}`)
      }
    }
  }

  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.writeFile(MANIFEST, `${JSON.stringify(next, null, 2)}\n`)
  console.log(`\nManifest: ${MANIFEST} (${Object.keys(next).length} entries)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
