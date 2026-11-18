"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { joinTracks } from "@/data";
import Illustration, { type IllustrationName } from "@/components/Illustrations";

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

function TrackDetail({ track }: { track: Track }) {
  const style = TRACK_STYLE[track.name];

  return (
    <div className="flex h-full flex-col gap-6">
      {"description" in track && track.description ? (
        <p className="measure font-body text-base leading-relaxed text-n-ink/75">{track.description}</p>
      ) : null}

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

const SPINE_CLASS: Record<string, string> = {
  "Digital & Tech": "bg-n-purple",
  Marketing: "bg-n-orange",
  "Finance & Operations": "bg-n-yellow",
};

/**
 * The three tracks as a row of book spines: one open, the others standing as
 * vertical spines on wide screens and as stacked bars on phones.
 */
export default function TracksTabbed() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const orderedTracks = [...joinTracks].sort((a, b) => TRACK_ORDER[a.name] - TRACK_ORDER[b.name]);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {orderedTracks.map((track, index) => {
        const style = TRACK_STYLE[track.name];
        const open = index === active;
        const panelId = `${uid}-panel-${index}`;
        const number = String(index + 1).padStart(2, "0");

        return (
          <section
            key={track.name}
            aria-label={track.name}
            className={`spine-item overflow-hidden rounded-card border shadow-e1 ${style.border} ${
              open ? "is-open bg-white lg:flex-1" : `${SPINE_CLASS[track.name]} lg:w-[5.5rem] lg:flex-none`
            }`}
          >
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(index)}
                className={`flex w-full items-center gap-4 text-left ${
                  open
                    ? `border-b ${style.border} px-5 py-4 md:px-7`
                    : "min-h-16 px-5 py-3 lg:h-full lg:min-h-[38rem] lg:flex-col lg:justify-between lg:px-0 lg:py-6"
                }`}
              >
                <span className={`font-mono text-[0.8125rem] font-semibold ${open ? style.ink : "text-n-ink/70"}`}>{number}</span>
                {open ? <Illustration name={style.illustration} className="h-12 w-12 shrink-0" /> : null}
                <span
                  className={`flex-1 font-display font-bold leading-tight text-n-ink ${
                    open ? "text-2xl md:text-3xl" : "text-xl lg:flex-none lg:text-[1.6rem] lg:[writing-mode:vertical-rl] lg:rotate-180"
                  }`}
                >
                  {open ? <>{track.name.split(" ")[0]} <span className="accent-serif">{track.name.split(" ").slice(1).join(" ")}</span></> : track.name}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg ${
                    open ? "border-n-control-border text-n-ink" : "border-n-ink/40 bg-white/40 text-n-ink"
                  }`}
                >
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} hidden={!open} className="spine-panel p-5 md:p-7">
              {open ? <TrackDetail track={track} /> : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
