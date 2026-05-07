"use client";

import React, { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const page = () => {
  let wrapper = useRef(null);
  let text = useRef(null);

  useEffect(() => {
    let split = SplitText.create(text.current, {
      type: "chars, words",
    });

    const scrollTween = gsap.to(text.current, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper.current,
        pin: true,
        end: "+=5000px",
        scrub: true,
      },
    });

    split.chars.forEach((char) => {
      gsap.from(char, {
        yPercent: "random(-200, 200)",
        rotation: "random(-20, 20)",
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "left 30%",
          scrub: 1,
        },
      });
    });
  });

  return (
    <section
      ref={wrapper}
      className="horizontal overflow-hidden h-screen flex items-center"
    >
      <div className="container flex w-max whitespace-nowrap gap-4 pl-[100vw]">
        <h3
          ref={text}
          className="horizontal-text heading-xl text-2xl font-bold leading-1"
        >
          ScrollTrigger enables anyone to create jaw-dropping scroll-based
          animations with minimal code. Infinitely flexible. Scrub, pin, snap,
          or just trigger anything scroll-related, even if it has nothing to do
          with animation.
        </h3>
      </div>
    </section>
  );
};

export default page;
