"use client";

import Link from "next/link";

const DEMOS = [
  { href: "/horizontal", label: "Horizontal Blinds" },
  { href: "/random-grid", label: "Random Grid" },
  { href: "/vertical", label: "Vertical Blinds" },
  { href: "/column-grid", label: "Column Grid" },
];

export default function Frame({current}) {
  return (
    <header className="frame">
      {/* <a
        className="frame__back"
        href="https://tympanus.net/codrops/?p=111094"
        target="_blank"
        rel="noreferrer"
      >
        Article
      </a>
      <a
        className="frame__archive"
        href="https://tympanus.net/codrops/hub/"
        target="_blank"
        rel="noreferrer"
      >
        All demos
      </a>
      <a
        className="frame__github"
        href="https://github.com/Hiro-kiii/Scroll-Transition/"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a> */}
      {/* <nav className="frame__demos">
        <span>More Variations: </span>
        {DEMOS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className={current === d.href ? "current" : ""}
          >
            {d.label}
          </Link>
        ))}
      </nav> */}
    </header>
  );
}
