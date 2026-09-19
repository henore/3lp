import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const root=path.resolve(process.argv[2]||'dist');
const origin=process.argv[3];
const locales=['ja','en','zh-CN','zh-TW','ko','de','fr','es','it','pt-BR','nl','sv','pl','ru','ar','hi','th','vi','id','tr'];
const urls=[];
for(const locale of locales)for(const page of ['','support/']){
 const html=await readFile(path.join(root,locale,page,'index.html'),'utf8');
 const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
 assert(canonical,'canonical missing');
 if(origin)assert.equal(canonical,origin+'/'+locale+'/'+page);
 const url=new URL(canonical);urls.push(canonical);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 assert(/<title>[^<]+<\/title>/.test(html));
 assert(/name="description" content="[^"]+"/.test(html));
 assert(html.includes('lang="'+locale+'"'));
 assert(html.includes('dir="'+(locale==='ar'?'rtl':'ltr')+'"'));
 const xDefaultHref=html.match(/hreflang="x-default" href="([^"]+)"/)?.[1];
 const xDefaultLocale=xDefaultHref?new URL(xDefaultHref).pathname.split('/')[1]:'en';
 for(const lang of [...locales,'x-default']){
  const target=url.origin+'/'+(lang==='x-default'?xDefaultLocale:lang)+'/'+page;
  assert(html.includes('hreflang="'+lang+'" href="'+target+'"'),'hreflang '+target);
 }
 assert(html.includes('property="og:url" content="'+canonical+'"'));
 assert(html.includes('property="og:image" content="'+url.origin+'/og.png"'));
 assert(html.includes('name="twitter:card" content="summary_large_image"'));
 assert(html.includes('href="/favicon.png"'));
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)){
  const p=path.join(root,m[1],m[1].endsWith('/')?'index.html':'');assert((await stat(p)).isFile(),p);
 }
}
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,40);
for(const url of urls)assert(sitemap.includes('<loc>'+url+'</loc>'));
const robots=await readFile(path.join(root,'robots.txt'),'utf8');
assert(robots.includes('Sitemap: '+new URL('/sitemap.xml',urls[0]).href));
const og=await readFile(path.join(root,'og.png'));
assert.equal(og.subarray(1,4).toString(),'PNG');assert.equal(og.readUInt32BE(16),1200);assert.equal(og.readUInt32BE(20),630);
assert((await stat(path.join(root,'favicon.png'))).size>0);
assert((await readFile(path.join(root,'404.html'),'utf8')).includes('content="noindex"'));
console.log('PASS: 40 routes, exact canonical/hreflang/sitemap, OGP PNG, favicon, support links, 404.');
