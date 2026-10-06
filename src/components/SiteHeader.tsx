"use client"

import Link from "next/link"
import { useState } from "react"
import { whatsapp } from "@/data/business"
import { Container, WhatsAppIcon } from "./ui"

const links = [
  { href: "/projects/", label: "Work" },
  { href: "/training/", label: "Training" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bone/95 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex min-h-11 items-baseline gap-2 py-3 font-display text-lg font-semibold leading-none text-canopy"
          onClick={() => setOpen(false)}
        >
          Al-Baatin
          <span className="hidden text-sm font-normal text-ink-soft sm:inline">
            Technologies
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-sm text-ink transition-colors hover:text-signal-dark"
            >
              {link.label}
            </Link>
          ))}
          {/* Quiet, not a filled button: the hero already carries the primary
              call to action, and two competing green buttons on one screen is
              what made the first pass feel busy. */}
          <a
            href={whatsapp.quote}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-canopy transition-colors hover:text-signal-dark"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-canopy md:hidden"
        >
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-hairline bg-bone md:hidden"
        >
          <Container className="flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-hairline/60 text-base text-ink last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  )
}
