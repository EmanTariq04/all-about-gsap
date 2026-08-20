// Small, dependency-free generators for the repeating shapes the stamp
// faces need (scalloped columns, a square-spiral "maze", a 5-point star).
// Kept as plain functions so every face component can stay a simple SVG.

/** Y-positions for a column of touching/overlapping semicircle "scallops". */
export function scallopRows(height, radius, overlap = 0.15) {
  const step = radius * 2 * (1 - overlap);
  const rows = [];
  for (let y = radius; y < height + radius; y += step) {
    rows.push(y);
  }
  return rows;
}

/** SVG path string for a 5-point star centered at (cx, cy). */
export function starPath(cx, cy, outerR, innerR = outerR * 0.42) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return `M${points.join("L")}Z`;
}

/**
 * SVG path string tracing a square spiral, used for the Netherlands maze
 * stamp. Starts at the outer edge and winds inward.
 */
export function squareSpiralPath(size, turns = 4, inset = 8) {
  let x = 0;
  let y = 0;
  let step = size - inset * 2;
  const path = [`M${x},${y}`];
  let dir = 0; // 0 right, 1 down, 2 left, 3 up
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  let len = step;
  for (let i = 0; i < turns * 4; i++) {
    x += dx[dir % 4] * len;
    y += dy[dir % 4] * len;
    path.push(`L${x},${y}`);
    dir++;
    if (dir % 2 === 0) len -= inset * 2;
  }
  return { d: path.join(" "), start: { x: 0, y: 0 } };
}
