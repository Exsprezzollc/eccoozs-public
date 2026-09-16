export default function BellmontFeature() {
  return (
    <section className="bm-feature-static" aria-label="Bellmont State University — A Higher Story">
      <a href="/bellmont" className="bm-feature-link" aria-label="Explore Bellmont State University">
        <img
          src="/bellmont/bellmont-home.webp"
          alt="Bellmont State University — A Higher Story"
          className="bm-feature-image"
        />
      </a>
      <style jsx>{`
        .bm-feature-static {
          width: 100%;
          margin: 0;
          padding: 0;
          background: #061c3b;
          overflow: hidden;
        }
        .bm-feature-link {
          display: block;
          width: 100%;
          margin: 0 auto;
          text-decoration: none;
          line-height: 0;
        }
        .bm-feature-image {
          display: block;
          width: 100%;
          height: auto;
          margin: 0 auto;
          object-fit: contain;
          background: #061c3b;
        }
        @media (min-width: 1700px) {
          .bm-feature-link {
            max-width: 1531px;
          }
        }
      `}</style>
    </section>
  );
}
