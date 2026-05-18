"use client";

import { useRef } from "react";
import { useTransition } from "./components/TransitionContext";
import { useEnterAnimation } from "./animations/useEnterAnimation";

export default function HomePage() {
  const containerRef = useRef(null);
  const { signalReady } = useTransition();

  useEnterAnimation(containerRef, 0.32, (container) => {
    signalReady(container, "home");
  });

  return (
    <div data-transition="container" data-namespace="home" ref={containerRef}>
      <main className="bg-blue-900">
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
                  <p className="anim_p">L&apos;Apothéose d&apos;Hercule</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesleft" />
                  </div>
                </li>
                <li>
                  <p className="anim_p">ARTIST</p>
                  <p className="anim_p">François Lemoyne</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesleft" />
                  </div>
                </li>
                <li>
                  <p className="anim_p">DATE</p>
                  <p className="anim_p">1733–1736</p>
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
                  <p className="anim_p2">Château de Versailles</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesright" />
                  </div>
                </li>
                <li>
                  <p className="anim_p2">Style</p>
                  <p className="anim_p2">French baroque</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesright" />
                  </div>
                </li>
                <li>
                  <p className="anim_p2">Dimensions</p>
                  <p className="anim_p2">480 m²</p>
                  <div className="lines">
                    <div className="inner_lines inner_linesright" />
                  </div>
                </li>
              </ul>
            </div> */}

            <h1 className="home_title text-blue-900">AH.736</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
