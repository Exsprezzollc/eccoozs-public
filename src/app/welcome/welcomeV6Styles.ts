export const welcomeV6Styles = String.raw`
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
  display:flex;align-items:center;justify-content:space-between;
  padding:0 5%;height:72px;
  background:rgba(4,12,28,0.92);
  backdrop-filter:blur(24px);
  border-bottom:1px solid var(--blight);
}
.nav-logo{display:flex;align-items:center;gap:10px}
/* eccoozs-mark.png has a dark bg — use screen blend to knock it out */
.nav-mark{
  height:34px;width:34px;object-fit:contain;
  mix-blend-mode:screen;
  filter:brightness(1.1);
}
.nav-wm{font-family:'DM Sans',sans-serif;font-size:1.1rem;font-weight:800;color:#fff;letter-spacing:.07em;text-transform:uppercase}
.nav-tagline{font-size:.58rem;font-weight:500;color:rgba(255,255,255,.38);letter-spacing:.1em;text-transform:uppercase;margin-top:2px;display:block}
.nav-links{display:flex;gap:2.2rem;list-style:none}
.nav-links a{font-size:.84rem;font-weight:500;color:rgba(255,255,255,.58);transition:color .2s;position:relative;padding-bottom:4px}
.nav-links a:hover,.nav-links a.active{color:#fff}
.nav-links a.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--blue-l);border-radius:1px}
.nav-right{display:flex;align-items:center;gap:14px}
.nav-login{font-size:.84rem;font-weight:500;color:rgba(255,255,255,.55);transition:color .2s}
.nav-login:hover{color:#fff}
.nav-join{background:var(--blue);color:#fff;font-size:.84rem;font-weight:600;padding:10px 22px;border-radius:8px;display:inline-block;transition:background .2s,transform .15s}
.nav-join:hover{background:var(--blue-d);transform:translateY(-1px)}

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
.stats-strip{background:var(--white);border-bottom:1px solid var(--bdr);padding:2.5rem 5%;display:flex;align-items:center;justify-content:center}
.si{flex:1;text-align:center;padding:0 1.5rem;max-width:190px}
.si+.si{border-left:1px solid var(--bdr)}
.sn{font-family:'Cormorant Garant',serif;font-size:2.7rem;font-weight:700;color:var(--td);line-height:1}
.sn span{color:var(--blue)}
.sl{font-size:.73rem;font-weight:500;color:var(--tmut);margin-top:4px}

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

/* ── ECHO (NAVY) ──────────────────────────────────── */
#echo{background:var(--navy);padding:6rem 5%;text-align:center;position:relative;overflow:hidden}
.echo-orb{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(rgba(26,62,245,.1) 0%,transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(80px);pointer-events:none}
.echo-inner{position:relative;z-index:1;max-width:820px;margin:0 auto}
.echo-quote{font-family:'Cormorant Garant',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:600;color:#fff;line-height:1.28;margin-bottom:1.5rem}
.echo-quote em{font-style:italic;color:var(--blue-l)}
.echo-body{font-size:1rem;color:rgba(255,255,255,.42);line-height:1.85;max-width:580px;margin:0 auto}

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
.ftop{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem;margin-bottom:4rem}
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
@media(max-width:960px){
  .ap-inner,.comm-inner{grid-template-columns:1fr;gap:3rem}
  .fgrid{grid-template-columns:1fr 1fr}
  .pgd{grid-template-columns:1fr}.pd.feat{transform:none}
  .ftop{grid-template-columns:1fr 1fr}
  .nav-links{display:none}
  .feature-strip{display:grid;grid-template-columns:1fr 1fr}
  .fs-item{border-right:none;border-bottom:1px solid rgba(26,62,245,.15)}
  .stats-strip{flex-wrap:wrap}
  .si+.si{border-left:none;border-top:1px solid var(--bdr)}
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

/* ── ECCOOZS LEARNING APPS (added without altering the existing V6 design) ── */
#learning-apps{background:#f7f9ff;padding:7rem 5%;position:relative;overflow:hidden}
.la-inner{max-width:1180px;margin:0 auto}.la-head{text-align:center;max-width:760px;margin:0 auto 2.6rem}.la-head .seyebrow{justify-content:center}.la-head .seyebrow::before{display:none}.la-head h2{font-family:'Cormorant Garant',serif;font-size:clamp(2.5rem,4.5vw,4.3rem);line-height:.98;color:var(--td);margin:.45rem 0 1rem}.la-head p{color:var(--tmut);line-height:1.75}.la-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem}.la-card{display:block;background:#fff;border:1px solid var(--bdr);border-radius:22px;overflow:hidden;box-shadow:0 18px 48px rgba(6,20,58,.08);transition:transform .25s,border-color .25s}.la-card:hover{transform:translateY(-4px);border-color:rgba(31,71,224,.28)}.la-card img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}.la-body{padding:1.45rem 1.5rem 1.6rem}.la-kicker{font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);margin-bottom:.45rem}.la-card.voice .la-kicker{color:#6c3ce8}.la-title{font-size:1.45rem;font-weight:800;color:var(--td);margin-bottom:.45rem}.la-copy{font-size:.86rem;color:var(--tmut);line-height:1.65;margin-bottom:1rem}.la-link{font-size:.83rem;font-weight:800;color:var(--blue)}.la-card.voice .la-link{color:#6c3ce8}.la-all{display:flex;justify-content:center;margin-top:2rem}.la-all a{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border:1px solid rgba(31,71,224,.18);border-radius:10px;color:var(--blue);font-size:.84rem;font-weight:700;background:#fff}
/* Full founding waitlist sheet restored inside the CURRENT V6 section. */
#download .dlinner{max-width:820px}.waitlist-card{max-width:760px;margin:0 auto 1.7rem;padding:1.7rem;background:rgba(255,255,255,.065);border:1px solid rgba(255,255,255,.13);border-radius:18px;text-align:left;box-shadow:0 24px 70px rgba(0,0,0,.12)}.waitlist-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.waitlist-field.full{grid-column:1/-1}.waitlist-label{display:block;color:rgba(255,255,255,.72);font-size:.74rem;font-weight:700;letter-spacing:.02em;margin:0 0 6px}.waitlist-input,.waitlist-select{width:100%;padding:13px 14px;background:rgba(255,255,255,.075);border:1px solid rgba(255,255,255,.14);border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-size:.88rem;outline:none}.waitlist-input::placeholder{color:rgba(255,255,255,.28)}.waitlist-select option{color:#071240;background:#fff}.waitlist-input:focus,.waitlist-select:focus{border-color:var(--blue-l)}.waitlist-check{display:flex;align-items:flex-start;gap:10px;margin:16px 0;color:rgba(255,255,255,.68);font-size:.78rem;line-height:1.55}.waitlist-check input{margin-top:3px;accent-color:var(--blue)}.waitlist-submit{width:100%;padding:14px 24px;background:var(--blue);color:#fff;font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:700;border:0;border-radius:10px;cursor:pointer}.waitlist-submit:disabled{opacity:.65;cursor:wait}.waitlist-msg{min-height:20px;margin-top:10px;text-align:center;font-size:.78rem}.waitlist-msg.ok{color:#8cf0b3}.waitlist-msg.err{color:#ff9aa9}.waitlist-hp{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}
@media(max-width:760px){.la-grid,.waitlist-grid{grid-template-columns:1fr}.waitlist-field.full{grid-column:auto}.waitlist-card{padding:1.2rem}}


/* Learning Apps split: Math Trail + Youth Voice Journey + Adult Voice Journey */
@media(min-width:960px){#learning-apps .la-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
#learning-apps .la-card.youth .la-kicker,#learning-apps .la-card.youth .la-link{color:#7140d9}
#learning-apps .la-card.adult .la-kicker,#learning-apps .la-card.adult .la-link{color:#4f4698}
#learning-apps .la-card img{object-position:center}
`;
