import { whatsapp } from "@/data/business"
import { Img } from "../Media"
import { ButtonAnchor, ButtonLink, Container, WhatsAppIcon } from "../ui"

/** The only landscape photo in the set, and the sharpest: real crew, real roof. */
const heroPhoto = {
  key: "projects/rhema-chapel-lekki-lagos/02-panels-completed-from-above",
  alt: "Two Al-Baatin fitters in hi-vis vests wiring a completed solar array on a dark metal roof, with Lekki rooftops behind them.",
  focal: "50% 42%",
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-canopy">
      <Img
        photo={heroPhoto}
        priority
        sizes="100vw"
        className="hero-settle absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Neutral scrim for text contrast, weighted to the bottom where the
          headline sits. Deliberately black rather than canopy green: a green
          wash over the whole photo tints the panels and the hi-vis vests,
          which are the two things worth seeing. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10"
        aria-hidden="true"
      />

      <Container className="flex min-h-[32rem] flex-col justify-end py-16 sm:min-h-[36rem] md:min-h-[40rem]">
        <div className="max-w-2xl">
          <h1 className="text-display font-semibold text-white">
            Solar that runs your house all day
          </h1>
          <p className="text-lede mt-5 max-w-xl text-bone/85">
            Panels, inverters and batteries sized for your load, installed and
            tested by our own crew. Ibadan, Lagos and nationwide.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor
              href={whatsapp.quote}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-signal text-canopy hover:bg-white"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </ButtonAnchor>
            <ButtonLink
              href="/projects/"
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:bg-white/10"
            >
              See our work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
