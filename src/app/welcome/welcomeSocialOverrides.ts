export const welcomeSocialOverrides = String.raw`
:root{--social-night:#020817;--social-night-2:#061329;--social-panel:#091a35;--social-line:rgba(67,139,255,.35);--social-blue:#2563ff;--social-blue-2:#0f8cff;--social-cream:#f7f1e8;--social-muted:#9db0cb}
.eccoozs-v6-root{background:var(--social-night)!important;color:#fff!important}
.eccoozs-v6-root nav{background:rgba(2,8,23,.94)!important;border-bottom:1px solid rgba(83,151,255,.24)!important;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
.social-prestige-link{min-width:210px!important;display:flex!important;align-items:center!important}
.social-prestige-logo{display:block;width:185px;height:48px;overflow:hidden;filter:drop-shadow(0 0 14px rgba(33,112,255,.48));pointer-events:none}
.social-prestige-logo img{display:block;width:160px;height:auto;margin:7px 0 0}
.eccoozs-v6-root .nav-links a,.eccoozs-v6-root .nav-login{color:rgba(238,244,255,.72)!important}
.eccoozs-v6-root .nav-links a:hover,.eccoozs-v6-root .nav-links a.active,.eccoozs-v6-root .nav-login:hover{color:#fff!important}
.eccoozs-v6-root .nav-join{box-shadow:0 0 22px rgba(37,99,255,.30)!important}

.social-kicker{display:flex;align-items:center;gap:12px;color:#76a8ff;font-size:.72rem;font-weight:800;letter-spacing:.24em;text-transform:uppercase;margin-bottom:1rem}
.social-kicker:before{content:"";width:28px;height:2px;background:#2d66ff;box-shadow:0 0 12px rgba(45,102,255,.78)}
.social-kicker.centered{justify-content:center}.social-kicker.centered:after{content:"";width:28px;height:2px;background:#2d66ff;box-shadow:0 0 12px rgba(45,102,255,.78)}

.social-hero{position:relative!important;min-height:720px!important;display:block!important;overflow:hidden!important;background:radial-gradient(circle at 78% 30%,rgba(25,100,255,.22),transparent 34%),linear-gradient(135deg,#020817 0%,#041027 55%,#020817 100%)!important}
.social-hero-photo{position:absolute;inset:0 0 0 38%;overflow:hidden;z-index:1}
.social-hero-photo img{width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.9) brightness(.72) contrast(1.03);-webkit-mask-image:linear-gradient(90deg,transparent 0%,rgba(0,0,0,.18) 8%,#000 32%,#000 86%,rgba(0,0,0,.7) 100%),linear-gradient(180deg,#000 0%,#000 82%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0%,rgba(0,0,0,.18) 8%,#000 32%,#000 86%,rgba(0,0,0,.7) 100%),linear-gradient(180deg,#000 0%,#000 82%,transparent 100%);-webkit-mask-composite:source-in;mask-composite:intersect}
.social-hero-wash{position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,#020817 0%,rgba(2,8,23,.98) 31%,rgba(2,8,23,.72) 51%,rgba(2,8,23,.14) 78%,rgba(2,8,23,.18) 100%),linear-gradient(180deg,transparent 68%,#020817 100%)}
.social-hero-copy{position:relative;z-index:3;width:min(690px,52vw);padding:118px 0 80px clamp(28px,5.3vw,88px)!important}
.social-hero-copy h1{margin:0!important;color:var(--social-cream)!important;font-family:Georgia,"Times New Roman",serif!important;font-size:clamp(62px,6.7vw,108px)!important;line-height:.88!important;font-weight:400!important;letter-spacing:-.055em!important;text-shadow:0 14px 40px rgba(0,0,0,.36)}
.social-hero-copy>p{max-width:560px;margin:25px 0 0;color:#b8c8dd;font-size:1.08rem;line-height:1.75}
.social-hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}
.social-hero-actions .btn-g{border-color:rgba(112,170,255,.55)!important;color:#fff!important;background:rgba(8,24,53,.52)!important}
.social-values{display:flex;gap:20px;flex-wrap:wrap;margin-top:38px;color:#7f9bbd;font-size:.66rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.social-values span+span:before{content:"";display:inline-block;width:1px;height:18px;background:rgba(99,160,255,.30);margin-right:20px;vertical-align:middle}

.social-app-section,.social-business-section,.social-story-section,.social-access-section{position:relative;overflow:hidden;background:var(--social-night)!important}
.social-app-section{border-top:1px solid rgba(62,139,255,.34);border-bottom:1px solid rgba(62,139,255,.24);background:radial-gradient(circle at 74% 45%,rgba(18,91,255,.16),transparent 27%),linear-gradient(180deg,#031026,#020817)!important}
.social-section-shell{width:min(1510px,92vw);margin:0 auto}
.social-app-shell{display:grid;grid-template-columns:.92fr 1.08fr;gap:64px;align-items:center;padding:86px 0 94px}
.social-app-copy h2,.social-business-copy h2,.social-story-copy h2,.social-access-inner h2{margin:0;color:var(--social-cream);font-family:Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-.045em}
.social-app-copy h2{font-size:clamp(46px,5vw,76px);line-height:.96}
.social-lede{color:#a9bdd7!important;font-size:1rem!important;line-height:1.75!important}
.social-app-copy>.social-lede{max-width:640px;margin:20px 0 24px}
.social-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:26px 0 30px}
.social-feature{display:flex;gap:14px;align-items:flex-start;padding:17px 18px;border:1px solid rgba(72,145,255,.34);border-radius:13px;background:linear-gradient(145deg,rgba(9,27,56,.82),rgba(4,16,36,.76));box-shadow:0 0 0 1px rgba(255,255,255,.018) inset,0 12px 30px rgba(0,0,0,.16);transition:.2s ease}
.social-feature:hover{transform:translateY(-2px);border-color:rgba(83,163,255,.68);box-shadow:0 0 22px rgba(29,101,255,.14)}
.social-feature svg{width:22px;height:22px;color:#3c82ff;flex:0 0 auto;filter:drop-shadow(0 0 8px rgba(60,130,255,.38))}
.social-feature strong{display:block;color:#f7f9ff;font-size:.92rem}.social-feature span{display:block;margin-top:4px;color:#8196b4;font-size:.76rem;line-height:1.45}
.social-device-stage{position:relative;min-height:620px;display:flex;align-items:center;justify-content:center}
.social-device-glow{position:absolute;width:72%;height:65%;border-radius:50%;background:radial-gradient(circle,rgba(19,107,255,.26),rgba(19,107,255,.05) 45%,transparent 72%);filter:blur(20px)}
.social-desktop-shot{position:absolute;width:84%;max-height:560px;object-fit:contain;right:2%;top:5%;filter:drop-shadow(0 28px 48px rgba(0,0,0,.58));border-radius:20px}
.social-mobile-shot{position:absolute;width:33%;max-height:570px;object-fit:contain;left:1%;bottom:0;filter:drop-shadow(0 28px 44px rgba(0,0,0,.60));z-index:3}

.social-business-section{background:radial-gradient(circle at 72% 30%,rgba(31,100,255,.18),transparent 28%),linear-gradient(180deg,#020817,#061329 54%,#020817)!important;border-bottom:1px solid rgba(65,140,255,.26)}
.social-business-shell{display:grid;grid-template-columns:.72fr 1.28fr;gap:46px;align-items:center;padding:86px 0 104px}
.social-business-copy h2{font-size:clamp(52px,5.6vw,82px);line-height:.95}
.social-business-copy .business-lede{margin:18px 0 8px;color:#d8e6ff!important;font-family:Georgia,"Times New Roman",serif;font-size:1.45rem!important}
.social-business-copy>.social-lede{max-width:560px;margin:0 0 24px}
.social-business-points{display:flex;flex-wrap:wrap;gap:10px;margin:25px 0 28px}.social-business-points span{display:inline-flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid rgba(82,148,255,.32);border-radius:999px;background:rgba(11,29,61,.64);color:#dbe9ff;font-size:.74rem;font-weight:700}.social-business-points svg{width:16px;color:#5f9bff}
.social-business-gallery{position:relative;min-height:650px}
.social-business-main{position:absolute;width:76%;right:0;top:8%;border-radius:18px;box-shadow:0 26px 55px rgba(0,0,0,.48);border:1px solid rgba(79,153,255,.28)}
.social-business-card{position:absolute;width:34%;border-radius:14px;border:1px solid rgba(91,159,255,.35);box-shadow:0 26px 55px rgba(0,0,0,.54)}
.social-business-card-one{left:0;bottom:7%}.social-business-card-two{left:7%;top:2%;transform:rotate(-1deg)}

.social-story-section{background:radial-gradient(circle at 22% 42%,rgba(20,92,255,.17),transparent 28%),linear-gradient(180deg,#031026,#020817)!important;border-bottom:1px solid rgba(57,127,255,.25)}
.social-story-shell{display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center;padding:88px 0 98px}
.social-story-image{position:relative;min-height:510px}.social-story-image img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:26px;filter:saturate(.88) brightness(.82);-webkit-mask-image:radial-gradient(ellipse at center,#000 58%,rgba(0,0,0,.92) 70%,transparent 98%);mask-image:radial-gradient(ellipse at center,#000 58%,rgba(0,0,0,.92) 70%,transparent 98%)}
.social-story-image:after{content:"";position:absolute;inset:0;border-radius:26px;box-shadow:inset 0 0 80px 28px #020817;pointer-events:none}
.social-story-copy h2{font-size:clamp(48px,5.2vw,78px);line-height:.98}
.social-story-quote{max-width:700px;margin:26px 0 22px;padding:6px 0 6px 22px;border-left:2px solid #2e6cff;color:#edf3ff;font-family:Georgia,"Times New Roman",serif;font-size:1.28rem;font-style:italic;line-height:1.6}
.social-story-body{max-width:700px;color:#9fb5d1;font-size:.98rem;line-height:1.75}

.social-access-section{padding:88px 0 92px;background:radial-gradient(ellipse at 50% 110%,rgba(20,103,255,.38),transparent 38%),radial-gradient(circle at 50% 28%,rgba(17,72,224,.20),transparent 26%),#020817!important;border-bottom:1px solid rgba(73,147,255,.28)}
.social-access-orb{position:absolute;left:50%;bottom:-240px;transform:translateX(-50%);width:1400px;height:520px;border-radius:50%;border:1px solid rgba(75,158,255,.35);box-shadow:0 -30px 100px rgba(25,95,255,.19),inset 0 30px 100px rgba(11,62,174,.18)}
.social-access-inner{position:relative;z-index:2;width:min(1180px,90vw);margin:0 auto;text-align:center}
.social-access-inner h2{font-size:clamp(46px,5.3vw,76px);line-height:.98}.social-access-lede{color:#93a9c8;margin:17px auto 32px;font-size:.96rem}
.social-access-layout{display:grid;grid-template-columns:1fr 260px;gap:24px;align-items:center;text-align:left}
.social-waitlist-card{background:linear-gradient(145deg,rgba(15,34,74,.94),rgba(7,22,52,.96))!important;border:1px solid rgba(86,151,255,.38)!important;box-shadow:0 0 38px rgba(25,100,255,.14),0 30px 70px rgba(0,0,0,.32)!important}
.social-access-section .waitlist-label,.social-access-section .waitlist-check{color:#dce7f8!important}.social-access-section .waitlist-input,.social-access-section .waitlist-select{background:rgba(14,34,73,.85)!important;border-color:rgba(117,159,222,.35)!important;color:#fff!important}.social-access-section .waitlist-input::placeholder{color:#7f93b2!important}.social-access-section .waitlist-submit{background:linear-gradient(90deg,#2157ff,#2d6bff)!important;box-shadow:0 0 24px rgba(40,103,255,.26)!important}
.social-access-values{display:grid;gap:12px}.social-access-values div{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid rgba(79,149,255,.26);border-radius:12px;background:rgba(7,23,54,.56);color:#dbe8ff;font-weight:700;font-size:.84rem}.social-access-values svg{width:21px;height:21px;color:#4f8fff}

.eccoozs-v6-root footer{background:#010713!important;border-top:1px solid rgba(73,145,255,.24)!important}.social-footer-logo{display:block;width:210px;height:66px;overflow:hidden;filter:drop-shadow(0 0 16px rgba(33,112,255,.28));pointer-events:none}.social-footer-logo img{display:block;width:180px;height:auto;margin:9px 0 0}.social-footer-brand>a{display:inline-block}.social-footer-top{align-items:flex-start}.eccoozs-v6-root footer .fct{color:#7288a9!important}.eccoozs-v6-root footer a,.eccoozs-v6-root footer .ftagline,.eccoozs-v6-root footer .fcp{color:rgba(199,214,235,.56)!important}.eccoozs-v6-root footer a:hover{color:#fff!important}

@media(max-width:1180px){.social-app-shell,.social-business-shell,.social-story-shell{grid-template-columns:1fr;gap:36px}.social-device-stage{min-height:560px}.social-business-gallery{min-height:600px}.social-business-copy,.social-story-copy{text-align:left}.social-hero-copy{width:62vw}.social-access-layout{grid-template-columns:1fr}.social-access-values{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media(max-width:860px){.social-hero{min-height:760px!important}.social-hero-photo{inset:30% 0 0 0}.social-hero-wash{background:linear-gradient(180deg,#020817 0%,rgba(2,8,23,.94) 38%,rgba(2,8,23,.42) 67%,#020817 100%)}.social-hero-copy{width:auto;padding:94px 26px 330px!important}.social-hero-copy h1{font-size:clamp(56px,14vw,82px)!important}.social-app-shell,.social-business-shell,.social-story-shell{width:min(94vw,760px);padding:68px 0 76px}.social-feature-grid{grid-template-columns:1fr}.social-device-stage{min-height:490px}.social-desktop-shot{width:92%;right:0}.social-mobile-shot{width:33%;left:0}.social-business-gallery{min-height:520px}.social-business-main{width:84%}.social-business-card{width:38%}.social-story-image{min-height:430px}.social-access-values{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:760px){.social-prestige-link{min-width:132px!important}.social-prestige-logo{width:126px;height:36px}.social-prestige-logo img{width:118px;margin-top:6px}.social-footer-logo{width:175px;height:56px}.social-footer-logo img{width:155px}.social-values span+span:before{display:none}.social-device-stage{min-height:410px}.social-mobile-shot{width:38%}.social-business-gallery{min-height:440px}.social-business-main{width:88%;top:8%}.social-business-card{width:42%}.social-story-shell{gap:22px}.social-story-image{min-height:340px}.social-access-section{padding:68px 0}.social-access-layout{display:block}.social-access-values{margin-top:18px}.social-access-inner h2{font-size:48px}.social-hero-actions{gap:10px}.social-hero-actions a{width:100%;justify-content:center}}
@media(max-width:560px){.social-device-stage{min-height:350px}.social-mobile-shot{width:42%}.social-business-gallery{min-height:360px}.social-business-card-two{left:2%}.social-story-copy h2{font-size:44px}.social-access-values{grid-template-columns:1fr}}
`;
