export const metadata = {
  title: "Bellmont State University — A Higher Story | ECCOOZS",
  description:
    "Step into Bellmont State University, an original campus world from ECCOOZS."
};

export default function BellmontHomePage() {
  return (
    <main className="bellmont-home-static" aria-label="Bellmont State University">
      <img
        src="/bellmont/bellmont-home.webp"
        alt="Bellmont State University — A Higher Story"
        className="bellmont-home-art"
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .bellmont-site:has(.bellmont-home-static) .bellmont-topbar,
            .bellmont-site:has(.bellmont-home-static) .bellmont-footer {
              display: none !important;
            }

            .bellmont-site:has(.bellmont-home-static) {
              background: #061c3b;
              min-height: 100vh;
            }

            .bellmont-home-static {
              width: 100%;
              margin: 0;
              padding: 0;
              background: #061c3b;
              overflow-x: hidden;
            }

            .bellmont-home-art {
              display: block;
              width: 100%;
              height: auto;
              margin: 0 auto;
            }

            @media (min-width: 1600px) {
              .bellmont-home-static {
                display: flex;
                justify-content: center;
              }

              .bellmont-home-art {
                width: min(94vw, 1536px);
              }
            }

            @media (max-width: 900px) {
              .bellmont-home-art {
                width: 100%;
                min-width: 0;
              }
            }
          `
        }}
      />
    </main>
  );
}
