const C="suivi-clients-v2";
const FILES=["./","./index.html","./manifest.webmanifest","./apple-touch-icon.png"];
const XLSX_URL="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all([c.addAll(FILES),fetch(XLSX_URL,{mode:"no-cors"}).then(r=>c.put(XLSX_URL,r)).catch(()=>{})])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n}).catch(()=>caches.match("./index.html"))))});
