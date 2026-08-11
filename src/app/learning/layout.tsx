import type { ReactNode } from "react";

const patchScript = String.raw`
(function () {
  function patchLearning() {
    document.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href === '/apps/math-trail.html') {
        a.setAttribute('href', '/apps/math-trail');
        a.removeAttribute('download');
        if ((a.textContent || '').toLowerCase().indexOf('download') !== -1) a.textContent = 'Open Math Trail';
      }
      if (href === '/apps/my-voice-journey.html') {
        a.setAttribute('href', '/apps/my-voice-journey');
        a.removeAttribute('download');
        if ((a.textContent || '').toLowerCase().indexOf('download') !== -1) a.textContent = 'Open My Voice Journey';
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', patchLearning);
  else patchLearning();
})();
`;

export default function LearningLayout({ children }: { children: ReactNode }) {
  return <>{children}<script dangerouslySetInnerHTML={{__html:patchScript}} /></>;
}
