import { Frame } from "@/components/layout"
import { Img } from "@/components/Media"
import { WhatsAppIcon } from "@/components/ui"
import { whatsapp } from "@/data/business"

/** The one landscape photo in the set, and the sharpest. */
const heroPhoto = {
  key: "projects/rhema-chapel-lekki-lagos/02-panels-completed-from-above",
  alt: "Two Al-Baatin fitters in hi-vis vests wiring a completed solar array on a dark metal roof, with Lekki rooftops behind them.",
  focal: "50% 45%",
}

/**
 * The photograph is the page.
 *
 * Near-full viewport, edge to edge. Good trade sites give the hero image
 * 60-70% of the screen and keep everything else quiet; an earlier pass boxed
 * it at about 45% and surrounded it with chrome, which is what made the page
 * read as a document.
 */
export function Hero() {
  return (
    <header className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden">
      <Img
        photo={heroPhoto}
        priority
        sizes="100vw"
        className="hero-settle absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Neutral scrim, weighted to the bottom where the type sits. Black
          rather than brand green: a green wash tints the panels and the
          hi-vis vests, which are the two things worth seeing. */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/40 to-black/15"
        aria-hidden="true"
      />

      <Frame width="wide" className="pb-14 md:pb-20">
        <h1 className="text-display max-w-[16ch] font-semibold text-white">
          Power that stays on
        </h1>

        {/* One line. The photograph has already said the rest. */}
        <p className="text-lede mt-6 max-w-[42ch] text-white/80">
          Solar, inverters and batteries for homes and businesses across
          Nigeria.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={whatsapp.quote}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white px-7 py-4 font-medium text-canopy transition-colors hover:bg-signal"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href="#work"
            className="text-meta inline-flex min-h-11 items-center border-b border-white/40 text-white/90 transition-colors hover:border-white"
          >
            See the work
          </a>
        </div>
      </Frame>
    </header>
  )
}
