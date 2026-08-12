import type { ReactNode } from "react";

const patchScript = String.raw`
(function () {
  function patchWelcome() {
    // Point the old standalone-file URLs at the working cloud app routes.
    document.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href === '/apps/math-trail.html' || href === 'apps/math-trail.html' || href === 'math-trail.html') {
        a.setAttribute('href', '/apps/math-trail');
        a.removeAttribute('download');
      }
      if (href === '/apps/my-voice-journey.html' || href === 'apps/my-voice-journey.html' || href === 'my-voice-journey.html') {
        a.setAttribute('href', '/apps/my-voice-journey');
        a.removeAttribute('download');
      }
    });

    // Make every visible House of ECCOOZS entry point lead to the Coming Soon page.
    document.querySelectorAll('a').forEach(function (a) {
      var text = (a.textContent || '').trim().toLowerCase();
      if (text.indexOf('house of eccoozs') !== -1) {
        a.setAttribute('href', '/house-of-eccoozs');
      }
    });

    document.querySelectorAll('.feature-card').forEach(function (card) {
      var title = card.querySelector('.feature-title');
      if (!title || (title.textContent || '').trim() !== 'House of ECCOOZS') return;
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.style.cursor = 'pointer';
      card.setAttribute('aria-label', 'House of ECCOOZS — Coming Soon');
      var copy = card.querySelector('.feature-copy');
      if (copy && !card.querySelector('[data-house-coming-soon]')) {
        var soon = document.createElement('div');
        soon.setAttribute('data-house-coming-soon', 'true');
        soon.textContent = 'Coming Soon →';
        soon.style.cssText = 'margin-top:14px;font-size:.74rem;font-weight:800;color:#1f47e0;';
        copy.insertAdjacentElement('afterend', soon);
      }
      function go() { window.location.href = '/house-of-eccoozs'; }
      card.addEventListener('click', go);
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });

    // Make the House business panel an intentional Coming Soon entry point too.
    document.querySelectorAll('.business-card').forEach(function (card) {
      var heading = card.querySelector('h3');
      if (!heading || (heading.textContent || '').trim() !== 'House of ECCOOZS') return;
      if (!card.querySelector('[data-house-panel-link]')) {
        var link = document.createElement('a');
        link.setAttribute('data-house-panel-link', 'true');
        link.href = '/house-of-eccoozs';
        link.textContent = 'Coming Soon →';
        link.style.cssText = 'display:inline-block;margin-top:16px;color:#8fa8ff;font-size:.78rem;font-weight:800;';
        card.appendChild(link);
      }
    });

    // Use the requested footer labels while preserving the existing legal/support routes.
    document.querySelectorAll('footer a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === '/conduct') a.textContent = 'Community Guidelines';
      if (href === '/support') a.textContent = 'Contact Us';
    });

    // Add the approved Inventors & Innovators grid below the existing legacy cards.
    var legacy = document.querySelector('#legacy .section-inner');
    if (legacy && !document.getElementById('legacy-inventors-grid')) {
      var figure = document.createElement('figure');
      figure.id = 'legacy-inventors-grid';
      figure.style.cssText = 'margin:18px 0 0;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:#09152e;position:relative;';
      figure.innerHTML = '<img src="/welcome-images/landing-16-v3.png" alt="Inventors and Innovators — Black American scientists, engineers and pioneers" style="display:block;width:100%;height:auto;"/><figcaption style="padding:13px 16px 15px;color:rgba(255,255,255,.55);font-size:.72rem;line-height:1.5;"><strong style="display:block;color:#fff;font-size:.76rem;letter-spacing:.09em;text-transform:uppercase;margin-bottom:3px;">Inventors &amp; Innovators</strong>FBA scientists, engineers and pioneers whose brilliance shaped the modern world — often uncredited, never forgotten.</figcaption>';
      var note = legacy.querySelector('.legacy-note');
      if (note) legacy.insertBefore(figure, note); else legacy.appendChild(figure);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', patchWelcome);
  else patchWelcome();
})();
`;

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <script dangerouslySetInnerHTML={{ __html: patchScript }} />
    </>
  );
}
