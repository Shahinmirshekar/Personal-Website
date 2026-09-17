/** A point the path must pass through. */
export interface PathAnchor {
  x: number;
  y: number;
}

/**
 * Builds a smooth path through anchors, joining each consecutive pair with a
 * symmetric S-curve (vertically-offset control points) — the standard trick
 * for a curve that's smooth rather than zig-zaggy at each anchor.
 */
export function buildSmoothPath(anchors: PathAnchor[]): string {
  if (anchors.length === 0) return "";
  let d = `M ${anchors[0].x} ${anchors[0].y}`;
  for (let i = 1; i < anchors.length; i++) {
    const prev = anchors[i - 1];
    const curr = anchors[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

/**
 * Builds the timeline spine's anchor list: every milestone Y lands exactly
 * at `center` (so its marker always sits on the line), and one anchor
 * bowed out to alternating sides is inserted at the midpoint of each gap —
 * including before the first milestone and after the last — so the line
 * winds gently rather than running straight, without ever pulling a marker
 * off of it.
 */
export function buildTimelineAnchors(
  milestoneYs: number[],
  totalHeight: number,
  { center, amplitude = 16 }: { center: number; amplitude?: number },
): PathAnchor[] {
  const keyYs = [0, ...milestoneYs, totalHeight];
  const anchors: PathAnchor[] = [{ x: center, y: 0 }];

  for (let i = 1; i < keyYs.length; i++) {
    const midY = (keyYs[i - 1] + keyYs[i]) / 2;
    const side = i % 2 === 0 ? 1 : -1;
    anchors.push({ x: center + side * amplitude, y: midY });
    anchors.push({ x: center, y: keyYs[i] });
  }

  return anchors;
}
