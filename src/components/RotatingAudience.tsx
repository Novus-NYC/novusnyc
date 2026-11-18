// The kinds of businesses Novus works with, from the FAQ, cycling in place.
// Screen readers get the full sentence once; reduced motion shows the list.
const AUDIENCES = ["restaurants", "retailers", "professional services", "neighborhood organizations"];

export default function RotatingAudience({ className = "" }: { className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-2 font-mono text-[0.875rem] font-medium text-n-ink/80 ${className}`}>
      <span className="sr-only">For restaurants, retailers, professional services, and neighborhood organizations.</span>
      <span aria-hidden="true">For</span>
      <span aria-hidden="true" className="word-rotator rounded-full bg-n-yellow px-3 py-1 text-n-ink">
        {AUDIENCES.map((word, i) => (
          <span key={word} style={{ ["--i" as string]: i }}>{word}</span>
        ))}
      </span>
    </p>
  );
}
