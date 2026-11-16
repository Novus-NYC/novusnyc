import Image from "next/image";
import {
  collegeLogos,
  featuredHighSchoolLogos,
  otherHighSchoolLogos,
  type SchoolLogo,
} from "@/data/schoolLogos";

const ROWS = [
  { label: "Colleges", logos: collegeLogos, motion: "school-logo-track" },
  { label: "High schools", logos: featuredHighSchoolLogos, motion: "school-logo-track school-logo-track-reverse" },
  { label: "More high schools", logos: otherHighSchoolLogos, motion: "school-logo-track school-logo-track-short" },
];

function LogoRow({ label, logos, motion }: { label: string; logos: SchoolLogo[]; motion: string }) {
  // The shorter row needs enough width to cover the viewport while it loops.
  const displayLogos = logos.length < 8 ? [...logos, ...logos, ...logos] : logos;

  return (
    <div className="school-logo-marquee overflow-hidden" role="group" aria-label={label}>
      <div className={motion}>
        {[false, true].map((duplicate) => (
          <div key={String(duplicate)} className="school-logo-group" aria-hidden={duplicate}>
            {displayLogos.map((school, index) => (
              <div key={`${school.name}-${index}`} aria-hidden={index >= logos.length} className={`flex h-24 w-40 shrink-0 items-center justify-center px-2 sm:h-28 sm:w-48 ${index >= logos.length ? "school-logo-repeat" : ""}`}>
                <Image
                  src={school.logo}
                  alt={index < logos.length && !duplicate ? school.name : ""}
                  width={192}
                  height={112}
                  sizes="192px"
                  loading="eager"
                  className={`h-full w-full object-contain drop-shadow-[0_5px_14px_rgba(0,0,0,0.35)] ${school.brighten ? "brightness-150" : ""}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SchoolLogoMarquee() {
  return (
    <div className="mt-8 space-y-4 sm:space-y-5">
      {ROWS.map((row) => <LogoRow key={row.label} {...row} />)}
    </div>
  );
}
