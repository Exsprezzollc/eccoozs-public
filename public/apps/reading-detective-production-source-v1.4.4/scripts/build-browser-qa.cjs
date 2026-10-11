const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist-browser-qa');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
cp.execFileSync('tsc', ['-p', path.join(root, 'scripts/tsconfig.browser-qa.json')], { stdio: 'inherit' });

function existsModule(base) {
  if (fs.existsSync(base + '.js')) return base + '.js';
  if (fs.existsSync(path.join(base, 'index.js'))) return path.join(base, 'index.js');
  return null;
}
function rewriteFile(file) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/^import\s+["'](.+?\.css)["'];?\s*$/gm, '');
  text = text.replace(/(from\s+["']|import\s*["'])(\.{1,2}\/[^"']+)(["'])/g, (all, prefix, spec, quote) => {
    if (/\.[a-z0-9]+$/i.test(spec)) return all;
    const absolute = path.resolve(path.dirname(file), spec);
    const resolved = existsModule(absolute);
    if (!resolved) throw new Error(`Could not resolve browser QA import ${spec} from ${file}`);
    let relative = path.relative(path.dirname(file), resolved).replace(/\\/g, '/');
    if (!relative.startsWith('.')) relative = './' + relative;
    return `${prefix}${relative}${quote}`;
  });
  fs.writeFileSync(file, text);
}
for (const file of walk(path.join(out, 'app'))) if (file.endsWith('.js')) rewriteFile(file);
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

fs.cpSync(path.join(root, 'public'), out, { recursive: true });
fs.cpSync(path.join(root, 'vendor'), path.join(out, 'vendor'), { recursive: true });
fs.copyFileSync(path.join(root, 'src/styles/app.css'), path.join(out, 'app.css'));
const index = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#06192c" />
<title>Reading Detective — Browser QA Runtime</title>
<link rel="stylesheet" href="./app.css" />
</head>
<body>
<div id="root"></div>
<script src="./vendor/react16.production.min.js"></script>
<script src="./vendor/react-dom16.production.min.js"></script>
<script type="importmap">{"imports":{"react":"./vendor/react-compat.mjs","react/jsx-runtime":"./vendor/react-jsx-runtime.mjs","react-dom/client":"./vendor/react-dom-client-compat.mjs"}}</script>
<script type="module" src="./app/main.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(out, 'index.html'), index);
console.log('Reading Detective browser QA runtime built at dist-browser-qa');
