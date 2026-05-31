const brands = ["Luminous", "Felicity", "Growatt"]

export default function Brands() {
  return (
    <section className="bg-navy-deep py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4">
          Brands We Work With
        </p>

        <h2 className="font-sora font-bold text-white text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
          Quality Equipment
          <br />
          You Can Trust.
        </h2>

        <p className="font-inter text-slate-400 text-lg mb-12 max-w-lg mx-auto">
          We only install brands with proven track records in the Nigerian
          market.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="bg-navy-mid rounded-xl px-10 py-5 flex items-center justify-center"
            >
              <span className="font-sora font-bold text-white text-lg tracking-wide">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
