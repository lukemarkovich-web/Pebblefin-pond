const CACHE='pebblefin-shell-v083-environment-authentic-final';
const ASSETS=['./pebblefin-icon-192.png','./pebblefin-icon-512.png','./apple-touch-icon.png','./manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})());});
self.addEventListener('fetch',e=>{const r=e.request;if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return;}e.respondWith(fetch(r).then(resp=>{if(r.method==='GET'&&resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(r,copy));}return resp;}).catch(()=>caches.match(r)));});
