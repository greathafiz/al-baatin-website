/**
 * Services. Source: content/services.md and the flyer.
 *
 * Solar leads because it is the business. The rest are real services he sells,
 * but we have NO photography of any of them — no CCTV, intercom, fence,
 * tracking or satellite job has been photographed. That is why only the lead
 * card carries an image; inventing stock imagery for the others would misstate
 * what we can actually show.
 */
import type { Service } from "./types"

export const services: Service[] = [
  {
    slug: "solar-and-inverter",
    title: "Solar and inverter installation",
    blurb:
      "Complete systems for homes and businesses: panels, inverters, batteries and charge controllers, sized for your load, then installed, wired and tested.",
    featured: true,
    photo: {
      key: "_unassigned/mppt-charge-controller-closeup",
      alt: "An MPPT solar charge controller mounted on a board, its display reading 6.3A from the panels and 55.4V at the battery.",
      // Keep the lit display and the Al-Baatin sticker in frame on a wide crop.
      focal: "50% 42%",
    },
  },
  {
    slug: "cctv-and-security",
    title: "CCTV, electric fence and security",
    blurb:
      "Camera systems, electric fencing and alarms supplied and installed for homes, offices and estates.",
    featured: false,
  },
  {
    slug: "intercom-and-networking",
    title: "Intercom and networking",
    blurb:
      "Intercom systems and network cabling for homes, offices and estates.",
    featured: false,
  },
  {
    slug: "smart-home-and-access",
    title: "Smart home and access control",
    blurb:
      "Home automation and access control, from door entry to controlled gates.",
    featured: false,
  },
  {
    slug: "vehicle-tracking",
    title: "Vehicle tracking",
    blurb: "GPS tracking for single cars and for fleets.",
    featured: false,
  },
  {
    slug: "satellite-tv",
    title: "Satellite TV",
    blurb: "Satellite TV systems supplied and installed.",
    featured: false,
  },
  {
    slug: "electrical-engineering",
    title: "Electrical engineering",
    blurb: "Electrical installation and engineering work.",
    featured: false,
  },
  {
    slug: "ict-and-computers",
    title: "Computers and ICT equipment",
    blurb:
      "Computer repairs and engineering, plus sales of ICT equipment and accessories.",
    featured: false,
  },
  {
    slug: "estate-and-facilities",
    title: "Estate and facility services",
    blurb:
      "Estate management and agency, facility management, space leasing and construction project supervision.",
    featured: false,
  },
]
