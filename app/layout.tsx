import type { Metadata, Viewport } from "next"
import { Fraunces, Inter } from "next/font/google"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { StickyWhatsApp } from "@/components/StickyWhatsApp"
import "./globals.css"

// Display face. The logo wordmark is a serif, so the headings inherit from it
// rather than ignoring it. Optical sizing keeps large settings from looking thin.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://albaatintechnologies.com"),
  title: {
    default: "Al-Baatin Technologies — solar, inverters and security systems",
    template: "%s · Al-Baatin Technologies",
  },
  description:
    "Solar and inverter installation for homes and businesses in Ibadan, Lagos and nationwide. Serving customers since 2010.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Al-Baatin Technologies Limited",
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
      </body>
    </html>
  )
}
