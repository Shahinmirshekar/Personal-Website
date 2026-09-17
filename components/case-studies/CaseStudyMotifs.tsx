"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/content/types";

const stages = ["Awareness", "Consider", "Action", "Sustained", "Advocacy"];

function JourneyMotif() {
  return (
    <div className="flex items-center gap-1.5">
      {stages.map((stage, i) => (
        <div key={stage} className="flex flex-1 flex-col items-center gap-2">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-royal-400"
            initial={{ opacity: 0.3, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
          />
          {i < stages.length - 1 && <span className="h-px w-full bg-charcoal-surface" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

function KpiSystemMotif() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-lg border border-royal-400/25 bg-royal-950/30 p-2"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="h-1.5 w-2/3 rounded bg-royal-300/40" />
          <div className="mt-2 h-6 w-full rounded bg-royal-400/20" />
        </motion.div>
      ))}
    </div>
  );
}

const quadrants = [
  { label: "Protect", tone: "bg-royal-400/20 text-royal-200" },
  { label: "Rescue", tone: "bg-crimson-500/30 text-crimson-200" },
  { label: "Monitor", tone: "bg-royal-950/40 text-warm-gray" },
  { label: "Deprioritize", tone: "bg-charcoal-surface text-warm-gray" },
];

function SegmentationMotif() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {quadrants.map((q, i) => (
        <motion.div
          key={q.label}
          className={`flex h-12 items-center justify-center rounded-md text-[0.65rem] font-medium ${q.tone}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          {q.label}
        </motion.div>
      ))}
    </div>
  );
}

function DataQualityMotif() {
  const bars = [
    { label: "Matched", pct: 82, color: "bg-royal-400" },
    { label: "Fuzzy, reviewed", pct: 11, color: "bg-royal-300" },
    { label: "Unresolved", pct: 7, color: "bg-crimson-500" },
  ];
  return (
    <div className="space-y-2">
      {bars.map((bar, i) => (
        <div key={bar.label}>
          <div className="mb-1 flex justify-between text-[0.65rem] text-warm-gray">
            <span>{bar.label}</span>
            <span>{bar.pct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-charcoal-surface">
            <motion.div
              className={`h-full rounded-full ${bar.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.pct}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseStudyMotif({ motif }: { motif: CaseStudy["visualMotif"] }) {
  switch (motif) {
    case "journey":
      return <JourneyMotif />;
    case "kpi-system":
      return <KpiSystemMotif />;
    case "segmentation":
      return <SegmentationMotif />;
    case "data-quality":
      return <DataQualityMotif />;
    default:
      return null;
  }
}
