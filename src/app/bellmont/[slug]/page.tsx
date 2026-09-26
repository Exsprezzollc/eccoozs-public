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
    <main className="bellmont-static-shell bellmont-static-shell-wide">
      <div className="bellmont-static-meta bellmont-static-meta-wide">
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

      <div className="bellmont-static-frame bellmont-static-frame-wide">
        {page.image ? (
          <div className="bellmont-static-art-wrap">
            <img
              src={page.image}
              alt={page.alt}
              className="bellmont-static-art bellmont-static-image"
            />
            {slug === "student-organizations" ? (
              <img
                src="/bellmont/club-sports-special-interest.webp"
                alt="Bellmont students connecting through club sports and special-interest organizations"
                className="club-sports-overlay"
              />
            ) : null}
          </div>
        ) : (
          <section className="bellmont-art-pending" aria-label={page.alt}>
            <img src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" />
            <h2>{page.title}</h2>
            <p>{page.caption}</p>
            <span>Full Bellmont page artwork coming soon.</span>
          </section>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .bellmont-static-shell-wide {
              padding-left: 2.5vw;
              padding-right: 2.5vw;
            }

            .bellmont-static-meta-wide,
            .bellmont-static-frame-wide {
              max-width: 1440px;
            }

            .bellmont-static-art-wrap {
              position: relative;
              width: min(94vw, 1280px);
              max-width: 100%;
              line-height: 0;
            }

            .bellmont-static-frame-wide .bellmont-static-art {
              display: block;
              width: 100%;
              max-width: 100%;
              height: auto;
            }

            .bellmont-static-image {
              object-fit: contain;
            }

            .club-sports-overlay {
              position: absolute;
              left: 33.79%;
              top: 71.88%;
              width: 32.32%;
              height: 9.70%;
              display: block;
              object-fit: cover;
              object-position: center;
            }

            .bellmont-art-pending {
              width: min(94vw, 1280px);
              min-height: 62vh;
              display: grid;
              place-items: center;
              align-content: center;
              gap: 12px;
              padding: 48px 24px;
              text-align: center;
              color: #fff;
              background: linear-gradient(145deg, #061c3b, #0b2a55);
              box-shadow: 0 24px 70px rgba(4, 19, 41, .28);
            }

            .bellmont-art-pending img {
              width: 56px;
              height: auto;
              margin-bottom: 6px;
            }

            .bellmont-art-pending h2 {
              margin: 0;
              font-family: Georgia, "Times New Roman", serif;
              font-size: clamp(30px, 4vw, 54px);
              font-weight: 500;
            }

            .bellmont-art-pending p {
              margin: 0;
              font-family: Georgia, "Times New Roman", serif;
              font-style: italic;
              color: rgba(255,255,255,.8);
            }

            .bellmont-art-pending span {
              margin-top: 12px;
              font-size: 12px;
              letter-spacing: .08em;
              text-transform: uppercase;
              color: rgba(255,255,255,.58);
            }

            @media (max-width: 820px) {
              .bellmont-static-shell-wide {
                padding-left: 10px;
                padding-right: 10px;
              }

              .bellmont-static-art-wrap,
              .bellmont-art-pending {
                width: 100%;
              }
            }
          `
        }}
      />
    </main>
  );
}
