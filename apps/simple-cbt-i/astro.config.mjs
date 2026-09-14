import { defineConfig } from 'astro/config';
export default defineConfig({site:process.env.SITE_URL || 'https://simple-cbt-i.biz', output:'static', outDir:'../../dist', trailingSlash:'always', devToolbar:{enabled:false}});

