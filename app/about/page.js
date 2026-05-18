"use client";

import { useRef } from "react";
import { useTransition } from "../components/TransitionContext";
import { useEnterAnimation } from "../animations/useEnterAnimation";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { signalReady } = useTransition();

  useEnterAnimation(containerRef, 0.32, (container) => {
    signalReady(container, "about");
  });

  return (
    <div data-transition="container" data-namespace="about" ref={containerRef}>
      <main className="bg-amber-950">
        <section className="hero">
          <div className="hero_content">
            {/* <div className="links_codrops">
              <a
                href="https://tympanus.net/codrops/?p=109206"
                target="_blank"
                rel="noreferrer"
              >
                TUTORIAL
              </a>
              <a
                href="https://tympanus.net/codrops/hub/"
                target="_blank"
                rel="noreferrer"
              >
                MORE DEMOS
              </a>
            </div> */}

            {/* <div className="lists_c">
              <ul>
                <li>
                  <div className="lines">
                    <div className="inner_lines inner_linesleft" />
                  </div>
                </li>
                <li>
                  <p className="anim_p">NAME</p>
                  <p className="anim_p">Flower Still Life with a Timepiece</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesleft" />
                  </div>
                </li>
                <li>
                  <p className="anim_p">ARTIST</p>
                  <p className="anim_p">Willem van Aelst</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesleft" />
                  </div>
                </li>
                <li>
                  <p className="anim_p">DATE</p>
                  <p className="anim_p">1663</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesleft" />
                  </div>
                </li>
              </ul>

              <ul>
                <li className="desktop">
                  <div className="lines desktop">
                    <div className="inner_lines inner_linesright" />
                  </div>
                </li>
                <li>
                  <p className="anim_p2">LOCATION</p>
                  <p className="anim_p2">Mauritshuis, La Haye</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesright" />
                  </div>
                </li>
                <li>
                  <p className="anim_p2">Style</p>
                  <p className="anim_p2">Baroque</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesright" />
                  </div>
                </li>
                <li>
                  <p className="anim_p2">Dimensions</p>
                  <p className="anim_p2">62,5 × 49 cm</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesright" />
                  </div>
                </li>
              </ul>
            </div> */}

            <h1 className="about_title text-amber-950">WV.663</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
