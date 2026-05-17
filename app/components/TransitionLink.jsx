"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "./TransitionContext";

export default function TransitionLink({ href, children, className, ...props }) {
  const router = useRouter();
  const pathname = usePathname();
  const { startTransition, isTransitioning } = useTransition();

  const handleClick = (e) => {
    e.preventDefault();
    if (isTransitioning || pathname === href) return;
    startTransition(href, router);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}