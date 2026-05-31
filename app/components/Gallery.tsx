import Image from "next/image"

const photos = Array.from({ length: 9 }, (_, i) => ({
  src: `https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=70&sig=${i}`,
  alt: `Solar installation ${i + 1} by Al-Baatin Technologies, Ibadan`,
}))

export default function Gallery() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          Our Work
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl text-center mb-4 leading-tight">
          20+ Installations
          <br />
          Across Ibadan.
        </h2>

        <p className="font-inter text-body-gray text-lg text-center mb-12">
          Every job done clean. Every system built to last.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
                loading={i < 6 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <p className="font-inter text-body-gray text-sm text-center">
          ✅ All installations completed by certified technicians
        </p>
      </div>
    </section>
  )
}
