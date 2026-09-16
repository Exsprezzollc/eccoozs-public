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
          <a href="/bellmont/explore">Explore</a>
          <a href="/bellmont/circle">Characters</a>
          <a href="/bellmont/student-organizations">Organizations</a>
          <a href="/bellmont/everyday-life">Student Life</a>
          <a href="/bellmont/traditions">Traditions</a>
          <a href="/bellmont/sounds-of-triumph">Sounds of Triumph</a>

          <details className="bellmont-more">
            <summary>
              More <span aria-hidden="true">⌄</span>
            </summary>
            <div className="bellmont-more-menu">
              <div>
                <strong>Student Experience</strong>
                <a href="/bellmont/welcome">Welcome</a>
                <a href="/bellmont/first-week">First Week</a>
                <a href="/bellmont/campus-life">Campus Life</a>
                <a href="/bellmont/living">Living at Bellmont</a>
                <a href="/bellmont/student-support">Student Support</a>
                <a href="/bellmont/wellness">Wellness & Recreation</a>
              </div>

              <div>
                <strong>Academics & Future</strong>
                <a href="/bellmont/academics">Academics</a>
                <a href="/bellmont/career">Career Development</a>
                <a href="/bellmont/financial-aid">Financial Aid</a>
              </div>

              <div>
                <strong>Bellmont Life & Values</strong>
                <a href="/bellmont/code">The Bellmont Code</a>
                <a href="/bellmont/athletics">Athletics</a>
                <a href="/bellmont/faith">Faith & Chapel</a>
                <a href="/bellmont/safety">Safety & Responsibility</a>
                <a href="/bellmont/blue-belles">Blue Belles</a>
              </div>
            </div>
          </details>

          <a href="https://www.youtube.com/@Eccoozs" target="_blank" rel="noreferrer">Watch</a>
        </nav>

        <a className="bellmont-join" href="/welcome#download">Join ECCOOZS</a>
      </header>

      {children}

      <footer className="bellmont-footer">
        <div>
          <img src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" />
          <span>BELLMONT STATE UNIVERSITY</span>
        </div>
        <span>A Higher Story.</span>
        <a href="/welcome">ECCOOZS</a>
      </footer>
    </div>
  );
}
