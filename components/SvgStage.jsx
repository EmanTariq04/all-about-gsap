import React from "react";

const DEFAULT_MASK_IDS = ["mask1", "mask2", "mask3"];
const DEFAULT_BLINDS_IDS = ["blinds1", "blinds2", "blinds3"];

/**
 * Pure markup for the scroll stage.
 * Animation is wired up client-side by the page component.
 */
export default function SvgStage({
  images,
//   texts,
  maskIds = DEFAULT_MASK_IDS,
  blindIds = DEFAULT_BLINDS_IDS,
}) {
  return (
    <section className="stage">
      <div className="layers">
        {images.map((src, i) => (
          <svg
            key={i}
            className="layer"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id={maskIds[i]} maskUnits="userSpaceOnUse">
                <rect x="0" y="0" width="100" height="100" fill="black" />
                <g id={blindIds[i]} />
              </mask>
            </defs>
            <image
              href={src}
              x="0"
              y="0"
              width="100"
              height="100"
              preserveAspectRatio="xMidYMid slice"
              mask={`url(#${maskIds[i]})`}
            />
          </svg>
        ))}

        {/* Progress bar */}
        {/* <div className="progress-bar">
          {images.map((_, i) => (
            <div key={i} className="segment">
              <div className="fill" />
            </div>
          ))}
        </div> */}

        {/* Text overlays */}
        {/* <div className="texts">
          {texts.map((t, i) => (
            <div key={i} className="txt">
              <h1>
                {t.title.map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < t.title.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <h2>{t.subtitle}</h2>
              <span>{t.body}</span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
