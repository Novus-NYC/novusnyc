import type { ReactNode } from "react";

/** One italic serif word or phrase inside a grotesk headline. */
export default function Accent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`accent-serif ${className}`}>{children}</span>;
}
