import Image from "next/image";
import Link from "next/link";
import BridgeIllustration from "@/components/BridgeIllustration";
import Accent from "@/components/Accent";
import Eyebrow from "@/components/Eyebrow";
import RotatingAudience from "@/components/RotatingAudience";
import type { CommunityPartner } from "@/data";
import storefront from "../../public/petite-dumpling-storefront.jpg";
import students from "../../public/novus2.jpeg";

export type HeroStat = { value: string; label: string; href: string };

/**
 * Two sides joined: a business on one side, a student team on the other, with
 * the Novus bridge spanning them.
 */
export default function HomeHero({
  stats,
  partners,
}: {
  stats: { students: HeroStat; businesses: HeroStat; partners: HeroStat; schools: HeroStat };
  partners: CommunityPartner[];
}) {
  return (
    <section className="home-hero-depth blueprint relative overflow-hidden bg-n-bg pb-10 pt-24 sm:pt-28 md:pb-12 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div>
          <Eyebrow>NYC / In motion</Eyebrow>
          <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.5rem,1.3rem+3.7vw,4.6rem)] font-bold leading-[1.0] tracking-[-0.04em] text-n-ink [text-wrap:balance]">
            Free websites and marketing support for{" "}
            <span className="marker-highlight">NYC <Accent>small businesses.</Accent></span>
          </h1>
          <RotatingAudience className="mt-6" />
          <p className="measure mt-5 font-body text-lg leading-relaxed text-n-ink/75">
            Built by student teams. Businesses get practical help, and students gain experience they can use in applications and interviews.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-3">
            <div>
              <Link href="/businesses" className="btn btn-lg btn-business w-full">
                Get Free Business Support
                <span aria-hidden="true" className="btn-arrow">→</span>
              </Link>
              <p className="mono-meta mt-2 text-center text-n-muted sm:text-left">
                <span className="stat-value font-semibold text-n-ink">{stats.businesses.value}</span> {stats.businesses.label.toLowerCase()}
              </p>
            </div>
            <div>
              <Link href="/join" className="btn btn-lg btn-outline-student w-full">
                Join as a Student
              </Link>
              <p className="mono-meta mt-2 text-center text-n-muted sm:text-left">
                <span className="stat-value font-semibold text-n-ink">{stats.students.value}</span> {stats.students.label.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Business on the left pier, students on the right, the span between. */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-hidden="true">
          <BridgeIllustration water={false} className="relative z-0 w-full text-n-orange-ink/80" />
          <p aria-hidden="true" className="script-note absolute -bottom-10 right-[4%] z-20 flex items-end gap-1 text-n-purple-ink sm:-bottom-12">
            <svg viewBox="0 0 48 36" className="mb-3 h-8 w-10 -scale-x-100" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M4 32 C 12 10, 28 6, 42 8" />
              <path d="M34 2 L42 8 L35 15" />
            </svg>
            student-built
          </p>
          <div className="relative z-10 mt-3 grid grid-cols-2 items-start gap-4 px-[8%] sm:gap-6">
            <figure className="relative -rotate-2 overflow-hidden rounded-card border-4 border-white bg-white shadow-e3">
              <Image
                src={storefront}
                alt=""
                placeholder="blur"
                priority
                sizes="(min-width: 1024px) 280px, 45vw"
                className="photo-grade aspect-[4/5] w-full object-cover object-[60%_center]"
              />
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-n-yellow px-2.5 py-1 font-mono text-[0.75rem] font-semibold text-n-ink">
                For businesses
              </figcaption>
            </figure>
            <figure className="relative mt-8 rotate-2 overflow-hidden rounded-card border-4 border-white bg-white shadow-e3 sm:mt-12">
              <Image
                src={students}
                alt=""
                placeholder="blur"
                priority
                sizes="(min-width: 1024px) 280px, 45vw"
                className="photo-grade aspect-[4/5] w-full object-cover"
              />
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-n-purple px-2.5 py-1 font-mono text-[0.75rem] font-semibold text-n-ink">
                For students
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Proof, without scrolling: partners and the four numbers. */}
      <div className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-4 border-t border-n-border pt-6 md:flex-row md:items-center md:gap-8">
          <Eyebrow as="p" className="shrink-0">Community partners</Eyebrow>
          <ul className="grid grid-cols-2 items-center gap-x-6 gap-y-4 sm:grid-cols-4 md:flex md:flex-1 md:justify-between">
            {partners.slice(0, 4).map((partner) => (
              <li key={partner.name} className="relative h-11 w-full md:w-40">
                <Image src={partner.logo} alt={partner.name} fill sizes="160px" className="object-contain object-left md:object-center" />
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-8 grid grid-cols-2 overflow-hidden rounded-card border border-n-border bg-white shadow-e1 md:grid-cols-4">
          {[stats.students, stats.businesses, stats.partners, stats.schools].map((stat, index) => (
            <div key={stat.label} className={`relative ${index % 2 === 1 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} ${index === 2 ? "md:border-l" : ""} border-n-border`}>
              <Link href={stat.href} className="group flex h-full flex-col justify-between gap-2 px-5 py-5 transition-colors duration-1 hover:bg-n-orange/10 md:px-6 md:py-6">
                <dd className="stat-value font-display text-[clamp(2rem,1.4rem+2vw,3rem)] font-bold leading-none text-n-ink">{stat.value}</dd>
                <dt className="mono-meta flex items-center justify-between gap-2 uppercase tracking-[0.08em] text-n-muted">
                  {stat.label}
                  <span aria-hidden="true" className="text-n-orange-ink transition-transform duration-2 ease-out group-hover:translate-x-1">→</span>
                </dt>
              </Link>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
