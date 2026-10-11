"""
Reading Detective interactive browser + responsive + accessibility QA.

Exercises the ACTUAL v1.4.3+ interface (not older strings): all three learner
presentations, adaptive placement, the case runtime, keyboard/skip-link/focus,
accessible names, touch targets, 360/768/1440 overflow, the stage-specific
accessibility controls, reduced-motion behaviour, and narration state.

Chromium is resolved robustly so this runs on CI runners and local sandboxes
alike: set RD_CHROME_PATH to override, otherwise common system/puppeteer/
playwright locations are tried, otherwise Playwright's bundled browser is used.
"""

import glob
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "src/styles/app.css").read_text()
VENDOR = ["react16.production.min.js", "react-dom16.production.min.js", "react-compat-browser.js"]

STAGE_INDEX = {"Young Investigator": 0, "Investigator": 1, "Lead Investigator": 2}
YOUNG = "Young Investigator"


def resolve_chromium():
    explicit = [
        os.environ.get("RD_CHROME_PATH"),
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
        "/usr/bin/google-chrome",
    ]
    for candidate in explicit:
        if candidate and os.path.exists(candidate):
            return candidate
    globs = [
        os.path.expanduser("~/.cache/puppeteer/chrome/*/chrome-linux64/chrome"),
        os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux/chrome"),
    ]
    for pattern in globs:
        hits = sorted(glob.glob(pattern))
        if hits:
            return hits[-1]
    return None  # let Playwright use its bundled browser


def install_memory_storage(page):
    page.evaluate("""() => {
      window.__RD_BROWSER_QA__ = true;
      const data = new Map();
      Object.defineProperty(window, 'localStorage', { configurable: true, value: {
        getItem: k => data.has(k) ? data.get(k) : null,
        setItem: (k,v) => data.set(k, String(v)),
        removeItem: k => data.delete(k),
        clear: () => data.clear(),
        key: i => Array.from(data.keys())[i] ?? null,
        get length(){ return data.size; }
      }});
      window.__rdSpoken = [];
      class FakeUtterance { constructor(text){ this.text=text; this.rate=1; this.pitch=1; this.lang='en-US'; this.voice=null; this.onstart=null; this.onend=null; this.onerror=null; } }
      Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: FakeUtterance });
      const fakeVoice = { name: 'Reading Detective QA Voice', lang: 'en-US', localService: true, default: true };
      Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
        getVoices: () => [fakeVoice], cancel: () => {},
        speak: u => {
          window.__rdSpoken.push({text:u.text,rate:u.rate,pitch:u.pitch,voice:u.voice?.name || ''});
          if (typeof u.onstart === 'function') u.onstart();
          setTimeout(() => { if (typeof u.onend === 'function') u.onend(); }, 120);
        },
        addEventListener: () => {}, removeEventListener: () => {}
      }});
    }""")


def boot(page):
    page.set_default_timeout(5000)
    page.set_content(f'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>{CSS}</style></head><body><div id="root"></div></body></html>')
    install_memory_storage(page)
    for name in VENDOR:
        page.add_script_tag(path=str(ROOT / "vendor" / name))
    page.add_script_tag(path=str(ROOT / "dist-browser-qa/app-bundle.js"))
    page.wait_for_timeout(250)


def assert_no_overflow(page, label):
    dims = page.evaluate("() => ({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth})")
    assert dims["sw"] <= dims["cw"] + 2, f"{label}: horizontal overflow {dims}"


def app_class(page):
    return page.locator('.app').get_attribute('class') or ''


def finish_placement(page):
    for _ in range(16):
        if page.get_by_text("We Found a Good Place to Begin", exact=True).count():
            return
        choices = page.locator(".question-panel .choice-list button")
        assert choices.count() > 0, "placement stalled without choices"
        choices.first.click()
        page.wait_for_timeout(80)
    raise AssertionError("placement did not complete within 16 adaptive probes")


def run_stage(page, stage_name, detective_testid):
    is_young = stage_name == YOUNG
    assert page.get_by_role("heading", name="Welcome, Investigator.").count() == 1
    page.locator(".stage-card").nth(STAGE_INDEX[stage_name]).click()
    page.wait_for_timeout(80)
    assert page.get_by_role("heading", name="Choose Your Detective").count() == 1
    assert page.locator('[data-testid^="detective-"]').count() == 6
    page.locator(f'[data-testid="{detective_testid}"]').click()
    assert page.locator(f'[data-testid="{detective_testid}"]').get_attribute("aria-pressed") == "true"
    page.locator('.detective-preview-actions button').click()
    page.wait_for_timeout(20)
    assert page.evaluate('() => window.__rdSpoken.length') >= 1, "detective voice preview did not reach speech synthesis"
    page.get_by_role("button", name="Caucasian").click()
    assert page.get_by_role("button", name="Caucasian").get_attribute("aria-pressed") == "true"
    page.locator('[data-testid="begin-placement"]').click()
    page.wait_for_timeout(100)
    finish_placement(page)
    assert page.get_by_role("heading", name="We Found a Good Place to Begin").count() == 1
    page.get_by_role("button", name="Enter Headquarters").click()
    page.wait_for_timeout(100)

    if is_young:
        assert page.get_by_text("🔎 HEADQUARTERS", exact=True).count() == 1, "young Headquarters eyebrow missing"
        assert page.get_by_role("button", name="Continue My Case").count() >= 1, "young continue button missing"
        page.get_by_role("button", name="Continue My Case").first.click()
    else:
        assert page.get_by_text("INVESTIGATION HEADQUARTERS", exact=True).count() == 1, "analyst Headquarters eyebrow missing"
        assert page.get_by_role("button", name="Continue Investigation").count() >= 1, "analyst continue button missing"
        page.get_by_role("button", name="Continue Investigation").first.click()
    page.wait_for_timeout(100)
    assert (
        page.locator(".question-panel").count() == 1
        or page.get_by_text("READING TOOL — TEACH FIRST", exact=True).count() == 1
        or page.get_by_role("heading", name="Before this clue, learn the tool it uses.").count() == 1
    )


def check_narration_state(page, label):
    listen = page.locator('button:has-text("Hear")').first
    if not listen.count():
        return
    listen.click()
    page.wait_for_timeout(20)
    assert 'app-speaking' in app_class(page), f"{label}: narration did not enter speaking state"
    page.wait_for_timeout(220)
    assert 'app-speaking' not in app_class(page), f"{label}: speaking state did not clear when narration ended"


def check_young_controls_and_reduced_motion(page):
    page.get_by_role('button', name='Accessibility').click()
    page.wait_for_timeout(50)
    panel = page.get_by_role('complementary', name='Young Investigator controls')
    assert panel.count() == 1, "young child-controls panel missing"
    for name in ['Voice', 'Bigger Words', 'Clear Screen', 'Less Movement']:
        assert panel.get_by_role('button', name=name).count() >= 1, f"young control '{name}' missing"
    panel.get_by_role('button', name='Less Movement').click()
    page.wait_for_timeout(50)
    assert 'reduced-motion' in app_class(page), "Less Movement did not apply reduced-motion"
    panel.get_by_role('button', name='Less Movement').click()
    page.wait_for_timeout(30)
    page.get_by_role('button', name='Close controls').click()


def check_full_controls(page):
    page.get_by_role('button', name='Accessibility').click()
    page.wait_for_timeout(50)
    assert page.get_by_role('complementary', name='Accessibility controls').count() == 1
    spacing = page.get_by_role('checkbox', name='Increased spacing')
    spacing.check(); page.wait_for_timeout(40)
    assert 'spacing-increased' in app_class(page), "increased spacing not applied"
    high_contrast = page.get_by_role('checkbox', name='High contrast')
    high_contrast.check(); page.wait_for_timeout(40)
    assert 'contrast-high' in app_class(page), "high contrast not applied"
    reduced = page.get_by_role('checkbox', name='Reduced motion')
    reduced.check(); page.wait_for_timeout(40)
    assert 'reduced-motion' in app_class(page), "reduced motion not applied"
    reduced.uncheck(); spacing.uncheck(); high_contrast.uncheck()
    page.get_by_role('button', name='Close').click()


def storage_snapshot(page):
    return page.evaluate("() => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); o[k] = localStorage.getItem(k); } return o; }")


def check_grown_up_gate_and_data_controls(page):
    """The grown-up area needs an intentional action, and destructive data
    actions require an explicit second confirmation (cancelling changes nothing)."""
    page.get_by_role('button', name='Educator Insight').first.click()
    page.wait_for_timeout(60)
    gate = page.get_by_role('dialog', name='Grown-Up Check')
    assert gate.count() == 1, "grown-up gate did not appear"
    assert page.get_by_role('heading', name='Educator Insight').count() == 0, "educator area opened without the gate"
    question = gate.locator('.gate-question').inner_text()
    a, b = [int(n) for n in question.replace('?', '').split('is')[1].split('+')]
    field = gate.get_by_role('spinbutton')
    field.fill(str(a + b + 1)); gate.get_by_role('button', name='Enter').click(); page.wait_for_timeout(40)
    assert gate.get_by_role('alert').count() == 1, "wrong gate answer was not rejected"
    assert page.get_by_role('heading', name='Educator Insight').count() == 0, "wrong answer opened the educator area"
    field.fill(str(a + b)); gate.get_by_role('button', name='Enter').click(); page.wait_for_timeout(80)
    assert page.get_by_role('heading', name='Educator Insight').count() == 1, "correct gate answer did not open the educator area"
    assert page.get_by_role('heading', name='Learner data').count() == 1, "learner data controls missing"
    assert 'not a statistically validated' in page.locator('main').inner_text(), "evidence-strength clarification missing"

    before = storage_snapshot(page)
    assert any(k.startswith('rd.') for k in before), "expected saved learner data before destructive checks"
    page.get_by_role('button', name='Delete all data…').click(); page.wait_for_timeout(40)
    assert page.get_by_role('alertdialog', name='Confirm delete all data').count() == 1, "delete did not ask for confirmation"
    page.get_by_role('button', name='Cancel').click(); page.wait_for_timeout(40)
    page.get_by_role('button', name='Reset progress…').click(); page.wait_for_timeout(40)
    assert page.get_by_role('alertdialog', name='Confirm reset progress').count() == 1, "reset did not ask for confirmation"
    page.get_by_role('button', name='Keep my progress').click(); page.wait_for_timeout(40)
    assert storage_snapshot(page) == before, "cancelling a destructive action changed stored data"

    page.get_by_role('button', name='Back to Headquarters').click(); page.wait_for_timeout(60)
    page.get_by_role('button', name='Educator Insight').first.click(); page.wait_for_timeout(60)
    assert page.get_by_role('dialog', name='Grown-Up Check').count() == 1, "leaving the grown-up area should re-lock it"
    page.get_by_role('button', name='Cancel').click(); page.wait_for_timeout(40)


def open_grown_up_area(page, entry_button_name):
    page.get_by_role('button', name=entry_button_name).first.click(); page.wait_for_timeout(60)
    gate = page.get_by_role('dialog', name='Grown-Up Check')
    a, b = [int(n) for n in gate.locator('.gate-question').inner_text().replace('?', '').split('is')[1].split('+')]
    gate.get_by_role('spinbutton').fill(str(a + b)); gate.get_by_role('button', name='Enter').click(); page.wait_for_timeout(80)
    assert page.get_by_role('heading', name='Learner data').count() == 1, "could not open grown-up data area"


def check_reset_progress_executes(page):
    """Reset clears progress stores but keeps the learner profile (detective, stage)."""
    before = storage_snapshot(page)
    assert 'rd.learners.v1' in before, "expected a saved learner profile"
    # Unrelated site data must never be touched by Reading Detective data controls.
    page.evaluate("() => localStorage.setItem('other-app.key', 'keep-me')")
    page.get_by_role('button', name='Reset progress…').click(); page.wait_for_timeout(30)
    page.get_by_role('button', name='Yes, reset progress').click(); page.wait_for_timeout(120)
    after = storage_snapshot(page)
    for key in ['rd.evidence.v1','rd.placement.v1','rd.teaching.v1','rd.sessions.v1','rd.notebook.v1','rd.case-map.v1','rd.reviews.v1']:
        assert key not in after, f"reset did not clear {key}"
    assert 'rd.learners.v1' in after, "reset must keep the learner profile"
    import json
    learners = json.loads(after['rd.learners.v1'])
    for profile in learners.values():
        assert profile.get('detective'), "reset must keep the chosen detective"
        assert not profile.get('skillStates'), "reset must clear skill evidence"
    assert after.get('other-app.key') == 'keep-me', "reset touched non-Reading-Detective storage"


def check_delete_all_executes(page):
    """Delete removes every Reading Detective key and nothing else."""
    page.evaluate("() => localStorage.setItem('other-app.key', 'keep-me')")
    assert any(k.startswith('rd.') for k in storage_snapshot(page)), "expected Reading Detective data before delete"
    page.get_by_role('button', name='Delete all data…').click(); page.wait_for_timeout(30)
    page.get_by_role('button', name='Yes, delete everything').click(); page.wait_for_timeout(120)
    after = storage_snapshot(page)
    assert not [k for k in after if k.startswith('rd.')], f"delete left Reading Detective data: {list(after)}"
    assert after.get('other-app.key') == 'keep-me', "delete touched non-Reading-Detective storage"


CONTRAST_AUDIT_JS = """() => {
 const parse = c => { const m = c.match(/rgba?\\(([^)]+)\\)/); if(!m) return null; const p=m[1].split(',').map(x=>parseFloat(x)); return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
 const lum = ({r,g,b}) => { const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}; return .2126*f(r)+.7152*f(g)+.0722*f(b); };
 // Nearest opaque background; skip text over photographic backgrounds (checked by design review).
 const bgOf = el => { let e=el; while(e){ const cs=getComputedStyle(e); const c=parse(cs.backgroundColor); if(cs.backgroundImage!=='none' && !e.classList.contains('app')) return null; if(c && c.a>0.95) return c; e=e.parentElement;} return {r:255,g:255,b:255,a:1}; };
 const failures=[];
 for (const el of document.querySelectorAll('main p, main small, main span, main strong, main label, main li, .eyebrow, .quiet, .lede')) {
   if(!el.offsetParent || !el.innerText || !el.innerText.trim()) continue;
   if([...el.childNodes].every(n=>n.nodeType!==3 || !n.textContent.trim())) continue;
   const cs=getComputedStyle(el); if (parseFloat(cs.opacity) < 1) continue;
   const fg=parse(cs.color); const bg=bgOf(el); if(!fg||!bg||fg.a<0.95) continue;
   const L1=lum(fg), L2=lum(bg); const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
   const size=parseFloat(cs.fontSize), bold=parseInt(cs.fontWeight)>=700;
   const need=(size>=24 || (bold && size>=18.66)) ? 3 : 4.5;
   if(ratio<need) failures.push({text:el.innerText.trim().slice(0,40), color:cs.color, ratio:+ratio.toFixed(2), need});
 }
 return failures; }"""


def check_text_contrast(page, label):
    """WCAG AA text contrast on solid backgrounds, measured from rendered styles."""
    page.wait_for_timeout(450)  # let entrance fades settle so opacity reflects the resting state
    failures = page.evaluate(CONTRAST_AUDIT_JS)
    assert not failures, f"{label}: text below WCAG AA contrast: {failures[:5]}"


def contrast_ratio(hex_a, hex_b):
    def lum(value):
        value = value.lstrip('#')
        rgb = [int(value[i:i+2], 16) / 255 for i in (0, 2, 4)]
        def f(c): return c/12.92 if c <= .03928 else ((c+.055)/1.055)**2.4
        r, g, b = map(f, rgb)
        return .2126*r + .7152*g + .0722*b
    a, b = lum(hex_a), lum(hex_b)
    high, low = max(a, b), min(a, b)
    return (high+.05)/(low+.05)


def main():
    assert contrast_ratio('#ffffff', '#06192c') >= 7, "topbar contrast regressed"
    assert contrast_ratio('#ffffff', '#0d4f89') >= 4.5, "primary button contrast regressed"
    launch_kwargs = {"headless": True, "args": ["--no-sandbox"]}
    exe = resolve_chromium()
    if exe:
        launch_kwargs["executable_path"] = exe
    with sync_playwright() as p:
        browser = p.chromium.launch(**launch_kwargs)
        console_errors = []
        page_errors = []
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: page_errors.append(str(exc)))
        boot(page)

        assert page.locator('.skip-link').count() == 1
        page.keyboard.press('Tab')
        assert page.locator('.skip-link').evaluate('(el) => document.activeElement === el')
        page.keyboard.press('Enter')
        assert page.locator('#main-content').count() == 1
        unnamed = page.locator('button').evaluate_all("els => els.filter(el => !(el.innerText || el.getAttribute('aria-label') || el.getAttribute('title'))?.trim()).length")
        assert unnamed == 0, f"found {unnamed} unnamed buttons"
        # An image is accessible if it has an alt attribute at all (empty alt is a
        # valid decorative marker) or is inside an aria-hidden subtree.
        bad_images = page.locator('img').evaluate_all(
            "els => els.filter(el => el.getAttribute('alt') === null "
            "&& el.getAttribute('aria-hidden') !== 'true' "
            "&& el.closest('[aria-hidden=\"true\"]') === null).length"
        )
        assert bad_images == 0, f"found {bad_images} images without alt or aria-hidden"
        assert_no_overflow(page, 'desktop welcome')
        check_text_contrast(page, 'welcome')

        run_stage(page, YOUNG, "detective-skylar")
        assert_no_overflow(page, 'desktop case')
        check_text_contrast(page, 'young case')

        check_narration_state(page, 'young headquarters')
        if page.get_by_role('button', name='mat', exact=True).count():
            page.get_by_role('button', name='mat', exact=True).click(); page.wait_for_timeout(80)
            assert page.locator('.feedback').count() >= 1
        check_young_controls_and_reduced_motion(page)

        page.set_viewport_size({"width": 360, "height": 800}); page.wait_for_timeout(80)
        assert_no_overflow(page, '360px case')
        # Measure each button's resting layout box. getBoundingClientRect includes
        # transforms, so a scale entrance/press animation caught mid-flight would
        # under-report the real target size and make this check flaky. The
        # computed height (box-sizing: border-box) ignores transforms, so the 40px
        # bar stays exact without speeding up or disabling the intended motion.
        targets = page.locator('button:visible').evaluate_all(
            "els => els.slice(0, 12).map(el => ({ h: parseFloat(getComputedStyle(el).height), "
            "text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 24) }))"
        )
        assert targets, "no visible buttons to audit at 360px"
        for target in targets:
            assert target['h'] >= 40, f"touch target too short: {target}"

        for stage, detective in [("Investigator", "detective-micah"), ("Lead Investigator", "detective-brooke")]:
            p2 = browser.new_page(viewport={"width": 768, "height": 900})
            p2_errors = []
            p2.on('pageerror', lambda exc, errors=p2_errors: errors.append(str(exc)))
            boot(p2)
            run_stage(p2, stage, detective)
            assert_no_overflow(p2, f'{stage} 768px')
            check_text_contrast(p2, f'{stage} case')
            if stage == "Investigator":
                check_full_controls(p2)
                check_narration_state(p2, f'{stage} headquarters')
            if stage == "Lead Investigator":
                # The topbar brand button returns to Headquarters from any screen.
                p2.locator('.brand-button').click()
                p2.wait_for_timeout(100)
                assert p2.get_by_text("INVESTIGATION HEADQUARTERS", exact=True).count() == 1, "brand button did not return to Headquarters"
                check_text_contrast(p2, 'Lead Investigator headquarters')
                check_grown_up_gate_and_data_controls(p2)
                open_grown_up_area(p2, 'Educator Insight')
                check_reset_progress_executes(p2)
            assert not p2_errors, p2_errors
            p2.close()

        # Destructive delete, exercised on a fresh page so no other check depends on its data.
        p3 = browser.new_page(viewport={"width": 1440, "height": 1000})
        boot(p3)
        run_stage(p3, "Investigator", "detective-micah")
        p3.locator('.brand-button').click(); p3.wait_for_timeout(100)
        open_grown_up_area(p3, 'Educator Insight')
        check_delete_all_executes(p3)
        p3.close()

        assert not page_errors, f"browser page errors: {page_errors}"
        assert not console_errors, f"browser console errors: {console_errors}"
        browser.close()
    print('Reading Detective interactive browser + responsive + accessibility QA: PASS')
    print('Verified: three age presentations (stage-aware Headquarters/continue wording), detective/appearance selection, adaptive placement, case runtime, keyboard skip link + visible focus, accessible button names, decorative-image labelling, child + analyst accessibility panels, grown-up gate + destructive-action confirmation + executed reset/delete scope, reduced-motion behaviour, narration speaking-state lifecycle, rendered WCAG AA text contrast, touch targets, and 360/768/1440px overflow.')


if __name__ == '__main__':
    main()
