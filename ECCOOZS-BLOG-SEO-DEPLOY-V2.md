# ECCOOZS Blog + SEO Launch V2

## What this update adds

- Six ECCOOZS Journal article hero images in `public/blog/`.
- Blog card thumbnails and article hero images using `next/image`.
- Open Graph and X/Twitter social preview images for the Journal and each article.
- Article JSON-LD `image` metadata.
- Stronger metadata for `/welcome` so search engines can clearly associate ECCOOZS with a Black American-centered social media platform.
- Stronger corporate homepage metadata for ECCOOZS Technologies.
- Organization + WebSite JSON-LD in the root layout.
- Social profile `sameAs` support through environment variables.

## Public image files

- `/public/blog/facebook-alternative-guide.png`
- `/public/blog/new-social-media-platforms-2026.png`
- `/public/blog/black-centered-social-platform.png`
- `/public/blog/small-business-promotion-online.png`
- `/public/blog/social-media-without-chaos.png`
- `/public/blog/creators-and-everyone-else.png`

## Social profile environment variables

Add the real ECCOOZS profile URLs to your deployment environment when ready:

```text
NEXT_PUBLIC_ECCOOZS_INSTAGRAM=
NEXT_PUBLIC_ECCOOZS_FACEBOOK=
NEXT_PUBLIC_ECCOOZS_TIKTOK=
NEXT_PUBLIC_ECCOOZS_YOUTUBE=
NEXT_PUBLIC_ECCOOZS_THREADS=
NEXT_PUBLIC_ECCOOZS_X=
```

Do not enter placeholder or guessed profile URLs. The Journal hides missing links automatically.

## After deployment

Verify these URLs load:

- `https://eccoozs.com/`
- `https://eccoozs.com/welcome`
- `https://eccoozs.com/blog`
- all six `/blog/...` article URLs
- `https://eccoozs.com/sitemap.xml`
- `https://eccoozs.com/robots.txt`
- `https://eccoozs.com/blog/rss.xml`

Then submit `https://eccoozs.com/sitemap.xml` in Google Search Console and request indexing for `/`, `/welcome`, `/blog`, and the six article URLs.
