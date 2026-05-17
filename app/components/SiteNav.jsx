"use client";

import TransitionLink from "./TransitionLink";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  return (
    <nav className={styles.nav}>
      <TransitionLink href="/">one</TransitionLink>
      <TransitionLink href="/about">two</TransitionLink>
      <TransitionLink href="/blog">three</TransitionLink>
    </nav>
  );
}