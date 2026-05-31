const steps = [
  {
    number: "01",
    title: "Reach Out",
    body: "Call or WhatsApp us — no forms, no stress.",
  },
  {
    number: "02",
    title: "Free Assessment",
    body: "We visit your site, assess your needs, and give you a free quote.",
  },
  {
    number: "03",
    title: "We Install",
    body: "Our team handles the full setup. Clean, fast, and guaranteed.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-navy-deep py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          The Process
        </p>

        <h2 className="font-sora font-bold text-white text-3xl sm:text-4xl md:text-5xl text-center mb-16 leading-tight">
          Getting Started
          <br />
          Is Simple.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14 relative">
          {/* Dashed connector line — desktop only */}
          <div className="hidden sm:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px border-t-2 border-dashed border-amber/30" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber flex items-center justify-center mb-6 relative z-10">
                <span className="font-sora font-bold text-navy-deep text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="font-sora font-bold text-white text-xl mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-slate-400 text-sm leading-relaxed max-w-xs">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-block bg-amber hover:bg-amber-hover text-navy-deep font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200"
          >
            Get Your Free Quote Today
          </a>
        </div>
      </div>
    </section>
  )
}
