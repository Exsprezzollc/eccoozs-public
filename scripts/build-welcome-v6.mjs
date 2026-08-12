import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const payloadDir = path.join(root, "src", "welcome-v6-payload");
const parts = fs.readdirSync(payloadDir)
  .filter((name) => /^v2-\d+\.txt$/.test(name))
  .sort();

if (parts.length !== 14) {
  throw new Error(`Expected 14 V6 payload chunks, found ${parts.length}.`);
}

const b64 = parts.map((name) => fs.readFileSync(path.join(payloadDir, name), "utf8").trim()).join("");
let html = zlib.gunzipSync(Buffer.from(b64, "base64")).toString("utf8");

// Restore the uploaded drop-in as the baseline. These are the original V6
// navigation/link states from eccoozs-v6-final.html, before requested fixes.
const replacements = [
  ['<a class="nav-logo" href="#hero">', '<a class="nav-logo" href="#">'],
  ['<li><a href="#hero" class="active">Home</a></li>', '<li><a href="#" class="active">Home</a></li>'],
  ['<li><a href="#download">Join</a></li>', '<li><a href="#pricing">Pricing</a></li>'],
  ['<a class="nav-login" href="#download">Log In</a>', '<a class="nav-login" href="#">Log In</a>'],
  ['href="/apps/math-trail"', 'href="math-trail.html"'],
  ['href="/apps/my-voice-journey"', 'href="my-voice-journey.html"'],
  ['href="/learning"', 'href="learning-apps.html"'],
  ['<a href="/house-of-eccoozs" class="sbg"', '<a href="https://eccoozs.com/shop" target="_blank" rel="noopener" class="sbg"'],
  ['<li><a href="/house-of-eccoozs">House of Eccoozs</a></li>', '<li><span style="opacity:.72">House of Eccoozs — Coming Soon</span></li>'],
  ['<a href="#features">Soundrooms</a>', '<a href="#">Soundrooms</a>'],
  ['<a href="#lifestyle">Culture</a>', '<a href="#">Culture</a>'],
  ['<a href="/welcome/support">Partnerships</a>', '<a href="#">Partnerships</a>'],
  ['<a href="/welcome/support">Media Kit</a>', '<a href="#">Media Kit</a>'],
  ['<a href="/welcome/terms">Terms of Service</a>', '<a href="#">Terms of Service</a>'],
  ['<a href="/welcome/privacy">Privacy Policy</a>', '<a href="#">Privacy Policy</a>'],
  ['<a href="/welcome/conduct">Community Guidelines</a>', '<a href="#">Community Guidelines</a>'],
  ['<a href="/welcome/support">Contact Us</a>', '<a href="#">Contact Us</a>'],
  ['<a href="/welcome/privacy">Privacy</a>', '<a href="#">Privacy</a>'],
  ['<a href="/welcome/terms">Terms</a>', '<a href="#">Terms</a>'],
  ['<a href="/welcome/conduct">Policies</a>', '<a href="#">Policies</a>'],
];
for (const [from, to] of replacements) html = html.split(from).join(to);

const pricing = String.raw`<!-- PRICING (WHITE) -->
<section id="pricing">
  <div class="printo rv">
    <div class="seyebrow dark">Transparent Pricing</div>
    <h2 class="dark">Start free.<br>Grow on your terms.</h2>
  </div>
  <div class="pgd rv">
    <!-- FREE -->
    <div class="pd">
      <div class="pnm">Free</div>
      <div class="pp"><sub>$</sub>0</div>
      <div class="pper">Forever — no credit card needed</div>
      <div class="pdiv"></div>
      <ul class="pfl">
        <li><i data-lucide="check-circle-2"></i>Full profile &amp; The Flow</li>
        <li><i data-lucide="check-circle-2"></i>Post photos, videos &amp; audio</li>
        <li><i data-lucide="check-circle-2"></i>Explore &amp; follow creators</li>
        <li><i data-lucide="check-circle-2"></i>Join soundrooms as listener</li>
        <li><i data-lucide="check-circle-2"></i>Access the Newsroom</li>
        <li><i data-lucide="check-circle-2"></i>Basic profile analytics</li>
      </ul>
      <button class="pb out"><i data-lucide="arrow-right"></i>Get Started Free</button>
    </div>

    <!-- CERTIFIED $9.99 -->
    <div class="pd">
      <div class="pnm">Certified</div>
      <div class="pp"><sub>$</sub>9<sub style="font-size:1rem">.99</sub></div>
      <div class="pper">per month, billed monthly</div>
      <div class="pdiv"></div>
      <ul class="pfl">
        <li><i data-lucide="check-circle-2"></i>Everything in Free</li>
        <li><i data-lucide="check-circle-2"></i>Eccoozs Certified badge</li>
        <li><i data-lucide="check-circle-2"></i>Host soundrooms &amp; sessions</li>
        <li><i data-lucide="check-circle-2"></i>Creator monetization tools</li>
        <li><i data-lucide="check-circle-2"></i>Advanced analytics dashboard</li>
        <li><i data-lucide="check-circle-2"></i>Priority in Explore feed</li>
      </ul>
      <button class="pb out"><i data-lucide="arrow-right"></i>Join Waitlist</button>
    </div>

    <!-- VERIFIED $14.99 — featured -->
    <div class="pd feat">
      <div class="popbdg">Most Popular</div>
      <div class="pnm">Verified</div>
      <div class="pp"><sub>$</sub>14<sub style="font-size:1rem">.99</sub></div>
      <div class="pper">per month, billed monthly</div>
      <div class="pdiv"></div>
      <ul class="pfl">
        <li><i data-lucide="check-circle-2"></i>Everything in Certified</li>
        <li><i data-lucide="check-circle-2"></i>Eccoozs Verified blue badge</li>
        <li><i data-lucide="check-circle-2"></i>Merch shelf on your profile</li>
        <li><i data-lucide="check-circle-2"></i>15% shop referral commission</li>
        <li><i data-lucide="check-circle-2"></i>Ad revenue sharing (at 50K+)</li>
        <li><i data-lucide="check-circle-2"></i>Early access to new features</li>
      </ul>
      <button class="pb sol"><i data-lucide="arrow-right"></i>Join Waitlist</button>
    </div>
  </div>
</section>

`;

if (!html.includes('id="pricing"')) {
  const marker = '<!-- FOOTER';
  if (!html.includes(marker)) throw new Error('Could not find footer marker for baseline pricing section.');
  html = html.replace(marker, pricing + marker);
}

const required = [
  '<title>Eccoozs — Culture. Conversation. Community.</title>',
  'Explore. Express. Elevate.',
  'id="waitlistForm"',
  'id="pricing"',
  'href="#pricing"',
  'math-trail.html',
  'my-voice-journey.html',
  'learning-apps.html',
  'https://eccoozs.com/shop',
];
for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Baseline integrity check failed: missing ${marker}`);
}
const waitlists = (html.match(/id="waitlistForm"/g) || []).length;
if (waitlists !== 1) throw new Error(`Expected one waitlist form, found ${waitlists}.`);
const placeholders = (html.match(/href="#"/g) || []).length;
if (placeholders < 10) throw new Error(`Expected original placeholder links; found only ${placeholders}.`);

const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
const publicDir = path.join(root, 'public');
if (fs.existsSync(publicDir)) fs.cpSync(publicDir, dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), html);
fs.writeFileSync(path.join(dist, 'eccoozs-v6-final.html'), html);
fs.mkdirSync(path.join(dist, 'welcome'), { recursive: true });
fs.writeFileSync(path.join(dist, 'welcome', 'index.html'), html);
fs.writeFileSync(path.join(dist, 'welcome.html'), html);
console.log(`Built clean ECCOOZS V6 baseline: ${html.length} chars, ${placeholders} original placeholder links.`);
