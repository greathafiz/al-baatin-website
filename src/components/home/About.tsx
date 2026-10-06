import { Frame, Section } from "@/components/layout"
import { Img } from "@/components/Media"
import { business } from "@/data/business"
import { teamPhotos } from "@/data/team"

/**
 * PLACEHOLDER — owner photo and bio.
 *
 * `business.owner.photo` and `.bio` are both null: no portrait has been
 * supplied and he has not written his story. Until he does, this leads with
 * the crew and shows a visible placeholder rather than quietly filling the
 * gap with a crop of him from a project photo.
 */
export function About() {
  const { owner } = business
  const hasOwnerStory = owner.photo !== null && owner.bio !== null

  return (
    <Section id="about" rhythm="loose" className="bg-bone-deep">
      <Frame width="wide">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="text-title font-semibold">Who you are hiring</h2>

            {hasOwnerStory ? (
              <p className="text-lede mt-5 max-w-[34ch] text-ink-soft">
                {owner.bio}
              </p>
            ) : (
              <>
                <p className="text-lede mt-5 max-w-[34ch] text-ink-soft">
                  The same crew that quotes your job is the one that installs
                  it, in branded vests with the company&rsquo;s number on their
                  backs.
                </p>
                <p className="text-meta mt-4 max-w-[34ch] text-ink-soft">
                  {owner.name} runs the business as {owner.role}.
                </p>
                <p className="text-meta mt-6 max-w-[34ch] border-l-2 border-live-red bg-live-red/5 px-4 py-3 text-ink">
                  <strong className="font-semibold">[PLACEHOLDER]</strong> Needs
                  a photo of Al-Baatin and a few lines in his own words: how he
                  started in 2010, why solar, what he is proudest of.
                </p>
              </>
            )}
          </div>

          <div className="md:col-span-7">
            <Img
              photo={teamPhotos[0]}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        </div>
      </Frame>
    </Section>
  )
}
