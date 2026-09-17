/**
 * Rounds trig-derived coordinates before they're used as SSR-rendered SVG
 * attributes. `Math.sin`/`Math.cos` can differ by a few ULPs between the
 * server's V8 and the browser's, which otherwise causes hydration mismatches
 * on numbers that are visually identical but not bit-for-bit equal.
 */
export function round(value: number, decimals = 4): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
