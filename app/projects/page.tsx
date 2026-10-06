import type { Metadata } from "next"
import { ProjectGrid } from "@/components/ProjectGrid"
import { Container } from "@/components/ui"
import { projects } from "@/data/projects"

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Solar, inverter and battery installations by Al-Baatin Technologies in Lagos, Ibadan and across Nigeria.",
}

export default function ProjectsPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h1 className="text-display font-semibold">Our work</h1>
        <p className="text-lede mt-4 max-w-prose text-ink-soft">
          Every system here was installed by our own crew. Sizes are the real
          ones we fitted, not examples.
        </p>

        <div className="mt-10">
          <ProjectGrid projects={projects} />
        </div>
      </Container>
    </section>
  )
}
