import {localeCodes} from '../../../../packages/i18n/locales';
export function GET({site}:{site:URL}){return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+localeCodes.flatMap(locale=>['','support/'].map(page=>'<url><loc>'+new URL('/'+locale+'/'+page,site).href+'</loc></url>')).join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});}

