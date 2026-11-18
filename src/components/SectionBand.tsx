import Image from "next/image";
import BridgeIllustration from "@/components/BridgeIllustration";
import Eyebrow from "@/components/Eyebrow";

type BandTone = "brand" | "business" | "student";

const BAND_CLASS: Record<BandTone, string> = {
  brand: "band-brand",
  business: "band-business",
  student: "band-student",
};

const BRIDGE_CLASS: Record<BandTone, string> = {
  brand: "text-n-orange-ink/45 [--bridge-surface:#fdeadf]",
  business: "text-n-yellow-ink/40 [--bridge-surface:#fdf6d6]",
  student: "text-n-purple-ink/40 [--bridge-surface:#f3ebf2]",
};

/** A solid audience-colored band that opens a homepage chapter. */
export default function SectionBand({
  index,
  eyebrow,
  title,
  detail,
  imageSrc,
  tone,
  id,
  bridge = false,
}: {
  index: number;
  eyebrow: string;
  title: string;
  detail: string;
  imageSrc: string;
  tone: BandTone;
  id?: string;
  bridge?: boolean;
}) {
  return (
    <section id={id} className={`${BAND_CLASS[tone]} relative overflow-hidden py-14 md:py-20`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <Eyebrow index={index} tone={tone}>{eyebrow}</Eyebrow>
          <h2 className="type-display mt-5 max-w-[14ch] text-n-ink">{title}</h2>
          <p className="measure mt-6 font-body text-lg leading-relaxed text-n-ink/75">{detail}</p>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-card border-4 border-white shadow-e3">
            <Image src={imageSrc} alt="" width={1200} height={800} sizes="(min-width: 1024px) 520px, 92vw" className="photo-grade aspect-[3/2] w-full object-cover" />
          </div>
        </div>
      </div>
      {bridge ? (
        <BridgeIllustration className={`pointer-events-none mx-auto mt-10 w-full max-w-7xl px-5 md:-mt-6 md:px-8 ${BRIDGE_CLASS[tone]}`} />
      ) : null}
    </section>
  );
}
