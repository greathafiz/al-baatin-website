import type { Metadata, Viewport } from "next"
import { Fraunces, Inter } from "next/font/google"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { StickyWhatsApp } from "@/components/StickyWhatsApp"
import { StructuredData } from "@/components/StructuredData"
import { SITE_URL } from "@/data/site"
import "./globals.css"

// Display face. The logo wordmark is a serif, so the headings inherit from it
// rather than ignoring it. Optical sizing keeps large settings from looking thin.
const fraunces = Fraunces({
  subsets: ["latin"],
  // Only 400 and 600 are used (font-normal and font-semibold), and none of the
  // SOFT/WONK/opsz axes are set anywhere. Shipping the full variable range with
  // three optional axes made fonts 249KiB — heavier than every image on the
  // homepage combined, on a site whose audience is mostly on mobile data.
  weight: ["400", "600"],
  variable: "--font-fraunces",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  // Body copy uses 400, buttons and labels 500; nothing uses 600+ in Inter.
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Al-Baatin Technologies — solar, inverters and security systems",
    template: "%s · Al-Baatin Technologies",
  },
  description:
    "Solar and inverter installation for homes and businesses in Ibadan, Lagos and nationwide. Serving customers since 2010.",
  // Canonical for the homepage; every other page sets its own. Without these
  // the same content reachable at more than one URL (with and without the
  // trailing slash, or on a *.pages.dev preview) splits its ranking.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Al-Baatin Technologies Limited",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  themeColor: "#073b1e",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-NG"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="skip-link bg-canopy px-4 py-2 text-sm font-medium text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyWhatsApp />
        <StructuredData />
      </body>
    </html>
  )
}
