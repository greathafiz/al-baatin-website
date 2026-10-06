import { training, trainingPhotos } from "@/data/training"
import { Img } from "../Media"
import { ButtonLink, Container } from "../ui"

export function TrainingTeaser() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-title font-semibold">
              We train corps members too
            </h2>
            <p className="text-lede mt-4 text-ink-soft">
              Al-Baatin is accredited by NYSC SAED to teach solar installation,
              CCTV and intercom systems. {training.trained} have trained with us,
              in camp and through the service year.
            </p>
            <p className="mt-3 text-ink-soft">
              {training.cost}, certificate on completion. There is no fixed
              timetable, so message us to arrange a start date.
            </p>
            <ButtonLink href="/training/" variant="secondary" className="mt-6">
              About the training
            </ButtonLink>
          </div>

          <Img
            photo={trainingPhotos[0]}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-4/3 w-full rounded-sm object-cover"
          />
        </div>
      </Container>
    </section>
  )
}
