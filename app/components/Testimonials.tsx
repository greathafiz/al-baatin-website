// app/components/Testimonials.tsx
const testimonials = [
  {
    quote:
      "Before Al-Baatin installed our system, we were spending ₦40,000 a month on fuel alone. Now our electricity is almost free. Best investment we ever made.",
    name: "[Customer Name]",
    location: "Ibadan",
  },
  {
    quote:
      "The installation was so clean and fast. They finished in one day and everything has been working perfectly for months. I've already referred three of my neighbours.",
    name: "[Customer Name]",
    location: "Ibadan",
  },
  {
    quote:
      "My shop used to lose thousands every time NEPA took light. Since Al-Baatin set up our solar, we haven't lost a single hour of business.",
    name: "[Customer Name]",
    location: "Ibadan",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-slate-light py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          What Customers Say
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl text-center mb-16 leading-tight">
          Real People.<br />Real Results.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-amber"
            >
              <div className="font-sora text-amber text-5xl leading-none mb-4 select-none">
                &ldquo;
              </div>
              <p className="font-inter text-body-gray text-sm leading-relaxed mb-6">
                {t.quote}
              </p>
              <div>
                <p className="font-sora font-bold text-navy-deep text-sm">
                  {t.name}
                </p>
                <p className="font-inter text-body-gray text-xs">{t.location}</p>
                <p className="text-amber text-sm mt-2 tracking-widest">★★★★★</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
