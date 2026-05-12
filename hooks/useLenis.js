"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth-scroll
 * and connects it with GSAP ScrollTrigger
 */
export function useLenis() {
    
    useEffect(() => {
        let lenis = null;
        const isTouch = window.matchMedia("(pointer: coarse)").matches;

    lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      smoothTouch: !isTouch,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerId = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerId);

      lenis.destroy();
    };
  }, []);

  return lenis;
}
