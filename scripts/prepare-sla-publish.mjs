import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const destination=path.resolve(process.argv[2]||'');
if(!process.argv[2]||destination===root||destination.startsWith(root+path.sep)||fs.existsSync(destination))throw new Error('Provide a new, empty destination outside the authoring repository.');
const files=execFileSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
fs.mkdirSync(destination,{recursive:true});
for(const relative of files){const output=path.join(destination,relative);fs.mkdirSync(path.dirname(output),{recursive:true});fs.copyFileSync(path.join(root,relative),output);}
const manifest=JSON.parse(fs.readFileSync(path.join(root,'sites/smart-live-assist/hosting.json'),'utf8').replace(/^\uFEFF/,''));
fs.writeFileSync(path.join(destination,'.openai/hosting.json'),JSON.stringify(manifest,null,2)+'\n');
const pkg=JSON.parse(fs.readFileSync(path.join(destination,'package.json'),'utf8'));
pkg.scripts.build=pkg.scripts['build:sla'];
pkg.scripts.dev=pkg.scripts['dev:sla'];
pkg.scripts.check=pkg.scripts['check:sla'];
fs.writeFileSync(path.join(destination,'package.json'),JSON.stringify(pkg,null,2)+'\n');
console.log('Prepared SLA-only deployment snapshot at '+destination);

const astroConfig=path.join(destination,'apps/smart-live-assist/astro.config.mjs');
fs.writeFileSync(astroConfig,fs.readFileSync(astroConfig,'utf8').replace('../../build-sla','../../build'));
