import BellmontArt from "./BellmontArt";
import { bellmontOrder } from "./pages";

export const metadata = {
  title: "Bellmont State University — A Higher Story | ECCOOZS",
  description: "Step into Bellmont State University, an original campus world from ECCOOZS."
};

export default function BellmontHomePage() {
  return (
    <main>
      <section className="bellmont-home-hero">
        <div className="bellmont-hero-copy">
          <img className="bellmont-turtle" src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" />
          <div className="bellmont-kicker">From the ECCOOZS World</div>
          <h1>BELLMONT STATE<br />UNIVERSITY</h1>
          <div className="bellmont-subtitle">A HIGHER STORY.</div>
          <p>Meet the people. Experience the traditions. Follow the stories of a campus built around faith, purpose, friendship, ambition, and the choices that shape who we become.</p>
          <div className="bellmont-actions">
            <a className="primary" href="/bellmont/circle">Meet the Bellmont Circle</a>
            <a href="/bellmont/traditions">Explore Bellmont</a>
            <a className="youtube" href="https://www.youtube.com/@Eccoozs" target="_blank" rel="noreferrer">Watch Bellmont State</a>
          </div>
        </div>
        <a className="bellmont-hero-image" href="/bellmont/welcome" aria-label="Enter Bellmont State University">
          <div className="bellmont-ribbon"><img src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" /> People. Purpose. Possibility.</div>
        </a>
      </section>

      <section className="bellmont-section">
        <div className="bellmont-section-head"><div><small>Explore the world</small><h2>Step into Bellmont.</h2></div><p>An original campus world from ECCOOZS.</p></div>
        <div className="bellmont-card-grid">
          {bellmontOrder.map((page) => (
            <a className="bellmont-card" href={`/bellmont/${page.slug}`} key={page.slug}>
              <BellmontArt index={page.index} />
              <div className="bellmont-card-copy"><strong>{page.title}</strong><span>{page.caption}</span></div>
            </a>
          ))}
        </div>

        <div className="bellmont-feature-strip">
          <div className="bellmont-feature-art"><BellmontArt index={16} alt="Bellmont Sounds of Triumph marching band" /></div>
          <div className="bellmont-feature-copy">
            <img src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" />
            <small>Bellmont State University</small>
            <h3>Sounds of Triumph</h3>
            <p>Bellmont’s marching sound — game-day energy, discipline, precision, school pride, and a tradition built to be remembered. Featuring the Bellmont Blue Belles.</p>
            <div className="bellmont-feature-links"><a href="/bellmont/sounds-of-triumph">Meet Sounds of Triumph</a><a href="/bellmont/blue-belles">Meet the Bellmont Blue Belles</a></div>
          </div>
        </div>
      </section>
    </main>
  );
}
