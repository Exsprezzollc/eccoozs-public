import type { Metadata } from "next";
import styles from "./CorporateHome.module.css";

export const metadata: Metadata = {
  title: "ECCOOZS Technologies — Explore. Express. Elevate.",
  description:
    "ECCOOZS Technologies builds connected platforms, learning experiences, media worlds, commerce brands, and cultural archives with purpose."
};

const destinations = [
  {
    id: "platforms",
    type: "Platform",
    title: "ECCOOZS Social",
    description:
      "The community platform at the center of the ECCOOZS ecosystem — built for connection, discovery, expression, and opportunity.",
    href: "https://eccoozs.com/welcome"
  },
  {
    id: "learning",
    type: "Learning",
    title: "ECCOOZS Learning",
    description:
      "A growing collection of thoughtful learning experiences designed to make discovery clearer, more engaging, and more useful.",
    href: "https://eccoozslearning.com/"
  },
  {
    id: "worlds",
    type: "Media & Worlds",
    title: "Bellmont State University",
    description:
      "An original ECCOOZS world built around people, purpose, possibility, campus life, story, and tradition.",
    href: "https://eccoozs.com/bellmont"
  },
  {
    id: "commerce",
    type: "Commerce",
    title: "House of Eccoozs",
    description:
      "Premium lifestyle, considered design, and high standards — the commerce and lifestyle expression of the ECCOOZS brand.",
    href: "https://eccoozs.com/house-of-eccoozs"
  },
  {
    id: "history",
    type: "History & Archive",
    title: "ECCOOZS History",
    description:
      "A growing home for Foundational Black American history, American legacy, innovation, service, culture, and archival discovery.",
    href: "https://eccoozs.com/history"
  }
];

function PrestigeWordmark({ className }: { className: string }) {
  return (
    <object
      className={className}
      data="/brand/eccoozs-technologies-wordmark.png"
      type="image/png"
      aria-label="ECCOOZS"
    >
      <img src="/eccoozs-wordmark-blue-v2-640.png" alt="ECCOOZS" />
    </object>
  );
}

export default function HomePage() {
  return (
    <main id="top" className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="ECCOOZS Technologies home">
          <PrestigeWordmark className={styles.brandWordmark} />
          <small>TECHNOLOGIES</small>
        </a>

        <nav className={styles.nav} aria-label="ECCOOZS Technologies navigation">
          <a href="#platforms">Platforms</a>
          <a href="#learning">Learning</a>
          <a href="#worlds">Media</a>
          <a href="#commerce">Commerce</a>
          <a href="https://eccoozs.com/welcome">Community</a>
          <a href="#history">History</a>
          <a href="#about">About</a>
        </nav>

        <a className={styles.join} href="https://eccoozs.com/welcome">
          Join ECCOOZS
        </a>
      </header>

      <section className={styles.hero} aria-labelledby="eccoozs-tech-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ECCOOZS TECHNOLOGIES</p>
          <h1 id="eccoozs-tech-title">Explore. Express. Elevate.</h1>
          <p className={styles.lead}>
            People. Ideas. Technology. A more connected tomorrow. ECCOOZS Technologies
            brings platforms, learning, media, community, commerce, and culture together
            under one growing ecosystem — built with purpose.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#ecosystem">Explore the ecosystem →</a>
            <a className={styles.secondary} href="https://eccoozs.com/welcome">Enter ECCOOZS Social</a>
          </div>
          <div className={styles.heroStats} aria-label="ECCOOZS Technologies overview">
            <span><strong>5</strong><small>DESTINATIONS</small></span>
            <span><strong>1</strong><small>ECOSYSTEM</small></span>
            <span><strong>∞</strong><small>POSSIBILITIES</small></span>
          </div>
        </div>

        <div className={styles.heroBrandStage}>
          <PrestigeWordmark className={styles.heroWordmark} />
          <div className={styles.technologies}>TECHNOLOGIES</div>
          <div className={styles.stageTagline}>Explore. Express. Elevate.</div>
        </div>

        <div className={styles.futureLine} aria-hidden="true">
          <span>A BRIGHTER</span><span>TOMORROW</span><span>THROUGH</span><span>PEOPLE,</span><span>IDEAS,</span><span>AND</span><span>TECHNOLOGY.</span>
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
              the ecosystem can grow without rebuilding the corporate home.
            </p>
          </div>

          <div className={styles.grid}>
            {destinations.map((item) => (
              <a key={item.title} id={item.id} className={styles.card} href={item.href}>
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
            learning, media, commerce, and cultural discovery. The corporate brand provides
            one polished front door while allowing every product and story world to maintain
            a distinct identity of its own.
          </p>
          <p>
            Complete a project, give it a destination, and add it to the ECCOOZS Technologies
            universe. The architecture is designed to expand deliberately over time.
          </p>
        </div>

        <div className={styles.pillars} aria-label="ECCOOZS Technologies focus areas">
          <div className={styles.pillar}><strong>Connect</strong><span>Platforms that bring people, communities, ideas, and opportunities together.</span></div>
          <div className={styles.pillar}><strong>Learn</strong><span>Purposeful digital learning experiences built for clarity, growth, and discovery.</span></div>
          <div className={styles.pillar}><strong>Experience</strong><span>Original media, stories, worlds, and cultural destinations with distinct identities.</span></div>
          <div className={styles.pillar}><strong>Build</strong><span>Commerce and business experiences designed to support long-term brand expansion.</span></div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <PrestigeWordmark className={styles.footerWordmark} />
          <span>Technologies</span>
        </div>
        <div className={styles.footerLinks}>
          <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/conduct">Conduct</a><a href="/support">Support</a><a href="https://eccoozs.com/welcome">ECCOOZS Social</a><a href="https://eccoozs.com/history">History</a>
        </div>
        <span>Explore. Express. Elevate.</span>
      </footer>
    </main>
  );
}
