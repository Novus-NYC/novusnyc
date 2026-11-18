import type { ReactNode } from "react";
import Image from "next/image";
import BridgeIllustration from "@/components/BridgeIllustration";
import Eyebrow from "@/components/Eyebrow";
import ParallaxMedia from "@/components/ParallaxMedia";

type BandTone = "brand" | "business" | "student";

const PANEL_CLASS: Record<BandTone, string> = {
  brand: "band-brand",
  business: "band-business",
  student: "band-student",
};

const BRIDGE_CLASS: Record<BandTone, string> = {
  brand: "text-n-orange-ink/55 [--bridge-surface:#fdeadf]",
  business: "text-n-yellow-ink/50 [--bridge-surface:#fdf6d6]",
  student: "text-n-purple-ink/50 [--bridge-surface:#f3ebf2]",
};

/**
 * Opens a homepage chapter: a full-bleed photo drifting behind a solid,
 * audience-coloured panel that carries the words.
 */
export default function SectionBand({
  index,
  eyebrow,
  title,
  detail,
  imageSrc,
  tone,
  id,
  bridge = false,
  align = "left",
}: {
  index: number;
  eyebrow: string;
  title: ReactNode;
  detail: string;
  imageSrc: string;
  tone: BandTone;
  id?: string;
  bridge?: boolean;
  align?: "left" | "right";
}) {
  return (
    <section id={id} className="relative isolate overflow-hidden py-20 md:py-32">
      <ParallaxMedia>
        <Image src={imageSrc} alt="" fill sizes="100vw" className="photo-grade object-cover" />
      </ParallaxMedia>
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${align === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-n-night/45 via-n-night/15 to-transparent`}
      />
      <div className={`relative mx-auto flex max-w-7xl px-5 md:px-8 ${align === "right" ? "justify-end" : ""}`}>
        <div className={`${PANEL_CLASS[tone]} w-full max-w-xl rounded-card p-7 shadow-e3 md:p-10`}>
          <Eyebrow index={index} tone={tone}>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.3rem,1.5rem+3vw,4rem)] font-bold leading-[1.0] tracking-[-0.035em] text-n-ink [text-wrap:balance]">{title}</h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-n-ink/75">{detail}</p>
          {bridge ? <BridgeIllustration water={false} className={`mt-6 w-full ${BRIDGE_CLASS[tone]}`} /> : null}
        </div>
      </div>
    </section>
  );
}
