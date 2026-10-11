import { Frame, Section } from "@/components/layout"
import { Img } from "@/components/Media"
import { business, googleListings } from "@/data/business"
import { teamPhotos } from "@/data/team"

/**
 * Who you are hiring — answered with the crew, not a portrait.
 *
 * There is no owner photograph and there will not be one: he does not want
 * his picture on the site. `business.owner.photo` stays null, and this section
 * no longer treats that as a gap waiting to be filled. The earlier pass showed
 * a red [PLACEHOLDER] box asking for his portrait and bio, which shipped to
 * real visitors and advertised an absence that is actually a decision.
 *
 * So the question "who you are hiring" gets answered the way a trade customer
 * actually means it: not "whose face is on the website" but "who turns up, are
 * they the same people who quoted, and can I check them". That is the crew,
 * the branded vests with the number on the back, and the Google listing.
 *
 * Three crew photographs rather than one.
 * The one thing we have genuine depth of imagery on is the crew — three
 * separate shoots, day and evening. A single 4:3 photo beside a paragraph was
 * also the exact layout used by Services and the training teaser, so this
 * section read as the same module for the third time. A stack of three at
 * different sizes is specific to the one subject we can actually show.
 *
 * Crew names are deliberately absent: we have not asked whether they want to
 * be named. See src/data/team.ts.
 */
export function About() {
  const { owner } = business
  const [lead, ...others] = teamPhotos

  return (
    <Section id="about" rhythm="loose" className="bg-bone-deep">
      <Frame width="wide">
        {/*
          Text first and narrow, photographs below and wide — rather than the
          text-beside-photo split this section used to share with two of its
          neighbours. The heading gets a reading measure of its own instead of
          being squeezed into a 5-column gutter next to an image.
        */}
        <div className="max-w-[46rem]">
          <h2 className="text-title font-semibold">Who you are hiring</h2>
          <p className="text-lede mt-6 text-ink">
            The same crew that quotes your job is the one that installs it, in
            branded vests with the company&rsquo;s number across the back. No
            subcontractors arriving in an unmarked van.
          </p>
          {/*
            Two sentences, not one. src/data/business.ts carries an explicit
            wording rule: never put "since 2010" next to the word "registered",
            because 2010 is when he started trading and 2018 is when the
            limited company was registered. In one sentence the two dates read
            as though the company itself has existed since 2010, which is the
            claim the rule exists to prevent. Split, each date sits with the
            thing it actually describes.
          */}
          <p className="mt-4 max-w-[62ch] text-ink-soft">
            {owner.name} has run the business as {owner.role} since{" "}
            {business.tradingSince}, trading as {business.alsoKnownAs}.
          </p>
          <p className="mt-2 max-w-[62ch] text-ink-soft">
            It is registered as {business.name}.
          </p>
        </div>

        {/*
          RC number and the Google listing: the two things a cautious customer
          can independently verify before letting anyone onto their roof. They
          sit together because they do the same job, and they are the honest
          substitute for a founder portrait — a face proves nothing, a company
          number and a public review history can be checked.
        */}
        <dl className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-hairline pt-6">
          <div className="flex items-baseline gap-3">
            <dt className="text-meta text-ink-soft">Registered</dt>
            <dd className="font-display text-xl font-semibold text-canopy">
              RC {business.rcNumber}
            </dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="text-meta text-ink-soft">Reviewed</dt>
            <dd className="font-display text-xl font-semibold text-canopy">
              <a
                href={googleListings.main.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline decoration-hairline decoration-2 underline-offset-[6px] transition-colors hover:decoration-signal-dark"
              >
                {googleListings.main.rating.toFixed(1)} on Google
              </a>
            </dd>
          </div>
        </dl>

        {/*
          Lead photo wide, the two evening shots paired beneath it. Unequal
          sizes on purpose: three equal thumbnails would be a gallery widget,
          and this is meant to read as one crew seen three times.
        */}
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <Img
              photo={lead}
              sizes="(min-width: 768px) 66vw, 100vw"
              className="aspect-16/10 w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-1">
            {others.map((photo) => (
              <Img
                key={photo.key}
                photo={photo}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="aspect-4/3 w-full object-cover md:aspect-3/2"
              />
            ))}
          </div>
        </div>
      </Frame>
    </Section>
  )
}
