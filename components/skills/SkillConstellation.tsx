"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { skills } from "@/content/skills";
import { computeSkillLayout, GROUP_COLOR, GROUP_LABEL } from "@/lib/skill-layout";
import { revealViewport } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import type { PositionedSkill } from "@/lib/skill-layout";

const layout = computeSkillLayout();
const byId = new Map(layout.map((s) => [s.id, s]));

const VIEWBOX = { minX: -120, minY: -120, width: 440, height: 440 };
// How far a node can be pushed, and how close the cursor has to be to push it —
// both in viewBox units, matching learn-anything.xyz's node-graph feel.
const REPULSE_RADIUS = 85;
const REPULSE_STRENGTH = 32;
// Off-canvas sentinel so every node's offset settles back to 0 when idle.
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

/** Pushes a node away from the cursor when it's within REPULSE_RADIUS,
 * easing back to rest via a spring once the cursor moves away or leaves. */
function useRepulseOffset(
  axis: "x" | "y",
  nodeX: number,
  nodeY: number,
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
) {
  const raw = useTransform([mouseX, mouseY], (latest) => {
    const [mx, my] = latest as [number, number];
    const dx = nodeX - mx;
    const dy = nodeY - my;
    const dist = Math.hypot(dx, dy);
    if (dist >= REPULSE_RADIUS || dist < 0.01) return 0;
    const force = (1 - dist / REPULSE_RADIUS) * REPULSE_STRENGTH;
    return ((axis === "x" ? dx : dy) / dist) * force;
  });
  return useSpring(raw, { stiffness: 140, damping: 16, mass: 0.4 });
}

interface NodeProps {
  skill: PositionedSkill;
  isSelected: boolean;
  isDimmed: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onSelect: () => void;
}

function ConstellationNode({ skill, isSelected, isDimmed, mouseX, mouseY, onSelect }: NodeProps) {
  const offsetX = useRepulseOffset("x", skill.x, skill.y, mouseX, mouseY);
  const offsetY = useRepulseOffset("y", skill.x, skill.y, mouseX, mouseY);

  return (
    <g
      transform={`translate(${skill.x} ${skill.y})`}
      className="cursor-pointer"
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={skill.label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Invisible, stationary hit target. The visible dot below runs away
          from the cursor by design — but the cursor itself sits right at
          this base position when that happens, so keeping the clickable
          area fixed here (instead of following the animated dot) is what
          makes the node still selectable rather than an unclickable "chase
          the button" toy. */}
      <circle r={9} fill="transparent" pointerEvents="all" />
      <motion.g style={{ translateX: offsetX, translateY: offsetY }}>
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
      </motion.g>
    </g>
  );
}

export function SkillConstellation() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? byId.get(selectedId) : null;
  const reducedMotion = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseX = useMotionValue(IDLE);
  const mouseY = useMotionValue(IDLE);

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

          {layout.map((skill) => (
            <ConstellationNode
              key={skill.id}
              skill={skill}
              isSelected={skill.id === selectedId}
              isDimmed={selectedId !== null && !neighborIds.has(skill.id)}
              mouseX={mouseX}
              mouseY={mouseY}
              onSelect={() => setSelectedId(skill.id === selectedId ? null : skill.id)}
            />
          ))}
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
