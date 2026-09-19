import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHistoryPage, historyPages } from "../../historyPages";
import styles from "../../history.module.css";

export function generateStaticParams() {
  return historyPages.map((page) => ({
    section: page.section,
    slug: page.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const page = getHistoryPage(section, slug);

  if (!page) return {};

  return {
    title: `${page.title} | ECCOOZS History & Legacy`,
    description: page.summary
  };
}

export default async function HistoryExhibitPage({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const page = getHistoryPage(section, slug);

  if (!page) notFound();

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
          <a href="/history#people">People</a>
          <a href="/history#ideas">Ideas &amp; Innovation</a>
          <a href="/history#service">Service &amp; Sacrifice</a>
          <a href="/history#culture">Culture &amp; Community</a>
          <a href="/history#collections">Collections</a>
          <a href="/history#digital-archive">Archive</a>
        </nav>

        <a className={styles.exploreButton} href="/history#search-history">Search</a>
      </header>

      <section className={styles.exhibitIntro}>
        <a className={styles.exhibitBack} href="/history">← Back to History &amp; Legacy</a>
        <p className={styles.sectionKicker}>{page.category}</p>
        <h1>{page.title}</h1>
        <p className={styles.exhibitSubtitle}>{page.subtitle}</p>
        <p className={styles.exhibitSummary}>{page.summary}</p>
      </section>

      <section className={styles.exhibitFrame} aria-label={page.alt}>
        <img
          className={styles.exhibitArtwork}
          src={page.image}
          alt={page.alt}
        />
      </section>

      <aside className={styles.exhibitNote}>
        <strong>ECCOOZS History editorial note</strong>
        <p>
          The exhibit artwork is part of the History presentation. Navigation and search remain
          live website controls outside the static artwork so every link on the page is functional.
        </p>
      </aside>

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
