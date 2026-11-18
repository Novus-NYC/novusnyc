type ArcVariant = "span" | "underline" | "arch" | "tick";
type ArcMotion = "load" | "view" | "none";

const MOTION_CLASS: Record<ArcMotion, string> = {
  load: "bridge-arc--load",
  view: "bridge-arc--view",
  none: "",
};

/**
 * The Novus bridge, reduced to its cables. One drawing vocabulary for
 * dividers, word underlines and connectors between the two audiences.
 */
export default function BridgeArc({
  variant = "span",
  motion = "view",
  className = "",
  strokeWidth = 2,
}: {
  variant?: ArcVariant;
  motion?: ArcMotion;
  className?: string;
  strokeWidth?: number;
}) {
  const common = {
    "aria-hidden": true,
    focusable: false,
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    className: `bridge-arc ${MOTION_CLASS[motion]} ${className}`,
  };

  if (variant === "underline") {
    return (
      <svg {...common} viewBox="0 0 200 20" preserveAspectRatio="none">
        <path className="arc-cable" d="M2 6 Q100 22 198 6" />
      </svg>
    );
  }

  if (variant === "tick") {
    return (
      <svg {...common} viewBox="0 0 28 11" preserveAspectRatio="none">
        <path className="arc-cable" d="M1 2 Q14 13 27 2" />
      </svg>
    );
  }

  if (variant === "arch") {
    return (
      <svg {...common} viewBox="0 0 400 120" preserveAspectRatio="none">
        <path className="arc-cable" d="M4 116 C 90 -10, 310 -10, 396 116" />
        <path className="arc-cable" d="M60 116 C 130 40, 270 40, 340 116" opacity="0.45" />
      </svg>
    );
  }

  return (
    <svg {...common} viewBox="0 0 400 64" preserveAspectRatio="none">
      <line className="arc-tower" x1="70" y1="6" x2="70" y2="58" />
      <line className="arc-tower" x1="330" y1="6" x2="330" y2="58" />
      <path className="arc-cable" d="M2 30 Q36 14 70 6 Q200 76 330 6 Q364 14 398 30" />
      <path className="arc-cable" d="M2 52 H398" opacity="0.5" />
    </svg>
  );
}
