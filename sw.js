// Nome do cache (controle de versão)
const cachePWA = 'cache-v2'
const files_to_cache = [
  '/index.html',  
  '/style.css',
  '/script.js',
  '/sw.js',
  '/manifest.json',
  '/data/cards.json',
  '/assets/cherries.png',
  '/assets/chili.png',
  '/assets/grapes.png',
  '/assets/lemon.png',
  '/assets/orange.png',
  '/assets/pineapple.png',
  '/assets/strawbery.png',
  '/assets/tomato.png',
  '/assets/watermelon.png',
  '/assets/screenshot1.png',
  '/assets/screenshot.png',
]
// Arquivos a serem armazenados em cache
// Todos os arquivos devem ser adicionados ao vetor (exceto o manifesto)

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(cachePWA)
          .then((cache) => {
              console.log('Cache opened successfully');
              return cache.addAll(files_to_cache);
          })
          .then(() => {
              console.log('All files added to cache successfully');
          })
          .catch((error) => {
              console.error('Error adding files to cache:', error);
          })
  );
});

// Interceptando as solicitações de rede e servindo arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o arquivo está no cache, serve o arquivo do cache
        if (response) {
          return response
        }
        // Caso contrário, faz uma solicitação de rede
        return fetch(event.request)
      })
  )
})

// O Periodic Sync permite que as aplicações web alertem seu Service Worker para fazer atualizações em um intervalo de tempo periodico
// Neste caso a atualização ocorre no periodo de 1 dia
async function registerPeriodicNewsCheck() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.periodicSync.register("get-latest-news", {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch {
    console.log("Periodic Sync could not be registered!");
  }
}