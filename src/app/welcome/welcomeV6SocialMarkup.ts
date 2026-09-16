import { welcomeV6Markup } from "./welcomeV6Markup";

const removeSection = (html: string, id: string) => {
  const startMarker = `<section id="${id}">`;
  const start = html.indexOf(startMarker);
  if (start === -1) return html;
  const end = html.indexOf("</section>", start);
  if (end === -1) return html;
  return `${html.slice(0, start)}${html.slice(end + "</section>".length)}`;
};

let html = welcomeV6Markup;

// The Social page now focuses on the flagship community platform itself.
// Ecosystem-wide learning, portfolio, and history content live on their own destinations.
html = removeSection(html, "ecosystem");
html = removeSection(html, "learning-apps");
html = removeSection(html, "history");

html = html.replace(
  /<!-- NAV -->[\s\S]*?<\/nav>/,
  String.raw`<!-- NAV -->
<nav>
  <a class="nav-logo social-prestige-link" href="/" aria-label="ECCOOZS Technologies home">
    <object class="social-prestige-logo" data="/brand/eccoozs-technologies-wordmark.png" type="image/png" aria-label="ECCOOZS">
      <img alt="ECCOOZS" src="/eccoozs-wordmark-blue-v2-640.png"/>
    </object>
  </a>
  <ul class="nav-links">
    <li><a class="active" href="/welcome">Home</a></li>
    <li><a href="#eccoozs-app">The App</a></li>
    <li><a href="#business">Business</a></li>
    <li><a href="#community">Community</a></li>
    <li><a href="/#about">About</a></li>
    <li><a href="/history">History</a></li>
  </ul>
  <div class="nav-right">
    <a class="nav-login" href="#download" title="ECCOOZS login opens at launch — join Early Access">Log In</a>
    <a class="nav-join" href="#download">Join ECCOOZS</a>
  </div>
</nav>`
);

html = html.replace(
  /<!-- FOOTER -->[\s\S]*?<\/footer>/,
  String.raw`<!-- FOOTER -->
<footer>
<div class="footer-inner">
<div class="ftop social-footer-top">
  <div class="footer-brand social-footer-brand">
    <a href="/" aria-label="ECCOOZS Technologies home">
      <object class="social-footer-logo" data="/brand/eccoozs-technologies-wordmark.png" type="image/png" aria-label="ECCOOZS">
        <img alt="ECCOOZS" src="/eccoozs-wordmark-blue-v2-640.png"/>
      </object>
    </a>
    <p class="ftagline">Culture. Community. Connection.</p>
  </div>
  <div><div class="fct">ECCOOZS Social</div><ul class="fls"><li><a href="#eccoozs-app">The App</a></li><li><a href="#business">Business Directory</a></li><li><a href="#community">Our Story</a></li><li><a href="#download">Early Access</a></li></ul></div>
  <div><div class="fct">ECCOOZS Technologies</div><ul class="fls"><li><a href="/">Corporate Home</a></li><li><a href="/learning">Learning</a></li><li><a href="/bellmont">Bellmont State</a></li><li><a href="/history">History</a></li></ul></div>
  <div><div class="fct">Legal</div><ul class="fls"><li><a href="/terms">Terms of Service</a></li><li><a href="/privacy">Privacy Policy</a></li><li><a href="/conduct">Community Guidelines</a></li><li><a href="/support">Support</a></li></ul></div>
</div>
<div class="fbot">
<span class="fcp">© 2026 ECCOOZS Technologies LLC. All rights reserved.</span>
<div class="flg"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/conduct">Policies</a></div>
</div>
</div>
</footer>`
);

export const welcomeV6SocialMarkup = html;
