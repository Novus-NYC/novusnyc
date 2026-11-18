import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import Accent from "@/components/Accent";
import Eyebrow from "@/components/Eyebrow";
import HomeHero from "@/components/HomeHero";
import HomeNetworkSection from "@/components/HomeNetworkSection";
import PartnerLogoTile from "@/components/PartnerLogoTile";
import PausableMarquee from "@/components/PausableMarquee";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";
import ProjectHoverList from "@/components/ProjectHoverList";
import SectionBand from "@/components/SectionBand";
import ServiceMarquee from "@/components/ServiceMarquee";
import WorkCollage from "@/components/WorkCollage";
import TracksTabbed from "@/components/TracksTabbed";
import { currentProjects as fallbackCurrentProjects, type CommunityPartner } from "@/data";
import { visiblePartnerships } from "@/data/partnerships";
import { getPublicShowcaseCards } from "@/lib/server/publicShowcase";
import { getPublicStatSnapshot, PUBLISHED_IMPACT_TOTALS } from "@/lib/server/publicStats";
import { getPublicCommunityPartners } from "@/lib/server/publicPartners";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: "Novus NYC | Free Consulting for NYC Small Businesses" },
    description:
      `Digital equity is economic equity. Novus connects student teams with New York City small businesses to provide free support in technology, marketing, finance, operations, websites, SEO, social media, and grant development. ${PUBLISHED_IMPACT_TOTALS.students} students, ${PUBLISHED_IMPACT_TOTALS.businesses} businesses served.`,
    openGraph: {
      title: "Novus NYC",
      description: "Digital equity is economic equity. Student teams providing free consulting support for New York City small businesses.",
      images: ["/api/og"],
    },
  };
}


const FLAGSHIP_PARTNER_ORDER = [
  "NYC Small Business Services",
  "NYC Small Business Resource Network",
  "Queens Chamber of Commerce",
  "Brooklyn Chamber of Commerce",
  "Manhattan Chamber of Commerce",
] as const;

const FLAGSHIP_PARTNER_NAMES = new Set<string>(FLAGSHIP_PARTNER_ORDER);
const PARTNERSHIP_ID_BY_NAME = new Map(visiblePartnerships.map((partner) => [partner.name, partner.id]));

const HOME_PROJECT_COUNT = 6;
const SERVICE_FILTERS = ["Website", "SEO", "Social Media", "Graphic Design", "Grants"] as const;

async function getHomeProjectData(): Promise<{ projects: ProjectCardData[]; serviceCounts: Record<string, number> }> {
  const publicShowcase = await getPublicShowcaseCards();
  const featuredHomeCards = publicShowcase
    .filter((card) => card.featuredOnHome)
    .sort((a, b) => (a.homeSortIndex ?? Number.MAX_SAFE_INTEGER) - (b.homeSortIndex ?? Number.MAX_SAFE_INTEGER)
      || a.name.localeCompare(b.name));

  const projects: ProjectCardData[] = featuredHomeCards.length > 0
    ? featuredHomeCards.map((card) => ({
      name: card.name,
      type: card.type,
      neighborhood: card.neighborhood,
      services: card.services,
      status: card.status,
      url: card.url,
      imageUrl: card.imageUrl,
      desc: card.desc,
    }))
    : (publicShowcase.length === 0
      ? fallbackCurrentProjects.slice(0, HOME_PROJECT_COUNT).map((project) => ({
        name: project.name,
        type: "Digital & Tech",
        neighborhood: project.neighborhood,
        services: project.services,
        status: "Ongoing" as const,
        url: project.url,
        desc: project.desc,
        quote: project.quote,
      }))
      : []);

  const serviceCounts: Record<string, number> = {};
  for (const card of publicShowcase) {
    for (const service of card.services) {
      serviceCounts[service] = (serviceCounts[service] ?? 0) + 1;
    }
  }

  return { projects: projects.slice(0, HOME_PROJECT_COUNT), serviceCounts };
}

function ProjectsHeader({ serviceCounts }: { serviceCounts: Record<string, number> }) {
  const filters = SERVICE_FILTERS.filter((service) => serviceCounts[service]);
  return (
    <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow tone="business">Our work</Eyebrow>
        <h2 className="type-h2 mt-3 text-n-ink">Selected <Accent>projects</Accent></h2>
      </div>
      <div className="flex flex-col gap-3 md:items-end">
        {filters.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Browse work by service">
            {filters.map((service) => (
              <li key={service}>
                <Link href={`/showcase?service=${encodeURIComponent(service)}#showcase-projects`} className="filter-chip">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link href="/showcase" className="btn btn-sm btn-outline self-start md:self-auto">
          See all work
          <span aria-hidden="true" className="btn-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

function CurrentProjectsFallback() {
  return (
    <section className="bg-n-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="type-h2 text-n-ink">Selected projects</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading featured projects">
          {[0, 1, 2].map((item) => (
            <div key={item} className="overflow-hidden rounded-card border border-n-border bg-white p-3">
              <div className="aspect-[4/3] animate-pulse rounded-xl bg-n-orange/10" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded-full bg-n-border" />
              <div className="mt-2 mb-2 h-3 w-1/2 animate-pulse rounded-full bg-n-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function CurrentProjectsSection() {
  const { projects, serviceCounts } = await getHomeProjectData();
  const [spotlight, ...rest] = projects;

  return (
    <section className="bg-n-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ProjectsHeader serviceCounts={serviceCounts} />
        {spotlight ? (
          <>
            <div className="hidden lg:block">
              <ProjectHoverList projects={projects} />
            </div>
            <div className="lg:hidden">
            <ProjectCard project={spotlight} spotlight />
            {rest.length > 0 ? (
              <>
                <p className="mono-meta mt-8 text-n-muted sm:hidden" aria-hidden="true">Swipe for more projects →</p>
                <ul className="-mx-5 mt-3 flex gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0" aria-label="More selected projects">
                  {rest.map((project) => (
                    <li key={project.name} className="w-[82vw] max-w-[22rem] shrink-0 sm:w-auto sm:max-w-none">
                      <ProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            </div>
          </>
        ) : (
          <div className="rounded-card border border-n-border bg-white px-6 py-8 text-center">
            <p className="font-display text-lg font-bold text-n-ink">New work is on the way.</p>
            <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-n-muted">Our teams are preparing the next set of project stories. Explore the full body of work while we update this selection.</p>
            <Link href="/showcase" className="mt-4 inline-flex font-body text-sm font-semibold text-n-purple hover:underline">Explore our work →</Link>
          </div>
        )}
      </div>
    </section>
  );
}

function PartnerGroup({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="mb-4 flex items-center gap-3 font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-n-ink/70">
        {title}
        <span aria-hidden="true" className="h-px flex-1 bg-n-border" />
      </h3>
      {children}
    </div>
  );
}

async function CommunityPartnersSection() {
  const partners = await getPublicCommunityPartners();
  const partnerByName = new Map(partners.map((partner) => [partner.name, partner]));
  const flagshipPartners = FLAGSHIP_PARTNER_ORDER
    .map((name) => partnerByName.get(name))
    .filter((partner): partner is CommunityPartner => Boolean(partner));
  const otherPartners = partners.filter((partner) => !FLAGSHIP_PARTNER_NAMES.has(partner.name));
  const keyPartners = otherPartners.filter((partner) => partner.important);
  const networkPartners = otherPartners.filter((partner) => !partner.important);

  return (
    <section className="bg-n-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Community partners</Eyebrow>
            <h2 className="type-h2 mt-3 max-w-[20ch] text-n-ink">
              Working with the organizations trusted by NYC <Accent>small businesses.</Accent>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-body text-base leading-relaxed text-n-muted">
              Chambers, BIDs, local development corporations, and merchant groups connect Novus teams directly with the businesses that need support.
            </p>
            <Link href="/partners" className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.9375rem] font-bold text-n-orange-ink underline-offset-4 hover:underline">
              See what each partnership involves
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="space-y-10">
          <PartnerGroup title="Flagship partners">
            <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
              {flagshipPartners.map((partner, index) => (
                <li key={partner.name} className={flagshipPartners.length % 2 === 1 && index === flagshipPartners.length - 1 ? "col-span-2 mx-auto w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)] lg:col-span-1 lg:w-auto" : undefined}>
                  <PartnerLogoTile partner={partner} partnershipId={PARTNERSHIP_ID_BY_NAME.get(partner.name)} size="lg" />
                </li>
              ))}
            </ul>
          </PartnerGroup>

          {keyPartners.length > 0 ? (
            <PartnerGroup title="Key partners">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {keyPartners.map((partner) => (
                  <li key={partner.name}>
                    <PartnerLogoTile partner={partner} partnershipId={PARTNERSHIP_ID_BY_NAME.get(partner.name)} />
                  </li>
                ))}
              </ul>
            </PartnerGroup>
          ) : null}

          {networkPartners.length > 0 ? (
            <PartnerGroup title="Community network">
              <PausableMarquee label="partner logos">
                <div className="partner-marquee marquee-fade -mx-5 overflow-hidden py-2 md:-mx-8">
                  <div className="partner-marquee-track flex gap-3 md:gap-4">
                    {[0, 1].map((copy) => (
                      <ul key={copy} className="flex gap-3 md:gap-4" aria-hidden={copy === 1 || undefined}>
                        {networkPartners.map((partner) => (
                          <li key={`${copy}-${partner.name}`} className="w-[13.5rem] shrink-0">
                            <PartnerLogoTile partner={partner} partnershipId={PARTNERSHIP_ID_BY_NAME.get(partner.name)} hidden={copy === 1} />
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </PausableMarquee>
            </PartnerGroup>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [{ effectiveValues }, partners] = await Promise.all([
    getPublicStatSnapshot(),
    getPublicCommunityPartners(),
  ]);
  const partnerByName = new Map(partners.map((partner) => [partner.name, partner]));
  const heroPartners = FLAGSHIP_PARTNER_ORDER
    .map((name) => partnerByName.get(name))
    .filter((partner): partner is CommunityPartner => Boolean(partner));

  return (
    <>
      <HomeHero
        partners={heroPartners}
        stats={{
          students: { value: effectiveValues.homeStudentMembers, label: "Student Members", href: "/join" },
          businesses: { value: effectiveValues.homeBusinessesSupported, label: "Businesses Supported", href: "/showcase" },
          partners: { value: effectiveValues.communityOrganizations, label: "Community Partners", href: "/partners" },
          schools: { value: effectiveValues.homeSchoolsRepresented, label: "Schools Represented", href: "/about#leadership" },
        }}
      />

      <SectionBand
        index={1}
        tone="brand"
        bridge
        eyebrow="THE RIGHT CONNECTIONS"
        title={<>A citywide <Accent>network</Accent> of local partnerships.</>}
        detail="Novus works with neighborhood organizations that know the businesses they serve and help us connect with owners who could use support."
        imageSrc="/brooklyn-bridge.jpg"
      />

      <Suspense fallback={<div className="h-72 bg-n-bg" />}>
        <CommunityPartnersSection />
      </Suspense>

      <ServiceMarquee />

      <WorkCollage
        index={2}
        eyebrow="SUPPORT WITH A PURPOSE"
        title={<>One small business <Accent className="text-n-yellow">stronger.</Accent> One city moving forward.</>}
        detail="We turn a business owner’s priorities into websites, marketing, and other practical work they can use."
      />

      <Suspense fallback={<CurrentProjectsFallback />}>
        <CurrentProjectsSection />
      </Suspense>

      <SectionBand
        index={3}
        tone="student"
        eyebrow="FIND YOUR PLACE"
        title={<>Three <Accent>ways</Accent> to work with local businesses.</>}
        align="right"
        detail="Choose Digital & Tech, Marketing, or Finance & Operations and help deliver work that businesses can use."
        imageSrc="/student-collaboration-wide.webp"
      />

      {/* ── THREE TRACKS ─────────────────────────────────────── */}
      <section className="bg-n-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <Eyebrow tone="student">For students</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">The <Accent>three</Accent> tracks</h2>
            <p className="measure mt-4 font-body text-base leading-relaxed text-n-muted">
              Every project is staffed by students across our three tracks. Work ships to production quickly and includes ongoing support after delivery.
            </p>
          </AnimatedSection>
          <TracksTabbed />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/join" className="btn btn-student">
              Explore the tracks
              <span aria-hidden="true" className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <HomeNetworkSection />
    </>
  );
}
