import { Frame } from "@/components/layout"
import { Img } from "@/components/Media"
import { WhatsAppIcon } from "@/components/ui"
import { whatsapp } from "@/data/business"
import { image, portraitImage } from "@/lib/media"

/**
 * The sharpest true landscape in the set (1920×1080), which is why it is the
 * hero: every other project photo is a portrait phone shot that has to be
 * cropped hard to fill a wide frame.
 *
 * This file was previously filed under a "Rhema Chapel, Lekki" folder. The
 * client's October 2026 notes corrected that — it is the Kolapo Ishola GRA
 * roof in Ibadan. Same photograph, right job.
 */
const heroPhoto = {
  key: "projects/kolapo-ishola-gra-ibadan/04-crew-fixing-panels-on-metal-roof",
  alt: "Two Al-Baatin fitters in hi-vis vests fixing solar panels to a dark metal roof, with the rooftops of the estate behind them.",
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
  const hero = image(heroPhoto.key)
  // Portrait phones get a crop at their own shape (see PORTRAIT in
  // scripts/optimize-media.mjs): sharper than the slice of the landscape
  // file they would otherwise show, and ~40% smaller.
  const portrait = portraitImage(heroPhoto.key)
  const phone = "(max-width: 767px) and (orientation: portrait)"

  return (
    <header className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden">
      {/*
        Preload the hero: it is the LCP element on every first visit, and
        without this the browser only discovers it after the stylesheet parses.
        Each preload mirrors exactly what the <picture> will pick for the same
        screen — the media queries are complementary — so no device fetches
        both files.
      */}
      {portrait ? (
        <link
          rel="preload"
          as="image"
          href={portrait.src}
          type="image/avif"
          media={phone}
          fetchPriority="high"
        />
      ) : null}
      <link
        rel="preload"
        as="image"
        href={hero.src}
        imageSrcSet={hero.srcSet}
        imageSizes="100vw"
        media={portrait ? `not all and ${phone}` : undefined}
        fetchPriority="high"
      />
      <picture>
        {portrait ? (
          <source
            media={phone}
            type="image/avif"
            srcSet={portrait.src}
            width={portrait.width}
            height={portrait.height}
          />
        ) : null}
        <Img
          photo={heroPhoto}
          priority
          sizes="100vw"
          className="hero-settle absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>
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
          {/*
            Set at body size, not text-meta. This is the only navigational
            call to action in the hero, and at 13px it was the smallest type
            on the screen — smaller than the figure captions — which put the
            least weight on the one link inviting people further into the
            site. It stays a underlined link rather than a second button so
            the WhatsApp button keeps its primacy; the fix is legibility, not
            promotion.
          */}
          <a
            href="#work"
            className="inline-flex min-h-11 items-center border-b border-white/40 text-base text-white transition-colors hover:border-white"
          >
            See the work
          </a>
        </div>
      </Frame>
    </header>
  )
}
