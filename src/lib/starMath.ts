/** Tiny deterministic random helper so the sky never reshuffles on re-render. */
export function mulberry32(seed: number) {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type StarSeed = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: "white" | "gold" | "lavender" | "blush";
};

const starColors: StarSeed["color"][] = ["white", "white", "gold", "lavender", "blush"];

export function generateStars(count: number, seed: number): StarSeed[] {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: random() * 100,
    y: random() * 100,
    size: 0.8 + random() * 1.9,
    opacity: 0.35 + random() * 0.65,
    duration: 3 + random() * 6,
    delay: random() * 6,
    color: starColors[Math.floor(random() * starColors.length)],
  }));
}

export type ParticleSeed = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
};

export function generateParticles(count: number, seed: number): ParticleSeed[] {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: random() * 100,
    y: random() * 100,
    size: 3 + random() * 8,
    duration: 12 + random() * 18,
    delay: random() * 12,
    driftX: (random() - 0.5) * 70,
    driftY: -30 - random() * 70,
  }));
}

export type HeartPoint = { x: number; y: number; size: number };

/** Points along a heart curve, mapped into a 600 × 420 SVG viewport. */
export function generateHeartPoints(count: number, seed = 9): HeartPoint[] {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, index) => {
    const t = (index / count) * Math.PI * 2;
    const rawX = 16 * Math.pow(Math.sin(t), 3);
    const rawY =
      13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const jitter = () => (random() - 0.5) * 7;
    return {
      x: 300 + rawX * 13.4 + jitter(),
      y: 214 - rawY * 8.2 + jitter(),
      size: 1.4 + random() * 2.6,
    };
  });
}

/** The same heart curve as an SVG path, used for the glow outline. */
export function generateHeartOutlinePath(samples = 180) {
  const points = Array.from({ length: samples }, (_, index) => {
    const t = (index / samples) * Math.PI * 2;
    const rawX = 16 * Math.pow(Math.sin(t), 3);
    const rawY =
      13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return `${(300 + rawX * 13.4).toFixed(1)} ${(214 - rawY * 8.2).toFixed(1)}`;
  });
  return `M${points.join(" L")} Z`;
}
