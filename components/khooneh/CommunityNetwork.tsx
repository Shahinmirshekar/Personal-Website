"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { editorialEase } from "@/lib/motion";
import { round } from "@/lib/round";

const CLUSTER_COUNT = 13;
const DOTS_PER_CLUSTER = 5;
const CENTER = 100;
const CLUSTER_RADIUS = 72;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

interface Dot {
  id: string;
  scatterX: number;
  scatterY: number;
  clusterX: number;
  clusterY: number;
  clusterIndex: number;
}

const dots: Dot[] = [];
for (let c = 0; c < CLUSTER_COUNT; c++) {
  const angle = (c / CLUSTER_COUNT) * Math.PI * 2;
  const cx = CENTER + Math.cos(angle) * CLUSTER_RADIUS;
  const cy = CENTER + Math.sin(angle) * CLUSTER_RADIUS;
  for (let d = 0; d < DOTS_PER_CLUSTER; d++) {
    const seed = c * 17 + d;
    dots.push({
      id: `${c}-${d}`,
      scatterX: round(seededRandom(seed) * 190 + 5),
      scatterY: round(seededRandom(seed + 50) * 190 + 5),
      clusterX: round(cx + (seededRandom(seed + 100) - 0.5) * 22),
      clusterY: round(cy + (seededRandom(seed + 150) - 0.5) * 22),
      clusterIndex: c,
    });
  }
}

export function CommunityNetwork() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={CLUSTER_RADIUS + 14}
          fill="none"
          stroke="#e07d90"
          strokeWidth={0.6}
          strokeDasharray="1 5"
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            visible: {
              opacity: 0.5,
              scale: 1,
              transition: { duration: 1, ease: editorialEase, delay: 0.9 },
            },
          }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {dots.map((dot) => (
          <motion.circle
            key={dot.id}
            r={2.2}
            fill={dot.clusterIndex % 4 === 0 ? "#c22c47" : "#f6f4ef"}
            variants={{
              hidden: {
                cx: reducedMotion ? dot.clusterX : dot.scatterX,
                cy: reducedMotion ? dot.clusterY : dot.scatterY,
                opacity: reducedMotion ? 1 : 0.4,
              },
              visible: {
                cx: dot.clusterX,
                cy: dot.clusterY,
                opacity: 0.9,
                transition: {
                  duration: reducedMotion ? 0 : 1.1,
                  ease: editorialEase,
                  delay: reducedMotion ? 0 : dot.clusterIndex * 0.05,
                },
              },
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
