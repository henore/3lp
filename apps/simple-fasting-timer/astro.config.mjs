import { defineConfig } from 'astro/config';
export default defineConfig({site:process.env.SITE_URL || 'https://simple-fasting-timer-henor.happybeautiful111.chatgpt.site',output:'static',outDir:'../../build',trailingSlash:'always',devToolbar:{enabled:false}});
