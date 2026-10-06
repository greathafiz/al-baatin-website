/**
 * Typed access to public/media/manifest.json, written by scripts/optimize-media.mjs.
 *
 * The manifest records the real pixel size of every file, so components can set
 * width/height and reserve the right space before anything loads. That is what
 * keeps CLS at zero on a slow connection, which is most of this audience.
 */
import manifestJson from "../../public/media/manifest.json"
import type { MediaKey } from "@/data/types"

interface Variant {
  src: string
  width: number
  height: number
}

interface ImageEntry {
  type: "image"
  width: number
  height: number
  variants: Record<string, Variant>
}

interface VideoEntry {
  type: "video"
  src: string
  poster: string
  width: number
  height: number
  duration: number
  trimmed: boolean
}

type Entry = ImageEntry | VideoEntry

const manifest = manifestJson as unknown as Record<string, Entry>

export interface ResolvedImage {
  src: string
  srcSet: string
  width: number
  height: number
}

/**
 * Resolve an image to its largest variant plus a srcSet, so the browser can
 * pick the 800px file on a phone and the larger one on a desktop.
 *
 * Sources below 1600px wide were never upscaled, so the two variants can be the
 * same size; in that case we emit a single srcSet entry rather than claiming two
 * widths that are really identical.
 */
export function image(key: MediaKey): ResolvedImage {
  const entry = manifest[key]
  if (!entry || entry.type !== "image") {
    throw new Error(
      `No image in the media manifest for "${key}". Run \`pnpm media\` after adding it to content/.`,
    )
  }

  const large = entry.variants["1600"]
  const small = entry.variants["800"]

  const parts = [`${small.src} ${small.width}w`]
  if (large.width > small.width) parts.push(`${large.src} ${large.width}w`)

  return {
    src: large.src,
    srcSet: parts.join(", "),
    width: large.width,
    height: large.height,
  }
}

export interface ResolvedVideo {
  src: string
  poster: string
  width: number
  height: number
  duration: number
}

export function video(key: MediaKey): ResolvedVideo {
  const entry = manifest[key]
  if (!entry || entry.type !== "video") {
    throw new Error(
      `No video in the media manifest for "${key}". Run \`pnpm media:video\` after adding it to content/.`,
    )
  }
  const { src, poster, width, height, duration } = entry
  return { src, poster, width, height, duration }
}

/** True when the source is portrait, so layouts can reserve a taller box. */
export const isPortrait = (key: MediaKey): boolean => {
  const entry = manifest[key]
  return entry ? entry.height > entry.width : false
}
