"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Photo, Video } from "@/data/types"
import { image, isPortrait, video } from "@/lib/media"

/**
 * An item in the viewer: a photograph, or a video clip.
 *
 * Videos used to live outside the lightbox entirely — the gallery took
 * `Photo[]`, and the project page rendered its clips underneath as separate
 * inline players. So a visitor who opened a photo could arrow through the
 * stills but the videos were simply not in there, which read as the videos
 * being broken rather than absent.
 *
 * The two shapes are kept distinct rather than merged into one loose object,
 * because they resolve through different manifest lookups (`image()` throws on
 * a video key and `video()` throws on an image key) and only one of them has a
 * poster frame.
 */
export type LightboxItem =
  | { kind: "photo"; photo: Photo }
  | { kind: "video"; clip: Video }

const keyOf = (item: LightboxItem) =>
  item.kind === "photo" ? item.photo.key : item.clip.key

const altOf = (item: LightboxItem) =>
  item.kind === "photo" ? item.photo.alt : item.clip.alt

/**
 * A gallery whose photos open full size.
 *
 * Built on native <dialog>, which gives us the top layer, focus trapping and
 * Escape-to-close without a modal library — the brief asks for minimal
 * dependencies and this is the whole reason the element exists.
 *
 * Why it earns its place here: his photos are small (384px to 1600px) and the
 * grid shrinks them further, so a visitor comparing an inverter wall to his own
 * meter board cannot actually see the detail. Opening one full size is the
 * difference between a thumbnail and evidence.
 *
 * Deliberately not animated. The brief allows one motion moment (the hero) and
 * a fading, scaling lightbox on every tap is exactly the kind of thing that
 * dates a site.
 */
export function Lightbox({
  photos,
  items,
  className = "",
  itemClassName = "",
  preserveAspect = false,
  sizes = "(min-width: 640px) 50vw, 100vw",
}: {
  /**
   * Photographs only. Kept so the existing callers that pass a plain
   * `Photo[]` keep working unchanged; pass `items` instead to mix in video.
   */
  photos?: Photo[]
  /** Photos and clips in one ordered run. Takes precedence over `photos`. */
  items?: LightboxItem[]
  className?: string
  /** Applied to each thumbnail button so callers control the grid cell. */
  itemClassName?: string
  /**
   * When true, each thumbnail takes its aspect ratio from the source photo
   * rather than a single fixed ratio. The training galleries mix 384×288
   * landscape with 384×512 portrait, and one forced ratio cropped about half
   * out of every landscape shot.
   *
   * This is a boolean rather than a callback because Lightbox is a client
   * component: a function prop cannot cross the server boundary.
   */
  preserveAspect?: boolean
  sizes?: string
}) {
  /**
   * One list to drive everything. `items` wins when both are supplied; a bare
   * `photos` array is lifted into photo items so the rest of the component
   * only ever deals with one shape.
   */
  const media: LightboxItem[] =
    items ?? (photos ?? []).map((photo) => ({ kind: "photo", photo }) as const)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [openAt, setOpenAt] = useState<number | null>(null)
  /** The thumbnail that opened the dialog, so focus can return to it. */
  const openerRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  const show = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener
    setOpenAt(index)
  }

  // showModal() must be called after the dialog has rendered with content.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openAt !== null && !dialog.open) dialog.showModal()
  }, [openAt])

  const step = useCallback(
    (delta: number) => {
      setOpenAt((current) => {
        if (current === null) return current
        // Wrap, so the arrow keys never dead-end on the first or last photo.
        return (current + delta + media.length) % media.length
      })
    },
    [media.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        step(1)
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        step(-1)
      }
    }

    // Fires for Escape and for close(); returning focus here covers both.
    const onClose = () => {
      setOpenAt(null)
      openerRef.current?.focus()
      openerRef.current = null
    }

    dialog.addEventListener("keydown", onKeyDown)
    dialog.addEventListener("close", onClose)
    return () => {
      dialog.removeEventListener("keydown", onKeyDown)
      dialog.removeEventListener("close", onClose)
    }
  }, [step])

  const current = openAt === null ? null : media[openAt]

  return (
    <>
      <div className={className}>
        {media.map((item, i) => {
          const key = keyOf(item)
          /* A clip's thumbnail is its poster frame, so a video tile costs the
             same as a photo tile: one small WebP, nothing of the MP4. */
          const thumb =
            item.kind === "photo"
              ? image(key)
              : { src: video(key).poster, srcSet: undefined, width: video(key).width, height: video(key).height }

          return (
            <button
              key={key}
              type="button"
              onClick={(event) => show(i, event.currentTarget)}
              aria-haspopup="dialog"
              className={`group relative block cursor-pointer overflow-hidden ${
                preserveAspect
                  ? isPortrait(key)
                    ? "aspect-3/4"
                    : "aspect-4/3"
                  : itemClassName
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb.src}
                srcSet={thumb.srcSet}
                sizes={sizes}
                width={thumb.width}
                height={thumb.height}
                alt={altOf(item)}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                style={
                  item.kind === "photo" && item.photo.focal
                    ? { objectPosition: item.photo.focal }
                    : undefined
                }
              />

              {/*
                Play badge. Without it a video tile is indistinguishable from a
                photo tile — the poster frame IS a still — so the one thing the
                viewer needs to know before tapping is the one thing the tile
                did not say. aria-hidden because the button's own accessible
                name already begins "Play video:".
              */}
              {item.kind === "video" ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-black/55 text-white transition-colors group-hover:bg-black/75">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 translate-x-px">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              ) : null}

              {/* The tile's accessible name. A screen reader user needs to
                  know a tile opens a video before they activate it. */}
              <span className="sr-only">
                {item.kind === "video" ? "Play video: " : "View photo: "}
                {altOf(item)}
              </span>
            </button>
          )
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Media viewer"
        // Clicking the backdrop closes; the inner figure stops the bubble.
        onClick={close}
        // The dialog itself carries the dark fill rather than relying on
        // ::backdrop alone — the backdrop only paints behind the dialog's own
        // box, so a transparent dialog let the page show through around the
        // photo and made it hard to look at.
        className="max-h-none max-w-none bg-black/90 p-0 backdrop:bg-black/80 open:fixed open:inset-0 open:h-full open:w-full"
      >
        {current ? (
          <figure
            onClick={(event) => event.stopPropagation()}
            className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-8"
          >
            {current.kind === "photo" ? (
              (() => {
                const resolved = image(current.photo.key)
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={resolved.src}
                    src={resolved.src}
                    srcSet={resolved.srcSet}
                    sizes="100vw"
                    width={resolved.width}
                    height={resolved.height}
                    alt={current.photo.alt}
                    // Never upscale past the source: these photos are all he has.
                    className="max-h-[80vh] w-auto max-w-full object-contain"
                    style={{ maxWidth: `min(100%, ${resolved.width}px)` }}
                  />
                )
              })()
            ) : (
              (() => {
                const clip = video(current.clip.key)
                return (
                  <video
                    /* Keyed on src so stepping from one clip to the next
                       remounts the element. Without the key React reuses the
                       same <video> node, which keeps the previous file loaded
                       and playing while showing the new poster. */
                    key={clip.src}
                    controls
                    /* The files carry no audio stream at all — it is stripped
                       at encode time in scripts/optimize-media.mjs, so there
                       is nothing to unmute. `muted` is still set so the
                       browser treats this as a silent video (and would allow
                       programmatic play), and the volume control is hidden
                       via controlsList so the UI does not offer a slider that
                       cannot do anything. */
                    muted
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    playsInline
                    /* Opening a video IS the request to watch it, so this one
                       preloads — unlike the inline players on the project
                       page, which stay at preload="none" so a page of clips
                       costs nothing until something is pressed.

                       Deliberately NOT autoplaying. These clips have real
                       audio (site noise, the crew talking), and a tap that
                       starts sound unprompted is the behaviour people hate
                       most on a phone — which is most of this audience.
                       Browsers would also block an unmuted autoplay anyway,
                       and the usual workaround, muting it, is worse: it plays
                       a walkthrough with its sound silently stripped. The
                       poster frame plus the controls make the next step
                       obvious. */
                    preload="auto"
                    poster={clip.poster}
                    width={clip.width}
                    height={clip.height}
                    aria-label={current.clip.alt}
                    className="max-h-[80vh] w-auto max-w-full bg-black object-contain"
                    style={{ maxWidth: `min(100%, ${clip.width}px)` }}
                  >
                    <source src={clip.src} type="video/mp4" />
                    <a href={clip.src} className="text-white underline">
                      Download the video
                    </a>
                  </video>
                )
              })()
            )}

            <figcaption className="text-meta max-w-[60ch] text-center text-white/80">
              {current.kind === "video" && current.clip.caption
                ? current.clip.caption
                : altOf(current)}
              {media.length > 1 ? (
                <span className="mt-1 block text-white/70">
                  {openAt! + 1} of {media.length}
                </span>
              ) : null}
            </figcaption>
          </figure>
        ) : null}

        {/* Close comes first in the DOM so it takes the dialog's initial focus:
            pressing Enter straight after opening should dismiss, not advance.
            It is positioned, so source order does not affect where it appears. */}
        <button
          type="button"
          onClick={close}
          className="fixed right-2 top-2 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 sm:right-4 sm:top-4"
        >
          <span className="sr-only">Close viewer</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {media.length > 1 ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                step(-1)
              }}
              className="fixed left-2 top-1/2 inline-flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 sm:left-4"
            >
              <span className="sr-only">Previous item</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                step(1)
              }}
              className="fixed right-2 top-1/2 inline-flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 sm:right-4"
            >
              <span className="sr-only">Next item</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        ) : null}
      </dialog>
    </>
  )
}
