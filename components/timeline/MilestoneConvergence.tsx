"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";

interface Props {
  streams: string[];
  system: string;
  outcomes: string[];
  closingStatement: string;
}

/**
 * "Active operating system, not a future destination": multiple input
 * streams converge into one system, which produces the listed outcomes.
 * Used for the current-position milestone — see content/timeline.ts.
 */
export function MilestoneConvergence({ streams, system, outcomes, closingStatement }: Props) {
  return (
    <motion.div
      className="mt-5"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <div className="flex flex-wrap gap-1.5">
        {streams.map((stream) => (
          <motion.span
            key={stream}
            variants={fadeUp}
            className="rounded-full border border-royal-400/25 bg-royal-950/30 px-2.5 py-1 font-data text-[0.65rem] text-royal-200"
          >
            {stream}
          </motion.span>
        ))}
      </div>

      <motion.div variants={fadeUp} aria-hidden="true" className="my-2 flex justify-center text-crimson-400">
        ↓
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mx-auto w-fit rounded-full border border-crimson-500/50 bg-crimson-900/20 px-4 py-1.5 text-xs font-medium text-crimson-200"
      >
        {system}
      </motion.div>

      <motion.div variants={fadeUp} aria-hidden="true" className="my-2 flex justify-center text-crimson-400">
        ↓
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2">
        {outcomes.map((outcome) => (
          <motion.span
            key={outcome}
            variants={fadeUp}
            className="rounded-full bg-royal-400 px-3 py-1 text-xs font-medium text-charcoal"
          >
            {outcome}
          </motion.span>
        ))}
      </div>

      <motion.p
        variants={fadeUp}
        className="mt-4 text-center font-display text-base italic text-crimson-300"
      >
        {closingStatement}
      </motion.p>
    </motion.div>
  );
}
