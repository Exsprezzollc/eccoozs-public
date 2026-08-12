import {mathTrailPresentation, voiceJourneyAdultPresentation, voiceJourneyYouthPresentation} from "@/components/learning/presentationAssets";


export const welcomeV6Markup = String.raw`
<!-- NAV -->
<nav>
<a class="nav-logo" href="/welcome">
<img alt="Eccoozs E mark" class="nav-mark" src="/icon.svg"/>
<div>
<div class="nav-wm">ECCOOZS</div>
<span class="nav-tagline">Culture · Conversation · Community</span>
</div>
</a>
<ul class="nav-links">
<li><a class="active" href="/welcome">Home</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#app-preview">The App</a></li>
<li><a href="#learning-apps">Learning Apps</a></li>
<li><a href="#lifestyle">Community</a></li><li><a href="#community">About</a></li>
<li><a href="#history">Legacy</a></li>
<li><a href="#download">Join</a></li>
</ul>
<div class="nav-right">
<a class="nav-login" href="#download" title="ECCOOZS login opens at launch — join Early Access">Log In</a>
<a class="nav-join" href="#download">Join ECCOOZS</a>
</div>
</nav>
<!-- HERO — office group full bleed + blue gradient -->
<section id="hero">
<div class="hero-photo"><img alt="Eccoozs community — Create Culture, Be Real" src="/welcome-images/landing-02.png"/></div>
<div class="hero-color-wash"></div>
<div class="hero-grad"></div>
<div class="hero-bottom"></div>
<div class="hero-content">
<div class="hero-eyebrow">More than a platform.</div>
<div class="hero-welcome">Welcome to</div>
<div class="hero-brand">ECCO<span>OZS</span></div>
<div class="hero-tagline">Explore. Express. Elevate.</div>
<p class="hero-desc">A culture-first social platform built for real voices, real stories, and elevated connection. No filters. No dilution. No apologies.</p>
<div class="hero-actions">
<a class="btn-p" href="#download"><i data-lucide="arrow-right"></i>Join the Movement</a>
<a class="btn-g" href="#features"><i data-lucide="layout-grid"></i>Explore the Platform</a>
</div>
<div class="hero-sp">
<div class="sp-avs">
<div class="sp-av">A</div><div class="sp-av">K</div><div class="sp-av">M</div><div class="sp-av">J</div>
<div class="sp-plus">+8K</div>
</div>
<div class="sp-txt">
<div class="sp-strong">Built for creators. Loved by communities.</div>
<div class="sp-sub">Be among the first. Founding member spots are limited.</div>
</div>
</div>
</div>
<div class="feature-strip">
<div class="fs-item"><div class="fs-icon"><i data-lucide="mic-2"></i></div><div><div class="fs-label">Soundrooms</div><div class="fs-desc">Speak. Listen. Connect.<br/>Real conversations. Real time.</div></div></div>
<div class="fs-item"><div class="fs-icon"><i data-lucide="layout-grid"></i></div><div><div class="fs-label">The Flow</div><div class="fs-desc">Your feed. Your culture.<br/>Content that reflects you.</div></div></div>
<div class="fs-item"><div class="fs-icon"><i data-lucide="trending-up"></i></div><div><div class="fs-label">Elevate</div><div class="fs-desc">Creators. Brands. Impact.<br/>Build, grow, inspire.</div></div></div>
<div class="fs-item"><div class="fs-icon"><i data-lucide="calendar-check"></i></div><div><div class="fs-label">Events</div><div class="fs-desc">Local. Cultural. Elevated.<br/>Experiences that bring us together.</div></div></div>
</div>
</section>
<!-- STATS (WHITE) -->
<div class="stats-strip rv">
<div class="si"><div class="sn">10<span>K+</span></div><div class="sl">Creators Registered</div></div>
<div class="si"><div class="sn">3</div><div class="sl">Ways to Earn</div></div>
<div class="si"><div class="sn">50<span>+</span></div><div class="sl">Cities Represented</div></div>
<div class="si"><div class="sn">1</div><div class="sl">Platform. All of It.</div></div>
<div class="si"><div class="sn">∞</div><div class="sl">Possibilities</div></div>
</div>
<!-- MARQUEE (NAVY) -->
<div class="mwrap">
<div class="mtrack">
<span class="mi"><i data-lucide="mic-2"></i>Soundrooms</span>
<span class="mi"><i data-lucide="repeat-2"></i>Ecco</span>
<span class="mi"><i data-lucide="shopping-bag"></i>House of Eccoozs</span>
<span class="mi"><i data-lucide="trending-up"></i>Monetization</span>
<span class="mi"><i data-lucide="layout-grid"></i>The Flow</span>
<span class="mi"><i data-lucide="newspaper"></i>Newsroom</span>
<span class="mi"><i data-lucide="users"></i>Community</span>
<span class="mi"><i data-lucide="mic-2"></i>Soundrooms</span>
<span class="mi"><i data-lucide="repeat-2"></i>Ecco</span>
<span class="mi"><i data-lucide="shopping-bag"></i>House of Eccoozs</span>
<span class="mi"><i data-lucide="trending-up"></i>Monetization</span>
<span class="mi"><i data-lucide="layout-grid"></i>The Flow</span>
<span class="mi"><i data-lucide="newspaper"></i>Newsroom</span>
<span class="mi"><i data-lucide="users"></i>Community</span>
</div>
</div>
<!-- ECHO STATEMENT (NAVY) -->
<section id="echo">
<div class="echo-orb"></div>
<div class="echo-inner rv">
<div class="seyebrow light" style="justify-content:center">The Eccoozs Standard</div>
<p class="echo-quote">On Eccoozs, you don't go <em>"viral."</em><br/>What you say or do <em>echoes.</em><br/>Make sure you echo in a positive way.</p>
<p class="echo-body">We built a platform that holds content and creators to a higher standard. No toxic algorithms feeding outrage. No hollow metrics chasing clout. Just authentic voices, resonating with real people.</p>
</div>
</section>
<!-- FEATURES (CREAM / LIGHT) -->
<section id="features">
<div class="fi rv">
<div>
<div class="seyebrow dark">Platform Features</div>
<h2 class="dark">Everything you need.<br/>All in one place.</h2>
</div>
<p class="sdesc dark">Stop juggling a dozen apps. Eccoozs brings together every tool a modern creator needs — from going live to getting paid.</p>
</div>
<div class="fgrid rv">
<div class="fc"><div class="fic b"><i data-lucide="mic-2"></i></div><div class="ft">Soundrooms</div><div class="fd">Host live audio rooms with your community. Invite co-hosts, take speakers on stage, broadcast your voice to the world.</div></div>
<div class="fc"><div class="fic n"><i data-lucide="repeat-2"></i></div><div class="ft">Ecco</div><div class="fd">Where posts become conversations. Quote eccos, picture eccos, and video eccos — organized for context, not chaos.</div></div>
<div class="fc"><div class="fic b"><i data-lucide="shopping-bag"></i></div><div class="ft">House of Eccoozs</div><div class="fd">Shop House of Eccoozs merch and spread the culture. Members earn commission promoting the brand — more ways to earn coming soon.</div></div>
<div class="fc"><div class="fic n"><i data-lucide="layout-grid"></i></div><div class="ft">The Flow</div><div class="fd">Your feed. Your culture. Share photos, videos, news, and audio in a beautifully curated feed that puts your content first.</div></div>
<div class="fc"><div class="fic b"><i data-lucide="trending-up"></i></div><div class="ft">Elevate &amp; Earn</div><div class="fd">Two income streams: shop commissions and ad sharing — all tracked in your personal dashboard.</div></div>
<div class="fc"><div class="fic n"><i data-lucide="store"></i></div><div class="ft">Business Directory</div><div class="fd">A curated discovery space for trusted businesses, creators, products, and services — helping members support what aligns with their values.</div></div>
</div>
</section>
<!-- LIFESTYLE GRID (NAVY) -->
<section id="lifestyle">
<div class="ls-intro rv">
<div class="seyebrow light" style="justify-content:center">The Community</div>
<h2 class="light">Real voices. Real connections.</h2>
<p class="sdesc light" style="margin:0 auto;text-align:center">From bedroom creators to headline artists — Eccoozs is where your community comes together.</p>
</div>
<div class="ls-grid rv">
<!-- CREATE — tall left -->
<div class="ls-cell tall">
<img alt="Create on Eccoozs — community connecting" src="/welcome-images/landing-03.png"/>
<div class="ls-ov">
<div class="ls-label">Create<span>Express yourself freely</span></div>
</div>
</div>
<!-- CONNECT — top center -->
<div class="ls-cell">
<img alt="Eccoozs FBA business directory listing" src="/welcome-images/landing-04.png" style="object-position:center top"/>
<div class="ls-ov">
<div class="ls-label">Connect<span>FBA business directory</span></div>
</div>
</div>
<!-- EXPRESS — top right -->
<div class="ls-cell">
<img alt="Creators expressing themselves on Eccoozs" src="/welcome-images/landing-05.jpg"/>
<div class="ls-ov">
<div class="ls-label">Express<span>Your voice, your way</span></div>
</div>
</div>
<!-- SOUNDROOMS — bottom center -->
<div class="ls-cell">
<img alt="Eccoozs soundrooms page" src="/welcome-images/landing-06.png" style="object-position:center top"/>
<div class="ls-ov">
<div class="ls-label">Soundrooms<span>Speak. Listen. Connect.</span></div>
</div>
</div>
<!-- ELEVATE — bottom right -->
<div class="ls-cell">
<img alt="Eccoozs community wearing merch on campus" src="/welcome-images/landing-07.png"/>
<div class="ls-ov">
<div class="ls-label">Elevate<span>Wear the culture</span></div>
</div>
</div>
</div>
</section>
<!-- APP PREVIEW (DARK NAVY) -->
<section id="app-preview">
<div class="ap-orb"></div>
<div class="ap-inner">
<div class="rv">
<div class="seyebrow light">The App Experience</div>
<h2 class="light">Beautifully designed<br/>for every screen.</h2>
<p class="sdesc light" style="margin-bottom:2rem">Whether you're on your phone between meetings or at your desk building your audience — Eccoozs flows with your life.</p>
<a class="btn-p" href="#download" style="display:inline-flex"><i data-lucide="arrow-right"></i>Get Early Access</a>
</div>
<div class="ap-img-wrap rv">
<img alt="Eccoozs on laptop and phone" src="/welcome-images/landing-08.png" style="display:block"/>
</div>
</div>
</section>
<!-- COMMUNITY (WHITE) -->
<section id="community">
<div class="comm-inner">
<div class="comm-img rv">
<img alt="Eccoozs community — Create Culture Be Real" src="/welcome-images/landing-09.jpg"/>
</div>
<div class="rv">
<div class="seyebrow dark">Our Story</div>
<h2 class="dark">Built from within.<br/>For all who walk<br/>with respect.</h2>
<p class="comm-quote">"I didn't build this to go viral. I built it because there was no place left for our voices to breathe."</p>
<p class="comm-body">ECCOOZS was built by Foundational Black Americans as a digital sanctuary for culture, faith, and truth. But ALL ARE WELCOME HERE who walk in respect. This isn't just an app — it's a movement.</p>
<a class="comm-link" href="#community"><i data-lucide="arrow-right"></i>Read Our Full Story</a>
</div>
</div>
</section>
<!-- HISTORY / LEGACY (CREAM) -->
<section id="history">
<div class="hist-intro rv">
<div class="seyebrow light" style="justify-content:center">American Legacy</div>
<h2 class="light">Honoring our ancestors.<br/>Celebrating our culture.</h2>
<p style="color:rgba(255,255,255,.45);max-width:580px;margin:0 auto;font-size:.97rem;line-height:1.8">These moments shaped us. These faces remind us where we come from — and why platforms like Eccoozs matter.</p>
</div>
<div class="hist-grid rv">
<!-- TALL LEFT (rows 1-2) — Enslaved family in cotton field -->
<div class="hc tall">
<img alt="Enslaved family in cotton field" src="/welcome-images/landing-10.png"/>
<div class="hc-ov">
<span class="hc-tag">Our Foundation</span>
<span class="hc-caption">Enslaved people who built a nation — their story lives in our blood</span>
</div>
</div>
<!-- Row 1, Col 2 — Native chiefs at White House -->
<div class="hc">
<img alt="Native American chiefs at the White House with President Coolidge, 1924" src="/welcome-images/landing-11.png" style="object-position:center top"/>
<div class="hc-ov">
<span class="hc-tag">Indigenous Heritage</span>
<span class="hc-caption">Native chiefs at the White House, 1924</span>
</div>
</div>
<!-- Row 1, Col 3 — Choctaw people -->
<div class="hc">
<img alt="Choctaw people in traditional dress" src="/welcome-images/landing-12.png" style="object-position:center top"/>
<div class="hc-ov">
<span class="hc-tag">Cultural Roots</span>
<span class="hc-caption">Choctaw people — culture, tradition, and resilience</span>
</div>
</div>
<!-- Row 2, Col 2 — George Washington Carver -->
<div class="hc">
<img alt="George Washington Carver in his laboratory at Tuskegee" src="/welcome-images/landing-13.png" style="object-position:center"/>
<div class="hc-ov">
<span class="hc-tag">Innovation</span>
<span class="hc-caption">George Washington Carver — genius born from struggle</span>
</div>
</div>
<!-- Row 2, Col 3 — MLK & Malcolm X -->
<div class="hc">
<img alt="Dr. Martin Luther King Jr. and Malcolm X — the only time they met, 1964" src="/welcome-images/landing-14.png" style="object-position:center top"/>
<div class="hc-ov">
<span class="hc-tag">Leadership</span>
<span class="hc-caption">Dr. King &amp; Malcolm X — March 26, 1964. Their only meeting.</span>
</div>
</div>
<!-- Row 3, Col 1 — Crispus Attucks / Revolutionary War -->
<div class="hc">
<img alt="Crispus Attucks — first American killed in the Boston Massacre, March 5 1770" crossorigin="anonymous" referrerpolicy="no-referrer" src="https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/crispus-attucks-gettyimages-517432282?_a=BAVMn6DY0" style="object-position:center top"/>
<div class="hc-ov">
<span class="hc-tag">Revolution</span>
<span class="hc-caption">Crispus Attucks — first American to die for independence, March 5, 1770</span>
</div>
</div>
<!-- Row 3, Col 2 — Civil War soldiers -->
<div class="hc">
<img alt="Black African American Civil War soldiers" crossorigin="anonymous" referrerpolicy="no-referrer" src="https://1.bp.blogspot.com/-1Q79RbIkqPM/YHdSF9YVsTI/AAAAAAAArdE/eZHh2hp69Sky35nXQFwBa9s82ktARH4IwCLcBGAsYHQ/s0/black_african_american_civil_rights_soldiers.jpg" style="object-position:center"/>
<div class="hc-ov">
<span class="hc-tag">Civil War</span>
<span class="hc-caption">Black Union soldiers — fought for a nation that enslaved their families</span>
</div>
</div>
<!-- Row 3, Col 3 — Buffalo Soldiers -->
<div class="hc">
<img alt="Buffalo Soldiers — Black Union Army regiment" src="/welcome-images/landing-15.png" style="object-position:center"/>
<div class="hc-ov">
<span class="hc-tag">Sacrifice</span>
<span class="hc-caption">Buffalo Soldiers — defended a nation that denied them rights</span>
</div>
</div>
</div>
<!-- INVENTORS & INNOVATORS GRID — current v3 -->
<div class="inventors-grid-v3" id="inventors-grid" style="margin:1.5rem calc(-5%) 0;position:relative;overflow:hidden;">
<img alt="FBA Inventors and Innovators — Black American scientists, engineers and pioneers" src="/welcome-images/landing-16-v3.png" style="display:block;width:100%;height:auto;"/>
<div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(4,12,28,.92) 0%,rgba(4,12,28,.4) 60%,transparent 100%);padding:1.5rem 2rem 1.2rem;">
<span style="font-size:.78rem;font-weight:700;color:#fff;letter-spacing:.14em;text-transform:uppercase;">Inventors &amp; Innovators</span>
<span style="display:block;font-size:.7rem;color:rgba(255,255,255,.55);font-style:italic;margin-top:3px;">FBA scientists, engineers, and pioneers whose brilliance shaped the modern world — often uncredited, never forgotten</span>
</div>
</div>
<p class="hist-note rv">Our digital museum of history is coming. Contribute your photos and help build the archive.</p>
</section>
<!-- ECCOOZS LEARNING APPS -->
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
<!-- DOWNLOAD (NAVY) -->
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
<a class="sbg" href="/apps/math-trail" style="text-decoration:none"><i data-lucide="calculator"></i><div><span>ECCOOZS Learning Apps</span><strong>Math Trail</strong></div></a>
<a class="sbg" href="/apps/my-voice-journey-youth" style="text-decoration:none"><i data-lucide="message-circle"></i><div><span>Youth communication</span><strong>My Voice Journey Youth</strong></div></a>
<a class="sbg" href="/apps/my-voice-journey" style="text-decoration:none"><i data-lucide="message-circle"></i><div><span>Adult communication</span><strong>My Voice Journey</strong></div></a>
<a class="sbg" href="/house-of-eccoozs" style="text-decoration:none"><i data-lucide="shopping-bag"></i><div><span>Wear the culture</span><strong>House of Eccoozs</strong></div></a>
</div>
</div>
</section>
<!-- FOOTER (DARKEST NAVY) -->
<footer>
<div class="footer-inner">
<div class="ftop">
<div>
<div class="fbrand">
<img alt="Eccoozs" class="fbrand-mark" src="/icon.svg">
<span class="fbwm">Eccoozs</span>
</img></div>
<p class="ftagline">Culture. Conversation. Community.</p>
</div>
<div><div class="fct">Platform</div><ul class="fls"><li><a href="#features">Features</a></li><li><a href="#app-preview">The App</a></li><li><a href="/learning">Learning Apps</a></li><li><a href="#download">Download</a></li><li><a href="#features">Soundrooms</a></li><li><span style="opacity:.72">House of Eccoozs — Coming Soon</span></li></ul></div>
<div><div class="fct">Company</div><ul class="fls"><li><a href="#community">About</a></li><li><a href="#lifestyle">Culture</a></li><li><a href="/support">Partnerships</a></li><li><a href="/support">Media Kit</a></li></ul></div>
<div><div class="fct">Legal</div><ul class="fls"><li><a href="/terms">Terms of Service</a></li><li><a href="/privacy">Privacy Policy</a></li><li><a href="/conduct">Community Guidelines</a></li><li><a href="/support">Contact Us</a></li></ul></div>
</div>
<div class="fbot">
<span class="fcp">© 2026 Eccoozs. All rights reserved.</span>
<div class="flg"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/conduct">Policies</a></div>
</div>
</div>
</footer>

`;
