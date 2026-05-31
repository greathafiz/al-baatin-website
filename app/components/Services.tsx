const services = [
  {
    icon: "🏠",
    title: "Residential Installation",
    body: "Complete solar setup for your home. We handle everything — design, installation, and testing.",
  },
  {
    icon: "🏢",
    title: "Commercial Installation",
    body: "Power your office, shop, or warehouse. We size systems for business loads and budget.",
  },
  {
    icon: "🔋",
    title: "Solar Products",
    body: "Panels, inverters, batteries — we supply and install quality equipment built to last.",
  },
  {
    icon: "🔧",
    title: "Maintenance & Repairs",
    body: "Existing system underperforming? We diagnose, service, and repair all brands.",
  },
]

export default function Services() {
  return (
    <section className="bg-navy-deep py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          What We Do
        </p>

        <h2 className="font-sora font-bold text-white text-3xl sm:text-4xl md:text-5xl text-center mb-16 leading-tight">
          Everything Solar,
          <br />
          Done Right.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-navy-mid rounded-2xl p-6 flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center text-2xl">
                {service.icon}
              </div>
              <div>
                <h3 className="font-sora font-bold text-white text-lg mb-2">
                  {service.title}
                </h3>
                <p className="font-inter text-slate-400 text-sm leading-relaxed">
                  {service.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="font-sora font-semibold text-amber text-base hover:text-amber-hover transition-colors duration-200"
          >
            Get a Free Assessment →
          </a>
        </div>
      </div>
    </section>
  )
}
