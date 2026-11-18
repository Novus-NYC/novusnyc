"use client";

import { useState, type ReactNode } from "react";

/** A marquee with a visible pause control; hidden under reduced motion. */
export default function PausableMarquee({
  children,
  label,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div data-paused={paused} className={className}>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className={`marquee-toggle ${dark ? "marquee-toggle--dark" : ""}`}
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
            {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
          </svg>
          {paused ? `Play ${label}` : `Pause ${label}`}
        </button>
      </div>
      {children}
    </div>
  );
}
