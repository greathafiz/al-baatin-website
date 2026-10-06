import {
  addresses,
  business,
  googleListings,
  phones,
  serviceAreas,
  social,
  whatsapp,
} from "@/data/business"
import { SITE_URL } from "@/data/site"

/**
 * LocalBusiness JSON-LD.
 *
 * This is how Google learns the phone number, the branches and the service
 * areas for a business whose customers search "solar installer near me". It is
 * built from the same typed data the visible page uses, so the two can never
 * drift apart — a mismatch between the markup and the page is the usual reason
 * rich results get withheld.
 *
 * Only claims we can stand behind: no aggregateRating is emitted. The 5.0 on
 * the site is Google's own rating for his listing, and self-reporting someone
 * else's rating as first-party review data is exactly what Google penalises.
 * The listing is linked with sameAs instead so the two records join up.
 */
export function StructuredData() {
  const [head, ...branches] = addresses

  const postal = (a: (typeof addresses)[number]) => ({
    "@type": "PostalAddress",
    streetAddress: a.lines.slice(0, -1).join(", "),
    addressLocality: a.lines.at(-1),
    addressCountry: "NG",
  })

  const data = {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    alternateName: business.alsoKnownAs,
    description:
      "Solar, inverter and battery installation, CCTV, intercom and smart home systems for homes and businesses in Ibadan, Lagos and across Nigeria.",
    url: `${SITE_URL}/`,
    telephone: phones[0].dial,
    email: business.email,
    foundingDate: String(business.tradingSince),
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/icon.png`,
    address: postal(head),
    location: branches.map((b) => ({
      "@type": "Place",
      name: b.label,
      address: postal(b),
    })),
    areaServed: serviceAreas.map((area) => ({ "@type": "Place", name: area })),
    contactPoint: phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.dial,
      contactType: phone.primary ? "sales" : "customer service",
    })),
    sameAs: [
      social.facebook,
      social.instagram,
      social.tiktok,
      googleListings.main.url,
      googleListings.branch.url,
      `https://wa.me/${whatsapp.dial}`,
    ],
  }

  return (
    <script
      type="application/ld+json"
      // The payload is our own build-time data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
