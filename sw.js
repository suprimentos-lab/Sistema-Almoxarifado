// Service worker do app Virtus · Almoxarifado.
// Guarda só a "casca" do app (tela de abertura, ícones), para ele ser instalável
// e abrir mesmo sem internet mostrando o aviso de conexão. O sistema em si
// (Apps Script) NUNCA é guardado aqui: sempre vem atualizado do Google.
// Ao mudar algum arquivo do app, aumente o número da versão abaixo.
const VERSAO = 'virtus-almox-v1';
const CASCA = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/logo-abertura.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(VERSAO).then(function(c){ return c.addAll(CASCA); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys()
      .then(function(nomes){ return Promise.all(nomes.filter(function(n){ return n !== VERSAO; }).map(function(n){ return caches.delete(n); })); })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return; // Google/Apps Script: direto da rede
  // Casca: tenta a rede primeiro (pega atualizações) e cai no cache se estiver offline.
  e.respondWith(
    fetch(e.request)
      .then(function(resp){
        const copia = resp.clone();
        caches.open(VERSAO).then(function(c){ c.put(e.request, copia); });
        return resp;
      })
      .catch(function(){
        return caches.match(e.request).then(function(r){ return r || caches.match('./index.html'); });
      })
  );
});
