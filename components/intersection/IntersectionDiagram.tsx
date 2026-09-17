"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { intersectionLenses, decisionIntelligenceSteps } from "@/content/intersection";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { editorialEase, revealViewport } from "@/lib/motion";

const LENS_POSITION: Record<string, { top: string; left: string }> = {
  design: { top: "4%", left: "4%" },
  marketing: { top: "4%", left: "60%" },
  analytics: { top: "68%", left: "32%" },
};

const LENS_COLOR: Record<string, string> = {
  design: "border-royal-300/40 text-royal-300",
  marketing: "border-crimson-300/40 text-crimson-300",
  analytics: "border-royal-400/40 text-royal-400",
};

/** Line endpoints as percentages of the diagram's bounding box, matching LENS_POSITION. */
const LINE_POINTS: Record<string, { x: number; y: number }> = {
  design: { x: 20, y: 15 },
  marketing: { x: 80, y: 15 },
  analytics: { x: 50, y: 85 },
};
const HUB_POINT = { x: 50, y: 50 };

export function IntersectionDiagram() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const stepEmphasis: Record<number, string[]> = {
    0: ["design", "marketing"],
    1: ["marketing"],
    2: ["analytics"],
    3: ["design"],
    4: ["design", "marketing", "analytics"],
  };

  const emphasized = activeStep === null ? [] : stepEmphasis[activeStep] ?? [];

  return (
    <div>
      <motion.div
        className="relative mx-auto h-[620px] w-full max-w-2xl sm:h-[560px]"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {intersectionLenses.map((lens) => {
            const p = LINE_POINTS[lens.id];
            const isEmphasized = emphasized.includes(lens.id);
            return (
              <motion.line
                key={lens.id}
                x1={p.x}
                y1={p.y}
                x2={HUB_POINT.x}
                y2={HUB_POINT.y}
                stroke={lens.id === "marketing" ? "#c22c47" : "#4d6fce"}
                strokeWidth={isEmphasized ? 0.6 : 0.3}
                strokeDasharray="1.5 1.5"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: isEmphasized ? 0.9 : 0.4,
                    transition: { duration: reducedMotion ? 0 : 1, ease: editorialEase },
                  },
                }}
              />
            );
          })}
        </svg>

        {/* Hub */}
        <motion.div
          className="absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-soft-white/20 bg-charcoal-surface/90 text-center backdrop-blur-sm"
          style={{ left: `${HUB_POINT.x}%`, top: `${HUB_POINT.y}%` }}
          variants={{
            hidden: { scale: 0.7, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: editorialEase, delay: 0.4 } },
          }}
        >
          <p className="px-2 font-display text-sm font-medium leading-tight text-soft-white">
            Decision
            <br />
            Intelligence
          </p>
        </motion.div>

        {intersectionLenses.map((lens, i) => {
          const pos = LENS_POSITION[lens.id];
          const isEmphasized = emphasized.includes(lens.id);
          return (
            <motion.div
              key={lens.id}
              className={`absolute w-52 rounded-2xl border bg-charcoal-raised/80 p-4 backdrop-blur-sm transition-shadow ${LENS_COLOR[lens.id]} ${
                isEmphasized ? "shadow-[0_0_0_1px_currentColor]" : ""
              }`}
              style={{ top: pos.top, left: pos.left }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: editorialEase, delay: i * 0.12 },
                },
              }}
            >
              <p className="font-display text-lg font-medium">{lens.title}</p>
              <p className="mt-1 text-xs text-warm-gray">{lens.question}</p>
              <ul className="mt-3 space-y-1 text-xs text-light-gray">
                {lens.points.slice(0, 4).map((point) => (
                  <li key={point}>· {point}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mx-auto mt-12 max-w-2xl">
        <p className="mb-4 text-center text-sm text-warm-gray">
          Watch one business question move through all three lenses:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {decisionIntelligenceSteps.map((step, i) => (
            <button
              key={step}
              type="button"
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              aria-pressed={activeStep === i}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                activeStep === i
                  ? "border-royal-400 bg-royal-400/10 text-soft-white"
                  : "border-light-gray/20 text-warm-gray hover:border-light-gray/40 hover:text-soft-white"
              }`}
            >
              {i + 1}. {step}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
