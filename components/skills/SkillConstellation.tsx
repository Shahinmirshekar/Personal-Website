"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/content/skills";
import { computeSkillLayout, GROUP_COLOR, GROUP_LABEL } from "@/lib/skill-layout";
import { revealViewport } from "@/lib/motion";

const layout = computeSkillLayout();
const byId = new Map(layout.map((s) => [s.id, s]));

const edges = (() => {
  const seen = new Set<string>();
  const list: { a: string; b: string }[] = [];
  skills.forEach((skill) => {
    skill.relatedTo.forEach((targetId) => {
      const key = [skill.id, targetId].sort().join("::");
      if (seen.has(key)) return;
      seen.add(key);
      list.push({ a: skill.id, b: targetId });
    });
  });
  return list;
})();

export function SkillConstellation() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? byId.get(selectedId) : null;

  const neighborIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const set = new Set<string>([selectedId]);
    skills.forEach((skill) => {
      if (skill.id === selectedId) skill.relatedTo.forEach((id) => set.add(id));
      if (skill.relatedTo.includes(selectedId)) set.add(skill.id);
    });
    return set;
  }, [selectedId]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        {(Object.keys(GROUP_LABEL) as (keyof typeof GROUP_LABEL)[]).map((group) => (
          <div key={group} className="flex items-center gap-2 text-xs text-warm-gray">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: GROUP_COLOR[group] }}
            />
            {GROUP_LABEL[group]}
          </div>
        ))}
      </div>

      <motion.div
        className="relative mx-auto aspect-square w-full max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <svg viewBox="-40 -40 280 280" className="h-full w-full overflow-visible">
          {edges.map(({ a, b }) => {
            const pa = byId.get(a);
            const pb = byId.get(b);
            if (!pa || !pb) return null;
            const isHighlighted = selectedId ? neighborIds.has(a) && neighborIds.has(b) : false;
            const isDimmed = selectedId && !isHighlighted;
            return (
              <line
                key={`${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={isHighlighted ? "#f6f4ef" : "#4d6fce"}
                strokeWidth={isHighlighted ? 0.8 : 0.35}
                opacity={isDimmed ? 0.08 : isHighlighted ? 0.8 : 0.3}
              />
            );
          })}

          {layout.map((skill) => {
            const isSelected = skill.id === selectedId;
            const isNeighbor = neighborIds.has(skill.id);
            const isDimmed = selectedId !== null && !isNeighbor;
            return (
              <g
                key={skill.id}
                transform={`translate(${skill.x} ${skill.y})`}
                className="cursor-pointer"
                onClick={() => setSelectedId(isSelected ? null : skill.id)}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={skill.label}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedId(isSelected ? null : skill.id);
                  }
                }}
              >
                <circle
                  r={isSelected ? 3.4 : 2.4}
                  fill={GROUP_COLOR[skill.group]}
                  opacity={isDimmed ? 0.25 : 1}
                />
                <text
                  x={0}
                  y={skill.labelDy}
                  textAnchor="middle"
                  className="font-data select-none"
                  fontSize={isSelected ? 3.8 : 2.9}
                  fill={isDimmed ? "#8a8d95" : "#f6f4ef"}
                  opacity={isDimmed ? 0.35 : 1}
                >
                  {skill.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      <div className="mx-auto mt-6 max-w-xl text-center">
        {selected ? (
          <p className="text-sm text-light-gray">
            <span className="font-medium text-soft-white">{selected.label}</span> connects to{" "}
            {Array.from(neighborIds)
              .filter((id) => id !== selected.id)
              .map((id) => byId.get(id)?.label)
              .filter(Boolean)
              .join(", ")}
            .
          </p>
        ) : (
          <p className="text-sm text-warm-gray">
            Select any skill to see how it connects across disciplines.
          </p>
        )}
      </div>
    </div>
  );
}
