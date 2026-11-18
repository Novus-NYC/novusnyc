import type { ReactNode } from "react";
import BridgeArc from "@/components/BridgeArc";

type EyebrowTone = "brand" | "business" | "student";

const TONE_CLASS: Record<EyebrowTone, string> = {
  brand: "",
  business: "eyebrow--business",
  student: "eyebrow--student",
};

export default function Eyebrow({
  children,
  index,
  tone = "brand",
  onDark = false,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  index?: number;
  tone?: EyebrowTone;
  onDark?: boolean;
  className?: string;
  as?: "p" | "span" | "h2" | "h3";
}) {
  return (
    <Tag className={`eyebrow ${TONE_CLASS[tone]} ${onDark ? "eyebrow--light" : ""} ${className}`}>
      {index !== undefined ? (
        <span className="eyebrow-num">{String(index).padStart(2, "0")}</span>
      ) : null}
      <BridgeArc variant="tick" motion="none" className="eyebrow-tick" strokeWidth={2} />
      <span>{children}</span>
    </Tag>
  );
}
