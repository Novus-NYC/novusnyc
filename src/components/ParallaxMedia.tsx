"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";

/** A background layer that drifts against the scroll; still under reduced motion. */
export default function ParallaxMedia({
  children,
  range = [-60, 60],
  className = "absolute inset-x-0 -inset-y-[14%]",
}: {
  children: ReactNode;
  range?: [number, number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { y, enabled } = useParallax(ref, { range });

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <motion.div className={className} style={{ y, willChange: enabled ? "transform" : "auto" }}>
        {children}
      </motion.div>
    </div>
  );
}
