/**
 * Business facts. Source: content/business.md.
 *
 * Wording rules that matter and are easy to get wrong:
 * - "Serving customers since 2010". The company was REGISTERED in 2018, so
 *   never write "since 2010" next to the word registered.
 * - Installations and corps members trained are "thousands". There is no exact
 *   count, so do not put a number on either.
 * - Warranty is "about 2 years" and varies by product. Do not state a figure.
 */
import type { Address, Phone } from "./types"

export const business = {
  name: "Al-Baatin Technologies Limited",
  shortName: "Al-Baatin Technologies",
  alsoKnownAs: "ICT Master",
  rcNumber: "1513930",
  tagline: "Smart technology, reliable power, trusted security",
  tradingSince: 2010,
  registeredYear: 2018,
  email: "albaatintechnologies@gmail.com",
  owner: {
    name: "Prince Oladepo Abdulwasiu Akorede",
    role: "Managing Director",
    /**
     * PLACEHOLDER: no owner portrait exists yet and no bio has been supplied.
     * Until then the About section uses a crew photo and says so.
     */
    photo: null,
    bio: null,
  },
} as const

export const phones: Phone[] = [
  { number: "0803 239 2690", dial: "+2348032392690", primary: true },
  { number: "0705 791 7502", dial: "+2347057917502", primary: false },
  { number: "0708 442 5902", dial: "+2347084425902", primary: false },
  { number: "0814 944 3421", dial: "+2348149443421", primary: false },
  { number: "0806 900 4450", dial: "+2348069004450", primary: false },
]

export const addresses: Address[] = [
  {
    label: "Head office, Ibadan",
    lines: [
      "South Campus Market",
      "Beside Power Generating House",
      "The Polytechnic Ibadan",
    ],
  },
  {
    label: "Branch, Ibadan",
    lines: [
      "No 4, Alhaji Lasisi Ogo-oluwa Street",
      "Ilupeju Oluseyi, Eleyele",
      "Ibadan",
    ],
  },
  {
    label: "Branch, Lagos",
    lines: ["No 20, Obi Lane", "Okoye Bus-stop, Ajegunle", "Apapa, Lagos"],
  },
]

/**
 * Towns and states he has worked in, per his own pages. He describes the
 * business as nationwide; these are the places actually named.
 */
export const serviceAreas = [
  "Ibadan",
  "Lagos",
  "Ogun",
  "Osun",
  "Ado-Ekiti",
  "Abuja",
  "Kaduna",
  "Kano",
  "Port Harcourt",
  "Ilorin",
]

export const social = {
  instagram: "https://www.instagram.com/albaatin_ictmaster",
  facebook:
    "https://web.facebook.com/p/Al-Baatin-Technologies-Limited-ICT-Master-100063795423442",
  tiktok: "https://www.tiktok.com/@albaatin_ictmaster",
  whatsappCatalogue: "https://wa.me/c/2348032392690",
} as const

export const googleListings = {
  main: {
    label: "The Polytechnic Ibadan",
    url: "https://share.google/mG9mSDJBcqnojIazp",
    rating: 5.0,
    reviewCount: 9,
  },
  branch: {
    label: "Eleyele branch",
    url: "https://share.google/7Im7ojNWFb7YwZQY4",
    rating: 4.9,
    reviewCount: 7,
  },
} as const

/** Equipment he mostly fits. Named because customers ask. */
export const brands = [
  "Felicity",
  "Novel",
  "Welion",
  "Itel",
  "Starplus",
] as const

const WHATSAPP_DIAL = "2348032392690"

/**
 * Build a wa.me link with the message already typed, so the customer only has
 * to press send. Each call site passes wording that fits where the button sits.
 */
export function whatsappLink(
  message = "Hi, I found you on your website and I'd like a quote for solar installation.",
): string {
  return `https://wa.me/${WHATSAPP_DIAL}?text=${encodeURIComponent(message)}`
}

export const whatsapp = {
  dial: WHATSAPP_DIAL,
  display: "0803 239 2690",
  quote: whatsappLink(),
  training: whatsappLink(
    "Hi, I found you on your website and I'd like to ask about the solar and CCTV training.",
  ),
} as const
