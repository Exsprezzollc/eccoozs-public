import type { Metadata } from "next";
import styles from "./CorporateHome.module.css";

export const metadata: Metadata = {
  title: "ECCOOZS Technologies — Explore. Express. Elevate.",
  description:
    "ECCOOZS Technologies builds connected platforms, learning experiences, media worlds, and commerce brands with purpose."
};

const destinations = [
  {
    type: "Platform",
    title: "ECCOOZS Social",
    description:
      "The community platform at the center of the ECCOOZS ecosystem — built for connection, discovery, expression, and opportunity.",
    href: "/welcome"
  },
  {
    type: "Learning",
    title: "ECCOOZS Learning",
    description:
      "A growing collection of thoughtful learning experiences designed to make discovery clearer, more engaging, and more useful.",
    href: "/learning"
  },
  {
    type: "Media & Worlds",
    title: "Bellmont State University",
    description:
      "An original ECCOOZS world built around people, purpose, possibility, campus life, story, and tradition.",
    href: "/bellmont"
  },
  {
    type: "Commerce",
    title: "House of Eccoozs",
    description:
      "Premium lifestyle, considered design, and high standards — the commerce and lifestyle expression of the ECCOOZS brand.",
    href: "/house-of-eccoozs"
  }
];

export default function HomePage() {
  return (
    <main id="top" className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="ECCOOZS Technologies home">
          <img src="/eccoozs-wordmark-blue-v2-640.png" alt="ECCOOZS" />
          <small>TECHNOLOGIES</small>
        </a>

        <nav className={styles.nav} aria-label="ECCOOZS Technologies navigation">
          <a href="#platforms">Platforms</a>
          <a href="#learning">Learning</a>
          <a href="#worlds">Media &amp; Worlds</a>
          <a href="#commerce">Commerce</a>
          <a href="#about">About</a>
        </nav>

        <a className={styles.join} href="/welcome">
          Join ECCOOZS
        </a>
      </header>

      <section className={styles.hero} aria-labelledby="eccoozs-tech-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ECCOOZS TECHNOLOGIES</p>
          <img
            className={styles.heroLogo}
            src="/eccoozs-wordmark-blue-v2-640.png"
            alt="ECCOOZS"
          />
          <h1 id="eccoozs-tech-title" className={styles.technologies}>
            TECHNOLOGIES
          </h1>
          <p className={styles.tagline}>Explore. Express. Elevate.</p>
          <p className={styles.lead}>
            People. Ideas. Technology. A more connected tomorrow. ECCOOZS Technologies
            brings platforms, learning, media, community, and commerce together under one
            growing ecosystem — built with purpose.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#ecosystem">
              Explore the ecosystem
            </a>
            <a className={styles.secondary} href="/welcome">
              Enter ECCOOZS Social
            </a>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.orb}>
            <span className={`${styles.orbLabel} ${styles.label1}`}>Platforms</span>
            <span className={`${styles.orbLabel} ${styles.label2}`}>Learning</span>
            <span className={`${styles.orbLabel} ${styles.label3}`}>Media</span>
            <span className={`${styles.orbLabel} ${styles.label4}`}>Commerce</span>
          </div>
          <div className={styles.horizon} />
        </div>
      </section>

      <section id="ecosystem" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <small>The ECCOOZS Universe</small>
              <h2>One company. Multiple worlds.</h2>
            </div>
            <p>
              Each destination has its own identity, purpose, and experience while remaining
              part of one connected ECCOOZS Technologies family. As new projects are completed,
              this ecosystem can grow without rebuilding the corporate home.
            </p>
          </div>

          <div className={styles.grid}>
            {destinations.map((item, index) => (
              <a
                key={item.title}
                id={
                  index === 0
                    ? "platforms"
                    : index === 1
                      ? "learning"
                      : index === 2
                        ? "worlds"
                        : "commerce"
                }
                className={styles.card}
                href={item.href}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardType}>{item.type}</span>
                  <span className={styles.live}>Explore</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className={styles.cardArrow}>Enter experience →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.aboutCopy}>
          <small>About ECCOOZS Technologies</small>
          <h2>Technology with range. Identity with purpose.</h2>
          <p>
            ECCOOZS Technologies develops connected digital experiences across community,
            learning, media, and commerce. The corporate brand provides one polished front door
            while allowing every product and story world to maintain a distinct identity of its
            own.
          </p>
          <p>
            The result is a platform designed to grow deliberately: complete a project, give it
            a destination, and add it to the ECCOOZS Technologies universe.
          </p>
        </div>

        <div className={styles.pillars} aria-label="ECCOOZS Technologies focus areas">
          <div className={styles.pillar}>
            <strong>Connect</strong>
            <span>Platforms that bring people, communities, ideas, and opportunities together.</span>
          </div>
          <div className={styles.pillar}>
            <strong>Learn</strong>
            <span>Purposeful digital learning experiences built for clarity, growth, and discovery.</span>
          </div>
          <div className={styles.pillar}>
            <strong>Experience</strong>
            <span>Original media, stories, and worlds with their own identity and creative direction.</span>
          </div>
          <div className={styles.pillar}>
            <strong>Build</strong>
            <span>Commerce and business experiences designed to support long-term brand expansion.</span>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <img src="/eccoozs-wordmark-blue-v2-640.png" alt="ECCOOZS" />
          <span>Technologies</span>
        </div>

        <div className={styles.footerLinks}>
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/conduct">Conduct</a>
          <a href="/support">Support</a>
          <a href="/welcome">ECCOOZS Social</a>
        </div>

        <span>Explore. Express. Elevate.</span>
      </footer>
    </main>
  );
}
