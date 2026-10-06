"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Photo } from "@/data/types"
import { image, isPortrait } from "@/lib/media"

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
  className = "",
  itemClassName = "",
  preserveAspect = false,
  sizes = "(min-width: 640px) 50vw, 100vw",
}: {
  photos: Photo[]
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
        return (current + delta + photos.length) % photos.length
      })
    },
    [photos.length],
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

  const current = openAt === null ? null : photos[openAt]
  const resolved = current ? image(current.key) : null

  return (
    <>
      <div className={className}>
        {photos.map((photo, i) => {
          const thumb = image(photo.key)
          return (
            <button
              key={photo.key}
              type="button"
              onClick={(event) => show(i, event.currentTarget)}
              aria-haspopup="dialog"
              className={`group block cursor-pointer overflow-hidden ${
                preserveAspect
                  ? isPortrait(photo.key)
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
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                style={photo.focal ? { objectPosition: photo.focal } : undefined}
              />
            </button>
          )
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        // Clicking the backdrop closes; the inner figure stops the bubble.
        onClick={close}
        // The dialog itself carries the dark fill rather than relying on
        // ::backdrop alone — the backdrop only paints behind the dialog's own
        // box, so a transparent dialog let the page show through around the
        // photo and made it hard to look at.
        className="max-h-none max-w-none bg-black/90 p-0 backdrop:bg-black/80 open:fixed open:inset-0 open:h-full open:w-full"
      >
        {current && resolved ? (
          <figure
            onClick={(event) => event.stopPropagation()}
            className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={resolved.src}
              src={resolved.src}
              srcSet={resolved.srcSet}
              sizes="100vw"
              width={resolved.width}
              height={resolved.height}
              alt={current.alt}
              // Never upscale past the source: these photos are all he has.
              className="max-h-[80vh] w-auto max-w-full object-contain"
              style={{ maxWidth: `min(100%, ${resolved.width}px)` }}
            />

            <figcaption className="text-meta max-w-[60ch] text-center text-white/80">
              {current.alt}
              {photos.length > 1 ? (
                <span className="mt-1 block text-white/70">
                  {openAt! + 1} of {photos.length}
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
          <span className="sr-only">Close photo viewer</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {photos.length > 1 ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                step(-1)
              }}
              className="fixed left-2 top-1/2 inline-flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 sm:left-4"
            >
              <span className="sr-only">Previous photo</span>
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
              <span className="sr-only">Next photo</span>
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
