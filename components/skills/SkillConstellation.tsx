"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { skills } from "@/content/skills";
import { computeSkillLayout, GROUP_COLOR, GROUP_LABEL } from "@/lib/skill-layout";
import { revealViewport } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const layout = computeSkillLayout();
const byId = new Map(layout.map((s) => [s.id, s]));

const VIEWBOX = { minX: -120, minY: -120, width: 440, height: 440 };
const VIEWBOX_CENTER = { x: VIEWBOX.minX + VIEWBOX.width / 2, y: VIEWBOX.minY + VIEWBOX.height / 2 };
// How much the whole graph tilts toward the cursor, in viewBox units per
// unit of cursor offset from center — small and capped, since this is a
// shared full-graph parallax rather than a per-node effect (see README:
// a per-node "flee the cursor" version made nodes unclickable).
const PARALLAX_STRENGTH = 0.1;
const PARALLAX_MAX = 22;
// Off-canvas sentinel so the parallax settles back to 0 when idle.
const IDLE = 9999;

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

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value));
}

export function SkillConstellation() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? byId.get(selectedId) : null;
  const reducedMotion = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseX = useMotionValue(IDLE);
  const mouseY = useMotionValue(IDLE);

  // The whole graph tilts toward the cursor as one rigid piece — alive and
  // reactive, but nothing ever moves relative to what you're pointing at,
  // so it never fights a click the way a per-node "flee" effect did.
  const rawParallaxX = useTransform(mouseX, (mx) =>
    mx === IDLE ? 0 : clamp((mx - VIEWBOX_CENTER.x) * PARALLAX_STRENGTH, PARALLAX_MAX),
  );
  const rawParallaxY = useTransform(mouseY, (my) =>
    my === IDLE ? 0 : clamp((my - VIEWBOX_CENTER.y) * PARALLAX_STRENGTH, PARALLAX_MAX),
  );
  const parallaxX = useSpring(rawParallaxX, { stiffness: 90, damping: 16, mass: 0.5 });
  const parallaxY = useSpring(rawParallaxY, { stiffness: 90, damping: 16, mass: 0.5 });

  const neighborIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const set = new Set<string>([selectedId]);
    skills.forEach((skill) => {
      if (skill.id === selectedId) skill.relatedTo.forEach((id) => set.add(id));
      if (skill.relatedTo.includes(selectedId)) set.add(skill.id);
    });
    return set;
  }, [selectedId]);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (reducedMotion || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * VIEWBOX.width + VIEWBOX.minX);
    mouseY.set(((e.clientY - rect.top) / rect.height) * VIEWBOX.height + VIEWBOX.minY);
  };

  const handlePointerLeave = () => {
    mouseX.set(IDLE);
    mouseY.set(IDLE);
  };

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

      {/* Full-bleed breakout: as wide as the viewport allows, ignoring the
          page's usual max-w-6xl content column (capped so it doesn't become
          absurdly tall — aspect-square ties height to width — on ultrawide
          monitors). */}
      <motion.div
        className="relative left-1/2 aspect-square w-screen max-w-[1600px] -translate-x-1/2 px-4 sm:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <svg
          ref={svgRef}
          viewBox={`${VIEWBOX.minX} ${VIEWBOX.minY} ${VIEWBOX.width} ${VIEWBOX.height}`}
          className="h-full w-full overflow-visible"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <motion.g style={{ translateX: parallaxX, translateY: parallaxY }}>
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
                  strokeWidth={isHighlighted ? 0.9 : 0.4}
                  opacity={isDimmed ? 0.08 : isHighlighted ? 0.8 : 0.3}
                />
              );
            })}

            {layout.map((skill) => {
              const isSelected = skill.id === selectedId;
              const isDimmed = selectedId !== null && !neighborIds.has(skill.id);
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
                  {/* Generous invisible hit target — the visible dot is
                      only ~3 viewBox units, too small to click reliably on
                      its own. Moves together with the dot (same parallax
                      group), so this is just normal hit-area padding, not a
                      workaround for the animation. */}
                  <circle r={9} fill="transparent" pointerEvents="all" />
                  <circle r={isSelected ? 4.4 : 3.1} fill={GROUP_COLOR[skill.group]} opacity={isDimmed ? 0.25 : 1} />
                  <text
                    x={0}
                    y={skill.labelDy * 1.4}
                    textAnchor="middle"
                    className="font-data select-none"
                    fontSize={isSelected ? 5 : 3.9}
                    fill={isDimmed ? "#8a8d95" : "#f6f4ef"}
                    opacity={isDimmed ? 0.35 : 1}
                  >
                    {skill.label}
                  </text>
                </g>
              );
            })}
          </motion.g>
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
