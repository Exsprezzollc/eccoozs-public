import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const dir = path.join(process.cwd(), "src", "welcome-v6-payload");
const parts = fs.readdirSync(dir)
  .filter((name) => /^v2-\d+\.txt$/.test(name))
  .sort();

if (parts.length !== 14) {
  throw new Error(`Expected 14 V6 welcome payload chunks, found ${parts.length}.`);
}

const b64 = parts.map((name) =>
  fs.readFileSync(path.join(dir, name), "utf8").trim()
).join("");

const html = zlib.gunzipSync(Buffer.from(b64, "base64")).toString("utf8");

const mustContain = [
  "<title>Eccoozs — Culture. Conversation. Community.</title>",
  "Explore. Express. Elevate.",
  'id="waitlistForm"',
  'id="learning"',
  "/apps/math-trail",
  "/apps/my-voice-journey",
  "/house-of-eccoozs",
];

for (const marker of mustContain) {
  if (!html.includes(marker)) {
    throw new Error(`V6 welcome integrity check failed: missing ${marker}`);
  }
}

if (html.includes('id="pricing"')) {
  throw new Error("V6 welcome integrity check failed: pricing section is still present.");
}

if (html.includes('href="#"')) {
  throw new Error("V6 welcome integrity check failed: placeholder href=# link is still present.");
}

const waitlistCount = (html.match(/id="waitlistForm"/g) || []).length;
if (waitlistCount !== 1) {
  throw new Error(`V6 welcome integrity check failed: expected 1 waitlist form, found ${waitlistCount}.`);
}

const out = path.join(process.cwd(), "public", "welcome-v6.html");
fs.writeFileSync(out, html);
console.log(`Built ${out} from ${parts.length} V6 payload chunks; integrity checks passed.`);
