"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { gsap } from "gsap";

// ─── Custom eases (mirror your customEases) ────────────────────────────────
const customEases = {
  pageTransition: "power4.inOut",
  pageTransition2: "power4.inOut",
};

// ─── Transition functions ──────────────────────────────────────────────────
// defaultTransition: clip-path wipe from bottom
function defaultTransition(outEl, inEl) {
  gsap.set(inEl, {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 10,
  });

  const tl = gsap.timeline();
  tl.to(
    outEl,
    {
      y: "-30vh",
      opacity: 0.4,
      scale: 0.85,
      duration: 0.85,
      force3D: true,
      ease: customEases.pageTransition,
    },
    0
  ).to(
    inEl,
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.85,
      force3D: true,
      ease: customEases.pageTransition,
    },
    0
  );

  return tl;
}

// alternativeTransition: slide from right
function alternativeTransition(outEl, inEl) {
  gsap.set(inEl, {
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    x: "100%",
    zIndex: 10,
  });

  const tl = gsap.timeline();
  tl.to(
    outEl,
    {
      x: "-50%",
      scale: 0.8,
      opacity: 0.4,
      duration: 1.5,
      force3D: true,
      ease: customEases.pageTransition2,
    },
    0
  ).to(
    inEl,
    {
      x: 0,
      duration: 1.5,
      force3D: true,
      ease: customEases.pageTransition2,
    },
    0
  );

  return tl;
}

// Registry
const transitionRegistry = {
  "home-to-about": defaultTransition,
  "about-to-home": defaultTransition,
  default: defaultTransition,
};

function getTransition(from, to) {
  const key = `${from}-to-${to}`;
  return transitionRegistry[key] || transitionRegistry.default;
}

// ─── Context ───────────────────────────────────────────────────────────────
const TransitionContext = createContext(null);

// Maps pathnames to namespace strings (mirror your routes object)
const namespaceMap = {
  "/": "home",
  "/about": "about",
};

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Stores the pending "next" page namespace so the incoming page knows
  const pendingNamespaceRef = useRef(null);
  const currentNamespaceRef = useRef("home");

  // Called by the incoming page once it has mounted and is ready
  const incomingReadyRef = useRef(null);

  // The wrapper DOM node
  const wrapperRef = useRef(null);

  useEffect(() => {
    wrapperRef.current = document.querySelector('[data-transition="wrapper"]');
  }, []);

  const startTransition = useCallback(async (href, router) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const nextNamespace = namespaceMap[href] || "home";
    pendingNamespaceRef.current = nextNamespace;

    // Grab current container before navigation tears it down
    const outEl = document.querySelector('[data-transition="container"]');

    // Clone it into the wrapper so it stays visible during nav
    if (outEl && wrapperRef.current) {
      const frozen = outEl.cloneNode(true);
      frozen.id = "transition-out-clone";
      frozen.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100vh;
        z-index: 5; pointer-events: none;
        background: #fff;
      `;
      wrapperRef.current.appendChild(frozen);
    }

    // Navigate — Next.js will render the new page
    router.push(href);

    // The incoming page's useEffect will call signalReady, we wait for it
    await new Promise((resolve) => {
      incomingReadyRef.current = resolve;
    });
  }, [isTransitioning]);

  // Called by each page's useEffect when it has mounted
  const signalReady = useCallback((inEl, namespace) => {
    if (!incomingReadyRef.current) {
      // Initial load — just run enter animation, no transition needed
      currentNamespaceRef.current = namespace;
      return;
    }

    const outEl = document.getElementById("transition-out-clone");
    const from = currentNamespaceRef.current;
    const to = namespace;

    const transitionFn = getTransition(from, to);
    const tl = transitionFn(outEl, inEl);

    tl.then(() => {
      outEl?.remove();
      gsap.set(inEl, {
        clearProps: "clipPath,position,top,left,width,height,zIndex,opacity,x,y,scale",
        force3D: true,
      });
      currentNamespaceRef.current = to;
      incomingReadyRef.current = null;
      setIsTransitioning(false);
    });

    // Resolve the promise so startTransition can finish
    incomingReadyRef.current();
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition, signalReady, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used inside TransitionProvider");
  return ctx;
}