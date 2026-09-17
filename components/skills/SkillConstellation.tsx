"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, motionValue, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
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
// A gentle, perpetual drift so the constellation feels alive even when
// nobody's touching it — small enough (well under the hover lift, and a
// fraction of the hit-target radius) that it never affects click accuracy.
const FLOAT_AMPLITUDE = 1.6;

/** Tiny deterministic hash so each node's float cycle is out of phase with
 * its neighbors (otherwise the whole graph would visibly pulse in unison). */
function hashSeed(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return hash;
}

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

interface FloatValue {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

interface EdgeProps {
  a: string;
  b: string;
  pa: PositionedSkill;
  pb: PositionedSkill;
  hoveredId: string | null;
  hoverOffsetX: MotionValue<number>;
  hoverOffsetY: MotionValue<number>;
  floatA: FloatValue;
  floatB: FloatValue;
  isHighlighted: boolean;
  isDimmed: boolean;
}

/** Its own component (not inlined in a .map) because it needs its own
 * useTransform hooks — whichever endpoint is the currently-hovered node
 * reads the shared hover offset, so the line stays visually attached to the
 * dot as it lifts, and settles back with it on the same spring. Each
 * endpoint also tracks its own node's idle float, so the line stays
 * attached to both dots as they drift. */
function ConstellationEdge({ a, b, pa, pb, hoveredId, hoverOffsetX, hoverOffsetY, floatA, floatB, isHighlighted, isDimmed }: EdgeProps) {
  const x1 = useTransform([hoverOffsetX, floatA.x], ([ox, fx]: number[]) => pa.x + (a === hoveredId ? ox : 0) + fx);
  const y1 = useTransform([hoverOffsetY, floatA.y], ([oy, fy]: number[]) => pa.y + (a === hoveredId ? oy : 0) + fy);
  const x2 = useTransform([hoverOffsetX, floatB.x], ([ox, fx]: number[]) => pb.x + (b === hoveredId ? ox : 0) + fx);
  const y2 = useTransform([hoverOffsetY, floatB.y], ([oy, fy]: number[]) => pb.y + (b === hoveredId ? oy : 0) + fy);

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
  isHighlighted: boolean;
  isHovered: boolean;
  hoverOffsetX: MotionValue<number>;
  hoverOffsetY: MotionValue<number>;
  float: FloatValue;
  onSelect: () => void;
  onEnter: () => void;
  onLeave: () => void;
}

/** Its own component for the same reason as ConstellationEdge: a CSS
 * `transform` set via `style` (which is how the hover offset is applied)
 * completely replaces a plain SVG `transform="translate(...)"` attribute
 * rather than composing with it — so the node's base position has to be
 * folded into the same style-driven transform, which needs its own
 * useTransform hook per node. Its idle float offset is folded in the same
 * way, for the same reason. */
function ConstellationNode({ skill, isSelected, isDimmed, isHighlighted, isHovered, hoverOffsetX, hoverOffsetY, float, onSelect, onEnter, onLeave }: NodeProps) {
  const translateX = useTransform([hoverOffsetX, float.x], ([ox, fx]: number[]) => skill.x + (isHovered ? ox : 0) + fx);
  const translateY = useTransform([hoverOffsetY, float.y], ([oy, fy]: number[]) => skill.y + (isHovered ? oy : 0) + fy);
  // With ~50 skills on one graph, labels shown all the time overlap badly
  // no matter how the nodes are spaced — full names are long relative to
  // how close together nodes have to sit. Showing a label only once it's
  // actually relevant (hovered, selected, or a neighbor of the selection)
  // keeps the graph legible at rest and still makes every name discoverable.
  const showLabel = isHovered || isSelected || isHighlighted;

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
          hit-area padding. Kept modest (not larger) since a bigger radius
          would overlap neighbors' targets in the denser clusters. */}
      <circle r={7} fill="transparent" pointerEvents="all" />
      <circle r={isSelected ? 4.4 : 3.1} fill={GROUP_COLOR[skill.group]} opacity={isDimmed ? 0.25 : 1} />
      <motion.text
        x={0}
        y={skill.labelDy * 1.4}
        textAnchor="middle"
        className="font-data select-none"
        fontSize={isSelected ? 5 : 3.9}
        fill="#f6f4ef"
        pointerEvents="none"
        initial={false}
        animate={{ opacity: showLabel ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        {skill.label}
      </motion.text>
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
  // In the denser clusters, adjacent nodes' invisible hit-targets overlap —
  // without this, the pointer sitting in that overlap flips which node is
  // "hovered" every frame as they both idly float, each flip yanking the
  // hover offset toward a different direction and reading as a fast shake.
  // Debouncing the commit means a fleeting flicker between two overlapping
  // targets never actually fires; only a hover that holds still commits.
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Plain `motionValue()` (not the `useMotionValue` hook) since these are
  // created in bulk inside useMemo, where hooks can't be called — the
  // useMemo's empty deps array still gives each one a stable identity
  // across re-renders, same as a hook would.
  const floatValues = useMemo(() => {
    const map = new Map<string, FloatValue>();
    layout.forEach((skill) => map.set(skill.id, { x: motionValue(0), y: motionValue(0) }));
    return map;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const controls = layout.flatMap((skill) => {
      const { x, y } = floatValues.get(skill.id)!;
      const seed = hashSeed(skill.id);
      const delay = (seed % 17) / 10; // stagger so nodes don't drift in unison
      return [
        animate(y, [0, -FLOAT_AMPLITUDE, 0, FLOAT_AMPLITUDE * 0.5, 0], {
          duration: 4.2 + (seed % 11) / 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }),
        animate(x, [0, FLOAT_AMPLITUDE * 0.7, 0, -FLOAT_AMPLITUDE * 0.5, 0], {
          duration: 5.1 + (seed % 7) / 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.6,
        }),
      ];
    });
    return () => controls.forEach((c) => c.stop());
  }, [reducedMotion, floatValues]);

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
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredId(skill.id);
      // Lift the node outward, away from the graph's center, rather than
      // toward wherever the cursor happens to have entered — a fixed,
      // deliberate direction reads as an intentional "pop" instead of
      // jittery noise tied to exactly where within the hit area the
      // pointer landed.
      const dx = skill.x - VIEWBOX_CENTER.x;
      const dy = skill.y - VIEWBOX_CENTER.y;
      const length = Math.hypot(dx, dy) || 1;
      const magnitude = HOVER_LIFT_PX / scaleRef.current;
      rawHoverX.set((dx / length) * magnitude);
      rawHoverY.set((dy / length) * magnitude);
    }, 55);
  };

  const handleLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
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
                floatA={floatValues.get(a)!}
                floatB={floatValues.get(b)!}
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
                isHighlighted={selectedId !== null && !isDimmed}
                isHovered={skill.id === hoveredId}
                hoverOffsetX={hoverOffsetX}
                hoverOffsetY={hoverOffsetY}
                float={floatValues.get(skill.id)!}
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
