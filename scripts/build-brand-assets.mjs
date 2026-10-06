#!/usr/bin/env node
/**
 * Derive the favicon, apple touch icon and Open Graph image from content/logo.jpg.
 *
 *   node scripts/build-brand-assets.mjs
 *
 * The logo is a wide (1070x436) wordmark on white, which disappears when
 * squashed into a 32px square. So the icon crops to the bar-chart mark at the
 * top of the logo instead, and the OG image letterboxes the full wordmark onto
 * a branded background.
 */
import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const LOGO = path.join("content", "logo.jpg")
const APP_DIR = "app"
const PUB_DIR = "public"

const CANOPY = "#073b1e"

/**
 * The three ascending bars (lime / black / red) sit top-centre of the wordmark.
 * Measured off the source by colour profiling; the right edge stops short of
 * the green swoosh so the icon is just the bars.
 */
const MARK = { left: 380, top: 5, width: 88, height: 110 }

async function main() {
  const meta = await sharp(LOGO).metadata()
  console.log(`Source logo: ${meta.width}x${meta.height}`)

  await fs.mkdir(PUB_DIR, { recursive: true })

  // --- Favicon: the bar mark, padded, on white so it reads at 32px.
  const markBuf = await sharp(LOGO)
    .extract(MARK)
    .resize(180, 180, { fit: "contain", background: "#ffffff" })
    .extend({ top: 18, bottom: 18, left: 18, right: 18, background: "#ffffff" })
    .png()
    .toBuffer()

  await sharp(markBuf).resize(32, 32).toFile(path.join(APP_DIR, "icon.png"))
  await sharp(markBuf).resize(180, 180).toFile(path.join(APP_DIR, "apple-icon.png"))
  console.log("Wrote app/icon.png (32px) and app/apple-icon.png (180px)")

  // --- Open Graph: full wordmark, centred on canopy green, 1200x630.
  const wordmark = await sharp(LOGO)
    .resize(880, null, { fit: "inside" })
    // The logo is on white; keep it on a white plate so it stays legible
    // against the dark card background.
    .extend({ top: 40, bottom: 40, left: 48, right: 48, background: "#ffffff" })
    .png()
    .toBuffer()

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: CANOPY },
  })
    .composite([{ input: wordmark, gravity: "center" }])
    .png()
    .toFile(path.join(PUB_DIR, "og-image.png"))
  console.log("Wrote public/og-image.png (1200x630)")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
