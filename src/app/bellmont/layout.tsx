import type { ReactNode } from "react";
import "./bellmont.css";

export default function BellmontLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bellmont-site">
      <header className="bellmont-topbar">
        <a className="bellmont-eccoozs" href="/welcome" aria-label="ECCOOZS home">
          <strong>ECCOOZS</strong>
          <span>Explore. Express. Elevate.</span>
        </a>
        <nav className="bellmont-nav" aria-label="Bellmont navigation">
          <a href="/bellmont">Bellmont State</a>
          <a href="/bellmont/circle">Characters</a>
          <a href="/bellmont/campus-life">Campus Life</a>
          <a href="/bellmont/traditions">Traditions</a>
          <a href="/bellmont/sounds-of-triumph">Sounds of Triumph</a>
          <a href="https://www.youtube.com/@Eccoozs" target="_blank" rel="noreferrer">Watch</a>
        </nav>
        <a className="bellmont-join" href="/welcome#download">Join ECCOOZS</a>
      </header>
      {children}
      <footer className="bellmont-footer">
        <div><img src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" /><span>BELLMONT STATE UNIVERSITY</span></div>
        <span>A Higher Story.</span>
        <a href="/welcome">ECCOOZS</a>
      </footer>
    </div>
  );
}
