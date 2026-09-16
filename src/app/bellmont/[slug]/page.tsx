import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bellmontPages } from "../pages";

export function generateStaticParams() {
  return Object.keys(bellmontPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = bellmontPages[slug];

  if (!page) return {};

  return {
    title: `${page.title} | Bellmont State University`,
    description: page.caption
  };
}

export default async function BellmontShowcasePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = bellmontPages[slug];

  if (!page) notFound();

  return (
    <main className="bellmont-static-shell">
      <div className="bellmont-static-meta">
        <a href="/bellmont">← Back to Bellmont</a>

        <div>
          <h1>{page.title}</h1>
          <p>{page.caption}</p>
        </div>

        <a
          href="https://www.youtube.com/@Eccoozs"
          target="_blank"
          rel="noreferrer"
        >
          ECCOOZS YouTube ↗
        </a>
      </div>

      <div className="bellmont-static-frame">
        <img
          src={page.image}
          alt={page.alt}
          className="bellmont-static-art"
        />
      </div>
    </main>
  );
}
