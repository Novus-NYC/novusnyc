import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CityNetwork from "@/components/partnerships/CityNetwork";
import PartnerDirectory from "@/components/partnerships/PartnerDirectory";
import { studentPipelinePartners } from "@/data/partnerGroups";
import { EMAIL } from "@/lib/mail";
import { getPublicPartnerships } from "@/lib/server/publicPartnerships";

const DESCRIPTION =
  "Meet the community organizations supporting Novus in New York and Chicago, and the programs connecting students to our work.";

// Open Graph and Twitter are set here so the page does not inherit the root
// layout's pricing language while the founder settles it.
export const metadata: Metadata = {
  title: "Partners",
  description: DESCRIPTION,
  openGraph: { title: "Partners | Novus NYC", description: DESCRIPTION, images: ["/api/og"] },
  twitter: { card: "summary_large_image", title: "Partners | Novus NYC", description: DESCRIPTION, images: ["/api/og"] },
};

const DIVISION_OF_WORK = [
  {
    heading: "What a partner organization does",
    items: [
      "Gives us a footing in its community, so owners who need a website, better search visibility or steadier social media hear about Novus from a name they already know.",
      "Refers the businesses it thinks are a good fit, and tells us what each owner is trying to solve.",
      "Keeps its own line open to owners alongside ours, and relays a message when that is the faster way to reach someone.",
      "Brings us into the neighborhood, whether that is a walk down the corridor or an introduction at a merchant event.",
    ],
  },
  {
    heading: "What Novus does",
    items: [
      "Talks with the owner about what the business needs, and looks at what it already has online.",
      "Builds the work and revises it with the owner until they approve it.",
      "Launches it and hands the owner control of it.",
      "Keeps making updates as the business changes.",
    ],
  },
];

export default async function PartnersPage() {
  const partners = await getPublicPartnerships();

  return (
    <>
      <section className="relative overflow-hidden bg-n-dark pb-6 pt-32" data-home-dark-end="true">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <AnimatedSection>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-n-orange">Partners</p>
            <h1 className="max-w-4xl font-display font-bold leading-[1.02] tracking-tight text-white" style={{ fontSize: "clamp(2.3rem, 5.4vw, 4.2rem)" }}>
              The organizations behind our work.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/80">
              Community partners help us reach local businesses, while student programs connect young people with work they can own. Our network began in New York and now reaches Chicago.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section id="introductions" className="relative scroll-mt-20 bg-n-dark pb-8 pt-4">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <a
            href="#student-pipeline"
            className="sr-only focus:not-sr-only focus:mb-4 focus:inline-block focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:font-semibold focus:text-n-ink"
          >
            Skip the map
          </a>
          <div className="-mx-5 md:mx-0">
            <CityNetwork partners={partners} />
          </div>
        </div>
      </section>

      <PartnerDirectory partners={partners} />

      <section id="student-pipeline" aria-labelledby="student-pipeline-heading" className="scroll-mt-20 border-t border-white/10 bg-n-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <h2 id="student-pipeline-heading" className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Student Pipeline:</h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:gap-8 md:mt-12 md:gap-12">
            {studentPipelinePartners.map((partner) => (
              <a key={partner.name} href={partner.website} target="_blank" rel="noopener noreferrer" className="group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-orange">
                <span className="flex h-40 items-center justify-center rounded-2xl bg-white p-4 transition-transform group-hover:-translate-y-1 sm:h-56 sm:p-7 md:h-64 md:p-9">
                  <Image src={partner.logo} alt="" width={440} height={260} className="h-full w-full object-contain" />
                </span>
                <span className="mt-5 block font-display text-base font-bold leading-snug text-white group-hover:text-n-orange sm:text-xl md:text-2xl">{partner.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="what-partnering-means" className="scroll-mt-20 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <AnimatedSection>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-n-orange-ink">For organizations</p>
            <h2 className="page-section-heading text-n-ink">What partnering means</h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-n-muted">
              A partnership splits the work. You know the owners in your area. We build what they need online and keep it current.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
              {DIVISION_OF_WORK.map((column, columnIndex) => (
                <div key={column.heading}>
                  <h3 className="border-b border-n-border pb-3 font-display text-xl font-bold text-n-ink">{column.heading}</h3>
                  <ol className="mt-4 space-y-3">
                    {column.items.map((item) => (
                      <li key={item} className="flex gap-3 font-body text-base leading-relaxed text-n-ink">
                        <span
                          aria-hidden="true"
                          className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${columnIndex === 0 ? "bg-n-purple" : "bg-n-orange"}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-4 border-t border-n-border pt-8 sm:flex-row sm:items-center">
              <a
                href={`mailto:${EMAIL.info}?subject=${encodeURIComponent("Working with Novus")}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-n-orange px-7 py-3 font-display text-base font-bold text-n-ink transition-colors hover:bg-n-orange-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-n-orange-ink/40"
              >
                Email us to start
              </a>
              <p className="font-body text-sm text-n-muted">
                Or write to <a href={`mailto:${EMAIL.info}`} className="font-semibold text-n-ink underline underline-offset-4">{EMAIL.info}</a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
