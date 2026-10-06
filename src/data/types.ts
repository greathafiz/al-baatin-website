/**
 * Shared content types.
 *
 * Everything the site says about the business lives in src/data/*.ts, built by
 * hand from the source notes in content/. Updating the site after a job means
 * editing one of those files, not hunting through components.
 */

/** A key into public/media/manifest.json, e.g. "projects/foo/01-bar". */
export type MediaKey = string

export type ProjectType = "residential" | "commercial" | "other"

export interface Photo {
  /** Manifest key, without the -800/-1600 suffix or extension. */
  key: MediaKey
  /** Required. Describes what is actually in the frame, not the filename. */
  alt: string
  /**
   * object-position for cover crops. Portrait photos of wall-mounted kit
   * usually want "center"; people shots often need the top kept.
   */
  focal?: string
}

export interface Video {
  key: MediaKey
  /** Describes the clip for anyone who cannot play it. */
  alt: string
  /** Shown under the player. */
  caption?: string
}

/** A TikTok post embedded in place of a local file, for clips we do not host. */
export interface TikTokEmbed {
  postId: string
  caption: string
}

export interface Project {
  slug: string
  title: string
  /** Null when we genuinely do not know; the UI then omits the line. */
  location: string | null
  type: ProjectType | null
  /** Plain-language summary, e.g. "24kVA inverter capacity · 45kWh storage". */
  systemSize: string | null
  /** Human-readable, e.g. "August 2026". */
  date: string | null
  description: string | null
  photos: Photo[]
  videos: Video[]
  /** Named on the site only where the owner gave permission. */
  clientNamed: boolean
  /** Shown in the homepage "featured work" mosaic. */
  featured: boolean
}

export interface Service {
  slug: string
  title: string
  blurb: string
  /** The lead service renders large with a photo; the rest are compact. */
  featured: boolean
  photo?: Photo
}

export interface Testimonial {
  name: string
  quote: string
  /** Only where we actually know it — never invented. */
  context: string | null
  source: "google" | "whatsapp"
}

export interface Address {
  label: string
  lines: string[]
}

export interface Phone {
  number: string
  /** Digits only, for tel: links. */
  dial: string
  primary: boolean
}
