"use client";

import { motion } from "framer-motion";
import type { TimelineMilestone as Milestone } from "@/content/types";
import { MilestoneMotif } from "./MilestoneMotif";
import { MilestoneConvergence } from "./MilestoneConvergence";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { editorialEase } from "@/lib/motion";

interface Props {
  milestone: Milestone;
  side: "left" | "right";
  onEnter: () => void;
}

export function TimelineMilestone({ milestone, side, onEnter }: Props) {
  const isPreUs = milestone.era === "pre-us";
  const dotColor = milestone.isTurningPoint
    ? "bg-crimson-500"
    : milestone.chapter === "leadership"
      ? "bg-crimson-300"
      : "bg-royal-400";

  return (
    <motion.div
      id={`milestone-${milestone.id}`}
      data-chapter={milestone.chapter}
      className={`relative grid grid-cols-[2.5rem_1fr] items-start gap-x-6 md:grid-cols-[1fr_2.5rem_1fr] md:gap-x-10`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      onViewportEnter={onEnter}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {/* Marker column */}
      <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
        <motion.span
          data-marker-id={milestone.id}
          className={`relative z-10 mt-1.5 flex h-4 w-4 items-center justify-center rounded-full ${dotColor} ring-4 ring-charcoal`}
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: editorialEase }}
        >
          {milestone.isTurningPoint && (
            <span className="absolute h-full w-full animate-ping rounded-full bg-crimson-500/60 motion-reduce:animate-none" />
          )}
        </motion.span>
      </div>

      {/* Content — right on mobile always; alternates on desktop */}
      <motion.div
        className={`col-start-2 row-start-1 pb-16 md:pb-24 ${
          side === "left" ? "md:col-start-1 md:row-start-1 md:justify-self-end md:text-right" : "md:col-start-3"
        }`}
        variants={{
          hidden: { opacity: 0, y: 24, x: side === "left" ? -12 : 12 },
          visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: editorialEase } },
        }}
      >
        <div
          className={`inline-block w-full max-w-md rounded-2xl border p-6 ${
            isPreUs
              ? "border-dashed border-royal-300/25 bg-charcoal-raised/60"
              : "border-royal-400/20 bg-charcoal-surface"
          } ${milestone.isTurningPoint ? "border-crimson-700/40 bg-crimson-900/10" : ""}`}
        >
          <div className={`mb-3 flex items-center gap-3 ${side === "left" ? "md:flex-row-reverse" : ""}`}>
            <span
              className={`shrink-0 ${
                milestone.isTurningPoint ? "text-crimson-300" : "text-royal-300"
              }`}
            >
              {milestone.visual && <MilestoneMotif visual={milestone.visual} />}
            </span>
            {milestone.dateLabel && (
              <p className="font-data text-xs uppercase tracking-[0.15em] text-warm-gray">
                {milestone.dateLabel}
              </p>
            )}
          </div>

          <h3 className="font-display text-xl font-medium leading-snug text-soft-white sm:text-2xl">
            {milestone.title}
          </h3>
          {milestone.organization && (
            <p className="mt-1 text-sm font-medium text-royal-300">{milestone.organization}</p>
          )}
          <p className="mt-3 text-pretty text-sm leading-relaxed text-light-gray sm:text-base">
            {milestone.summary}
          </p>

          {milestone.detailParagraph && (
            <p className="mt-3 text-pretty text-sm leading-relaxed text-light-gray sm:text-base">
              {milestone.detailParagraph}
            </p>
          )}

          {milestone.convergence && (
            <MilestoneConvergence
              streams={milestone.convergence.streams}
              system={milestone.convergence.system}
              outcomes={milestone.convergence.outcomes}
              closingStatement={milestone.convergence.closingStatement}
            />
          )}

          {milestone.details && milestone.details.length > 0 && (
            <ul
              className={`mt-4 space-y-1.5 text-sm text-warm-gray ${
                side === "left" ? "md:list-none" : ""
              }`}
            >
              {milestone.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-royal-400" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {milestone.isPlaceholder && (
            <div className="mt-4">
              <PlaceholderBadge text="Confirm dates & details" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
