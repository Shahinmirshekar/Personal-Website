"use client";

import { chapters } from "@/content/timeline";
import type { ChapterId } from "@/content/types";

interface Props {
  activeChapter: ChapterId;
  onSelect: (chapter: ChapterId) => void;
}

/** Desktop-only chapter scrubber. On mobile the single-column timeline
 * carries the narrative on its own, so this nav is hidden there. */
export function CareerProgressNav({ activeChapter, onSelect }: Props) {
  return (
    <nav
      aria-label="Career timeline chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {chapters.map((chapter) => {
        const isActive = chapter.id === activeChapter;
        return (
          <button
            key={chapter.id}
            type="button"
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(chapter.id)}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-xs font-data uppercase tracking-wide transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-soft-white opacity-100"
                  : "translate-x-2 text-warm-gray opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {chapter.label}
            </span>
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive ? "w-6 bg-royal-400" : "w-2 bg-warm-gray/40 group-hover:bg-warm-gray"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
