// Line illustrations in the brand pastels: one per service and per track.
// Each sits on a soft color blob; strokes use the ink color.

export type IllustrationName =
  | "website"
  | "search"
  | "social"
  | "design"
  | "finance"
  | "grants"
  | "tech"
  | "marketing"
  | "operations"
  | "handshake"
  | "people";

const BLOB: Record<IllustrationName, string> = {
  website: "#E6DAE4",
  search: "#E6DAE4",
  social: "#FBDCC8",
  design: "#FBDCC8",
  finance: "#F8EDB8",
  grants: "#F8EDB8",
  tech: "#E6DAE4",
  marketing: "#FBDCC8",
  operations: "#F8EDB8",
  handshake: "#FBDCC8",
  people: "#E6DAE4",
};

function Art({ name }: { name: IllustrationName }) {
  switch (name) {
    case "website":
    case "tech":
      return (
        <>
          <rect x="14" y="18" width="52" height="40" rx="5" />
          <path d="M14 27h52" />
          <circle cx="20" cy="22.5" r="1.2" fill="currentColor" />
          <circle cx="25" cy="22.5" r="1.2" fill="currentColor" />
          {name === "tech" ? (
            <path d="M33 37l-6 5 6 5M47 37l6 5-6 5M43 35l-6 14" />
          ) : (
            <>
              <path d="M22 35h22M22 41h14" />
              <rect x="22" y="46" width="14" height="6" rx="1.5" />
              <path d="M47 35h11v17H47z" />
            </>
          )}
        </>
      );
    case "search":
      return (
        <>
          <path d="M40 16c-8 0-14 6-14 13.5C26 40 40 56 40 56s14-16 14-26.5C54 22 48 16 40 16z" />
          <circle cx="40" cy="29.5" r="5" />
          <path d="M52 50l9 9" />
          <circle cx="48" cy="46" r="6" />
        </>
      );
    case "social":
      return (
        <>
          <rect x="26" y="12" width="28" height="50" rx="5" />
          <path d="M36 16h8" />
          <path d="M40 46s-8-5-8-10.5a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8C48 41 40 46 40 46z" />
          <path d="M58 22l6-4M59 30h7M58 38l6 4" />
        </>
      );
    case "design":
      return (
        <>
          <path d="M20 58l6-16 22-22a4 4 0 0 1 6 6L32 48z" />
          <path d="M44 24l6 6M26 42l6 6" />
          <circle cx="56" cy="52" r="7" />
          <path d="M14 22h12v12H14z" />
        </>
      );
    case "finance":
    case "operations":
      return (
        <>
          <path d="M16 60h48" />
          <path d="M22 60V44M34 60V36M46 60V40M58 60V26" />
          <path d="M20 34l12-10 12 6 16-14" />
          <path d="M53 16h7v7" />
        </>
      );
    case "grants":
      return (
        <>
          <path d="M22 12h26l10 10v40H22z" />
          <path d="M48 12v10h10" />
          <path d="M29 30h20M29 37h20M29 44h12" />
          <circle cx="50" cy="52" r="6" />
          <path d="M47 57l-2 7 5-3 5 3-2-7" />
        </>
      );
    case "marketing":
      return (
        <>
          <path d="M18 34v12h8l18 10V24L26 34z" />
          <path d="M26 46l4 12h6l-3-10" />
          <path d="M52 32c3 2 3 14 0 16M58 26c6 5 6 23 0 28" />
        </>
      );
    case "handshake":
      return (
        <>
          <path d="M10 36l12-10 10 4 8-4 8 2 12-2 10 10" />
          <path d="M22 26l-6 18M58 26l6 18" />
          <path d="M28 42l8 8 6-4 6 6 8-8" />
          <path d="M34 34l10 10" />
        </>
      );
    case "people":
      return (
        <>
          <circle cx="30" cy="28" r="7" />
          <circle cx="52" cy="30" r="6" />
          <path d="M16 58c0-9 6-16 14-16s14 7 14 16" />
          <path d="M42 56c1-7 5-12 10-12 6 0 11 6 11 14" />
        </>
      );
  }
}

export default function Illustration({
  name,
  className = "h-16 w-16",
}: {
  name: IllustrationName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 80 72"
      className={`text-n-ink ${className}`}
    >
      <ellipse cx="42" cy="40" rx="34" ry="28" fill={BLOB[name]} />
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <Art name={name} />
      </g>
    </svg>
  );
}
