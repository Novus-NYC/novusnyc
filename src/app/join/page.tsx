import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ApplicationJourney from "@/components/ApplicationJourney";
import Eyebrow from "@/components/Eyebrow";
import FaqAccordion from "@/components/FaqAccordion";
import Illustration, { type IllustrationName } from "@/components/Illustrations";
import NextStep from "@/components/NextStep";
import PageHeroContent, { HeroAccentText } from "@/components/PageHeroContent";
import ParallaxHero from "@/components/ParallaxHero";
import PausableMarquee from "@/components/PausableMarquee";
import SectionProgressNav from "@/components/SectionProgressNav";
import TracksTabbed from "@/components/TracksTabbed";
import { joinFaqs, marqueeSchools } from "@/data";
import cornellPhoto from "../../../public/cornell-campus-photo.jpg";

export const metadata: Metadata = {
  title: "Volunteer and Internship Opportunities for NYC Students",
  description:
    "Novus is run entirely by high school and college students. Build websites, marketing, grant research, and financial projects for NYC small businesses.",
  openGraph: {
    title: "Volunteer and Internship Opportunities for NYC Students | Novus NYC",
    description: "High school and college students building real websites, marketing, grant research, and financial work for NYC small businesses.",
    images: ["/api/og"],
  },
};

const leadershipSteps = [
  {
    role: "Analyst",
    desc: "Contribute to live projects and ship your first client-facing work.",
  },
  {
    role: "Senior Analyst",
    desc: "Own your workstream and mentor newer analysts on execution quality.",
  },
  {
    role: "Associate",
    desc: "Coordinate with your team, manage key project pieces, and keep client deadlines on track.",
  },
  {
    role: "Senior Associate",
    desc: "Lead work across multiple teams and help set the standard for how projects get done.",
  },
  {
    role: "Project Lead",
    desc: "Run a project from start to finish. You lead the team and own the client relationship.",
  },
];

const ROLE_ILLUSTRATION: Record<string, IllustrationName> = {
  "Neighborhood Liaison": "handshake",
  "School Ambassador": "people",
  "Head of City Expansion": "search",
};

const otherRoles = [
  {
    role: "Neighborhood Liaison",
    desc: "Bridge our project teams and local business owners. You do outreach, join BID visits, and build the on-the-ground relationships that make our work possible.",
  },
  {
    role: "School Ambassador",
    desc: "Represent Novus at your school. You recruit new members, run info sessions, and serve as the main point of contact between your campus and Novus leadership.",
  },
  {
    role: "Head of City Expansion",
    desc: "Launch Novus in a new city. You build local partnerships and establish the first student teams and operating structure from scratch.",
  },
];

export const revalidate = 3600;

const JOIN_FAQ_CATEGORIES = [
  { title: "Getting started", items: joinFaqs.slice(0, 6) },
  { title: "Tracks and projects", items: joinFaqs.slice(6, 11) },
  { title: "Experience and growth", items: joinFaqs.slice(11) },
];

export default async function Join() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: joinFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <SectionProgressNav accent="purple" sections={[
        { id: "tracks", label: "Tracks" },
        { id: "leadership", label: "Leadership" },
        { id: "journey", label: "Your journey" },
        { id: "faq", label: "FAQ" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO + MARQUEE ─────────────────────────────────── */}
      <ParallaxHero
        image={cornellPhoto}
        alt="Cornell University campus, one of the schools represented in Novus"
        className="relative flex min-h-[92svh] flex-col overflow-hidden pt-32"
        imageClassName="object-cover object-[54%_center] md:object-center"
        parallaxRange={[0, 290]}
      >
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-12 md:px-8">
          <PageHeroContent
            eyebrow="For students"
            title={<>Build <HeroAccentText accent="purple">real skills</HeroAccentText> through projects with <HeroAccentText accent="purple">real impact.</HeroAccentText></>}
            description="Join a student team doing real client work for NYC small businesses. Build experience you can show in applications, portfolios, and interviews."
            primaryAction={{ href: "/apply", label: "Start your application" }}
            secondaryAction={{ href: "#tracks", label: "Explore the tracks" }}
            accent="purple"
          />
        </div>
        <div className="relative border-t border-white/15 bg-n-night/40 backdrop-blur-sm">
          <PausableMarquee label="school names" dark className="mx-auto max-w-7xl px-5 pt-3 md:px-8">
            <div className="marquee-fade -mx-5 overflow-hidden pb-4 md:-mx-8">
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1 || undefined}>
                    {marqueeSchools.map((school) => (
                      <li
                        key={`${copy}-${school}`}
                        className="inline-flex select-none items-center gap-4 whitespace-nowrap px-2 font-mono text-[0.8125rem] text-white/85"
                      >
                        {school}
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-n-purple" />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </PausableMarquee>
        </div>
      </ParallaxHero>

      {/* ── TRACKS ─────────────────────────────────────────── */}
      <section id="tracks" className="bg-n-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <Eyebrow tone="student" index={1}>Tracks</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">The three tracks</h2>
            <p className="measure mt-4 font-body text-base leading-relaxed text-n-muted">
              Every project is staffed by students across our three tracks. Pick the one that fits your skills and interests.
            </p>
          </AnimatedSection>
          <TracksTabbed />
        </div>
      </section>

      {/* ── LEADERSHIP TRACK ───────────────────────────────── */}
      <section id="leadership" className="blueprint bg-n-bg py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <AnimatedSection>
              <Eyebrow tone="student" index={2}>Leadership</Eyebrow>
              <h2 className="type-h2 mt-3 text-n-ink">The leadership track</h2>
              <p className="measure mt-4 font-body text-lg leading-relaxed text-n-muted">
                We promote based on the work you do, not how long you have been here. Strong contributors move up quickly.
              </p>
            </AnimatedSection>

            <h3 className="eyebrow mt-10 text-n-ink/70">Other roles</h3>
            <ul className="mt-4 space-y-3">
              {otherRoles.map((role) => (
                <li key={role.role} className="flex gap-4 rounded-card border border-n-border bg-white p-5 shadow-e1">
                  <Illustration name={ROLE_ILLUSTRATION[role.role] ?? "people"} className="h-14 w-14 shrink-0" />
                  <div>
                    <h4 className="font-display text-[1.0625rem] font-bold text-n-ink">{role.role}</h4>
                    <p className="mt-1.5 font-body text-[0.9375rem] leading-relaxed text-n-muted">{role.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* A vertical ladder: one rung per role, bottom to top reads as growth. */}
          <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[1.4rem] before:top-6 before:w-0.5 before:bg-n-purple/60">
            {leadershipSteps.map((step, i) => (
              <li key={step.role} className="relative flex gap-5">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-n-ink bg-n-purple font-mono text-base font-semibold text-n-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 rounded-card border border-n-purple/45 bg-white p-5 shadow-e1">
                  <h3 className="font-display text-lg font-bold text-n-ink">{step.role}</h3>
                  <p className="mt-1.5 font-body text-[0.9375rem] leading-relaxed text-n-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ApplicationJourney />

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section id="faq" className="bg-n-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <Eyebrow tone="student" index={4}>FAQ</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">Frequently Asked Questions</h2>
          </AnimatedSection>
          <FaqAccordion categories={JOIN_FAQ_CATEGORIES} />
        </div>
      </section>

      <NextStep
        eyebrow="Student application"
        title="Start your Novus application."
        description="Join a student-led team doing real client work. The application takes about five minutes."
        links={[{ href: "/apply", label: "Start your application", tone: "student" }]}
      />
    </>
  );
}
