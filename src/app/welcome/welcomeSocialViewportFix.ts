export const welcomeSocialViewportFix = String.raw`
/* Keep the approved desktop composition at normal browser zoom on midsize desktop windows. */
@media (min-width:860px) and (max-width:1180px){
  .social-section-shell{width:min(1460px,94vw)!important}

  .social-app-shell{grid-template-columns:.84fr 1.16fr!important;gap:30px!important;align-items:center!important;padding:48px 0 58px!important}
  .social-app-copy h2{font-size:clamp(38px,4.2vw,54px)!important}
  .social-app-copy>.social-lede{margin:12px 0 16px!important}
  .social-feature-grid{gap:8px!important;margin:17px 0 20px!important}
  .social-feature{padding:11px 12px!important}
  .social-device-stage{min-height:410px!important}
  .social-desktop-shot{width:79%!important;max-height:385px!important;right:0!important;top:4%!important}
  .social-mobile-shot{width:29%!important;max-height:400px!important;left:1%!important;bottom:0!important}

  .social-business-shell{grid-template-columns:.70fr 1.30fr!important;gap:28px!important;align-items:center!important;padding:50px 0 64px!important}
  .social-business-copy h2{font-size:clamp(42px,4.7vw,60px)!important}
  .social-business-gallery{min-height:470px!important}
  .social-business-main{width:74%!important;right:0!important;top:8%!important}
  .social-business-card{width:31%!important}
  .social-business-card-one{left:0!important;bottom:5%!important}
  .social-business-card-two{left:6%!important;top:2%!important}

  .social-story-shell{grid-template-columns:.96fr 1.04fr!important;gap:34px!important;align-items:center!important;padding:54px 0 62px!important}
  .social-story-image{min-height:360px!important}
  .social-story-copy h2{font-size:clamp(39px,4.5vw,58px)!important}
  .social-story-quote{font-size:1.05rem!important;margin:18px 0 16px!important}

  .social-access-inner{width:min(1040px,92vw)!important}
  .social-access-layout{grid-template-columns:minmax(0,1fr) 220px!important;gap:20px!important;align-items:center!important}
  .social-access-values{grid-template-columns:1fr!important;gap:9px!important}
  .social-access-values div{padding:11px 13px!important}
  .social-access-section{padding:62px 0 68px!important}
  .social-access-inner h2{font-size:clamp(40px,4.7vw,60px)!important}

  .social-footer-top{grid-template-columns:1.15fr repeat(3,1fr)!important;gap:28px!important}
}

@media (min-width:860px) and (max-width:1020px){
  .eccoozs-v6-root nav{padding-left:24px!important;padding-right:24px!important}
  .eccoozs-v6-root .nav-links{gap:1rem!important}
  .eccoozs-v6-root .nav-links a,.eccoozs-v6-root .nav-login{font-size:.73rem!important}
  .social-prestige-link{min-width:145px!important}
  .social-prestige-logo{width:140px!important}
  .social-hero-copy{width:47vw!important;padding-left:40px!important}
  .social-hero-copy h1{font-size:clamp(48px,5vw,62px)!important}
  .social-feature strong{font-size:.78rem!important}
  .social-feature span{font-size:.64rem!important}
}
`;
