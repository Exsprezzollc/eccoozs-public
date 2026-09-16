import type { Metadata } from "next";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "ECCOOZS History & Legacy",
  description:
    "ECCOOZS History & Legacy is a growing digital archive for historical memory, Foundational Black American history, service, innovation, culture, collections, and primary records."
};

const timeline = [
  {
    title: "Foundations",
    period: "Before 1600",
    image: "/history/history-foundations-mounds-and-willows.png"
  },
  {
    title: "Resistance & Survival",
    period: "1600–1865",
    image: "/history/history-foundational-black-american-history.png"
  },
  {
    title: "Rebuilding & Rising",
    period: "1865–1900",
    image: "/history/history-leadership-and-culture.png"
  },
  {
    title: "Ideas & Industry",
    period: "1900–1950",
    image: "/history/history-ideas-and-innovation.png"
  },
  {
    title: "Rights & Opportunity",
    period: "1950–2000",
    image: "/history/history-leadership-and-culture.png"
  },
  {
    title: "A Brighter Tomorrow",
    period: "2000–Present",
    image: "/history/history-innovation-and-industry.png"
  }
];

const stories = [
  {
    id: "people",
    kicker: "People",
    title: "Lives worth knowing.",
    copy: "Profiles of builders, thinkers, veterans, organizers, families, and everyday people whose lives belong in the record.",
    image: "/history/history-lives-worth-knowing.png"
  },
  {
    id: "ideas",
    kicker: "Ideas & Innovation",
    title: "The work behind progress.",
    copy: "Invention, engineering, research, enterprise, craftsmanship, and the ideas that changed how people lived and worked.",
    image: "/history/history-ideas-and-innovation.png"
  },
  {
    id: "service",
    kicker: "Service & Sacrifice",
    title: "Duty across generations.",
    copy: "Military service, public service, family sacrifice, civic duty, and the stories of those who answered a call larger than themselves.",
    image: "/history/history-duty-across-generations.png"
  },
  {
    id: "culture",
    kicker: "Culture & Community",
    title: "What people built together.",
    copy: "Faith, art, music, education, neighborhoods, institutions, traditions, and the communities that carried memory forward.",
    image: "/history/history-leadership-and-culture.png"
  },
  {
    id: "collections",
    kicker: "Collections",
    title: "History with room to go deeper.",
    copy: "Curated subject collections that gather people, photographs, records, and context into focused historical experiences.",
    image: "/history/history-foundational-black-american-history.png"
  },
  {
    id: "archive",
    kicker: "Archive",
    title: "The record itself.",
    copy: "Photographs, documents, maps, letters, patents, oral histories, citations, and other primary materials preserved for deeper study.",
    image: "/history/history-archives-and-records.png"
  }
];

export default function HistoryPage() {
  return (
    <main id="top" className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="ECCOOZS Technologies home">
          <img
            className={styles.logo}
            src="/brand/eccoozs-technologies-wordmark.png"
            alt="ECCOOZS Technologies"
          />
          <span>HISTORY &amp; LEGACY</span>
        </a>

        <nav className={styles.nav} aria-label="ECCOOZS History and Legacy navigation">
          <a className={styles.active} href="#top">Home</a>
          <a href="#timeline">Timeline</a>
          <a href="#people">People</a>
          <a href="#ideas">Ideas &amp; Innovation</a>
          <a href="#service">Service &amp; Sacrifice</a>
          <a href="#culture">Culture &amp; Community</a>
          <a href="#collections">Collections</a>
          <a href="#archive">Archive</a>
        </nav>

        <a className={styles.exploreButton} href="#collections">Explore</a>
      </header>

      <section
        className={styles.hero}
        aria-labelledby="history-title"
        style={{ display: "block", minHeight: 0, background: "#020711", overflow: "hidden", position: "relative" }}
      >
        <h1
          id="history-title"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0
          }}
        >
          ECCOOZS History &amp; Legacy
        </h1>
        <img
          src="/history/history-hero-banner.png"
          alt="ECCOOZS History & Legacy — The record. The people. The inheritance."
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </section>

      <section id="collections" className={styles.featured}>
        <div className={styles.featureCopy}>
          <p className={styles.sectionKicker}>FEATURED COLLECTION</p>
          <h2>Foundational<br/>Black American History</h2>
          <p>
            A deeper destination for the people, families, service, work, institutions,
            achievement, sacrifice, and contributions carried across generations of the American story.
          </p>
          <a className={styles.outlineButton} href="#archive">Explore This Collection <b>→</b></a>
        </div>
        <div className={styles.featureImage}>
          <img
            src="/history/history-foundational-black-american-history.png"
            alt="Black American military service members represented in a historical tribute scene"
          />
        </div>
        <blockquote className={styles.featureQuote}>
          <span>“</span>
          To know where we come from is to see further than we’ve ever seen.
        </blockquote>
      </section>

      <section id="timeline" className={styles.timelineSection}>
        <div className={styles.sectionTitleRow}>
          <div>
            <p className={styles.sectionKicker}>EXPLORE BY ERA</p>
            <h2>A timeline designed for discovery.</h2>
          </div>
          <a href="#archive">See the full archive →</a>
        </div>

        <div className={styles.timelineGrid}>
          {timeline.map((item, index) => (
            <article className={styles.timelineCard} key={item.title}>
              <div className={styles.timelineImage}>
                <img src={item.image} alt="" />
              </div>
              <div className={styles.timelineBody}>
                <strong>{item.title}</strong>
                <span>{item.period}</span>
              </div>
              <i aria-hidden="true" className={index === timeline.length - 1 ? styles.lastDot : ""} />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.storiesSection} aria-labelledby="stories-title">
        <div className={styles.sectionTitleRow}>
          <div>
            <p className={styles.sectionKicker}>EXPLORE OUR STORIES</p>
            <h2 id="stories-title">People. Ideas. Service. Culture.</h2>
          </div>
          <p className={styles.sectionIntro}>
            Explore history through the lives, work, service, institutions, and records that make the larger story visible.
          </p>
        </div>

        <div className={styles.storyGrid}>
          {stories.map((story) => (
            <article id={story.id} className={styles.storyCard} key={story.id}>
              <div className={styles.storyImage}><img src={story.image} alt="" /></div>
              <div className={styles.storyOverlay} />
              <div className={styles.storyBody}>
                <span>{story.kicker}</span>
                <h3>{story.title}</h3>
                <p>{story.copy}</p>
                <a href={story.id === "archive" ? "#digital-archive" : `#${story.id}`}>Explore →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.collectionStrip} aria-label="Featured historical collections">
        <article>
          <img src="/history/history-foundations-mounds-and-willows.png" alt="Earthen mounds near water beneath willow trees at dawn" />
          <div>
            <span>FOUNDATIONS</span>
            <h3>Landscape, memory, and the questions that invite investigation.</h3>
          </div>
        </article>
        <article>
          <img src="/history/history-indigenous-heritage.png" alt="Historical Indigenous community portrait" />
          <div>
            <span>COLLECTION</span>
            <h3>Indigenous Heritage</h3>
          </div>
        </article>
        <article>
          <img src="/history/history-duty-across-generations.png" alt="Black American military service members pictured together" />
          <div>
            <span>COLLECTION</span>
            <h3>Military &amp; Service</h3>
          </div>
        </article>
      </section>

      <section id="digital-archive" className={styles.archiveFeature}>
        <div className={styles.archiveImage}>
          <img src="/history/history-archives-and-records.png" alt="Historical records, maps, photographs, books, and research materials in an archive" />
        </div>
        <div className={styles.archiveCopy}>
          <p className={styles.sectionKicker}>THE DIGITAL ARCHIVE</p>
          <h2>More Than History.<br/>A Living Record.</h2>
          <p>
            Explore photographs, documents, maps, letters, patents, oral histories, and citations.
            As the archive grows, every collection can lead back to the records that support the story.
          </p>
          <a className={styles.goldButton} href="#archive">Explore the Archive <b>→</b></a>
        </div>
        <div className={styles.archiveWords} aria-label="Archive values">
          <span>Preserve</span><span>Educate</span><span>Honor</span><span>Inspire</span><span>Build</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/">ECCOOZS TECHNOLOGIES</a>
        <span className={styles.footerLine} />
        <em>The past is not behind us. It lives in us.</em>
        <span className={styles.footerLine} />
        <span>EXPLORE. EXPRESS. ELEVATE.</span>
      </footer>
    </main>
  );
}
