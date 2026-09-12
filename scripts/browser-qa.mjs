import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const origin=process.argv[2] || 'http://127.0.0.1:4321';
const label=process.argv[3] || 'cbti';
const resultDir='test-results/'+label;
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext();
const page=await context.newPage();
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
const locales=['ja','en','zh-CN','zh-TW','ko','de','fr','es','it','pt-BR','nl','sv','pl','ru','ar','hi'];
const results=[];
await mkdir(resultDir,{recursive:true});
try{
for(const width of [375,1440]){
 await page.setViewportSize({width,height:1000});
 for(const locale of locales){
  await page.goto(origin+'/'+locale+'/');
  await page.evaluate(()=>document.fonts.ready);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
  assert(!overflow,locale+' overflow at '+width);
  const result={locale,width,overflow};
  if(['ja','en','ar'].includes(locale)){
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   result.violations=axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
  }
  if(locale==='ja')await page.screenshot({path:resultDir+'/ja-'+width+'.png',fullPage:true});
  results.push(result);
 }
}
await page.goto(origin+'/ja/');
const faq=page.locator('#faq details').first();
await faq.locator('summary').focus(); await page.keyboard.press('Enter');
assert(await faq.getAttribute('open')!==null,'FAQ keyboard open');
await page.keyboard.press('Enter');assert(await faq.getAttribute('open')===null,'FAQ keyboard close');
await page.locator('.language summary').click();
await page.locator('.language-list a[lang="ar"]').click();
assert(page.url().endsWith('/ar/'),'locale navigation');
assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
await page.locator('.language summary').focus();await page.keyboard.press('Enter');await page.keyboard.press('Escape');
assert.equal(await page.locator('.language').getAttribute('open'),null,'language escape');
const primary=page.locator('.hero-actions a').first();
if(await primary.getAttribute('href')==='#download'){await primary.click();assert(page.url().endsWith('#download'),'CTA anchor');}else{assert.equal(await primary.getAttribute('href'),'https://play.google.com/store/apps/details?id=com.ohesoft.fast');assert.equal(await page.locator('.google-play-badge').count(),2);assert.equal(await page.locator('.join-link,.review-note,.test-note').count(),0);assert(await page.locator('.google-play-badge img').evaluateAll(imgs=>imgs.every(im=>im.complete&&im.naturalWidth>0)));}
await page.setViewportSize({width:375,height:900});
await page.goto(origin+'/ja/');
await page.addStyleTag({content:'html{font-size:200%}'});
results.push({zoom:'200%',width:375,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
await writeFile(resultDir+'/browser.json',JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({layouts:results.length,violations:results.flatMap(r=>r.violations??[]),overflow:results.filter(r=>r.overflow),errors},null,2));
assert.equal(errors.length,0,'browser console errors');
assert(results.every(r=>!r.overflow&&!r.violations?.length),'layout or accessibility issues');
}finally{await browser.close();}
