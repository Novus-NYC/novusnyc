import Eyebrow from "@/components/Eyebrow";

const stages = [
  {
    title: "Tell us what you need",
    detail: "Share a little about your business and the support you are looking for.",
  },
  {
    title: "Plan the project",
    detail: "We meet with you, confirm the scope, and set a realistic timeline.",
  },
  {
    title: "Build and review",
    detail: "Your student team shares progress and revises the work with your feedback.",
  },
  {
    title: "Launch and handoff",
    detail: "We finish the work, share access, and walk you through the next steps.",
  },
];

export default function BusinessProcessTimeline() {
  return (
    <section id="process" className="band-ochre py-16 md:py-20" aria-labelledby="business-process-heading">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="business" index={2} onDark>Working with Novus</Eyebrow>
            <h2 id="business-process-heading" className="type-h2 mt-3 max-w-[20ch] text-white">
              Clear steps, regular updates, and <span className="accent-serif text-n-yellow">work you can use.</span>
            </h2>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed text-white/80">
            Most projects take 2 to 4 months, depending on the scope. Smaller projects may move faster.
          </p>
        </div>

        <div className="relative">
          <ol className="relative grid gap-4 md:grid-cols-4 md:gap-5">
            {stages.map((stage, index) => (
              <li key={stage.title} className="relative rounded-card border border-white/10 bg-white p-5 shadow-e3">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-n-ink bg-n-yellow font-mono text-base font-semibold text-n-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-bold leading-tight text-n-ink">{stage.title}</h3>
                <p className="mt-2 font-body text-[0.9375rem] leading-relaxed text-n-ink/75">{stage.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
