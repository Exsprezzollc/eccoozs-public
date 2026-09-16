export default function BellmontFeature() {
  const cards = [
    ["Campus Life", "Live. Learn. Belong.", "/bellmont/campus-life", 4, 1],
    ["Traditions", "What we carry forward.", "/bellmont/traditions", 7, 1],
    ["Athletics", "Discipline. Purpose.", "/bellmont/athletics", 8, 1],
    ["Sounds of Triumph", "More than music.", "/bellmont/sounds-of-triumph", 7, 2]
  ] as const;

  return (
    <section className="bm-feature" aria-labelledby="bm-feature-title">
      <div className="bm-shell">
        <div className="bm-copy">
          <img className="bm-turtle" src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" />
          <div className="bm-eyebrow">From the ECCOOZS World</div>
          <h2 id="bm-feature-title">Bellmont State<br />University</h2>
          <div className="bm-tagline">A Higher Story.</div>
          <p>Meet the people. Experience the traditions. Follow the stories of a campus built around faith, purpose, friendship, ambition, and the choices that shape who we become.</p>
          <div className="bm-actions">
            <a className="primary" href="/bellmont">Explore Bellmont <span aria-hidden="true">→</span></a>
            <a href="/bellmont/circle">Meet the Bellmont Circle</a>
            <a href="https://www.youtube.com/@Eccoozs" target="_blank" rel="noreferrer">Watch Bellmont State <span aria-hidden="true">▶</span></a>
          </div>
          <div className="bm-note">Campus · Characters · Traditions · A brighter tomorrow.</div>
        </div>
        <a className="bm-visual" href="/bellmont" aria-label="Explore Bellmont State University">
          <div className="bm-badge"><img src="/bellmont/turtle-white.webp" alt="" aria-hidden="true" /><span>People. Purpose. Possibility.</span></div>
        </a>
      </div>
      <div className="bm-cards">
        {cards.map(([title, caption, href, frame, sprite]) => (
          <a href={href} key={href}>
            <span className="bm-sprite" aria-hidden="true"><img src={sprite === 1 ? "/bellmont/page-set-1.webp" : "/bellmont/page-set-2.webp"} alt="" style={{ transform: `translateY(-${frame * 11.111111}%)` }} /></span>
            <span className="bm-card-copy"><strong>{title}</strong><em>{caption}</em></span>
          </a>
        ))}
        <a href="/house-of-eccoozs" className="bm-house"><span className="bm-house-bg" aria-hidden="true" /><span className="bm-card-copy"><strong>House of ECCOOZS × BSU</strong><em>Wear the story.</em></span></a>
      </div>
      <style jsx>{`
        .bm-feature{background:#061c3b;color:#fff;padding:0 5% 4.2rem;position:relative;overflow:hidden}.bm-feature:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 0%,rgba(31,71,224,.18),transparent 36%),linear-gradient(180deg,rgba(255,255,255,.025),transparent 28%);pointer-events:none}.bm-shell{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(360px,.86fr) minmax(0,1.3fr);min-height:600px;border-left:1px solid rgba(255,255,255,.08);border-right:1px solid rgba(255,255,255,.08);position:relative;z-index:1}.bm-copy{padding:68px 44px 54px;background:linear-gradient(145deg,rgba(8,35,73,.98),rgba(3,18,41,.99));display:flex;flex-direction:column;justify-content:center}.bm-turtle{width:48px;height:auto;display:block;margin-bottom:12px}.bm-eyebrow{font-size:.66rem;text-transform:uppercase;letter-spacing:.28em;color:#d8c69e;margin-bottom:1.2rem}.bm-copy h2{font-family:Georgia,'Times New Roman',serif;font-size:clamp(3rem,5vw,5.4rem);font-weight:500;line-height:.88;margin:0;color:#fff;letter-spacing:.01em}.bm-tagline{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:1.65rem;letter-spacing:.12em;color:#f5e9cc;margin:1.2rem 0 1.35rem}.bm-copy>p{font-family:Georgia,'Times New Roman',serif;font-size:1rem;line-height:1.75;color:rgba(255,255,255,.82);max-width:610px}.bm-actions{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:1.65rem}.bm-actions a{display:inline-flex;align-items:center;gap:7px;min-height:45px;padding:0 14px;border:1px solid rgba(255,255,255,.31);border-radius:8px;color:#fff;text-decoration:none;font-size:.76rem;font-weight:700}.bm-actions .primary{background:#fff;color:#061c3b;border-color:#fff}.bm-note{font-size:.63rem;letter-spacing:.23em;text-transform:uppercase;color:rgba(255,255,255,.48);margin-top:1.7rem}.bm-visual{display:block;position:relative;min-height:600px;overflow:hidden;background-color:#0a2549;background-image:linear-gradient(90deg,rgba(3,18,41,.37),transparent 33%),linear-gradient(0deg,rgba(3,18,41,.42),transparent 40%),url('/bellmont/hero.webp'),url('/welcome-images/landing-09.jpg');background-size:cover,cover,cover,cover;background-position:center,center,center,center;text-decoration:none}.bm-badge{position:absolute;right:24px;bottom:24px;display:flex;align-items:center;gap:10px;padding:10px 13px;background:rgba(3,18,41,.74);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.17);border-radius:8px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:.82rem}.bm-badge img{width:26px;height:auto}.bm-cards{position:relative;z-index:1;max-width:1280px;margin:12px auto 0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.bm-cards>a{position:relative;display:block;height:185px;overflow:hidden;border-radius:8px;border:1px solid rgba(255,255,255,.13);background:#07192f;text-decoration:none}.bm-cards>a:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,14,33,.94),rgba(2,14,33,.12) 70%)}.bm-sprite{position:absolute;inset:0;overflow:hidden;display:block}.bm-sprite img{position:absolute;left:0;top:0;width:100%;height:auto;max-width:none;filter:saturate(.92) contrast(1.03)}.bm-card-copy{position:absolute;left:14px;right:12px;bottom:13px;z-index:2;color:#fff}.bm-card-copy strong{display:block;font-family:Georgia,'Times New Roman',serif;font-size:.98rem;font-weight:500}.bm-card-copy em{display:block;font-style:normal;font-size:.64rem;color:rgba(255,255,255,.66);margin-top:3px}.bm-house-bg{position:absolute;inset:0;background:url('/House of Eccoozs banner.png') center/cover no-repeat}.bm-house:after{z-index:1}@media(max-width:1100px){.bm-shell{grid-template-columns:1fr 1.15fr}.bm-copy{padding:54px 32px}.bm-cards{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:820px){.bm-feature{padding-left:1.25rem;padding-right:1.25rem}.bm-shell{grid-template-columns:1fr}.bm-visual{min-height:420px}.bm-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.bm-copy{padding:46px 22px}.bm-copy h2{font-size:3.35rem}.bm-actions{flex-direction:column;align-items:stretch}.bm-actions a{justify-content:center}.bm-cards{grid-template-columns:1fr}.bm-cards>a{height:220px}}
      `}</style>
    </section>
  );
}
