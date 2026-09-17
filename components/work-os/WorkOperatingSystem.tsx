"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { operatingLoop } from "@/content/work-os";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { revealViewport } from "@/lib/motion";
import { round } from "@/lib/round";

const RADIUS = 74;
const CENTER = 100;
const STEP_MS = 2000;

function pointFor(index: number) {
  const angle = (index / operatingLoop.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: round(CENTER + Math.cos(angle) * RADIUS),
    y: round(CENTER + Math.sin(angle) * RADIUS),
  };
}

const points = operatingLoop.map((_, i) => pointFor(i));

export function WorkOperatingSystem() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (reducedMotion || !autoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % operatingLoop.length);
    }, STEP_MS);
    return () => clearInterval(interval);
  }, [reducedMotion, autoPlay]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-center">
      <motion.div
        className="relative mx-auto aspect-square w-full max-w-xs"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#181b24"
            strokeWidth={1.2}
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#4d6fce"
            strokeWidth={0.6}
            strokeDasharray="2 4"
            opacity={0.5}
          />

          {!reducedMotion && (
            <motion.circle
              r={3}
              fill="#c22c47"
              animate={{
                cx: [...points.map((p) => p.x), points[0].x],
                cy: [...points.map((p) => p.y), points[0].y],
              }}
              transition={{
                duration: (STEP_MS / 1000) * operatingLoop.length,
                repeat: Infinity,
                ease: "linear",
                times: Array.from({ length: operatingLoop.length + 1 }, (_, i) => i / operatingLoop.length),
              }}
            />
          )}

          {operatingLoop.map((step, i) => {
            const p = points[i];
            const isActive = i === activeIndex;
            return (
              <g
                key={step.id}
                transform={`translate(${p.x} ${p.y})`}
                onClick={() => {
                  setActiveIndex(i);
                  setAutoPlay(false);
                }}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={step.label}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(i);
                    setAutoPlay(false);
                  }
                }}
              >
                <circle r={isActive ? 7 : 5} fill={isActive ? "#4d6fce" : "#181b24"} stroke="#4d6fce" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  dy={-11}
                  fontSize={5.4}
                  className="font-data select-none"
                  fill={isActive ? "#f6f4ef" : "#8a8d95"}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      <div>
        <motion.div
          key={operatingLoop[activeIndex].id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 rounded-2xl border border-royal-400/20 bg-royal-950/20 p-6"
        >
          <p className="font-data text-xs uppercase tracking-wide text-royal-300">
            Step {activeIndex + 1} of {operatingLoop.length}
          </p>
          <h3 className="mt-2 font-display text-xl font-medium text-soft-white">
            {operatingLoop[activeIndex].label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-light-gray">
            {operatingLoop[activeIndex].description}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {operatingLoop.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setAutoPlay(false);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                i === activeIndex
                  ? "border-royal-400 text-soft-white"
                  : "border-charcoal-surface text-warm-gray hover:border-royal-400/40"
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
