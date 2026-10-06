import { image, video } from "@/lib/media"
import type { Photo, Video } from "@/data/types"

/**
 * A photo from the media manifest. Always carries real width/height so the
 * browser reserves the right box before the file arrives — most of this
 * audience is on mobile data and a reflowing page is the thing they notice.
 */
export function Img({
  photo,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  photo: Photo
  className?: string
  sizes?: string
  /** Only the hero should set this. Everything else lazy-loads. */
  priority?: boolean
}) {
  const resolved = image(photo.key)
  return (
    // Plain <img>: the export is unoptimized, so next/image would add a client
    // component and no benefit over a pre-built srcSet.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved.src}
      srcSet={resolved.srcSet}
      sizes={sizes}
      width={resolved.width}
      height={resolved.height}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={className}
      style={photo.focal ? { objectPosition: photo.focal } : undefined}
    />
  )
}

/**
 * A video with a poster frame, no preloading and no autoplay. It downloads
 * nothing until the viewer presses play — `controls` only appears after the
 * poster, so the first paint costs one small WebP rather than several MB.
 */
export function Clip({
  clip,
  className = "",
}: {
  clip: Video
  className?: string
}) {
  const resolved = video(clip.key)
  return (
    <figure className={className}>
      <video
        controls
        preload="none"
        muted
        playsInline
        poster={resolved.poster}
        width={resolved.width}
        height={resolved.height}
        aria-label={clip.alt}
        className="h-full w-full bg-canopy object-cover"
      >
        <source src={resolved.src} type="video/mp4" />
        {/* Shown if the browser cannot play MP4 at all. */}
        <a href={resolved.src}>Download the video</a>
      </video>
      {clip.caption ? (
        <figcaption className="mt-2 text-sm text-ink-soft">
          {clip.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
