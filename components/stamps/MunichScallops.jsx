import { scallopRows } from "./utils";

const COLUMN_COLORS = ["#59ae43", "#4a9c40", "#2e8f6d", "#1f6cae", "#2b2569"];
const COL_W = 26;

export default function MunichScallops() {
  const rows = scallopRows(260, COL_W / 2, 0.1);

  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="none">
      <rect width="200" height="260" fill="#fbf9f2" />

      <defs>
        {COLUMN_COLORS.map((_, i) => (
          <clipPath id={`col-${i}`} key={i}>
            <rect x={i * COL_W} y="0" width={COL_W} height="260" />
          </clipPath>
        ))}
      </defs>

      {/* five scalloped colour columns, each a stack of overlapping circles */}
      {COLUMN_COLORS.map((color, i) => {
        const cx = COL_W / 2 + i * COL_W;
        return (
          <g key={color} clipPath={`url(#col-${i})`}>
            {rows.map((cy) => (
              <circle key={cy} cx={cx} cy={cy} r={COL_W / 2} fill={color} />
            ))}
          </g>
        );
      })}

      {/* abstract angular athlete mark, in the spirit of geometric 70s pictograms */}
      <g fill="#161616">
        <polygon points="150,150 168,132 176,138 176,150 190,150 190,158 170,158 168,168 150,168" />
        <circle cx="163" cy="122" r="7" />
        <polygon points="150,168 158,168 150,190 142,190" />
      </g>

      {/* five interlocking rings motif */}
      <g fill="none" stroke="#161616" strokeWidth="3">
        <circle cx="40" cy="222" r="12" />
        <circle cx="62" cy="222" r="12" />
        <circle cx="84" cy="222" r="12" />
        <circle cx="51" cy="232" r="12" />
        <circle cx="73" cy="232" r="12" />
      </g>

      <text x="196" y="34" textAnchor="end" fontSize="15" fontWeight="700" fill="#161616" fontFamily="Georgia, serif" transform="rotate(90 196 34)">
        Munich
      </text>
      <text x="196" y="16" textAnchor="end" fontSize="15" fontWeight="700" fill="#161616" fontFamily="Georgia, serif" transform="rotate(90 196 16)">
        1972
      </text>

      <text x="190" y="222" textAnchor="end" fontSize="26" fontWeight="700" fill="#1f6cae" fontFamily="Georgia, serif">
        7c
      </text>
      <text x="190" y="245" textAnchor="end" fontSize="13" fill="#161616" fontFamily="Georgia, serif">
        Australia
      </text>
    </svg>
  );
}
