"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { timeline } from "@/content/timeline";
import type { ChapterId } from "@/content/types";
import { TimelineMilestone } from "./TimelineMilestone";
import { CareerProgressNav } from "./CareerProgressNav";
import { Section } from "@/components/ui/Section";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { buildSmoothPath, buildTimelineAnchors } from "@/lib/timeline-path";

const LINE_WIDTH = 48;
const LINE_CENTER = LINE_WIDTH / 2;
const LINE_AMPLITUDE = 16;
const CONTINUATION_HEIGHT = 140;

export function CareerTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeChapter, setActiveChapter] = useState<ChapterId>(timeline[0].chapter);
  const [trackHeight, setTrackHeight] = useState(0);
  const [markerYs, setMarkerYs] = useState<number[]>([]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const measure = () => {
      const trackTop = node.getBoundingClientRect().top;
      const markers = node.querySelectorAll<HTMLElement>("[data-marker-id]");
      setMarkerYs(
        Array.from(markers).map((marker) => {
          const rect = marker.getBoundingClientRect();
          return rect.top - trackTop + rect.height / 2;
        }),
      );
      setTrackHeight(node.getBoundingClientRect().height);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const pathD =
    trackHeight > 0
      ? buildSmoothPath(
          buildTimelineAnchors(markerYs, trackHeight, { center: LINE_CENTER, amplitude: LINE_AMPLITUDE }),
        )
      : "";

  useLayoutEffect(() => {
    const path = progressPathRef.current;
    if (reducedMotion || !trackRef.current || !path || !pathD) return;
    ensureGsapRegistered();

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    }, trackRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion, pathD]);

  const scrollToChapter = (chapter: ChapterId) => {
    const milestone = timeline.find((m) => m.chapter === chapter);
    if (!milestone) return;
    document.getElementById(`milestone-${milestone.id}`)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <>
      <CareerProgressNav activeChapter={activeChapter} onSelect={scrollToChapter} />
      <Section
        id="timeline"
        chapterAnchor
        kicker="Career Timeline"
        heading="Two chapters, one throughline."
        subheading="Scroll to move through the story before and after moving to the United States — one identity, built by integrating design, marketing, and analytics rather than trading one for another."
      >
        <div ref={trackRef} className="relative">
          {pathD && (
            <svg
              aria-hidden="true"
              className="absolute left-5 top-0 h-full -translate-x-1/2 overflow-visible md:left-1/2"
              width={LINE_WIDTH}
              viewBox={`0 0 ${LINE_WIDTH} ${trackHeight}`}
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="timeline-progress-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c22c47" />
                  <stop offset="45%" stopColor="#4d6fce" />
                  <stop offset="100%" stopColor="#8ba3e6" />
                </linearGradient>
              </defs>
              {/* Base line — always fully visible, a faint guide. */}
              <path d={pathD} stroke="#181b24" strokeWidth={1.5} />
              {/* Animated progress line, drawn on scroll via stroke-dashoffset
                  (a straight-line scaleY trick doesn't work once the path curves). */}
              <path
                ref={progressPathRef}
                d={pathD}
                stroke="url(#timeline-progress-gradient)"
                strokeWidth={1.5}
              />
            </svg>
          )}

          <div className="flex flex-col">
            {timeline.map((milestone, i) => (
              <TimelineMilestone
                key={milestone.id}
                milestone={milestone}
                side={i % 2 === 0 ? "left" : "right"}
                onEnter={() => setActiveChapter(milestone.chapter)}
              />
            ))}
          </div>

          {/* Subtle continuation past the current role — ongoing growth,
              deliberately without a labeled chapter or card. */}
          <div className="relative" style={{ height: CONTINUATION_HEIGHT }} aria-hidden="true">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-charcoal" />
            <motion.span
              className="absolute left-5 top-16 h-2 w-2 -translate-x-1/2 rounded-full bg-royal-300 md:left-1/2"
              animate={reducedMotion ? undefined : { opacity: [0.3, 0.9, 0.3], scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
