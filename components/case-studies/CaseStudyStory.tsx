"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/content/types";
import { CaseStudyMotif } from "./CaseStudyMotifs";
import { fadeUp, revealViewport } from "@/lib/motion";

const FIELDS: { key: keyof CaseStudy; label: string }[] = [
  { key: "dataComplexity", label: "Data complexity" },
  { key: "approach", label: "Analytical approach" },
  { key: "visualSolution", label: "Visual solution" },
  { key: "recommendation", label: "Recommendation" },
  { key: "businessValue", label: "Business value" },
];

export function CaseStudyStory({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      className="grid gap-8 rounded-2xl border border-charcoal-surface bg-charcoal-raised/50 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr]"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
    >
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="font-data text-xs uppercase tracking-wide text-warm-gray">
            Case study {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-soft-white">
            {study.title}
          </h3>
          <p className="mt-3 text-pretty text-sm italic leading-relaxed text-royal-300">
            &ldquo;{study.question}&rdquo;
          </p>
        </div>
        <div className="rounded-xl border border-charcoal-surface bg-charcoal/60 p-4">
          <CaseStudyMotif motif={study.visualMotif} />
        </div>
      </div>

      <dl className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <dt className="font-data text-[0.7rem] uppercase tracking-wide text-royal-300">
              {field.label}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-light-gray">
              {study[field.key] as string}
            </dd>
          </div>
        ))}
      </dl>
    </motion.article>
  );
}
