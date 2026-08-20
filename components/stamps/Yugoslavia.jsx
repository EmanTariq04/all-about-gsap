export default function Yugoslavia() {
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="none">
      <rect width="200" height="260" fill="#f4f2ea" />

      {/* teal identity bar, right edge */}
      <rect x="172" y="0" width="28" height="260" fill="#1f8a86" />
      <text
        x="186"
        y="230"
        textAnchor="start"
        fontSize="15"
        fontWeight="700"
        fill="#fff"
        letterSpacing="2"
        fontFamily="Arial, sans-serif"
        transform="rotate(-90 186 230)"
      >
        JUGOSLAVIJA
      </text>

      {/* thick diagonal ribbon, bottom-left to top-right, with lane lines */}
      <g stroke="#2b4fc4" strokeWidth="8" strokeLinecap="round">
        <line x1="10" y1="235" x2="150" y2="30" />
      </g>
      <g stroke="#7f97e0" strokeWidth="2">
        <line x1="18" y1="228" x2="142" y2="45" />
        <line x1="26" y1="221" x2="134" y2="60" />
        <line x1="34" y1="214" x2="126" y2="75" />
      </g>

      {/* small generic leaping figure, original silhouette */}
      <g transform="translate(120,40)" fill="#1f2b6b">
        <circle cx="14" cy="0" r="6" />
        <polygon points="4,8 24,8 30,26 22,26 18,16 10,26 2,26" />
        <polygon points="2,8 -8,2 -6,-4 6,4" />
      </g>

      {/* globe motif */}
      <g transform="translate(38,70)" stroke="#2b4fc4" strokeWidth="2" fill="none">
        <circle cx="0" cy="0" r="16" />
        <ellipse cx="0" cy="0" rx="7" ry="16" />
        <line x1="-16" y1="0" x2="16" y2="0" />
        <line x1="-14" y1="-8" x2="14" y2="-8" />
        <line x1="-14" y1="8" x2="14" y2="8" />
      </g>

      <text x="14" y="34" fontSize="30" fontWeight="700" fill="#2b4fc4" fontFamily="Georgia, serif">
        20
      </text>

      <text x="14" y="200" fontSize="8" fill="#161616" fontFamily="Arial, sans-serif">
        UNIVERZALNI - ZAGREB
      </text>
      <text x="14" y="212" fontSize="8" fill="#161616" fontFamily="Arial, sans-serif">
        SVIET MLADIH - ZA SVIET MIRA
      </text>
    </svg>
  );
}
