import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "./posts";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "ECCOOZS Journal | Social Media, Community, Business & Culture",
  description:
    "Ideas and practical guides about social media alternatives, community, creators, business discovery, culture, and the future of online connection.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: {
    title: "ECCOOZS Journal",
    description:
      "Social media, community, business, creators, culture, and the future of online connection.",
    url: "https://eccoozs.com/blog",
    type: "website",
    images: [{ url: "/blog/facebook-alternative-guide.png", width: 1672, height: 941, alt: "ECCOOZS Journal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECCOOZS Journal",
    description: "Social media, community, business, creators, culture, and the future of online connection.",
    images: ["/blog/facebook-alternative-guide.png"],
  },
};

const socialLinks = [
  ["Instagram", process.env.NEXT_PUBLIC_ECCOOZS_INSTAGRAM],
  ["Facebook", process.env.NEXT_PUBLIC_ECCOOZS_FACEBOOK],
  ["TikTok", process.env.NEXT_PUBLIC_ECCOOZS_TIKTOK],
  ["YouTube", process.env.NEXT_PUBLIC_ECCOOZS_YOUTUBE],
  ["Threads", process.env.NEXT_PUBLIC_ECCOOZS_THREADS],
  ["X", process.env.NEXT_PUBLIC_ECCOOZS_X],
] as const;

const topicOrder = ["Social Media", "Community", "Business", "Creators", "Culture"] as const;
const topicId = (topic: string) => topic.toLowerCase().replace(/\s+/g, "-");

export default function BlogPage() {
  const visibleSocialLinks = socialLinks.filter(([, href]) => Boolean(href));
  const journalJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://eccoozs.com/blog#journal",
    url: "https://eccoozs.com/blog",
    name: "ECCOOZS Journal",
    description:
      "Ideas and practical guides about social media alternatives, community, creators, business discovery, culture, and the future of online connection.",
    publisher: { "@id": "https://eccoozs.com/#organization" },
    inLanguage: "en-US",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://eccoozs.com/blog/${post.slug}`,
      datePublished: post.published,
      dateModified: post.updated,
      image: `https://eccoozs.com${post.image}`,
    })),
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(journalJsonLd).replace(/</g, "\\u003c") }}
      />
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/welcome" aria-label="ECCOOZS Social">
          <img src="/eccoozs-wordmark-blue-v2-640.png" alt="ECCOOZS" />
        </Link>
        <nav className={styles.nav} aria-label="Journal navigation">
          <Link href="/welcome">ECCOOZS Social</Link>
          <Link href="/history">History</Link>
          <Link href="/house-of-eccoozs">House of ECCOOZS</Link>
          <Link className={styles.active} href="/blog">Journal</Link>
          <Link href="/press">Press</Link>
        </nav>
        <Link className={styles.join} href="/welcome#download">Join ECCOOZS</Link>
      </header>

      <section className={styles.hero}>
        <p className={styles.kicker}>ECCOOZS JOURNAL</p>
        <h1>Ideas for a better social web.</h1>
        <p className={styles.lede}>
          Practical guides and perspectives on social media, community, business discovery,
          creators, culture, and the future of online connection.
        </p>
      </section>

      <nav className={styles.topicNav} aria-label="Browse Journal topics">
        <span>Explore by topic</span>
        <div>
          {topicOrder.map((topic) => (
            <a href={`#${topicId(topic)}`} key={topic}>{topic}</a>
          ))}
        </div>
      </nav>

      <div className={styles.topicGroups}>
        {topicOrder.map((topic, topicIndex) => {
          const posts = blogPosts.filter((post) => post.category === topic);
          if (posts.length === 0) return null;

          return (
            <section className={styles.topicSection} id={topicId(topic)} key={topic}>
              <div className={styles.topicHeader}>
                <div>
                  <p className={styles.kicker}>TOPIC</p>
                  <h2>{topic}</h2>
                </div>
                <span>{posts.length} {posts.length === 1 ? "article" : "articles"}</span>
              </div>

              <div className={styles.grid}>
                {posts.map((post, postIndex) => {
                  const featured = topicIndex === 0 && postIndex === 0;
                  return (
                    <article className={featured ? styles.featuredCard : styles.card} key={post.slug}>
                      <Link className={styles.cardImage} href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          width={1672}
                          height={941}
                          sizes={featured ? "(max-width: 800px) 100vw, 1180px" : "(max-width: 800px) 100vw, 580px"}
                          priority={featured}
                        />
                      </Link>
                      <div className={styles.cardBody}>
                        <div className={styles.meta}>
                          <span>{post.category}</span>
                          <time dateTime={post.published}>
                            {new Date(`${post.published}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </time>
                        </div>
                        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                        <p>{post.description}</p>
                        <div className={styles.cardFooter}>
                          <span>{post.readingTime}</span>
                          <Link href={`/blog/${post.slug}`}>Read article →</Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className={styles.discovery}>
        <div><p className={styles.kicker}>DISCOVER ECCOOZS</p><h2>Community first. Opportunity built in.</h2></div>
        <p>Explore ECCOOZS Social, a Black American-centered, community-first general social network where conversation, discovery, culture, business discovery, creator opportunity, and live audio come together.</p>
        <Link href="/welcome#download">Join ECCOOZS Early Access →</Link>
      </section>

      {visibleSocialLinks.length > 0 && (
        <section className={styles.follow} aria-label="Follow ECCOOZS on social media">
          <strong>Follow ECCOOZS</strong>
          <div>{visibleSocialLinks.map(([label, href]) => <a key={label} href={href!} target="_blank" rel="noreferrer">{label}</a>)}</div>
        </section>
      )}

      <footer className={styles.footer}>
        <span>© 2026 ECCOOZS Technologies LLC.</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/conduct">Community Guidelines</Link><Link href="/support">Support</Link><Link href="/press">Press</Link></div>
      </footer>
    </main>
  );
}
