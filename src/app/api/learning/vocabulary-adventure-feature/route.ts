import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const encoded = readFileSync(
    join(
      process.cwd(),
      "public",
      "learning-assets",
      "vocabulary-adventure-feature-fixed.webp",
    ),
    "utf8",
  ).replace(/\s+/g, "");

  const bytes = Buffer.from(encoded, "base64");

  return new Response(new Uint8Array(bytes), {
    headers: {
      "content-type": "image/webp",
      "cache-control": "public, max-age=3600",
      "x-content-type-options": "nosniff",
    },
  });
}
