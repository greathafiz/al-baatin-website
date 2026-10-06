import { ButtonLink, Container } from "@/components/ui"

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="font-display text-sm font-semibold text-signal-dark">
          404
        </p>
        <h1 className="text-display mt-2 font-semibold">
          That page is not here
        </h1>
        <p className="text-lede mt-4 max-w-prose text-ink-soft">
          The link may be out of date. Our work and contact details are both a
          click away.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href="/projects/" variant="secondary">
            See our work
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
