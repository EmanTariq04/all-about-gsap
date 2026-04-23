"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";

import "./style.css";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// ─── 1. LENIS SMOOTH SCROLL ───────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

// Connect Lenis → GSAP ScrollTrigger (critical!)
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ─── 2. GRAB ELEMENTS ────────────────────────────────────────────────────
const logoRef = useRef(null);
const lenisRef = useRef(null);
const videoWrap = document.querySelector(".video-container");
const heroSection = document.querySelector(".hero");
const first = document.querySelector(".first");
const mid = document.querySelector(".mid");
const last = document.querySelector(".last");

// ─── 3. PHASE 1 — Video scales down + Logo rises to nav ──────────────────
// This ScrollTrigger watches the hero section
useGSAP(() => { 
  const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: heroSection,
    start: "top top",
    end: "+=80%", // scroll 80% of viewport height to complete phase 1
    scrub: 1.2, // smooth scrubbing
    pin: true, // pins the hero
  },
});
 })

tl1
  // Video shrinks from fullscreen → small centered box
  .to(
    videoWrap,
    {
      scale: 0.15,
      borderRadius: "4px",
      width: "70vh",
      height: "40vh",
      ease: "none",
      marginTop: "33vh",
    },
    0,
  )
  // Logo floats up from center to top-nav position
  .to(
    logoRef.current,
    {
      y: 0, // back to natural position (which is inside fixed header)
      scale: 0.25,
      ease: "none",
    },
    0,
  )
  .to(
    [".first", ".mid", ".last"],
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "none",
    },
    0.2,
  );




  return (
    <>
      <ReactLenis root options={{ autoRef: false }} ref={lenisRef} />
      <main>
       <header class="logo-wrap">
      <div class="logo" ref={logoRef}>
        heyyy
      </div>
    </header>

      <section class="hero">
      <span class="first">ANOTHER</span>
      <span class="mid">WEBSITE</span>

      <div class="video-container">
        <video autoplay loop muted playsinline>
          <source src="/testttt.mp4" type="video/mp4" />
        </video>
      </div>

      <span class="last">EXPERIENCE</span>
    </section>

    <section class="after-content">
      <p>content...</p>
    </section>
      </main>
    </>
  );
}
