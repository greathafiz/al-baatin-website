import { About } from "@/components/home/About"
import { Contact } from "@/components/home/Contact"
import { FeaturedWork } from "@/components/home/FeaturedWork"
import { Hero } from "@/components/home/Hero"
import { HowItWorks } from "@/components/home/HowItWorks"
import { Services } from "@/components/home/Services"
import { Testimonials } from "@/components/home/Testimonials"
import { TrainingTeaser } from "@/components/home/TrainingTeaser"
import { TrustStrip } from "@/components/home/TrustStrip"

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <FeaturedWork />
      <HowItWorks />
      <Testimonials />
      <TrainingTeaser />
      <About />
      <Contact />
    </>
  )
}
