"use client";

import { useEffect, useRef, useState } from "react";

// A detailed line drawing of the Novus bridge in a slight three-quarter view.
// Each tower is a block with a visible side face; four main cables hang from
// it, a front pair and a back pair, two running left and two running right.
// The back plane is the front plane shifted by DEPTH and drawn lighter. Towers
// sit at 25% and 75% of the width so the piers line up with a two-column
// layout beneath it.

const W = 1200;
const H = 230;
const DECK = 176;
const TOWER_TOP = 50;
const TOWERS = [300, 900] as const;
const HALF = 28;
const SADDLE_Y = TOWER_TOP + 8;
const FOOT = DECK + 34;
const DEPTH = { x: 18, y: -13 };

type Pt = { x: number; y: number };
type Span = { p0: Pt; p1: Pt; p2: Pt };

// Quadratic Bézier with the control point centred in x, so x(t) is linear and
// a hanger at a given x lands exactly on the cable.
function cableY({ p0, p1, p2 }: Span, t: number) {
  const u = 1 - t;
  return u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y;
}

function hangersFor(span: Span, deckY: number, step: number) {
  const out: Pt[] = [];
  for (let x = span.p0.x + step; x < span.p2.x - step / 2; x += step) {
    const y = cableY(span, (x - span.p0.x) / (span.p2.x - span.p0.x));
    if (y < deckY - 4) out.push({ x, y });
  }
  return out;
}

const shift = (p: Pt): Pt => ({ x: p.x + DEPTH.x, y: p.y + DEPTH.y });
const shiftSpan = (s: Span): Span => ({ p0: shift(s.p0), p1: shift(s.p1), p2: shift(s.p2) });
const spanPath = ({ p0, p1, p2 }: Span) => `M${p0.x} ${p0.y} Q${p1.x} ${p1.y} ${p2.x} ${p2.y}`;

function Tower({ x }: { x: number }) {
  const l = x - HALF;
  const r = x + HALF;
  const capL = l - 5;
  const capR = r + 5;
  const capTop = TOWER_TOP - 4;
  const { x: dx, y: dy } = DEPTH;

  return (
    <g className="bridge-tower">
      {/* side face, turned away from the light */}
      <path className="bridge-shade" d={`M${r} ${TOWER_TOP + 6} L${r + dx} ${TOWER_TOP + 6 + dy} V${FOOT + dy} L${r} ${FOOT} Z`} />
      {/* top of the cap */}
      <path className="bridge-shade bridge-shade--light" d={`M${capL} ${capTop} L${capL + dx} ${capTop + dy} H${capR + dx} L${capR} ${capTop} Z`} />
      {/* cap side */}
      <path className="bridge-shade" d={`M${capR} ${capTop} L${capR + dx} ${capTop + dy} V${TOWER_TOP + 6 + dy} L${capR} ${TOWER_TOP + 6} Z`} />
      {/* front face, filled with the surface colour so the back cables pass behind */}
      <path className="bridge-face" d={`M${l} ${TOWER_TOP + 6} H${r} V${FOOT} H${l} Z`} />
      {/* cap front */}
      <path className="bridge-face" d={`M${capL} ${capTop} H${capR} V${TOWER_TOP + 6} H${capL} Z`} />
      {/* front face edges */}
      <path d={`M${l} ${TOWER_TOP + 6} V${FOOT} M${r} ${TOWER_TOP + 6} V${FOOT}`} />
      <path className="bridge-fine" d={`M${l} ${TOWER_TOP + 30} H${r} M${l} ${DECK - 2} H${r}`} />
      {/* twin pointed arches */}
      {[0, 1].map((i) => {
        const al = l + 6 + i * 25;
        const ar = al + 16;
        const mid = (al + ar) / 2;
        return (
          <path key={i} d={`M${al} ${DECK - 2} V${96} Q${al} ${80} ${mid} ${72} Q${ar} ${80} ${ar} ${96} V${DECK - 2}`} />
        );
      })}
    </g>
  );
}

function Plane({ spans, deckY, back = false }: { spans: Span[]; deckY: number; back?: boolean }) {
  const hangers = spans.flatMap((span) => hangersFor(span, deckY, 24));
  const shoulders = TOWERS.flatMap((tx) => [
    { from: tx - HALF + (back ? DEPTH.x : 0), dir: -1 },
    { from: tx + HALF + (back ? DEPTH.x : 0), dir: 1 },
  ]);
  const saddle = SADDLE_Y + (back ? DEPTH.y : 0);

  return (
    <g className={back ? "bridge-plane bridge-plane--back" : "bridge-plane"}>
      <g className="bridge-stays">
        {shoulders.flatMap(({ from, dir }) =>
          [1, 2, 3, 4, 5].map((i) => (
            <path key={`${from}-${i}`} d={`M${from} ${saddle + 4} L${from + dir * i * 40} ${deckY}`} />
          )),
        )}
      </g>
      <g className="bridge-hangers">
        {hangers.map(({ x, y }, i) => (
          <path key={x} d={`M${x} ${y.toFixed(1)} V${deckY}`} style={{ ["--i" as string]: i }} />
        ))}
      </g>
      <path className="bridge-cable" d={spans.map(spanPath).join(" ")} />
    </g>
  );
}

export default function BridgeIllustration({
  className = "",
  animate = true,
  water = true,
}: {
  className?: string;
  animate?: boolean;
  water?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<"static" | "armed" | "visible">("static");

  // Server HTML shows the finished drawing. Once JS runs, a bridge that is not
  // yet on screen is armed and draws itself when it scrolls into view.
  useEffect(() => {
    const node = ref.current;
    if (!animate || !node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setState("visible");
      return;
    }
    setState("armed");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setState("visible");
      observer.disconnect();
    }, { rootMargin: "0px 0px -15% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [animate]);

  const [lt, rt] = TOWERS;
  // Front cables rest on the front saddles: the side-span cable on the outer
  // shoulder, the main-span cable on the inner one.
  const front: Span[] = [
    { p0: { x: lt + HALF, y: SADDLE_Y }, p1: { x: W / 2, y: 276 }, p2: { x: rt - HALF, y: SADDLE_Y } },
    { p0: { x: 0, y: DECK - 6 }, p1: { x: (lt - HALF) / 2, y: 140 }, p2: { x: lt - HALF, y: SADDLE_Y } },
    { p0: { x: rt + HALF, y: SADDLE_Y }, p1: { x: (rt + HALF + W) / 2, y: 140 }, p2: { x: W, y: DECK - 6 } },
  ];
  const back = front.map(shiftSpan);
  const backDeck = DECK + DEPTH.y;

  const truss = Array.from({ length: W / 24 }, (_, i) => {
    const x = i * 24;
    return `M${x} ${DECK} L${x + 12} ${DECK + 12} L${x + 24} ${DECK}`;
  }).join(" ");
  const crossBeams = Array.from({ length: W / 48 + 1 }, (_, i) => {
    const x = i * 48;
    return `M${x} ${DECK} L${x + DEPTH.x} ${backDeck}`;
  }).join(" ");

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W + DEPTH.x} ${H}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`bridge-illustration ${state === "armed" ? "is-armed" : ""} ${state === "visible" ? "bridge-illustration--animate" : ""} ${className}`}
    >
      {/* back plane: cables, hangers and stays behind the towers */}
      <Plane spans={back} deckY={backDeck} back />

      {/* roadway: back edge, cross beams and a faint surface */}
      <g className="bridge-deck">
        <path className="bridge-shade bridge-shade--light" d={`M0 ${DECK} L${DEPTH.x} ${backDeck} H${W + DEPTH.x} L${W} ${DECK} Z`} />
        <path className="bridge-fine" d={`M${DEPTH.x} ${backDeck} H${W + DEPTH.x}`} />
        <path className="bridge-fine" d={crossBeams} />
      </g>

      <Tower x={lt} />
      <Tower x={rt} />

      {/* front plane */}
      <Plane spans={front} deckY={DECK} />

      <g className="bridge-deck">
        <path d={`M0 ${DECK} H${W}`} />
        <path d={`M0 ${DECK + 12} H${W}`} />
        <path className="bridge-fine" d={truss} />
      </g>

      {water ? (
        <g className="bridge-water">
          {[0, 1, 2].map((row) => (
            <path
              key={row}
              d={Array.from({ length: 10 }, (_, i) => {
                const x = 40 + i * 120 + row * 40;
                const y = DECK + 30 + row * 9;
                return `M${x} ${y} q12 -5 24 0 t24 0`;
              }).join(" ")}
            />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
