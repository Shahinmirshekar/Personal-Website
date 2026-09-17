"use client";

import { motion } from "framer-motion";
import { revealViewport } from "@/lib/motion";

const STAGES = ["Raw Data", "Structured Analysis", "Visual Insight", "Business Decision"];

export function TransformationSequence() {
  return (
    <motion.div
      className="mb-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {STAGES.map((stage, i) => (
        <div key={stage} className="flex items-center gap-3 sm:gap-4">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={`rounded-full border px-4 py-2 text-xs font-medium sm:text-sm ${
              i === STAGES.length - 1
                ? "border-crimson-500/50 bg-crimson-900/20 text-crimson-300"
                : "border-royal-400/30 bg-royal-950/30 text-royal-300"
            }`}
          >
            {stage}
          </motion.span>
          {i < STAGES.length - 1 && (
            <span aria-hidden="true" className="text-warm-gray">
              →
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
}
