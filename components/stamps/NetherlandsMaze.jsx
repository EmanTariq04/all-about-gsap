import { squareSpiralPath } from "./utils";

export default function NetherlandsMaze() {
  const spiral = squareSpiralPath(150, 4, 8);

  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="none">
      <rect width="200" height="260" fill="#f4d51f" />

      <g transform="translate(28,58)">
        <path
          d={spiral.d}
          fill="none"
          stroke="#1f8a3d"
          strokeWidth="13"
          strokeLinejoin="round"
          strokeLinecap="square"
        />
      </g>

      <text
        x="18"
        y="130"
        textAnchor="middle"
        fontSize="15"
        fill="#161616"
        letterSpacing="1"
        fontFamily="Arial, sans-serif"
        transform="rotate(-90 18 130)"
      >
        nederland
      </text>

      <text
        x="186"
        y="130"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#161616"
        letterSpacing="1"
        fontFamily="Arial, sans-serif"
        transform="rotate(-90 186 130)"
      >
        40+20 cent
      </text>
    </svg>
  );
}
