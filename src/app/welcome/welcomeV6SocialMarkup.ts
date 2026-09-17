import { welcomeV6Markup } from "./welcomeV6Markup";

const removeSection = (html: string, id: string) => {
  const startMarker = `<section id="${id}">`;
  const start = html.indexOf(startMarker);
  if (start === -1) return html;
  const end = html.indexOf("</section>", start);
  if (end === -1) return html;
  return `${html.slice(0, start)}${html.slice(end + "</section>".length)}`;
};

const replaceSection = (html: string, id: string, replacement: string) => {
  const startMarker = `<section id="${id}"`;
  const start = html.indexOf(startMarker);
  if (start === -1) return html;
  const end = html.indexOf("</section>", start);
  if (end === -1) return html;
  return `${html.slice(0, start)}${replacement}${html.slice(end + "</section>".length)}`;
};

let html = welcomeV6Markup;

// ECCOOZS Social is the flagship community platform. The broader company ecosystem
// now lives on the ECCOOZS Technologies corporate home and its own destinations.
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

html = replaceSection(
  html,
  "hero",
  String.raw`<section id="hero" class="social-hero">
  <div class="social-hero-photo"><img alt="ECCOOZS community" src="/welcome-images/landing-02.png"/></div>
  <div class="social-hero-wash"></div>
  <div class="social-hero-copy rv">
    <div class="social-kicker">ECCOOZS SOCIAL</div>
    <h1>Culture.<br/>Community.<br/>Connection.</h1>
    <p>A social platform for conversation, discovery, culture, community, and opportunity.</p>
    <div class="social-hero-actions">
      <a class="btn-p" href="#eccoozs-app">Explore the App <i data-lucide="arrow-right"></i></a>
      <a class="btn-g" href="#download">Join ECCOOZS</a>
    </div>
    <div class="social-values"><span>Real People</span><span>Stronger Communities</span><span>A Brighter Tomorrow</span></div>
  </div>
</section>`
);

html = replaceSection(
  html,
  "eccoozs-app",
  String.raw`<section id="eccoozs-app" class="social-app-section">
  <div class="social-section-shell social-app-shell">
    <div class="social-app-copy rv">
      <div class="social-kicker">THE ECCOOZS APP</div>
      <h2>Share. Discover. Belong.</h2>
      <p class="social-lede">ECCOOZS brings culture, conversation, and community together in one powerful platform — a place to share, discover, connect, and grow.</p>
      <div class="social-feature-grid">
        <div class="social-feature"><i data-lucide="messages-square"></i><div><strong>Connect &amp; Share</strong><span>Post, interact, and build community.</span></div></div>
        <div class="social-feature"><i data-lucide="compass"></i><div><strong>Explore</strong><span>Discover people, topics, and trends.</span></div></div>
        <div class="social-feature"><i data-lucide="repeat-2"></i><div><strong>Ecco</strong><span>Turn posts into conversations with context.</span></div></div>
        <div class="social-feature"><i data-lucide="mic-2"></i><div><strong>Soundrooms</strong><span>Join live audio rooms and conversations.</span></div></div>
        <div class="social-feature"><i data-lucide="newspaper"></i><div><strong>Newsroom</strong><span>Stay informed with real stories and updates.</span></div></div>
        <div class="social-feature"><i data-lucide="store"></i><div><strong>Business Directory</strong><span>Find and support trusted businesses.</span></div></div>
      </div>
      <a class="btn-p" href="#download">Get Early Access <i data-lucide="arrow-right"></i></a>
    </div>
    <div class="social-device-stage rv" aria-label="ECCOOZS desktop and mobile product previews">
      <div class="social-device-glow"></div>
      <img class="social-desktop-shot" src="/social/social-desktop-showcase.png" alt="ECCOOZS desktop experience"/>
      <img class="social-mobile-shot" src="/social/social-mobile-showcase.png" alt="ECCOOZS mobile experience"/>
    </div>
  </div>
</section>`
);

html = replaceSection(
  html,
  "business",
  String.raw`<section id="business" class="social-business-section">
  <div class="social-section-shell social-business-shell">
    <div class="social-business-copy rv">
      <div class="social-kicker">ECCOOZS BUSINESS</div>
      <h2>Find. Support. Grow.</h2>
      <p class="business-lede">Business discovery, built for connection.</p>
      <p class="social-lede">Discover trusted businesses, explore products and services, and support the people building within the community.</p>
      <div class="social-business-points">
        <span><i data-lucide="search"></i>Curated discovery</span>
        <span><i data-lucide="badge-check"></i>Verified business tiers</span>
        <span><i data-lucide="shopping-bag"></i>Products &amp; services</span>
      </div>
      <a class="btn-p" href="#download">Join as a Business <i data-lucide="arrow-right"></i></a>
    </div>
    <div class="social-business-gallery rv">
      <img class="social-business-main" src="/social/business-directory-showcase.png" alt="ECCOOZS Business Directory"/>
      <img class="social-business-card social-business-card-one" src="/social/verified-business-profile.png" alt="ECCOOZS Verified Business profile"/>
      <img class="social-business-card social-business-card-two" src="/social/business-highlights-showcase.png" alt="ECCOOZS Business Highlights"/>
    </div>
  </div>
</section>`
);

html = replaceSection(
  html,
  "community",
  String.raw`<section id="community" class="social-story-section">
  <div class="social-section-shell social-story-shell">
    <div class="social-story-image rv"><img alt="ECCOOZS community" src="/welcome-images/landing-09.jpg"/></div>
    <div class="social-story-copy rv">
      <div class="social-kicker">OUR STORY</div>
      <h2>Built from within.<br/>For all who walk<br/>with respect.</h2>
      <p class="social-story-quote">“I didn't build this to go viral. I built it because there was no place left for our voices to breathe.”</p>
      <p class="social-story-body">ECCOOZS was built by Foundational Black Americans as a digital sanctuary for culture, faith, and truth. But ALL ARE WELCOME HERE who walk in respect. This isn't just an app — it's a movement.</p>
    </div>
  </div>
</section>`
);

html = replaceSection(
  html,
  "download",
  String.raw`<section id="download" class="social-access-section">
  <div class="social-access-orb"></div>
  <div class="social-access-inner rv">
    <div class="social-kicker centered">EARLY ACCESS</div>
    <h2>Join the movement.<br/>Be first.</h2>
    <p class="social-access-lede">Reserve your place in the founding ECCOOZS community.</p>
    <div class="social-access-layout">
      <div class="waitlist-card social-waitlist-card">
        <form id="waitlistForm" novalidate="">
          <div aria-hidden="true" class="waitlist-hp"><label>Company URL<input autocomplete="off" name="company_url" tabindex="-1"/></label></div>
          <div class="waitlist-grid">
            <div class="waitlist-field full"><label class="waitlist-label" for="wl-email">Email address</label><input autocomplete="email" class="waitlist-input" id="wl-email" name="email" placeholder="you@example.com" required="" type="email"/></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-name">Name, optional</label><input autocomplete="name" class="waitlist-input" id="wl-name" name="full_name" placeholder="Your name" type="text"/></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-audience">I am joining as</label><select class="waitlist-select" id="wl-audience" name="audience_type"><option value="founding_member">Founding Member</option><option value="creator">Creator</option><option value="business_owner">Business Owner</option><option value="advertiser_sponsor">Advertiser / Sponsor</option><option value="beta_tester">Beta Tester</option><option value="press_partner">Press / Partner</option></select></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-business">Business, optional</label><input autocomplete="organization" class="waitlist-input" id="wl-business" name="business_name" placeholder="Business name" type="text"/></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-website">Website, optional</label><input autocomplete="url" class="waitlist-input" id="wl-website" name="website" placeholder="https://" type="url"/></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-city">City, optional</label><input autocomplete="address-level2" class="waitlist-input" id="wl-city" name="city" placeholder="City" type="text"/></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-region">State / Region, optional</label><input autocomplete="address-level1" class="waitlist-input" id="wl-region" name="region" placeholder="State / Region" type="text"/></div>
          </div>
          <label class="waitlist-check" for="wl-age"><input id="wl-age" name="is_18_or_over" required="" type="checkbox"/><span>I confirm that I am 18 or older and want to join the ECCOOZS founding waitlist.</span></label>
          <button class="waitlist-submit" id="waitlistSubmit" type="submit">Reserve My Spot</button>
          <div aria-live="polite" class="waitlist-msg" id="waitlistMessage" role="status"></div>
        </form>
      </div>
      <div class="social-access-values">
        <div><i data-lucide="users"></i><span>Real People</span></div>
        <div><i data-lucide="heart"></i><span>Stronger Communities</span></div>
        <div><i data-lucide="bar-chart-3"></i><span>More Opportunities</span></div>
        <div><i data-lucide="globe-2"></i><span>A Brighter Tomorrow</span></div>
      </div>
    </div>
  </div>
</section>`
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
  <div><div class="fct">ECCOOZS Technologies</div><ul class="fls"><li><a href="/">Corporate Home</a></li><li><a href="/learning">Learning</a></li><li><a href="/bellmont">Bellmont State</a></li><li><a href="/history">History</a></li><li><a href="/house-of-eccoozs">House of ECCOOZS</a></li></ul></div>
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
