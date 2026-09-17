"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fingerprints } from "@/content/fingerprints";
import { editorialEase, fadeUp, revealViewport, staggerChildren } from "@/lib/motion";
import { TransformationSequence } from "./TransformationSequence";

const KIND_LABEL: Record<string, string> = {
  sql: "SQL",
  dax: "DAX",
  "data-model": "Data Model",
  wireframe: "Wireframe",
  "kpi-tree": "KPI Tree",
  funnel: "Funnel",
  segmentation: "Segmentation",
  "journey-map": "Journey Map",
  "data-quality": "Data Quality",
  presentation: "Presentation",
  chart: "Chart",
  framework: "Framework",
};

export function DigitalFingerprintWall() {
  const [selectedId, setSelectedId] = useState(fingerprints[0].id);
  const selected = fingerprints.find((f) => f.id === selectedId) ?? fingerprints[0];

  return (
    <div>
      <TransformationSequence />

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={staggerChildren(0.05)}
      >
        {fingerprints.map((artifact) => {
          const isSelected = artifact.id === selectedId;
          return (
            <motion.button
              key={artifact.id}
              type="button"
              variants={fadeUp}
              onClick={() => setSelectedId(artifact.id)}
              aria-pressed={isSelected}
              className={`group flex flex-col rounded-xl border p-4 text-left transition-colors ${
                isSelected
                  ? "border-royal-400/60 bg-royal-950/30"
                  : "border-charcoal-surface bg-charcoal-raised/50 hover:border-royal-400/30"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-data text-[0.65rem] uppercase tracking-wide text-royal-300">
                  {KIND_LABEL[artifact.kind]}
                </span>
                <span className="text-xs text-warm-gray">{artifact.label}</span>
              </div>
              <pre className="overflow-hidden text-ellipsis whitespace-pre-wrap break-words font-data text-[0.7rem] leading-relaxed text-light-gray/80">
                {artifact.snippet.split("\n").slice(0, 4).join("\n")}
              </pre>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: editorialEase }}
          className="mt-10 rounded-2xl border border-charcoal-surface bg-charcoal-raised/60 p-6 sm:p-8"
        >
          <p className="font-data text-xs uppercase tracking-wide text-crimson-300">
            The thinking behind it
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-soft-white">What question was I trying to answer?</p>
              <p className="mt-1.5 text-sm text-light-gray">{selected.question}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-soft-white">What was unclear?</p>
              <p className="mt-1.5 text-sm text-light-gray">{selected.unclear}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-soft-white">How did I structure the problem?</p>
              <p className="mt-1.5 text-sm text-light-gray">{selected.structure}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-soft-white">What decision did the work support?</p>
              <p className="mt-1.5 text-sm text-light-gray">{selected.decision}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
