import type { ReactNode } from "react"

/**
 * Layout primitives.
 *
 * The first build put everything in one centred max-w-6xl column with identical
 * padding, which is the main reason it read as a document rather than a design.
 * These give three widths and two vertical rhythms so sections can differ in
 * weight instead of all arriving at the same temperature.
 */

type Width = "text" | "default" | "wide" | "bleed"

const widths: Record<Width, string> = {
  /** Reading measure — under 70 characters. */
  text: "mx-auto w-full max-w-[38rem] px-5 sm:px-6",
  default: "mx-auto w-full max-w-6xl px-5 sm:px-8",
  wide: "mx-auto w-full max-w-[100rem] px-5 sm:px-8",
  /** Edge to edge: no gutter at all. */
  bleed: "w-full",
}

export function Frame({
  width = "default",
  children,
  className = "",
}: {
  width?: Width
  children: ReactNode
  className?: string
}) {
  return <div className={`${widths[width]} ${className}`}>{children}</div>
}

/**
 * Vertical rhythm.
 *
 * An earlier pass pushed "loose" to py-44 (176px top AND bottom, so 352px
 * between sections). On a 375px phone that is most of a screen of nothing
 * between a heading and the thing it introduces, which reads as a broken page
 * rather than a generous one. These values still give the photographs room to
 * breathe while keeping each heading on screen with its own content.
 */
const rhythms = {
  tight: "py-12 md:py-16",
  normal: "py-16 md:py-24",
  loose: "py-20 md:py-28",
}

export function Section({
  rhythm = "normal",
  children,
  className = "",
  id,
}: {
  rhythm?: keyof typeof rhythms
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={`${rhythms[rhythm]} ${id ? "scroll-mt-4" : ""} ${className}`}
    >
      {children}
    </section>
  )
}

/**
 * A section label that is not an ALL-CAPS eyebrow. It carries a number only
 * where the content is genuinely sequential, and otherwise just sits quietly
 * in the margin as a running head.
 */
export function RunningHead({ children }: { children: ReactNode }) {
  return (
    <p className="text-meta mb-6 border-t border-hairline pt-3 text-ink-soft">
      {children}
    </p>
  )
}
