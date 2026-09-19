import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { historyPages } from "../historyPages";
import styles from "../history.module.css";

const sectionMeta = {
  people: {
    kicker: "People",
    title: "Lives worth knowing.",
    summary:
      "Profiles of builders, thinkers, veterans, organizers, families, and everyday people whose lives belong in the record."
  },
  innovation: {
    kicker: "Ideas & Innovation",
    title: "The work behind progress.",
    summary:
      "Invention, engineering, research, enterprise, craftsmanship, and the ideas that changed how people lived and worked."
  },
  service: {
    kicker: "Service & Sacrifice",
    title: "Duty across generations.",
    summary:
      "Military service, public service, family sacrifice, civic duty, and the stories of those who answered a call larger than themselves."
  },
  events: {
    kicker: "Culture & Community",
    title: "What people built together.",
    summary:
      "Events, movements, faith, art, education, neighborhoods, institutions, traditions, and the communities that carried memory forward."
  },
  indigenous: {
    kicker: "Indigenous",
    title: "Identity. Record. Continuity. Survival.",
    summary:
      "Foundational lessons, archival evidence, historical classification, identity in the record, and the documentary context needed before later tribal studies."
  }
} as const;

type SectionKey = keyof typeof sectionMeta;

export function generateStaticParams() {
  return Object.keys(sectionMeta).map((section) => ({ section }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const meta = sectionMeta[section as SectionKey];
  if (!meta) return {};

  return {
    title: `${meta.kicker} | ECCOOZS History & Legacy`,
    description: meta.summary
  };
}

export default async function HistorySectionPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const meta = sectionMeta[section as SectionKey];
  const pages = historyPages.filter((page) => page.section === section);

  if (!meta || pages.length === 0) notFound();

  return (
    <main className={styles.page}>
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
          <a href="/history">Home</a>
          <a href="/history#timeline">Timeline</a>
          <a href="/history/people">People</a>
          <a href="/history/innovation">Ideas &amp; Innovation</a>
          <a href="/history/service">Service &amp; Sacrifice</a>
          <a href="/history/events">Culture &amp; Community</a>
          <a href="/history#collections">Collections</a>
          <a href="/history#digital-archive">Archive</a>
        </nav>

        <a className={styles.exploreButton} href="/history#search-history">Search</a>
      </header>

      <section className={styles.exhibitIntro}>
        <a className={styles.exhibitBack} href="/history">← Back to History &amp; Legacy</a>
        <p className={styles.sectionKicker}>{meta.kicker}</p>
        <h1>{meta.title}</h1>
        <p className={styles.exhibitSummary}>{meta.summary}</p>
      </section>

      <section className={styles.sectionShelf} aria-label={`${meta.kicker} history pages`}>
        <div className={styles.sectionGrid}>
          {pages.map((page) => (
            <a
              className={styles.sectionCard}
              href={`/history/${page.section}/${page.slug}`}
              key={`${page.section}-${page.slug}`}
            >
              <div className={styles.sectionCardImage}>
                <img src={page.image} alt={page.alt} />
              </div>
              <div className={styles.sectionCardBody}>
                <span>{page.category}</span>
                <h2>{page.title}</h2>
                <p>{page.subtitle}</p>
                <b>Open Exhibit →</b>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/">ECCOOZS TECHNOLOGIES</a>
        <span className={styles.footerLine} />
        <em>Read the record. Then read the rules that created the record.</em>
        <span className={styles.footerLine} />
        <a href="/history">HISTORY &amp; LEGACY</a>
      </footer>
    </main>
  );
}
