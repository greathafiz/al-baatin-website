import Link from "next/link"
import {
  business,
  googleListings,
  phones,
  social,
} from "@/data/business"
import { Container } from "./ui"

const socialLinks = [
  { href: social.facebook, label: "Facebook" },
  { href: social.instagram, label: "Instagram" },
  { href: social.tiktok, label: "TikTok" },
  { href: googleListings.main.url, label: "Google" },
]

export function SiteFooter() {
  // Extra bottom padding on mobile so the sticky WhatsApp button rests over
  // empty footer space rather than covering the copyright line.
  return (
    <footer className="bg-canopy pb-28 pt-12 text-bone md:pb-12">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              {business.shortName}
            </p>
            <p className="mt-1 text-sm text-bone/70">{business.tagline}</p>
            <p className="mt-3 text-sm text-bone/70">
              RC {business.rcNumber}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <ul className="mt-1 text-sm">
              {phones.slice(0, 2).map((phone) => (
                <li key={phone.dial}>
                  <a
                    href={`tel:${phone.dial}`}
                    className="inline-flex min-h-11 items-center text-bone/80 transition-colors hover:text-white"
                  >
                    {phone.number}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex min-h-11 items-center break-all text-bone/80 transition-colors hover:text-white"
                >
                  {business.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Pages</h2>
            <ul className="mt-1 text-sm">
              <li>
                <Link href="/projects/" className="inline-flex min-h-11 items-center text-bone/80 transition-colors hover:text-white">
                  Our work
                </Link>
              </li>
              <li>
                <Link href="/training/" className="inline-flex min-h-11 items-center text-bone/80 transition-colors hover:text-white">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="inline-flex min-h-11 items-center text-bone/80 transition-colors hover:text-white">
                  Get a quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Follow</h2>
            <ul className="mt-1 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-bone/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-bone/15 pt-6 text-sm text-bone/60">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
