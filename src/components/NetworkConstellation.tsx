import type { ChapterLocation } from "@/data/network";

// Equirectangular framing of the continental US; enough to place the dots.
const BOUNDS = { west: -125, east: -66, north: 50, south: 24 };
const W = 600;
const H = 340;

function project(location: ChapterLocation) {
  const x = ((location.lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W;
  const y = ((BOUNDS.north - location.lat) / (BOUNDS.north - BOUNDS.south)) * H;
  return { x, y };
}

/**
 * A lightweight stand-in for the 3D globe on phones: the hub and every
 * chapter, joined by the same cables the bridge motif uses.
 */
export default function NetworkConstellation({ locations }: { locations: ChapterLocation[] }) {
  const domestic = locations.filter((location) => location.type !== "international");
  const hub = domestic.find((location) => location.type === "hub");
  if (!hub) return null;
  const origin = project(hub);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="constellation-glow">
          <stop offset="0" stopColor="rgb(246 183 141)" stopOpacity="0.55" />
          <stop offset="1" stopColor="rgb(246 183 141)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {domestic
        .filter((location) => location.type === "chapter")
        .map((location) => {
          const point = project(location);
          const midX = (origin.x + point.x) / 2;
          const lift = Math.min(90, Math.hypot(point.x - origin.x, point.y - origin.y) * 0.35);
          const midY = Math.min(origin.y, point.y) - lift;
          return (
            <g key={location.name}>
              <path
                d={`M${origin.x} ${origin.y} Q${midX} ${midY} ${point.x} ${point.y}`}
                fill="none"
                stroke="rgb(246 183 141)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <circle cx={point.x} cy={point.y} r="5" fill="rgb(190 162 186)" stroke="#fffdf9" strokeWidth="1.5" />
            </g>
          );
        })}
      <circle cx={origin.x} cy={origin.y} r="28" fill="url(#constellation-glow)" />
      <circle cx={origin.x} cy={origin.y} r="8" fill="rgb(246 183 141)" stroke="#fffdf9" strokeWidth="2" />
      <text x={origin.x - 14} y={origin.y - 16} textAnchor="end" fill="#fffdf9" fontFamily="var(--font-plex-mono), monospace" fontSize="15" fontWeight="600">
        {hub.name}
      </text>
    </svg>
  );
}
