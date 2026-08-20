"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./StampBook.module.css";
import Stamp from "./Stamp";
import StampBack from "./StampBack";

/**
 * StampBook
 * A stack of pages that flip open like a book, each page showing a
 * CSS/SVG stamp on the front and a catalogue card on the back.
 *
 * items: [{ id, tone, front: <ReactNode>, back: { country, year, title,
 *          value, description, catalogNo } }]
 */
export default function StampBook({ items }) {
  const [openMap, setOpenMap] = useState(() => items.map(() => false));
  const itemRefs = useRef([]);
  const bookRef = useRef(null);

  const anyOpen = openMap.some(Boolean);

  // shift the whole stack toward the spine while any page is open,
  // mirroring the original CSS custom-property transition
  useEffect(() => {
    gsap.to(bookRef.current, {
      x: anyOpen ? 100 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [anyOpen]);

  // close every page on an outside click, like the vanilla version
  useEffect(() => {
    const closeAll = () => {
      setOpenMap((prev) => {
        if (prev.every((v) => !v)) return prev;
        prev.forEach((isOpen, i) => isOpen && flip(i, false));
        return prev.map(() => false);
      });
    };
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function flip(index, opening) {
    const el = itemRefs.current[index];
    if (!el) return;
    const n = items.length;
    // stagger so pages further back in the stack animate a beat later,
    // same idea as the original transition-delay based on --i
    const delay = opening ? (n - index) * 0.08 : 0;

    if (opening) gsap.set(el, { zIndex: 20 + index });

    gsap.to(el, {
      rotationY: opening ? -180 : 0,
      duration: 0.55,
      ease: "power2.inOut",
      delay,
      onComplete: () => {
        if (!opening) gsap.set(el, { zIndex: 10 - index });
      },
    });
  }

  function toggle(index, e) {
    e.stopPropagation();
    const opening = !openMap[index];
    flip(index, opening);
    setOpenMap((prev) => {
      const next = [...prev];
      next[index] = opening;
      return next;
    });
  }

  return (
    <div className={styles.scene}>
      <div className={styles.heading}>
        <h1>Stamp Album</h1>
        <p>Tap a stamp to flip it open and read the catalogue entry</p>
      </div>

      <div className={styles.book} ref={bookRef}>
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[i] = el)}
            className={styles.item}
            style={{ zIndex: 10 - i }}
            onClick={(e) => toggle(i, e)}
          >
            <div className={styles.face}>
              <Stamp tone={item.tone}>{item.front}</Stamp>
            </div>
            <div className={`${styles.face} ${styles.faceBack}`}>
              <StampBack {...item.back} />
            </div>
          </div>
        ))}
      </div>

      <p className={styles.hint}>{anyOpen ? "Tap a stamp to close it" : "Tap a stamp to open it"}</p>
    </div>
  );
}
