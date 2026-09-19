import Link from "next/link";
import styles from "./reconstruction.module.css";

const pages = [
  { href: "/history/reconstruction/freedom-was-not-the-finish-line", year: "1865", title: "Freedom Was Not the Finish Line", text: "The legal end of slavery and the questions freedom immediately raised." },
  { href: "/history/reconstruction/who-was-a-citizen", year: "1866–1868", title: "Who Was a Citizen?", text: "The Civil Rights Act of 1866 and the constitutional definition of citizenship." },
  { href: "/history/reconstruction/who-could-vote", year: "1869–1870", title: "Who Could Vote?", text: "What the Fifteenth Amendment prohibited—and why citizenship and voting were different questions." },
  { href: "/history/reconstruction/black-americans-enter-government", year: "1870–1872", title: "Black Americans Enter Government", text: "Black political participation from local offices and statehouses to the United States Congress." },
  { href: "/history/reconstruction/a-right-on-paper-needed-enforcement", year: "1870–1871", title: "A Right on Paper Needed Enforcement", text: "The Enforcement Acts and the federal response to organized political intimidation and violence." },
];

export default function ReconstructionIndex() {
  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <Link className={styles.brand} href="/history"><span>ECCOOZS</span><strong>HISTORY</strong></Link>
        <div className={styles.motto}>EDUCATE · PRESERVE · REVEAL · RESTORE</div>
      </header>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Educational Collection · First Build</div>
        <h1>Reconstruction</h1>
        <p>For now, this collection stops in 1871. Each page answers one question and leaves later Reconstruction topics for future additions.</p>
      </section>
      <div className={styles.rule} />
      <section className={styles.content}>
        <div className={styles.indexGrid}>
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className={styles.indexCard}>
              <span>{page.year}</span>
              <h2>{page.title}</h2>
              <p>{page.text}</p>
            </Link>
          ))}
          <div className={`${styles.indexCard} ${styles.stop}`}>
            <span>Stopping Point</span>
            <h2>1871</h2>
            <p>We stop here for this build. Later pages can resume the story without crowding the foundation we have created.</p>
          </div>
        </div>
      </section>
      <footer className={styles.footer}><div>ECCOOZS HISTORY</div><strong>KNOW THE HISTORY. HONOR THE TRUTH. KEEP GOING.</strong></footer>
    </main>
  );
}
