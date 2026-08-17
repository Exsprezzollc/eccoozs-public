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
    name: "Elementary",
    subtitle: "Explore & Learn",
    copy: "Meet new words in clear, guided steps and begin growing the Cottage Garden.",
  },
  {
    name: "Junior High",
    subtitle: "Discover & Reason",
    copy: "Strengthen spelling, meaning, contrast and independent word use as the Garden Estate expands.",
  },
  {
    name: "High School",
    subtitle: "Apply & Decide",
    copy: "Use advanced vocabulary to evaluate evidence, explain decisions and complete real-world projects.",
  },
] as const;

export default function Learning() {
  return (
    <main className="learn">
      <style>{`
        *{box-sizing:border-box}.learn{margin:0;min-height:100vh;font-family:Arial,sans-serif;color:#071240;background:linear-gradient(180deg,#f8faff 0%,#fffdf8 48%,#f7f9ff 100%)}
        .nav{height:76px;padding:0 5%;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.96);border-bottom:1px solid #e7ebf5;position:sticky;top:0;z-index:30;backdrop-filter:blur(12px)}.brand{display:flex;align-items:center;gap:15px}.brandLogo{display:block;width:156px;height:auto}.brand span{font-size:13px;font-weight:900;color:#6070a0;letter-spacing:.16em;white-space:nowrap}.nav a{color:#071240;text-decoration:none;font-weight:800}
        .intro{position:relative;overflow:hidden;text-align:center;padding:58px 5% 44px;background:radial-gradient(circle at 20% 0%,rgba(53,101,238,.09),transparent 35%),radial-gradient(circle at 82% 10%,rgba(96,171,117,.1),transparent 30%)}.introKicker{font-size:12px;letter-spacing:.22em;font-weight:950;color:#1f47e0}.intro h1{font-family:Georgia,serif;font-size:clamp(3rem,5.8vw,5.25rem);line-height:.96;margin:12px 0 16px;color:#071240}.intro p{max-width:850px;margin:0 auto;color:#607ab5;font-size:18px;line-height:1.65}
        .main{max-width:1320px;margin:auto;padding:28px 4% 90px}.feature{position:relative;min-height:690px;overflow:hidden;border-radius:34px;background:linear-gradient(90deg,rgba(255,251,239,.98) 0%,rgba(255,251,239,.92) 27%,rgba(255,251,239,.5) 43%,rgba(255,251,239,.08) 62%,rgba(255,251,239,0) 100%),url('/apps/vocabulary-adventure/assets/garden-house.avif') center/cover no-repeat;box-shadow:0 30px 85px rgba(24,54,47,.2);border:1px solid rgba(86,119,74,.2);isolation:isolate}.feature:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.16),transparent 52%,rgba(6,25,21,.66) 100%);z-index:1;pointer-events:none}.featureCopy{position:absolute;z-index:8;top:48px;left:52px;width:min(585px,48%)}.featureKicker{font-size:13px;font-weight:950;letter-spacing:.15em;color:#174f3d;margin-bottom:13px}.feature h2{font-family:Georgia,serif;font-size:clamp(3.5rem,5.8vw,5.8rem);line-height:.9;letter-spacing:-.035em;margin:0;color:#0b2b22;text-shadow:0 2px 20px rgba(255,255,255,.55)}.journeyLine{font-size:17px;font-weight:850;color:#184d3b;margin:18px 0 20px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}.journeyLine i{font-style:normal;color:#c88732;font-size:20px}.featureIntro{font-size:17px;line-height:1.55;color:#405f55;max-width:500px;margin:0 0 20px}.play{display:inline-flex;align-items:center;justify-content:center;min-height:56px;padding:0 25px;border-radius:999px;background:#174f3d;color:#fff;text-decoration:none;font-weight:950;letter-spacing:.01em;border:2px solid #d6a64c;box-shadow:0 13px 30px rgba(13,55,43,.23);transition:transform .2s,box-shadow .2s}.play:hover{transform:translateY(-2px);box-shadow:0 17px 34px rgba(13,55,43,.28)}.featureNote{margin:13px 0 0;color:#4d695f;font-size:13px;font-weight:700}
        .pair{position:absolute;z-index:4;height:auto;object-fit:contain;filter:drop-shadow(0 18px 20px rgba(0,0,0,.25));pointer-events:none}.pairElementary{left:3.5%;bottom:-7%;width:27%;max-width:335px}.pairJunior{left:42%;bottom:-5%;width:23%;max-width:295px}.pairHigh{right:2.5%;bottom:-7%;width:27%;max-width:330px}.stageLabels{position:absolute;z-index:9;left:0;right:0;bottom:20px;display:grid;grid-template-columns:1fr 1fr 1fr;padding:0 4.5%;pointer-events:none}.stageLabel{font-family:Georgia,serif;color:#fff;font-size:20px;text-shadow:0 2px 10px rgba(0,0,0,.8);display:flex;align-items:center;gap:9px}.stageLabel:nth-child(2){justify-content:center}.stageLabel:nth-child(3){justify-content:flex-end}.stageLabel b{font-family:Arial,sans-serif;color:#efc76d;font-size:11px;letter-spacing:.14em;text-transform:uppercase}
        .stageStory{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin:20px 0 58px}.stageCard{position:relative;padding:20px 22px 21px;border-radius:19px;background:rgba(255,255,255,.9);border:1px solid #e0e8df;box-shadow:0 12px 36px rgba(24,54,47,.08)}.stageCard:before{content:'';position:absolute;top:0;left:22px;width:46px;height:3px;background:#d3a44a;border-radius:0 0 4px 4px}.stageNum{font-size:10px;letter-spacing:.17em;font-weight:950;color:#72917f}.stageCard h3{margin:7px 0 5px;color:#153d32;font-size:18px}.stageCard h3 span{color:#b47a29}.stageCard p{margin:0;color:#667d75;font-size:13px;line-height:1.55}.promise{font-family:Georgia,serif;text-align:center;color:#12372e;font-size:clamp(1.75rem,3vw,2.7rem);margin:0 0 58px}.moreHead{text-align:center;margin-bottom:28px}.moreHead h2{font-family:Georgia,serif;font-size:42px;margin:0 0 8px}.moreHead p{color:#607ab5;line-height:1.65;margin:0}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:#fff;border:1px solid #e1e7f3;border-radius:24px;overflow:hidden;box-shadow:0 18px 54px #07124012;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s}.card:hover{transform:translateY(-4px);box-shadow:0 24px 68px #07124020}.visual{aspect-ratio:4/3;overflow:hidden;background:#eef3ff}.visual img{width:100%;height:100%;object-fit:cover;display:block}.body{padding:23px;display:flex;flex-direction:column;flex:1}.label{font-size:11px;font-weight:950;letter-spacing:.12em;color:#1f47e0}.card.youth .label{color:#7140d9}.card.adult .label{color:#5545a5}.body h3{font-size:27px;margin:8px 0}.body p{color:#607ab5;line-height:1.65;font-size:14px;flex:1}.actions{margin-top:18px}.btn{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:11px;text-decoration:none;font-weight:900;color:#fff;background:#1f47e0}.card.youth .btn{background:#7140d9}.card.adult .btn{background:#30236f}.note{margin-top:28px;padding:18px 20px;border:1px solid #e1e7f3;border-radius:16px;background:#fff;color:#607ab5;line-height:1.65}.back{margin-top:32px;text-align:center}.back a{color:#1f47e0;font-weight:850;text-decoration:none}
        @media(max-width:1050px){.feature{min-height:650px}.featureCopy{width:56%}.pairElementary{width:30%;left:1%}.pairJunior{width:26%;left:39%}.pairHigh{width:30%;right:0}.grid{grid-template-columns:1fr 1fr}.card.adult{grid-column:1/-1;max-width:620px;margin:auto}}
        @media(max-width:760px){.nav{padding:0 4%;height:70px}.brand{gap:10px}.brandLogo{width:134px}.brand span{font-size:11px;letter-spacing:.12em}.intro{padding:46px 6% 34px}.intro p{font-size:16px}.main{padding:20px 4% 72px}.feature{min-height:700px;border-radius:24px;background:linear-gradient(180deg,rgba(255,251,239,.97) 0%,rgba(255,251,239,.86) 34%,rgba(255,251,239,.08) 59%,rgba(4,24,19,.12) 100%),url('/apps/vocabulary-adventure/assets/garden-house.avif') 48% center/cover no-repeat}.featureCopy{top:30px;left:25px;right:25px;width:auto}.feature h2{font-size:clamp(3.1rem,13vw,4.6rem)}.journeyLine{font-size:14px;gap:7px}.featureIntro{max-width:430px;font-size:15px}.pairElementary{left:-5%;bottom:-4%;width:43%}.pairJunior{left:32%;bottom:-2%;width:38%}.pairHigh{right:-8%;bottom:-4%;width:42%}.stageLabels{padding:0 3%;bottom:14px}.stageLabel{font-size:14px}.stageLabel b{display:none}.stageStory{grid-template-columns:1fr;margin-bottom:48px}.grid{grid-template-columns:1fr}.card.adult{grid-column:auto;max-width:none}}
        @media(max-width:500px){.brand span{display:none}.brandLogo{width:142px}.nav a{font-size:14px}.intro h1{font-size:3.15rem}.feature{min-height:650px}.featureCopy{left:20px;right:20px}.feature h2{font-size:3.35rem}.featureIntro{display:none}.play{width:100%;min-height:52px;padding:0 14px}.featureNote{font-size:11px}.pairElementary{width:47%;left:-8%}.pairJunior{width:42%;left:29%}.pairHigh{width:47%;right:-11%}.stageLabel{font-size:12px}.stageLabels{bottom:11px}.stageStory{gap:10px}.stageCard{padding:18px}.moreHead h2{font-size:34px}}
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
          Friendly learning tools that teach clearly, build confidence, and
          grow with the learner — from first foundations to real-world application.
        </p>
      </section>

      <section className="main">
        <article className="feature" aria-label="ECCOOZS Vocabulary Adventure featured learning experience">
          <div className="featureCopy">
            <div className="featureKicker">ECCOOZS VOCABULARY ADVENTURE</div>
            <h2>Learn words.<br />Build your world.</h2>
            <div className="journeyLine">
              <span>Cottage Garden</span><i>→</i><span>Garden Estate</span><i>→</i><span>Real-World Growth</span>
            </div>
            <p className="featureIntro">
              One vocabulary adventure that grows from guided discovery to
              independent reasoning and applied decision-making.
            </p>
            <a className="play" href="/apps/vocabulary-adventure">
              PLAY VOCABULARY ADVENTURE →
            </a>
            <p className="featureNote">Learn vocabulary · Earn Estate Credits · Grow your world</p>
          </div>

          <img className="pair pairElementary" src="/apps/vocabulary-adventure/assets/elementary-pair.avif" alt="Elementary Vocabulary Adventure learner pair" />
          <img className="pair pairJunior" src="/apps/vocabulary-adventure/assets/learner-pair.avif" alt="Junior High Vocabulary Adventure learner pair" />
          <img className="pair pairHigh" src="/apps/vocabulary-adventure/assets/high-school-pair.avif" alt="High School Vocabulary Adventure learner pair" />

          <div className="stageLabels" aria-hidden="true">
            <div className="stageLabel"><b>01</b> Elementary</div>
            <div className="stageLabel"><b>02</b> Junior High</div>
            <div className="stageLabel"><b>03</b> High School</div>
          </div>
        </article>

        <div className="stageStory">
          {stages.map((stage, index) => (
            <div className="stageCard" key={stage.name}>
              <div className="stageNum">0{index + 1} · {stage.name.toUpperCase()}</div>
              <h3>{stage.name} — <span>{stage.subtitle}</span></h3>
              <p>{stage.copy}</p>
            </div>
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
