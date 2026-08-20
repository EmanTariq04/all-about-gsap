import styles from "./Stamp.module.css";

/**
 * Stamp
 * A reusable "physical stamp" frame: gives any children the CSS-only
 * perforated (die-cut) edge, paper texture and drop shadow of a real
 * postage stamp. Purely presentational — drop any SVG/CSS artwork inside.
 *
 * Perforation is produced with four radial-gradient mask layers (one per
 * edge) combined with `mask-composite: intersect`, so it scales to any
 * width/height and any --perf-size / --perf-gap without raster assets.
 */
export default function Stamp({
  children,
  className = "",
  perfSize = 5,
  perfGap = 15,
  tone = "cream",
}) {
  return (
    <div
      className={`${styles.stamp} ${styles[tone] || ""} ${className}`}
      style={{
        "--perf-size": `${perfSize}px`,
        "--perf-gap": `${perfGap}px`,
      }}
    >
      <div className={styles.stampArt}>{children}</div>
    </div>
  );
}
