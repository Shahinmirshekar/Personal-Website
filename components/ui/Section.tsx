import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  kicker?: string;
  heading?: ReactNode;
  subheading?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Adds the chapter anchor's scroll-margin so in-page nav lands below the sticky bar. */
  chapterAnchor?: boolean;
}

export function Section({
  id,
  kicker,
  heading,
  subheading,
  children,
  className = "",
  chapterAnchor = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 md:py-32 ${
        chapterAnchor ? "scroll-mt-24" : ""
      } ${className}`}
    >
      {(kicker || heading || subheading) && (
        <header className="mb-12 max-w-3xl md:mb-16">
          {kicker && (
            <p className="mb-3 font-data text-xs font-medium uppercase tracking-[0.2em] text-royal-300">
              {kicker}
            </p>
          )}
          {heading && (
            <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] text-soft-white sm:text-4xl md:text-5xl">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-warm-gray md:text-lg">
              {subheading}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
