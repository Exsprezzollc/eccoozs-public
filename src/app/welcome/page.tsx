import type { Metadata } from "next";
import HeaderLogo from "@/components/brand/HeaderLogo";
import { MarketingIcon as Icon } from "@/components/marketing/MarketingIcon";
import { RevealInit } from "@/components/marketing/RevealInit";
import { WaitlistForm } from "@/components/marketing/WaitlistForm";

const styles = String.raw`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--night:#040c1c;--navy:#071240;--navy2:#0b1a3e;--blue:#1f47e0;--blueL:#5c7dff;--blueD:#1738b8;--cream:#f4f6fb;--white:#fff;--text:#07102a;--muted:#607ab5;--border:rgba(7,18,64,.09)}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}

.welcome-nav{position:fixed;inset:0 0 auto 0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:1rem;height:68px;padding:0 4%;background:rgba(4,12,28,.95);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.10)}
.nav-logo{display:flex;align-items:center;min-width:170px}.nav-logo img{max-width:170px;height:auto}
.nav-links{list-style:none;display:flex;align-items:center;justify-content:center;gap:1.35rem;flex:1}.nav-links a{font-size:.77rem;font-weight:600;color:rgba(255,255,255,.58);white-space:nowrap}.nav-links a:hover,.nav-links a.active{color:#fff}.nav-links a.active{position:relative}.nav-links a.active::after{content:'';position:absolute;left:0;right:0;bottom:-8px;height:2px;background:var(--blueL);border-radius:2px}
.nav-join{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 17px;border-radius:9px;background:var(--blue);color:#fff;font-size:.76rem;font-weight:700;white-space:nowrap}.nav-join:hover{background:var(--blueD)}

#hero{min-height:760px;position:relative;display:flex;align-items:center;overflow:hidden;padding-top:68px;background:var(--night)}
.hero-photo{position:absolute;inset:68px 0 0 0}.hero-photo img{width:100%;height:100%;object-fit:cover;object-position:center top}.hero-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,12,28,.98) 0%,rgba(5,15,38,.92) 30%,rgba(5,15,38,.67) 53%,rgba(4,12,28,.25) 78%,rgba(4,12,28,.10) 100%)}
.hero-inner{position:relative;z-index:2;width:100%;max-width:1280px;margin:0 auto;padding:7rem 5% 11rem}.eyebrow{display:flex;align-items:center;gap:9px;font-size:.69rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--blueL);margin-bottom:1rem}.eyebrow::before{content:'';width:22px;height:2px;background:var(--blueL)}
.hero-welcome{font-size:clamp(1.45rem,2.4vw,2.1rem);font-weight:400;color:rgba(255,255,255,.86);margin-bottom:.15rem}.hero-title{font-size:clamp(3.5rem,7.2vw,6.5rem);font-weight:800;letter-spacing:.025em;line-height:.92;color:#fff;text-transform:uppercase;margin-bottom:1rem}.hero-title span{color:var(--blueL)}
.hero-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(1.15rem,2vw,1.45rem);font-weight:600;color:rgba(255,255,255,.76);margin-bottom:1.2rem}.hero-copy{max-width:560px;font-size:.98rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,.58);margin-bottom:2rem}.hero-actions{display:flex;gap:.75rem;flex-wrap:wrap}.btn-primary,.btn-secondary{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:0 20px;border-radius:10px;font-size:.84rem;font-weight:700}.btn-primary{background:var(--blue);color:#fff}.btn-primary:hover{background:var(--blueD)}.btn-secondary{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);color:#fff}.btn-secondary:hover{background:rgba(255,255,255,.13)}
.hero-strip{position:absolute;z-index:3;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(4,1fr);background:rgba(4,12,28,.94);backdrop-filter:blur(18px);border-top:1px solid rgba(92,125,255,.22)}.hero-chip{display:flex;gap:.8rem;align-items:center;padding:1.2rem 1.45rem;border-right:1px solid rgba(92,125,255,.15)}.hero-chip:last-child{border-right:none}.chip-icon{width:39px;height:39px;border-radius:10px;background:rgba(31,71,224,.16);display:grid;place-items:center;color:var(--blueL);flex:0 0 auto}.chip-icon svg{width:18px;height:18px}.chip-title{font-size:.78rem;font-weight:700;color:#fff;letter-spacing:.04em}.chip-copy{font-size:.68rem;line-height:1.45;color:rgba(255,255,255,.42);margin-top:2px}

.ticker{background:var(--navy2);overflow:hidden;padding:1rem 0}.ticker-track{display:flex;gap:2.3rem;white-space:nowrap;animation:tick 30s linear infinite;width:max-content}.ticker-item{display:flex;align-items:center;gap:7px;color:rgba(255,255,255,.48);font-size:.72rem;font-weight:600;letter-spacing:.04em}.ticker-item svg{width:13px;height:13px;opacity:.7}@keyframes tick{to{transform:translateX(-50%)}}

section{padding:7.5rem 5%}.section-inner{max-width:1180px;margin:0 auto}.section-top{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;margin-bottom:3.2rem}.section-kicker{display:flex;align-items:center;gap:8px;font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);margin-bottom:.75rem}.section-kicker::before{content:'';width:17px;height:2px;background:var(--blue)}.section-kicker.light{color:var(--blueL)}.section-kicker.light::before{background:var(--blueL)}
h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2.35rem,4.4vw,3.8rem);line-height:1.05;font-weight:700}.section-copy{max-width:520px;color:var(--muted);font-size:.94rem;line-height:1.8}.light{color:#fff}.section-copy.light{color:rgba(255,255,255,.53)}

#platform{background:var(--cream)}.platform-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:22px;overflow:hidden}.feature-card{background:var(--cream);padding:2.15rem 1.9rem;min-height:220px;transition:background .2s}.feature-card:hover{background:#fff}.feature-icon{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;background:rgba(31,71,224,.10);color:var(--blue);margin-bottom:1rem}.feature-icon.alt{background:rgba(7,18,64,.07);color:var(--navy)}.feature-icon svg{width:22px;height:22px}.feature-title{font-size:1rem;font-weight:700;margin-bottom:.45rem}.feature-copy{font-size:.83rem;line-height:1.72;color:var(--muted)}

#experience{background:var(--night);position:relative;overflow:hidden}.experience-grid{display:grid;grid-template-columns:.78fr 1.22fr;gap:4rem;align-items:center}.experience-panel{background:linear-gradient(145deg,#091630,#0b1a3e);border:1px solid rgba(92,125,255,.22);border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.42)}.panel-top{height:42px;display:flex;align-items:center;gap:6px;padding:0 15px;border-bottom:1px solid rgba(255,255,255,.08)}.dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2)}.panel-body{padding:1rem;display:grid;grid-template-columns:145px 1fr;min-height:390px}.mock-nav{border-right:1px solid rgba(255,255,255,.07);padding:1rem .8rem}.mock-wordmark{width:98px;margin-bottom:1.5rem}.mock-link{padding:.62rem .65rem;border-radius:8px;color:rgba(255,255,255,.48);font-size:.69rem;font-weight:600;margin-bottom:.35rem}.mock-link.active{background:rgba(31,71,224,.16);color:#fff}.mock-main{padding:1rem 1.1rem}.mock-head{display:flex;justify-content:space-between;gap:1rem;align-items:center;margin-bottom:1rem}.mock-head strong{color:#fff;font-size:.9rem}.search-pill{height:30px;min-width:170px;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:rgba(255,255,255,.3);font-size:.61rem;display:flex;align-items:center;padding:0 10px}.mock-hero{height:135px;border-radius:14px;background:radial-gradient(circle at 75% 30%,rgba(92,125,255,.22),transparent 28%),linear-gradient(135deg,#0c214f,#0a142c);border:1px solid rgba(92,125,255,.18);padding:1.2rem;display:flex;flex-direction:column;justify-content:flex-end}.mock-hero small{color:var(--blueL);font-size:.57rem;text-transform:uppercase;letter-spacing:.15em;font-weight:700}.mock-hero b{color:#fff;font-family:'Cormorant Garamond',serif;font-size:1.45rem;margin-top:.25rem}.mock-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:.65rem;margin-top:.65rem}.mock-card{height:95px;border-radius:11px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);padding:.75rem}.mock-card strong{display:block;color:#fff;font-size:.64rem;margin-bottom:.3rem}.mock-card span{font-size:.55rem;line-height:1.45;color:rgba(255,255,255,.34)}
.experience-list{display:grid;gap:.8rem;margin-top:1.8rem}.experience-item{display:flex;gap:.9rem;align-items:flex-start;padding:1rem 0;border-top:1px solid rgba(255,255,255,.08)}.experience-item:first-child{border-top:none}.exp-num{font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:var(--blueL);line-height:1}.experience-item strong{display:block;color:#fff;font-size:.86rem;margin-bottom:.2rem}.experience-item p{color:rgba(255,255,255,.45);font-size:.78rem;line-height:1.55}

#business{background:#fff}.business-shell{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}.business-card{border-radius:22px;border:1px solid var(--border);padding:2.2rem;background:linear-gradient(180deg,#fff,#f7f9ff)}.business-card.dark-card{background:var(--navy);color:#fff;border-color:transparent}.business-card h3{font-family:'Cormorant Garamond',serif;font-size:2rem;margin-bottom:.65rem}.business-card p{color:var(--muted);font-size:.85rem;line-height:1.72}.dark-card p{color:rgba(255,255,255,.5)}.tier-row{display:grid;grid-template-columns:auto 1fr auto;gap:.9rem;align-items:center;padding:.95rem 0;border-top:1px solid var(--border)}.tier-row:first-of-type{margin-top:1.2rem}.tier-badge{width:33px;height:33px;object-fit:contain}.tier-name{font-size:.79rem;font-weight:700}.tier-desc{font-size:.68rem;color:var(--muted);margin-top:1px}.tier-price{font-size:.74rem;font-weight:700;color:var(--blue)}.dark-card .tier-row{border-color:rgba(255,255,255,.09)}.dark-card .tier-desc{color:rgba(255,255,255,.4)}

#learning{background:linear-gradient(135deg,#071240 0%,#0a1838 50%,#07102a 100%);position:relative;overflow:hidden}.learning-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-top:2.5rem}.learn-card{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:2rem;position:relative;overflow:hidden}.learn-card::after{content:'';position:absolute;width:220px;height:220px;border-radius:50%;right:-80px;top:-90px;background:radial-gradient(rgba(92,125,255,.18),transparent 68%)}.learn-num{font-family:'Cormorant Garamond',serif;color:rgba(255,255,255,.12);font-size:5rem;line-height:.8;position:absolute;right:1.3rem;top:1.2rem}.learn-kicker{font-size:.64rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--blueL);margin-bottom:.55rem}.learn-card h3{font-family:'Cormorant Garamond',serif;font-size:2.25rem;color:#fff;margin-bottom:.55rem}.learn-card p{position:relative;z-index:1;color:rgba(255,255,255,.5);font-size:.82rem;line-height:1.7;max-width:460px}.learn-tags{display:flex;gap:.45rem;flex-wrap:wrap;margin:1.1rem 0 1.35rem}.learn-tags span{font-size:.65rem;font-weight:600;color:#dce5ff;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.05);padding:.42rem .62rem;border-radius:999px}.learn-actions{display:flex;gap:.6rem;flex-wrap:wrap}.learn-open,.learn-download{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 13px;border-radius:8px;font-size:.73rem;font-weight:700}.learn-open{background:var(--blue);color:#fff}.learn-download{border:1px solid rgba(255,255,255,.16);color:#fff}.learning-more{margin-top:1.3rem;text-align:center}.learning-more a{font-size:.78rem;font-weight:700;color:var(--blueL)}

#community{background:var(--cream)}.community-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}.community-photo{border-radius:24px;overflow:hidden;min-height:420px;position:relative;background:#0b1a3e}.community-photo img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}.community-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(4,12,28,.55),transparent 60%)}.quote{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-style:italic;line-height:1.55;border-left:3px solid var(--blue);padding-left:1.2rem;margin:1.3rem 0;color:var(--text)}.community-copy{color:var(--muted);font-size:.9rem;line-height:1.82}

#legacy{background:var(--night)}.legacy-intro{text-align:center;max-width:680px;margin:0 auto 2.6rem}.legacy-intro .section-kicker{justify-content:center}.legacy-intro p{color:rgba(255,255,255,.45);font-size:.9rem;line-height:1.75}.legacy-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem}.legacy-card{height:250px;border-radius:15px;overflow:hidden;position:relative;background:#09152e}.legacy-card img{width:100%;height:100%;object-fit:cover;filter:grayscale(18%)}.legacy-card::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(4,12,28,.9),rgba(4,12,28,.08) 65%)}.legacy-label{position:absolute;z-index:2;left:15px;right:15px;bottom:14px}.legacy-label strong{display:block;color:#fff;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase}.legacy-label span{font-size:.62rem;color:rgba(255,255,255,.5);line-height:1.4}.legacy-note{text-align:center;color:rgba(255,255,255,.34);font-size:.8rem;font-style:italic;margin-top:1.5rem}

#join{background:var(--navy);text-align:center;position:relative;overflow:hidden}.join-inner{max-width:620px;margin:0 auto}.join-inner .section-kicker{justify-content:center}.join-inner>.section-copy{margin:0 auto 2.2rem}.wl-card{position:relative;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:2.25rem;text-align:left;box-shadow:0 30px 80px rgba(0,0,0,.35)}.wl-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#28c0d8,var(--blueL),#7b5bff);border-radius:22px 22px 0 0}.wl-card h3{font-family:'Cormorant Garamond',serif;font-size:1.85rem;color:#fff;margin-bottom:.35rem}.wl-sub{font-size:.85rem;color:rgba(255,255,255,.48);margin-bottom:1.4rem}.wl-field{margin-bottom:1rem}.wl-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.wl-label{display:block;font-size:.64rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--blueL);margin-bottom:.45rem}.wl-opt{color:rgba(255,255,255,.3);font-weight:500}.wl-input,.wl-select{width:100%;padding:12px 14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:9px;color:#fff;font:inherit;font-size:.88rem;outline:none}.wl-input::placeholder{color:rgba(255,255,255,.27)}.wl-select option{color:#071240;background:#fff}.wl-check{display:flex;gap:10px;align-items:flex-start;padding:13px 14px;margin:1.15rem 0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.10);border-radius:9px}.wl-check input{width:17px;height:17px;accent-color:var(--blue);flex:0 0 auto}.wl-check label{font-size:.75rem;line-height:1.45;color:rgba(255,255,255,.68)}.wl-submit{width:100%;border:0;border-radius:9px;background:var(--blue);color:#fff;padding:13px;font:inherit;font-size:.88rem;font-weight:700;cursor:pointer}.wl-msg{margin-top:.8rem;text-align:center;font-size:.8rem;min-height:1rem}.wl-msg.ok{color:#5ce0a8}.wl-msg.err{color:#ff9a9a}.wl-honeypot{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}

footer{background:#020817;padding:4rem 5% 2rem;color:rgba(255,255,255,.4)}.footer-inner{max-width:1180px;margin:0 auto}.footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:3rem;padding-bottom:3rem}.footer-brand img{width:170px;height:auto;margin-bottom:.75rem}.footer-brand p{font-size:.75rem;color:rgba(255,255,255,.28)}.footer-title{font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:.8rem}.footer-links{list-style:none;display:grid;gap:.55rem}.footer-links a{font-size:.79rem;color:rgba(255,255,255,.42)}.footer-links a:hover{color:#fff}.footer-bottom{border-top:1px solid rgba(255,255,255,.07);padding-top:1.5rem;font-size:.72rem}

.rv{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}.rv.vis{opacity:1;transform:none}

@media(max-width:1000px){.nav-links{display:none}.hero-strip{grid-template-columns:1fr 1fr}.experience-grid,.community-grid{grid-template-columns:1fr}.platform-grid{grid-template-columns:1fr 1fr}.business-shell,.learning-grid{grid-template-columns:1fr}.legacy-grid{grid-template-columns:1fr 1fr}.footer-top{grid-template-columns:1fr 1fr}.experience-grid{gap:2.5rem}}
@media(max-width:640px){.welcome-nav{height:62px;padding:0 4%}.nav-logo{min-width:140px}.nav-logo img{max-width:140px}#hero{padding-top:62px;min-height:900px}.hero-photo{inset:62px 0 0}.hero-inner{padding:5.5rem 1.25rem 18rem}.hero-strip{grid-template-columns:1fr}.hero-chip{padding:.85rem 1.1rem}.hero-title{font-size:3.6rem}section{padding:5rem 1.25rem}.section-top{align-items:flex-start;flex-direction:column}.platform-grid{grid-template-columns:1fr}.panel-body{grid-template-columns:1fr}.mock-nav{display:none}.mock-cards{grid-template-columns:1fr}.legacy-grid{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr}.wl-row{grid-template-columns:1fr}.wl-card{padding:1.55rem}}
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://eccoozs.com"),
  title: "ECCOOZS | Explore · Express · Elevate",
  description: "ECCOOZS is a culture-centered social technology ecosystem for community, discovery, conversation, business visibility and commerce.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function WelcomePage() {
  const ticker = [
    ["layout-grid", "Home + Explore"], ["trending-up", "Ecco"], ["newspaper", "Newsroom"], ["mic-2", "Soundrooms"],
    ["store", "Business Directory"], ["shopping-bag", "House of ECCOOZS"], ["users", "Community"], ["layout-grid", "ECCOOZS Learning"],
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <RevealInit />
      <main>
        <nav className="welcome-nav">
          <a className="nav-logo" href="/welcome" aria-label="ECCOOZS welcome"><HeaderLogo width={170} /></a>
          <ul className="nav-links">
            <li><a className="active" href="#hero">Home</a></li>
            <li><a href="#platform">Platform</a></li>
            <li><a href="#business">Business</a></li>
            <li><a href="#learning">Learning</a></li>
            <li><a href="#community">About</a></li>
            <li><a href="#legacy">Legacy</a></li>
          </ul>
          <a className="nav-join" href="#join">Join ECCOOZS</a>
        </nav>

        <section id="hero">
          <div className="hero-photo"><img src="/welcome-images/landing-02.png" alt="ECCOOZS community" /></div>
          <div className="hero-inner">
            <div className="eyebrow">A culture-centered technology ecosystem</div>
            <div className="hero-welcome">Welcome to</div>
            <h1 className="hero-title">ECCO<span>OZS</span></h1>
            <div className="hero-tagline">Explore. Express. Elevate.</div>
            <p className="hero-copy">Community, discovery, conversation, media, business visibility and commerce — brought together in one intentional 18+ platform experience.</p>
            <div className="hero-actions">
              <a className="btn-primary" href="#join"><Icon name="arrow-right" />Join the Founding Waitlist</a>
              <a className="btn-secondary" href="#platform"><Icon name="layout-grid" />Explore the Platform</a>
            </div>
          </div>
          <div className="hero-strip">
            <div className="hero-chip"><div className="chip-icon"><Icon name="layout-grid" /></div><div><div className="chip-title">Home + Explore</div><div className="chip-copy">Post, discover and participate.</div></div></div>
            <div className="hero-chip"><div className="chip-icon"><Icon name="trending-up" /></div><div><div className="chip-title">Ecco</div><div className="chip-copy">Reshare with context, not chaos.</div></div></div>
            <div className="hero-chip"><div className="chip-icon"><Icon name="mic-2" /></div><div><div className="chip-title">Soundrooms</div><div className="chip-copy">Live audio conversations and replay.</div></div></div>
            <div className="hero-chip"><div className="chip-icon"><Icon name="store" /></div><div><div className="chip-title">Business</div><div className="chip-copy">Discovery, profiles and visibility.</div></div></div>
          </div>
        </section>

        <div className="ticker"><div className="ticker-track">{[...ticker,...ticker].map(([icon,label],i)=><span className="ticker-item" key={`${label}-${i}`}><Icon name={icon} />{label}</span>)}</div></div>

        <section id="platform">
          <div className="section-inner">
            <div className="section-top rv">
              <div><div className="section-kicker">Platform</div><h2>One ecosystem.<br />Multiple reasons to return.</h2></div>
              <p className="section-copy">ECCOOZS is built around the ways people already move through digital life: discover something, talk about it, share it, support a business, save it, or return later.</p>
            </div>
            <div className="platform-grid rv">
              <article className="feature-card"><div className="feature-icon"><Icon name="layout-grid" /></div><h3 className="feature-title">Home + Explore</h3><p className="feature-copy">Share text, pictures, video and articles. Discover culture, conversations and timely content through a clean community-first experience.</p></article>
              <article className="feature-card"><div className="feature-icon alt"><Icon name="trending-up" /></div><h3 className="feature-title">Ecco</h3><p className="feature-copy">A dedicated reshare and conversation layer designed so commentary stays connected to the original post and its context.</p></article>
              <article className="feature-card"><div className="feature-icon"><Icon name="newspaper" /></div><h3 className="feature-title">Newsroom</h3><p className="feature-copy">Discover stories, read at the source, save what matters and move news naturally into community conversation.</p></article>
              <article className="feature-card"><div className="feature-icon alt"><Icon name="mic-2" /></div><h3 className="feature-title">Soundrooms</h3><p className="feature-copy">Host live audio rooms with hosts, co-hosts, speakers and listeners, with moderation controls and replay workflows.</p></article>
              <article className="feature-card"><div className="feature-icon"><Icon name="store" /></div><h3 className="feature-title">Business Directory</h3><p className="feature-copy">A structured discovery layer for trusted businesses, products and services, with tiered profiles and optional visibility tools.</p></article>
              <article className="feature-card"><div className="feature-icon alt"><Icon name="shopping-bag" /></div><h3 className="feature-title">House of ECCOOZS</h3><p className="feature-copy">The owned lifestyle and commerce extension of ECCOOZS — connecting the platform brand to thoughtfully designed products and collections.</p></article>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="section-inner experience-grid">
            <div className="rv">
              <div className="section-kicker light">The app experience</div>
              <h2 className="light">Built, not imagined.</h2>
              <p className="section-copy light">ECCOOZS already spans the major consumer surfaces needed for launch. The public site now reflects the product that actually exists — without presenting deferred live video as a launch feature.</p>
              <div className="experience-list">
                <div className="experience-item"><div className="exp-num">01</div><div><strong>Discover and participate</strong><p>Home, Explore, profiles, comments, saved content and messaging.</p></div></div>
                <div className="experience-item"><div className="exp-num">02</div><div><strong>Move ideas into conversation</strong><p>Ecco and Newsroom connect discovery, context and discussion.</p></div></div>
                <div className="experience-item"><div className="exp-num">03</div><div><strong>Build community and commerce</strong><p>Soundrooms, Business Directory and House of ECCOOZS extend participation beyond the feed.</p></div></div>
              </div>
            </div>
            <div className="experience-panel rv" aria-label="Illustration of the ECCOOZS app structure">
              <div className="panel-top"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
              <div className="panel-body">
                <aside className="mock-nav"><img className="mock-wordmark" src="/brand/eccoozs-wordmark-mono-white-v2-320.png" alt="ECCOOZS" /><div className="mock-link active">Home</div><div className="mock-link">Explore</div><div className="mock-link">Ecco</div><div className="mock-link">Newsroom</div><div className="mock-link">Soundrooms</div><div className="mock-link">Business</div></aside>
                <div className="mock-main"><div className="mock-head"><strong>Explore ECCOOZS</strong><div className="search-pill">Search conversations...</div></div><div className="mock-hero"><small>Culture · Community · Connection</small><b>Where discovery becomes conversation.</b></div><div className="mock-cards"><div className="mock-card"><strong>Ecco</strong><span>Reshare with context.</span></div><div className="mock-card"><strong>Soundrooms</strong><span>Live audio conversation.</span></div><div className="mock-card"><strong>Business</strong><span>Discover and support.</span></div></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="business">
          <div className="section-inner">
            <div className="section-top rv"><div><div className="section-kicker">Business + commerce</div><h2>Discovery first.<br />Visibility when it matters.</h2></div><p className="section-copy">ECCOOZS gives businesses a place to be found before asking them to advertise. Profiles can grow from basic discovery into deeper trust, richer presentation and optional promoted visibility.</p></div>
            <div className="business-shell rv">
              <article className="business-card"><h3>Business Directory</h3><p>Structured profiles help members discover businesses by category and location while giving owners room to present products, services and contact information.</p><div className="tier-row"><span className="tier-name">Basic</span><div><div className="tier-desc">Discovery entry point</div></div><span className="tier-price">Free</span></div><div className="tier-row"><span className="tier-name">Certified</span><div><div className="tier-desc">Enhanced trust + contact utility</div></div><span className="tier-price">$14.99/mo</span></div><div className="tier-row"><span className="tier-name">Verified</span><div><div className="tier-desc">Premium profile depth + analytics</div></div><span className="tier-price">$29.99/mo</span></div></article>
              <article className="business-card dark-card"><h3>House of ECCOOZS</h3><p>ECCOOZS also has an owned lifestyle and merchandise system — a brand extension that creates another path from platform attention to commerce without turning the social experience into a storefront.</p><div className="tier-row"><img className="tier-badge" src="/brand/badges/eccoozs-certified-gold.png" alt="Certified gold ECCOOZS badge" /><div><div className="tier-name">Quiet brand language</div><div className="tier-desc">Premium, coordinated and intentionally restrained.</div></div></div><div className="tier-row"><img className="tier-badge" src="/brand/badges/eccoozs-verified-blue.png" alt="Verified blue ECCOOZS badge" /><div><div className="tier-name">Platform → Brand → Commerce</div><div className="tier-desc">A connected ecosystem, not a disconnected merch page.</div></div></div></article>
            </div>
          </div>
        </section>

        <section id="learning">
          <div className="section-inner">
            <div className="section-top rv"><div><div className="section-kicker light">ECCOOZS Learning</div><h2 className="light">Practice with purpose.<br />Grow with confidence.</h2></div><p className="section-copy light">Learning apps live alongside the broader ECCOOZS ecosystem while remaining clearly separate from the 18+ social platform.</p></div>
            <div className="learning-grid rv">
              <article className="learn-card"><div className="learn-num">01</div><div className="learn-kicker">Math practice · Grades 1–6</div><h3>Math Trail</h3><p>Grade-based math practice with progress tracking, achievement badges, a parent/teacher view and selectable voice guidance.</p><div className="learn-tags"><span>Grades 1–6</span><span>Practice</span><span>Progress</span><span>Badges</span></div><div className="learn-actions"><a className="learn-open" href="/apps/math-trail.html">Open app</a><a className="learn-download" href="/apps/math-trail.html" download>Download HTML</a></div></article>
              <article className="learn-card"><div className="learn-num">02</div><div className="learn-kicker">Speech + language practice</div><h3>My Voice Journey</h3><p>Guided word, phrase and sentence practice with listening, repetition, pronunciation and recording tools in a focused interface.</p><div className="learn-tags"><span>Words</span><span>Phrases</span><span>Sentences</span><span>Practice</span></div><div className="learn-actions"><a className="learn-open" href="/apps/my-voice-journey.html">Open app</a><a className="learn-download" href="/apps/my-voice-journey.html" download>Download HTML</a></div></article>
            </div>
            <div className="learning-more"><a href="/learning">Explore ECCOOZS Learning →</a></div>
          </div>
        </section>

        <section id="community">
          <div className="section-inner community-grid">
            <div className="community-photo rv"><img src="/welcome-images/landing-03.png" alt="People connecting through ECCOOZS" /></div>
            <div className="rv"><div className="section-kicker">Our story</div><h2>Built from within.<br />Open to those who walk with respect.</h2><p className="quote">“I didn't build this to go viral. I built it because there was no place left for our voices to breathe.”</p><p className="community-copy">ECCOOZS was built from a Foundational Black American perspective with culture, community and connection at its center. The platform is 18+ at launch, and participation is open to people who respect the community standards and the people in it.</p></div>
          </div>
        </section>

        <section id="legacy">
          <div className="section-inner">
            <div className="legacy-intro rv"><div className="section-kicker light">American Legacy</div><h2 className="light">Honoring our ancestors.<br />Celebrating our culture.</h2><p>History is part of the ECCOOZS identity. The public experience continues to make room for the people, events and innovations that shaped the communities we come from.</p></div>
            <div className="legacy-grid rv">
              <div className="legacy-card"><img src="/welcome-images/landing-10.png" alt="Historic Black American family" /><div className="legacy-label"><strong>Our Foundation</strong><span>Remembering the people whose labor and lives shaped the nation.</span></div></div>
              <div className="legacy-card"><img src="/welcome-images/landing-13.png" alt="George Washington Carver" /><div className="legacy-label"><strong>Innovation</strong><span>Scientific brilliance, ingenuity and invention.</span></div></div>
              <div className="legacy-card"><img src="/welcome-images/landing-14.png" alt="Dr. Martin Luther King Jr. and Malcolm X" /><div className="legacy-label"><strong>Leadership</strong><span>Voices that changed the direction of American life.</span></div></div>
              <div className="legacy-card"><img src="/welcome-images/landing-15.png" alt="Buffalo Soldiers" /><div className="legacy-label"><strong>Service</strong><span>Remembering sacrifice, service and resilience.</span></div></div>
            </div>
            <p className="legacy-note rv">A larger ECCOOZS digital history archive is planned for a later stage.</p>
          </div>
        </section>

        <section id="join">
          <div className="join-inner rv"><div className="section-kicker light">Early access</div><h2 className="light">Join the founding waitlist.</h2><p className="section-copy light">Be among the first to know when ECCOOZS opens. Members, creators, businesses, advertisers and beta testers can register interest below.</p><div className="wl-card"><h3>Join the 18+ Founding Waitlist</h3><p className="wl-sub">Reserve your founding spot and tell us how you plan to participate.</p><WaitlistForm /></div></div>
        </section>

        <footer><div className="footer-inner"><div className="footer-top"><div className="footer-brand"><img src="/brand/eccoozs-wordmark-blue-v2-640.png" alt="ECCOOZS" /><p>Explore. Express. Elevate.</p></div><div><div className="footer-title">Ecosystem</div><ul className="footer-links"><li><a href="#platform">Platform</a></li><li><a href="#business">Business</a></li><li><a href="#learning">Learning</a></li><li><a href="https://eccoozs.com/shop">House of ECCOOZS</a></li></ul></div><div><div className="footer-title">Legal + community</div><ul className="footer-links"><li><a href="/terms">Terms of Service</a></li><li><a href="/privacy">Privacy Policy</a></li><li><a href="/conduct">Code of Conduct</a></li><li><a href="/support">Community Support</a></li></ul></div></div><div className="footer-bottom">© 2026 ECCOOZS Technologies LLC. All rights reserved.</div></div></footer>
      </main>
    </>
  );
}
