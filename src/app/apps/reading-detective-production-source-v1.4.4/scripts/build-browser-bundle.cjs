const fs=require('fs'), path=require('path'), cp=require('child_process');
const root=path.resolve(__dirname,'..'); const out=path.join(root,'dist-browser-qa'); const cjs=path.join(out,'cjs');
fs.rmSync(cjs,{recursive:true,force:true}); fs.mkdirSync(cjs,{recursive:true});
cp.execFileSync('tsc',['-p',path.join(root,'scripts/tsconfig.browser-cjs.json')],{stdio:'inherit'});
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);}
const modules={};
for(const file of walk(cjs).filter(f=>f.endsWith('.js'))){
  let code=fs.readFileSync(file,'utf8').replace(/^require\(["'][^"']+\.css["']\);?\s*$/gm,'');
  const id='/'+path.relative(cjs,file).replace(/\\/g,'/'); modules[id]=code;
}
const prelude=`(function(global){\nvar MODULES={};\n`;
let body=prelude;
for(const [id,code] of Object.entries(modules)) body+=`MODULES[${JSON.stringify(id)}]=function(require,module,exports){\n${code}\n};\n`;
body+=`\nvar CACHE={};\nfunction resolve(from,spec){\n if(spec==='react'||spec==='react/jsx-runtime'||spec==='react-dom/client')return spec;\n if(!spec.startsWith('.')) throw new Error('Unsupported QA module '+spec);\n var base=from.slice(0,from.lastIndexOf('/')+1); var parts=(base+spec).split('/'), stack=[]; for(var p of parts){if(!p||p==='.')continue;if(p==='..')stack.pop();else stack.push(p);} var raw='/'+stack.join('/');\n var candidates=[raw,raw+'.js',raw+'/index.js']; for(var c of candidates) if(MODULES[c]) return c; throw new Error('Cannot resolve '+spec+' from '+from);\n}\nfunction load(id,from){\n if(id==='react')return global.RDReactCompat; if(id==='react/jsx-runtime')return global.RDReactJsxRuntime; if(id==='react-dom/client')return global.RDReactDOMClient;\n var resolved=from?resolve(from,id):id; if(CACHE[resolved])return CACHE[resolved].exports; var fn=MODULES[resolved]; if(!fn)throw new Error('Missing QA module '+resolved); var module={exports:{}}; CACHE[resolved]=module; fn(function(spec){return load(spec,resolved);},module,module.exports); return module.exports;\n}\nload('/main.js');\n})(globalThis);\n`;
fs.writeFileSync(path.join(out,'app-bundle.js'),body);
console.log('Built browser QA CommonJS bundle:',Object.keys(modules).length,'modules');
