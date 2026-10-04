import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../posts";
import styles from "./article.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `https://eccoozs.com/blog/${post.slug}`;
  return {
    title: `${post.title} | ECCOOZS Journal`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.description, url, type: "article", publishedTime: post.published, modifiedTime: post.updated },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const url = `https://eccoozs.com/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "ECCOOZS" },
    publisher: { "@type": "Organization", name: "ECCOOZS Technologies LLC", url: "https://eccoozs.com" },
    keywords: post.keywords.join(", "),
  };
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className={styles.header}><Link href="/blog">← ECCOOZS Journal</Link><Link href="/welcome">ECCOOZS Social</Link></header>
      <article className={styles.article}>
        <div className={styles.meta}><span>{post.category}</span><time dateTime={post.published}>{new Date(`${post.published}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time><span>{post.readingTime}</span></div>
        <h1>{post.title}</h1>
        <p className={styles.intro}>{post.intro}</p>
        {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((p) => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
        <aside className={styles.cta}><span>ECCOOZS SOCIAL</span><h2>Looking for a different kind of social experience?</h2><p>Explore ECCOOZS and join a community built around conversation, discovery, culture, community, and opportunity.</p><Link href="/welcome">Explore ECCOOZS Social →</Link></aside>
      </article>
      <footer className={styles.footer}><Link href="/blog">More from the ECCOOZS Journal</Link><Link href="/welcome#download">Join ECCOOZS</Link></footer>
    </main>
  );
}
