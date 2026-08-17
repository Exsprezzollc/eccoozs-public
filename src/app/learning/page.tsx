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
    copy: "Words are introduced in small, clear steps before the learner is asked to use them.",
  },
  {
    name: "Junior High",
    subtitle: "Discover & Reason",
    copy: "Learners strengthen spelling, distinguish similar meanings, repair misconceptions, and use vocabulary more independently.",
  },
  {
    name: "High School",
    subtitle: "Apply & Decide",
    copy: "Advanced vocabulary becomes a tool for understanding evidence, communicating clearly, and making thoughtful real-world decisions.",
  },
] as const;

export default function Learning() {
  return (
    <main className="learn">
      <style>{`
        *{box-sizing:border-box}.learn{margin:0;min-height:100vh;font-family:Arial,sans-serif;color:#071240;background:#f7f9ff}.nav{height:76px;padding:0 5%;display:flex;align-items:center;justify-content:space-between;background:#fff;border-bottom:1px solid #e7ebf5;position:sticky;top:0;z-index:20}.brand{display:flex;align-items:center;gap:15px}.brandLogo{display:block;width:156px;height:auto}.brand span{font-size:13px;font-weight:900;color:#6070a0;letter-spacing:.16em;white-space:nowrap}.nav a{color:#071240;text-decoration:none;font-weight:800}.hero{position:relative;min-height:430px;display:flex;align-items:center;overflow:hidden;background:#071240}.hero:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,12,28,.95),rgba(7,18,64,.73),rgba(7,18,64,.18)),url('/learning-assets/math-trail/asset-07.webp') center/cover}.hi{position:relative;z-index:1;width:100%;max-width:1240px;margin:auto;padding:76px 5%;color:#fff}.k{font-size:12px;letter-spacing:.2em;font-weight:900;color:#8ca4ff}.hi h1{font-family:Georgia,serif;font-size:clamp(3.3rem,7vw,6.6rem);line-height:.91;margin:12px 0 19px}.hi p{max-width:720px;color:rgba(255,255,255,.72);font-size:18px;line-height:1.72}.main{max-width:1240px;margin:auto;padding:62px 5% 90px}.mainHead h2{font-family:Georgia,serif;font-size:42px;margin:0 0 9px}.lead{color:#607ab5;line-height:1.7;margin:0 0 31px;max-width:800px}.feature{position:relative;overflow:hidden;border-radius:30px;background:linear-gradient(135deg,#07241f 0%,#0b332b 48%,#173f31 100%);color:#fff;box-shadow:0 28px 80px rgba(7,18,64,.22);border:1px solid rgba(218,180,88,.35);margin:0 0 58px}.feature:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 78% 18%,rgba(226,187,88,.18),transparent 34%);pointer-events:none}.featureGrid{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(380px,.95fr);min-height:570px}.featureCopy{padding:54px 50px 50px;display:flex;flex-direction:column;justify-content:center;z-index:2}.featureKicker{font-size:12px;font-weight:950;letter-spacing:.2em;color:#e0bc66;margin-bottom:15px}.feature h2{font-family:Georgia,serif;font-size:clamp(3rem,5vw,5rem);line-height:.98;margin:0 0 14px;max-width:620px}.featureIntro{font-size:20px;line-height:1.55;color:rgba(255,255,255,.84);max-width:610px;margin:0 0 27px}.stageList{display:grid;gap:13px;margin-bottom:28px}.stage{padding:14px 16px;border-radius:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1)}.stageTitle{font-weight:900;font-size:15px;color:#fff}.stageTitle span{color:#e5c36e}.stage p{margin:5px 0 0;color:rgba(255,255,255,.73);font-size:14px;line-height:1.5}.play{display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;min-height:54px;padding:0 24px;border-radius:12px;background:#e1b956;color:#12251f;text-decoration:none;font-weight:950;letter-spacing:.015em;box-shadow:0 12px 30px rgba(0,0,0,.22);transition:transform .2s,filter .2s}.play:hover{transform:translateY(-2px);filter:brightness(1.05)}.featureNote{margin:17px 0 0;color:rgba(255,255,255,.68);font-size:13px;line-height:1.55}.featureVisual{position:relative;min-height:570px;overflow:hidden}.featureVisual:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0d3028 0%,rgba(13,48,40,.2) 28%,rgba(13,48,40,.05)),url('/apps/vocabulary-adventure/assets/elementary-orchard.avif') center/cover;transform:scale(1.02)}.featureVisual:after{content:'';position:absolute;inset:auto 0 0;height:44%;background:linear-gradient(transparent,rgba(4,20,17,.72))}.learners{position:absolute;z-index:2;right:1%;bottom:-5%;width:min(58%,390px);height:auto;filter:drop-shadow(0 18px 25px rgba(0,0,0,.35))}.growth{position:absolute;z-index:3;left:26px;right:26px;bottom:22px;padding:15px 17px;border-radius:16px;background:rgba(5,26,22,.82);border:1px solid rgba(230,196,113,.3);backdrop-filter:blur(8px)}.growth strong{display:block;color:#f0d58d;font-size:14px;margin-bottom:7px}.growthPath{display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:#fff;font-size:12px;font-weight:800}.growthPath i{font-style:normal;color:#e0bc66}.promise{font-family:Georgia,serif;text-align:center;color:#12372e;font-size:clamp(1.65rem,3vw,2.5rem);margin:0 0 52px}.moreHead{margin-bottom:26px}.moreHead h2{font-family:Georgia,serif;font-size:38px;margin:0 0 8px}.moreHead p{color:#607ab5;line-height:1.65;margin:0}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:#fff;border:1px solid #e1e7f3;border-radius:24px;overflow:hidden;box-shadow:0 18px 54px #07124012;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s}.card:hover{transform:translateY(-4px);box-shadow:0 24px 68px #07124020}.visual{aspect-ratio:4/3;overflow:hidden;background:#eef3ff}.visual img{width:100%;height:100%;object-fit:cover;display:block}.body{padding:23px;display:flex;flex-direction:column;flex:1}.label{font-size:11px;font-weight:950;letter-spacing:.12em;color:#1f47e0}.card.youth .label{color:#7140d9}.card.adult .label{color:#5545a5}.body h3{font-size:27px;margin:8px 0}.body p{color:#607ab5;line-height:1.65;font-size:14px;flex:1}.actions{margin-top:18px}.btn{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:11px;text-decoration:none;font-weight:900;color:#fff;background:#1f47e0}.card.youth .btn{background:#7140d9}.card.adult .btn{background:#30236f}.note{margin-top:28px;padding:18px 20px;border:1px solid #e1e7f3;border-radius:16px;background:#fff;color:#607ab5;line-height:1.65}.back{margin-top:32px;text-align:center}.back a{color:#1f47e0;font-weight:850;text-decoration:none}@media(max-width:1000px){.featureGrid{grid-template-columns:1fr}.featureVisual{min-height:430px}.grid{grid-template-columns:1fr 1fr}.card.adult{grid-column:1/-1;max-width:600px}}@media(max-width:720px){.grid{grid-template-columns:1fr}.card.adult{grid-column:auto;max-width:none}.nav{padding:0 4%;height:70px}.brand{gap:10px}.brandLogo{width:134px}.brand span{font-size:11px;letter-spacing:.12em}.hi{padding:60px 6%}.main{padding:46px 5% 72px}.featureCopy{padding:42px 28px 35px}.featureVisual{min-height:360px}.learners{width:min(52%,300px)}.growth{left:18px;right:18px;bottom:16px}}@media(max-width:470px){.brand span{display:none}.brandLogo{width:142px}.nav a{font-size:14px}.feature{border-radius:22px}.featureCopy{padding:36px 22px 30px}.featureIntro{font-size:17px}.stage{padding:12px 13px}.play{width:100%;padding:0 14px}.featureVisual{min-height:330px}.learners{right:-7%;width:62%}.growthPath{font-size:11px}}
      `}</style>

      <nav className="nav">
        <div className="brand">
          <HeaderLogo width={156} className="brandLogo" />
          <span>LEARNING APPS</span>
        </div>
        <a href="/welcome">Back to ECCOOZS</a>
      </nav>

      <section className="hero">
        <div className="hi">
          <div className="k">ECCOOZS LEARNING APPS</div>
          <h1>Explore. Practice.<br />Grow.</h1>
          <p>
            Purpose-built learning and communication tools that teach clearly,
            build confidence, and grow with the learner.
          </p>
        </div>
      </section>

      <section className="main">
        <div className="mainHead">
          <h2>Choose the right journey.</h2>
          <p className="lead">
            Start with our featured vocabulary experience, or continue to the
            math and communication apps below. Each opens directly in the browser.
          </p>
        </div>

        <article className="feature">
          <div className="featureGrid">
            <div className="featureCopy">
              <div className="featureKicker">ECCOOZS VOCABULARY ADVENTURE</div>
              <h2>Learn words.<br />Build your world.</h2>
              <p className="featureIntro">
                One vocabulary adventure that grows with the learner.
              </p>

              <div className="stageList">
                {stages.map((stage) => (
                  <div className="stage" key={stage.name}>
                    <div className="stageTitle">
                      {stage.name} — <span>{stage.subtitle}</span>
                    </div>
                    <p>{stage.copy}</p>
                  </div>
                ))}
              </div>

              <a className="play" href="/apps/vocabulary-adventure">
                PLAY VOCABULARY ADVENTURE →
              </a>
              <p className="featureNote">
                Learn vocabulary · Earn Estate Credits · Grow your garden,
                estate and accomplishments
              </p>
            </div>

            <div className="featureVisual" aria-label="Vocabulary Adventure garden world">
              <img
                className="learners"
                src="/apps/vocabulary-adventure/assets/learner-pair.avif"
                alt="Two Vocabulary Adventure learners"
              />
              <div className="growth">
                <strong>Your learning changes the world around you.</strong>
                <div className="growthPath">
                  <span>Cottage Garden</span><i>→</i><span>Garden Estate</span><i>→</i><span>Professional Projects</span>
                </div>
              </div>
            </div>
          </div>
        </article>

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
