import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BellmontArt from "../BellmontArt";
import { bellmontPages } from "../pages";

export function generateStaticParams() {
  return Object.keys(bellmontPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = bellmontPages[slug];
  if (!page) return {};
  return { title: `${page.title} | Bellmont State University`, description: page.caption };
}

export default async function BellmontShowcasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = bellmontPages[slug];
  if (!page) notFound();

  return (
    <main className="bellmont-static-shell bellmont-static-shell-wide">
      <div className="bellmont-static-meta bellmont-static-meta-wide">
        <a href="/bellmont">← Back to Bellmont</a>
        <div>
          <h1>{page.title}</h1>
          <p>{page.caption}</p>
        </div>
        <a href="https://www.youtube.com/@Eccoozs" target="_blank" rel="noreferrer">ECCOOZS YouTube ↗</a>
      </div>

      <div className="bellmont-static-frame bellmont-static-frame-wide">
        {page.image ? (
          <img
            src={page.image}
            alt={page.alt}
            className="bellmont-static-art bellmont-static-image"
          />
        ) : typeof page.index === "number" ? (
          <BellmontArt className="bellmont-static-art" index={page.index} alt={page.alt} />
        ) : null}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bellmont-static-shell-wide { padding-left: 2.5vw; padding-right: 2.5vw; }
        .bellmont-static-meta-wide,
        .bellmont-static-frame-wide { max-width: 1440px; }
        .bellmont-static-frame-wide .bellmont-static-art {
          width: min(94vw, 1280px);
          max-width: 100%;
          height: auto;
        }
        .bellmont-static-image { object-fit: contain; }
        @media (max-width: 820px) {
          .bellmont-static-shell-wide { padding-left: 10px; padding-right: 10px; }
          .bellmont-static-frame-wide .bellmont-static-art { width: 100%; }
        }
      ` }} />
    </main>
  );
}
