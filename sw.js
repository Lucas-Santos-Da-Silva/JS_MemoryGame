// Nome do cache (controle de versão)
const cachePWA = 'cache-v1'
// Arquivos a serem armazenados em cache
// Todos os arquivos devem ser adicionados ao vetor(exceto o manifesto)
const urlsToCache = [
  '/',
  '/index.html',  
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/cards.json',
  '/cherries.png',
  '/chili.png',
  '/grapes.png',
  '/lemon.png',
  '/orange.png',
  '/pineapple.png',
  '/strawberry.png',
  '/tomato.png',
  '/watermelon.png',
  '/screenshot.png',
  '/screenshot1.png',
  '/icon.png'
]

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cachePWA)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

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
async function registrarAtualizacaoPeriodica() {
  const registration = await navigator.serviceWorker.ready;
  try {
    
    await registration.periodicSync.register("get-latest-news", {
      minInterval: 12 * 60 * 60 * 1000,
    });
  } catch {
    console.log("Periodic Sync não pode ser registrado.");
  }
}



  

