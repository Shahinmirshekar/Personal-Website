"use client";

import { useEffect, useRef, useState } from "react";
import { timeline } from "@/content/timeline";
import type { ChapterId } from "@/content/types";
import { TimelineMilestone } from "./TimelineMilestone";
import { CareerProgressNav } from "./CareerProgressNav";
import { Section } from "@/components/ui/Section";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";

export function CareerTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeChapter, setActiveChapter] = useState<ChapterId>(timeline[0].chapter);

  useEffect(() => {
    if (reducedMotion || !trackRef.current || !progressLineRef.current) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );
    }, trackRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

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
          {/* Base line */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 h-full w-px bg-charcoal-surface md:left-1/2 md:-translate-x-1/2"
          />
          {/* Animated progress line — resembles a data stream via the subtle repeating gradient. */}
          <div
            ref={progressLineRef}
            aria-hidden="true"
            style={{ transformOrigin: "top", transform: reducedMotion ? "scaleY(1)" : undefined }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-crimson-500 via-royal-400 to-royal-300 md:left-1/2 md:-translate-x-1/2"
          />

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
        </div>
      </Section>
    </>
  );
}
