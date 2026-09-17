"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

interface Point {
  /** Symmetric geometric-layout position (0–1 normalized). */
  gx: number;
  gy: number;
  /** Organic network-layout position (0–1 normalized). */
  nx: number;
  ny: number;
}

const POINT_COUNT = 46;
const RING_COUNT = 3;

/** Deterministic pseudo-random so SSR/CSR and reloads render identically. */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildPoints(): Point[] {
  const points: Point[] = [];
  let index = 0;
  for (let ring = 0; ring < RING_COUNT; ring++) {
    const countInRing = 8 + ring * 6;
    const radius = 0.14 + ring * 0.15;
    for (let i = 0; i < countInRing && index < POINT_COUNT; i++, index++) {
      const angle = (i / countInRing) * Math.PI * 2 + ring * 0.3;
      const gx = 0.5 + Math.cos(angle) * radius;
      const gy = 0.5 + Math.sin(angle) * radius * 0.82;
      const nx = seededRandom(index * 1.7) * 0.94 + 0.03;
      const ny = seededRandom(index * 2.9 + 5) * 0.94 + 0.03;
      points.push({ gx, gy, nx, ny });
    }
  }
  return points;
}

const POINTS = buildPoints();

function nearestNeighbors(points: Point[], k: number): number[][] {
  return points.map((p, i) => {
    const distances = points
      .map((q, j) => ({
        j,
        d: i === j ? Infinity : (p.nx - q.nx) ** 2 + (p.ny - q.ny) ** 2,
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .map((entry) => entry.j);
    return distances;
  });
}

const NETWORK_EDGES = nearestNeighbors(POINTS, 2);

function ringEdges(): [number, number][] {
  const edges: [number, number][] = [];
  let start = 0;
  for (let ring = 0; ring < RING_COUNT; ring++) {
    const countInRing = 8 + ring * 6;
    for (let i = 0; i < countInRing; i++) {
      const a = start + i;
      const b = start + ((i + 1) % countInRing);
      if (a < POINT_COUNT && b < POINT_COUNT) edges.push([a, b]);
    }
    start += countInRing;
  }
  return edges;
}

const GEOMETRIC_EDGES = ringEdges();

export function GenerativeCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = reducedMotion ? 0.35 : progress;
  }, [progress, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let raf = 0;
    let frame = 0;

    const draw = () => {
      frame++;
      const t = progressRef.current;
      ctx.clearRect(0, 0, width, height);

      const drift = reducedMotion ? 0 : Math.sin(frame / 240) * 0.006;

      const positions = POINTS.map((p) => ({
        x: (p.gx + (p.nx - p.gx) * t) * width,
        y: (p.gy + (p.ny - p.gy) * t + drift) * height,
      }));

      // Geometric ring edges fade out as progress increases.
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(77, 111, 206, ${0.35 * (1 - t)})`;
      GEOMETRIC_EDGES.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(positions[a].x, positions[a].y);
        ctx.lineTo(positions[b].x, positions[b].y);
        ctx.stroke();
      });

      // Network edges fade in as progress increases.
      ctx.strokeStyle = `rgba(77, 111, 206, ${0.4 * t})`;
      NETWORK_EDGES.forEach((neighbors, i) => {
        neighbors.forEach((j) => {
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        });
      });

      positions.forEach((pos, i) => {
        const isCrimson = i % 11 === 0;
        const pulse = reducedMotion ? 0 : Math.sin(frame / 50 + i) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.fillStyle = isCrimson
          ? `rgba(194, 44, 71, ${0.55 + pulse * 0.25})`
          : `rgba(139, 163, 230, ${0.5 + pulse * 0.2})`;
        ctx.arc(pos.x, pos.y, isCrimson ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}
