import type { Metadata } from "next";
import Link from "next/link";
import styles from "./press.module.css";

export const metadata: Metadata = {
  title: "ECCOOZS Press & Media | Company Facts, Brand Description & Contact",
  description:
    "Press and media information for ECCOOZS Technologies LLC and ECCOOZS Social, including company facts, product positioning, approved brand description, and media contact.",
  alternates: { canonical: "https://eccoozs.com/press" },
  openGraph: {
    title: "ECCOOZS Press & Media",
    description:
      "Company facts, product positioning, approved brand description, and media contact for ECCOOZS Technologies LLC and ECCOOZS Social.",
    url: "https://eccoozs.com/press",
    siteName: "ECCOOZS",
    type: "website",
  },
};

export default function PressPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://eccoozs.com/press#page",
    url: "https://eccoozs.com/press",
    name: "ECCOOZS Press & Media",
    about: [
      { "@id": "https://eccoozs.com/#organization" },
      { "@id": "https://eccoozs.com/welcome#social" },
    ],
    isPartOf: { "@id": "https://eccoozs.com/#website" },
    inLanguage: "en-US",
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <img src="/eccoozs-wordmark-blue-v2-640.png" alt="ECCOOZS" />
        </Link>
        <nav className={styles.nav} aria-label="Press page navigation">
          <Link href="/welcome">ECCOOZS Social</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/house-of-eccoozs">House of ECCOOZS</Link>
          <Link href="/">ECCOOZS Technologies</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>PRESS &amp; MEDIA</p>
        <h1>ECCOOZS at a glance.</h1>
        <p>
          A reference page for journalists, editors, podcast hosts, researchers, partners,
          and organizations covering ECCOOZS Technologies and ECCOOZS Social.
        </p>
      </section>

      <div className={styles.main}>
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>Approved brand description</h2>
            <p className={styles.quote}>
              ECCOOZS is a Foundational Black American-centered, community-first general social network
              built for conversation, discovery, culture, business discovery, creator
              opportunity, and live audio through Soundrooms.
            </p>

            <h3>What makes ECCOOZS different</h3>
            <p>
              ECCOOZS is designed as a general social network rather than a creator-only
              marketplace or a single-purpose community product. Social interaction comes
              first, while business discovery and creator opportunity are built into the
              broader community experience.
            </p>

            <h3>Community approach</h3>
            <p>
              ECCOOZS has a clear Black American cultural center while welcoming respectful
              participation from people of different backgrounds. The platform is designed
              around standards, conversation, discovery, and community without making chaos
              the primary engine for attention.
            </p>
          </section>

          <aside className={styles.card}>
            <h2>Company facts</h2>
            <div className={styles.fact}><strong>Company</strong><span>ECCOOZS Technologies LLC</span></div>
            <div className={styles.fact}><strong>Flagship product</strong><span>ECCOOZS Social</span></div>
            <div className={styles.fact}><strong>Category</strong><span>Social networking / online community</span></div>
            <div className={styles.fact}><strong>Headquarters</strong><span>Michigan, United States</span></div>
            <div className={styles.fact}><strong>Audience</strong><span>Adults 18+ at launch</span></div>
            <div className={styles.fact}><strong>Core areas</strong><span>Community, conversation, discovery, business, creators, culture, live audio</span></div>
            <div className={styles.fact}><strong>Live audio</strong><span>Soundrooms</span></div>
            <div className={styles.fact}><strong>Business discovery</strong><span>ECCOOZS Business Directory and Highlights</span></div>
          </aside>
        </div>

        <section className={styles.contact}>
          <p className={styles.eyebrow}>MEDIA CONTACT</p>
          <h2>Covering ECCOOZS?</h2>
          <p>
            For interviews, company information, launch coverage, partnership inquiries,
            or press materials, contact the ECCOOZS team.
          </p>
          <a href="mailto:press@eccoozs.com">press@eccoozs.com</a>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>© 2026 ECCOOZS Technologies LLC.</span>
        <span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/support">Support</Link></span>
      </footer>
    </main>
  );
}