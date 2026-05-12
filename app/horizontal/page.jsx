"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Frame from "@/components/Frame";
import SvgStage from "@/components/SvgStage";
// import { initProgressBar } from "@/lib/progressBar";

gsap.registerPlugin(ScrollTrigger);

const SVG_NS = "http://www.w3.org/2000/svg";
const BLIND_COUNT = 30;

const IMAGES = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

const TEXTS = [
  {
    // title: ["FIRST", "IMAGE"],
    title: ["1"],
    // subtitle: "Section transition",
    // body: "画像を複数の横長の矩形でマスクし、スクロールに連動して矩形が順番に開くことで、次の画像へ滑らかに切り替わるトランジションです。",
  },
  {
    // title: ["SECOND", "IMAGE"],
    title: ["2"],
    // subtitle: "Section transition",
    // body: "画像を複数の横長の矩形でマスクし、スクロールに連動して矩形が順番に開くことで、次の画像へ滑らかに切り替わるトランジションです。",
  },
  {
    // title: ["THIRD", "IMAGE"],
    title: ["3"],
    // subtitle: "Section transition",
    // body: "画像を複数の横長の矩形でマスクし、スクロールに連動して矩形が順番に開くことで、次の画像へ滑らかに切り替わるトランジションです。",
  },
];

function createBlinds(groupId) {
  const g = document.getElementById(groupId);
  if (!g) return null;

  g.innerHTML = "";

  const width = window.innerWidth;
  const height = window.innerHeight;
  const vbHeight = (height / width) * 100;
  const h = vbHeight / BLIND_COUNT;

  const blinds = [];
  let currentY = 0;

  for (let i = 0; i < BLIND_COUNT; i++) {
    const centerY = vbHeight - (currentY + h / 2);

    const rectTop = document.createElementNS(SVG_NS, "rect");
    const rectBottom = document.createElementNS(SVG_NS, "rect");

    [rectTop, rectBottom].forEach((r) => {
      r.setAttribute("x", "0");
      r.setAttribute("width", "100");
      r.setAttribute("height", "0");
      r.setAttribute("fill", "white");
      r.setAttribute("shape-rendering", "crispEdges");
    });

    rectTop.setAttribute("y", String(centerY));
    rectBottom.setAttribute("y", String(centerY));

    g.appendChild(rectTop);
    g.appendChild(rectBottom);

    blinds.push({
      top: rectTop,
      bottom: rectBottom,
      y: centerY,
      h: h / 2,
    });

    currentY += h;
  }

  return blinds;
}

function openBlinds(blinds) {
  return gsap.timeline().to(
    blinds.flatMap((b) => [b.top, b.bottom]),
    {
      attr: {
        y: (_i) => {
          const b = blinds[Math.floor(_i / 2)];
          return _i % 2 === 0 ? b.y - b.h : b.y;
        },

        height: (_i) => {
          const b = blinds[Math.floor(_i / 2)];
          return b.h + 0.01;
        },
      },

      ease: "power3.out",
      stagger: {
        each: 0.02,
        from: "start",
      },
    },
  );
}

function textIn(el) {
  return gsap.to(el, {
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    duration: 1.5,
    ease: "expo.out",
  });
}

function textOut(el) {
  return gsap.to(el, {
    clipPath: "inset(0% 0% 100% 0%)",
    y: -30,
    duration: 1.2,
    ease: "power2.inOut",
  });
}

export default function HorizontalBlindsPage() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      smoothTouch: !isTouch,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerId = gsap.ticker.add((t) => {
      lenis.raf(t * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    let master = null;

    function updateLayout() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const vbW = 100;
      const vbH = (height / width) * 100;

      const blindsSets = [];

      document.querySelectorAll(".layer").forEach((svg) => {
        svg.setAttribute("viewBox", `0 0 ${vbW} ${vbH}`);

        svg.querySelector("mask rect")?.setAttribute("width", String(vbW));

        svg.querySelector("mask rect")?.setAttribute("height", String(vbH));

        const img = svg.querySelector("image");

        if (img) {
          img.setAttribute("width", String(vbW));
          img.setAttribute("height", String(vbH));
        }

        const gEl = svg.querySelector('g[id^="blinds"]');

        if (gEl) {
          const blinds = createBlinds(gEl.id);

          if (blinds) {
            blindsSets.push(blinds);
          }
        }
      });

      if (master) {
        master.kill();
      }

      const texts = gsap.utils.toArray(".txt");

      master = gsap.timeline({
        scrollTrigger: {
          trigger: ".stage",
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      blindsSets.forEach((blinds, i) => {
        master.add(openBlinds(blinds));

        if (texts[i]) {
          master.add(textIn(texts[i]), "-=0.3");
          master.add(textOut(texts[i]), "+=0.8");
        }
      });
    }

    updateLayout();

    // initProgressBar();

    let resizeTimer;

    const onResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        updateLayout();
      }, 250);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);

      gsap.ticker.remove(tickerId);

      master?.kill();

      ScrollTrigger.getAll().forEach((t) => t.kill());

      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Frame current="/horizontal" />

      <div className="spacer">
        {/* <h1>
          Scroll for page transition
          <br />
          <span>(Horizontal Blinds)</span>
        </h1> */}

        <span className="info">Scroll down</span>
      </div>

      <SvgStage images={IMAGES} texts={TEXTS} />

      <div className="spacer">
        <h1>
          <Link href="/random-grid">Content...</Link>
        </h1>
      </div>
    </>
  );
}
