import {
  mathTrailPresentation,
  voiceJourneyAdultPresentation,
  voiceJourneyYouthPresentation,
} from "@/components/learning/presentationAssets";
import eccoozsEMark from "@/assets/eccoozs-public/eccoozs-e-mark-90d0d033.png";

export const welcomeV6Markup = String.raw`
<!-- NAV -->
<nav>
  <a class="nav-logo" href="/welcome" aria-label="ECCOOZS home">
    <img alt="ECCOOZS e mark" class="nav-mark" src="${eccoozsEMark.src}"/>
    <span class="nav-wordmark" aria-label="ECCOOZS">eccoozs</span>
  </a>
  <ul class="nav-links">
    <li><a class="active" href="/welcome">Home</a></li>
    <li><a href="#ecosystem">Products</a></li>
    <li><a href="#eccoozs-app">The App</a></li>
    <li><a href="#learning-apps">Learning Apps</a></li>
    <li><a href="#community">Community</a></li>
    <li><a href="#community">About</a></li>
    <li><a href="#history">Legacy</a></li>
  </ul>
  <div class="nav-right">
    <a class="nav-login" href="#download" title="ECCOOZS login opens at launch — join Early Access">Log In</a>
    <a class="nav-join" href="#download">Join ECCOOZS</a>
  </div>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="hero-photo"><img alt="ECCOOZS community — Create Culture, Be Real" src="/welcome-images/landing-02.png"/></div>
  <div class="hero-color-wash"></div>
  <div class="hero-grad"></div>
  <div class="hero-content rv">
    <div class="hero-eyebrow">More than a platform.</div>
    <h1>Technology for how<br/>we live, learn, connect<br/>and grow.</h1>
    <p class="hero-desc">ECCOOZS is a growing ecosystem of digital experiences built around culture, community, creativity, learning, and connection.</p>
    <div class="hero-actions">
      <a class="btn-p" href="#ecosystem">Explore Products <i data-lucide="arrow-right"></i></a>
      <a class="btn-g" href="#download">Join ECCOOZS</a>
    </div>
  </div>
</section>

<!-- ECOSYSTEM -->
<section id="ecosystem">
  <div class="eco-head rv">
    <div class="seyebrow dark">The ECCOOZS Ecosystem</div>
    <h2 class="dark">Everything we build. Connected by purpose.</h2>
    <p>One growing family of experiences for connection, learning, discovery, and culture.</p>
  </div>
  <div class="eco-grid rv">
    <a class="eco-card" href="#eccoozs-app">
      <div class="eco-media"><img alt="ECCOOZS community" src="/welcome-images/landing-03.png"/></div>
      <div class="eco-icon branded"><img alt="ECCOOZS e mark" src="${eccoozsEMark.src}"/></div>
      <div class="eco-body">
        <h3>ECCOOZS</h3>
        <p>Our flagship social platform for culture, community, and connection.</p>
        <span>Explore ECCOOZS <i data-lucide="arrow-right"></i></span>
      </div>
    </a>
    <a class="eco-card" href="#learning-apps">
      <div class="eco-media"><img alt="ECCOOZS Learning Apps" src="${mathTrailPresentation}"/></div>
      <div class="eco-icon"><i data-lucide="graduation-cap"></i></div>
      <div class="eco-body">
        <h3>Learning Apps</h3>
        <p>Engaging tools that help learners explore, practice, and grow—anytime, anywhere.</p>
        <span>Explore Learning Apps <i data-lucide="arrow-right"></i></span>
      </div>
    </a>
    <a class="eco-card" href="#business">
      <div class="eco-media business"><img alt="ECCOOZS Business Directory" src="/Business Stack.png"/></div>
      <div class="eco-icon"><i data-lucide="store"></i></div>
      <div class="eco-body">
        <h3>Business Directory</h3>
        <p>Discover trusted businesses, products, and services built for meaningful discovery.</p>
        <span>Explore Business <i data-lucide="arrow-right"></i></span>
      </div>
    </a>
    <a class="eco-card" href="/house-of-eccoozs">
      <div class="eco-media"><img alt="House of ECCOOZS" src="/House of Eccoozs banner.png"/></div>
      <div class="eco-icon"><i data-lucide="shopping-bag"></i></div>
      <div class="eco-body">
        <h3>House of ECCOOZS</h3>
        <p>Premium apparel, lifestyle pieces, and culture-driven collections that represent who we are.</p>
        <span>Explore House of ECCOOZS <i data-lucide="arrow-right"></i></span>
      </div>
    </a>
  </div>
</section>

<!-- ONE FLAGSHIP APP SECTION -->
<section id="eccoozs-app">
  <div class="app-shell">
    <div class="app-copy rv">
      <div class="seyebrow light">The ECCOOZS App</div>
      <h2 class="light">Culture. Community.<br/>Connection.</h2>
      <p class="sdesc light">ECCOOZS brings culture, conversation, and community together in one powerful platform — a place to share, discover, connect, and grow.</p>
      <div class="app-feature-grid">
        <div class="app-feature"><i data-lucide="messages-square"></i><div><strong>Connect &amp; Share</strong><span>Post, interact, and build community.</span></div></div>
        <div class="app-feature"><i data-lucide="compass"></i><div><strong>Explore</strong><span>Discover people, topics, and trends.</span></div></div>
        <div class="app-feature"><i data-lucide="repeat-2"></i><div><strong>Ecco</strong><span>Turn posts into conversations with context.</span></div></div>
        <div class="app-feature"><i data-lucide="mic-2"></i><div><strong>Soundrooms</strong><span>Join live audio rooms and conversations.</span></div></div>
        <div class="app-feature"><i data-lucide="newspaper"></i><div><strong>Newsroom</strong><span>Stay informed with real stories and updates.</span></div></div>
        <div class="app-feature"><i data-lucide="store"></i><div><strong>Business Directory</strong><span>Find and support trusted businesses.</span></div></div>
      </div>
      <a class="btn-p" href="#download">Get Early Access <i data-lucide="arrow-right"></i></a>
    </div>
    <div class="app-visual rv">
      <img alt="ECCOOZS on laptop and phone" src="/welcome-images/landing-08.png"/>
    </div>
  </div>
</section>

<!-- ECCOOZS BUSINESS -->
<section id="business">
  <div class="business-shell">
    <div class="business-copy rv">
      <div class="seyebrow dark">ECCOOZS Business</div>
      <h2 class="dark">Find. Support. Grow.</h2>
      <p class="business-lede">Business discovery, built for connection.</p>
      <p class="sdesc dark">Discover trusted businesses, explore products and services, and support the people building within the community.</p>
      <div class="business-points">
        <span><i data-lucide="search"></i>Curated discovery</span>
        <span><i data-lucide="badge-check"></i>Verified business tiers</span>
        <span><i data-lucide="shopping-bag"></i>Products &amp; services</span>
      </div>
      <a class="btn-blue" href="#download">Join as a Business <i data-lucide="arrow-right"></i></a>
    </div>
    <div class="business-visual rv">
      <img alt="ECCOOZS business discovery and profile experience" src="/Business Stack.png"/>
    </div>
  </div>
</section>

<!-- ECCOOZS LEARNING APPS — PRESERVED -->
<section id="learning-apps">
<div class="la-inner rv">
<div class="la-head">
<div class="seyebrow dark">ECCOOZS Learning Apps</div>
<h2>Explore. Practice. Grow.</h2>
<p>Friendly learning tools that open right in the browser. Families and learners can use the apps online or download a standalone copy.</p>
</div>
<div class="la-grid">
<a class="la-card math" href="/apps/math-trail">
<img alt="Math Trail learning app presentation" src="${mathTrailPresentation}"/>
<div class="la-body"><div class="la-kicker">Grades 1–6 · Math</div><div class="la-title">Math Trail</div><div class="la-copy">Trail Check, six grade journeys, practice sheets, times tables, Division Lab, progress and parent reporting.</div><span class="la-link">Open Math Trail →</span></div>
</a>
<a class="la-card voice youth" href="/apps/my-voice-journey-youth">
<img alt="My Voice Journey Youth presentation" src="${voiceJourneyYouthPresentation}"/>
<div class="la-body"><div class="la-kicker">Youth · Speech &amp; Communication</div><div class="la-title">My Voice Journey Youth</div><div class="la-copy">Leo guides young learners through words, listening, sentence building and conversation practice.</div><span class="la-link">Open Youth Journey →</span></div>
</a>
<a class="la-card voice adult" href="/apps/my-voice-journey">
<img alt="My Voice Journey adult presentation" src="${voiceJourneyAdultPresentation}"/>
<div class="la-body"><div class="la-kicker">Adults · English &amp; Communication</div><div class="la-title">My Voice Journey</div><div class="la-copy">Real-world English Practice, vocabulary, speaking confidence and My Words communication support.</div><span class="la-link">Open Adult Journey →</span></div>
</a>
</div>
<div class="la-all"><a href="/learning"><i data-lucide="sparkles"></i>Explore all Learning Apps</a></div>
</div>
</section>

<!-- COMMUNITY / ORIGIN STORY — PRESERVED -->
<section id="community">
<div class="comm-inner">
<div class="comm-img rv">
<img alt="ECCOOZS community — Create Culture Be Real" src="/welcome-images/landing-09.jpg"/>
</div>
<div class="rv">
<div class="seyebrow dark">Our Story</div>
<h2 class="dark">Built from within.<br/>For all who walk<br/>with respect.</h2>
<p class="comm-quote">"I didn't build this to go viral. I built it because there was no place left for our voices to breathe."</p>
<p class="comm-body">ECCOOZS was built by Foundational Black Americans as a digital sanctuary for culture, faith, and truth. But ALL ARE WELCOME HERE who walk in respect. This isn't just an app — it's a movement.</p>
</div>
</div>
</section>

<!-- HISTORY / LEGACY — PRESERVED -->
<section id="history">
<div class="hist-intro rv">
<div class="seyebrow light" style="justify-content:center">American Legacy</div>
<h2 class="light">Honoring our ancestors.<br/>Celebrating our culture.</h2>
<p style="color:rgba(255,255,255,.45);max-width:580px;margin:0 auto;font-size:.97rem;line-height:1.8">These moments shaped us. These faces remind us where we come from — and why platforms like Eccoozs matter.</p>
</div>
<div class="hist-grid rv">
<div class="hc tall">
<img alt="Enslaved family in cotton field" src="/welcome-images/landing-10.png"/>
<div class="hc-ov"><span class="hc-tag">Our Foundation</span><span class="hc-caption">Enslaved people who built a nation — their story lives in our blood</span></div>
</div>
<div class="hc">
<img alt="Native American chiefs at the White House with President Coolidge, 1924" src="/welcome-images/landing-11.png" style="object-position:center top"/>
<div class="hc-ov"><span class="hc-tag">Indigenous Heritage</span><span class="hc-caption">Native chiefs at the White House, 1924</span></div>
</div>
<div class="hc">
<img alt="Choctaw people in traditional dress" src="/welcome-images/landing-12.png" style="object-position:center top"/>
<div class="hc-ov"><span class="hc-tag">Cultural Roots</span><span class="hc-caption">Choctaw people — culture, tradition, and resilience</span></div>
</div>
<div class="hc">
<img alt="George Washington Carver in his laboratory at Tuskegee" src="/welcome-images/landing-13.png" style="object-position:center"/>
<div class="hc-ov"><span class="hc-tag">Innovation</span><span class="hc-caption">George Washington Carver — genius born from struggle</span></div>
</div>
<div class="hc">
<img alt="Dr. Martin Luther King Jr. and Malcolm X — the only time they met, 1964" src="/welcome-images/landing-14.png" style="object-position:center top"/>
<div class="hc-ov"><span class="hc-tag">Leadership</span><span class="hc-caption">Dr. King &amp; Malcolm X — March 26, 1964. Their only meeting.</span></div>
</div>
<div class="hc">
<img alt="Crispus Attucks — first American killed in the Boston Massacre, March 5 1770" crossorigin="anonymous" referrerpolicy="no-referrer" src="https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/crispus-attucks-gettyimages-517432282?_a=BAVMn6DY0" style="object-position:center top"/>
<div class="hc-ov"><span class="hc-tag">Revolution</span><span class="hc-caption">Crispus Attucks — first American to die for independence, March 5, 1770</span></div>
</div>
<div class="hc">
<img alt="Black African American Civil War soldiers" crossorigin="anonymous" referrerpolicy="no-referrer" src="https://1.bp.blogspot.com/-1Q79RbIkqPM/YHdSF9YVsTI/AAAAAAAArdE/eZHh2hp69Sky35nXQFwBa9s82ktARH4IwCLcBGAsYHQ/s0/black_african_american_civil_rights_soldiers.jpg" style="object-position:center"/>
<div class="hc-ov"><span class="hc-tag">Civil War</span><span class="hc-caption">Black Union soldiers — fought for a nation that enslaved their families</span></div>
</div>
<div class="hc">
<img alt="Buffalo Soldiers — Black Union Army regiment" src="/welcome-images/landing-15.png" style="object-position:center"/>
<div class="hc-ov"><span class="hc-tag">Sacrifice</span><span class="hc-caption">Buffalo Soldiers — defended a nation that denied them rights</span></div>
</div>
</div>
<div class="inventors-grid-v3" id="inventors-grid" style="margin:1.5rem calc(-5%) 0;position:relative;overflow:hidden;">
<img alt="FBA Inventors and Innovators — Black American scientists, engineers and pioneers" src="/welcome-images/landing-16-v3.png" style="display:block;width:100%;height:auto;"/>
<div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(4,12,28,.92) 0%,rgba(4,12,28,.4) 60%,transparent 100%);padding:1.5rem 2rem 1.2rem;">
<span style="font-size:.78rem;font-weight:700;color:#fff;letter-spacing:.14em;text-transform:uppercase;">Inventors &amp; Innovators</span>
<span style="display:block;font-size:.7rem;color:rgba(255,255,255,.55);font-style:italic;margin-top:3px;">FBA scientists, engineers, and pioneers whose brilliance shaped the modern world — often uncredited, never forgotten</span>
</div>
</div>
<p class="hist-note rv">Our digital museum of history is coming. Contribute your photos and help build the archive.</p>
</section>

<!-- DOWNLOAD / FOUNDING WAITLIST — PRESERVED -->
<section id="download">
<div class="dl-orb"></div>
<div class="dlinner rv">
<div class="seyebrow light" style="justify-content:center">Early Access</div>
<h2 class="light" style="margin:0 auto .85rem">Join the movement.<br/>Be first.</h2>
<p class="sdesc light" style="margin:0 auto 2.5rem;text-align:center">Thousands of creators are already on the waitlist. Reserve your spot now.</p>
<div class="waitlist-card">
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
<div class="sbgs">
<a class="sbg" href="/apps/math-trail"><img alt="" src="/fox paw.png"/><div><span>ECCOOZS Learning Apps</span><strong>Math Trail</strong></div></a>
<a class="sbg" href="/apps/my-voice-journey-youth"><img alt="" src="/voice journey.png"/><div><span>Youth communication</span><strong>My Voice Journey Youth</strong></div></a>
<a class="sbg" href="/apps/my-voice-journey"><img alt="" src="/voice journey.png"/><div><span>Adult communication</span><strong>My Voice Journey</strong></div></a>
<a class="sbg" href="/house-of-eccoozs"><i data-lucide="shopping-bag"></i><div><span>Wear the culture</span><strong>House of ECCOOZS</strong></div></a>
</div>
</div>
</section>

<!-- FOOTER -->
<footer>
<div class="footer-inner">
<div class="ftop">
  <div class="footer-brand">
    <div class="fbrand"><img alt="ECCOOZS e mark" class="fbrand-mark" src="${eccoozsEMark.src}"/><span class="fbrand-wordmark" aria-label="ECCOOZS">eccoozs</span></div>
    <p class="ftagline">Technology for how we live, learn, connect, and grow.</p>
  </div>
  <div><div class="fct">Products</div><ul class="fls"><li><a href="#eccoozs-app">The App</a></li><li><a href="/learning">Learning Apps</a></li><li><a href="#business">Business Directory</a></li><li><a href="/house-of-eccoozs">House of ECCOOZS</a></li></ul></div>
  <div><div class="fct">Company</div><ul class="fls"><li><a href="#community">About</a></li><li><a href="#history">American Legacy</a></li><li><a href="/support">Support</a></li><li><a href="/support">Contact</a></li></ul></div>
  <div><div class="fct">Legal</div><ul class="fls"><li><a href="/terms">Terms of Service</a></li><li><a href="/privacy">Privacy Policy</a></li><li><a href="/conduct">Community Guidelines</a></li></ul></div>
</div>
<div class="fbot">
<span class="fcp">© 2026 ECCOOZS. All rights reserved.</span>
<div class="flg"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/conduct">Policies</a></div>
</div>
</div>
</footer>
`;
