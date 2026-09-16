import type { Metadata } from "next";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "ECCOOZS History — American Legacy",
  description:
    "A growing ECCOOZS historical archive for Foundational Black American history, American legacy, innovation, service, culture, and memory."
};

const collections = [
  {
    title: "Foundational Black American History",
    copy: "People, families, communities, institutions, work, struggle, achievement, and the long American story carried across generations.",
    image: "/welcome-images/landing-10.png"
  },
  {
    title: "Inventors & Innovators",
    copy: "Scientists, engineers, builders, researchers, and pioneers whose ideas helped shape modern American life.",
    image: "/welcome-images/landing-16-v3.png"
  },
  {
    title: "Leadership & Civil Rights",
    copy: "Movements, organizers, thinkers, institutions, and public figures who shaped debates over citizenship, dignity, and equal treatment.",
    image: "/welcome-images/landing-14.png"
  },
  {
    title: "Military Service & Sacrifice",
    copy: "Stories of service, courage, family, and duty across generations of American military history.",
    image: "/welcome-images/landing-15.png"
  },
  {
    title: "Indigenous Heritage",
    copy: "Historical records, photographs, communities, nations, cultural continuity, and the connections that form part of the American story.",
    image: "/welcome-images/landing-11.png"
  },
  {
    title: "Research, Documents & Archives",
    copy: "A future home for timelines, primary documents, archival photographs, profiles, citations, and deeper historical collections.",
    image: "/welcome-images/landing-13.png"
  }
];

export default function HistoryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="ECCOOZS Technologies home">
          <object
            className={styles.logo}
            data="/brand/eccoozs-technologies-wordmark.png"
            type="image/png"
            aria-label="ECCOOZS"
          >
            <img src="/eccoozs-wordmark-blue-v2-640.png" alt="ECCOOZS" />
          </object>
          <span>HISTORY &amp; ARCHIVE</span>
        </a>
        <nav className={styles.nav} aria-label="History navigation">
          <a href="/">Technologies</a>
          <a href="/welcome">ECCOOZS Social</a>
          <a href="/learning">Learning</a>
          <a href="/bellmont">Bellmont</a>
          <a href="/house-of-eccoozs">House of Eccoozs</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>AMERICAN LEGACY</p>
          <h1>History deserves room to breathe.</h1>
          <p className={styles.lead}>
            ECCOOZS History is being built as a dedicated destination for historical memory,
            cultural context, archival discovery, and the people whose lives shaped what came next.
          </p>
          <div className={styles.heroActions}>
            <a href="#collections">Explore the collections</a>
            <a href="/welcome">Return to ECCOOZS Social</a>
          </div>
        </div>
        <div className={styles.heroImage} aria-hidden="true">
          <img src="/welcome-images/landing-16-v3.png" alt="" />
        </div>
      </section>

      <section id="collections" className={styles.collections}>
        <div className={styles.sectionHead}>
          <div>
            <small>A GROWING DIGITAL ARCHIVE</small>
            <h2>History organized for deeper exploration.</h2>
          </div>
          <p>
            This page is intentionally becoming its own destination so the historical material
            can expand without crowding the ECCOOZS Social experience.
          </p>
        </div>

        <div className={styles.grid}>
          {collections.map((item) => (
            <article className={styles.card} key={item.title}>
              <div className={styles.cardImage}><img src={item.image} alt="" /></div>
              <div className={styles.cardBody}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span>Collection expanding →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.archiveCallout}>
        <div>
          <small>WHAT COMES NEXT</small>
          <h2>Timelines. Profiles. Documents. Photographs. Sources.</h2>
          <p>
            The structure is ready for a much larger historical library. As research is completed,
            new collections can be added here without turning the Social landing page into a museum.
          </p>
        </div>
        <div className={styles.archiveList}>
          <span>Foundational Black American History</span>
          <span>American Innovation &amp; Invention</span>
          <span>Military History</span>
          <span>Indigenous Heritage</span>
          <span>Leadership &amp; Civil Rights</span>
          <span>Primary Sources &amp; Archives</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>ECCOOZS TECHNOLOGIES</span>
        <span>History &amp; Archive</span>
        <a href="/">Explore. Express. Elevate.</a>
      </footer>
    </main>
  );
}
