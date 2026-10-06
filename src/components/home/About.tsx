import { business } from "@/data/business"
import { teamPhotos } from "@/data/team"
import { Img } from "../Media"
import { Container, SectionHeading } from "../ui"

/**
 * PLACEHOLDER — owner photo and bio.
 *
 * `business.owner.photo` and `.bio` are both null: no portrait has been
 * supplied and he has not written his story yet. Until he does, this section
 * leads with the crew and shows a visible placeholder rather than quietly
 * filling the gap with a crop of him from a project photo.
 */
export function About() {
  const { owner } = business
  const hasOwnerStory = owner.photo !== null && owner.bio !== null

  return (
    <section id="about" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <Img
            photo={teamPhotos[0]}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-4/3 w-full rounded-sm object-cover"
          />

          <div>
            <SectionHeading>Who you are hiring</SectionHeading>

            {hasOwnerStory ? (
              <p className="text-lede mt-5 text-ink-soft">{owner.bio}</p>
            ) : (
              <>
                <p className="text-lede mt-5 text-ink-soft">
                  Al-Baatin Technologies has been fitting power and security
                  systems since 2010, and was registered as a company in 2018.
                  The same crew that quotes your job is the one that turns up to
                  install it, in branded vests, with the company&rsquo;s number
                  on their backs.
                </p>
                <p className="mt-4 text-ink-soft">
                  {owner.name} runs the business as {owner.role}.
                </p>

                <p className="mt-6 border-l-2 border-live-red bg-live-red/5 px-4 py-3 text-sm text-ink">
                  <strong className="font-semibold">[PLACEHOLDER]</strong> Needs
                  a photo of {owner.name} and a few lines in his own words: how
                  he started in 2010, why solar, and what he is proudest of.
                </p>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
