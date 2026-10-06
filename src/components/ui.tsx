import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

/** Consistent page gutter and max width. 16px gutter holds at 375px. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Section heading. Deliberately no eyebrow label above it — the heading says
 * what the section is, and a tracked-out caption on top would just be chrome.
 */
export function SectionHeading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode
  as?: "h2" | "h3"
  className?: string
}) {
  return (
    <Tag className={`text-title font-semibold ${className}`}>{children}</Tag>
  )
}

type ButtonVariant = "primary" | "secondary" | "quiet"

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-base font-medium transition-colors duration-150"

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-signal-dark text-white hover:bg-canopy-soft",
  secondary:
    "border border-canopy/25 bg-transparent text-canopy hover:border-canopy hover:bg-canopy/5",
  quiet: "text-canopy underline underline-offset-4 hover:text-signal-dark",
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      {...props}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
    />
  )
}

/** For wa.me, tel: and other external destinations. */
export function ButtonAnchor({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return (
    <a
      {...props}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
    />
  )
}

/** The WhatsApp glyph. Inline so there is no icon dependency. */
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.22-8.23 8.22z" />
    </svg>
  )
}
