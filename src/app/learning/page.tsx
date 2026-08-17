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
    "Vocabulary Adventure, Math Trail, My Voice Journey Youth, and My Voice Journey for adults.",
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
    name: "Elementary",
    subtitle: "Explore & Learn",
    copy: "Meet new words in clear, guided steps and begin growing the Cottage Garden.",
  },
  {
    number: "02",
    name: "Junior High",
    subtitle: "Discover & Reason",
    copy: "Strengthen spelling, meaning, contrast and independent word use as the Garden Estate expands.",
  },
  {
    number: "03",
    name: "High School",
    subtitle: "Apply & Decide",
    copy: "Use advanced vocabulary to evaluate evidence, explain decisions and complete real-world projects.",
  },
] as const;

export default function Learning() {
  return (
    <main className="learn">
      <style>{`
        *{box-sizing:border-box}
        .learn{margin:0;min-height:100vh;font-family:Arial,sans-serif;color:#071240;background:linear-gradient(180deg,#f7f9ff 0%,#fffdf8 45%,#f6f9ff 100%)}
        .nav{height:76px;padding:0 5%;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.97);border-bottom:1px solid #e7ebf5;position:sticky;top:0;z-index:30;backdrop-filter:blur(12px)}
        .brand{display:flex;align-items:center;gap:15px}.brandLogo{display:block;width:156px;height:auto}.brand span{font-size:13px;font-weight:900;color:#6070a0;letter-spacing:.16em;white-space:nowrap}.nav a{color:#071240;text-decoration:none;font-weight:800}
        .intro{text-align:center;padding:50px 5% 34px;background:radial-gradient(circle at 18% 0%,rgba(31,71,224,.09),transparent 34%),radial-gradient(circle at 82% 10%,rgba(91,147,105,.11),transparent 30%)}
        .introKicker{font-size:12px;letter-spacing:.22em;font-weight:950;color:#1f47e0}.intro h1{font-family:Georgia,serif;font-size:clamp(3rem,5.7vw,5.1rem);line-height:.96;margin:12px 0 15px}.intro p{max-width:820px;margin:0 auto;color:#607ab5;font-size:17px;line-height:1.65}
        .main{max-width:1320px;margin:auto;padding:24px 4% 90px}
        .featureWrap{margin-bottom:20px}
        .featureArt{position:relative;display:block;overflow:hidden;border-radius:30px;border:1px solid rgba(64,102,77,.22);box-shadow:0 28px 76px rgba(17,47,39,.2);background:#eef2ea;text-decoration:none}
        .featureArt img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}
        .featureArt:after{content:'OPEN VOCABULARY ADVENTURE  →';position:absolute;right:22px;top:22px;padding:12px 17px;border-radius:999px;background:rgba(9,52,39,.92);border:1px solid rgba(235,196,99,.85);color:#fff;font:900 11px/1 Arial,sans-serif;letter-spacing:.08em;box-shadow:0 9px 24px rgba(0,0,0,.2)}
        .featureArt:hover{transform:translateY(-2px);box-shadow:0 34px 88px rgba(17,47,39,.25)}.featureArt{transition:transform .2s,box-shadow .2s}
        .featureCaption{text-align:center;color:#557064;font-size:13px;font-weight:750;margin:14px 0 0}.featureCaption strong{color:#174f3d}
        .stageStory{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin:22px 0 52px}
        .stageCard{position:relative;padding:20px 22px 21px;border-radius:19px;background:rgba(255,255,255,.93);border:1px solid #e0e8df;box-shadow:0 12px 36px rgba(24,54,47,.07)}
        .stageCard:before{content:'';position:absolute;top:0;left:22px;width:46px;height:3px;background:#d3a44a;border-radius:0 0 4px 4px}.stageNum{font-size:10px;letter-spacing:.17em;font-weight:950;color:#72917f}.stageCard h3{margin:7px 0 5px;color:#153d32;font-size:18px}.stageCard h3 span{color:#b47a29}.stageCard p{margin:0;color:#667d75;font-size:13px;line-height:1.55}
        .promise{font-family:Georgia,serif;text-align:center;color:#12372e;font-size:clamp(1.75rem,3vw,2.7rem);margin:0 0 54px}
        .moreHead{text-align:center;margin-bottom:28px}.moreHead h2{font-family:Georgia,serif;font-size:42px;margin:0 0 8px}.moreHead p{color:#607ab5;line-height:1.65;margin:0}
        .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:#fff;border:1px solid #e1e7f3;border-radius:24px;overflow:hidden;box-shadow:0 18px 54px #07124012;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s}.card:hover{transform:translateY(-4px);box-shadow:0 24px 68px #07124020}.visual{aspect-ratio:4/3;overflow:hidden;background:#eef3ff}.visual img{width:100%;height:100%;object-fit:cover;display:block}.body{padding:23px;display:flex;flex-direction:column;flex:1}.label{font-size:11px;font-weight:950;letter-spacing:.12em;color:#1f47e0}.card.youth .label{color:#7140d9}.card.adult .label{color:#5545a5}.body h3{font-size:27px;margin:8px 0}.body p{color:#607ab5;line-height:1.65;font-size:14px;flex:1}.actions{margin-top:18px}.btn{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:11px;text-decoration:none;font-weight:900;color:#fff;background:#1f47e0}.card.youth .btn{background:#7140d9}.card.adult .btn{background:#30236f}
        .note{margin-top:28px;padding:18px 20px;border:1px solid #e1e7f3;border-radius:16px;background:#fff;color:#607ab5;line-height:1.65}.back{margin-top:32px;text-align:center}.back a{color:#1f47e0;font-weight:850;text-decoration:none}
        @media(max-width:900px){.grid{grid-template-columns:1fr 1fr}.card.adult{grid-column:1/-1;max-width:620px;margin:auto}.featureArt:after{right:14px;top:14px;font-size:10px;padding:10px 13px}}
        @media(max-width:720px){.nav{padding:0 4%;height:70px}.brand{gap:10px}.brandLogo{width:134px}.brand span{font-size:11px;letter-spacing:.12em}.intro{padding:42px 6% 30px}.intro p{font-size:15px}.main{padding:18px 4% 72px}.featureArt{border-radius:20px}.featureArt:after{content:'PLAY →';font-size:10px}.stageStory{grid-template-columns:1fr;margin-bottom:46px}.grid{grid-template-columns:1fr}.card.adult{grid-column:auto;max-width:none}.moreHead h2{font-size:35px}}
        @media(max-width:470px){.brand span{display:none}.brandLogo{width:142px}.nav a{font-size:14px}.intro h1{font-size:3rem}.featureCaption{font-size:11px}.stageCard{padding:18px}}
      `}</style>

      <nav className="nav">
        <div className="brand">
          <HeaderLogo width={156} className="brandLogo" />
          <span>LEARNING APPS</span>
        </div>
        <a href="/welcome">Back to ECCOOZS</a>
      </nav>

      <section className="intro">
        <div className="introKicker">ECCOOZS LEARNING APPS</div>
        <h1>Explore. Practice. Grow.</h1>
        <p>
          Friendly learning tools that teach clearly, build confidence, and grow
          with the learner — from first foundations to real-world application.
        </p>
      </section>

      <section className="main">
        <div className="featureWrap">
          <a
            className="featureArt"
            href="/apps/vocabulary-adventure"
            aria-label="Play ECCOOZS Vocabulary Adventure"
          >
            <img
              src="/api/learning/vocabulary-adventure-feature"
              alt="ECCOOZS Vocabulary Adventure showing Foundational Black American learners progressing from Elementary through Junior High and High School in the Garden Estate world"
            />
          </a>
          <p className="featureCaption">
            <strong>Learn vocabulary</strong> · Earn Estate Credits · Grow your garden, estate and accomplishments
          </p>
        </div>

        <div className="stageStory">
          {stages.map((stage) => (
            <article className="stageCard" key={stage.name}>
              <div className="stageNum">{stage.number} · {stage.name.toUpperCase()}</div>
              <h3>{stage.name} — <span>{stage.subtitle}</span></h3>
              <p>{stage.copy}</p>
            </article>
          ))}
        </div>

        <p className="promise">The more you learn, the more your world grows.</p>

        <div className="moreHead">
          <h2>More learning journeys.</h2>
          <p>Math, speech, English practice and communication support remain easy to find.</p>
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
        <div className="back"><a href="/welcome">← Return to ECCOOZS</a></div>
      </section>
    </main>
  );
}
