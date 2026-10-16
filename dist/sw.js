/* Cache restrito ao diretório do aplicativo, inclusive quando publicado em /repositorio/. */
const CACHE='obras-lagos-20261016-v2';
const CORE=['./','./index.html','./styles.css','./data.js','./domain.js','./app.js','./pwa.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('obras-lagos-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
 if(request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 if(request.mode==='navigate'){event.respondWith(fetch(request).then(response=>response.ok?response:caches.match(new URL('index.html',scope).href)).catch(()=>caches.match(new URL('index.html',scope).href)));return;}
 if(!CORE.some(name=>new URL(name,scope).pathname===url.pathname))return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
