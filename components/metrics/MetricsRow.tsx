"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MetricItem } from "@/content/metrics";
import { useCountUp } from "@/lib/use-count-up";
import { revealViewport } from "@/lib/motion";

function Metric({
  metric,
  active,
  accentClass,
}: {
  metric: MetricItem;
  active: boolean;
  accentClass: string;
}) {
  const display = useCountUp(metric.value, active);
  return (
    <div className="border-t border-charcoal-surface pt-4">
      <p className="font-display text-3xl font-medium text-soft-white sm:text-4xl">
        {metric.prefix ?? ""}
        {display}
        {metric.suffix ?? ""}
      </p>
      <p className={`mt-2 text-sm font-medium ${accentClass}`}>{metric.label}</p>
      <p className="mt-1 text-xs leading-relaxed text-warm-gray">{metric.context}</p>
    </div>
  );
}

export function MetricsRow({
  metrics,
  accent = "royal",
}: {
  metrics: MetricItem[];
  accent?: "royal" | "crimson";
}) {
  const [active, setActive] = useState(false);
  const accentClass = accent === "crimson" ? "text-crimson-300" : "text-royal-300";

  return (
    <motion.div
      className="grid grid-cols-2 gap-6 sm:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      onViewportEnter={() => setActive(true)}
      variants={{ visible: {} }}
    >
      {metrics.map((metric) => (
        <Metric key={metric.id} metric={metric} active={active} accentClass={accentClass} />
      ))}
    </motion.div>
  );
}
