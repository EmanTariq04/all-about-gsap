"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

useGSAP(
  () => {
    const sections = gsap.utils.toArray("section");

    sections.forEach((section, index) => {
      const container = section.querySelector(".container");

      gsap.set(container, { rotation: 45 });

      gsap.to(container, {
        rotation: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        },
      });

      if (index === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    });
  },
  { scope: containerRef }
);


  return (
    <>
      <ReactLenis root options={{ autoRef: false }} ref={lenisRef} />
      <main ref={containerRef}>
        <section className="one">
          <div className="container">
            <div className="col">
              <div className="img">
                <img
                  src="https://i.pinimg.com/736x/bd/57/1b/bd571bd803d14611dca389ab96d682a7.jpg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col">
              <h1>Gesture</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                expedita architecto laborum rem. Repellat, ullam omnis hic neque
                est quam dolorum ea laboriosam veniam aperiam dolor magnam.
                Temporibus quo nobis nostrum sed unde, incidunt necessitatibus
                reiciendis earum iusto, molestiae pariatur ad ipsam voluptate
                saepe obcaecati sequi doloribus ut dolores. Accusamus?
              </p>
            </div>
          </div>
        </section>

        <section className="two">
          <div className="container">
            <div className="col">
              <div className="img">
                <img
                  src="https://i.pinimg.com/736x/bd/57/1b/bd571bd803d14611dca389ab96d682a7.jpg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col">
              <h1>Gesture</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                expedita architecto laborum rem. Repellat, ullam omnis hic neque
                est quam dolorum ea laboriosam veniam aperiam dolor magnam.
                Temporibus quo nobis nostrum sed unde, incidunt necessitatibus
                reiciendis earum iusto, molestiae pariatur ad ipsam voluptate
                saepe obcaecati sequi doloribus ut dolores. Accusamus?
              </p>
            </div>
          </div>
        </section>

        <section className="three">
          <div className="container">
            <div className="col">
              <div className="img">
                <img
                  src="https://i.pinimg.com/736x/bd/57/1b/bd571bd803d14611dca389ab96d682a7.jpg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col">
              <h1>Gesture</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                expedita architecto laborum rem. Repellat, ullam omnis hic neque
                est quam dolorum ea laboriosam veniam aperiam dolor magnam.
                Temporibus quo nobis nostrum sed unde, incidunt necessitatibus
                reiciendis earum iusto, molestiae pariatur ad ipsam voluptate
                saepe obcaecati sequi doloribus ut dolores. Accusamus?
              </p>
            </div>
          </div>
        </section>

        <section className="four">
          <div className="container">
            <div className="col">
              <div className="img">
                <img
                  src="https://i.pinimg.com/736x/bd/57/1b/bd571bd803d14611dca389ab96d682a7.jpg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col">
              <h1>Gesture</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                expedita architecto laborum rem. Repellat, ullam omnis hic neque
                est quam dolorum ea laboriosam veniam aperiam dolor magnam.
                Temporibus quo nobis nostrum sed unde, incidunt necessitatibus
                reiciendis earum iusto, molestiae pariatur ad ipsam voluptate
                saepe obcaecati sequi doloribus ut dolores. Accusamus?
              </p>
            </div>
          </div>
        </section>

        <section className="five">
          <div className="container">
            <div className="col">
              <div className="img">
                <img
                  src="https://i.pinimg.com/736x/bd/57/1b/bd571bd803d14611dca389ab96d682a7.jpg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col">
              <h1>Gesture</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                expedita architecto laborum rem. Repellat, ullam omnis hic neque
                est quam dolorum ea laboriosam veniam aperiam dolor magnam.
                Temporibus quo nobis nostrum sed unde, incidunt necessitatibus
                reiciendis earum iusto, molestiae pariatur ad ipsam voluptate
                saepe obcaecati sequi doloribus ut dolores. Accusamus?
              </p>
            </div>
          </div>
        </section>

        <section className="six">
          <div className="container">
            <div className="col">
              <div className="img">
                <img
                  src="https://i.pinimg.com/736x/bd/57/1b/bd571bd803d14611dca389ab96d682a7.jpg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col">
              <h1>Gesture</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                expedita architecto laborum rem. Repellat, ullam omnis hic neque
                est quam dolorum ea laboriosam veniam aperiam dolor magnam.
                Temporibus quo nobis nostrum sed unde, incidunt necessitatibus
                reiciendis earum iusto, molestiae pariatur ad ipsam voluptate
                saepe obcaecati sequi doloribus ut dolores. Accusamus?
              </p>
            </div>
          </div>
        </section>
        <footer>
          <h1>Footer</h1>
        </footer>
      </main>
    </>
  );
}
