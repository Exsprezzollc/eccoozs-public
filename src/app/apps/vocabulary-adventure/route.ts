const BASE = "/apps/vocabulary-adventure";

export async function GET() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#09251f" />
  <meta name="description" content="ECCOOZS Vocabulary Adventure — learn vocabulary through guided discovery, reasoning, and real-world application." />
  <title>ECCOOZS Vocabulary Adventure</title>
  <meta name="application-name" content="ECCOOZS Vocabulary Adventure" />
  <meta name="color-scheme" content="dark light" />
  <link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="${BASE}/manifest.webmanifest" />
  <link rel="preload" href="${BASE}/assets/elementary-orchard.webp" as="image" fetchpriority="high" />
  <link rel="preload" href="${BASE}/assets/elementary-pair.webp" as="image" />
  <link rel="stylesheet" href="${BASE}/styles.css?v=2.16.0" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="${BASE}/app.js?v=2.16.0"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache, no-store, must-revalidate",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "permissions-policy": "camera=(), microphone=(), geolocation=()",
      "content-security-policy": "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
    }
  });
}
