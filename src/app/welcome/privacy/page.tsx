import type { Metadata } from "next";
import { LegalPageShell } from "@/components/marketing/LegalPageShell";

const legalStyles = String.raw`
 
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --night: #040c1c;
    --navy: #071240;
    --blue: #1a3ef5;
    --blue-l: #4a76ff;
    --cream: #f8f9fd;
    --cream-2: #f0f3fb;
    --white: #ffffff;
    --td: #070f28;
    --tm: #1c3570;
    --tmut: #607ab5;
    --bdr: rgba(7,18,64,0.09);
  }
 
  html { scroll-behavior: smooth; }
 
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--td);
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }
 
  a { color: var(--blue); text-decoration: none; }
  a:hover { text-decoration: underline; }
 
  /* NAV */
  nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--bdr);
    padding: 0 5%;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-brand {
    display: flex; align-items: center; gap: 10px;
    font-weight: 800; font-size: 1.1rem;
    color: var(--blue); letter-spacing: .07em;
    text-transform: uppercase; text-decoration: none;
  }
  .nav-brand-sub { font-size: .58rem; font-weight: 500; color: var(--tmut); letter-spacing: .1em; text-transform: uppercase; display: block; margin-top: 1px; }
  .nav-back {
    font-size: .82rem; font-weight: 500; color: var(--tm);
    display: flex; align-items: center; gap: 6px;
    transition: color .2s;
  }
  .nav-back:hover { color: var(--blue); text-decoration: none; }
 
  /* HERO BAND */
  .page-hero {
    background: var(--navy);
    padding: 5rem 5% 4rem;
    position: relative;
    overflow: hidden;
  }
  .page-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 20% 50%, rgba(26,62,245,.18) 0%, transparent 60%);
    pointer-events: none;
  }
  .page-hero-inner {
    max-width: 860px;
    margin: 0 auto;
    position: relative; z-index: 1;
  }
  .page-eyebrow {
    font-size: .7rem; font-weight: 700;
    letter-spacing: .22em; text-transform: uppercase;
    color: var(--blue-l);
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 8px;
  }
  .page-eyebrow::before {
    content: '';
    width: 20px; height: 2px;
    background: var(--blue-l);
    display: inline-block; flex-shrink: 0;
  }
  .page-hero h1 {
    font-family: 'Cormorant Garant', serif;
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.05;
    margin-bottom: .8rem;
  }
  .page-hero-sub {
    font-size: 1rem;
    color: rgba(255,255,255,.5);
    margin-bottom: .4rem;
  }
  .page-hero-meta {
    display: flex; flex-wrap: wrap; gap: .75rem;
    margin-top: 1.5rem;
  }
  .meta-tag {
    font-size: .72rem; font-weight: 600;
    color: rgba(255,255,255,.55);
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 99px;
    padding: 4px 12px;
    letter-spacing: .04em;
  }
 
  /* CONTENT */
  .content-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 5rem 5%;
  }
 
  .content-wrap p {
    font-size: .97rem;
    color: var(--tm);
    margin-bottom: 1rem;
    line-height: 1.82;
  }
 
  .content-wrap h2 {
    font-family: 'Cormorant Garant', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--td);
    margin: 3rem 0 .6rem;
    padding-bottom: .5rem;
    border-bottom: 2px solid var(--blue);
    line-height: 1.15;
  }
 
  .content-wrap h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--td);
    margin: 1.5rem 0 .4rem;
  }
 
  .content-wrap ul {
    margin: .75rem 0 1rem 0;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: .45rem;
  }
 
  .content-wrap li {
    font-size: .95rem;
    color: var(--tm);
    line-height: 1.72;
    position: relative;
  }
 
  .content-wrap li::marker {
    color: var(--blue);
    font-size: .75rem;
  }
 
  .content-wrap hr.section-rule {
    border: none;
    border-top: 1px solid var(--bdr);
    margin: 2.5rem 0;
  }
 
  .content-wrap .spacer {
    height: .5rem;
  }
 
  .content-wrap .meta {
    font-size: .8rem;
    color: var(--tmut);
    margin-bottom: 1.5rem;
    font-style: italic;
  }
 
  /* Callout */
  .content-wrap .callout {
    border-left: 4px solid var(--blue);
    background: var(--cream);
    padding: 1rem 1.25rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--td);
    border-radius: 0 8px 8px 0;
  }
 
  /* Tables */
  .table-wrap {
    overflow-x: auto;
    margin: 1.5rem 0;
    border-radius: 12px;
    border: 1px solid var(--bdr);
  }
 
  .table-wrap table {
    width: 100%;
    border-collapse: collapse;
    font-size: .88rem;
  }
 
  .table-wrap th {
    background: var(--navy);
    color: #fff;
    font-weight: 600;
    text-align: left;
    padding: .75rem 1rem;
    font-size: .8rem;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
 
  .table-wrap td {
    padding: .75rem 1rem;
    color: var(--tm);
    border-bottom: 1px solid var(--bdr);
    vertical-align: top;
    line-height: 1.65;
  }
 
  .table-wrap tr:last-child td { border-bottom: none; }
 
  .table-wrap tr:nth-child(even) td {
    background: var(--cream);
  }
 
  /* Copyright */
  .content-wrap .copyright {
    font-size: .78rem;
    color: var(--tmut);
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--bdr);
  }
 
  /* FOOTER */
  .page-footer {
    background: var(--night);
    padding: 3rem 5%;
    text-align: center;
  }
  .page-footer p {
    color: rgba(255,255,255,.4);
    font-size: .8rem;
    margin-bottom: .4rem;
  }
  .page-footer a {
    color: var(--blue-l);
    font-weight: 500;
  }
  .page-footer .footer-brand {
    font-size: 1.1rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: .07em;
    text-transform: uppercase;
    margin-bottom: .75rem;
    display: block;
  }
 
  /* Strong in body */
  strong { color: var(--td); font-weight: 700; }
 
  /* Contact section */
  .contact-band {
    background: var(--cream);
    border-top: 1px solid var(--bdr);
    padding: 3rem 5%;
    text-align: center;
  }
  .contact-band p {
    color: var(--tmut);
    font-size: .9rem;
    margin-bottom: .5rem;
  }
  .contact-band a {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--blue);
    display: inline-block;
    margin-top: .25rem;
  }
 
  /* Enforce table special colors */
  tr:has(td:first-child:contains('⚠️')) td { background: #fffbeb !important; }
  tr:has(td:first-child:contains('🚫')) td { background: #fff0f0 !important; }
 
  @media (max-width: 640px) {
    .content-wrap { padding: 3rem 1.25rem; }
    .page-hero { padding: 3rem 1.25rem 2.5rem; }
  }
 
 
/* ===== UPGRADE LAYER ===== */
nav { height: 66px; gap: 1rem; }
.nav-wrap-left { display:flex; align-items:center; gap:2.4rem; min-width:0; }
.nav-brand { gap:11px; }
.nav-logo { width:30px; height:30px; object-fit:contain; flex-shrink:0; filter:drop-shadow(0 3px 8px rgba(26,62,245,.28)); }
.nav-brand-text { display:flex; flex-direction:column; line-height:1.04; font-weight:800; font-size:1.05rem; color:var(--blue); letter-spacing:.07em; text-transform:uppercase; }
.nav-brand-text .nav-brand-sub { margin-top:2px; }
.nav-links { display:flex; gap:1.55rem; }
.nav-links a { font-size:.83rem; font-weight:600; color:var(--tm); letter-spacing:.01em; position:relative; padding:6px 0; }
.nav-links a:hover { color:var(--blue); text-decoration:none; }
.nav-links a.active { color:var(--blue); }
.nav-links a.active::after { content:''; position:absolute; left:0; right:0; bottom:-1px; height:2px; background:var(--blue); border-radius:2px; }
@media (max-width:860px){ .nav-links{ display:none; } .nav-wrap-left{ gap:0; } }
 
.page-hero { padding:5.5rem 5% 4.75rem; }
.hero-mark { position:absolute; right:-30px; top:50%; transform:translateY(-50%); width:330px; max-width:40%; opacity:.07; pointer-events:none; z-index:0; }
.page-hero-inner { z-index:2; }
.page-hero h1 { letter-spacing:-.01em; }
 
.toc { background:linear-gradient(180deg,var(--cream),var(--white)); border:1px solid var(--bdr); border-radius:16px; padding:1.5rem 1.7rem; margin:0 0 3.25rem; }
.toc-title { font-size:.7rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--blue); margin-bottom:1rem; display:flex; align-items:center; gap:8px; }
.toc-title::before { content:''; width:18px; height:2px; background:var(--blue); display:inline-block; }
.toc ol { list-style:none; margin:0; padding:0; columns:2; column-gap:2.5rem; }
.toc li { break-inside:avoid; margin-bottom:.55rem; }
.toc a { font-size:.9rem; color:var(--tm); font-weight:500; line-height:1.45; display:block; }
.toc a:hover { color:var(--blue); text-decoration:none; }
@media (max-width:640px){ .toc ol{ columns:1; } }
 
.content-wrap h2 { scroll-margin-top:90px; }
.content-wrap h2 .anchor { opacity:0; margin-left:.45rem; color:var(--blue-l); font-size:.78em; text-decoration:none; font-weight:600; transition:opacity .15s; }
.content-wrap h2:hover .anchor { opacity:.8; }
 
.page-footer { padding:3.5rem 5%; }
.footer-logo { width:42px; height:42px; object-fit:contain; margin:0 auto 1rem; display:block; filter:drop-shadow(0 5px 14px rgba(26,62,245,.35)); }
.page-footer .footer-brand { margin-bottom:.5rem; }
 


/* React/lucide icon support */
.btn-p svg,.btn-g svg,.comm-link svg,.pb svg{width:16px;height:16px}
.fs-icon svg{width:19px;height:19px}
.mi svg{width:13px;height:13px;opacity:.6}
.sbg svg{width:18px;height:18px;flex-shrink:0}
.pfl svg{width:15px;height:15px;flex-shrink:0;color:var(--blue);margin-top:1px}
.pd.feat .pfl svg{color:var(--blue-l)}
.lucide-react-icon{display:block;stroke-width:2}
.wl-honeypot{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}

.legal-nav-links{display:flex;align-items:center;gap:1.2rem}
.legal-nav-links a{font-size:.82rem;font-weight:600;color:var(--tm);text-decoration:none}
.legal-nav-links a:hover{color:var(--blue)}
.page-footer a{color:rgba(255,255,255,.55);text-decoration:none}
.page-footer a:hover{color:#fff}
@media(max-width:720px){.legal-nav-links{display:none}}
`;

export const metadata: Metadata = {
  title: "ECCOOZS — Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell styles={legalStyles}>
<section className="page-hero">
<img className="hero-mark" src="/images/support-17.png" alt="" />
<div className="page-hero-inner">
<div className="page-eyebrow">ECCOOZS Legal &amp; Community</div>
<h1>Privacy Policy</h1>
<p className="page-hero-sub">Effective June 2026 · Version 2.0</p>
<div className="page-hero-meta">
<span className="meta-tag">© 2026 ECCOOZS LLC</span>
<span className="meta-tag">All Rights Reserved</span>
<span className="meta-tag">privacy@eccoozs.com</span>
</div>
</div>
</section>
<main>
<div className="content-wrap">
<div className="spacer"></div>
<p className="meta"><strong>Effective Date:</strong> June 2026 | <strong>Version:</strong> 2.0</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<p className="callout">ECCOOZS is committed to protecting your privacy, your data, and your dignity. We do not sell, rent, or share your personal data with advertisers or data brokers. Your data exists to make this platform work for you — nothing more.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<div className="toc" aria-label="On this page"><div className="toc-title">On this page</div><ol><li><a href="#1-who-we-are">1. Who We Are</a></li><li><a href="#2-information-we-collect">2. Information We Collect</a></li><li><a href="#3-how-we-use-your-information">3. How We Use Your Information</a></li><li><a href="#4-how-we-share-your-information">4. How We Share Your Information</a></li><li><a href="#6-data-retention">5. Data Retention</a></li><li><a href="#7-your-rights-and-choices">6. Your Rights and Choices</a></li><li><a href="#8-data-security">7. Data Security</a></li><li><a href="#9-cookies-and-tracking">8. Cookies and Tracking</a></li><li><a href="#10-international-users">9. International Users</a></li><li><a href="#11-changes-to-this-policy">10. Changes to This Policy</a></li></ol></div>
<h2 id="1-who-we-are">1. Who We Are<a className="anchor" href="#1-who-we-are" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS is a culture-first social platform operated by ECCOOZS LLC. Our platform allows users to post content, join soundrooms, go live, read and discuss news, and connect with a community grounded in truth, heritage, and creativity.</p>
<div className="spacer"></div>
<p>For questions about this policy, contact us at: <strong>privacy@eccoozs.com</strong></p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="2-information-we-collect">2. Information We Collect<a className="anchor" href="#2-information-we-collect" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p><strong>Account Information</strong></p>
<ul>
<li>Name, email address, username, and profile details</li>
<li>Date of birth — used to verify that you meet the platform's minimum age requirement of 18</li>
<li>Profile photo, bio, and optional city/state location</li>
</ul>
<div className="spacer"></div>
<p><strong>User-Generated Content</strong></p>
<ul>
<li>Posts, photos, videos, audio recordings, and comments you create</li>
<li>Messages sent through the platform</li>
<li>Content that has been reported or flagged, tied to your account for moderation purposes</li>
</ul>
<div className="spacer"></div>
<p><strong>Technical Information</strong></p>
<ul>
<li>Device type, operating system, and browser information</li>
<li>IP address — used for security, fraud prevention, and geographic access controls</li>
<li>Device identifier — a technical fingerprint used to enforce account bans and prevent banned users from re-registering</li>
<li>Session data, error logs, and crash reports for platform performance</li>
</ul>
<div className="spacer"></div>
<p><strong>Behavior and Usage Data</strong></p>
<ul>
<li>Likes, shares, follows, and profile interactions</li>
<li>Activity logs maintained for moderation, safety audits, and platform improvement</li>
</ul>
<div className="spacer"></div>
<p><strong>Payment Information</strong></p>
<ul>
<li>Billing information for Certified ($9.99/mo) and Verified ($14.99/mo) subscriptions — processed securely by Stripe or PayPal</li>
<li>Payout details for Verified members receiving shop referral commissions</li>
<li>ECCOOZS does not store full credit card numbers. All payment data is handled by PCI-compliant processors</li>
</ul>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="3-how-we-use-your-information">3. How We Use Your Information<a className="anchor" href="#3-how-we-use-your-information" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>We use your data only for the following purposes:</p>
<div className="spacer"></div>
<ul>
<li>Operate and maintain the ECCOOZS platform and all its features</li>
<li>Verify account eligibility, identity, and age requirements</li>
<li>Moderate content and enforce our Community Guidelines and Terms of Service</li>
<li>Process subscription payments and commission payouts</li>
<li>Detect AI-generated abuse, bots, spam, and impersonation attempts</li>
<li>Respond to user support requests and reported content</li>
<li>Send account notices, security alerts, and policy updates</li>
<li>Analyze platform usage in aggregate to improve features and performance</li>
</ul>
<div className="spacer"></div>
<p className="callout">We do not use your data to build advertising profiles. We do not allow external advertisers to target you based on your personal information or behavior on ECCOOZS.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="4-how-we-share-your-information">4. How We Share Your Information<a className="anchor" href="#4-how-we-share-your-information" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p><strong>Service Providers</strong></p>
<div className="spacer"></div>
<p>We share limited data with trusted service providers who help us operate the platform. These providers are contractually prohibited from using your data for any purpose beyond providing their service to us.</p>
<div className="spacer"></div>
<div className="table-wrap"><table>
<thead><tr><th>Provider</th><th>Purpose</th></tr></thead><tbody>
<tr><td>Supabase</td><td>Database hosting, authentication, and real-time platform infrastructure</td></tr>
<tr><td>Stripe</td><td>Subscription payment processing</td></tr>
<tr><td>PayPal</td><td>Commission payouts to Verified members</td></tr>
<tr><td>Shopify</td><td>ECCOOZS Shop order processing and referral commission tracking</td></tr>
<tr><td>FingerprintJS</td><td>Device identification used to enforce account bans</td></tr>
<tr><td>Vercel</td><td>Platform hosting and global content delivery</td></tr>
</tbody></table></div>
<div className="spacer"></div>
<p><strong>Legal Requirements</strong></p>
<div className="spacer"></div>
<p>We may disclose your information when required by law, court order, or governmental authority. We will notify you of such requests when legally permitted to do so.</p>
<div className="spacer"></div>
<p><strong>What We Never Do</strong></p>
<ul>
<li>We never sell your personal data to data brokers, advertisers, or third parties</li>
<li>We never share your private messages with anyone outside ECCOOZS except as required by law</li>
<li>We never allow advertisers to access your profile, browsing behavior, or content</li>
</ul>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="6-data-retention">5. Data Retention<a className="anchor" href="#6-data-retention" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<ul>
<li><strong>Account data</strong> — retained while your account is active, deleted within 30 days of account closure upon request</li>
<li><strong>Content you post</strong> — deleted when you delete it, or within 30 days of account closure</li>
<li><strong>Payment records</strong> — retained for 7 years as required by financial regulations</li>
<li><strong>Moderation records</strong> — retained for up to 3 years to support enforcement decisions</li>
<li><strong>Device fingerprint data for banned accounts</strong> — retained indefinitely to prevent re-registration</li>
</ul>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="7-your-rights-and-choices">6. Your Rights and Choices<a className="anchor" href="#7-your-rights-and-choices" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>Depending on where you live, you may have the following rights regarding your personal data:</p>
<div className="spacer"></div>
<ul>
<li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
<li><strong>Correction</strong> — request correction of inaccurate or incomplete data</li>
<li><strong>Deletion</strong> — request deletion of your account and associated data</li>
<li><strong>Portability</strong> — request your data in a portable format</li>
<li><strong>Objection</strong> — object to certain uses of your data</li>
<li><strong>Withdraw consent</strong> — withdraw consent where processing is based on consent</li>
</ul>
<div className="spacer"></div>
<p>To exercise any of these rights, contact us at privacy@eccoozs.com. We will respond within 30 days.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="8-data-security">7. Data Security<a className="anchor" href="#8-data-security" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>We take the security of your data seriously. ECCOOZS uses the following protections:</p>
<div className="spacer"></div>
<ul>
<li>All data is encrypted in transit using TLS/HTTPS</li>
<li>Passwords are hashed and never stored in plain text</li>
<li>Payment data is processed by PCI-compliant providers — we do not store card numbers</li>
<li>Access to user data is restricted to ECCOOZS staff with a legitimate need</li>
<li>Device identification is used to prevent banned users from re-entering the platform</li>
</ul>
<div className="spacer"></div>
<p>If a data breach occurs that affects your personal information, we will notify affected users within 72 hours of discovery, as required by applicable law.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="9-cookies-and-tracking">8. Cookies and Tracking<a className="anchor" href="#9-cookies-and-tracking" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS uses essential cookies and similar technologies to operate the platform. We do not use advertising cookies or allow third-party trackers to profile your behavior.</p>
<div className="spacer"></div>
<ul>
<li><strong>Session cookies</strong> — keep you logged in during your visit</li>
<li><strong>Preference cookies</strong> — remember your settings and display choices</li>
<li><strong>Security cookies</strong> — protect against unauthorized access and fraud</li>
<li><strong>Analytics</strong> — aggregate, non-personal usage data to improve the platform</li>
</ul>
<div className="spacer"></div>
<p>You can control cookies through your browser settings. Disabling essential cookies may affect your ability to use the platform.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="10-international-users">9. International Users<a className="anchor" href="#10-international-users" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS is operated from the United States. If you access the platform from outside the United States, your data will be transferred to and processed in the United States. By using ECCOOZS, you consent to this transfer.</p>
<div className="spacer"></div>
<p>For users in the European Economic Area (EEA) or United Kingdom, we process your data on the legal bases of contract performance, legitimate interests, and legal obligation. You have the rights outlined in Section 7.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="11-changes-to-this-policy">10. Changes to This Policy<a className="anchor" href="#11-changes-to-this-policy" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>We may update this Privacy Policy as our platform grows. Significant changes will be communicated via email or in-app notification at least 14 days before taking effect.</p>
<div className="spacer"></div>
<p>Continued use of ECCOOZS after changes take effect constitutes your acceptance of the revised policy.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<p className="callout">Privacy questions or data requests:</p>
<p><strong>privacy@eccoozs.com</strong></p>
<div className="spacer"></div>
<p className="callout">Thank you for trusting ECCOOZS — a platform designed to protect, uplift, and genuinely respect its community.</p>
<div className="spacer"></div>

<div className="spacer"></div>
</div>
</main>
<div className="contact-band">
<p>Questions or concerns about this page?</p>
<a href="mailto:privacy@eccoozs.com">privacy@eccoozs.com</a>
</div>
    </LegalPageShell>
  );
}
