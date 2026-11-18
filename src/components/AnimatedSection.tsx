"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { DUR, EASE_OUT } from "@/lib/motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "left" | "right" | "none";
}

// Content is always painted at full opacity from the server HTML. The reveal
// only moves it a few pixels, so the largest paint never waits on hydration.
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = DUR.base,
  direction = "up",
}: Props) {
  const reduced = useReducedMotion();

  if (reduced || direction === "none") {
    return <div className={className}>{children}</div>;
  }

  const initial = {
    y: direction === "up" ? 14 : 0,
    x: direction === "left" ? -14 : direction === "right" ? 14 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ y: 0, x: 0 }}
      transition={{ duration, delay, ease: EASE_OUT }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
