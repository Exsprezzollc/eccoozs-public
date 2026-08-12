import type { Metadata } from "next";
import HeaderLogo from "@/components/brand/HeaderLogo";

export const metadata: Metadata = {
  title: "ECCOOZS Learning | Math Trail & My Voice Journey",
  description:
    "Explore ECCOOZS Learning apps, including Math Trail for grades 1–6 and My Voice Journey for speech and language practice.",
};

const styles = String.raw`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#f4f6fb;color:#07102a;font-family:'DM Sans',sans-serif}
a{text-decoration:none;color:inherit}

.learning-shell{min-height:100vh;background:linear-gradient(180deg,#040c1c 0,#071240 34rem,#f4f6fb 34rem,#f4f6fb 100%)}
.learning-nav{height:68px;padding:0 5%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.12);background:rgba(4,12,28,.92);backdrop-filter:blur(18px);position:sticky;top:0;z-index:20}
.learning-logo{display:flex;align-items:center}
.learning-logo img{height:auto;max-width:166px}
.learning-navlinks{display:flex;align-items:center;gap:1.2rem;font-size:.8rem;font-weight:600;color:rgba(255,255,255,.68)}
.learning-navlinks a:hover{color:#fff}
.learning-home{padding:9px 14px;border:1px solid rgba(255,255,255,.18);border-radius:8px;color:#fff}

.learning-hero{max-width:1180px;margin:0 auto;padding:7rem 5% 4.5rem;color:#fff;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(280px,.8fr);gap:4rem;align-items:end}
.learning-eyebrow{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.22em;color:#4a76ff;display:flex;align-items:center;gap:10px;margin-bottom:1rem}
.learning-eyebrow::before{content:'';width:24px;height:2px;background:#4a76ff}
.learning-hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(3.2rem,7vw,6.4rem);line-height:.92;margin:0 0 1.3rem;font-weight:700;letter-spacing:-.03em}
.learning-hero h1 span{color:#4a76ff}
.learning-hero p{max-width:650px;color:rgba(255,255,255,.62);font-size:1rem;line-height:1.85;margin:0}
.learning-note{border:1px solid rgba(74,118,255,.36);background:rgba(74,118,255,.08);border-radius:18px;padding:1.35rem 1.45rem}
.learning-note strong{display:block;font-family:'Cormorant Garamond',serif;font-size:1.35rem;color:#fff;margin-bottom:.4rem}
.learning-note span{display:block;font-size:.8rem;line-height:1.65;color:rgba(255,255,255,.58)}

.learning-main{max-width:1180px;margin:0 auto;padding:0 5% 7rem}
.learning-intro{margin:0 0 2rem;display:flex;align-items:end;justify-content:space-between;gap:2rem}
.learning-intro h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;margin:0;color:#07102a}
.learning-intro p{max-width:520px;color:#607ab5;font-size:.9rem;line-height:1.7;margin:0}

.learning-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.35rem}
.app-card{background:#fff;border:1px solid rgba(7,18,64,.09);border-radius:24px;overflow:hidden;box-shadow:0 18px 55px rgba(7,18,64,.08)}
.app-visual{min-height:310px;padding:2rem;position:relative;overflow:hidden;display:flex;align-items:flex-end}
.app-visual.math{background:radial-gradient(circle at 78% 20%,rgba(74,118,255,.22),transparent 33%),linear-gradient(135deg,#06132f 0%,#0b1a3e 52%,#123178 100%)}
.app-visual.voice{background:radial-gradient(circle at 22% 18%,rgba(74,118,255,.24),transparent 32%),linear-gradient(135deg,#f8fafc 0%,#e8edf8 58%,#dbe5ff 100%)}
.app-number{position:absolute;top:1.5rem;right:1.7rem;font-family:'Cormorant Garamond',serif;font-size:6rem;line-height:1;font-weight:700;opacity:.13}
.math .app-number{color:#fff}.voice .app-number{color:#071240}
.app-identity{position:relative;z-index:2}
.app-kicker{font-size:.68rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin-bottom:.55rem}
.math .app-kicker{color:#7c9cff}.voice .app-kicker{color:#1a3ef5}
.app-visual h3{font-family:'Cormorant Garamond',serif;font-size:3rem;line-height:1;margin:0 0 .55rem}
.math h3{color:#fff}.voice h3{color:#07102a}
.app-visual p{margin:0;max-width:430px;font-size:.86rem;line-height:1.7}
.math p{color:rgba(255,255,255,.58)}.voice p{color:#526a9e}
.visual-line{width:100%;height:1px;margin:1.15rem 0;background:linear-gradient(90deg,#4a76ff,transparent)}
.visual-pills{display:flex;flex-wrap:wrap;gap:.5rem}
.visual-pills span{font-size:.7rem;font-weight:600;padding:.48rem .7rem;border-radius:999px}
.math .visual-pills span{color:#dce5ff;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06)}
.voice .visual-pills span{color:#18346c;border:1px solid rgba(7,18,64,.1);background:rgba(255,255,255,.64)}

.app-body{padding:1.8rem 2rem 2rem}
.app-body h4{font-family:'Cormorant Garamond',serif;font-size:1.55rem;margin:0 0 .8rem}
.app-body>p{margin:0 0 1.25rem;color:#607ab5;line-height:1.72;font-size:.86rem}
.feature-list{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:1.45rem}
.feature-item{border:1px solid rgba(7,18,64,.08);border-radius:12px;padding:.75rem .8rem;font-size:.75rem;font-weight:600;color:#18346c;background:#f8faff;display:flex;gap:.55rem;align-items:center}
.feature-dot{width:7px;height:7px;border-radius:50%;background:#1a3ef5;box-shadow:0 0 0 4px rgba(26,62,245,.08);flex:0 0 auto}
.app-actions{display:flex;gap:.7rem;flex-wrap:wrap}
.app-primary,.app-secondary{min-height:42px;padding:0 1rem;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;transition:transform .15s,background .2s}
.app-primary{background:#1a3ef5;color:#fff}
.app-primary:hover{background:#0d2ec4;transform:translateY(-1px)}
.app-secondary{border:1px solid rgba(7,18,64,.13);color:#071240;background:#fff}
.app-secondary:hover{background:#f4f6fb;transform:translateY(-1px)}

.learning-band{margin-top:1.6rem;background:#071240;border-radius:24px;padding:2.4rem;color:#fff;display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:center}
.learning-band h3{font-family:'Cormorant Garamond',serif;font-size:2rem;margin:0 0 .45rem}
.learning-band p{margin:0;color:rgba(255,255,255,.54);font-size:.86rem;line-height:1.7;max-width:700px}
.learning-band a{background:#fff;color:#071240;padding:11px 16px;border-radius:9px;font-size:.78rem;font-weight:700;white-space:nowrap}

.learning-footer{background:#040c1c;color:rgba(255,255,255,.44);padding:3rem 5%}
.learning-footer-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap}
.learning-footer strong{color:#fff;font-size:.9rem;letter-spacing:.06em}
.learning-footer p{font-size:.75rem;margin:.35rem 0 0}
.learning-footer-links{display:flex;gap:1rem;font-size:.74rem}
.learning-footer-links a:hover{color:#fff}

@media(max-width:900px){
  .learning-hero{grid-template-columns:1fr;padding-top:5.5rem;gap:2rem}
  .learning-grid{grid-template-columns:1fr}
  .learning-intro{align-items:flex-start;flex-direction:column}
}
@media(max-width:650px){
  .learning-nav{padding:0 4%;height:62px}
  .learning-logo img{max-width:138px}
  .learning-navlinks a:not(.learning-home){display:none}
  .learning-hero{padding:4.4rem 5% 3.2rem}
  .learning-hero h1{font-size:3.65rem}
  .app-visual{min-height:270px;padding:1.5rem}
  .app-visual h3{font-size:2.45rem}
  .app-body{padding:1.45rem}
  .feature-list{grid-template-columns:1fr}
  .learning-band{grid-template-columns:1fr;padding:1.7rem}
}
`;

const apps = [
  {
    key: "math",
    number: "01",
    kicker: "Math practice • Grades 1–6",
    name: "Math Trail",
    visual:
      "A self-contained math practice experience with grade-based topics, progress tracking, badges and selectable voice guidance.",
    description:
      "Math Trail gives students a focused place to practice math across grades 1 through 6 while keeping progress visible for continued practice.",
    pills: ["Grades 1–6", "Practice", "Progress", "Badges"],
    features: [
      "Grade-based math topics",
      "Progress tracking",
      "Achievement badges",
      "Parent / teacher view",
      "Selectable voice guidance",
      "Standalone web app",
    ],
    openHref: "/apps/math-trail.html",
    downloadHref: "/apps/math-trail.html",
  },
  {
    key: "voice",
    number: "02",
    kicker: "Speech & language practice",
    name: "My Voice Journey",
    visual:
      "A guided practice app built around words, phrases and sentences with listening, repetition, pronunciation and recording tools.",
    description:
      "My Voice Journey provides structured speech and language practice in a simple interface designed to make repeated practice easier to use and return to.",
    pills: ["Words", "Phrases", "Sentences", "Practice"],
    features: [
      "Word and phrase practice",
      "Sentence practice",
      "Listen and repeat",
      "Pronunciation support",
      "Recording tools",
      "Standalone web app",
    ],
    openHref: "/apps/my-voice-journey.html",
    downloadHref: "/apps/my-voice-journey.html",
  },
] as const;

export default function LearningPage() {
  return (
    <main className="learning-shell">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <nav className="learning-nav" aria-label="ECCOOZS Learning navigation">
        <a className="learning-logo" href="/welcome" aria-label="ECCOOZS welcome page">
          <HeaderLogo width={166} />
        </a>
        <div className="learning-navlinks">
          <a href="#apps">Apps</a>
          <a href="/support">Support</a>
          <a className="learning-home" href="/welcome">Back to ECCOOZS</a>
        </div>
      </nav>

      <section className="learning-hero">
        <div>
          <div className="learning-eyebrow">ECCOOZS Learning</div>
          <h1>Practice with purpose.<br /><span>Grow with confidence.</span></h1>
          <p>
            ECCOOZS Learning brings focused educational practice tools into the broader ECCOOZS family. The first two apps are Math Trail and My Voice Journey.
          </p>
        </div>
        <aside className="learning-note">
          <strong>Two apps. One simple idea.</strong>
          <span>
            Make practice approachable, useful and easy to return to — without turning the experience into clutter.
          </span>
        </aside>
      </section>

      <section className="learning-main" id="apps">
        <div className="learning-intro">
          <h2>Available learning apps</h2>
          <p>
            Each app opens directly in the browser and can also be downloaded as a self-contained HTML file for personal use.
          </p>
        </div>

        <div className="learning-grid">
          {apps.map((app) => (
            <article className="app-card" key={app.key}>
              <div className={`app-visual ${app.key}`}>
                <div className="app-number">{app.number}</div>
                <div className="app-identity">
                  <div className="app-kicker">{app.kicker}</div>
                  <h3>{app.name}</h3>
                  <p>{app.visual}</p>
                  <div className="visual-line" />
                  <div className="visual-pills">
                    {app.pills.map((pill) => <span key={pill}>{pill}</span>)}
                  </div>
                </div>
              </div>

              <div className="app-body">
                <h4>{app.name}</h4>
                <p>{app.description}</p>
                <div className="feature-list">
                  {app.features.map((feature) => (
                    <div className="feature-item" key={feature}>
                      <span className="feature-dot" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="app-actions">
                  <a className="app-primary" href={app.openHref}>Open app</a>
                  <a className="app-secondary" href={app.downloadHref} download>
                    Download HTML
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="learning-band">
          <div>
            <h3>Part of the ECCOOZS family.</h3>
            <p>
              Learning is presented as its own focused destination while staying connected to the ECCOOZS brand, support resources and public website.
            </p>
          </div>
          <a href="/welcome">Return to ECCOOZS</a>
        </div>
      </section>

      <footer className="learning-footer">
        <div className="learning-footer-inner">
          <div>
            <strong>ECCOOZS LEARNING</strong>
            <p>Math Trail • My Voice Journey</p>
          </div>
          <div className="learning-footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/support">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
