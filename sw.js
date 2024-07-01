if ('serviceWorker' in navigator) {
    // Nome do cache (controle de versão)
    const cachePWA = 'cache-v1'
    // Arquivos a serem armazenados em cache
    // Todos os arquivos devem ser adicionados ao vetor(exceto o manifesto)
    const urlsToCache = [
      './',
      './index.html',  
      './style.css',
      './script.js',
      './sw.js',
      './manifest.json',
      './data/cards.json',
      './assets/cherries.png',
      './assets/chili.png',
      './assets/grapes.png',
      './assets/lemon.png',
      './assets/orange.png',
      './assets/pineapple.png',
      './assets/strawbery.png',
      './assets/tomato.png',
      './assets/watermelon.png',
    ]
    
    // Instalando o Service Worker e armazenando os arquivos no cache
    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(cachePWA)
          .then(cache => (cache.addAll(urlsToCache))),
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
    
    // O periodic sync permite que o app alerte o service worker para que atualize de tempos em tempos, no periodo de 1 minuto
    async function registerPeriodicNewsCheck() {
    const registration = await navigator.serviceWorker.ready;
    try {
      await registration.periodicSync.register("Periodic Sync registrado com sucesso!", {
        minInterval: 1 * 60 * 1000,
      });
    } catch {
      console.log("Periodic Sync não registrado!");
    }
  }

}