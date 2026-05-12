'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Frame from '@/components/Frame';
import SvgStage from '@/components/SvgStage';
// import { initProgressBar } from '@/lib/progressBar';

gsap.registerPlugin(ScrollTrigger);

const SVG_NS = 'http://www.w3.org/2000/svg';
const BLIND_COUNT = 12;

const IMAGES = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg'];

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

function createBlinds(groupId, isFirstLayer, vbWidth) {
  const g = document.getElementById(groupId);

  if (!g) return null;

  g.innerHTML = '';

  const w = vbWidth / BLIND_COUNT;

  const blinds = [];

  let currentX = 0;

  for (let i = 0; i < BLIND_COUNT; i++) {
    const centerX = currentX + w / 2;

    const rectLeft = document.createElementNS(SVG_NS, 'rect');
    const rectRight = document.createElementNS(SVG_NS, 'rect');

    [rectLeft, rectRight].forEach((r) => {
      r.setAttribute('y', '0');
      r.setAttribute('height', '100');

      r.setAttribute(
        'width',
        isFirstLayer ? String(w / 2 + 0.1) : '0'
      );

      r.setAttribute('fill', 'white');
      r.setAttribute('shape-rendering', 'crispEdges');
    });

    if (isFirstLayer) {
      rectLeft.setAttribute('x', String(centerX - w / 2));
      rectRight.setAttribute('x', String(centerX));
    } else {
      rectLeft.setAttribute('x', String(centerX));
      rectRight.setAttribute('x', String(centerX));
    }

    g.appendChild(rectLeft);
    g.appendChild(rectRight);

    blinds.push({
      left: rectLeft,
      right: rectRight,
      x: centerX,
      w: w / 2,
    });

    currentX += w;
  }

  return blinds;
}

function openBlinds(blinds) {
  return gsap.to(
    blinds.flatMap((b) => [b.left, b.right]),
    {
      attr: {
        x: (_i) => {
          const b = blinds[Math.floor(_i / 2)];

          return _i % 2 === 0 ? b.x - b.w : b.x;
        },

        width: (_i) => {
          const b = blinds[Math.floor(_i / 2)];

          return b.w + 0.05;
        },
      },

      ease: 'none',

      stagger: {
        each: 0.02,
        from: 'start',
      },
    }
  );
}

export default function VerticalBlindsPage() {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      smoothTouch: !isTouch,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerId = gsap.ticker.add((t) => {
      lenis.raf(t * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    let master = null;

    function updateLayout() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const vbW = (width / height) * 100;
      const vbH = 100;

      const blindsSets = [];

      document.querySelectorAll('.layer').forEach((svg, i) => {
        svg.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`);

        svg
          .querySelector('mask rect')
          ?.setAttribute('width', String(vbW));

        svg
          .querySelector('mask rect')
          ?.setAttribute('height', String(vbH));

        const img = svg.querySelector('image');

        if (img) {
          img.setAttribute('width', String(vbW));
          img.setAttribute('height', String(vbH));

          img.setAttribute(
            'preserveAspectRatio',
            'xMidYMid slice'
          );
        }

        const gEl = svg.querySelector('g[id^="blinds"]');

        if (gEl) {
          const blinds = createBlinds(
            gEl.id,
            i === 0,
            vbW
          );

          if (blinds) {
            blindsSets.push(blinds);
          }
        }
      });

      if (master) {
        master.kill();
      }

      const texts = gsap.utils.toArray('.txt');

      master = gsap.timeline({
        scrollTrigger: {
          trigger: '.stage',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.0,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(texts, {
        clipPath: 'inset(0% 0% 100% 0%)',
        y: 40,
        opacity: 0,
      });

      gsap.set(texts[0], {
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0,
        opacity: 1,
      });

      blindsSets.forEach((blinds, i) => {
        if (i === 0) return;

        if (texts[i - 1]) {
          master.to(
            texts[i - 1],
            {
              clipPath: 'inset(0% 0% 100% 0%)',
              y: -40,
              opacity: 0,
              duration: 0.8,
            },
            '>'
          );
        }

        master.add(openBlinds(blinds), '-=0.3');

        if (texts[i]) {
          master.to(
            texts[i],
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              opacity: 1,
              duration: 0.8,
            },
            '-=0.5'
          );
        }

        master.to({}, { duration: 1 });
      });
    }

    updateLayout();

    // initProgressBar();

    let resizeTimer;

    const onResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        updateLayout();

        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);

      gsap.ticker.remove(tickerId);

      master?.kill();

      ScrollTrigger.getAll().forEach((t) => t.kill());

      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Frame current="/vertical" />

      <div className="spacer">
        {/* <h1>
          On-Scroll SVG Mask Transitions
          <br />
          <span>(Vertical Blinds)</span>
        </h1> */}

        <span className="info">Scroll down</span>
      </div>

      <SvgStage images={IMAGES} texts={TEXTS} />

      <div className="spacer">
        <h1>
          <Link href="/column-grid">
            Content...
          </Link>
        </h1>
      </div>
    </>
  );
}