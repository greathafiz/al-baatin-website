import Navbar from "@/app/components/Navbar"
import Hero from "@/app/components/Hero"
import WhySolar from "@/app/components/WhySolar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhySolar />
      </main>
    </>
  )
}
