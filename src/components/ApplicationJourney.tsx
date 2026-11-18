import Eyebrow from "@/components/Eyebrow";
import Illustration from "@/components/Illustrations";

const steps = [
  {
    label: "Apply",
    eyebrow: "Start here",
    title: "Share your interests and availability.",
    detail: "Start with a short application covering your school, preferred track, and availability.",
    note: "Tell us what you want to work on and when you can contribute.",
    illustration: "grants",
  },
  {
    label: "Application review",
    eyebrow: "We review applications",
    title: "We review applications for current openings.",
    detail: "We look at your interests, availability, and the teams that are currently onboarding. Not every applicant will have a call.",
    note: "We will contact you if there is an opening that fits.",
    illustration: "people",
  },
  {
    label: "Onboarding email",
    eyebrow: "If there is a fit",
    title: "Receive your next steps by email.",
    detail: "When there is an opening that matches your interests and availability, we will send an onboarding email with your track, team, and what to do next.",
    note: "Applicants are onboarded as teams have room to grow.",
    illustration: "handshake",
  },
  {
    label: "Work with a business",
    eyebrow: "Make it real",
    title: "Join a team serving a real business.",
    detail: "Work with a business on a website, marketing plan, social content, grant research, or another practical project. You will receive feedback, meet deadlines, and contribute to deliverables that go live.",
    note: "You can point to the work when you apply for future opportunities.",
    illustration: "website",
  },
  {
    label: "Show your work",
    eyebrow: "Carry it forward",
    title: "Leave with work you can explain clearly.",
    detail: "Keep examples of what you built, what you owned, and what changed for the business. Team leads can speak to your contribution, and strong contributors can move into leadership roles.",
    note: "Your portfolio grows from real projects, not practice exercises.",
    illustration: "design",
  },
] as const;

// The whole path is visible at once: five piers joined by the bridge cable.
export default function ApplicationJourney() {
  return (
    <section id="journey" className="band-student relative overflow-hidden py-16 md:py-20" aria-labelledby="application-journey-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="student" index={3}>Your Novus journey</Eyebrow>
            <h2 id="application-journey-heading" className="type-h2 mt-3 text-n-ink">Work you can put on your resume.</h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-n-ink/75">Follow the steps from application to work you can use in college applications, interviews, and future roles.</p>
        </div>

        <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-4">
          <li aria-hidden="true" className="pointer-events-none absolute left-6 right-6 top-6 hidden h-0.5 bg-n-purple-ink/30 lg:block" />
          {steps.map((step, index) => (
            <li key={step.label} className="relative flex flex-col">
              <div className="relative z-10 flex items-center gap-3 lg:flex-col lg:items-start">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-n-ink bg-n-purple font-mono text-base font-semibold text-n-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-lg font-bold leading-tight text-n-ink">{step.label}</p>
              </div>
              <div className="relative z-10 mt-4 flex flex-1 flex-col rounded-card border border-n-purple/50 bg-white p-5 shadow-e1">
                <div className="flex items-start justify-between gap-3">
                  <p className="eyebrow eyebrow--student">{step.eyebrow}</p>
                  <Illustration name={step.illustration} className="-mt-1 h-12 w-12 shrink-0" />
                </div>
                <h3 className="mt-2 font-display text-[1.125rem] font-bold leading-snug text-n-ink">{step.title}</h3>
                <p className="mt-2 mb-4 font-body text-[0.9375rem] leading-relaxed text-n-ink/75">{step.detail}</p>
                <p className="mt-auto border-t border-n-border pt-3 font-body text-[0.9375rem] font-semibold text-n-ink">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
