import { whatsapp } from "@/data/business"
import { WhatsAppIcon } from "./ui"

/**
 * Sticky WhatsApp button, mobile only.
 *
 * Sits bottom-right above the safe-area inset so it clears the iOS home bar.
 * The page adds matching bottom padding (see layout) so the button never covers
 * the last line of content — a floating button that hides the footer phone
 * number would defeat its own purpose.
 */
export function StickyWhatsApp() {
  return (
    <a
      href={whatsapp.quote}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 inline-flex items-center gap-2 rounded-full bg-signal-dark px-4 py-3 text-sm font-medium text-white shadow-lg shadow-canopy/25 transition-colors hover:bg-canopy-soft md:hidden"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Chat on WhatsApp
    </a>
  )
}
