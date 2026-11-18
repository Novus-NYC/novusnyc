import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import BridgeArc from "@/components/BridgeArc";
import Eyebrow from "@/components/Eyebrow";
import Illustration from "@/components/Illustrations";
import NextStep from "@/components/NextStep";
import CityNetwork from "@/components/partnerships/CityNetwork";
import PartnerDirectory from "@/components/partnerships/PartnerDirectory";
import SchoolLogoMarquee from "@/components/partnerships/SchoolLogoMarquee";
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
      <section className="blueprint blueprint--dark band-night relative overflow-hidden pb-6 pt-32" data-home-dark-end="true">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <Eyebrow onDark>Partners</Eyebrow>
          <h1 className="type-display mt-5 max-w-[16ch] text-white">
            The organizations behind our work.
          </h1>
          <p className="measure mt-6 font-body text-lg leading-relaxed text-white/80">
            Community partners help us reach local businesses, while student programs connect young people with work they can own. Our network began in New York and now reaches Chicago.
          </p>
        </div>
      </section>

      <section id="introductions" className="band-night relative scroll-mt-20 pb-8 pt-4">
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

      <section id="student-pipeline" aria-labelledby="student-pipeline-heading" className="blueprint blueprint--dark band-night scroll-mt-20 border-t border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="flex justify-center">
            <Eyebrow onDark tone="student">For students</Eyebrow>
          </div>
          <h2 id="student-pipeline-heading" className="type-display mt-4 text-center text-white">Student Pipeline</h2>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:gap-12 md:mt-12">
            {studentPipelinePartners.map((partner) => (
              <a key={partner.name} href={partner.website} target="_blank" rel="noopener noreferrer" className="group block rounded-xl text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-orange">
                <span className="flex h-32 items-center justify-center transition-transform group-hover:-translate-y-1 sm:h-40">
                  <Image src={partner.logo} alt="" width={320} height={220} className="h-full w-full max-w-56 object-contain" />
                </span>
                <span className="mt-4 block font-display text-base font-bold leading-snug text-white transition-colors duration-1 group-hover:text-n-purple sm:text-xl">{partner.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-16 border-t border-white/10 pt-10 sm:mt-20">
            <h3 className="type-h3 text-center text-white">Schools our members come from</h3>
            <SchoolLogoMarquee />
          </div>
        </div>
      </section>

      <section id="what-partnering-means" className="scroll-mt-20 bg-n-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <AnimatedSection>
            <Eyebrow>For organizations</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">What partnering means</h2>
            <p className="measure mt-4 font-body text-lg leading-relaxed text-n-muted">
              A partnership splits the work. You know the owners in your area. We build what they need online and keep it current.
            </p>
          </AnimatedSection>
          {/* The two sides of a partnership, joined by the span. */}
          <div className="relative mt-12">
            <BridgeArc variant="arch" className="absolute left-[20%] right-[20%] -top-8 hidden h-20 w-[60%] text-n-orange md:block" strokeWidth={2} />
            <div className="relative grid gap-5 md:grid-cols-2 md:gap-8">
              {DIVISION_OF_WORK.map((column, columnIndex) => (
                <div key={column.heading} className={`rounded-card border bg-white p-6 shadow-e1 md:p-8 ${columnIndex === 0 ? "border-n-purple/50" : "border-n-orange/60"}`}>
                  <div className="flex items-center gap-4 border-b border-n-border pb-4">
                    <Illustration name={columnIndex === 0 ? "handshake" : "website"} className="h-14 w-14 shrink-0" />
                    <h3 className="font-display text-xl font-bold text-n-ink">{column.heading}</h3>
                  </div>
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
          </div>
          <div>
            <div className="mt-12 flex flex-col gap-4 border-t border-n-border pt-8 sm:flex-row sm:items-center">
              <a
                href={`mailto:${EMAIL.info}?subject=${encodeURIComponent("Working with Novus")}`}
                className="btn btn-lg btn-brand"
              >
                Email us to start
                <span aria-hidden="true" className="btn-arrow">→</span>
              </a>
              <p className="font-body text-sm text-n-muted">
                Or write to <a href={`mailto:${EMAIL.info}`} className="font-semibold text-n-ink underline underline-offset-4">{EMAIL.info}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="Our work"
        title="Projects across New York City"
        links={[{ href: "/showcase", label: "See our work", tone: "brand" }]}
      />
    </>
  );
}
