"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Eyebrow from "@/components/Eyebrow";
import { SITE_SHOT_SLUGS } from "@/data/siteShots";

// Sites with strong first screens; anything missing from the capture set is
// skipped, so the wall never shows an empty frame.
const PICKS = [
  "petitedumpling-com", "clayandkilnstudio-com", "nowthen-vercel-app", "spin-bagel-vercel-app",
  "pho-bar-vercel-app", "masalaboxbayside-com", "eggstravanyc-com", "tangrafusion-com",
  "papazzio-com", "juliette-floral-vercel-app", "bell-family-jewelers-vercel-app", "canto-violation-solutions-vercel-app",
  "oh-k-food-inc-vercel-app", "four-seasons-uniform-vercel-app", "cardamom-indian-cuisine-vercel-app", "goldkeyassetsllc-vercel-app",
  "moretti-bakery-five-vercel-app", "ms-spudz-vercel-app", "el-gran-castillo-de-jagua-vercel-app", "annie-maes-bakery-vercel-app",
  "lady-d-flava-vercel-app", "the-layup-bar-vercel-app", "two-if-by-peppers-vercel-app", "pulse-coffee-vercel-app",
].filter((slug) => SITE_SHOT_SLUGS.has(slug));

/**
 * A wall of the websites Novus teams built, drifting sideways at two speeds as
 * the page scrolls, with the chapter's words set over it.
 */
export default function WorkCollage({
  index,
  eyebrow,
  title,
  detail,
}: {
  index: number;
  eyebrow: string;
  title: ReactNode;
  detail: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rowA = useTransform(scrollYProgress, [0, 1], reduced ? ["-6%", "-6%"] : ["0%", "-14%"]);
  const rowB = useTransform(scrollYProgress, [0, 1], reduced ? ["-10%", "-10%"] : ["-18%", "-4%"]);
  const rowC = useTransform(scrollYProgress, [0, 1], reduced ? ["-4%", "-4%"] : ["-2%", "-12%"]);

  const third = Math.ceil(PICKS.length / 3);
  const rows = [
    { slugs: PICKS.slice(0, third), x: rowA },
    { slugs: PICKS.slice(third, third * 2), x: rowB },
    { slugs: PICKS.slice(third * 2), x: rowC },
  ];

  return (
    <section ref={ref} className="band-night relative isolate overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-4 opacity-80 md:gap-6">
        {rows.map((row, rowIndex) => (
          <motion.div key={rowIndex} className="flex w-max gap-4 md:gap-6" style={{ x: row.x }}>
            {[...row.slugs, ...row.slugs].map((slug, i) => (
              <div
                key={`${slug}-${i}`}
                className={`relative aspect-[4/3] w-56 shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-e3 md:w-80 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
              >
                <Image src={`/site-shots/${slug}.webp`} alt="" fill sizes="320px" className="object-cover object-top" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--color-night)/0.92)_0%,rgb(var(--color-night)/0.7)_45%,rgb(var(--color-night)/0.25)_100%)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <div className="flex justify-center">
          <Eyebrow index={index} tone="business" onDark>{eyebrow}</Eyebrow>
        </div>
        <h2 className="mt-6 font-display text-[clamp(2.4rem,1.4rem+3.6vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white [text-wrap:balance]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/80">{detail}</p>
      </div>
    </section>
  );
}
