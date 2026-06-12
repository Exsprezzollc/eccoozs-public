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
  title: "ECCOOZS — Code of Conduct",
};

export default function ConductPage() {
  return (
    <LegalPageShell styles={legalStyles}>
<section className="page-hero">
<img className="hero-mark" src="/images/support-17.png" alt="" />
<div className="page-hero-inner">
<div className="page-eyebrow">ECCOOZS Legal &amp; Community</div>
<h1>Code of Conduct</h1>
<p className="page-hero-sub">The standard. The expectation. The community.</p>
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
<p className="callout">Welcome to ECCOOZS. This isn't just a platform — it's a protected space.</p>
<div className="spacer"></div>
<p>This Code of Conduct outlines the behavior, boundaries, and expectations for all users. By joining ECCOOZS, you agree to uphold the integrity of this space or quietly leave it.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<div className="toc" aria-label="On this page"><div className="toc-title">On this page</div><ol><li><a href="#respect-the-community">Respect the Community</a></li><li><a href="#zero-tolerance-for-disrespect">Zero Tolerance for Disrespect</a></li><li><a href="#no-outside-propaganda">No Outside Propaganda</a></li><li><a href="#zero-troll-zone">Zero Troll Zone</a></li><li><a href="#verified-certified-standards">Verified + Certified Standards</a></li><li><a href="#spiritual-standards">Spiritual Standards</a></li><li><a href="#enforcement-protocol">Enforcement Protocol</a></li><li><a href="#final-word">Final Word</a></li></ol></div>
<h2 id="respect-the-community">Respect the Community<a className="anchor" href="#respect-the-community" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>Mocking, disruption, or violation of the cultural clarity of Foundational Black Americans (FBA) is not tolerated. Debates regarding FBA lineage, language, or experience should be kept at a minimum.</p>
<div className="spacer"></div>
<p>This is not a space for "diversity of thought" when that thought erases truth. Our history is well documented. We advise you to do your research.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="zero-tolerance-for-disrespect">Zero Tolerance for Disrespect<a className="anchor" href="#zero-tolerance-for-disrespect" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>The following will result in immediate warning, restriction, or removal:</p>
<div className="spacer"></div>
<ul>
<li>Disrespecting the Most High, Christ, or the Holy Spirit — we respect freedom of religion, but this space honors the sacred</li>
<li>Using profanity in connection with sacred names</li>
<li>Posting vulgar, sexual, or degenerate content of any kind</li>
<li>Harassing, impersonating, or mocking other users</li>
<li>Using ECCOOZS to push agendas that conflict with the moral and spiritual standards of this space</li>
</ul>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="no-outside-propaganda">No Outside Propaganda<a className="anchor" href="#no-outside-propaganda" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS is not for trending talking points, performative activism, or culture-hopping. Do not push political parties, celebrity drama, gender theory, or anti-Black policies under the guise of "conversation."</p>
<div className="spacer"></div>
<p className="callout">We know the difference between engagement and infiltration.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="zero-troll-zone">Zero Troll Zone<a className="anchor" href="#zero-troll-zone" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS does not reward shock value. We do not tolerate clout-chasing, trolling, or false flagging.</p>
<div className="spacer"></div>
<p className="callout">If your goal is to disrupt, you won't get attention — you'll get erased.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="verified-certified-standards">Verified + Certified Standards<a className="anchor" href="#verified-certified-standards" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>ECCOOZS recognizes two levels of elevated membership. Both carry elevated responsibility.</p>
<div className="spacer"></div>
<ul>
<li><strong>Certified members</strong> (Gold badge, $9.99/mo) — expected to lead by example in every room, post, and interaction. Conduct violations result in demotion before suspension.</li>
<li><strong>Verified members</strong> (Blue badge, $14.99/mo) — held to the highest standard on the platform. Repeated violations will result in immediate demotion and review. There is no grace period for abusing a trusted status.</li>
</ul>
<div className="spacer"></div>
<p>Elevation is earned. It can be removed. The platform mission is never negotiable regardless of your subscription tier.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="spiritual-standards">Spiritual Standards<a className="anchor" href="#spiritual-standards" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p>This platform was built on spiritual discernment, not algorithmic chaos. You will feel the difference.</p>
<div className="spacer"></div>
<p>And if your spirit is not aligned — you will feel the pressure to leave. No need to announce it. Just log out.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="enforcement-protocol">Enforcement Protocol<a className="anchor" href="#enforcement-protocol" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<div className="table-wrap"><table>
<thead><tr><th></th><th>Violation Level</th><th>Consequence</th></tr></thead><tbody>
<tr><td>⚠️</td><td>Minor — 1st Offense</td><td>Silent warning or shadow restriction without notification</td></tr>
<tr><td>⛔</td><td>Medium — 2nd Offense</td><td>Temporary account freeze or content removal. User notified.</td></tr>
<tr><td>🚫</td><td>Severe — 3rd Offense or Major Breach</td><td>Permanent account ban. Technical measures including IP restrictions and device identification applied to prevent re-entry.</td></tr>
</tbody></table></div>
<div className="spacer"></div>
<p className="callout">ECCOOZS reserves the right to remove any user or content at any time to protect the spirit and integrity of the platform. No further notice is required.</p>
<div className="spacer"></div>
<hr className="section-rule" />
<div className="spacer"></div>
<h2 id="final-word">Final Word<a className="anchor" href="#final-word" aria-label="Link to section">#</a></h2>
<div className="spacer"></div>
<p><strong>Standards. Tradition. Expectations.</strong></p>
<div className="spacer"></div>
<p>This isn't other social media platforms. This is ECCOOZS.</p>
<div className="spacer"></div>
<p>We do not cater to chaos.</p>
<p>We do not dilute truth for clicks.</p>
<p>We do not care about follower counts if the spirit is rotten.</p>
<div className="spacer"></div>
<p>If that bothers you, this space isn't for you.</p>
<p>If it protects you — <strong>welcome home.</strong></p>
<div className="spacer"></div>
<hr className="section-rule" />
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
