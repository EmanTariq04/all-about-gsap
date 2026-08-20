"use client";

import Image from "next/image";
import { Sparkles, Moon, SlidersHorizontal, Star, Cloud } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import LiquidEther from "./LiquidEther";

const NAV_LINKS = ["Home", "About", "Pricing", "Testimonials"];
const WORDS = ["effortless", "restful", "rejuvenating", "peaceful", "calm"];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1a0f0a] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/flower-1.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />

        {/* Left-side scrim */}
        <div className="absolute inset-0 bg-linear-to-r from-[#1a0f0a]/50 via-[#1a0f0a]/70 to-transparent" />

        <div className="absolute inset-0 bg-linear-to-t from-[#1a0f0a]/40 via-transparent to-[#1a0f0a]/10" />
      </div>

      <div
        className="absolute inset-0 z-10 mix-blend-screen opacity-70"
        style={{ pointerEvents: "auto" }}
      >
        <LiquidEther
          colors={["#DB6732", "#D79928", "#FE8534"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#DB6732"
          color1="#D79928"
          color2="#FE8534"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navbar */}
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-orange-600">
                <Cloud className="h-3 w-3 fill-white text-white" />
              </span>

              <span className="text-lg font-semibold tracking-tight">
                Pillo
              </span>
            </div>

            <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </div> */}

          <a
            href="#start"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a0f0a] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start sleeping better
          </a>
        </nav>

        {/* Hero body */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-6 pb-16 pt-8 md:px-10 lg:grid-cols-2 lg:gap-8">
          {/* Left: copy */}
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Sleep like it&apos;s
              <br />
              <RotatingWord />
              {/* <span className="text-orange-400">.</span> */}
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              Pillo tracks your sleep automatically, guides you through a
              calming wind-down, and wakes you gently — so better rest just
              happens, night after night.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#start"
                className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1a0f0a] transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Start sleeping better
              </a>

              <a
                href="#pricing"
                className="rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                View pricing
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-3">
                {["A", "B", "C"].map((letter, i) => (
                  <span
                    key={letter}
                    className="h-9 w-9 rounded-full border-2 border-[#1a0f0a] bg-linear-to-br from-orange-300 to-orange-600"
                    style={{ zIndex: 3 - i }}
                  />
                ))}
              </div>

              <div>
                <div className="flex gap-0.5 text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-white/60">Trusted by +14000 users</p>
              </div>
            </div>
          </div>

          {/* Right: phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function RotatingWord() {
  const wordRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      gsap.to(el, {
        yPercent: -110,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIndex((i) => (i + 1) % WORDS.length);
          gsap.fromTo(
            el,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
          );
        },
      });
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span ref={wordRef} className="inline-block">
        {WORDS[index]}
      </span>
    </span>
  );
}

function PhoneMockup() {
  return (
    <div className="relative h-[560px] w-[280px] rounded-[2.75rem] border-[6px] border-black/90 bg-black shadow-2xl sm:h-[620px] sm:w-[310px]">
      {/* Dynamic island */}
      <div className="absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

      {/* Screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.25rem]">
        <Image
          src="/images/flower-2.jpg"
          alt="Pillo sleep tracker app"
          fill
          className="object-cover object-[70%_30%]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        {/* App content */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <h2 className="text-4xl font-bold">Pillo</h2>

          <div className="flex w-fit items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#1a0f0a]">
            <Sparkles className="h-3.5 w-3.5" />
            Sleep Tracker
            <span className="mx-1 h-4 w-px bg-black/15" />
            <Moon className="h-3.5 w-3.5" />
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <p className="text-sm leading-snug text-white/90">
              No wearables, no logging — just close your eyes and let Pillo
              handle the rest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
