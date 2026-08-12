import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const payload = fs.readFileSync(path.join(root, 'src', 'welcome-v6-payload', '00.txt'), 'utf8').trim();
let html = zlib.gunzipSync(Buffer.from(payload, 'base64')).toString('utf8');

const info = {
  chars: html.length,
  title: (html.match(/<title>([^<]+)<\/title>/) || [])[1] || null,
  pricing: html.includes('id="pricing"'),
  waitlists: (html.match(/id="waitlistForm"/g) || []).length,
  placeholders: (html.match(/href="#"/g) || []).length,
  tagline: html.includes('Explore. Express. Elevate.'),
};
console.log('V6 source integrity:', JSON.stringify(info));
if (info.title !== 'Eccoozs — Culture. Conversation. Community.' || !info.tagline) {
  throw new Error('Self-contained V6 payload is not the expected package page.');
}

const dist = path.join(root, 'dist');
fs.rmSync(dist, {recursive:true, force:true});
fs.mkdirSync(dist, {recursive:true});
if (fs.existsSync(path.join(root,'public'))) fs.cpSync(path.join(root,'public'), dist, {recursive:true});
fs.writeFileSync(path.join(dist,'index.html'), html);
fs.writeFileSync(path.join(dist,'eccoozs-v6-final.html'), html);
fs.mkdirSync(path.join(dist,'welcome'), {recursive:true});
fs.writeFileSync(path.join(dist,'welcome','index.html'), html);
fs.writeFileSync(path.join(dist,'welcome.html'), html);
