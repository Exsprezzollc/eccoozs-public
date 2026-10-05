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
  <a class="nav-logo social-prestige-link" href="https://eccoozstechnologies.com/" aria-label="ECCOOZS Technologies home">
    <object class="social-prestige-logo" data="/brand/eccoozs-technologies-wordmark.png" type="image/png" aria-label="ECCOOZS">
      <img alt="ECCOOZS" src="/eccoozs-wordmark-blue-v2-640.png"/>
    </object>
  </a>
  <ul class="nav-links">
    <li><a class="active" href="/welcome">Home</a></li>
    <li><a href="#eccoozs-app">The App</a></li>
    <li><a href="#business">Business</a></li>
    <li><a href="#community">Community</a></li>
    <li><a href="https://eccoozstechnologies.com/#about">About</a></li>
    <li><a href="/history">History</a></li>
    <li><a href="/blog">Journal</a></li>
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
    <p>ECCOOZS is a Foundational Black American-centered, community-first general social network for conversation, discovery, culture, business discovery, creator opportunity, and live audio. Rooted in FBA culture and perspective, ECCOOZS welcomes respectful participation from people of all backgrounds.</p>
    <p class="social-product-plain">One social network for posts, conversations, discovery, live audio, business, creators, news, and community.</p>
    <div class="social-hero-actions">
      <a class="btn-p" href="#download">Join Early Access <i data-lucide="arrow-right"></i></a>
      <a class="btn-g" href="#eccoozs-app">See What's Inside</a>
    </div>
    <div class="social-values"><span>Real People</span><span>Stronger Communities</span><span>A Brighter Tomorrow</span></div>
  </div>
</section>`
);

html = replaceSection(
  html,
  "eccoozs-app",
  String.raw`<section id="eccoozs-app" class="social-app-section">
  <div class="social-section-shell social-app-intro">
    <div class="social-app-copy rv">
      <div class="social-kicker">THE ECCOOZS APP</div>
      <h2>Share. Discover. Belong.</h2>
      <p class="social-lede">ECCOOZS brings culture, conversation, and community together in one social network — with multiple ways to participate.</p>
      <div class="social-feature-grid social-feature-grid-compact">
        <div class="social-feature"><i data-lucide="messages-square"></i><div><strong>Connect &amp; Share</strong><span>Post, interact, and build community.</span></div></div>
        <div class="social-feature"><i data-lucide="compass"></i><div><strong>Explore</strong><span>Discover people, topics, and trends.</span></div></div>
        <div class="social-feature"><i data-lucide="repeat-2"></i><div><strong>Ecco</strong><span>Turn posts into conversations with context.</span></div></div>
        <div class="social-feature"><i data-lucide="mic-2"></i><div><strong>Soundrooms</strong><span>Join live audio rooms and conversations.</span></div></div>
        <div class="social-feature"><i data-lucide="newspaper"></i><div><strong>Newsroom</strong><span>Stay informed with real stories and updates.</span></div></div>
        <div class="social-feature"><i data-lucide="store"></i><div><strong>Business Directory</strong><span>Find and support trusted businesses.</span></div></div>
      </div>
    </div>
    <div class="social-device-stage rv" aria-label="ECCOOZS desktop and mobile product previews">
      <div class="social-device-glow"></div>
      <img class="social-desktop-shot" src="/social/social-desktop-showcase.png" alt="ECCOOZS desktop experience"/>
      <img class="social-mobile-shot" src="/social/social-mobile-showcase.png" alt="ECCOOZS mobile experience"/>
    </div>
  </div>

  <div class="social-section-shell social-walkthrough">
    <article class="social-product-row rv">
      <div class="social-product-copy">
        <div class="social-product-number">01</div>
        <div class="social-kicker">DISCOVER</div>
        <h3>Explore what’s happening.</h3>
        <p>Discover people, posts, pictures, video, news, businesses, creators, ideas, and conversations across ECCOOZS.</p>
        <div class="social-product-pills"><span>For You</span><span>Trending</span><span>New</span><span>Topics</span></div>
      </div>
      <div class="social-product-visual"><img src="/social/explore.webp" alt="ECCOOZS Explore discovery experience"/></div>
    </article>

    <article class="social-product-row social-product-row-reverse rv">
      <div class="social-product-copy">
        <div class="social-product-number">02</div>
        <div class="social-kicker">TALK</div>
        <h3>Where posts become conversations.</h3>
        <p>Posts don’t have to end at reactions. Ecco turns posts, pictures, and video into organized conversations with context.</p>
        <div class="social-product-pills"><span>Quote Eccos</span><span>Picture Eccos</span><span>Video Eccos</span></div>
      </div>
      <div class="social-product-visual social-product-visual-tall"><img src="/social/ecco.webp" alt="ECCOOZS Ecco conversation experience"/></div>
    </article>

    <article class="social-product-row rv">
      <div class="social-product-copy">
        <div class="social-product-number">03</div>
        <div class="social-kicker">GO LIVE</div>
        <h3>Live conversations with purpose.</h3>
        <p>Host a room, join a conversation, listen, speak, chat, and build community in real time through Soundrooms.</p>
        <div class="social-product-pills"><span>Host</span><span>Co-host</span><span>Live chat</span><span>Listeners</span></div>
      </div>
      <div class="social-product-visual social-product-visual-tall"><img src="/social/soundrooms.webp" alt="ECCOOZS Soundrooms live audio experience"/></div>
    </article>

    <article class="social-product-row social-product-row-reverse rv">
      <div class="social-product-copy">
        <div class="social-product-number">04</div>
        <div class="social-kicker">MESSAGE</div>
        <h3>Keep the conversation going.</h3>
        <p>Connect privately through direct messages, message requests, and group conversations without leaving ECCOOZS.</p>
        <div class="social-product-pills"><span>Direct messages</span><span>Requests</span><span>Groups</span></div>
      </div>
      <div class="social-product-visual social-product-visual-tall"><img src="/social/messages.webp" alt="ECCOOZS Messages experience"/></div>
    </article>

    <article class="social-product-row rv">
      <div class="social-product-copy">
        <div class="social-product-number">05</div>
        <div class="social-kicker">STAY INFORMED</div>
        <h3>News and ideas in one place.</h3>
        <p>Discover articles, stories, trending topics, and perspectives through the ECCOOZS Newsroom.</p>
        <div class="social-product-pills"><span>Articles</span><span>Trending</span><span>Topics</span><span>Perspectives</span></div>
      </div>
      <div class="social-product-visual"><img src="/social/newsroom.webp" alt="ECCOOZS Newsroom experience"/></div>
    </article>
  </div>
</section>`
);

html = html.replace(
  '<section id="business"',
  '<section id="creators" class="social-creator-section">\n  <div class="social-section-shell social-creator-shell">\n    <div class="social-creator-copy rv">\n      <div class="social-kicker">FOR CREATORS</div>\n      <h2>Create. Build. Earn.</h2>\n      <p class="social-creator-lead">Creators have room to build — without taking over the room.</p>\n      <p class="social-lede">Share posts, pictures, video, and articles. Build an audience. Join conversations. Host Soundrooms. Become Certified or Verified. Unlock creator tools and showcase products through the Creator Shelf.</p>\n      <div class="social-creator-points"><span>Build an audience</span><span>Publish across formats</span><span>Host Soundrooms</span><span>Creator Shelf</span><span>Certified &amp; Verified</span><span>Discovery opportunities</span></div>\n      <a class="btn-p" href="#download">Join as a Creator <i data-lucide="arrow-right"></i></a>\n    </div>\n    <div class="social-creator-visual rv"><div class="social-creator-glow"></div><img src="/social/creator.webp" alt="ECCOOZS Certified Creator profile and Creator Shelf"/></div>\n  </div>\n</section>\n\n<section id="business"'
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
    <div class="social-business-gallery social-business-gallery-focused rv">
      <div class="social-business-glow"></div>
      <img class="social-business-prime" src="/social/prime-builders.webp" alt="ECCOOZS Verified Business profile for Prime Builders"/>
      <img class="social-business-context" src="/social/business-directory-showcase.png" alt="ECCOOZS Business Directory discovery experience"/>
    </div>
  </div>
</section>`
);

html = html.replace(
  '<section id="community"',
  '<section class="social-connect-section">\n  <div class="social-section-shell social-connect-shell rv">\n    <div class="social-kicker centered">ONE COMMUNITY</div>\n    <h2>Multiple ways to participate.</h2>\n    <div class="social-connect-flow"><span>Post</span><b>→</b><span>Explore</span><b>→</b><span>Ecco</span><b>→</b><span>Soundroom</span><b>→</b><span>Message</span><b>→</b><span>Profile</span><b>→</b><span>Business</span><b>→</b><span>Creator opportunity</span></div>\n    <p>You do not have to be a creator, business owner, influencer, or public personality to belong on ECCOOZS. Come to talk, discover, share, listen, learn, build, or simply be part of the community.</p>\n    <p class="social-connect-rooted">Rooted in Foundational Black American culture and perspective. Welcoming respectful participation from people of all backgrounds.</p>\n  </div>\n</section>\n\n<section id="community"'
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
    <p class="social-access-lede">Reserve your place in the founding ECCOOZS community. Launch access is for adults 18 and older.</p>
    <div class="social-access-layout">
      <div class="waitlist-card social-waitlist-card">
        <form id="waitlistForm" novalidate="">
          <div aria-hidden="true" class="waitlist-hp"><label>Company URL<input autocomplete="off" name="company_url" tabindex="-1"/></label></div>
          <div class="waitlist-grid">
            <div class="waitlist-field full"><label class="waitlist-label" for="wl-email">Email address</label><input autocomplete="email" class="waitlist-input" id="wl-email" name="email" placeholder="you@example.com" required="" type="email"/></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-name">Name, optional</label><input autocomplete="name" class="waitlist-input" id="wl-name" name="full_name" placeholder="Your name" type="text"/></div>
            <div class="waitlist-field"><label class="waitlist-label" for="wl-audience">I am joining as</label><select class="waitlist-select" id="wl-audience" name="audience_type"><option value="founding_member">Founding Member</option><option value="creator">Creator</option><option value="business_owner">Business Owner</option><option value="advertiser_sponsor">Advertiser / Sponsor</option><option value="beta_tester">Beta Tester</option><option value="press_partner">Press / Partner</option></select></div>
            <details class="waitlist-more full">
              <summary>Add optional business or location details</summary>
              <div class="waitlist-more-grid">
                <div class="waitlist-field"><label class="waitlist-label" for="wl-business">Business, optional</label><input autocomplete="organization" class="waitlist-input" id="wl-business" name="business_name" placeholder="Business name" type="text"/></div>
                <div class="waitlist-field"><label class="waitlist-label" for="wl-website">Website, optional</label><input autocomplete="url" class="waitlist-input" id="wl-website" name="website" placeholder="https://" type="url"/></div>
                <div class="waitlist-field"><label class="waitlist-label" for="wl-city">City, optional</label><input autocomplete="address-level2" class="waitlist-input" id="wl-city" name="city" placeholder="City" type="text"/></div>
                <div class="waitlist-field"><label class="waitlist-label" for="wl-region">State / Region, optional</label><input autocomplete="address-level1" class="waitlist-input" id="wl-region" name="region" placeholder="State / Region" type="text"/></div>
              </div>
            </details>
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
    <a href="https://eccoozstechnologies.com/" aria-label="ECCOOZS Technologies home">
      <object class="social-footer-logo" data="/brand/eccoozs-technologies-wordmark.png" type="image/png" aria-label="ECCOOZS">
        <img alt="ECCOOZS" src="/eccoozs-wordmark-blue-v2-640.png"/>
      </object>
    </a>
    <p class="ftagline">Culture. Community. Connection.</p>
  </div>
  <div><div class="fct">ECCOOZS Social</div><ul class="fls"><li><a href="#eccoozs-app">The App</a></li><li><a href="#business">Business Directory</a></li><li><a href="#community">Our Story</a></li><li><a href="#download">Early Access</a></li></ul></div>
  <div><div class="fct">ECCOOZS Technologies</div><ul class="fls"><li><a href="https://eccoozstechnologies.com/">Corporate Home</a></li><li><a href="https://eccoozslearning.com/">Learning</a></li><li><a href="/bellmont">Bellmont State</a></li><li><a href="/history">History</a></li><li><a href="/blog">Journal</a></li><li><a href="/press">Press &amp; Media</a></li><li><a href="/house-of-eccoozs">House of ECCOOZS</a></li></ul></div>
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
