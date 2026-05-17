"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Register SplitText (requires GSAP Club/Business licence)
// If you use the free gsap-trial or self-hosted, make sure SplitText is available
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * Wraps each char in a clip container so overflow:hidden masks the reveal.
 * Mirrors your wrap_chars helper.
 */
function wrapChars(splitInstance) {
  splitInstance.chars.forEach((char) => {
    const wrapper = document.createElement("span");
    wrapper.className = "char-wrapper";
    char.parentNode.insertBefore(wrapper, char);
    wrapper.appendChild(char);
    // initial state
    gsap.set(char, { y: "110%", rotateX: -90, force3D: true, backfaceVisibility: "hidden" });
  });
}

/**
 * Wraps each line in a clip container.
 * Mirrors your wrap_lines helper.
 */
function wrapLines(splitInstance) {
  splitInstance.lines.forEach((line) => {
    const wrapper = document.createElement("span");
    wrapper.style.cssText = "display:block; overflow:hidden;";
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
    gsap.set(line, { y: "105%", force3D: true });
  });
}

/**
 * useEnterAnimation — drop-in hook that mirrors ENTER(nextContainer, delay).
 *
 * @param {React.RefObject} containerRef  — ref attached to [data-transition="container"]
 * @param {number}          delay         — animation delay in seconds (default 0.32)
 * @param {Function}        onReady       — called once the container is ready for transition
 */
export function useEnterAnimation(containerRef, delay = 0.32, onReady) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const t = container.querySelector("h1");
    const content = container.querySelector(".hero_content");
    const linesRight = container.querySelectorAll(".inner_linesright");
    const linesLeft = container.querySelectorAll(".inner_linesleft");
    const ps = container.querySelectorAll(".anim_p");
    const ps2 = container.querySelectorAll(".anim_p2");

    if (!t) return;

    gsap.set(t, { opacity: 1 });
    gsap.set(content, { opacity: 1 });

    const s = new SplitText(t, { type: "chars", aria: false });
    const p = new SplitText(ps, { type: "lines", aria: false });
    const ptwo = new SplitText(ps2, { type: "lines", aria: false });

    wrapChars(s);
    wrapLines(p);
    wrapLines(ptwo);

    gsap.set(linesRight, { x: "-100%", force3D: true, backfaceVisibility: "hidden" });
    gsap.set(linesLeft,  { x: "-100%", force3D: true, backfaceVisibility: "hidden" });

    // Signal the transition system that this container is mounted and ready
    if (onReady) onReady(container);

    const isMobile = window.innerWidth < 900;

    const tl = gsap.timeline({
      defaults: { force3D: true, lazy: false },
    });

    tl.to(
      s.chars,
      {
        rotateX: 0,
        y: 0,
        duration: 2.1,
        stagger: 0.035,
        ease: "expo.out",
      },
      delay
    )
      .to(
        p.lines,
        {
          y: 0,
          duration: 1.65,
          stagger: { amount: 0.08, from: "end" },
          ease: "power3.out",
        },
        isMobile ? delay : delay + 0.2
      )
      .to(
        ptwo.lines,
        {
          y: 0,
          duration: 1.65,
          stagger: { amount: 0.08, from: "end" },
          ease: "power3.out",
        },
        delay + 0.2
      )
      .to(
        linesRight,
        {
          x: 0,
          duration: 1,
          stagger: { amount: 0.25, from: "start" },
          ease: "power2.inOut",
        },
        0
      )
      .to(
        linesLeft,
        {
          x: 0,
          duration: 1,
          stagger: { amount: 0.25, from: "start" },
          ease: "power2.inOut",
        },
        0
      );

    // Cleanup on unmount
    return () => {
      tl.kill();
      gsap.set(s.chars, { clearProps: "all" });
      // Revert SplitText
      try { s.revert(); } catch (_) {}
      try { p.revert(); } catch (_) {}
      try { ptwo.revert(); } catch (_) {}
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}