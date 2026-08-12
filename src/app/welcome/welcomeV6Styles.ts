export const welcomeV6Styles = String.raw`
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --night:#040c1c;--navy:#071240;--navy-2:#0b1a3e;
  --blue:#2448ee;--blue-l:#5575ff;--blue-d:#1535c6;--blue-m:rgba(36,72,238,.12);
  --cream:#f4f6fb;--cream-2:#e8edf8;--white:#fff;
  --td:#070f28;--tm:#1c3570;--tmut:#607ab5;
  --bdr:rgba(7,18,64,.09);--blight:rgba(255,255,255,.13);
}
html{scroll-behavior:smooth}
body{font-family:Arial,"Helvetica Neue",sans-serif;background:var(--cream);color:var(--td);overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}
.eccoozs-v6-root{overflow:hidden;background:var(--cream)}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 5%;height:72px;background:rgba(4,12,28,.94);backdrop-filter:blur(24px);border-bottom:1px solid var(--blight)}
.nav-logo{display:flex;align-items:center;gap:10px;min-width:172px}
.nav-mark{height:34px;width:34px;object-fit:contain;border-radius:50%}
.nav-wordmark{height:25px;width:auto;max-width:132px;object-fit:contain}
.nav-links{display:flex;gap:1.9rem;list-style:none;align-items:center}
.nav-links a{font-size:.82rem;font-weight:600;color:rgba(255,255,255,.62);transition:color .2s;position:relative;padding-bottom:4px;white-space:nowrap}
.nav-links a:hover,.nav-links a.active{color:#fff}
.nav-links a.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--blue-l);border-radius:1px}
.nav-right{display:flex;align-items:center;gap:14px;min-width:190px;justify-content:flex-end}
.nav-login{font-size:.82rem;font-weight:600;color:rgba(255,255,255,.58);transition:color .2s}
.nav-login:hover{color:#fff}
.nav-join{background:var(--blue);color:#fff;font-size:.82rem;font-weight:700;padding:10px 20px;border-radius:8px;display:inline-block;transition:background .2s,transform .15s;white-space:nowrap}
.nav-join:hover{background:var(--blue-d);transform:translateY(-1px)}

/* HERO */
#hero{height:760px;min-height:680px;position:relative;overflow:hidden;padding:0;background:var(--night)}
.hero-photo{position:absolute;inset:0;z-index:0}
.hero-photo img{width:100%;height:100%;object-fit:cover;object-position:center 22%}
.hero-color-wash{position:absolute;inset:0;z-index:1;background:rgba(7,18,64,.30);mix-blend-mode:multiply}
.hero-grad{position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,rgba(4,12,28,.98) 0%,rgba(4,12,28,.94) 25%,rgba(5,15,40,.74) 48%,rgba(7,18,64,.28) 70%,rgba(4,12,28,.08) 100%)}
.hero-content{position:relative;z-index:4;height:100%;display:flex;flex-direction:column;justify-content:center;padding:112px 5% 58px;max-width:690px}
.hero-eyebrow{font-size:.69rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-l);margin-bottom:1rem;display:flex;align-items:center;gap:9px}
.hero-eyebrow::before{content:'';width:22px;height:2px;background:var(--blue-l);display:inline-block;flex-shrink:0}
#hero h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.9rem,5vw,5rem);font-weight:700;line-height:.98;letter-spacing:-.035em;color:#fff;max-width:650px;margin:0 0 1.35rem}
.hero-desc{font-size:1rem;font-weight:400;color:rgba(255,255,255,.66);line-height:1.78;max-width:510px;margin-bottom:2rem}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.btn-p,.btn-blue{padding:13px 24px;background:var(--blue);color:#fff;font-weight:700;font-size:.88rem;border:none;border-radius:9px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:background .2s,transform .15s}
.btn-p:hover,.btn-blue:hover{background:var(--blue-d);transform:translateY(-1px)}
.btn-p i,.btn-blue i{width:16px;height:16px}
.btn-g{padding:13px 24px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.9);font-weight:600;font-size:.88rem;border:1.5px solid rgba(255,255,255,.3);border-radius:9px;display:inline-flex;align-items:center;justify-content:center;transition:all .2s}
.btn-g:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.5)}

/* SHARED */
section{padding:6.5rem 5%}
.seyebrow{font-size:.69rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;margin-bottom:.85rem;display:flex;align-items:center;gap:8px}
.seyebrow::before{content:'';width:16px;height:1.5px;display:inline-block;flex-shrink:0}
.seyebrow.light{color:var(--blue-l)}.seyebrow.light::before{background:var(--blue-l)}
.seyebrow.dark{color:var(--blue)}.seyebrow.dark::before{background:var(--blue)}
h2{font-family:'Cormorant Garant',Georgia,serif;font-size:clamp(2.2rem,4vw,3.3rem);font-weight:700;line-height:1.1;margin-bottom:1rem}
h2.light{color:#fff}h2.dark{color:var(--td)}
.sdesc{font-size:.97rem;line-height:1.8;max-width:520px}.sdesc.light{color:rgba(255,255,255,.53)}.sdesc.dark{color:var(--tmut)}

/* ECOSYSTEM */
#ecosystem{background:#f7f9ff;padding-top:5.7rem;padding-bottom:6.2rem}
.eco-head{max-width:820px;margin:0 auto 2.7rem;text-align:center}
.eco-head .seyebrow{justify-content:center}.eco-head .seyebrow::before{display:none}
.eco-head h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.2rem,3.6vw,3.35rem);letter-spacing:-.025em;margin-bottom:.75rem}
.eco-head p{color:var(--tmut);font-size:.94rem;line-height:1.7}
.eco-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.25rem}
.eco-card{position:relative;background:#fff;border:1px solid rgba(7,18,64,.09);border-radius:18px;overflow:hidden;min-height:390px;box-shadow:0 16px 45px rgba(7,18,64,.055);transition:transform .25s,border-color .25s,box-shadow .25s}
.eco-card:hover{transform:translateY(-4px);border-color:rgba(36,72,238,.23);box-shadow:0 22px 55px rgba(7,18,64,.09)}
.eco-media{height:145px;background:#edf2ff;overflow:hidden}.eco-media img{width:100%;height:100%;object-fit:cover}.eco-media.business img{object-fit:contain;padding:8px}
.eco-icon{position:absolute;top:119px;left:20px;width:50px;height:50px;border-radius:50%;background:var(--blue);color:#fff;display:grid;place-items:center;border:4px solid #fff;box-shadow:0 7px 18px rgba(7,18,64,.15)}
.eco-icon i{width:21px;height:21px}.eco-icon.branded{padding:0;overflow:hidden}.eco-icon.branded img{width:100%;height:100%;object-fit:cover}
.eco-body{padding:2.2rem 1.35rem 1.35rem;display:flex;flex-direction:column;min-height:242px}
.eco-body h3{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;color:var(--td);margin-bottom:.55rem}
.eco-body p{font-size:.84rem;color:var(--tmut);line-height:1.62;margin-bottom:1.1rem}
.eco-body span{margin-top:auto;color:var(--blue);font-size:.8rem;font-weight:800;display:flex;align-items:center;gap:6px}.eco-body span i{width:14px;height:14px}

/* ONE ECCOOZS APP SECTION */
#eccoozs-app{background:var(--night);position:relative;overflow:hidden}
#eccoozs-app::before{content:'';position:absolute;width:720px;height:720px;border-radius:50%;background:radial-gradient(rgba(36,72,238,.16),transparent 67%);right:-220px;bottom:-320px;filter:blur(65px)}
.app-shell{position:relative;z-index:1;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:.92fr 1.08fr;gap:4rem;align-items:center}
.app-copy h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.6rem,4vw,4.15rem);letter-spacing:-.025em;line-height:1.02}
.app-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem;margin:2rem 0}
.app-feature{display:flex;align-items:flex-start;gap:.75rem;padding:.9rem;border:1px solid rgba(255,255,255,.11);background:rgba(255,255,255,.035);border-radius:12px}
.app-feature>i{width:19px;height:19px;color:var(--blue-l);flex:0 0 auto;margin-top:2px}
.app-feature strong{display:block;color:#fff;font-size:.82rem;margin-bottom:.22rem}.app-feature span{display:block;color:rgba(255,255,255,.43);font-size:.7rem;line-height:1.45}
.app-visual{display:flex;align-items:center;justify-content:center}.app-visual img{width:100%;max-height:540px;object-fit:contain;border-radius:22px;box-shadow:0 30px 80px rgba(0,0,0,.32)}

/* BUSINESS */
#business{background:#fff;padding-top:5.8rem;padding-bottom:5.8rem}
.business-shell{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:.72fr 1.28fr;gap:4rem;align-items:center}
.business-copy h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.7rem,4vw,4.25rem);letter-spacing:-.03em;margin-bottom:.35rem}
.business-lede{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;color:var(--tm);margin-bottom:1rem}
.business-points{display:flex;flex-wrap:wrap;gap:.65rem;margin:1.5rem 0 1.7rem}.business-points span{display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:9px;background:#f3f6fd;border:1px solid var(--bdr);font-size:.76rem;font-weight:700;color:var(--tm)}.business-points i{width:15px;height:15px;color:var(--blue)}
.business-visual{min-height:380px;display:flex;align-items:center;justify-content:center}.business-visual img{width:100%;max-height:550px;object-fit:contain}

/* ECCOOZS LEARNING APPS — PRESERVED */
#learning-apps{background:#f7f9ff;padding:7rem 5%;position:relative;overflow:hidden}
.la-inner{max-width:1180px;margin:0 auto}.la-head{text-align:center;max-width:760px;margin:0 auto 2.6rem}.la-head .seyebrow{justify-content:center}.la-head .seyebrow::before{display:none}.la-head h2{font-family:'Cormorant Garant',serif;font-size:clamp(2.5rem,4.5vw,4.3rem);line-height:.98;color:var(--td);margin:.45rem 0 1rem}.la-head p{color:var(--tmut);line-height:1.75}.la-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem}.la-card{display:block;background:#fff;border:1px solid var(--bdr);border-radius:22px;overflow:hidden;box-shadow:0 18px 48px rgba(6,20,58,.08);transition:transform .25s,border-color .25s}.la-card:hover{transform:translateY(-4px);border-color:rgba(31,71,224,.28)}.la-card img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}.la-body{padding:1.45rem 1.5rem 1.6rem}.la-kicker{font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);margin-bottom:.45rem}.la-card.voice .la-kicker{color:#6c3ce8}.la-title{font-size:1.45rem;font-weight:800;color:var(--td);margin-bottom:.45rem}.la-copy{font-size:.86rem;color:var(--tmut);line-height:1.65;margin-bottom:1rem}.la-link{font-size:.83rem;font-weight:800;color:var(--blue)}.la-card.voice .la-link{color:#6c3ce8}.la-all{display:flex;justify-content:center;margin-top:2rem}.la-all a{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border:1px solid rgba(31,71,224,.18);border-radius:10px;color:var(--blue);font-size:.84rem;font-weight:700;background:#fff}
@media(min-width:960px){#learning-apps .la-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
#learning-apps .la-card.youth .la-kicker,#learning-apps .la-card.youth .la-link{color:#7140d9}
#learning-apps .la-card.adult .la-kicker,#learning-apps .la-card.adult .la-link{color:#4f4698}
#learning-apps .la-card img{object-position:center}

/* COMMUNITY / STORY — PRESERVED */
#community{background:var(--white)}
.comm-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
.comm-img{border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(7,18,64,.1)}
.comm-img img{width:100%;height:100%;object-fit:cover;display:block}
.comm-quote{font-family:'Cormorant Garant',serif;font-size:1.45rem;font-weight:500;color:var(--td);line-height:1.65;font-style:italic;margin-bottom:1.5rem;padding-left:1.5rem;border-left:3px solid var(--blue)}
.comm-body{font-size:.94rem;color:var(--tmut);line-height:1.84;margin-bottom:2rem}

/* HISTORY — PRESERVED */
#history{background:var(--night);padding:8rem 5%}
.hist-intro{max-width:1180px;margin:0 auto 3.5rem;text-align:center}
.hist-intro .seyebrow{justify-content:center}
.hist-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:300px 300px 300px;gap:.9rem}
.hc{border-radius:16px;overflow:hidden;position:relative;cursor:pointer}.hc.tall{grid-row:span 2}
.hc img{width:100%;height:100%;object-fit:cover;object-position:center;transition:transform .45s ease;filter:grayscale(15%) contrast(1.05)}
.hc:hover img{transform:scale(1.04);filter:grayscale(0%) contrast(1.08)}
.hc-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(4,12,28,.88) 0%,rgba(4,12,28,.45) 40%,rgba(4,12,28,.12) 65%,transparent 85%);display:flex;flex-direction:column;justify-content:flex-end;padding:18px 20px;transition:background .3s}
.hc:hover .hc-ov{background:linear-gradient(to top,rgba(4,12,28,.94) 0%,rgba(4,12,28,.55) 50%,rgba(4,12,28,.1) 75%,transparent 90%)}
.hc-tag{font-size:.72rem;font-weight:700;color:rgba(255,255,255,.95);letter-spacing:.14em;text-transform:uppercase;line-height:1}.hc-caption{font-size:.68rem;color:rgba(255,255,255,.55);margin-top:3px;font-style:italic;line-height:1.4}
.hc::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--blue-l);transform:scaleX(0);transform-origin:left;transition:transform .35s ease}.hc:hover::after{transform:scaleX(1)}
.hist-note{max-width:1180px;margin:2rem auto 0;text-align:center;font-size:.85rem;color:rgba(255,255,255,.35);font-style:italic}

/* DOWNLOAD / WAITLIST — PRESERVED */
#download{background:var(--navy);padding:8rem 5%;text-align:center;position:relative;overflow:hidden}
.dl-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(rgba(26,62,245,.15) 0%,transparent 65%);top:-150px;left:50%;transform:translateX(-50%);filter:blur(90px);pointer-events:none}
.dlinner{position:relative;z-index:1;max-width:820px;margin:0 auto}
.waitlist-card{max-width:760px;margin:0 auto 1.7rem;padding:1.7rem;background:rgba(255,255,255,.065);border:1px solid rgba(255,255,255,.13);border-radius:18px;text-align:left;box-shadow:0 24px 70px rgba(0,0,0,.12)}
.waitlist-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.waitlist-field.full{grid-column:1/-1}
.waitlist-label{display:block;color:rgba(255,255,255,.72);font-size:.74rem;font-weight:700;letter-spacing:.02em;margin:0 0 6px}
.waitlist-input,.waitlist-select{width:100%;padding:13px 14px;background:rgba(255,255,255,.075);border:1px solid rgba(255,255,255,.14);border-radius:10px;color:#fff;font-family:Arial,"Helvetica Neue",sans-serif;font-size:.88rem;outline:none}
.waitlist-input::placeholder{color:rgba(255,255,255,.28)}.waitlist-select option{color:#071240;background:#fff}.waitlist-input:focus,.waitlist-select:focus{border-color:var(--blue-l)}
.waitlist-check{display:flex;align-items:flex-start;gap:10px;margin:16px 0;color:rgba(255,255,255,.68);font-size:.78rem;line-height:1.55}.waitlist-check input{margin-top:3px;accent-color:var(--blue)}
.waitlist-submit{width:100%;padding:14px 24px;background:var(--blue);color:#fff;font-size:.9rem;font-weight:700;border:0;border-radius:10px;cursor:pointer}.waitlist-submit:disabled{opacity:.65;cursor:wait}
.waitlist-msg{min-height:20px;margin-top:10px;text-align:center;font-size:.78rem}.waitlist-msg.ok{color:#8cf0b3}.waitlist-msg.err{color:#ff9aa9}.waitlist-hp{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}
.sbgs{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap}
.sbg{display:flex;align-items:center;gap:9px;padding:11px 18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.11);border-radius:10px;color:rgba(255,255,255,.6);font-size:.8rem;font-weight:500;transition:background .2s;text-align:left}.sbg:hover{background:rgba(255,255,255,.1)}.sbg i{width:18px;height:18px;flex-shrink:0}.sbg>img{width:25px;height:25px;object-fit:contain;border-radius:6px;flex-shrink:0}.sbg strong{display:block;font-size:.88rem;color:#fff}.sbg span{font-size:.64rem;color:rgba(255,255,255,.35)}

/* FOOTER */
footer{background:var(--night);padding:4.5rem 5% 2.4rem;color:rgba(255,255,255,.4)}
.footer-inner{max-width:1180px;margin:0 auto}.ftop{display:grid;grid-template-columns:1.55fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3.5rem}
.fbrand{display:flex;align-items:center;gap:10px;margin-bottom:.85rem}.fbrand-mark{height:31px;width:31px;object-fit:contain;border-radius:50%}.fbrand-wordmark{height:23px;width:auto;max-width:130px;object-fit:contain}
.ftagline{font-size:.78rem;color:rgba(255,255,255,.36);line-height:1.7;max-width:235px}.fct{font-size:.67rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.32);margin-bottom:1rem}.fls{list-style:none;display:flex;flex-direction:column;gap:.62rem}.fls a{font-size:.82rem;color:rgba(255,255,255,.48);transition:color .2s}.fls a:hover{color:#fff}
.fbot{border-top:1px solid rgba(255,255,255,.07);padding-top:1.8rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}.fcp{font-size:.75rem}.flg{display:flex;gap:1.4rem}.flg a{font-size:.75rem;color:rgba(255,255,255,.3)}.flg a:hover{color:rgba(255,255,255,.65)}

/* REVEAL */
.rv{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s ease}.rv.vis{opacity:1;transform:translateY(0)}

/* RESPONSIVE */
@media(max-width:1100px){.nav-links{gap:1.15rem}.nav-links a{font-size:.76rem}.eco-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.eco-card{min-height:360px}.app-shell,.business-shell{grid-template-columns:1fr;gap:3rem}.app-visual img{max-width:850px}.business-copy{max-width:690px}.business-visual{min-height:0}}
@media(max-width:960px){.nav-links{display:none}.nav-logo{min-width:auto}.nav-right{min-width:auto}.comm-inner{grid-template-columns:1fr;gap:3rem}.hist-grid{grid-template-columns:1fr 1fr;grid-template-rows:auto}.hc{min-height:300px}.hc.tall{grid-row:span 1}.ftop{grid-template-columns:1fr 1fr}}
@media(max-width:760px){nav{padding:0 1.15rem;height:64px}.nav-mark{height:30px;width:30px}.nav-wordmark{height:21px;max-width:112px}.nav-login{display:none}.nav-join{padding:9px 13px;font-size:.75rem}#hero{height:auto;min-height:680px}.hero-photo img{object-position:62% top}.hero-grad{background:linear-gradient(90deg,rgba(4,12,28,.98) 0%,rgba(4,12,28,.91) 48%,rgba(4,12,28,.45) 100%)}.hero-content{padding:118px 1.25rem 70px;max-width:580px}#hero h1{font-size:clamp(2.65rem,13vw,4rem)}section{padding:5rem 1.25rem}.eco-grid{grid-template-columns:1fr}.eco-card{min-height:0}.eco-body{min-height:210px}.app-feature-grid{grid-template-columns:1fr}.waitlist-grid{grid-template-columns:1fr}.waitlist-field.full{grid-column:auto}.waitlist-card{padding:1.2rem}.hist-grid{grid-template-columns:1fr;grid-template-rows:auto}.hc{min-height:330px}.ftop{grid-template-columns:1fr;gap:2.2rem}.business-points{flex-direction:column;align-items:flex-start}.business-visual img{transform:none}.inventors-grid-v3{margin-left:-1.25rem!important;margin-right:-1.25rem!important}}
@media(max-width:460px){.nav-logo{gap:7px}.nav-wordmark{height:19px;max-width:100px}.nav-join{padding:9px 11px}.eco-media{height:130px}.app-feature{padding:.8rem}.sbgs{align-items:stretch}.sbg{width:100%}}
`;
