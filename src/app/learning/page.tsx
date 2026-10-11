import type { Metadata } from "next";
import HeaderLogo from "@/components/brand/HeaderLogo";
import {
  mathTrailPresentation,
  voiceJourneyAdultPresentation,
  voiceJourneyYouthPresentation,
} from "@/components/learning/presentationAssets";

export const metadata: Metadata = {
  title: "ECCOOZS Learning Apps",
  description:
    "Reading Detective, Math Trail, My Voice Journey Youth, and My Voice Journey for adults.",
};

const apps = [
  {
    href: "/apps/math-trail",
    image: mathTrailPresentation,
    alt: "Math Trail presentation with Trail Fox, grade paths, practice tools, and progress dashboard",
    kicker: "GRADES 1–6 · MATH",
    title: "Math Trail",
    copy: "A guided math learning adventure with Trail Check, six grade trails, practice sheets, times tables, Division Lab, progress and parent reporting.",
    tone: "math",
  },
  {
    href: "/apps/my-voice-journey-youth",
    image: voiceJourneyYouthPresentation,
    alt: "My Voice Journey Youth presentation with Leo and Learning to Speak",
    kicker: "YOUTH · SPEECH & COMMUNICATION",
    title: "My Voice Journey Youth",
    copy: "The Leo-led Learning to Speak experience: hear words, choose answers, build sentences, practice conversations and grow communication confidence step by step.",
    tone: "youth",
  },
  {
    href: "/apps/my-voice-journey",
    image: voiceJourneyAdultPresentation,
    alt: "My Voice Journey adult presentation for English Practice and My Words",
    kicker: "ADULTS · ENGLISH & COMMUNICATION",
    title: "My Voice Journey",
    copy: "A mature communication experience for real-world English practice, vocabulary, speaking confidence, conversation support and the My Words communication board.",
    tone: "adult",
  },
] as const;

const stages = [
  {
    number: "01",
    name: "Young Investigator",
    subtitle: "Foundations & Discovery",
    copy: "Build true reading foundations with voice-and-visual-first teaching, decoding, meaning, and guided case solving.",
  },
  {
    number: "02",
    name: "Investigator",
    subtitle: "Comprehension & Evidence",
    copy: "Strengthen comprehension, source reading, evidence use, vocabulary, and independent reasoning through real cases.",
  },
  {
    number: "03",
    name: "Lead Investigator",
    subtitle: "Research & Decision",
    copy: "Analyze documents, research, media, arguments, and evidence to make and defend well-supported decisions.",
  },
] as const;

export default function Learning() {
  return (
    <main className="learn">
      <style>{`
        *{box-sizing:border-box}
        .learn{margin:0;min-height:100vh;font-family:Arial,sans-serif;color:#0b1739;background:linear-gradient(180deg,#fbfcff 0%,#f7f8fb 58%,#fbfaf6 100%)}
        .nav{height:74px;padding:0 5.2%;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.97);border-bottom:1px solid #e4e9f2;position:sticky;top:0;z-index:30;backdrop-filter:blur(14px)}
        .brand{display:flex;align-items:center;gap:14px}.brandLogo{display:block;width:158px;height:auto}.brand span{font-size:12px;font-weight:900;color:#63729a;letter-spacing:.18em;white-space:nowrap}.nav a{color:#0b1739;text-decoration:none;font-weight:800}
        .intro{padding:54px 5.5% 36px;background:radial-gradient(circle at 18% 0%,rgba(31,71,224,.08),transparent 34%),radial-gradient(circle at 84% 10%,rgba(93,141,109,.09),transparent 32%),#fbfcff;border-bottom:1px solid #e5eaf2}
        .introInner{max-width:1180px;margin:auto;text-align:center}.introKicker{font-size:11px;letter-spacing:.22em;font-weight:950;color:#2b5ee7}.intro h1{font-family:Georgia,serif;font-size:clamp(3rem,5.7vw,5.1rem);line-height:.96;margin:12px 0 14px;color:#0c1735}.intro p{max-width:780px;margin:0 auto;color:#6579a3;font-size:17px;line-height:1.68}
        .main{max-width:1240px;margin:auto;padding:30px 4% 84px}
        .feature{display:flex;flex-direction:column;overflow:hidden;border:1px solid #dce5e0;border-radius:28px;background:#fff;box-shadow:0 24px 70px rgba(32,55,71,.12)}
        .featureArt{order:1;display:block;background:#eef3ef}.featureArt img{width:100%;height:auto;display:block;object-fit:contain}
        .featureCopy{order:2;padding:28px 30px 26px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(420px,1.6fr) auto;gap:26px;align-items:center;background:linear-gradient(180deg,#fff 0%,#f7faf8 100%);border-top:1px solid #e3ebe6}
        .featureIntro{min-width:0}.featureKicker{font-size:10px;letter-spacing:.18em;font-weight:950;color:#3d715d}.featureCopy h2{font-family:Georgia,serif;font-size:clamp(2.1rem,3vw,3.1rem);line-height:1;margin:8px 0 10px;color:#173d32}.featureCopy p{margin:0;color:#60766f;font-size:14px;line-height:1.6;max-width:520px}
        .featureBtn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:11px;background:#174f3d;color:#fff;text-decoration:none;font-weight:900;box-shadow:0 10px 24px rgba(23,79,61,.18);white-space:nowrap}
        .paths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:0}.path{padding:12px 11px;border-radius:12px;border:1px solid #d8e4dc;background:#fff}.pathNum{font-size:9px;letter-spacing:.16em;font-weight:950;color:#739083}.path h3{margin:5px 0 2px;font-size:14px;color:#1f493c}.path p{margin:0!important;font-size:11px!important;line-height:1.4!important;color:#6e847c!important}
        .sectionHead{text-align:center;margin:56px 0 24px}.sectionHead h2{font-family:Georgia,serif;font-size:clamp(2rem,3.4vw,3rem);margin:0 0 8px;color:#0d1a3d}.sectionHead p{max-width:620px;margin:0 auto;color:#6d7fa5;line-height:1.6}
        .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:#fff;border:1px solid #e1e7f1;border-radius:22px;overflow:hidden;box-shadow:0 16px 48px rgba(29,48,81,.08);display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s}.card:hover{transform:translateY(-4px);box-shadow:0 22px 62px rgba(29,48,81,.14)}.visual{aspect-ratio:16/10;overflow:hidden;background:#eef3fb}.visual img{width:100%;height:100%;object-fit:cover;display:block}.body{padding:21px;display:flex;flex-direction:column;flex:1}.label{font-size:10px;font-weight:950;letter-spacing:.12em;color:#2b5ee7}.card.youth .label{color:#7140d9}.card.adult .label{color:#5545a5}.body h3{font-size:24px;margin:8px 0;color:#111d43}.body p{color:#6b7ea6;line-height:1.58;font-size:14px;flex:1}.actions{margin-top:16px}.btn{display:inline-flex;align-items:center;min-height:43px;padding:0 15px;border-radius:10px;text-decoration:none;font-weight:900;color:#fff;background:#2b5ee7}.card.youth .btn{background:#7140d9}.card.adult .btn{background:#30236f}
        .note{margin-top:28px;padding:17px 19px;border:1px solid #e1e7f1;border-radius:14px;background:#fff;color:#6c7fa4;line-height:1.65}.note strong{color:#172349}.back{margin-top:30px;text-align:center}.back a{color:#2b5ee7;font-weight:850;text-decoration:none}
        @media(max-width:980px){.featureCopy{grid-template-columns:1fr;gap:18px}.paths{grid-template-columns:repeat(3,minmax(0,1fr))}.featureBtn{justify-self:start}.grid{grid-template-columns:1fr 1fr}.card.adult{grid-column:1/-1;max-width:620px;margin:auto}}
        @media(max-width:720px){.nav{padding:0 4%;height:68px}.brand{gap:9px}.brandLogo{width:138px}.brand span{font-size:10px}.intro{padding:42px 6% 32px}.intro p{font-size:15px}.main{padding:22px 4% 68px}.feature{border-radius:20px}.featureCopy{padding:24px 20px}.paths{grid-template-columns:1fr}.grid{grid-template-columns:1fr}.card.adult{grid-column:auto;max-width:none}.sectionHead{margin-top:44px}}
        @media(max-width:470px){.brand span{display:none}.nav a{font-size:14px}.intro h1{font-size:3rem}}
      `}</style>

      <nav className="nav">
        <div className="brand">
          <a href="https://eccoozstechnologies.com/" aria-label="ECCOOZS Technologies home">
            <HeaderLogo width={156} className="brandLogo" />
          </a>
          <span>LEARNING APPS</span>
        </div>
        <a href="https://eccoozstechnologies.com/">Back to ECCOOZS</a>
      </nav>

      <section className="intro">
        <div className="introInner">
          <div className="introKicker">ECCOOZS LEARNING APPS</div>
          <h1>Explore. Practice. Grow.</h1>
          <p>
            Friendly learning tools that teach clearly, build confidence, and grow with the learner —
            from first foundations to real-world application.
          </p>
        </div>
      </section>

      <section className="main">
        <section className="feature" aria-label="Reading Detective">
          <a className="featureArt" href="/apps/reading-detective/" aria-label="Open ECCOOZS Reading Detective">
            <img
              src="/learning-assets/reading-detective-hero.png"
              alt="ECCOOZS Reading Detective learning experience with Detective Bo, case solving, investigator levels, and reading skill progression"
            />
          </a>
          <div className="featureCopy">
            <div className="featureIntro">
              <div className="featureKicker">FEATURED LEARNING EXPERIENCE</div>
              <h2>Reading Detective</h2>
              <p>
                Reading becomes an investigation. Learners build comprehension, vocabulary,
                evidence skills, source awareness, and reasoning by solving cases instead of
                completing disconnected drills.
              </p>
            </div>
            <div className="paths">
              {stages.map((stage) => (
                <article className="path" key={stage.name}>
                  <div className="pathNum">{stage.number}</div>
                  <h3>{stage.name}</h3>
                  <p>{stage.subtitle}</p>
                </article>
              ))}
            </div>
            <a className="featureBtn" href="/apps/reading-detective/">
              Open Reading Detective →
            </a>
          </div>
        </section>

        <div className="sectionHead">
          <h2>More learning experiences.</h2>
          <p>Math, speech, English practice, and communication support — each built as its own focused experience.</p>
        </div>

        <div className="grid">
          {apps.map((app) => (
            <article className={`card ${app.tone}`} key={app.href}>
              <div className="visual"><img src={app.image} alt={app.alt} /></div>
              <div className="body">
                <div className="label">{app.kicker}</div>
                <h3>{app.title}</h3>
                <p>{app.copy}</p>
                <div className="actions"><a className="btn" href={app.href}>Open App →</a></div>
              </div>
            </article>
          ))}
        </div>

        <div className="note">
          <strong>My Voice Journey split:</strong> Youth opens directly into Learning to Speak with Leo. Adults open into English Practice and can move between English Practice and My Words without entering the youth experience.
        </div>
        <div className="back"><a href="https://eccoozstechnologies.com/">← Return to ECCOOZS</a></div>
      </section>
    </main>
  );
}
