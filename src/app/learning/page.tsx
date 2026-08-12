import type {Metadata} from "next";
import {mathTrailPresentation, voiceJourneyAdultPresentation, voiceJourneyYouthPresentation} from "@/components/learning/presentationAssets";

export const metadata:Metadata={
  title:"ECCOOZS Learning Apps",
  description:"Math Trail, My Voice Journey Youth, and My Voice Journey for adults."
};

const apps=[
  {
    href:"/apps/math-trail",
    image:mathTrailPresentation,
    alt:"Math Trail presentation with Trail Fox, grade paths, practice tools, and progress dashboard",
    kicker:"GRADES 1–6 · MATH",
    title:"Math Trail",
    copy:"A guided math learning adventure with Trail Check, six grade trails, practice sheets, times tables, Division Lab, progress and parent reporting.",
    tone:"math"
  },
  {
    href:"/apps/my-voice-journey-youth",
    image:voiceJourneyYouthPresentation,
    alt:"My Voice Journey Youth presentation with Leo and Learning to Speak",
    kicker:"YOUTH · SPEECH & COMMUNICATION",
    title:"My Voice Journey Youth",
    copy:"The Leo-led Learning to Speak experience: hear words, choose answers, build sentences, practice conversations and grow communication confidence step by step.",
    tone:"youth"
  },
  {
    href:"/apps/my-voice-journey",
    image:voiceJourneyAdultPresentation,
    alt:"My Voice Journey adult presentation for English Practice and My Words",
    kicker:"ADULTS · ENGLISH & COMMUNICATION",
    title:"My Voice Journey",
    copy:"A mature communication experience for real-world English practice, vocabulary, speaking confidence, conversation support and the My Words communication board.",
    tone:"adult"
  }
] as const;

export default function Learning(){
  return <main className="learn"><style>{`
    *{box-sizing:border-box}.learn{margin:0;min-height:100vh;font-family:Arial,sans-serif;color:#071240;background:#f7f9ff}.nav{height:72px;padding:0 5%;display:flex;align-items:center;justify-content:space-between;background:#fff;border-bottom:1px solid #e7ebf5;position:sticky;top:0;z-index:20}.brand{display:flex;align-items:center;gap:11px;font-weight:950;letter-spacing:.055em}.brand img{width:36px;height:36px}.brand span{font-size:13px;color:#6070a0;letter-spacing:.14em}.nav a{color:#071240;text-decoration:none;font-weight:800}.hero{position:relative;min-height:430px;display:flex;align-items:center;overflow:hidden;background:#071240}.hero:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,12,28,.95),rgba(7,18,64,.73),rgba(7,18,64,.18)),url('/learning-assets/math-trail/asset-07.webp') center/cover}.hi{position:relative;z-index:1;width:100%;max-width:1240px;margin:auto;padding:76px 5%;color:#fff}.k{font-size:12px;letter-spacing:.2em;font-weight:900;color:#8ca4ff}.hi h1{font-family:Georgia,serif;font-size:clamp(3.3rem,7vw,6.6rem);line-height:.91;margin:12px 0 19px}.hi p{max-width:680px;color:rgba(255,255,255,.68);font-size:18px;line-height:1.72}.main{max-width:1240px;margin:auto;padding:62px 5% 90px}.main h2{font-family:Georgia,serif;font-size:42px;margin:0 0 9px}.lead{color:#607ab5;line-height:1.7;margin:0 0 31px;max-width:760px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:#fff;border:1px solid #e1e7f3;border-radius:24px;overflow:hidden;box-shadow:0 18px 54px #07124012;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s}.card:hover{transform:translateY(-4px);box-shadow:0 24px 68px #07124020}.visual{aspect-ratio:4/3;overflow:hidden;background:#eef3ff}.visual img{width:100%;height:100%;object-fit:cover;display:block}.body{padding:23px;display:flex;flex-direction:column;flex:1}.label{font-size:11px;font-weight:950;letter-spacing:.12em;color:#1f47e0}.card.youth .label{color:#7140d9}.card.adult .label{color:#5545a5}.body h3{font-size:27px;margin:8px 0}.body p{color:#607ab5;line-height:1.65;font-size:14px;flex:1}.actions{margin-top:18px}.btn{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:11px;text-decoration:none;font-weight:900;color:#fff;background:#1f47e0}.card.youth .btn{background:#7140d9}.card.adult .btn{background:#30236f}.note{margin-top:28px;padding:18px 20px;border:1px solid #e1e7f3;border-radius:16px;background:#fff;color:#607ab5;line-height:1.65}.back{margin-top:32px;text-align:center}.back a{color:#1f47e0;font-weight:850;text-decoration:none}@media(max-width:1000px){.grid{grid-template-columns:1fr 1fr}.card.adult{grid-column:1/-1;max-width:600px}}@media(max-width:720px){.grid{grid-template-columns:1fr}.card.adult{grid-column:auto;max-width:none}.nav{padding:0 4%}.brand span{display:none}.hi{padding:60px 6%}.main{padding:46px 5% 72px}}
  `}</style>
  <nav className="nav"><div className="brand"><img src="/icon.svg" alt="ECCOOZS"/><div>ECCOOZS <span>LEARNING APPS</span></div></div><a href="/welcome">Back to ECCOOZS</a></nav>
  <section className="hero"><div className="hi"><div className="k">ECCOOZS LEARNING APPS</div><h1>Explore. Practice.<br/>Grow.</h1><p>Purpose-built learning and communication tools with clear audiences. Math Trail supports grades 1–6. My Voice Journey now has a dedicated youth experience and a separate adult experience.</p></div></section>
  <section className="main"><h2>Choose the right journey.</h2><p className="lead">Each app opens directly in the browser. The youth and adult Voice Journey experiences share proven communication tools underneath while keeping their interfaces and goals distinct.</p><div className="grid">
    {apps.map(app=><article className={`card ${app.tone}`} key={app.href}><div className="visual"><img src={app.image} alt={app.alt}/></div><div className="body"><div className="label">{app.kicker}</div><h3>{app.title}</h3><p>{app.copy}</p><div className="actions"><a className="btn" href={app.href}>Open App →</a></div></div></article>)}
  </div><div className="note"><strong>My Voice Journey split:</strong> Youth opens directly into Learning to Speak with Leo. Adults open into English Practice and can move between English Practice and My Words without entering the youth experience.</div><div className="back"><a href="/welcome">← Return to ECCOOZS</a></div></section>
  </main>;
}
