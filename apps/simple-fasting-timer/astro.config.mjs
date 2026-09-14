import { defineConfig } from 'astro/config';
export default defineConfig({site:process.env.SITE_URL || 'https://simple-fast.biz',output:'static',outDir:'../../build',trailingSlash:'always',devToolbar:{enabled:false}});
