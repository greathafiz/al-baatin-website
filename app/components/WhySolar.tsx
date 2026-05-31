// app/components/WhySolar.tsx
const painPoints = [
  {
    icon: "⚡",
    title: "NEPA Wahala",
    body: "Constant outages disrupt your work, your sleep, your life. You deserve better than waiting for light.",
  },
  {
    icon: "⛽",
    title: "Generator Costs",
    body: "Fuel prices keep rising. Maintenance never stops. A generator is a money pit — solar pays for itself.",
  },
  {
    icon: "📈",
    title: "Rising Electricity Bills",
    body: "Even when NEPA shows up, the bills are climbing. Lock in your energy cost now, permanently.",
  },
]

export default function WhySolar() {
  return (
    <section className="bg-slate-light py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          The Problem
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl text-center mb-4 leading-tight">
          Tired of Living on<br />NEPA&apos;s Schedule?
        </h2>

        <p className="font-inter text-body-gray text-lg text-center mb-12 max-w-xl mx-auto">
          Every Nigerian knows the story. But there&apos;s a better way.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-amber"
            >
              <div className="text-3xl mb-4">{point.icon}</div>
              <h3 className="font-sora font-bold text-navy-deep text-lg mb-2">
                {point.title}
              </h3>
              <p className="font-inter text-body-gray text-sm leading-relaxed">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <p className="font-sora font-bold text-navy-deep text-xl sm:text-2xl text-center">
          Solar isn&apos;t a luxury anymore. It&apos;s the smart move.
        </p>
      </div>
    </section>
  )
}
