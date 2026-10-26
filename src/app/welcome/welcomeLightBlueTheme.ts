export const welcomeLightBlueTheme = String.raw`
/* ECCOOZS Social — Light Blue homepage design. Scoped to /welcome only. */
.eccoozs-v6-root{--social-night:#edf4ff;--social-night-2:#dceaff;--social-panel:#ffffff;--social-cream:#10244a;--social-muted:#46658f;background:#edf4ff!important;color:#10244a!important}
.eccoozs-v6-root nav{background:rgba(250,253,255,.96)!important;border-bottom:1px solid #c8d9f3!important;box-shadow:0 5px 22px rgba(21,60,130,.06)}
.eccoozs-v6-root .nav-links a,.eccoozs-v6-root .nav-login{color:#40577e!important}
.eccoozs-v6-root .nav-links a:hover,.eccoozs-v6-root .nav-links a.active,.eccoozs-v6-root .nav-login:hover{color:#123fbb!important}
.eccoozs-v6-root .nav-join{color:white!important}
.social-app-section{background:radial-gradient(ellipse at 75% 18%,rgba(92,162,255,.27),transparent 52%),linear-gradient(180deg,#f5f9ff 0%,#e5f0ff 100%)!important;border-color:#ccddf5!important}
.social-app-intro h2,.social-app-copy h2,.social-business-copy h2,.social-story-copy h2,.social-access-inner h2{color:#10244a!important;text-shadow:none!important}
.social-app-intro>.social-lede,.social-business-copy>.social-lede,.social-story-body,.social-access-lede{color:#3d5d85!important}
.social-app-actions .btn-g,.social-hero-actions .btn-g{background:#fff!important;color:#1744a7!important;border:1px solid #a8c5f1!important}
.social-feature{background:linear-gradient(145deg,#fff,#f0f6ff)!important;border:1px solid #bfd4f5!important;box-shadow:0 10px 26px rgba(39,92,165,.08)!important}
.social-feature strong{color:#142b54!important}.social-feature span{color:#50709a!important}.social-feature svg{color:#245dff!important}
.social-device-glow{background:radial-gradient(circle,rgba(61,126,255,.17),transparent 70%)!important}
.social-phone-showcase{filter:drop-shadow(0 22px 26px rgba(25,55,116,.20))!important}
.social-business-section{background:linear-gradient(180deg,#e5f0ff,#f5f9ff)!important;border-color:#ccddf5!important}
.social-business-copy .business-lede{color:#1f4e9b!important}
.social-business-points span{color:#214978!important;background:#fff!important;border-color:#c0d6f7!important}
.social-story-section{background:linear-gradient(180deg,#f5f9ff,#e8f2ff)!important;border-color:#ccddf5!important}
.social-story-quote{color:#223f6c!important}
.social-story-image:after{box-shadow:inset 0 0 55px 15px #e8f2ff!important}
.social-access-section{background:radial-gradient(ellipse at 75% 15%,rgba(80,150,255,.22),transparent 48%),linear-gradient(180deg,#edf5ff,#dceaff)!important;border-color:#c6d9f4!important}
.social-access-values div{background:rgba(255,255,255,.85)!important;color:#254975!important;border-color:#b6cff2!important}
.social-waitlist-card{background:linear-gradient(145deg,#fff,#f3f8ff)!important;border:1px solid #bad2f4!important;box-shadow:0 18px 42px rgba(35,78,145,.14)!important}
.social-access-section .waitlist-label,.social-access-section .waitlist-check{color:#183660!important}
.social-access-section .waitlist-input,.social-access-section .waitlist-select{background:#fff!important;color:#193760!important;border-color:#bbd0ef!important}
.social-access-section .waitlist-input::placeholder{color:#6b82a3!important}
.waitlist-more{background:#eef5ff!important;border-color:#c3d8f7!important}
.waitlist-more summary{color:#29538b!important}
/* Light, legible photo-led opening hero. The photo stays on the right. */
.eccoozs-v6-root .social-hero{background:linear-gradient(125deg,#f6faff 0%,#e6f1ff 60%,#d8e9ff 100%)!important}
.eccoozs-v6-root .social-hero-wash{background:linear-gradient(90deg,#f6faff 0%,rgba(246,250,255,.99) 27%,rgba(239,247,255,.91) 40%,rgba(234,244,255,.58) 53%,rgba(234,244,255,.08) 72%,transparent 100%)!important}
.eccoozs-v6-root .social-hero-copy h1{color:#10244a!important;text-shadow:none!important}
.eccoozs-v6-root .social-hero-copy>p{color:#24466f!important;text-shadow:none!important}
.eccoozs-v6-root .social-hero .social-eyebrow,.eccoozs-v6-root .social-hero .eyebrow{color:#2454f5!important}
.eccoozs-v6-root .social-values{color:#365e91!important;border-top-color:#bdd4f5!important}
.eccoozs-v6-root .social-values span+span:before{background:#bdd4f5!important}
/* Pearl-white footer, retaining wordmark and all original links. */
.eccoozs-v6-root footer{background:linear-gradient(180deg,#f8fbff 0%,#eaf3ff 100%)!important;border-top:1px solid #bfd5f5!important;color:#19365c!important}
.eccoozs-v6-root footer .fct{color:#1744a7!important}
.eccoozs-v6-root footer a,.eccoozs-v6-root footer .ftagline,.eccoozs-v6-root footer .fcp{color:#425e86!important}
.eccoozs-v6-root footer a:hover{color:#2454f5!important}
.eccoozs-v6-root footer .footer-inner{color:#19365c!important}
.eccoozs-v6-root footer .footer-bottom,.eccoozs-v6-root footer .fbottom{border-top-color:#cfddf1!important}
@media(max-width:860px){
 .eccoozs-v6-root .social-hero{background:#f3f8ff!important}
 .eccoozs-v6-root .social-hero-wash{background:linear-gradient(180deg,#f6faff 0%,rgba(246,250,255,.99) 34%,rgba(246,250,255,.90) 48%,rgba(246,250,255,.18) 69%,#e5f0ff 100%)!important}
 .eccoozs-v6-root .social-hero-copy h1{color:#10244a!important}
}
@media (prefers-reduced-motion:reduce){.social-feature,.social-phone-showcase{transition:none!important}}

/* ECCOOZS approved campus scene: readable copy LEFT, five students RIGHT. */
.eccoozs-v6-root .social-connect-section{
 position:relative!important;display:flex!important;align-items:center!important;
 justify-content:flex-start!important;isolation:isolate;overflow:hidden;
 min-height:clamp(440px,35vw,550px)!important;
 background-color:#eaf3ff!important;
 background-image:linear-gradient(90deg,#edf5ff 0%,#edf5ff 26%,rgba(237,245,255,.96) 35%,rgba(237,245,255,.35) 47%,rgba(237,245,255,0) 57%),url('/brand/eccoozs-campus-five-students.png')!important;
 background-size:100% 100%,auto 100%!important;background-position:center center,right center!important;
 background-repeat:no-repeat!important;border-bottom:1px solid #c7daf5;
}
.eccoozs-v6-root .social-connect-section::before{display:none!important}
.eccoozs-v6-root .social-connect-scene{display:none!important}
.eccoozs-v6-root .social-connect-content{
 position:relative;z-index:1;box-sizing:border-box;width:43%;min-width:0;
 padding:36px clamp(24px,4vw,70px)!important;
 display:flex;flex-direction:column;align-items:flex-start;justify-content:center;
 background:transparent!important;
}
.eccoozs-v6-root .social-connect-content h2{color:#112b58!important;font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-.04em;line-height:1.04;font-size:clamp(34px,3.05vw,50px);margin:8px 0 14px}
.eccoozs-v6-root .social-connect-content p{color:#294d7c!important;max-width:530px;font-size:clamp(14px,1.06vw,17px);line-height:1.55;margin:0}
.eccoozs-v6-root .social-connect-content .social-kicker{color:#2454f5!important;letter-spacing:.12em;font-size:.74rem}
.eccoozs-v6-root .social-connect-content .social-hero-actions{margin-top:22px}
.eccoozs-v6-root .social-connect-content .btn-g{background:white!important;color:#1744a7!important;border:1px solid #a8c5f1!important}
.eccoozs-v6-root .nav-logo .social-prestige-logo{display:block;width:172px!important;max-width:100%;height:auto!important;aspect-ratio:auto;object-fit:contain}
@media(max-width:900px){
 .eccoozs-v6-root .social-connect-section{min-height:690px!important;align-items:flex-start!important;
 background-image:linear-gradient(180deg,#edf5ff 0%,#edf5ff 28%,rgba(237,245,255,.97) 39%,rgba(237,245,255,0) 65%),url('/brand/eccoozs-campus-five-students.png')!important;
 background-size:100% 100%,auto 60%!important;background-position:center,center bottom!important}
 .eccoozs-v6-root .social-connect-content{width:100%;padding:30px 7vw 22px!important;max-width:680px}
}
@media(max-width:560px){
 .eccoozs-v6-root .nav-logo .social-prestige-logo{width:126px!important}
 .eccoozs-v6-root .social-connect-section{min-height:640px!important;background-size:100% 100%,auto 52%!important;background-position:center,center bottom!important}
 .eccoozs-v6-root .social-connect-content h2{font-size:clamp(31px,8vw,42px)}
 .eccoozs-v6-root .social-connect-content .social-hero-actions{flex-wrap:wrap}
}
