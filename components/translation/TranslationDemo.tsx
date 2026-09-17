"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { translationDemo } from "@/content/translation";
import { editorialEase } from "@/lib/motion";

export function TranslationDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const layer = translationDemo.layers[activeIndex];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-charcoal-surface bg-charcoal-raised/60 p-5">
        <p className="font-data text-xs uppercase tracking-wide text-warm-gray">The finding</p>
        <p className="mt-2 text-sm leading-relaxed text-light-gray">{translationDemo.finding}</p>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {translationDemo.layers.map((l, i) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-pressed={i === activeIndex}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              i === activeIndex
                ? "border-royal-400 bg-royal-400/10 text-soft-white"
                : "border-charcoal-surface text-warm-gray hover:border-royal-400/40"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: editorialEase }}
          className="mt-6 rounded-2xl border border-royal-400/20 bg-royal-950/20 p-6 text-center"
        >
          <p className="text-pretty text-lg leading-relaxed text-soft-white sm:text-xl">
            {layer.copy}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
