"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { skills } from "@/content/skills";
import { computeSkillLayout, GROUP_COLOR, GROUP_LABEL, type PositionedSkill } from "@/lib/skill-layout";
import { revealViewport } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const layout = computeSkillLayout();
const byId = new Map(layout.map((s) => [s.id, s]));

const VIEWBOX = { minX: -120, minY: -120, width: 440, height: 440 };
const VIEWBOX_CENTER = { x: VIEWBOX.minX + VIEWBOX.width / 2, y: VIEWBOX.minY + VIEWBOX.height / 2 };
// A `transform: translateX()` set on an element inside the SVG is in that
// element's *local* user-coordinate space, not real screen pixels — it gets
// scaled up again by however much the viewBox is stretched to fill the
// rendered box. This constellation is full-bleed up to 1600px wide over a
// 440-unit viewBox (up to ~3.6x scale), so expressing the hover lift in raw
// viewBox units would move it several times further on screen than
// intended. Expressing it in real CSS pixels and dividing by the live scale
// factor keeps the on-screen movement the same size regardless of viewport
// width.
const HOVER_LIFT_PX = 8;

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

interface EdgeProps {
  a: string;
  b: string;
  pa: PositionedSkill;
  pb: PositionedSkill;
  hoveredId: string | null;
  hoverOffsetX: MotionValue<number>;
  hoverOffsetY: MotionValue<number>;
  isHighlighted: boolean;
  isDimmed: boolean;
}

/** Its own component (not inlined in a .map) because it needs its own
 * useTransform hooks — whichever endpoint is the currently-hovered node
 * reads the shared hover offset, so the line stays visually attached to the
 * dot as it lifts, and settles back with it on the same spring. */
function ConstellationEdge({ a, b, pa, pb, hoveredId, hoverOffsetX, hoverOffsetY, isHighlighted, isDimmed }: EdgeProps) {
  const x1 = useTransform(hoverOffsetX, (ox) => (a === hoveredId ? pa.x + ox : pa.x));
  const y1 = useTransform(hoverOffsetY, (oy) => (a === hoveredId ? pa.y + oy : pa.y));
  const x2 = useTransform(hoverOffsetX, (ox) => (b === hoveredId ? pb.x + ox : pb.x));
  const y2 = useTransform(hoverOffsetY, (oy) => (b === hoveredId ? pb.y + oy : pb.y));

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={isHighlighted ? "#f6f4ef" : "#4d6fce"}
      strokeWidth={isHighlighted ? 0.9 : 0.4}
      opacity={isDimmed ? 0.08 : isHighlighted ? 0.8 : 0.3}
    />
  );
}

interface NodeProps {
  skill: PositionedSkill;
  isSelected: boolean;
  isDimmed: boolean;
  isHovered: boolean;
  hoverOffsetX: MotionValue<number>;
  hoverOffsetY: MotionValue<number>;
  onSelect: () => void;
  onEnter: () => void;
  onLeave: () => void;
}

/** Its own component for the same reason as ConstellationEdge: a CSS
 * `transform` set via `style` (which is how the hover offset is applied)
 * completely replaces a plain SVG `transform="translate(...)"` attribute
 * rather than composing with it — so the node's base position has to be
 * folded into the same style-driven transform, which needs its own
 * useTransform hook per node. */
function ConstellationNode({ skill, isSelected, isDimmed, isHovered, hoverOffsetX, hoverOffsetY, onSelect, onEnter, onLeave }: NodeProps) {
  const translateX = useTransform(hoverOffsetX, (ox) => skill.x + (isHovered ? ox : 0));
  const translateY = useTransform(hoverOffsetY, (oy) => skill.y + (isHovered ? oy : 0));

  return (
    <motion.g
      style={{ translateX, translateY }}
      className="skill-node cursor-pointer"
      onClick={onSelect}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
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
      {/* Generous invisible hit target — the visible dot is only ~3
          viewBox units, too small to click reliably on its own. Moves
          together with the dot (same transform), so this is just normal
          hit-area padding. */}
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
    </motion.g>
  );
}

export function SkillConstellation() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selected = selectedId ? byId.get(selectedId) : null;
  const reducedMotion = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  // rendered SVG width ÷ viewBox width — how many screen px one viewBox unit
  // covers. Read live (not just on resize) since it also depends on how the
  // full-bleed container has actually settled at mount.
  const scaleRef = useRef(1);

  useEffect(() => {
    const node = svgRef.current;
    if (!node) return;
    const measure = () => {
      scaleRef.current = node.getBoundingClientRect().width / VIEWBOX.width || 1;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Shared by whichever single node is currently hovered, and by that
  // node's edges (see ConstellationEdge) — only one node can be hovered at
  // a time, so one pair of values is enough and keeps the dot and its
  // lines moving in perfect sync rather than animating independently.
  const rawHoverX = useMotionValue(0);
  const rawHoverY = useMotionValue(0);
  const hoverOffsetX = useSpring(rawHoverX, { stiffness: 300, damping: 22, mass: 0.4 });
  const hoverOffsetY = useSpring(rawHoverY, { stiffness: 300, damping: 22, mass: 0.4 });

  const neighborIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const set = new Set<string>([selectedId]);
    skills.forEach((skill) => {
      if (skill.id === selectedId) skill.relatedTo.forEach((id) => set.add(id));
      if (skill.relatedTo.includes(selectedId)) set.add(skill.id);
    });
    return set;
  }, [selectedId]);

  const handleEnter = (skill: PositionedSkill) => {
    if (reducedMotion) return;
    setHoveredId(skill.id);
    // Lift the node outward, away from the graph's center, rather than
    // toward wherever the cursor happens to have entered — a fixed,
    // deliberate direction reads as an intentional "pop" instead of jittery
    // noise tied to exactly where within the hit area the pointer landed.
    const dx = skill.x - VIEWBOX_CENTER.x;
    const dy = skill.y - VIEWBOX_CENTER.y;
    const length = Math.hypot(dx, dy) || 1;
    const magnitude = HOVER_LIFT_PX / scaleRef.current;
    rawHoverX.set((dx / length) * magnitude);
    rawHoverY.set((dy / length) * magnitude);
  };

  const handleLeave = () => {
    // hoveredId is deliberately left as-is: the offset springs back to 0,
    // which renders identically to "not hovered" for whatever node it
    // still points at, and clearing it immediately would cut the ease-out
    // short instead of letting the spring settle.
    rawHoverX.set(0);
    rawHoverY.set(0);
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
        >
          {edges.map(({ a, b }) => {
            const pa = byId.get(a);
            const pb = byId.get(b);
            if (!pa || !pb) return null;
            const isHighlighted = selectedId ? neighborIds.has(a) && neighborIds.has(b) : false;
            const isDimmed = Boolean(selectedId && !isHighlighted);
            return (
              <ConstellationEdge
                key={`${a}-${b}`}
                a={a}
                b={b}
                pa={pa}
                pb={pb}
                hoveredId={hoveredId}
                hoverOffsetX={hoverOffsetX}
                hoverOffsetY={hoverOffsetY}
                isHighlighted={isHighlighted}
                isDimmed={isDimmed}
              />
            );
          })}

          {layout.map((skill) => {
            const isSelected = skill.id === selectedId;
            const isDimmed = selectedId !== null && !neighborIds.has(skill.id);
            return (
              <ConstellationNode
                key={skill.id}
                skill={skill}
                isSelected={isSelected}
                isDimmed={isDimmed}
                isHovered={skill.id === hoveredId}
                hoverOffsetX={hoverOffsetX}
                hoverOffsetY={hoverOffsetY}
                onSelect={() => setSelectedId(isSelected ? null : skill.id)}
                onEnter={() => handleEnter(skill)}
                onLeave={handleLeave}
              />
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
