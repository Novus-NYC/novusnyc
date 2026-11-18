import type { ReactNode } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

type Tone = "business" | "student" | "brand";

type NextStepLink = {
  href: string;
  label: string;
  tone: Tone;
};

const BUTTON: Record<Tone, string> = {
  business: "btn-business",
  student: "btn-student",
  brand: "btn-brand",
};

/** The closing band of an inner page: where to go next, in the audience colors. */
export default function NextStep({
  eyebrow,
  title,
  description,
  links,
  footnote,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  links: NextStepLink[];
  footnote?: ReactNode;
}) {
  return (
    <section className="blueprint blueprint--dark band-night relative overflow-hidden border-b border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <h2 className="type-h2 mt-4 max-w-[18ch] text-white">{title}</h2>
            {description ? (
              <p className="measure mt-4 font-body text-base leading-relaxed text-white/75">{description}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            {links.map((link) => {
              const isHash = link.href.startsWith("#");
              const className = `btn btn-lg ${BUTTON[link.tone]}`;
              const content = (
                <>
                  {link.label}
                  <span aria-hidden="true" className="btn-arrow">→</span>
                </>
              );
              return isHash ? (
                <a key={link.href} href={link.href} className={className}>{content}</a>
              ) : (
                <Link key={link.href} href={link.href} className={className}>{content}</Link>
              );
            })}
          </div>
        </div>
        {footnote ? <div className="mt-8 font-body text-[0.9375rem] text-white/75">{footnote}</div> : null}
      </div>
    </section>
  );
}
