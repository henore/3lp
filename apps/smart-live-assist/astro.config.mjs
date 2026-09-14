import {defineConfig} from 'astro/config';
export default defineConfig({site:process.env.SITE_URL || 'https://smart-live-assist.biz',output:'static',outDir:'../../build-sla',trailingSlash:'always',devToolbar:{enabled:false}});
