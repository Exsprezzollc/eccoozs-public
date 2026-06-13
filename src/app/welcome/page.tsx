import type { Metadata } from "next";
import HeaderLogo from "@/components/brand/HeaderLogo";
import { MarketingIcon as Icon } from "@/components/marketing/MarketingIcon";
import { RevealInit } from "@/components/marketing/RevealInit";
import { WaitlistForm } from "@/components/marketing/WaitlistForm";

const landingStyles = String.raw`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --night:#040c1c;--navy:#071240;--navy-2:#0b1a3e;
  --blue:#1a3ef5;--blue-l:#4a76ff;--blue-d:#0d2ec4;--blue-m:rgba(26,62,245,0.15);
  --cream:#f4f6fb;--cream-2:#e8edf8;--white:#fff;
  --td:#070f28;--tm:#1c3570;--tmut:#607ab5;
  --bdr:rgba(7,18,64,0.09);--blight:rgba(255,255,255,0.13);
}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--td);overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}

/* ── NAV ─────────────────────────────────────────── */
nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;gap:1rem;
  padding:0 4%;height:66px;
  background:rgba(4,12,28,0.94);
  backdrop-filter:blur(24px);
  border-bottom:1px solid var(--blight);
}
.nav-logo{display:flex;align-items:center;gap:10px;flex:0 0 auto;min-width:166px}
.nav-header-logo{display:block;height:auto;max-width:168px}
/* Legacy text logo classes intentionally hidden so the public header matches the app HeaderLogo. */
.nav-mark,.nav-wm,.nav-tagline{display:none!important}
.nav-links{display:flex;align-items:center;justify-content:center;gap:1.45rem;list-style:none;flex:1;min-width:0}
.nav-links a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.58);transition:color .2s;position:relative;padding-bottom:4px;white-space:nowrap}
.nav-links a:hover,.nav-links a.active{color:#fff}
.nav-links a.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--blue-l);border-radius:1px}
.nav-right{display:flex;align-items:center;justify-content:flex-end;gap:10px;flex:0 0 auto}
.nav-login{font-size:.78rem;font-weight:500;color:rgba(255,255,255,.55);transition:color .2s;white-space:nowrap}
.nav-login:hover{color:#fff}
.nav-join{background:var(--blue);color:#fff;font-size:.78rem;font-weight:700;padding:9px 16px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;line-height:1;transition:background .2s,transform .15s}
.nav-join:hover{background:var(--blue-d);transform:translateY(-1px)}
@media(max-width:1120px){
  nav{padding:0 3.2%;height:64px;gap:.8rem}
  .nav-logo{min-width:150px}
  .nav-header-logo{max-width:152px}
  .nav-links{gap:1rem}
  .nav-links a{font-size:.72rem}
  .nav-join{font-size:.72rem;padding:8px 13px}
}

/* ── HERO (full-bleed with BLUE gradient) ─────────── */
#hero{
  min-height:100vh;
  position:relative;
  overflow:hidden;
  display:flex;flex-direction:column;
}
/* Photo layer */
.hero-photo{position:absolute;inset:0;z-index:0}
.hero-photo img{width:100%;height:100%;object-fit:cover;object-position:center top}
/* Blue color wash over the entire photo */
.hero-color-wash{
  position:absolute;inset:0;z-index:1;
  background:rgba(7,18,64,0.42);
  mix-blend-mode:multiply;
}
/* Directional navy gradient — dense left for text, blue-tinted right */
.hero-grad{
  position:absolute;inset:0;z-index:2;
  background:linear-gradient(
    108deg,
    rgba(4,12,28,0.96) 0%,
    rgba(5,16,42,0.91) 22%,
    rgba(7,20,58,0.78) 38%,
    rgba(7,18,64,0.52) 56%,
    rgba(10,22,70,0.28) 72%,
    rgba(7,18,64,0.12) 88%,
    rgba(4,12,28,0.06) 100%
  );
}
/* Bottom fade into feature strip */
.hero-bottom{
  position:absolute;bottom:0;left:0;right:0;height:200px;z-index:3;
  background:linear-gradient(to top,rgba(4,12,28,1) 0%,rgba(4,12,28,0) 100%);
}
.hero-content{
  position:relative;z-index:4;
  flex:1;display:flex;flex-direction:column;justify-content:center;
  padding:110px 5% 190px;
  max-width:660px;
}
.hero-eyebrow{
  font-size:.7rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;
  color:var(--blue-l);margin-bottom:1.1rem;
  display:flex;align-items:center;gap:9px;
}
.hero-eyebrow::before{content:'';width:22px;height:2px;background:var(--blue-l);display:inline-block;flex-shrink:0}
.hero-welcome{font-family:'DM Sans',sans-serif;font-size:clamp(1.5rem,2.8vw,2.2rem);font-weight:400;color:rgba(255,255,255,.85);line-height:1.1;margin-bottom:.15rem}
.hero-brand{font-family:'DM Sans',sans-serif;font-size:clamp(3rem,6.5vw,5.8rem);font-weight:800;color:#fff;letter-spacing:.02em;line-height:1;margin-bottom:.55rem;text-transform:uppercase}
.hero-brand span{color:var(--blue-l)}
.hero-tagline{font-size:clamp(1rem,1.8vw,1.3rem);font-weight:500;color:rgba(255,255,255,.7);margin-bottom:1.25rem;letter-spacing:.01em;font-family:'Cormorant Garant',serif;font-style:italic}
.hero-desc{font-size:.98rem;font-weight:300;color:rgba(255,255,255,.52);line-height:1.82;max-width:440px;margin-bottom:2.4rem}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:2.4rem}
.btn-p{padding:13px 28px;background:var(--blue);color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.9rem;border:none;border-radius:9px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .2s,transform .15s}
.btn-p:hover{background:var(--blue-d);transform:translateY(-1px)}
.btn-p i{width:16px;height:16px}
.btn-g{padding:13px 28px;background:rgba(255,255,255,.09);color:rgba(255,255,255,.88);font-family:'DM Sans',sans-serif;font-weight:500;font-size:.9rem;border:1.5px solid rgba(255,255,255,.25);border-radius:9px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .2s}
.btn-g:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.4)}
.btn-g i{width:16px;height:16px}
/* Social proof */
.hero-sp{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.sp-avs{display:flex}
.sp-av{width:32px;height:32px;border-radius:50%;border:2px solid rgba(255,255,255,.3);background:linear-gradient(135deg,var(--blue),var(--blue-l));margin-right:-9px;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;color:#fff}
.sp-plus{width:32px;height:32px;border-radius:50%;background:var(--blue);border:2px solid rgba(255,255,255,.3);margin-right:-9px;display:flex;align-items:center;justify-content:center;font-size:.56rem;font-weight:700;color:#fff}
.sp-txt{margin-left:18px}
.sp-strong{font-size:.88rem;font-weight:600;color:#fff}
.sp-sub{font-size:.73rem;color:rgba(255,255,255,.42);margin-top:1px}

/* Feature strip */
.feature-strip{
  position:absolute;bottom:0;left:0;right:0;z-index:5;
  background:rgba(4,12,28,0.94);
  backdrop-filter:blur(20px);
  border-top:1px solid rgba(26,62,245,0.25);
  display:flex;
}
.fs-item{flex:1;padding:1.35rem 1.5rem;display:flex;align-items:center;gap:.9rem;border-right:1px solid rgba(26,62,245,.15);transition:background .2s;cursor:pointer}
.fs-item:last-child{border-right:none}
.fs-item:hover{background:rgba(26,62,245,.08)}
.fs-icon{width:40px;height:40px;border-radius:10px;background:rgba(26,62,245,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--blue-l)}
.fs-icon i{width:19px;height:19px}
.fs-label{font-size:.82rem;font-weight:700;color:#fff;margin-bottom:.1rem;text-transform:uppercase;letter-spacing:.05em}
.fs-desc{font-size:.7rem;color:rgba(255,255,255,.42);line-height:1.45}

/* ── STATS (WHITE) ─────────────────────────────────── */
.stats-strip{background:var(--white);border-bottom:1px solid var(--bdr);padding:2.5rem 5%;display:grid;grid-template-columns:repeat(3,minmax(0,215px));justify-content:center;row-gap:1.6rem}
.si{text-align:center;padding:.15rem 1.3rem}
.si:not(:nth-child(3n+1)){border-left:1px solid var(--bdr)}
.sn{font-family:'Cormorant Garant',serif;font-size:1.7rem;font-weight:700;color:var(--td);line-height:1.1}
.sn span{color:var(--blue)}
.sl{font-size:.74rem;font-weight:500;color:var(--tmut);margin-top:5px;line-height:1.4}

/* ── MARQUEE (NAVY) ───────────────────────────────── */
.mwrap{background:var(--navy-2);padding:1.25rem 0;overflow:hidden}
.mtrack{display:flex;gap:2.5rem;animation:mq 26s linear infinite;white-space:nowrap}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.mi{display:flex;align-items:center;gap:8px;font-size:.75rem;font-weight:500;color:rgba(255,255,255,.4);letter-spacing:.04em}
.mi i{width:13px;height:13px;opacity:.6}

/* ── SHARED SECTION STYLES ────────────────────────── */
section{padding:8rem 5%}
.seyebrow{font-size:.7rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;margin-bottom:.85rem;display:flex;align-items:center;gap:8px}
.seyebrow::before{content:'';width:16px;height:1.5px;display:inline-block;flex-shrink:0}
.seyebrow.light{color:var(--blue-l)}.seyebrow.light::before{background:var(--blue-l)}
.seyebrow.dark{color:var(--blue)}.seyebrow.dark::before{background:var(--blue)}
h2{font-family:'Cormorant Garant',serif;font-size:clamp(2.2rem,4vw,3.3rem);font-weight:700;line-height:1.1;margin-bottom:1rem}
h2.light{color:#fff}
h2.dark{color:var(--td)}
.sdesc{font-size:.97rem;line-height:1.8;max-width:520px}
.sdesc.light{color:rgba(255,255,255,.45)}
.sdesc.dark{color:var(--tmut)}

/* ── ECHO STANDARD (NAVY + ECHO IMAGE) ────────────── */
#echo{
  background:var(--night);
  padding:7.5rem 5%;
  text-align:center;
  position:relative;
  overflow:hidden;
  min-height:540px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.echo-art{position:absolute;inset:0;z-index:0;pointer-events:none}
.echo-art img{
  width:100%;height:100%;object-fit:cover;object-position:center;
  opacity:.58;filter:saturate(1.08) contrast(1.06);
}
.echo-art::after{
  content:'';position:absolute;inset:0;
  background:
    linear-gradient(90deg,rgba(4,12,28,.96) 0%,rgba(7,18,64,.74) 28%,rgba(7,18,64,.58) 50%,rgba(7,18,64,.74) 72%,rgba(4,12,28,.96) 100%),
    linear-gradient(to bottom,rgba(4,12,28,.84) 0%,rgba(7,18,64,.48) 42%,rgba(4,12,28,.9) 100%);
}
.echo-orb{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(rgba(26,62,245,.14) 0%,transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(80px);pointer-events:none;z-index:1}
.echo-inner{position:relative;z-index:2;max-width:850px;margin:0 auto}
.echo-quote{font-family:'Cormorant Garant',serif;font-size:clamp(1.9rem,4vw,3.25rem);font-weight:700;color:#fff;line-height:1.28;margin-bottom:1.55rem;text-shadow:0 14px 38px rgba(0,0,0,.48)}
.echo-quote em{font-style:italic;color:var(--blue-l);text-shadow:0 0 22px rgba(74,118,255,.28)}
.echo-body{font-size:1rem;color:rgba(232,237,248,.66);line-height:1.85;max-width:580px;margin:0 auto;text-shadow:0 8px 28px rgba(0,0,0,.42)}

/* ── FEATURES (CREAM / LIGHT) ─────────────────────── */
#features{background:var(--cream)}
.fi{max-width:1180px;margin:0 auto 4rem;display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;flex-wrap:wrap}
.fgrid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:var(--bdr);border:1.5px solid var(--bdr);border-radius:20px;overflow:hidden}
.fc{background:var(--cream);padding:2.3rem 1.9rem;transition:background .22s}
.fc:hover{background:var(--white)}
.fic{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:1.15rem}
.fic i{width:22px;height:22px}
.fic.b{background:rgba(26,62,245,.1);color:var(--blue)}
.fic.n{background:rgba(7,18,64,.07);color:var(--navy)}
.ft{font-size:1rem;font-weight:600;color:var(--td);margin-bottom:.4rem}
.fd{font-size:.84rem;color:var(--tmut);line-height:1.72}

/* ── APP PREVIEW (DARK NAVY) ──────────────────────── */
#app-preview{background:var(--night);padding:8rem 5%;position:relative;overflow:hidden}
.ap-orb{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(rgba(26,62,245,.12) 0%,transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(90px);pointer-events:none}
.ap-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;position:relative;z-index:1}
.ap-img-wrap img{width:100%;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.45)}

/* ── COMMUNITY (WHITE) ────────────────────────────── */
#community{background:var(--white)}
.comm-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
.comm-img{border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(7,18,64,.1)}
.comm-img img{width:100%;height:100%;object-fit:cover;display:block}
.comm-quote{font-family:'Cormorant Garant',serif;font-size:1.45rem;font-weight:500;color:var(--td);line-height:1.65;font-style:italic;margin-bottom:1.5rem;padding-left:1.5rem;border-left:3px solid var(--blue)}
.comm-body{font-size:.94rem;color:var(--tmut);line-height:1.84;margin-bottom:2rem}
.comm-link{display:inline-flex;align-items:center;gap:8px;font-size:.9rem;font-weight:600;color:var(--blue);border-bottom:1.5px solid rgba(26,62,245,.25);padding-bottom:2px;transition:border-color .2s}
.comm-link:hover{border-color:var(--blue)}
.comm-link i{width:16px;height:16px}

/* ── HISTORY (DARK NAVY — premium archive feel) ──── */
#history{background:var(--night);padding:8rem 5%}
.hist-intro{max-width:1180px;margin:0 auto 3.5rem;text-align:center}
.hist-intro .seyebrow{justify-content:center}
.hist-grid{
  max-width:1180px;margin:0 auto;
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  grid-template-rows:300px 300px 300px;
  gap:.9rem;
}
.hc{border-radius:16px;overflow:hidden;position:relative;cursor:pointer}
.hc.tall{grid-row:span 2}
.hc img{width:100%;height:100%;object-fit:cover;object-position:center;transition:transform .45s ease;filter:grayscale(15%) contrast(1.05)}
.hc:hover img{transform:scale(1.04);filter:grayscale(0%) contrast(1.08)}
/* Gradient overlay — strong at bottom for caption */
.hc-ov{
  position:absolute;inset:0;
  background:linear-gradient(
    to top,
    rgba(4,12,28,.88) 0%,
    rgba(4,12,28,.45) 40%,
    rgba(4,12,28,.12) 65%,
    transparent 85%
  );
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:18px 20px;
  transition:background .3s;
}
.hc:hover .hc-ov{background:linear-gradient(to top,rgba(4,12,28,.94) 0%,rgba(4,12,28,.55) 50%,rgba(4,12,28,.1) 75%,transparent 90%)}
.hc-tag{font-size:.72rem;font-weight:700;color:rgba(255,255,255,.95);letter-spacing:.14em;text-transform:uppercase;line-height:1}
.hc-caption{font-size:.68rem;color:rgba(255,255,255,.55);margin-top:3px;font-style:italic;line-height:1.4}
/* Blue accent line on hover */
.hc::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--blue-l);transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
.hc:hover::after{transform:scaleX(1)}
.hist-note{max-width:1180px;margin:2rem auto 0;text-align:center;font-size:.85rem;color:rgba(255,255,255,.35);font-style:italic}

/* ── DOWNLOAD (DARK NAVY WITH GLOW) ──────────────── */
#download{background:var(--navy);padding:8rem 5%;text-align:center;position:relative;overflow:hidden}
.dl-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(rgba(26,62,245,.15) 0%,transparent 65%);top:-150px;left:50%;transform:translateX(-50%);filter:blur(90px);pointer-events:none}
.dlinner{position:relative;z-index:1;max-width:600px;margin:0 auto}
.dlform{display:flex;gap:10px;max-width:480px;margin:0 auto 2rem}
.dlinput{flex:1;padding:14px 18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none;transition:border-color .2s}
.dlinput::placeholder{color:rgba(255,255,255,.27)}
.dlinput:focus{border-color:var(--blue-l)}
.dlbtn{padding:14px 24px;background:var(--blue);color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.88rem;border:none;border-radius:10px;cursor:pointer;transition:background .2s,transform .15s}
.dlbtn:hover{background:var(--blue-d);transform:translateY(-1px)}
.sbgs{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap}
.sbg{display:flex;align-items:center;gap:9px;padding:11px 20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.11);border-radius:10px;color:rgba(255,255,255,.6);font-size:.8rem;font-weight:500;cursor:pointer;transition:background .2s}
.sbg:hover{background:rgba(255,255,255,.1)}
.sbg i{width:18px;height:18px;flex-shrink:0}
.sbg strong{display:block;font-size:.9rem;color:#fff}
.sbg span{font-size:.65rem;color:rgba(255,255,255,.32)}

/* ── PRICING (WHITE) ──────────────────────────────── */
#pricing{background:var(--white)}
.printo{max-width:1180px;margin:0 auto 3.5rem;text-align:center}
.printo .seyebrow{justify-content:center}
.printo .seyebrow::before{display:none}
.pgd{max-width:1060px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.pd{background:var(--cream);border:1.5px solid var(--bdr);border-radius:20px;padding:2.4rem 2rem;position:relative;transition:border-color .25s,transform .25s}
.pd:hover{border-color:rgba(26,62,245,.28);transform:translateY(-4px)}
.pd.feat{background:var(--navy);border-color:transparent;transform:scale(1.024)}
.pd.feat:hover{transform:scale(1.024) translateY(-4px)}
.popbdg{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--blue);color:#fff;font-size:.68rem;font-weight:600;padding:4px 14px;border-radius:99px;letter-spacing:.05em;white-space:nowrap}
.pnm{font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--tmut);margin-bottom:.9rem}
.pd.feat .pnm{color:rgba(255,255,255,.42)}
.pp{font-family:'Cormorant Garant',serif;font-size:3rem;font-weight:700;color:var(--td);line-height:1;margin-bottom:.18rem}
.pd.feat .pp{color:#fff}
.pp sub{font-size:1.1rem;font-weight:400;font-family:'DM Sans',sans-serif;vertical-align:baseline}
.pper{font-size:.78rem;color:var(--tmut);margin-bottom:1.7rem}
.pd.feat .pper{color:rgba(255,255,255,.34)}
.pdiv{height:1px;background:var(--bdr);margin-bottom:1.7rem}
.pd.feat .pdiv{background:rgba(255,255,255,.1)}
.pfl{list-style:none;display:flex;flex-direction:column;gap:.65rem;margin-bottom:1.9rem}
.pfl li{display:flex;align-items:flex-start;gap:9px;font-size:.85rem;color:var(--td)}
.pd.feat .pfl li{color:rgba(255,255,255,.7)}
.pfl i{width:15px;height:15px;flex-shrink:0;color:var(--blue);margin-top:1px}
.pd.feat .pfl i{color:var(--blue-l)}
.pb{width:100%;padding:13px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:.87rem;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px}
.pb.out{background:transparent;border:1.5px solid var(--bdr);color:var(--td)}
.pb.out:hover{border-color:var(--blue);color:var(--blue)}
.pb.sol{background:var(--blue);border:none;color:#fff}
.pb.sol:hover{background:var(--blue-d)}
.pb.gst{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.13);color:#fff}
.pb.gst:hover{background:rgba(255,255,255,.13)}
.pb i{width:15px;height:15px}

/* ── FOOTER (DARKEST NAVY) ────────────────────────── */
footer{background:var(--night);padding:5rem 5% 2.5rem;color:rgba(255,255,255,.4)}
.footer-inner{max-width:1180px;margin:0 auto}
.ftop{display:grid;grid-template-columns:1.4fr auto auto;gap:4rem;margin-bottom:4rem}
.fbrand{display:flex;align-items:center;gap:10px;margin-bottom:.7rem}
.fbrand-mark{height:28px;width:28px;object-fit:contain;mix-blend-mode:screen;filter:brightness(1.1)}
.fbwm{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:700;color:#fff;letter-spacing:.07em;text-transform:uppercase}
.ftagline{font-size:.8rem;color:rgba(255,255,255,.27);line-height:1.7;max-width:195px}
.fct{font-size:.67rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:1rem}
.fls{list-style:none;display:flex;flex-direction:column;gap:.6rem}
.fls a{font-size:.84rem;color:rgba(255,255,255,.4);transition:color .2s}
.fls a:hover{color:#fff}
.fbot{border-top:1px solid rgba(255,255,255,.07);padding-top:1.8rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.fcp{font-size:.76rem}
.flg{display:flex;gap:1.4rem}
.flg a{font-size:.76rem;color:rgba(255,255,255,.26)}
.flg a:hover{color:rgba(255,255,255,.6)}

/* ── REVEAL ───────────────────────────────────────── */
.rv{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
.rv.vis{opacity:1;transform:translateY(0)}

/* ── RESPONSIVE ──────────────────────────────────── */
@media(max-width:980px){
  .ap-inner,.comm-inner{grid-template-columns:1fr;gap:3rem}
  .fgrid{grid-template-columns:1fr 1fr}
  .pgd{grid-template-columns:1fr}.pd.feat{transform:none}
  .ftop{grid-template-columns:1fr 1fr}
  .nav-links{display:none}
  .feature-strip{display:grid;grid-template-columns:1fr 1fr}
  .fs-item{border-right:none;border-bottom:1px solid rgba(26,62,245,.15)}
  .stats-strip{grid-template-columns:repeat(2,minmax(0,1fr));max-width:480px;margin:0 auto}
  .si:not(:nth-child(3n+1)){border-left:none}
  .si:nth-child(even){border-left:1px solid var(--bdr)}
  .hist-grid{grid-template-columns:1fr 1fr;grid-template-rows:auto}
  .hc.tall{grid-row:span 1}
}
@media(max-width:600px){
  section{padding:5rem 1.25rem}
  .fgrid{grid-template-columns:1fr}
  .hero-actions{flex-direction:column;align-items:flex-start}
  .dlform{flex-direction:column}
  .feature-strip{grid-template-columns:1fr}
  .ftop{grid-template-columns:1fr}
  .stats-strip{grid-template-columns:1fr;max-width:300px;row-gap:0}
  .si:nth-child(even){border-left:none}
  .si{border-top:1px solid var(--bdr);padding:.95rem 1.3rem}
  .si:first-child{border-top:none;padding-top:.15rem}
  .hist-grid{grid-template-columns:1fr;grid-template-rows:auto}
}

/* ── LIFESTYLE GRID ──────────────────────────────── */
#lifestyle{background:var(--navy);padding:8rem 5%}
.ls-intro{max-width:1180px;margin:0 auto 3.5rem;text-align:center}
.ls-intro .seyebrow{justify-content:center}
.ls-grid{
  max-width:1180px;margin:0 auto;
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  grid-template-rows:280px 280px;
  gap:.9rem;
}
.ls-cell{border-radius:16px;overflow:hidden;position:relative;cursor:pointer}
.ls-cell.tall{grid-row:span 2}
.ls-cell img{width:100%;height:100%;object-fit:cover;object-position:center;transition:transform .4s ease}
.ls-cell:hover img{transform:scale(1.04)}
/* overlay fade at bottom for label */
.ls-ov{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(4,12,28,.78) 0%,rgba(4,12,28,.15) 45%,transparent 70%);
  display:flex;align-items:flex-end;
  padding:18px 20px;
  transition:background .3s;
}
.ls-cell:hover .ls-ov{background:linear-gradient(to top,rgba(4,12,28,.9) 0%,rgba(4,12,28,.3) 50%,rgba(4,12,28,.05) 75%)}
.ls-label{font-size:.78rem;font-weight:700;color:#fff;letter-spacing:.14em;text-transform:uppercase}
.ls-label span{display:block;font-size:.65rem;font-weight:400;color:rgba(255,255,255,.55);letter-spacing:.05em;text-transform:none;margin-top:2px;font-style:italic}

/* ── FOUNDING WAITLIST FORM ───────────────────────── */
.wl-card{
  position:relative;z-index:1;max-width:620px;margin:0 auto;text-align:left;
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.12);
  border-radius:22px;
  padding:2.4rem 2.4rem 2.2rem;
  backdrop-filter:blur(8px);
  box-shadow:0 30px 80px rgba(0,0,0,.42);
  overflow:hidden;
}
.wl-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,#28c0d8 0%,var(--blue-l) 50%,#7b5bff 100%);
}
.wl-card h3{font-family:'Cormorant Garant',serif;font-size:1.85rem;font-weight:700;color:#fff;line-height:1.15;margin-bottom:.5rem}
.wl-sub{font-size:.89rem;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1.7rem}
.wl-field{margin-bottom:1.05rem}
.wl-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.wl-label{display:block;font-size:.66rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--blue-l);margin-bottom:.5rem}
.wl-opt{color:rgba(255,255,255,.3);font-weight:500}
.wl-input,.wl-select{
  width:100%;padding:13px 16px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.14);
  border-radius:10px;color:#fff;
  font-family:'DM Sans',sans-serif;font-size:.92rem;
  outline:none;transition:border-color .2s,background .2s;
}
.wl-input::placeholder{color:rgba(255,255,255,.3)}
.wl-input:focus,.wl-select:focus{border-color:var(--blue-l);background:rgba(255,255,255,.09)}
.wl-select{
  appearance:none;-webkit-appearance:none;cursor:pointer;padding-right:42px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-opacity='0.55' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 15px center;
}
.wl-select option{color:#0b1a3e;background:#fff}
.wl-check{display:flex;align-items:flex-start;gap:11px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px 16px;margin:1.3rem 0 1.4rem;cursor:pointer}
.wl-check input{width:18px;height:18px;margin-top:1px;flex-shrink:0;cursor:pointer;accent-color:var(--blue)}
.wl-check label{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.72);line-height:1.5;letter-spacing:.02em;cursor:pointer}
.wl-submit{width:100%;padding:15px;background:var(--blue);color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.95rem;border:none;border-radius:11px;cursor:pointer;transition:background .2s,transform .15s}
.wl-submit:hover{background:var(--blue-d);transform:translateY(-1px)}
.wl-submit:disabled{opacity:.65;cursor:default;transform:none}
.wl-msg{margin-top:1rem;font-size:.85rem;text-align:center;min-height:1.1rem;line-height:1.5}
.wl-msg.ok{color:#5ce0a8}
.wl-msg.err{color:#ff9a9a}
@media(max-width:520px){.wl-row{grid-template-columns:1fr}.wl-card{padding:1.9rem 1.4rem}}


/* React/lucide icon support */
.btn-p svg,.btn-g svg,.comm-link svg,.pb svg{width:16px;height:16px}
.fs-icon svg{width:19px;height:19px}
.mi svg{width:13px;height:13px;opacity:.6}
.sbg svg{width:18px;height:18px;flex-shrink:0}
.pfl svg{width:15px;height:15px;flex-shrink:0;color:var(--blue);margin-top:1px}
.pd.feat .pfl svg{color:var(--blue-l)}
.lucide-react-icon{display:block;stroke-width:2}
.wl-honeypot{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://eccoozs.com"),
  title: "ECCOOZS — Express. Explore. Elevate.",
  description: "Join the ECCOOZS founding waitlist.",
};

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: landingStyles }} />
      <RevealInit />
      <div className="landing-site">
        <nav>
          <a className="nav-logo" href="/welcome" aria-label="ECCOOZS welcome">
            <HeaderLogo width={168} className="nav-header-logo" />
          </a>
          <ul className="nav-links">
            <li><a href="/welcome" className="active">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#app-preview">App</a></li>
            <li><a href="#lifestyle">Community</a></li>
            <li><a href="#community">About</a></li>
            <li><a href="#history">Legacy</a></li>
          </ul>
          <div className="nav-right">
            <a className="nav-join" href="#download">Join ECCOOZS</a>
          </div>
        </nav>

        <section id="hero">
          <div className="hero-photo">
            <img src="/welcome-images/landing-02.png" alt="Eccoozs community — Create Culture, Be Real" />
          </div>
          <div className="hero-color-wash"></div>
          <div className="hero-grad"></div>
          <div className="hero-bottom"></div>

          <div className="hero-content">
            <div className="hero-eyebrow">More than a platform.</div>
            <div className="hero-welcome">Welcome to</div>
            <div className="hero-brand">ECCO<span>OZS</span></div>
            <div className="hero-tagline">Express. Explore. Elevate.</div>
            <p className="hero-desc">
              ECCOOZS is coming. A warmer, cleaner, more intentional 18+ ecosystem for community,
              creators, businesses, products, conversations, and trusted discovery.
            </p>

            <div className="hero-actions">
              <a className="btn-p" href="#download"><Icon name="arrow-right" />Join the Movement</a>
              <a className="btn-g" href="#features"><Icon name="layout-grid" />Explore the Platform</a>
            </div>

            <div className="hero-sp">
              <div className="sp-avs">
                <div className="sp-av">A</div>
                <div className="sp-av">K</div>
                <div className="sp-av">M</div>
                <div className="sp-av">J</div>
                <div className="sp-plus">+8K</div>
              </div>
              <div className="sp-txt">
                <div className="sp-strong">Built for creators. Loved by communities.</div>
                <div className="sp-sub">Be among the first. Founding member spots are limited.</div>
              </div>
            </div>
          </div>

          <div className="feature-strip">
            <div className="fs-item">
              <div className="fs-icon"><Icon name="mic-2" /></div>
              <div>
                <div className="fs-label">Soundrooms</div>
                <div className="fs-desc">Speak. Listen. Connect.<br />Real conversations. Real time.</div>
              </div>
            </div>
            <div className="fs-item">
              <div className="fs-icon"><Icon name="layout-grid" /></div>
              <div>
                <div className="fs-label">The Flow</div>
                <div className="fs-desc">Your feed. Your culture.<br />Content that reflects you.</div>
              </div>
            </div>
            <div className="fs-item">
              <div className="fs-icon"><Icon name="trending-up" /></div>
              <div>
                <div className="fs-label">Elevate</div>
                <div className="fs-desc">Creators. Brands. Impact.<br />Build, grow, inspire.</div>
              </div>
            </div>
            <div className="fs-item">
              <div className="fs-icon"><Icon name="calendar-check" /></div>
              <div>
                <div className="fs-label">Events</div>
                <div className="fs-desc">Live. Local. Elevated.<br />Experiences that bring us together.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="stats-strip rv">
          <div className="si"><div className="sn">Creators</div><div className="sl">Share · Ecco · Connect</div></div>
          <div className="si"><div className="sn">Businesses</div><div className="sl">Directory · Highlights · Shop</div></div>
          <div className="si"><div className="sn">Members</div><div className="sl">Discover · Support · Build</div></div>
        </div>

        <div className="mwrap">
          <div className="mtrack">
            <span className="mi"><Icon name="mic-2" />Soundrooms</span>
            <span className="mi"><Icon name="video" />Live Streaming</span>
            <span className="mi"><Icon name="shopping-bag" />Eccoozs Shop</span>
            <span className="mi"><Icon name="trending-up" />Monetization</span>
            <span className="mi"><Icon name="layout-grid" />The Flow</span>
            <span className="mi"><Icon name="newspaper" />Newsroom</span>
            <span className="mi"><Icon name="users" />Community</span>
            <span className="mi"><Icon name="mic-2" />Soundrooms</span>
            <span className="mi"><Icon name="video" />Live Streaming</span>
            <span className="mi"><Icon name="shopping-bag" />Eccoozs Shop</span>
            <span className="mi"><Icon name="trending-up" />Monetization</span>
            <span className="mi"><Icon name="layout-grid" />The Flow</span>
            <span className="mi"><Icon name="newspaper" />Newsroom</span>
            <span className="mi"><Icon name="users" />Community</span>
          </div>
        </div>

        <section id="echo">
          <div className="echo-art" aria-hidden="true">
            <img src="/welcome-images/echo.png" alt="" />
          </div>
          <div className="echo-orb"></div>
          <div className="echo-inner rv">
            <div className="seyebrow light" style={{ justifyContent: "center" }}>The Eccoozs Standard</div>
            <p className="echo-quote">
              On Eccoozs, you don't go <em>"viral."</em><br />
              What you say or do <em>echoes.</em><br />
              Make sure you echo in a positive way.
            </p>
            <p className="echo-body">
              We built a platform that holds content and creators to a higher standard. No toxic algorithms
              feeding outrage. No hollow metrics chasing clout. Just authentic voices, resonating with real people.
            </p>
          </div>
        </section>

        <section id="features">
          <div className="fi rv">
            <div>
              <div className="seyebrow dark">Platform Features</div>
              <h2 className="dark">Preview what's coming.<br />One ecosystem. Many ways to connect, discover, and build.</h2>
            </div>
            <p className="sdesc dark">
              Stop juggling a dozen apps. Eccoozs brings together every tool a modern creator needs —
              from going live to getting paid.
            </p>
          </div>

          <div className="fgrid rv">
            <div className="fc"><div className="fic b"><Icon name="mic-2" /></div><div className="ft">Soundrooms</div><div className="fd">Host live audio rooms with your community. Invite co-hosts, take speakers on stage, broadcast your voice to the world.</div></div>
            <div className="fc"><div className="fic n"><Icon name="video" /></div><div className="ft">Live Streaming</div><div className="fd">Go live in seconds. Full video streaming with real-time engagement and monetized viewer interactions built in.</div></div>
            <div className="fc"><div className="fic b"><Icon name="shopping-bag" /></div><div className="ft">Eccoozs Shop</div><div className="fd">Shop Eccoozs merch and spread the culture. Members earn commission promoting the brand — more ways to earn coming soon.</div></div>
            <div className="fc"><div className="fic n"><Icon name="layout-grid" /></div><div className="ft">The Flow</div><div className="fd">Your feed. Your culture. Share photos, videos, news, and audio in a beautifully curated feed that puts your content first.</div></div>
            <div className="fc"><div className="fic b"><Icon name="trending-up" /></div><div className="ft">Elevate &amp; Earn</div><div className="fd">Income streams: shop commissions and future ad sharing — all tracked in your personal dashboard.</div></div>
            <div className="fc"><div className="fic n"><Icon name="store" /></div><div className="ft">Business Directory</div><div className="fd">A curated discovery space for trusted businesses, creators, products, and services — helping members support what aligns with their values.</div></div>
          </div>
        </section>

        <section id="lifestyle">
          <div className="ls-intro rv">
            <div className="seyebrow light" style={{ justifyContent: "center" }}>The Community</div>
            <h2 className="light">Real voices. Real connections.</h2>
            <p className="sdesc light" style={{ margin: "0 auto", textAlign: "center" }}>
              From bedroom creators to live performers — Eccoozs is where your community comes alive.
            </p>
          </div>

          <div className="ls-grid rv">
            <div className="ls-cell tall">
              <img src="/welcome-images/landing-03.png" alt="Create on Eccoozs — community connecting" />
              <div className="ls-ov">
                <div className="ls-label">Create<span>Express yourself freely</span></div>
              </div>
            </div>

            <div className="ls-cell">
              <img src="/welcome-images/landing-04.png" alt="Live session on Eccoozs" style={{ objectPosition: "center top" }} />
              <div className="ls-ov">
                <div className="ls-label">Connect<span>Live soundrooms &amp; sessions</span></div>
              </div>
            </div>

            <div className="ls-cell">
              <img src="/welcome-images/landing-05.jpg" alt="Creators going live on Eccoozs" />
              <div className="ls-ov">
                <div className="ls-label">Express<span>Your voice, your way</span></div>
              </div>
            </div>

            <div className="ls-cell">
              <img src="/welcome-images/landing-06.png" alt="Eccoozs soundrooms page" style={{ objectPosition: "center top" }} />
              <div className="ls-ov">
                <div className="ls-label">Stream<span>Go live to the world</span></div>
              </div>
            </div>

            <div className="ls-cell">
              <img src="/welcome-images/landing-07.png" alt="Eccoozs community wearing merch on campus" />
              <div className="ls-ov">
                <div className="ls-label">Elevate<span>Wear the culture</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="app-preview">
          <div className="ap-orb"></div>
          <div className="ap-inner">
            <div className="rv">
              <div className="seyebrow light">The App Experience</div>
              <h2 className="light">Beautifully designed<br />for every screen.</h2>
              <p className="sdesc light" style={{ marginBottom: "2rem" }}>
                Whether you're on your phone between meetings or at your desk building your audience —
                Eccoozs flows with your life.
              </p>
              <a className="btn-p" href="#download" style={{ display: "inline-flex" }}>
                <Icon name="arrow-right" />Get Early Access
              </a>
            </div>
            <div className="ap-img-wrap rv">
              <img src="/welcome-images/landing-08.png" alt="Eccoozs on laptop and phone" style={{ display: "block" }} />
            </div>
          </div>
        </section>

        <section id="community">
          <div className="comm-inner">
            <div className="comm-img rv">
              <img src="/welcome-images/landing-09.jpg" alt="Eccoozs community — Create Culture Be Real" />
            </div>
            <div className="rv">
              <div className="seyebrow dark">Our Story</div>
              <h2 className="dark">Built from within.<br />For all who walk<br />with respect.</h2>
              <p className="comm-quote">
                "I didn't build this to go viral. I built it because there was no place left for our voices to breathe."
              </p>
              <p className="comm-body">
                ECCOOZS was built by Foundational Black Americans as a digital sanctuary for culture, faith,
                and truth. But ALL ARE WELCOME HERE who walk in respect. This isn't just an app — it's a movement.
              </p>
            </div>
          </div>
        </section>

        <section id="history">
          <div className="hist-intro rv">
            <div className="seyebrow light" style={{ justifyContent: "center" }}>American Legacy</div>
            <h2 className="light">Honoring our ancestors.<br />Celebrating our culture.</h2>
            <p style={{ color: "rgba(255,255,255,.45)", maxWidth: "580px", margin: "0 auto", fontSize: ".97rem", lineHeight: "1.8" }}>
              These moments shaped us. These faces remind us where we come from — and why platforms like Eccoozs matter.
            </p>
          </div>

          <div className="hist-grid rv">
            <div className="hc tall">
              <img src="/welcome-images/landing-10.png" alt="Enslaved family in cotton field" />
              <div className="hc-ov">
                <span className="hc-tag">Our Foundation</span>
                <span className="hc-caption">Enslaved people who built a nation — their story lives in our blood</span>
              </div>
            </div>

            <div className="hc">
              <img src="/welcome-images/landing-11.png" alt="Native American chiefs at the White House with President Coolidge, 1924" style={{ objectPosition: "center top" }} />
              <div className="hc-ov">
                <span className="hc-tag">Indigenous Heritage</span>
                <span className="hc-caption">Native chiefs at the White House, 1924</span>
              </div>
            </div>

            <div className="hc">
              <img src="/welcome-images/landing-12.png" alt="Choctaw people in traditional dress" style={{ objectPosition: "center top" }} />
              <div className="hc-ov">
                <span className="hc-tag">Cultural Roots</span>
                <span className="hc-caption">Choctaw people — culture, tradition, and resilience</span>
              </div>
            </div>

            <div className="hc">
              <img src="/welcome-images/landing-13.png" alt="George Washington Carver in his laboratory at Tuskegee" style={{ objectPosition: "center" }} />
              <div className="hc-ov">
                <span className="hc-tag">Innovation</span>
                <span className="hc-caption">George Washington Carver — genius born from struggle</span>
              </div>
            </div>

            <div className="hc">
              <img src="/welcome-images/landing-14.png" alt="Dr. Martin Luther King Jr. and Malcolm X — the only time they met, 1964" style={{ objectPosition: "center top" }} />
              <div className="hc-ov">
                <span className="hc-tag">Leadership</span>
                <span className="hc-caption">Dr. King &amp; Malcolm X — March 26, 1964. Their only meeting.</span>
              </div>
            </div>

            <div className="hc">
              <img
                src="https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/crispus-attucks-gettyimages-517432282?_a=BAVMn6DY0"
                alt="Crispus Attucks — first American killed in the Boston Massacre, March 5 1770"
                style={{ objectPosition: "center top" }}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <div className="hc-ov">
                <span className="hc-tag">Revolution</span>
                <span className="hc-caption">Crispus Attucks — first American to die for independence, March 5, 1770</span>
              </div>
            </div>

            <div className="hc">
              <img
                src="https://1.bp.blogspot.com/-1Q79RbIkqPM/YHdSF9YVsTI/AAAAAAAArdE/eZHh2hp69Sky35nXQFwBa9s82ktARH4IwCLcBGAsYHQ/s0/black_african_american_civil_rights_soldiers.jpg"
                alt="Black African American Civil War soldiers"
                style={{ objectPosition: "center" }}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <div className="hc-ov">
                <span className="hc-tag">Civil War</span>
                <span className="hc-caption">Black Union soldiers — fought for a nation that enslaved their families</span>
              </div>
            </div>

            <div className="hc">
              <img src="/welcome-images/landing-15.png" alt="Buffalo Soldiers — Black Union Army regiment" style={{ objectPosition: "center" }} />
              <div className="hc-ov">
                <span className="hc-tag">Sacrifice</span>
                <span className="hc-caption">Buffalo Soldiers — defended a nation that denied them rights</span>
              </div>
            </div>
          </div>

          <div style={{ margin: "1.5rem calc(-5%) 0", position: "relative", overflow: "hidden" }}>
            <img
              src="/welcome-images/landing-16.png"
              alt="FBA Inventors and Innovators — Black American scientists, engineers and pioneers"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
            <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", background: "linear-gradient(to top,rgba(4,12,28,.92) 0%,rgba(4,12,28,.4) 60%,transparent 100%)", padding: "1.5rem 2rem 1.2rem" }}>
              <span style={{ fontSize: ".78rem", fontWeight: "700", color: "#fff", letterSpacing: ".14em", textTransform: "uppercase" }}>Inventors &amp; Innovators</span>
              <span style={{ display: "block", fontSize: ".7rem", color: "rgba(255,255,255,.55)", fontStyle: "italic", marginTop: "3px" }}>
                FBA scientists, engineers, and pioneers whose brilliance shaped the modern world — often uncredited, never forgotten
              </span>
            </div>
          </div>

          <p className="hist-note rv">Our digital museum of history is coming. Contribute your photos and help build the archive.</p>
        </section>

        <section id="download">
          <div className="dl-orb"></div>
          <div className="dlinner rv">
            <div className="seyebrow light" style={{ justifyContent: "center" }}>Early Access</div>
            <h2 className="light" style={{ margin: "0 auto .85rem" }}>Join the movement.<br />Be first.</h2>
            <p className="sdesc light" style={{ margin: "0 auto 2.5rem", textAlign: "center" }}>
              Be among the first to know when ECCOOZS opens. Members, creators, businesses, advertisers,
              and beta testers can register interest below.
            </p>

            <div className="wl-card">
              <h3>Join the 18+ Founding Waitlist</h3>
              <p className="wl-sub">Reserve your founding spot. Founding member access is limited.</p>
              <WaitlistForm />
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-inner">
            <div className="ftop">
              <div>
                <div className="fbrand">
                  <img className="fbrand-mark" src="/welcome-images/landing-01.png" alt="Eccoozs" />
                  <span className="fbwm">Eccoozs</span>
                </div>
                <p className="ftagline">Express. Explore. Elevate.</p>
              </div>

              <div>
                <div className="fct">Platform</div>
                <ul className="fls">
                  <li><a href="#features">Features</a></li>
                  <li><a href="#app-preview">App</a></li>
                  <li><a href="#download">Join Waitlist</a></li>
                  <li><a href="#">Soundrooms</a></li>
                  <li><a href="https://eccoozs.com/shop" target="_blank">Shop</a></li>
                </ul>
              </div>

              <div>
                <div className="fct">Legal &amp; Community</div>
                <ul className="fls">
                  <li><a href="/welcome/terms">Terms of Service</a></li>
                  <li><a href="/welcome/privacy">Privacy Policy</a></li>
                  <li><a href="/welcome/conduct">Code of Conduct</a></li>
                  <li><a href="/welcome/support">Community Support</a></li>
                </ul>
              </div>
            </div>

            <div className="fbot">
              <span className="fcp">© 2026 Eccoozs. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}