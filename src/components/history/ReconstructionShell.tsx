import Link from "next/link";
import styles from "../../app/history/reconstruction/reconstruction.module.css";

export type Source = { label: string; href: string };
export type NavLink = { href: string; label: string };

export function ReconstructionShell({
  eyebrow,
  title,
  dek,
  year,
  children,
  sources,
  previous,
  next,
}: {
  eyebrow: string;
  title: string;
  dek: string;
  year?: string;
  children: React.ReactNode;
  sources: Source[];
  previous?: NavLink;
  next?: NavLink;
}) {
  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <Link className={styles.brand} href="/history/reconstruction">
          <span>ECCOOZS</span>
          <strong>HISTORY</strong>
        </Link>
        <div className={styles.motto}>EDUCATE · PRESERVE · REVEAL · RESTORE</div>
      </header>

      <section className={styles.hero}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        {year ? <div className={styles.year}>{year}</div> : null}
        <h1>{title}</h1>
        <p>{dek}</p>
      </section>

      <div className={styles.rule} />

      <article className={styles.content}>{children}</article>

      <section className={styles.sources} aria-label="Sources">
        <h2>Sources & Records</h2>
        <div className={styles.sourceGrid}>
          {sources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          ))}
        </div>
      </section>

      <nav className={styles.pageNav} aria-label="Reconstruction series navigation">
        {previous ? (
          <Link href={previous.href} className={styles.navCard}>
            <span>Previous</span>
            <strong>{previous.label}</strong>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={next.href} className={`${styles.navCard} ${styles.navCardNext}`}>
            <span>Next</span>
            <strong>{next.label}</strong>
          </Link>
        ) : (
          <div className={`${styles.navCard} ${styles.holdCard}`}>
            <span>Stopping Point</span>
            <strong>Reconstruction series continues later.</strong>
          </div>
        )}
      </nav>

      <footer className={styles.footer}>
        <div>ECCOOZS HISTORY</div>
        <strong>KNOW THE HISTORY. HONOR THE TRUTH. KEEP GOING.</strong>
      </footer>
    </main>
  );
}

export function Section({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      {kicker ? <div className={styles.kicker}>{kicker}</div> : null}
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function Parchment({ children }: { children: React.ReactNode }) {
  return <div className={styles.parchment}>{children}</div>;
}

export function BigStatement({ children }: { children: React.ReactNode }) {
  return <div className={styles.bigStatement}>{children}</div>;
}

export function WordGrid({ words }: { words: string[] }) {
  return (
    <div className={styles.wordGrid}>
      {words.map((word) => <div key={word}>{word}</div>)}
    </div>
  );
}

export function Timeline({ items }: { items: { year: string; text: string }[] }) {
  return (
    <div className={styles.timeline}>
      {items.map((item) => (
        <div className={styles.timelineItem} key={`${item.year}-${item.text}`}>
          <strong>{item.year}</strong>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
