import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import FormLanguageChips from "@/components/FormLanguageChips";
import Illustration, { type IllustrationName } from "@/components/Illustrations";
import NextStep from "@/components/NextStep";
import ParallaxHero from "@/components/ParallaxHero";
import PartnerLogoTile from "@/components/PartnerLogoTile";
import SectionProgressNav from "@/components/SectionProgressNav";
import BusinessProcessTimeline from "@/components/BusinessProcessTimeline";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import PageHeroContent, { HeroAccentText } from "@/components/PageHeroContent";
import { visiblePartnerships } from "@/data/partnerships";
import { getPublicCommunityPartners } from "@/lib/server/publicPartners";
import petiteDumplingStorefront from "../../../public/petite-dumpling-storefront.jpg";

export const metadata: Metadata = {
  title: "Free Help for NYC Small Businesses",
  description:
    "NYC small businesses: get a free website, social media, grant writing, or SEO from a dedicated student team. Design and development at no charge. Novus NYC is a nonprofit corporation incorporated in New York State.",
  openGraph: {
    title: "Free Help for NYC Small Businesses | Novus NYC",
    description:
      "Student teams build websites, grow social media, write grants, and optimize SEO for NYC small businesses at no cost. Reach out to get started.",
    images: ["/api/og"],
  },
};

const SERVICES = [
  {
    illustration: "website" as IllustrationName,
    title: "Website design and development",
    summary: "We build your website from scratch, or fix the one you have.",
    details: [
      "Custom website built or redesigned from scratch",
      "Mobile-friendly, fast-loading pages with clear service and contact sections",
      "Ongoing updates and maintenance after launch",
    ],
  },
  {
    illustration: "search" as IllustrationName,
    title: "Google Search and Maps visibility",
    summary: "Show up when customers search for you on Google and Maps.",
    details: [
      "Google Business Profile setup and optimization",
      "Yelp and Apple Maps listing cleanup",
      "Website improvements for search ranking",
    ],
  },
  {
    illustration: "social" as IllustrationName,
    title: "Social media and content",
    summary: "A posting plan and real content, not a strategy deck you'll never use.",
    details: [
      "Weekly posting plan based on your goals",
      "Original short videos and graphics using your story",
      "Simple tracking so you know what's working",
    ],
  },
  {
    illustration: "design" as IllustrationName,
    title: "Graphic design",
    summary: "Print and digital materials your customers actually take home.",
    details: [
      "Menu design and layout for restaurants and cafés",
      "Flyers, signage, and promotional materials",
      "Business cards, loyalty cards, and branded templates",
    ],
  },
  {
    illustration: "finance" as IllustrationName,
    title: "Sales and financial analysis",
    summary: "We go through your numbers and tell you what they actually mean.",
    details: [
      "Sales and revenue trend breakdowns",
      "Nearby competitor and pricing comparison",
      "Clear recommendations for pricing and operations",
    ],
  },
  {
    illustration: "grants" as IllustrationName,
    title: "Grant research and writing",
    summary: "We find the grants, write the application, and hand it to you to sign.",
    details: [
      "Grant eligibility research for your business",
      "Full application drafting, including writing, budget, and materials",
      "Deadline tracking and final submission prep",
    ],
  },
] as const;

const PARTNER_FAQS = [
  {
    q: "Is this really free?",
    a: "Design and development are 100% free. Novus NYC is a nonprofit corporation incorporated in New York State, and our student teams do the work at no charge to your business. The only costs are the ones every website has: a domain name and hosting, which together run about $10 a month. The finished site and its code are yours.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects take around 2 to 4 months from the first conversation to launch, depending on the business and project scope. Simpler projects can move much faster. We give you a timeline before we start.",
  },
  {
    q: "What do I need to provide?",
    a: "Just 30 minutes for an initial conversation to go over your needs. After that, we handle the work and keep you updated along the way.",
  },
  {
    q: "Who will be working on my project?",
    a: "A team of high school and college students from across NYC, led by a project director. You will know who is on your team and what they are working on.",
  },
  {
    q: "Do I need to be tech-savvy?",
    a: "Not at all. We handle the technical work and walk you through how to use and maintain what we build.",
  },
  {
    q: "What types of businesses do you work with?",
    a: "We support small, independently owned businesses across NYC, including restaurants, retailers, professional services, and neighborhood organizations. Tell us about your needs and we will let you know whether we are a fit.",
  },
  {
    q: "Can you help if I already have a website?",
    a: "Yes. We can review and improve an existing site, help update its content, or recommend a focused next step such as search visibility, mobile usability, or clearer customer information.",
  },
  {
    q: "Will I own the work after the project ends?",
    a: "Yes. We build projects for your business and make sure you have the access and information you need to continue using them after handoff.",
  },
  {
    q: "How often will I hear from my team?",
    a: "Your team will agree on a communication schedule at the start of the project. You can expect regular progress updates and a clear point of contact for questions.",
  },
  {
    q: "Can you work in languages other than English?",
    a: "We will do our best to match your needs and can discuss language preferences during the initial conversation. Let us know what would make communication most comfortable for you.",
  },
  {
    q: "What happens when the project is complete?",
    a: "We walk you through the finished work, share any needed access, and provide simple next-step guidance. Some projects may also be eligible for continued support, depending on team capacity.",
  },
  {
    q: "Can a BID or community organization refer a business?",
    a: "Yes. We welcome referrals from BIDs, community groups, schools, and local partners. Include the business name and a little context in the contact form so we can follow up.",
  },
  {
    q: "What if I need help that is not listed here?",
    a: "Reach out anyway. We will listen to what you need and let you know whether a Novus student team can help, or whether another local resource may be a better fit.",
  },
];

const PARTNER_FAQ_CATEGORIES = [
  { title: "Working with Novus", items: PARTNER_FAQS.slice(0, 6) },
  { title: "Your project", items: PARTNER_FAQS.slice(6, 10) },
  { title: "Support and referrals", items: PARTNER_FAQS.slice(10) },
];

const PARTNERSHIP_ID_BY_NAME = new Map(visiblePartnerships.map((partner) => [partner.name, partner.id]));

const TRUSTED_PARTNER_NAMES = new Set([
  "NYC Small Business Services",
  "NYC Small Business Resource Network",
  "Manhattan Chamber of Commerce",
  "Brooklyn Chamber of Commerce",
  "Bronx Chamber of Commerce",
  "Queens Chamber of Commerce",
  "Staten Island Chamber of Commerce",
]);

export default async function Partners() {
  const trustedPartners = (await getPublicCommunityPartners()).filter((partner) =>
    TRUSTED_PARTNER_NAMES.has(partner.name),
  );
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PARTNER_FAQS.map((f) => ({
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
      <SectionProgressNav accent="yellow" sections={[
        { id: "contact", label: "Get support" },
        { id: "process", label: "Our process" },
        { id: "services", label: "Services" },
        { id: "community", label: "Partners" },
        { id: "faq", label: "FAQ" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <ParallaxHero
        image={petiteDumplingStorefront}
        alt="Petite Dumpling storefront in Park Slope, Brooklyn"
        className="relative flex min-h-[92svh] items-center overflow-hidden pt-32 pb-20"
        imageClassName="object-cover object-[60%_center] md:object-center"
        mediaClassName="absolute -inset-y-[16vh] inset-x-0"
        parallaxRange={[160, -40]}
      >
        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
          <PageHeroContent
            eyebrow="For NYC small businesses"
            title={<>Free websites, tools, and marketing for <HeroAccentText accent="yellow">your small business.</HeroAccentText></>}
            description="Novus is a student-run nonprofit helping small businesses across NYC. Tell us what you need, and we’ll connect you with a team that can help."
            primaryAction={{ href: "#contact", label: "Request free support" }}
            secondaryAction={{ href: "/showcase", label: "See our work" }}
            accent="yellow"
          />
          <FormLanguageChips />
        </div>
      </ParallaxHero>

      {/* ── CONTACT FORM ─────────────────────────────────────── */}
      <section className="blueprint bg-n-bg py-16 md:py-20" id="contact">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <AnimatedSection className="mb-8">
            <Eyebrow tone="business" index={1}>Get support</Eyebrow>
            <h2 className="type-h2 mt-3 mb-4 text-n-ink">
              Tell us what you <span className="accent-serif">need</span>
            </h2>
            <p className="measure font-body text-base leading-relaxed text-n-muted">
              Share a few details about your business and the support you are looking for.
              The form is available in English, Spanish, Chinese, Korean, Arabic, and French.
            </p>
          </AnimatedSection>
          <ContactForm />
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────── */}
      <BusinessProcessTimeline />

      {/* ── SERVICES 2×3 GRID ──────────────────────────────── */}
      <section id="services" className="bg-n-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <Eyebrow tone="business" index={3}>Services</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">
              What we build for <span className="accent-serif">small businesses</span>
            </h2>
            <p className="measure mt-4 font-body text-base leading-relaxed text-n-muted">
              Your student team scopes the work with you, shares regular updates, and hands over clear, usable deliverables at the end of the project.
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <details key={service.title} className="group h-full rounded-card border border-n-border bg-white p-5 shadow-e1 transition duration-2 ease-out hover:-translate-y-0.5 hover:border-n-yellow-dark hover:shadow-e2 open:border-n-yellow-dark">
                <summary className="list-none cursor-pointer">
                  <div className="flex items-start gap-4">
                    <Illustration name={service.illustration} className="h-14 w-14 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="block font-display text-[1.0625rem] font-bold leading-tight text-n-ink">
                        {service.title}
                      </span>
                      <span className="mt-1.5 block font-body text-[0.9375rem] leading-relaxed text-n-muted">
                        {service.summary}
                      </span>
                    </div>
                    <span aria-hidden="true" className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-n-control-border text-n-ink transition duration-2 group-open:rotate-180 group-open:bg-n-yellow">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </summary>
                <div className="accordion-body mt-4 border-t border-n-border pt-4">
                  <ul className="space-y-2 font-body text-[0.9375rem] text-n-ink/80">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-n-yellow-dark" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ──────────────────────────────────── */}
      <section id="community" className="band-brand py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedSection className="mb-8 md:mb-10">
            <Eyebrow index={4}>Community connections</Eyebrow>
            <h2 className="type-h2 mt-3 max-w-[22ch] text-n-ink">
              Connected to the organizations that serve NYC businesses.
            </h2>
          </AnimatedSection>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-7">
            {trustedPartners.map((partner) => (
              <li key={partner.name}>
                <PartnerLogoTile partner={partner} partnershipId={PARTNERSHIP_ID_BY_NAME.get(partner.name)} />
              </li>
            ))}
          </ul>
          <Link
            href="/partners"
            className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-display text-[0.9375rem] font-bold text-n-orange-ink underline-offset-4 hover:underline"
          >
            See every organization we work with, and what each one does
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ── FAQ ACCORDION ──────────────────────────────────── */}
      <section id="faq" className="bg-n-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <AnimatedSection className="mb-8">
            <Eyebrow index={5}>FAQ</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">Frequently asked questions</h2>
          </AnimatedSection>
          <FaqAccordion categories={PARTNER_FAQ_CATEGORIES} />
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────── */}
      <NextStep
        eyebrow="Get support"
        title="Looking for support for your business?"
        description="We're taking on new projects across New York City. Tell us about your business and the support you need, and we'll follow up within a few business days."
        links={[
          { href: "#contact", label: "Request support", tone: "business" },
          { href: "/showcase", label: "See our work", tone: "brand" },
        ]}
      />
    </>
  );
}
