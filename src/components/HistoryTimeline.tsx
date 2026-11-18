"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

interface Milestone {
  month: string;
  year: string;
  label: string;
  desc: string;
}

const milestoneColors = ["bg-n-orange", "bg-n-purple", "bg-n-yellow", "bg-n-orange-dark", "bg-n-purple-dark"];

export default function HistoryTimeline({ milestones }: { milestones: Milestone[] }) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <ol ref={timelineRef} className="relative ml-3 pl-8 md:ml-8 md:pl-12">
      <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-0.5 bg-n-purple-ink/20" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-n-purple-ink/80"
        style={{ scaleY: reducedMotion ? 1 : progress }}
      />
      {milestones.map((milestone, index) => (
        <motion.li
          key={`${milestone.year}-${milestone.label}`}
          className="relative pb-8 last:pb-0 md:pb-10"
          initial={reducedMotion ? false : { y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            aria-hidden="true"
            className={`absolute -left-[2.38rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-n-ink md:-left-[3.38rem] ${milestoneColors[index] ?? "bg-n-orange"}`}
            initial={reducedMotion ? false : { scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
          />
          <div className="grid gap-3 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-7">
            <p className="self-start justify-self-start whitespace-nowrap rounded-full border border-n-ink/20 bg-white px-3 py-1 font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-n-ink">
              {milestone.month} {milestone.year}
            </p>
            <div className="rounded-card border border-n-purple/40 bg-white p-5 shadow-e1 md:p-6">
              <h3 className="font-display text-xl font-bold text-n-ink">{milestone.label}</h3>
              <p className="measure font-body mt-2 leading-relaxed text-n-muted">{milestone.desc}</p>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
