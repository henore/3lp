import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const locales=['ja','en','zh-CN','zh-TW','ko','de','fr','es','it','pt-BR','nl','sv','pl','ru','ar','hi'];
const root=path.resolve(process.argv[2] || 'dist');
for(const locale of locales){
 const html=await readFile(path.join(root,locale,'index.html'),'utf8');
 assert(html.includes('lang="'+locale+'"'),locale+' lang');
 assert(html.includes('dir="'+(locale==='ar'?'rtl':'ltr')+'"'),locale+' dir');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,locale+' h1');
 assert.equal((html.match(/hreflang=/g)||[]).length,33,locale+' alternates + language menu');
 assert(html.includes('/'+locale+'/"'),locale+' URL');
 for(const meta of ['name="description"','rel="canonical"','property="og:title"','application/ld+json']) assert(html.includes(meta),locale+' '+meta);
 assert(!/undefined|example\.invalid/.test(html),locale+' unresolved value');
 for(const match of html.matchAll(/href="#([^\"]+)"/g)) assert(html.includes('id="'+match[1]+'"'),locale+' broken anchor '+match[1]);
 for(const match of html.matchAll(/(?:href|src)="(\/[^\"#?]*)"/g)){
  const target=path.join(root,decodeURIComponent(match[1]));
  const resolved=match[1].endsWith('/')?path.join(target,'index.html'):target;
  assert((await stat(resolved)).isFile(),locale+' missing '+match[1]);
 }
}
const xml=await readFile(path.join(root,'sitemap.xml'),'utf8');
assert.equal((xml.match(/<loc>/g)||[]).length,32);
assert((await readFile(path.join(root,'robots.txt'),'utf8')).includes('/sitemap.xml'));
console.log('PASS: 16 locales, language/direction, unique h1, alternates, metadata, anchors, local assets, sitemap, robots.');
