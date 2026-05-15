"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Tell ScrollTrigger to use Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const section = sectionRef.current;
    if (!section) return;

    const frontImages = section.querySelectorAll(".section__media__front");
    const smallImages = section.querySelectorAll(".section__images img");

    // Set initial scale values matching the CSS (.front-1 through .front-6)
    const initialScales = [1, 0.85, 0.6, 0.45, 0.3, 0.15];
    frontImages.forEach((el, i) => {
      gsap.set(el, {
        scale: initialScales[i] ?? 0.1,
        filter: "blur(10px)",
      });
    });

    gsap.set(smallImages, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      force3D: true,
      z: 0,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const easedProgress = gsap.parseEase("power1.inOut")(self.progress);
          section.style.setProperty("--progress", String(easedProgress));
        },
      },
    });

    // Small images fly toward camera (z-axis zoom)
    timeline.to(
      smallImages,
      {
        z: "100vh",
        duration: 1,
        ease: "power1.inOut",
        stagger: {
          amount: 0.2,
          from: "center",
        },
      },
      0,
    );

    // Front images scale up to 1 (they start at their individual values)
    timeline.to(
      frontImages,
      {
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      },
      0.6,
    );

    // Front images lose blur
    timeline.to(
      frontImages,
      {
        filter: "blur(0px)",
        duration: 1,
        ease: "power1.inOut",
        stagger: {
          amount: 0.2,
          from: "end",
        },
      },
      0.6,
    );

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
      timeline.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::after, *::before {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          font-size: 12px;
          --color-text: #1a1a1a;
          --color-bg: #fff;
          --color-link: #1a1a1a;
          --color-link-hover: #1a1a1a;
          --page-padding: 1.5rem;
        }

        html, body {
          max-width: 100vw;
          overflow-x: hidden;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        a {
          text-decoration: none;
          color: var(--color-link);
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        a:hover { text-decoration: underline; }

        .frame {
          display: grid;
          z-index: 1000;
          grid-row-gap: 1rem;
          grid-column-gap: 2rem;
          pointer-events: none;
          justify-items: start;
          align-content: start;
          padding: var(--page-padding);
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          grid-template-columns: auto auto auto 1fr;
          grid-template-rows: auto auto;
          grid-template-areas:
            "title title title sponsor"
            "back github archive sponsor";
        }
        .frame a, .frame button { pointer-events: auto; }
        .frame__title { grid-area: title; font-size: inherit; margin: 0; }
        .frame__back { grid-area: back; justify-self: start; }
        .frame__archive { grid-area: archive; justify-self: start; }
        .frame__github { grid-area: github; }

        /* ---- Section ---- */
        .section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          --progress: 0;
        }

        /* ---- Media layer ---- */
        .section__media {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          // transform: scale(var(--progress));
        }

        .section__media__back,
        .section__media__front {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .section__media__front img {
          mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%);
        }

        .section__media img,
        .section__media__back img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* ---- Heading ---- */
        .section h1 {
          font-size: 3vw;
          font-weight: 600;
          transform: translateY(-15%);
          display: flex;
          z-index: 10;
          position: relative;
          pointer-events: none;
          mix-blend-mode: difference;
          color: #A4A4A4;
        }

        .section h1 span { display: inline-block; }

        .section h1 .left {
          transform: translate3d(calc(var(--progress) * (-66vw + 100%) - 0.5vw), 0, 0);
        }
        .section h1 .right {
          transform: translate3d(calc(var(--progress) * (66vw - 100%)), 0, 0);
        }

        @media (max-width: 768px) {
          .section h1 { font-size: 9vw; }
          .section h1 .left {
            transform: translate3d(calc(var(--progress) * (-100vw + 100%) - 0.5vw), 0, 0);
          }
          .section h1 .right {
            transform: translate3d(calc(var(--progress) * (100vw - 100%)), 0, 0);
          }
        }

        /* ---- Small floating images ---- */
        .section__images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          perspective: 100vh;
        }

        .section__images img {
          position: absolute;
          width: 10vw;
          will-change: transform;
          border-radius: 0.5vw;
        }

        @media (max-width: 768px) {
          .section__images img { width: 20vw; }
        }

        .section__images img:nth-of-type(1)  { top: 15vw; left: 3vw; }
        .section__images img:nth-of-type(2)  { top: 5vw;  left: 20vw; }
        .section__images img:nth-of-type(3)  { top: 14vw;  left: 36.5vw; }
        .section__images img:nth-of-type(4)  { top: 18vw; right: 18vw; }
        .section__images img:nth-of-type(5)  { top: 5vw;  right: 10vw; }
        .section__images img:nth-of-type(6)  { bottom: 8vw;  left: 10vw; }
        .section__images img:nth-of-type(7)  { bottom: 18vw;  left: 28.5vw; }
        .section__images img:nth-of-type(8)  { bottom: 3vw;  left: 45vw; }
        .section__images img:nth-of-type(9)  { bottom: 16vw;  right: 25vw; }
        .section__images img:nth-of-type(10) { bottom: 26vw;  right: 10vw; }

        @media (max-width: 768px) {
          .section__images img:nth-of-type(3)  { top: 30vw;   left: 30vw; }
          .section__images img:nth-of-type(4)  { right: 15vw; top: 30vw; }
          .section__images img:nth-of-type(5)  { top: 10vw;   right: 5vw; }
          .section__images img:nth-of-type(6)  { left: 5vw; }
          .section__images img:nth-of-type(7)  { left: 10vw;  bottom: 27.5vw; }
          .section__images img:nth-of-type(8)  { bottom: 10vw; left: 35vw; }
          .section__images img:nth-of-type(9)  { bottom: 5vw; }
          .section__images img:nth-of-type(10) { right: 3vw;  bottom: 22vw; }
        }
      `}</style>

      <main>
        {/* ScrollSmoother requires GSAP Club license — using native scroll instead */}
        <div className="section" ref={sectionRef}>
          <h1>
            <span className="left">Scroll</span>
            <span className="right">Forward</span>
          </h1>

          <div className="section__media">
            <div className="section__media__back">
              <img
                src="https://images.unsplash.com/photo-1707568774879-49bcd6421a00?q=80&w=2660&auto=format&fit=crop"
                alt="Background"
              />
            </div>

            <div className="section__media__front front-1">
              <img
                src="https://images.unsplash.com/photo-1766583462878-966bd7eddf25?w=500&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
            <div className="section__media__front front-2">
              <img
                src="https://images.unsplash.com/photo-1750315080835-6f8640a00a12?w=500&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
            <div className="section__media__front front-3">
              <img
                src="https://plus.unsplash.com/premium_photo-1769982767612-e4731df23579?w=500&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
            <div className="section__media__front front-4">
              <img
                src="https://plus.unsplash.com/premium_photo-1769966940125-bb180c943337?w=500&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
            <div className="section__media__front front-5">
              <img
                src="https://plus.unsplash.com/premium_photo-1770717713060-281b0449e7e6?w=500&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
            <div className="section__media__front front-6">
              <img
                src="https://images.unsplash.com/photo-1653723290519-9fb20325b226?w=500&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
          </div>

          <div className="section__images">
            <img
              src="https://images.unsplash.com/photo-1771814574162-f1a7692fd28a?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1663866625094-5db30d3047b1?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1766087776834-18e343989a96?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1770025113283-8b16e75f56e4?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1495977091082-856100815c4e?w=500&auto=format&fit=crop&q=60"
              alt=""
            />

            <img
              src="https://plus.unsplash.com/premium_photo-1770371758176-c157961d6f10?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1769966939276-515a304cb08f?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
          
            <img
              src="https://images.unsplash.com/photo-1777703304508-29f9e5e7e592?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1777789062152-204fb6116e88?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
              <img
              src="https://plus.unsplash.com/premium_photo-1770794772978-1649ecf73855?w=500&auto=format&fit=crop&q=60"
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
