import part01 from "./markupParts/part01";
import part02 from "./markupParts/part02";
import part03 from "./markupParts/part03";
import part04 from "./markupParts/part04";
import part05 from "./markupParts/part05";

const mathPreview =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eef7ff"/><stop offset="1" stop-color="#dff4e5"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/><path d="M0 520C210 430 330 600 520 505s300-150 680-30v200H0z" fill="#b8dfc5"/><circle cx="195" cy="175" r="72" fill="#fff" opacity=".92"/><text x="195" y="195" text-anchor="middle" font-family="Arial,sans-serif" font-size="62" font-weight="700" fill="#245d3d">×</text><text x="600" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="72" font-weight="800" fill="#071240">Math Trail</text><text x="600" y="325" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#3d6c58">Explore · Practice · Grow</text><rect x="430" y="380" width="340" height="76" rx="38" fill="#245d3d"/><text x="600" y="430" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#fff">Grades 1–6</text></svg>`);

export const welcomeV6Markup = [part01, part02, part03, part04, part05]
  .join("")
  .replaceAll("/v6-assets/asset-04.png", "/icon.svg")
  .replaceAll("/v6-assets/asset-05.png", "/welcome-images/landing-02.png")
  .replaceAll("/v6-assets/asset-06.png", "/welcome-images/landing-03.png")
  .replaceAll("/v6-assets/asset-07.jpeg", "/welcome-images/landing-04.png")
  .replaceAll("/v6-assets/asset-08.png", "/welcome-images/landing-05.jpg")
  .replaceAll("/v6-assets/asset-09.jpeg", "/welcome-images/landing-06.png")
  .replaceAll("/v6-assets/asset-10.jpeg", "/welcome-images/landing-07.png")
  .replaceAll("/v6-assets/asset-11.png", "/welcome-images/landing-08.png")
  .replaceAll("/v6-assets/asset-12.png", "/welcome-images/landing-09.jpg")
  .replaceAll("/v6-assets/asset-13.png", "/welcome-images/landing-10.png")
  .replaceAll("/v6-assets/asset-14.png", "/welcome-images/landing-11.png")
  .replaceAll("/v6-assets/asset-15.png", "/welcome-images/landing-12.png")
  .replaceAll("/v6-assets/asset-16.png", "/welcome-images/landing-13.png")
  .replaceAll("/v6-assets/asset-17.png", "/welcome-images/landing-14.png")
  .replaceAll("/v6-assets/asset-18.png", "/welcome-images/landing-15.png")
  .replaceAll("/v6-assets/asset-19.png", "/welcome-images/landing-16-v3.png")
  .replaceAll("/v6-assets/asset-20.png", mathPreview)
  .replaceAll("/v6-assets/asset-21.png", "/learning-assets/voice-journey-showcase.svg");
