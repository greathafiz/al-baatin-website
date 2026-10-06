/**
 * Google reviews. Source: content/testimonials.md. Quotes are copied exactly,
 * including their original punctuation — they are someone else's words.
 *
 * Google supplies no town and no project type, so `context` is null unless we
 * actually know it. Never invent a location to make a card look fuller.
 */
import type { Testimonial } from "./types"

export const testimonials: Testimonial[] = [
  {
    name: "Michael Anevho",
    quote:
      "He did an amazing job, everything works perfectly And I am enjoying 100% 24 hours electricity. Would definitely recommend him to others :)",
    context: "Solar installation",
    source: "google",
  },
  {
    name: "Princewill E Princewill",
    quote:
      "I'm a proud student of Al-Baatin Technologies and He offers the best Services",
    context: "Training",
    source: "google",
  },
  {
    name: "Ashagidigbi Habeeb",
    quote: "They are the best at what they do. Great customer service too",
    context: null,
    source: "google",
  },
  {
    name: "Oluwatomi Owopetu",
    quote: "Excellent service! Good client relations",
    context: null,
    source: "google",
  },
  {
    name: "Oluwaseun Fagbemi",
    quote: "Professional and neat. Amazing service overall",
    context: null,
    source: "google",
  },
  {
    name: "Akin Kazeem",
    quote: "Love this place they have good after sales support",
    context: null,
    source: "google",
  },
]
