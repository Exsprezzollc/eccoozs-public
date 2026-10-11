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
        .learn{margin:0;min-height:100vh;font-family:Arial,sans-serif;color:#eef5ff;background:#020b1c}
        .nav{height:74px;padding:0 5.2%;display:flex;align-items:center;justify-content:space-between;background:rgba(2,9,24,.96);border-bottom:1px solid #16335f;position:sticky;top:0;z-index:30;backdrop-filter:blur(14px)}
        .brand{display:flex;align-items:center;gap:14px}.brandLogo{display:block;width:158px;height:auto}.brand span{font-size:12px;font-weight:900;color:#8fb6ff;letter-spacing:.18em;white-space:nowrap}.nav a{color:#eef5ff;text-decoration:none;font-weight:800}
        .intro{padding:62px 5.5% 46px;background:radial-gradient(circle at 18% 0%,rgba(37,91,255,.22),transparent 34%),radial-gradient(circle at 85% 15%,rgba(25,115,255,.1),transparent 26%),#041126;border-bottom:1px solid #183765}
        .introInner{max-width:1180px;margin:auto}.introKicker{font-size:11px;letter-spacing:.22em;font-weight:950;color:#64a5ff}.intro h1{font-family:Georgia,serif;font-size:clamp(3.2rem,6.1vw,5.6rem);line-height:.96;margin:12px 0 16px;color:#fffaf0;max-width:850px}.intro p{max-width:760px;margin:0;color:#a7c5f5;font-size:17px;line-height:1.7}
        .main{max-width:1240px;margin:auto;padding:34px 4% 86px}
        .feature{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.35fr);gap:0;overflow:hidden;border:1px solid #214978;border-radius:28px;background:linear-gradient(145deg,#07162f 0%,#0a1d3b 100%);box-shadow:0 30px 90px rgba(0,0,0,.38)}
        .featureCopy{padding:46px 42px 42px;display:flex;flex-direction:column;justify-content:center}.featureKicker{font-size:11px;letter-spacing:.18em;font-weight:950;color:#61a1ff}.featureCopy h2{font-family:Georgia,serif;font-size:clamp(2.8rem,4.3vw,4.5rem);line-height:.98;margin:10px 0 16px;color:#fffaf0}.featureCopy p{margin:0;color:#b3c9ea;font-size:15px;line-height:1.72;max-width:520px}.featureBtn{display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;min-height:50px;margin-top:24px;padding:0 20px;border-radius:12px;background:#2452ff;color:#fff;text-decoration:none;font-weight:900;box-shadow:0 12px 28px rgba(36,82,255,.28)}
        .featureArt{min-height:480px;background:#08162c}.featureArt img{width:100%;height:100%;object-fit:cover;display:block}
        .paths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}.path{padding:15px 14px;border-radius:14px;border:1px solid #214978;background:rgba(4,17,39,.76)}.pathNum{font-size:10px;letter-spacing:.16em;font-weight:950;color:#67a6ff}.path h3{margin:6px 0 4px;font-size:16px;color:#fff}.path p{margin:0!important;font-size:12px!important;line-height:1.5!important;color:#8eb1df!important}
        .sectionHead{display:flex;align-items:end;justify-content:space-between;gap:24px;margin:58px 0 22px}.sectionHead h2{font-family:Georgia,serif;font-size:clamp(2rem,3.4vw,3.1rem);margin:0;color:#fffaf0}.sectionHead p{max-width:560px;margin:0;color:#8fb0df;line-height:1.6;text-align:right}
        .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:#07162e;border:1px solid #1a3f6d;border-radius:22px;overflow:hidden;box-shadow:0 18px 52px rgba(0,0,0,.22);display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s}.card:hover{transform:translateY(-4px);box-shadow:0 24px 68px rgba(0,0,0,.32)}.visual{aspect-ratio:16/10;overflow:hidden;background:#0b1d39}.visual img{width:100%;height:100%;object-fit:cover;display:block}.body{padding:22px;display:flex;flex-direction:column;flex:1}.label{font-size:10px;font-weight:950;letter-spacing:.12em;color:#64a5ff}.body h3{font-size:25px;margin:8px 0;color:#fff}.body p{color:#9fbae2;line-height:1.6;font-size:14px;flex:1}.actions{margin-top:18px}.btn{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:10px;text-decoration:none;font-weight:900;color:#fff;background:#2452ff}
        .note{margin-top:28px;padding:17px 19px;border:1px solid #1a3f6d;border-radius:14px;background:#06142b;color:#89a9d5;line-height:1.65}.note strong{color:#fff}.back{margin-top:30px;text-align:center}.back a{color:#77adff;font-weight:850;text-decoration:none}
        @media(max-width:950px){.feature{grid-template-columns:1fr}.featureArt{order:-1;min-height:360px}.paths{grid-template-columns:1fr 1fr 1fr}.grid{grid-template-columns:1fr 1fr}.card.adult{grid-column:1/-1;max-width:620px;margin:auto}.sectionHead{align-items:start;flex-direction:column}.sectionHead p{text-align:left}}
        @media(max-width:720px){.nav{padding:0 4%;height:68px}.brand{gap:9px}.brandLogo{width:138px}.brand span{font-size:10px}.intro{padding:42px 6% 34px}.intro p{font-size:15px}.main{padding:22px 4% 68px}.feature{border-radius:20px}.featureArt{min-height:260px}.featureCopy{padding:28px 22px}.paths{grid-template-columns:1fr}.grid{grid-template-columns:1fr}.card.adult{grid-column:auto;max-width:none}.sectionHead{margin-top:44px}}
        @media(max-width:470px){.brand span{display:none}.nav a{font-size:14px}.intro h1{font-size:3.2rem}}
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
          <h1>Learning that feels like doing.</h1>
          <p>
            Reading, math, speech, and communication experiences designed to teach clearly,
            build confidence, and help learners use what they know in the real world.
          </p>
        </div>
      </section>

      <section className="main">
        <section className="feature" aria-label="Reading Detective">
          <div className="featureCopy">
            <div className="featureKicker">FEATURED LEARNING EXPERIENCE</div>
            <h2>Reading Detective</h2>
            <p>
              Reading becomes an investigation. Learners build comprehension, vocabulary,
              evidence skills, source awareness, and reasoning by solving cases instead of
              completing disconnected drills.
            </p>
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
          <a className="featureArt" href="/apps/reading-detective/" aria-label="Open ECCOOZS Reading Detective">
            <img
              src="/learning-assets/reading-detective-hero.png"
              alt="ECCOOZS Reading Detective learning experience with Detective Bo, case solving, investigator levels, and reading skill progression"
            />
          </a>
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
