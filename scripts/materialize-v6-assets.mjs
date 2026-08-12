import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const payloadDir = path.join(root, "src", "welcome-v6-payload");
const outputDir = path.join(root, "public", "v6-assets");

const parts = fs
  .readdirSync(payloadDir)
  .filter((name) => /^v2-\d+\.txt$/.test(name))
  .sort();

if (parts.length !== 14) {
  throw new Error(`Expected 14 V6 payload chunks, found ${parts.length}.`);
}

const encoded = parts
  .map((name) => fs.readFileSync(path.join(payloadDir, name), "utf8").trim())
  .join("");

const html = zlib.gunzipSync(Buffer.from(encoded, "base64")).toString("utf8");
const matches = [...html.matchAll(/data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)/g)];

if (matches.length < 22) {
  throw new Error(`Expected at least 22 embedded V6 images, found ${matches.length}.`);
}

fs.mkdirSync(outputDir, { recursive: true });

for (let index = 0; index < 22; index += 1) {
  const [, type, base64] = matches[index];
  const ext = type === "jpg" ? "jpeg" : type;
  const filename = `asset-${String(index + 1).padStart(2, "0")}.${ext}`;
  fs.writeFileSync(path.join(outputDir, filename), Buffer.from(base64, "base64"));
}

console.log(`Materialized 22 V6 image assets into ${outputDir}.`);
