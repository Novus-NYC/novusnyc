import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import NextStep from "@/components/NextStep";
import ApplicationForm from "@/components/ApplicationForm";
import { getApplicationsStatus } from "@/lib/server/publicShowcase";

// The pause switch and the chapter list live in the database, so this page
// cannot be built once and cached forever. Five minutes bounds how stale it can
// get; the admin revalidate hook makes an intentional change immediate.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Apply to Join as a Student Volunteer",
  description:
    "Apply to join Novus NYC — a student-led consulting nonprofit placing teams on real projects for NYC small businesses. Takes 5 minutes.",
  openGraph: {
    title: "Apply to Novus NYC",
    description: "Real projects. Real clients. Takes 5 minutes to apply.",
    images: ["/api/og"],
  },
};

export default async function Apply() {
  const { paused, message, chapters } = await getApplicationsStatus();

  return (
    <>
      <section id="application-details" className="section-flush-bottom blueprint band-student pt-32 pb-0">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start pb-16">
              {/* Left: what to expect — stays in view beside the long form */}
              <div className="md:sticky md:top-28 md:col-span-2 md:pt-2">
                <Eyebrow tone="student" className="mb-4">
                  Student application
                </Eyebrow>
                <h1 className="type-display mb-5 max-w-[12ch] text-n-ink">
                  Start your Novus application.
                </h1>
                <p className="mb-6 font-body text-lg leading-relaxed text-n-muted">
                  Join a student-led team doing real client work. The application takes about five minutes.
                </p>
                <div className="space-y-5 border-t border-n-border pt-7">
                  <p className="eyebrow text-n-ink/70">
                    What happens next
                  </p>
                  {[
                    {
                      n: "1",
                      title: "We review your application",
                      desc: "Usually within 2–3 business days.",
                    },
                    {
                      n: "2",
                      title: "We review current openings",
                      desc: "We consider your interests, availability, and the teams that are onboarding.",
                    },
                    {
                      n: "3",
                      title: "Onboarding email",
                      desc: "If there is a fit, we will email your next steps, team, and track.",
                    },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-n-ink bg-n-purple font-mono text-[0.8125rem] font-semibold text-n-ink">
                        {s.n.padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display font-bold text-n-ink text-base">{s.title}</p>
                        <p className="font-body text-[0.9375rem] text-n-muted mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form or paused notice */}
              <div id="application-form" className="md:col-span-3">
                {paused ? (
                  <div className="rounded-card border border-n-border bg-white p-8 text-center shadow-e1">
                    <div className="w-12 h-12 rounded-full bg-n-bg border border-n-border flex items-center justify-center mx-auto mb-4">
                      <svg className="w-5 h-5 text-n-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <h2 className="font-display font-bold text-n-ink text-xl mb-2">Applications Paused</h2>
                    <p className="font-body text-n-muted text-sm leading-relaxed max-w-xs mx-auto">
                      {message}
                    </p>
                  </div>
                ) : (
                  <ApplicationForm chapters={chapters} />
                )}
              </div>
            </div>
        </div>
      </section>

      <NextStep
        eyebrow="Tracks"
        title="The three tracks"
        links={[{ href: "/join#tracks", label: "Explore the tracks", tone: "student" }]}
      />
    </>
  );
}
