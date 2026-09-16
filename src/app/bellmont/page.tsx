export const metadata = {
  title: "Bellmont State University — A Higher Story | ECCOOZS",
  description: "Step into Bellmont State University, an original campus world from ECCOOZS."
};

export default function BellmontHomePage() {
  return (
    <main className="bellmont-home-static" aria-label="Bellmont State University">
      <nav className="bellmont-home-nav" aria-label="Bellmont homepage navigation">
        <a className="bellmont-home-nav-back" href="/welcome">← ECCOOZS</a>
        <a href="/bellmont/explore">Explore</a>
        <a href="/bellmont/campus-life">Campus Life</a>
        <a href="/bellmont/traditions">Traditions</a>
      </nav>

      <img
        src="/bellmont/bellmont-home.png"
        alt="Bellmont State University — A Higher Story"
        className="bellmont-home-art"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .bellmont-site:has(.bellmont-home-static) .bellmont-topbar,
        .bellmont-site:has(.bellmont-home-static) .bellmont-footer {
          display: none !important;
        }

        .bellmont-site:has(.bellmont-home-static) {
          background: #061c3b;
          min-height: 100vh;
        }

        .bellmont-home-static {
          position: relative;
          width: 100%;
          margin: 0;
          padding: 0;
          background: #061c3b;
          overflow-x: hidden;
        }

        .bellmont-home-nav {
          position: fixed;
          top: 16px;
          right: 18px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 999px;
          background: rgba(4,21,47,.88);
          box-shadow: 0 10px 30px rgba(0,0,0,.24);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .bellmont-home-nav a {
          display: inline-flex;
          align-items: center;
          min-height: 36px;
          padding: 0 13px;
          border-radius: 999px;
          color: rgba(255,255,255,.9);
          text-decoration: none;
          font: 700 11px/1 Arial, Helvetica, sans-serif;
          letter-spacing: .02em;
          white-space: nowrap;
          transition: background .18s ease, color .18s ease;
        }

        .bellmont-home-nav a:hover {
          background: rgba(255,255,255,.1);
          color: #fff;
        }

        .bellmont-home-nav .bellmont-home-nav-back {
          background: #fff;
          color: #061c3b;
        }

        .bellmont-home-nav .bellmont-home-nav-back:hover {
          background: #f5efe3;
          color: #061c3b;
        }

        .bellmont-home-art {
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
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

        @media (max-width: 760px) {
          .bellmont-home-nav {
            top: 10px;
            left: 10px;
            right: 10px;
            justify-content: flex-start;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .bellmont-home-nav::-webkit-scrollbar {
            display: none;
          }

          .bellmont-home-nav a {
            min-height: 34px;
            padding: 0 11px;
            font-size: 10px;
          }
        }

        @media (max-width: 900px) {
          .bellmont-home-art {
            width: 100%;
            min-width: 0;
          }
        }
      ` }} />
    </main>
  );
}
