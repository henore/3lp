import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
process.chdir(root);
const sites=JSON.parse(readFileSync('deploy/sites.json','utf8'));
const mode=process.argv[2] || 'check';
for(const site of sites){
 if(!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(site.domain)) throw new Error('Invalid domain: '+site.domain);
 if(!/^[a-z]+$/.test(site.key)) throw new Error('Invalid site key');
 for(const field of ['privacyUrl','termsUrl','playStoreUrl']) {
  if(site[field] && new URL(site[field]).protocol!=='https:') throw new Error(site.key+': HTTPS required for '+field);
 }
 if(site.playStoreUrl){const u=new URL(site.playStoreUrl);if(u.hostname!=='play.google.com'||u.pathname!=='/store/apps/details'||!u.searchParams.get('id'))throw new Error('Invalid Play Store URL');}
}
function run(command,args,env=process.env){const r=spawnSync(command,args,{stdio:'inherit',env});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1);}
if(mode==='build') {
 if(process.platform==='win32') throw new Error('Run production build on Ubuntu. Use npm run build locally.');
 for(const s of sites){
  run('npm',['run',s.build],{...process.env,ASTRO_TELEMETRY_DISABLED:'1',SITE_URL:'https://'+s.domain,PRIVACY_URL:s.privacyUrl||'',TERMS_URL:s.termsUrl||'',PLAY_STORE_URL:s.playStoreUrl||''});
  run('node',['scripts/verify.mjs',s.output]);
  run('node',['scripts/verify-release.mjs',s.output,'https://'+s.domain]);
 }
}else if(mode==='nginx') {
 mkdirSync('deploy/generated',{recursive:true});
 const format=`# HTTP context: installed in /etc/nginx/conf.d/3lp-logging.conf
# Query strings and Referer are omitted to reduce incidental personal data in access logs.
log_format lp_access '$remote_addr [$time_local] "$request_method $uri $server_protocol" '
                     '$status $body_bytes_sent "$http_user_agent"';
`;
 writeFileSync('deploy/generated/3lp-logging.conf',format);
 for(const s of sites) writeFileSync(`deploy/generated/${s.key}.conf`,`# Generated HTTP bootstrap; Certbot adds HTTPS. Do not overwrite after certificate setup.
server {
    listen 80;
    server_name ${s.domain};
    root /var/www/${s.key};
    index index.html;
    charset utf-8;
    access_log /var/log/nginx/${s.key}.access.log lp_access;
    error_log /var/log/nginx/${s.key}.error.log warn;
    location / { try_files $uri $uri/ =404; }
    location ~ /\\. { deny all; }
    location = /og.png { add_header Cache-Control "public, max-age=3600"; }
    location /screenshots/ { add_header Cache-Control "public, max-age=3600"; }
    error_page 404 /404.html;
    location = /404.html { internal; }
}
`);
 console.log('Generated HTTP bootstrap and separate access/error logs in deploy/generated.');
}else if(mode==='check') {
 let pending=false;
 for(const s of sites){
  console.log(s.key+': https://'+s.domain);
  for(const field of ['privacyUrl','termsUrl'])if(!s[field]){console.log('  PENDING: '+field+' (approved policy required)');pending=true;}
  if(!s.playStoreUrl)console.log('  DEFERRED by owner: Play Store URL');
 }
 if(pending)process.exitCode=2;
}else throw new Error('Usage: node scripts/production.mjs check|build|nginx');
