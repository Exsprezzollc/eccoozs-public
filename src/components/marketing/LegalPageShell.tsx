import type { ReactNode } from "react";
import HeaderLogo from "@/components/brand/HeaderLogo";

const legalHeaderOverrides = String.raw`
.legal-site nav{height:58px;padding:0 4%;gap:1.15rem}
.legal-site .nav-brand{flex:0 0 auto;min-width:168px;letter-spacing:0;text-transform:none}
.legal-site .legal-header-logo{display:block;height:auto;max-width:168px}
.legal-site .nav-brand-sub{display:none!important}
.legal-site .legal-nav-links{gap:1.05rem}
.legal-site .legal-nav-links a{font-size:.78rem;white-space:nowrap}
.legal-site .nav-back{font-size:.78rem;white-space:nowrap}
@media(max-width:900px){
  .legal-site nav{padding:0 3%;gap:.85rem}
  .legal-site .nav-brand{min-width:150px}
  .legal-site .legal-header-logo{max-width:150px}
  .legal-site .legal-nav-links{gap:.75rem}
  .legal-site .legal-nav-links a,.legal-site .nav-back{font-size:.72rem}
}
@media(max-width:720px){
  .legal-site .legal-nav-links{display:none}
  .legal-site .nav-back{font-size:.76rem}
}
`;

export function LegalPageShell({
  children,
  styles,
}: {
  children: ReactNode;
  styles: string;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <style dangerouslySetInnerHTML={{ __html: legalHeaderOverrides }} />
      <div className="legal-site">
        <nav>
          <a className="nav-brand" href="/welcome" aria-label="ECCOOZS welcome">
            <HeaderLogo width={168} className="legal-header-logo" />
          </a>

          <div className="legal-nav-links" aria-label="Legal navigation">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/conduct">Conduct</a>
            <a href="/support">Support</a>
          </div>

          <a className="nav-back" href="/welcome">← Back to Welcome</a>
        </nav>

        {children}

        <footer className="page-footer">
          <span className="footer-brand">ECCOOZS</span>
          <p>Express. Explore. Elevate.</p>
          <p style={{ marginTop: ".6rem" }}>
            <a href="/terms">Terms</a> &nbsp;·&nbsp; <a href="/privacy">Privacy</a> &nbsp;·&nbsp;{" "}
            <a href="/conduct">Conduct</a> &nbsp;·&nbsp; <a href="/support">Support</a> &nbsp;·&nbsp;{" "}
            <a href="/welcome">Welcome</a>
          </p>
          <p style={{ marginTop: "1rem" }}>© 2026 ECCOOZS LLC. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
