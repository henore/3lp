import { defineConfig } from 'astro/config';
export default defineConfig({site:process.env.SITE_URL || 'https://simple-cbt-i-henor.proud-degu-7440.chatgpt.site', output:'static', outDir:'../../dist', trailingSlash:'always', devToolbar:{enabled:false}});

