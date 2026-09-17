"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

/**
 * Animates 0→value once, the first time `active` becomes true. Used for the
 * one-time metric reveal — per the brief, counters should not re-trigger or
 * become decorative background motion.
 */
export function useCountUp(value: number, active: boolean, durationMs = 1400) {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const duration = reducedMotion ? 0 : durationMs;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, durationMs, reducedMotion, value]);

  return display;
}
