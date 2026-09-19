import type { ReactNode } from "react";
import "./bellmont.css";
import "./bellmont-nav.css";

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

      <aside
        aria-label="Bellmont fictional world notice"
        style={{
          background: "#061c3b",
          color: "rgba(255,255,255,.72)",
          borderTop: "1px solid rgba(255,255,255,.10)",
          padding: "22px 4vw 18px",
          textAlign: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 11,
          lineHeight: 1.65
        }}
      >
        <p style={{ margin: "0 auto", maxWidth: 1120 }}>
          <strong style={{ color: "#fff" }}>Fictional World Notice:</strong>{" "}
          Bellmont State University is a fictional institution created as part of the ECCOOZS original world.
          All characters, organizations, events, and locations depicted are fictional. Any resemblance to actual
          persons, institutions, events, or places is coincidental and unintentional.
        </p>
        <p style={{ margin: "7px auto 0", maxWidth: 1120, color: "rgba(255,255,255,.52)" }}>
          © ECCOOZS Technologies LLC. Bellmont State University and related characters, stories, names, artwork,
          and fictional properties are part of the ECCOOZS original world.
        </p>
      </aside>

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
