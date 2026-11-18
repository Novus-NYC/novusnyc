import Link from "next/link";
import BridgeArc from "@/components/BridgeArc";
import { EMAIL } from "@/lib/mail";

export default function NotFound() {
  return (
    <section className="blueprint flex min-h-[70vh] items-center justify-center bg-n-bg px-5 pb-16 pt-32">
      <div className="max-w-lg text-center">
        <div className="relative mx-auto mb-4 w-64">
          <BridgeArc variant="span" motion="load" className="h-16 w-full text-n-orange" strokeWidth={2} />
          <p className="stat-value -mt-2 font-display text-7xl font-bold text-n-ink">404</p>
        </div>
        <h1 className="type-h2 mb-3 text-n-ink">
          Page not found
        </h1>
        <p className="mb-8 font-body text-base leading-relaxed text-n-muted">
          This page doesn&apos;t exist or may have moved. Try one of the links below.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-brand">
            Go home
          </Link>
          <Link href="/businesses" className="btn btn-business">
            For Businesses
          </Link>
          <Link href="/join" className="btn btn-student">
            For Students
          </Link>
        </div>
        <a
          href={`mailto:${EMAIL.info}?subject=Broken%20link%20on%20novusnyc.org`}
          className="mt-6 inline-flex min-h-11 items-center font-body text-sm font-semibold text-n-purple-ink underline-offset-4 hover:underline"
        >
          Report a broken link
        </a>
      </div>
    </section>
  );
}
