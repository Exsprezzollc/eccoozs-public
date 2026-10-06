import type { Metadata } from "next";
import "./press.css";

export const metadata: Metadata = {
  title: "ECCOOZS Press & Media | Company Facts, Brand Description & Contact",
  description:
    "Official ECCOOZS press and media reference with company facts, approved descriptions, product information, media assets, and press contact details.",
};

const facts = [
  ["Company", "ECCOOZS Technologies LLC"],
  ["Flagship product", "ECCOOZS Social"],
  ["Category", "Social networking / online community"],
  ["Headquarters", "Michigan, United States"],
  ["Launch audience", "Adults 18+"],
  ["Cultural center", "Foundational Black American culture and perspective"],
  [
    "Values approach",
    "Rooted in traditional Christian morals, values, and beliefs of the culture",
  ],
  [
    "Core experience",
    "Social networking, conversation, discovery, creators, business discovery, and Soundrooms",
  ],
  ["Live audio", "Soundrooms"],
  ["Business discovery", "ECCOOZS Business Directory and Highlights"],
];

const productAreas = [
  {
    title: "Home + Explore",
    copy: "Posting, discovery, pictures, video, articles, community participation, and personalized exploration.",
  },
  {
    title: "Ecco",
    copy: "A dedicated conversation and reshare layer designed to add context rather than reward chaos.",
  },
  {
    title: "Newsroom",
    copy: "A news and information surface that helps people discover stories and move them into conversation.",
  },
  {
    title: "Soundrooms",
    copy: "Live audio rooms with hosts, co-hosts, speakers, listeners, moderation tools, and creator features.",
  },
  {
    title: "Business Discovery",
    copy: "Business Directory and Highlights help people discover businesses, services, products, and trusted listings.",
  },
  {
    title: "Creator Opportunity",
    copy: "Creator tools, memberships, monetization paths, referral opportunities, and audience-building features are integrated into the broader social experience.",
  },
];

export default function PressPage() {
  return (
    <main className="press-page">
      <header className="press-header">
        <a className="brand" href="/" aria-label="ECCOOZS home">eccoozs</a>
        <nav className="press-nav" aria-label="Press navigation">
          <a href="/">ECCOOZS Social</a>
          <a href="/journal">Journal</a>
          <a href="/house-of-eccoozs">House of ECCOOZS</a>
          <a href="/technologies">ECCOOZS Technologies</a>
        </nav>
      </header>

      <section className="hero wrap">
        <p className="eyebrow">PRESS &amp; MEDIA</p>
        <h1>ECCOOZS at a glance.</h1>
        <p className="hero-copy">
          A reference page for journalists, editors, podcast hosts, researchers,
          partners, and organizations covering ECCOOZS Technologies and ECCOOZS Social.
        </p>
      </section>

      <section className="wrap two-col top-grid">
        <article className="card feature-card">
          <h2>Approved brand description</h2>
          <div className="quote-block">
            ECCOOZS is a Foundational Black American-centered, community-first general
            social network built for conversation, discovery, culture, business discovery,
            creator opportunity, and live audio through Soundrooms. Rooted in Foundational
            Black American culture and perspective, ECCOOZS welcomes respectful participation
            from people of all backgrounds.
          </div>

          <h3>What makes ECCOOZS different</h3>
          <p>
            ECCOOZS is designed as a general social network rather than a creator-only
            marketplace or a single-purpose community product. Social interaction comes first,
            while business discovery and creator opportunity are built into the broader
            community experience.
          </p>

          <h3>Community and values approach</h3>
          <p>
            ECCOOZS has a clear Foundational Black American cultural center and is informed by
            traditional Christian morals, values, and beliefs that have long shaped the culture.
            Those values are reflected in an emphasis on dignity, respect, responsibility,
            modesty, family, community, standards, and constructive social interaction.
          </p>
          <p>
            ECCOOZS welcomes respectful participation from people of all backgrounds and does
            not require users to hold a particular religious belief. The platform is designed
            around standards, conversation, discovery, and community without making chaos the
            primary engine for attention.
          </p>
        </article>

        <aside className="card facts-card">
          <h2>Company facts</h2>
          <dl className="facts-list">
            {facts.map(([label, value]) => (
              <div className="fact-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="wrap narrative-section">
        <div className="section-heading">
          <p className="eyebrow">WHY ECCOOZS EXISTS</p>
          <h2>A social network built around community before spectacle.</h2>
        </div>
        <div className="narrative-card">
          <p>
            ECCOOZS is building a different kind of general social network — one centered on
            conversation, discovery, culture, business visibility, creator opportunity, and live
            audio without making outrage or chaos the primary engine for attention.
          </p>
          <p>
            Rooted in Foundational Black American culture and perspective, ECCOOZS is designed
            first as a real social environment: people can post, converse, discover businesses,
            participate in Soundrooms, build creator audiences, and move across multiple forms of
            content within one platform. The network welcomes respectful participation from
            people of all backgrounds while maintaining a clear cultural center and community
            standards.
          </p>
          <p>
            ECCOOZS Social is the flagship product of ECCOOZS Technologies LLC, a Michigan-based
            technology company developing a broader ecosystem across social media, commerce,
            storytelling, business discovery, and creator tools.
          </p>
        </div>
      </section>

      <section className="wrap product-section">
        <div className="section-heading">
          <p className="eyebrow">THE PRODUCT</p>
          <h2>One social environment. Multiple reasons to return.</h2>
        </div>
        <div className="product-grid">
          {productAreas.map((item) => (
            <article className="product-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="media-band">
        <div className="wrap media-inner">
          <div className="section-heading light-heading">
            <p className="eyebrow">PRODUCT VIEW</p>
            <h2>ECCOOZS across the social experience.</h2>
            <p>
              Home, profiles, Soundrooms, messaging, Explore, and news/discovery surfaces are
              designed as connected parts of one platform.
            </p>
          </div>
          <img
            className="phone-collage"
            src="/phone/phones_display.png"
            alt="ECCOOZS product screens showing Home, profile, Soundrooms, messaging, Explore, and news discovery"
          />
        </div>
      </section>

      <section className="wrap newsroom-feature">
        <div className="newsroom-copy">
          <p className="eyebrow">FEATURED SURFACE</p>
          <h2>ECCOOZS Newsroom</h2>
          <p className="newsroom-lede">News discovery without losing the conversation.</p>
          <p>
            ECCOOZS Newsroom gives members a dedicated place to discover current stories,
            browse by topic, read at the source, save articles, and move stories into ECCOOZS
            conversation when they want to discuss them with the community.
          </p>
          <div className="newsroom-points">
            <div>
              <strong>Read at the source</strong>
              <span>Follow stories back to original reporting and source material.</span>
            </div>
            <div>
              <strong>Discover by topic</strong>
              <span>Browse politics, business, finance, science, technology, health, sports, arts, and more.</span>
            </div>
            <div>
              <strong>Bring news into community discussion</strong>
              <span>Save a story or move it into Ecco when the community wants to talk about it.</span>
            </div>
          </div>
        </div>
        <div className="newsroom-visual">
          <img
            src="/phone/newsroom_page.png"
            alt="ECCOOZS Newsroom shown on a laptop with topic navigation, trending stories, most popular stories, and latest news"
          />
        </div>
      </section>

      <section className="wrap copy-section">
        <div className="section-heading">
          <p className="eyebrow">PRESS COPY</p>
          <h2>Ready-to-use descriptions.</h2>
        </div>
        <div className="copy-grid">
          <article className="card copy-card">
            <span className="copy-label">One sentence</span>
            <p>
              ECCOOZS is a Foundational Black American-centered general social network built for
              conversation, discovery, culture, creators, business discovery, and live audio.
            </p>
          </article>
          <article className="card copy-card">
            <span className="copy-label">Short description</span>
            <p>
              ECCOOZS Social is a community-first general social network rooted in Foundational
              Black American culture and perspective. It brings together conversation, discovery,
              creators, business visibility, and Soundrooms while welcoming respectful
              participation from people of all backgrounds.
            </p>
          </article>
          <article className="card copy-card full-span">
            <span className="copy-label">Press boilerplate</span>
            <p>
              ECCOOZS Social is the flagship social platform of ECCOOZS Technologies LLC, a
              Michigan-based technology company. ECCOOZS combines everyday social participation
              with conversation, discovery, live audio through Soundrooms, creator opportunity,
              and integrated business discovery. The platform is centered in Foundational Black
              American culture and perspective and is informed by traditional Christian morals,
              values, and beliefs of the culture, with an emphasis on dignity, respect,
              responsibility, family, community, and standards. ECCOOZS welcomes respectful
              participation from people of all backgrounds and launches for adults 18 and older.
            </p>
          </article>
        </div>
      </section>

      <section className="wrap media-assets-section">
        <div className="section-heading">
          <p className="eyebrow">MEDIA ASSETS</p>
          <h2>Product and brand materials.</h2>
        </div>
        <div className="asset-grid">
          <a className="asset-card" href="/phone/phones_display.png" target="_blank" rel="noreferrer">
            <strong>ECCOOZS product collage</strong>
            <span>Multi-surface platform visual</span>
          </a>
          <a className="asset-card" href="/phone/home-page.png" target="_blank" rel="noreferrer">
            <strong>Home</strong>
            <span>Social feed screenshot</span>
          </a>
          <a className="asset-card" href="/phone/profile_page.png" target="_blank" rel="noreferrer">
            <strong>Profile</strong>
            <span>Profile and creator surface</span>
          </a>
          <a className="asset-card" href="/phone/soundroom_page.png" target="_blank" rel="noreferrer">
            <strong>Soundrooms</strong>
            <span>Live audio experience</span>
          </a>
          <a className="asset-card" href="/phone/explore_page.png" target="_blank" rel="noreferrer">
            <strong>Explore</strong>
            <span>Discovery surface</span>
          </a>
          <a className="asset-card" href="/phone/newsroom_page.png" target="_blank" rel="noreferrer">
            <strong>Newsroom</strong>
            <span>Desktop news and information surface</span>
          </a>
          <a className="asset-card" href="/phone/message_page.png" target="_blank" rel="noreferrer">
            <strong>Messages</strong>
            <span>Private messaging experience</span>
          </a>
        </div>
        <p className="asset-note">
          For additional logos, approved artwork, interview requests, review access, or alternate
          file formats, contact the ECCOOZS press team.
        </p>
      </section>

      <section className="wrap contact-card">
        <p className="eyebrow">MEDIA CONTACT</p>
        <h2>Covering ECCOOZS?</h2>
        <p>
          For interviews, company information, launch coverage, partnership inquiries, review
          access, or press materials, contact the ECCOOZS team.
        </p>
        <a className="press-email" href="mailto:press@eccoozs.com">press@eccoozs.com</a>
      </section>

      <footer className="press-footer wrap">
        <span>© 2026 ECCOOZS Technologies LLC.</span>
        <div>
          <a href="/privacy">Privacy</a>
          <span>·</span>
          <a href="/terms">Terms</a>
          <span>·</span>
          <a href="/support">Support</a>
        </div>
      </footer>
    </main>
  );
}
