export default function MunichTrack() {
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="none">
      <rect width="200" height="260" fill="#fbf9f2" />

      {/* nested track ovals, right side */}
      <ellipse cx="140" cy="150" rx="52" ry="90" fill="#3fa844" />
      <ellipse cx="140" cy="150" rx="34" ry="66" fill="#d3312b" />
      <ellipse cx="140" cy="150" rx="18" ry="38" fill="#fbf9f2" />

      {/* abstract angular runner, original silhouette echoing 70s pictogram style */}
      <g fill="#161616">
        <circle cx="58" cy="90" r="8" />
        <polygon points="46,102 66,102 74,120 64,120 60,108 50,120 40,120" />
        <polygon points="46,102 30,96 32,88 48,96" />
        <polygon points="64,120 78,150 70,152 58,128" />
        <polygon points="50,120 42,152 34,150 44,118" />
      </g>

      {/* five interlocking rings motif */}
      <g fill="none" stroke="#161616" strokeWidth="2.5">
        <circle cx="30" cy="24" r="10" />
        <circle cx="48" cy="24" r="10" />
        <circle cx="66" cy="24" r="10" />
        <circle cx="39" cy="33" r="10" />
        <circle cx="57" cy="33" r="10" />
      </g>

      <text x="18" y="70" fontSize="15" fontWeight="700" fill="#161616" fontFamily="Georgia, serif" transform="rotate(-90 18 70)">
        Munich
      </text>
      <text x="18" y="90" fontSize="15" fontWeight="700" fill="#161616" fontFamily="Georgia, serif" transform="rotate(-90 18 90)">
        1972
      </text>

      <text x="16" y="220" fontSize="26" fontWeight="700" fill="#1f6cae" fontFamily="Georgia, serif">
        7c
      </text>
      <text x="16" y="243" fontSize="13" fill="#161616" fontFamily="Georgia, serif">
        Australia
      </text>
    </svg>
  );
}
