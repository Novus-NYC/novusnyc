import type { ReactNode } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

type HeroAccent = "orange" | "purple" | "yellow";

type HeroAction = {
  href: string;
  label: string;
};

const ACCENT: Record<HeroAccent, { button: string; tone: "brand" | "student" | "business"; text: string }> = {
  orange: { button: "btn-brand", tone: "brand", text: "hero-accent--peach" },
  purple: { button: "btn-student", tone: "student", text: "hero-accent--purple" },
  yellow: { button: "btn-business", tone: "business", text: "hero-accent--yellow" },
};

/** An emphasized phrase in a photo hero: in a tint lifted for photography. */
export function HeroAccentText({ children, accent = "orange" }: { children: ReactNode; accent?: HeroAccent }) {
  return (
    <span className={`accent-serif ${ACCENT[accent].text}`}>{children}</span>
  );
}

// Rendered statically: the headline is the largest paint on every inner page,
// so it never waits on a client-side reveal.
export default function PageHeroContent({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  accent = "orange",
  note,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  accent?: HeroAccent;
  note?: string;
}) {
  const colors = ACCENT[accent];

  return (
    <div className="max-w-5xl">
      <Eyebrow onDark tone={colors.tone} className="[text-shadow:0_2px_12px_rgba(0,0,0,0.75)]">{eyebrow}</Eyebrow>
      <h1 className="type-display mt-5 max-w-[15ch] text-white [text-shadow:0_8px_28px_rgba(0,0,0,0.45)]">
        {title}
      </h1>
      <p className="mt-7 max-w-[56ch] font-body text-lg leading-[1.6] text-white/90 [text-shadow:0_3px_18px_rgba(0,0,0,0.7)] md:text-xl">
        {description}
      </p>

      {note ? (
        <p aria-hidden="true" className={`script-note mt-5 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] ${colors.text}`}>{note}</p>
      ) : null}

      {(primaryAction || secondaryAction) && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {primaryAction && (
            <Link href={primaryAction.href} className={`btn btn-lg ${colors.button} shadow-lg shadow-black/20`}>
              {primaryAction.label}
              <span aria-hidden="true" className="btn-arrow">→</span>
            </Link>
          )}
          {secondaryAction && (
            <Link href={secondaryAction.href} className="btn btn-lg btn-outline-light bg-n-night/20">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
