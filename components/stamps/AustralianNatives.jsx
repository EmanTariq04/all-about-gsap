import { starPath } from "./utils";

const STARS = [
  { cx: 145, cy: 70, r: 7 },
  { cx: 170, cy: 100, r: 9 },
  { cx: 130, cy: 120, r: 6 },
  { cx: 160, cy: 150, r: 8 },
  { cx: 120, cy: 165, r: 5 },
];

export default function AustralianNatives() {
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="none">
      <rect width="200" height="260" fill="#e2481f" />
      <circle cx="150" cy="130" r="115" fill="#2760c9" />

      {STARS.map((s, i) => (
        <path key={i} d={starPath(s.cx, s.cy, s.r)} fill="#fff" />
      ))}

      <text x="14" y="34" fontSize="24" fontWeight="700" fill="#161616" fontFamily="Georgia, serif">
        6c
      </text>
      <text x="14" y="54" fontSize="13" fill="#161616" fontFamily="Georgia, serif">
        Australia
      </text>

      <text x="14" y="222" fontSize="11" fill="#161616" fontFamily="Georgia, serif">
        Australian Natives'
      </text>
      <text x="14" y="236" fontSize="11" fill="#161616" fontFamily="Georgia, serif">
        Association 1871-1971
      </text>

      <text x="14" y="252" fontSize="8" letterSpacing="1" fill="#161616" fontFamily="Arial, sans-serif">
        RICHARD BECK
      </text>
      <text x="186" y="252" textAnchor="end" fontSize="8" letterSpacing="1" fill="#161616" fontFamily="Arial, sans-serif">
        R B A
      </text>
    </svg>
  );
}
