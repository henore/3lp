import {localeCodes} from '../../../../packages/i18n/locales';
export function GET({site}:{site:URL}){return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+localeCodes.map(locale=>'<url><loc>'+new URL('/'+locale+'/',site).href+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});}

