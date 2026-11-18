import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CoreValuesEarth from "@/components/CoreValuesEarth";
import Eyebrow from "@/components/Eyebrow";
import NextStep from "@/components/NextStep";
import HistoryTimeline from "@/components/HistoryTimeline";
import LeadershipProfiles from "@/components/LeadershipProfiles";
import PageHeroContent, { HeroAccentText } from "@/components/PageHeroContent";
import ParallaxHero from "@/components/ParallaxHero";
import SectionProgressNav from "@/components/SectionProgressNav";
import { aboutTimeline, aboutValues, teamMembers } from "@/data";
import { getPublicStatSnapshot } from "@/lib/server/publicStats";
import brooklynBridgePhoto from "../../../public/brooklyn-bridge.jpg";


export const metadata: Metadata = {
  title: "About Our Student-Run Nonprofit",
  description:
    "Novus NYC is a nonprofit corporation incorporated in New York State, run by students from Stuyvesant High School, Baruch College, Cornell University, Stony Brook University, and other schools. Learn about our history, values, and the team behind the work.",
  openGraph: {
    title: "About Novus NYC | Student-Run Nonprofit",
    description: "A student-run nonprofit built on the belief that digital equity is economic equity.",
    images: ["/api/og"],
  },
};

export default async function About() {
  const { effectiveValues } = await getPublicStatSnapshot();

  return (
    <>
      <SectionProgressNav accent="orange" sections={[
        { id: "mission", label: "Mission" },
        { id: "impact", label: "Impact" },
        { id: "leadership", label: "Leadership" },
        { id: "history", label: "History" },
        { id: "values", label: "Core values" },
      ]} />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <ParallaxHero
        image={brooklynBridgePhoto}
        alt="Brooklyn Bridge spanning the East River in New York City"
        className="relative flex min-h-[92svh] items-center overflow-hidden pt-32 pb-20"
        imageClassName="object-cover object-[58%_center] md:object-center"
        parallaxRange={[0, 290]}
      >
        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
          <PageHeroContent
            eyebrow="About Novus"
            title={<>Students doing work that <HeroAccentText>matters.</HeroAccentText></>}
            description="Novus connects high school and college students with real projects for NYC small businesses. Businesses get useful support; students build experience they can show."
            primaryAction={{ href: "/showcase", label: "See our work" }}
            secondaryAction={{ href: "#leadership", label: "Meet the team" }}
            accent="orange"
          />
        </div>
      </ParallaxHero>

      {/* ── MISSION ─────────────────────────────────────────── */}
      <section id="mission" className="blueprint bg-n-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedSection>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(27rem,1.08fr)] lg:items-center lg:gap-16 xl:gap-24">
              <div className="max-w-3xl lg:max-w-[31rem]">
                <Eyebrow index={1} className="mb-5">Our mission</Eyebrow>
                <h2 className="font-display font-bold text-n-ink leading-tight" style={{ fontSize: "clamp(1.5rem, 3.35vw, 2.45rem)" }}>
                  “To close the digital and financial equity gap for small businesses by connecting them with the next generation of tech, finance, and marketing talent.”
                </h2>
                <p className="measure mt-7 font-body text-base leading-relaxed text-n-muted">
                  Students build websites, marketing materials, grant applications, and operational tools that neighborhood businesses can put to use. Along the way, they gain practical client experience and learn to take responsibility for work they can explain with confidence. Novus means “new”: a new resource for businesses and a first opportunity for students to contribute work that matters to a client.
                </p>
              </div>

              <div className="grid grid-cols-12 items-center pb-5 sm:pb-8 lg:pb-10">
                <figure className="relative z-10 col-[1/span_7] row-start-1 w-full -rotate-[3deg] rounded-[1.15rem] bg-white ring-4 ring-white outline outline-1 outline-offset-4 outline-n-border/70 shadow-[0_24px_65px_rgba(42,35,43,0.18)] sm:col-[1/span_6] lg:col-[1/span_7] lg:max-w-[19rem] lg:-rotate-[4deg] xl:max-w-[21rem]">
                  <Image
                    src="/novus1.jpg"
                    alt="Two Novus students with a local restaurant owner"
                    width={640}
                    height={800}
                    sizes="(max-width: 639px) 60vw, (max-width: 1023px) 45vw, 19rem"
                    className="photo-grade aspect-[4/5] w-full rounded-[1.15rem] object-cover"
                  />
                </figure>

                <figure className="relative z-20 col-[6/span_7] row-start-1 mt-56 w-full rotate-[2.5deg] rounded-[1.15rem] bg-white ring-4 ring-white outline outline-1 outline-offset-4 outline-n-border/70 shadow-[0_28px_70px_rgba(42,35,43,0.22)] sm:col-[6/span_7] sm:mt-72 lg:col-[6/span_7] lg:mt-28 lg:max-w-[25rem] lg:rotate-[3deg] xl:max-w-[28rem]">
                  <Image
                    src="/novus2.jpeg"
                    alt="Three Novus students with a community partner at a neighborhood event"
                    width={1280}
                    height={853}
                    sizes="(max-width: 639px) 70vw, (max-width: 1023px) 52vw, 25rem"
                    className="photo-grade aspect-[3/2] w-full rounded-[1.15rem] object-cover"
                  />
                </figure>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── IMPACT NUMBERS ───────────────────────────────────── */}
      <section id="impact" className="band-plum py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection>
            <Eyebrow index={2} onDark>Impact</Eyebrow>
            <h2 className="type-h2 mt-3 text-white mb-10">Our <span className="accent-serif text-n-orange">impact</span></h2>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-n-border bg-n-border shadow-e1 md:grid-cols-4 md:gap-0 md:divide-x md:divide-n-border">
              {[
                { value: effectiveValues.aboutBusinesses, label: "Total\nbusinesses", color: "text-n-orange-ink" },
                { value: effectiveValues.aboutWebsiteProjects, label: "Website\nprojects", color: "text-n-purple-ink" },
                { value: effectiveValues.aboutMarketingProjects, label: "Marketing\nprojects", color: "text-amber-700" },
                { value: effectiveValues.communityOrganizations, label: "Community\norganizations", color: "text-amber-700", href: "/partners" },
              ].map((s) => {
                const inner = <><p className={`stat-value mb-2 font-display text-3xl font-bold leading-none sm:text-4xl md:mb-3 md:text-5xl ${s.color}`}>{s.value}</p><p className="whitespace-pre-line font-mono text-[0.8125rem] uppercase leading-relaxed tracking-[0.08em] text-n-muted">{s.label}{s.href && <span aria-hidden="true"> →</span>}</p></>;
                return (
                  <div key={s.label} className="flex min-h-28 flex-col justify-center bg-white px-3 py-5 text-center sm:px-5 sm:py-7 md:min-h-0 md:px-6 md:py-8">
                    {s.href ? (
                      <Link href={s.href} className="block rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-orange/60">{inner}</Link>
                    ) : (
                      <div>{inner}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── LEADERSHIP ─────────────────────────────────────── */}
      <section id="leadership" className="bg-n-bg py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <Eyebrow index={3}>Leadership</Eyebrow>
                <h2 className="type-h2 mt-3 text-n-ink">Our <span className="accent-serif">leadership</span></h2>
                <p className="font-body text-n-muted mt-3 max-w-2xl leading-relaxed">Students from high schools and colleges who lead teams, build projects, and keep the organization moving.</p>
              </div>
              <div className="flex gap-8 md:pb-1 shrink-0">
                {[
                  { label: "Schools Represented", value: effectiveValues.homeSchoolsRepresented },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="stat-value font-display font-bold text-n-orange-ink text-4xl leading-none">{s.value}</p>
                    <p className="font-mono text-[0.8125rem] text-n-muted uppercase tracking-[0.08em] mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection><LeadershipProfiles members={teamMembers} /></AnimatedSection>
        </div>
      </section>

      {/* ── HISTORY ─────────────────────────────────────────── */}
      <section id="history" className="band-student relative py-16 md:py-20">
        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-12">
            <Eyebrow index={4} tone="student">Our history</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">Building Novus, <span className="accent-serif">one step at a time</span></h2>
            <p className="measure font-body text-n-muted mt-4 leading-relaxed">
              A timeline for the moments, partnerships, and people that shaped our work.
            </p>
          </AnimatedSection>
          <HistoryTimeline milestones={aboutTimeline} />
        </div>
      </section>

      {/* ── CORE VALUES ────────────────────────────────────── */}
      <section id="values" className="bg-n-bg py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <Eyebrow index={5}>Core values</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">Our <span className="accent-serif">core values</span></h2>
            <p className="measure mt-4 font-body leading-relaxed text-n-muted">The standards we use to decide what to take on and how to do the work.</p>
          </AnimatedSection>

          <AnimatedSection>
            <CoreValuesEarth values={aboutValues} />
          </AnimatedSection>
        </div>
      </section>

      <NextStep
        eyebrow="Get involved"
        title="Support for businesses. Real client work for students."
        links={[
          { href: "/businesses", label: "Get business support", tone: "business" },
          { href: "/join", label: "Join as a student", tone: "student" },
        ]}
      />
    </>
  );
}
