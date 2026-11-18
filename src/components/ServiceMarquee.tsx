import PausableMarquee from "@/components/PausableMarquee";

const SERVICES = ["Website", "SEO", "Social Media", "Graphic Design", "Grants"];

/** A deep business-coloured band naming what teams build, on a slow loop. */
export default function ServiceMarquee() {
  return (
    <section aria-label="Services" className="band-ochre relative overflow-hidden py-6 md:py-8">
      <PausableMarquee label="services" dark className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="marquee-fade -mx-5 overflow-hidden md:-mx-8">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
                {[...SERVICES, ...SERVICES].map((service, i) => (
                  <li key={`${copy}-${i}`} className="flex items-center gap-6 whitespace-nowrap px-3 font-display text-[clamp(1.8rem,1.2rem+2vw,3rem)] font-bold tracking-[-0.03em] text-n-yellow">
                    {i % 2 ? <span className="accent-serif text-white">{service}</span> : service}
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 text-n-orange" fill="currentColor">
                      <path d="M10 0 12.4 7.6 20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4Z" />
                    </svg>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </PausableMarquee>
    </section>
  );
}
