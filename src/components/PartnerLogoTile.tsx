import Image from "next/image";
import Link from "next/link";
import type { CommunityPartner } from "@/data";

const MONOGRAM_TONES = ["bg-n-orange", "bg-n-yellow", "bg-n-purple"];

function monogram(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

/**
 * One partner, one optical size. Links to its entry on /partners when the
 * partnership is documented there, otherwise to the organization's own site.
 */
export default function PartnerLogoTile({
  partner,
  partnershipId,
  size = "md",
  hidden = false,
  className = "",
}: {
  partner: CommunityPartner;
  partnershipId?: string;
  size?: "md" | "lg";
  hidden?: boolean;
  className?: string;
}) {
  const mark = partner.logo ? (
    <Image
      src={partner.logo}
      alt={hidden ? "" : `${partner.name} logo`}
      fill
      sizes={size === "lg" ? "200px" : "160px"}
      className="object-contain p-1"
    />
  ) : (
    <span className={`logo-monogram ${MONOGRAM_TONES[partner.name.length % 3]}`}>{monogram(partner.name)}</span>
  );

  const content = (
    <>
      <span className="logo-tile-mark">{mark}</span>
      <span className="font-display text-[0.9375rem] font-bold leading-snug text-n-ink">{partner.name}</span>
    </>
  );

  const shared = {
    "aria-hidden": hidden || undefined,
    tabIndex: hidden ? -1 : undefined,
    className: `logo-tile ${size === "lg" ? "logo-tile--lg" : ""} ${className}`,
  };

  if (partnershipId) {
    return (
      <Link href={`/partners#${partnershipId}`} {...shared}>
        {content}
      </Link>
    );
  }

  return (
    <a href={partner.website} target="_blank" rel="noreferrer" {...shared}>
      {content}
    </a>
  );
}
