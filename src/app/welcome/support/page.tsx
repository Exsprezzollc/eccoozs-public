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
  title: "ECCOOZS — Community Support",
};

export default function SupportPage() {
  return (
    <LegalPageShell styles={legalStyles}>
<section className="page-hero">
<img className="hero-mark" src="/images/support-17.png" alt="" />
<div className="page-hero-inner">
<div className="page-eyebrow">ECCOOZS Legal &amp; Community</div>
<h1>Community Support</h1>
<p className="page-hero-sub">Real Help. Real People. Real Protection.</p>
<div className="page-hero-meta">
<span className="meta-tag">© 2026 ECCOOZS LLC</span>
<span className="meta-tag">All Rights Reserved</span>
<span className="meta-tag">support@eccoozs.com</span>
</div>
</div>
</section>
<main>
<div className="content-wrap">
<div className="spacer"></div>
<p><strong>Real Help. Real People. Real Protection.</strong></p>
<div className="spacer"></div>
<p>Whether you're a new user, a longtime creator, or just passing through — you're not alone here. At ECCOOZS, support is more than a help desk. It's a protected space for truth-seekers, creators, and community members to feel seen, heard, and guided.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<div className="toc" aria-label="On this page"><div className="toc-title">On this page</div><ol><li><a href="#were-here-to-help-with">We're Here to Help With:</a></li><li><a href="#who-answers-you">Who Answers You</a></li><li><a href="#special-protection-programs">Special Protection Programs</a></li><li><a href="#contact-directory">Contact Directory</a></li></ol></div>
<h2 id="were-here-to-help-with">We're Here to Help With:<a className="anchor" href="#were-here-to-help-with" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<ul>
<li>Account and login issues</li>
<li>Soundrooms and live session support</li>
<li>Subscription and billing questions</li>
<li>Reporting violations or unsafe behavior</li>
<li>Creator tools and referral commissions</li>
</ul>
<div className="spacer"></div>
<p>[View All FAQs →]</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="who-answers-you">Who Answers You<a className="anchor" href="#who-answers-you" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p><strong>A real human support lead</strong> — trained in ECCOOZS values reviews your request. For sensitive matters, you will always receive a human response.</p>
<div className="spacer"></div>
<p><strong>AI-assisted triage</strong> — routine requests are sorted by AI to get you to the right place faster. No AI closes your ticket — a human always reviews the outcome.</p>
<div className="spacer"></div>
<p className="callout">We are building Nia — a purpose-driven AI support assistant. Her name means "purpose" in Swahili. She is coming soon.</p>
<div className="spacer"></div>
<p><strong>Core Admin escalation</strong> — serious or sensitive cases, including safety threats, account compromise, or creator abuse, are escalated directly to Core Admins for review.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="special-protection-programs">Special Protection Programs<a className="anchor" href="#special-protection-programs" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p><strong>⭐ Creator Integrity Shield — Verified &amp; Certified Members</strong></p>
<p>Verified and Certified creators who believe their content is being systematically attacked, falsely reported, or cloned without permission can submit a Creator Integrity request. Our moderation team will review the pattern of activity and take appropriate action.</p>
<div className="spacer"></div>
<p className="callout">This is not a guarantee of outcome — it is a guarantee of review.</p>
<div className="spacer"></div>
<p>Contact: support@eccoozs.com | Subject: <strong>Creator Integrity</strong></p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<p><strong>🔒 Emergency Security Response</strong></p>
<p>In situations involving doxing, stalking, account compromise, or coordinated harassment, contact our security team directly for priority response. Our team will assess the situation and apply appropriate technical and moderation measures.</p>
<div className="spacer"></div>
<p>Contact: security@eccoozs.com | Subject: <strong>EMERGENCY</strong></p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="contact-directory">Contact Directory<a className="anchor" href="#contact-directory" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<div className="table-wrap"><table>
<thead><tr><th>Request Type</th><th>Contact</th></tr></thead><tbody>
<tr><td>General Support</td><td>support@eccoozs.com</td></tr>
<tr><td>Privacy &amp; Data Requests</td><td>privacy@eccoozs.com</td></tr>
<tr><td>Legal &amp; Terms</td><td>legal@eccoozs.com</td></tr>
<tr><td>Emergency / Security</td><td>security@eccoozs.com — Subject: EMERGENCY</td></tr>
<tr><td>Creator Integrity</td><td>support@eccoozs.com — Subject: Creator Integrity</td></tr>
</tbody></table></div>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<p className="callout">You are not just a user here. You are a member of something that was built with you in mind.</p>
<div className="spacer"></div>
<p><strong>Welcome home.</strong></p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>

<div className="spacer"></div>
</div>
</main>
<div className="contact-band">
<p>Questions or concerns about this page?</p>
<a href="mailto:support@eccoozs.com">support@eccoozs.com</a>
</div>
    </LegalPageShell>
  );
}
