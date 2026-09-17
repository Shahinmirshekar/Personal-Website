"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * 0→1 progress as `ref`'s element travels through the viewport, measured
 * from the moment its top enters the bottom of the viewport to the moment
 * its bottom leaves the top. Used to drive the hero's generative background
 * morph and any other scroll-linked (not scroll-jacked) effect.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const total = rect.height + viewportHeight;
      const traveled = viewportHeight - rect.top;
      const next = Math.min(1, Math.max(0, traveled / total));
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}
