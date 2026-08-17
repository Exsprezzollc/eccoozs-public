import { brotliDecompressSync } from "node:zlib";
import chunk0 from "./_pack/chunk0";
import chunk1 from "./_pack/chunk1";
import chunk2 from "./_pack/chunk2";
import chunk3 from "./_pack/chunk3";
import chunk4 from "./_pack/chunk4";
import chunk5 from "./_pack/chunk5";

export const runtime = "nodejs";

const BASE = "/apps/vocabulary-adventure";

type PackedEntry = {
  path: string;
  offset: number;
  length: number;
  mime: string;
  br: boolean;
};

const encoded = chunk0 + chunk1 + chunk2 + chunk3 + chunk4 + chunk5;
const archive = Buffer.from(encoded, "base64");
const manifestLength = archive.readUInt32BE(0);
const entries = JSON.parse(
  archive.subarray(4, 4 + manifestLength).toString("utf8"),
) as PackedEntry[];
const payload = archive.subarray(4 + manifestLength);
const byPath = new Map(entries.map((entry) => [entry.path, entry]));

function shell() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#08231e" />
  <meta name="description" content="ECCOOZS Vocabulary Adventure — vocabulary learning that grows from guided discovery to real-world application." />
  <title>ECCOOZS Vocabulary Adventure</title>
  <link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="${BASE}/manifest.webmanifest" />
  <link rel="preload" href="${BASE}/assets/elementary-orchard.avif" as="image" fetchpriority="high" />
  <link rel="stylesheet" href="${BASE}/styles.css?v=2.16.0" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="${BASE}/app.js?v=2.16.0"></script>
</body>
</html>`;
}

function securityHeaders(contentType: string, immutable = false) {
  return {
    "content-type": contentType,
    "cache-control": immutable
      ? "public, max-age=31536000, immutable"
      : "no-cache, no-store, must-revalidate",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
    "content-security-policy":
      "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  };
}

function unpack(entry: PackedEntry) {
  const raw = payload.subarray(entry.offset, entry.offset + entry.length);
  return entry.br ? brotliDecompressSync(raw) : raw;
}

function rewriteText(path: string, buffer: Buffer) {
  let text = buffer.toString("utf8");
  text = text.replaceAll("/assets/", `${BASE}/assets/`);

  if (path === "manifest.webmanifest") {
    try {
      const manifest = JSON.parse(text) as Record<string, unknown>;
      manifest.start_url = BASE;
      manifest.scope = `${BASE}/`;
      const icons = manifest.icons;
      if (Array.isArray(icons)) {
        for (const icon of icons) {
          if (icon && typeof icon === "object" && "src" in icon) {
            const value = (icon as { src?: unknown }).src;
            if (typeof value === "string" && value.startsWith("/")) {
              (icon as { src: string }).src = `${BASE}${value}`;
            }
          }
        }
      }
      text = JSON.stringify(manifest);
    } catch {
      // Keep the verified release manifest if it cannot be normalized.
    }
  }

  return text;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  const requested = path?.join("/") ?? "";

  if (!requested) {
    return new Response(shell(), {
      headers: securityHeaders("text/html; charset=utf-8"),
    });
  }

  const entry = byPath.get(requested);
  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const data = unpack(entry);
  const textual =
    entry.mime.startsWith("text/") ||
    entry.mime.includes("javascript") ||
    entry.mime.includes("json") ||
    entry.mime.includes("svg") ||
    entry.mime.includes("manifest");

  if (textual) {
    return new Response(rewriteText(requested, data), {
      headers: securityHeaders(entry.mime),
    });
  }

  return new Response(new Uint8Array(data), {
    headers: securityHeaders(entry.mime, requested.startsWith("assets/")),
  });
}
