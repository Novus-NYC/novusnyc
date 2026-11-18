"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { joinTracks } from "@/data";
import Illustration, { type IllustrationName } from "@/components/Illustrations";
import { DUR, EASE_OUT } from "@/lib/motion";

type Track = (typeof joinTracks)[number];

const TRACK_ORDER: Record<string, number> = {
  "Digital & Tech": 0,
  Marketing: 1,
  "Finance & Operations": 2,
};

const TRACK_STYLE: Record<string, {
  illustration: IllustrationName;
  accent: string;
  soft: string;
  border: string;
  ink: string;
  preview: { title: string; detail: string };
}> = {
  "Digital & Tech": {
    illustration: "tech",
    accent: "bg-n-purple",
    soft: "bg-n-purple/12",
    border: "border-n-purple/45",
    ink: "text-n-purple-ink",
    preview: {
      title: "Launch a neighborhood business site",
      detail: "Turn a local business story into a fast, clear, customer-ready web experience.",
    },
  },
  Marketing: {
    illustration: "marketing",
    accent: "bg-n-orange",
    soft: "bg-n-orange/12",
    border: "border-n-orange/55",
    ink: "text-n-orange-ink",
    preview: {
      title: "Build a campaign people notice",
      detail: "Shape the story, content, and outreach that help a neighborhood business reach more people.",
    },
  },
  "Finance & Operations": {
    illustration: "operations",
    accent: "bg-n-yellow",
    soft: "bg-n-yellow/25",
    border: "border-n-yellow-dark",
    ink: "text-n-yellow-ink",
    preview: {
      title: "Find the next practical move",
      detail: "Translate research and financial information into a plan an owner can use right away.",
    },
  },
};

function CheckIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.4 6.6 11.3 12.5 4.8" />
    </svg>
  );
}

function SampleProject({ track }: { track: Track }) {
  const style = TRACK_STYLE[track.name];

  return (
    <div className={`rounded-card border ${style.border} bg-white p-4 shadow-e1`}>
      <p className={`eyebrow ${style.ink}`}>Sample project</p>
      <h4 className="mt-2 font-display text-lg font-bold leading-tight text-n-ink">{style.preview.title}</h4>
      <p className="mt-1.5 font-body text-[0.9375rem] leading-relaxed text-n-ink/75">{style.preview.detail}</p>

      {track.name === "Digital & Tech" ? (
        <div className="browser-frame mt-4">
          <div className="browser-frame-bar" aria-hidden="true">
            <span className="browser-frame-dots"><span /><span /><span /></span>
            <span className="browser-frame-url">petitedumpling.com</span>
          </div>
          <div className="browser-frame-view">
            <Image src="/site-shots/petitedumpling-com.webp" alt="The Petite Dumpling website, built by a Novus Digital & Tech team" fill sizes="(min-width: 1024px) 340px, 90vw" className="object-cover object-top" />
          </div>
        </div>
      ) : null}

      {track.name === "Marketing" ? (
        <div className="mt-4 grid grid-cols-[1.1fr_0.9fr] gap-3">
          <div className="relative overflow-hidden rounded-xl border border-n-orange/40">
            <Image src="/novus1.jpg" alt="Two Novus students with a local restaurant owner" width={640} height={800} sizes="200px" className="photo-grade aspect-square w-full object-cover" />
          </div>
          <ol className="flex flex-col justify-center gap-2">
            {["Content", "Outreach", "Review"].map((label, index) => (
              <li key={label} className="flex items-center gap-2 rounded-lg border border-n-orange/40 bg-white px-2.5 py-2">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[0.6875rem] font-semibold ${index === 0 ? "bg-n-orange text-n-ink" : "bg-n-orange/25 text-n-ink"}`}>{index + 1}</span>
                <span className="font-body text-sm font-semibold text-n-ink">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {track.name === "Finance & Operations" ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-n-yellow-dark">
          <div className="grid grid-cols-[1.3fr_0.7fr] gap-px bg-n-yellow-dark/60">
            {[["Grant application", "Ready"], ["Quarterly budget", "Review"], ["Donor report", "Draft"]].flatMap(([label, status]) => [
              <div key={label} className="bg-white px-3 py-2.5 font-body text-sm text-n-ink">{label}</div>,
              <div key={status} className="bg-n-yellow/20 px-3 py-2.5 font-mono text-[0.8125rem] font-semibold text-n-yellow-ink">{status}</div>,
            ])}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TrackDetail({ track, headingLevel = "h3" }: { track: Track; headingLevel?: "h3" | "h4" }) {
  const style = TRACK_STYLE[track.name];
  const Heading = headingLevel;

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-start gap-4">
        <Illustration name={style.illustration} className="h-16 w-16 shrink-0" />
        <div>
          <Heading className="font-display text-2xl font-bold text-n-ink">{track.name}</Heading>
          {"description" in track && track.description ? (
            <p className="mt-2 font-body text-[0.9375rem] leading-relaxed text-n-ink/75">{track.description}</p>
          ) : null}
        </div>
      </div>

      <div>
        <p className={`eyebrow ${style.ink}`}>Responsibilities</p>
        <ul className="mt-3 space-y-2.5">
          {track.doWhat.map((item) => (
            <li key={item} className="flex items-start gap-2.5 font-body text-[0.9375rem] leading-relaxed text-n-ink/85">
              <CheckIcon className={`mt-1 h-4 w-4 shrink-0 ${style.ink}`} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {"subdepartments" in track && track.subdepartments ? (
        <details className={`group rounded-card border ${style.border} bg-white/70 px-4 py-3`}>
          <summary className="flex min-h-11 list-none items-center justify-between gap-3 font-display text-[0.9375rem] font-bold text-n-ink">
            Choose a focus, or work across all four
            <svg aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-2 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-3 space-y-4 border-t border-n-border pt-4">
            {track.subdepartments.map((department) => (
              <div key={department.title}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="font-display text-[0.9375rem] font-bold text-n-ink">{department.title}</p>
                  {"serves" in department && department.serves ? (
                    <span className={`mono-meta ${style.ink}`}>{department.serves}</span>
                  ) : null}
                </div>
                <p className="mt-1 font-body text-[0.9375rem] leading-relaxed text-n-ink/75">{department.desc}</p>
              </div>
            ))}
          </div>
        </details>
      ) : null}

      <div className={`rounded-card ${style.soft} p-4`}>
        <p className="eyebrow text-n-ink/70">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="8" cy="5.5" r="2.5" />
            <path d="M3 14c.6-2.8 2.6-4.3 5-4.3s4.4 1.5 5 4.3" strokeLinecap="round" />
          </svg>
          Who fits in
        </p>
        <ul className="mt-3 space-y-2">
          {track.skills.map((item) => (
            <li key={item} className="flex items-start gap-2.5 font-body text-[0.9375rem] leading-relaxed text-n-ink/80">
              <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.accent}`} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <SampleProject track={track} />
      </div>
    </div>
  );
}

export default function TracksTabbed() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const orderedTracks = [...joinTracks].sort((a, b) => TRACK_ORDER[a.name] - TRACK_ORDER[b.name]);
  const track = orderedTracks[active];
  const activeStyle = TRACK_STYLE[track.name];

  const tabId = (index: number) => `${uid}-tab-${index}`;
  const panelId = `${uid}-panel`;

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % orderedTracks.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + orderedTracks.length) % orderedTracks.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = orderedTracks.length - 1;
    else return;

    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Desktop: all three tracks side by side */}
      <div className="hidden gap-5 lg:grid lg:grid-cols-3">
        {orderedTracks.map((item) => {
          const style = TRACK_STYLE[item.name];
          return (
            <section key={item.name} aria-label={item.name} className={`relative overflow-hidden rounded-card border ${style.border} bg-white p-6 shadow-e1`}>
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${style.accent}`} />
              <TrackDetail track={item} />
            </section>
          );
        })}
      </div>

      {/* Phones and tablets: tabs */}
      <div className="lg:hidden">
        <div role="tablist" aria-label="Student tracks" className="mb-5 grid gap-2 sm:grid-cols-3">
          {orderedTracks.map((item, index) => {
            const style = TRACK_STYLE[item.name];
            const selected = active === index;

            return (
              <button
                key={item.name}
                ref={(element) => { tabRefs.current[index] = element; }}
                role="tab"
                id={tabId(index)}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`relative flex min-h-16 w-full items-center gap-3 overflow-hidden rounded-card border-2 px-3 py-2 text-left transition duration-1 ${
                  selected ? `${style.border} bg-white shadow-e2` : "border-n-border bg-white/70 hover:border-n-ink/30"
                }`}
              >
                {selected ? <motion.span layoutId={`${uid}-active-track`} className={`absolute inset-x-0 top-0 h-1.5 ${style.accent}`} /> : null}
                <Illustration name={style.illustration} className="h-11 w-11 shrink-0" />
                <span className="font-display text-base font-bold leading-tight text-n-ink">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(active)}
          tabIndex={0}
          className={`tracks-tabbed-panel overflow-hidden rounded-card border ${activeStyle.border} bg-white shadow-e1`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={track.name}
              initial={reducedMotion ? false : { opacity: 0.4, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0.4, y: -6 }}
              transition={{ duration: DUR.quick, ease: EASE_OUT }}
              className="p-5 sm:p-7"
            >
              <TrackDetail track={track} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
