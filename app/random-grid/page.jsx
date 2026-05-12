"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Frame from "@/components/Frame";
import SvgStage from "@/components/SvgStage";
import { initProgressBar } from "@/lib/progressBar";

gsap.registerPlugin(ScrollTrigger);

const SVG_NS = "http://www.w3.org/2000/svg";
const GRID_ROWS = 0; // 0 = auto

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

function getGridCols() {
  if (window.innerWidth <= 599) return 6;

  if (window.innerWidth <= 1024) return 10;

  return 14;
}

function createBlinds(groupId) {
  const g = document.getElementById(groupId);

  if (!g) return null;

  g.innerHTML = "";

  const width = window.innerWidth;
  const height = window.innerHeight;

  const vbWidth = 100;
  const vbHeight = (height / width) * 100;

  const cols = getGridCols();

  const rows = GRID_ROWS || Math.round(cols * (vbHeight / vbWidth));

  const cellW = vbWidth / cols;
  const cellH = vbHeight / rows;

  const cells = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const rect = document.createElementNS(SVG_NS, "rect");

      rect.setAttribute("x", String(x * cellW));
      rect.setAttribute("y", String(y * cellH));
      rect.setAttribute("width", String(cellW));
      rect.setAttribute("height", String(cellH));
      rect.setAttribute("fill", "white");
      rect.setAttribute("shape-rendering", "crispEdges");
      rect.setAttribute("opacity", "0");

      g.appendChild(rect);

      cells.push(rect);
    }
  }

  return cells;
}

function openBlinds(cells) {
  const shuffled = gsap.utils.shuffle([...cells]);

  return gsap.timeline().to(shuffled, {
    opacity: 1,
    duration: 1.0,
    ease: "power3.out",
    stagger: {
      each: 0.02,
    },
  });
}

function textIn(el) {
  return gsap.to(el, {
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    duration: 2.6,
    ease: "expo.out",
  });
}

function textOut(el) {
  return gsap.to(el, {
    clipPath: "inset(0% 0% 100% 0%)",
    y: 0,
    duration: 2.0,
    ease: "power2.inOut",
  });
}

export default function RandomGridPage() {
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

      blindsSets.forEach((cells, i) => {
        master.add(openBlinds(cells));

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
        ScrollTrigger.refresh();
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
      <Frame current="/random-grid" />

      <div className="spacer">
        {/* <h1>
          On-Scroll SVG Mask Transitions
          <br />
          <span>(Random Grid)</span>
        </h1> */}

        <span className="info">Scroll down</span>
      </div>

      <SvgStage images={IMAGES} texts={TEXTS} />

      <div className="spacer">
        <h1>
          <Link href="/vertical">Content...</Link>
        </h1>
      </div>
    </>
  );
}
