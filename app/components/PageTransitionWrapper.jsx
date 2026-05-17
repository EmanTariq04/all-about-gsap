"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { executeTransition } from "@/lib/transitions/executeTransition";

const namespaceMap = {
  "/home": "home",
  "/about": "about",
};

export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const prevNamespace = useRef(namespaceMap["/"]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const nextNamespace = namespaceMap[pathname] || "home";

    if (
      isTransitioning.current ||
      prevNamespace.current === nextNamespace
    ) return;

    isTransitioning.current = true;

    executeTransition({
      currentNamespace: prevNamespace.current,
      nextNamespace,
      container: containerRef.current,
    }).finally(() => {
      prevNamespace.current = nextNamespace;
      isTransitioning.current = false;
    });
  }, [pathname]);

  return (
    <div data-transition="wrapper">
      <div
        ref={containerRef}
        data-transition="container"
        data-namespace={namespaceMap[pathname]}
      >
        {children}
      </div>
    </div>
  );
}