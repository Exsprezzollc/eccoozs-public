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
 



/* Membership badge images */
.badge-cell{
  display:flex;
  align-items:center;
  gap:.75rem;
  min-width:160px;
}
.membership-badge{
  width:34px;
  height:34px;
  object-fit:contain;
  flex-shrink:0;
  display:block;
  filter:drop-shadow(0 4px 9px rgba(7,18,64,.12));
}
.badge-name{
  display:flex;
  flex-direction:column;
  gap:.05rem;
  line-height:1.25;
}
.badge-name strong{
  font-size:.9rem;
  color:var(--td);
}
.badge-name span{
  font-size:.78rem;
  color:var(--tmut);
}
@media(max-width:640px){
  .badge-cell{min-width:135px;gap:.6rem;}
  .membership-badge{width:30px;height:30px;}
}

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
  title: "ECCOOZS — Terms of Service",
};

export default function TermsPage() {
  return (
    <LegalPageShell styles={legalStyles}>
<section className="page-hero">
<img className="hero-mark" src="/images/support-17.png" alt="" />
<div className="page-hero-inner">
<div className="page-eyebrow">ECCOOZS Legal &amp; Community</div>
<h1>Terms of Service</h1>
<p className="page-hero-sub">Effective June 2026 · Version 2.0</p>
<div className="page-hero-meta">
<span className="meta-tag">© 2026 ECCOOZS LLC</span>
<span className="meta-tag">All Rights Reserved</span>
<span className="meta-tag">legal@eccoozs.com</span>
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
<p className="callout">Welcome to ECCOOZS — a platform dedicated to uplifting truth, protecting cultural integrity, and empowering creators who lead with purpose. By accessing or using ECCOOZS, you agree to these Terms of Service. Please read them carefully. If you do not agree, do not use the platform.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<div className="toc" aria-label="On this page"><div className="toc-title">On this page</div><ol><li><a href="#1-acceptance-of-terms">1. Acceptance of Terms</a></li><li><a href="#2-eligibility-and-age-requirements">2. Eligibility and Age Requirements</a></li><li><a href="#3-account-responsibilities">3. Account Responsibilities</a></li><li><a href="#4-content-ownership-and-license">4. Content Ownership and License</a></li><li><a href="#5-prohibited-content-and-conduct">5. Prohibited Content and Conduct</a></li><li><a href="#6-moderation-and-enforcement">6. Moderation and Enforcement</a></li><li><a href="#7-content-visibility-controls">7. Content Visibility Controls</a></li><li><a href="#8-ai-generated-content">8. AI-Generated Content</a></li><li><a href="#9-verified-and-certified-membership">9. Verified and Certified Membership</a></li><li><a href="#10-shop-and-commission-program">10. Shop and Commission Program</a></li><li><a href="#12-account-termination-and-technical-enforcement">11. Account Termination and Technical Enforcement</a></li><li><a href="#13-third-party-links-and-services">12. Third-Party Links and Services</a></li><li><a href="#14-disclaimers-and-limitation-of-liability">13. Disclaimers and Limitation of Liability</a></li><li><a href="#15-changes-to-these-terms">14. Changes to These Terms</a></li></ol></div>
<h2 id="1-acceptance-of-terms">1. Acceptance of Terms<a className="anchor" href="#1-acceptance-of-terms" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>By creating an account, browsing content, or using any ECCOOZS feature, you agree to be bound by these Terms, our Privacy Policy, and our Community Guidelines. These documents collectively form the complete agreement between you and ECCOOZS.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="2-eligibility-and-age-requirements">2. Eligibility and Age Requirements<a className="anchor" href="#2-eligibility-and-age-requirements" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS is an 18+ platform. You must be at least 18 years old to create an account or use the platform.</p>
<div className="spacer"></div>
<p>By creating an account, you represent and warrant that you are 18 years of age or older. We do not knowingly permit accounts for anyone under 18. Any account found to belong to a user under 18 will be deactivated upon discovery.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="3-account-responsibilities">3. Account Responsibilities<a className="anchor" href="#3-account-responsibilities" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify ECCOOZS immediately at legal@eccoozs.com of any unauthorized access or security breach. ECCOOZS cannot be held liable for losses resulting from unauthorized use of your account.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="4-content-ownership-and-license">4. Content Ownership and License<a className="anchor" href="#4-content-ownership-and-license" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>You retain full ownership of all original content you create and post on ECCOOZS. By posting content, you grant ECCOOZS a non-exclusive, royalty-free, worldwide license to display, distribute, and promote your content within the platform and in marketing materials that showcase the ECCOOZS community.</p>
<div className="spacer"></div>
<p>This license ends when you delete your content or close your account, except where retention is required by law or for legitimate business purposes such as active legal disputes or fraud investigations.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="5-prohibited-content-and-conduct">5. Prohibited Content and Conduct<a className="anchor" href="#5-prohibited-content-and-conduct" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>You agree not to post, share, or engage in the following:</p>
<div className="spacer"></div>
<ul>
<li>Nudity, sexual content, or sexually suggestive material of any kind involving minors</li>
<li>Hate speech, threats, or content that incites violence against any person or group</li>
<li>Harassment, doxxing, impersonation, or invasion of another user's privacy</li>
<li>Content that disrespects religious beliefs, cultural practices, or historical truth</li>
<li>Spam, scams, phishing, or deceptive practices of any kind</li>
<li>Unauthorized commercial activity, solicitation, or promotion</li>
<li>AI-generated content presented as authentic human content without disclosure</li>
<li>Content designed to destabilize, infiltrate, or undermine the culture and mission of ECCOOZS</li>
</ul>
<div className="spacer"></div>
<p>ECCOOZS reserves the right to remove prohibited content and take appropriate enforcement action, including account suspension or permanent termination, at its sole discretion.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="6-moderation-and-enforcement">6. Moderation and Enforcement<a className="anchor" href="#6-moderation-and-enforcement" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS uses a tiered enforcement model. Severe violations may bypass lower tiers and result in immediate termination.</p>
<div className="spacer"></div>
<div className="table-wrap"><table>
<thead><tr><th></th><th>Violation Level</th><th>Consequence</th></tr></thead><tbody>
<tr><td>⚠️</td><td>Minor — 1st Offense</td><td>Silent warning or content restriction without notification</td></tr>
<tr><td>⛔</td><td>Medium — 2nd Offense</td><td>Temporary account freeze and content removal. User notified.</td></tr>
<tr><td>🚫</td><td>Severe — 3rd Offense or Major Breach</td><td>Permanent account ban. Technical measures applied to prevent re-entry.</td></tr>
</tbody></table></div>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="7-content-visibility-controls">7. Content Visibility Controls<a className="anchor" href="#7-content-visibility-controls" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>To maintain platform integrity, ECCOOZS may limit the visibility of content or accounts that violate our standards. Visibility restrictions may include:</p>
<div className="spacer"></div>
<ul>
<li><strong>Soft Silence</strong> — Content is hidden from other users but remains visible to the account holder</li>
<li><strong>Delay Drop</strong> — Content visibility is delayed to allow moderation review</li>
<li><strong>Echo Chamber</strong> — Content is shown only to the posting user</li>
</ul>
<div className="spacer"></div>
<p>All moderation actions are logged internally and may be reviewed upon written request to legal@eccoozs.com.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="8-ai-generated-content">8. AI-Generated Content<a className="anchor" href="#8-ai-generated-content" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>AI-generated content must be clearly labeled as such at the time of posting. Using AI to create deceptive, harmful, or misleading content is strictly prohibited. ECCOOZS reserves the right to remove unlabeled AI content and take enforcement action against accounts that repeatedly misuse AI tools.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="9-verified-and-certified-membership">9. Verified and Certified Membership<a className="anchor" href="#9-verified-and-certified-membership" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS offers two paid membership tiers that grant elevated platform status:</p>
<div className="spacer"></div>
<div className="table-wrap"><table>
<thead><tr><th>Tier</th><th>Badge</th><th>Price</th><th>Key Benefits</th></tr></thead><tbody>
<tr>
<td>Certified</td>
<td>
<div className="badge-cell">
<img
  className="membership-badge"
  src="/brand/badges/eccoozs-certified-gold.png"
  alt="ECCOOZS Certified Gold Badge"
/>
<div className="badge-name"><strong>Gold</strong><span>Certified Badge</span></div>
</div>
</td>
<td>$9.99/mo</td>
<td>Host soundrooms, go live, creator monetization tools, advanced analytics, priority in Explore feed</td>
</tr>
<tr>
<td>Verified</td>
<td>
<div className="badge-cell">
<img
  className="membership-badge"
  src="/brand/badges/eccoozs-verified-blue.png"
  alt="ECCOOZS Verified Blue Badge"
/>
<div className="badge-name"><strong>Blue</strong><span>Verified Badge</span></div>
</div>
</td>
<td>$14.99/mo</td>
<td>All Certified benefits + merch shelf on profile, 15% shop referral commission, ad revenue sharing at platform scale, early feature access</td>
</tr>
</tbody></table></div>
<div className="spacer"></div>
<p>ECCOOZS reserves the right to revoke Verified or Certified status at any time for conduct violations. Subscription fees are non-refundable for the current billing period. Subscriptions renew monthly until cancelled.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="10-shop-and-commission-program">10. Shop and Commission Program<a className="anchor" href="#10-shop-and-commission-program" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>Verified members ($14.99/mo) are eligible to participate in the ECCOOZS Shop referral commission program. Members receive a unique referral link. When a purchase is made through that link, the member earns 15% commission on the net sale price.</p>
<div className="spacer"></div>
<p>Commission payouts are processed monthly via PayPal or bank transfer. A minimum balance of $20.00 is required before payout. ECCOOZS reserves the right to withhold commissions in cases of fraud, policy violations, or suspicious referral activity. Participation in the commission program is not guaranteed and may be revoked for cause.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="12-account-termination-and-technical-enforcement">11. Account Termination and Technical Enforcement<a className="anchor" href="#12-account-termination-and-technical-enforcement" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS reserves the right to suspend or permanently terminate any account that violates these Terms, poses a risk to platform integrity, or engages in conduct that contradicts the cultural mission of ECCOOZS.</p>
<div className="spacer"></div>
<p>Severe violations may result in permanent account termination. ECCOOZS employs technical measures including IP address restrictions and device identification to prevent banned users from creating new accounts. These measures are applied at our discretion for serious or repeated violations.</p>
<div className="spacer"></div>
<p>Users may terminate their own accounts at any time through account settings. Data deletion requests may be submitted to legal@eccoozs.com.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="13-third-party-links-and-services">12. Third-Party Links and Services<a className="anchor" href="#13-third-party-links-and-services" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS integrates with third-party services including Supabase (data infrastructure), Stripe and PayPal (payments), and Shopify (shop). We are not responsible for the privacy practices, content, or conduct of third-party services. Your use of any third-party service is governed by that service's own terms and policies.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="14-disclaimers-and-limitation-of-liability">13. Disclaimers and Limitation of Liability<a className="anchor" href="#14-disclaimers-and-limitation-of-liability" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS provides the platform "as is" and "as available" without warranties of any kind, expressed or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of harmful components. To the maximum extent permitted by law, ECCOOZS is not liable for any indirect, incidental, or consequential damages resulting from your use of the platform.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="15-changes-to-these-terms">14. Changes to These Terms<a className="anchor" href="#15-changes-to-these-terms" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS may update these Terms as the platform evolves. Significant changes will be communicated to users via email or in-app notification at least 14 days before taking effect. Continued use of ECCOOZS after changes take effect constitutes acceptance of the revised Terms.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<p className="callout">Questions regarding these Terms:</p>
<p><strong>legal@eccoozs.com</strong></p>
<div className="spacer"></div>

<div className="spacer"></div>
</div>
</main>
<div className="contact-band">
<p>Questions or concerns about this page?</p>
<a href="mailto:legal@eccoozs.com">legal@eccoozs.com</a>
</div>
    </LegalPageShell>
  );
}
