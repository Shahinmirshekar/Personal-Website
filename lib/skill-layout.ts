import { skills } from "@/content/skills";
import type { SkillItem } from "@/content/types";
import { round } from "./round";

export interface PositionedSkill extends SkillItem {
  x: number;
  y: number;
  /** Vertical text offset, fanned outward from the node's own cluster center
   * so adjacent labels within a tightly packed ring don't stack on one side. */
  labelDy: number;
}

const GROUP_CENTERS: Record<SkillItem["group"], { x: number; y: number }> = {
  analytics: { x: 100, y: 10 },
  marketing: { x: 190, y: 100 },
  design: { x: 100, y: 190 },
  leadership: { x: 10, y: 100 },
};

export const GROUP_COLOR: Record<SkillItem["group"], string> = {
  analytics: "#4d6fce",
  marketing: "#c22c47",
  design: "#8ba3e6",
  leadership: "#e07d90",
};

export const GROUP_LABEL: Record<SkillItem["group"], string> = {
  analytics: "Analytics & Technology",
  marketing: "Marketing & Growth",
  design: "Design & Storytelling",
  leadership: "Leadership & Execution",
};

/** Deterministic radial layout: each group forms its own small ring around
 * a shared quadrant center, so the constellation reads as four disciplines
 * that still visually belong to one system. */
export function computeSkillLayout(): PositionedSkill[] {
  const counts: Record<string, number> = {};
  skills.forEach((s) => {
    counts[s.group] = (counts[s.group] ?? 0) + 1;
  });
  const seen: Record<string, number> = {};

  return skills.map((skill) => {
    const center = GROUP_CENTERS[skill.group];
    const count = counts[skill.group];
    const i = seen[skill.group] ?? 0;
    seen[skill.group] = i + 1;
    const radius = 12 + count * 1.8;
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      ...skill,
      x: round(center.x + Math.cos(angle) * radius),
      y: round(center.y + Math.sin(angle) * radius),
      labelDy: Math.sin(angle) >= 0 ? 8.5 : -5,
    };
  });
}
