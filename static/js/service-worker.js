const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/css/base.css',
  '/static/css/hero.css',
  '/static/css/about.css',
  '/static/css/projects.css',
  '/static/css/contacts.css',
  '/static/css/navbar.css',
  '/static/css/terminal.css',
  '/static/css/stats.css',
  '/static/css/timeline.css',
  '/static/js/github-loader.js',
  '/static/js/i18n.js',
  '/static/js/scroll-animations.js',
  '/static/js/carousel.js',
  '/static/js/navbar.js',
  '/static/js/terminal.js',
  '/static/js/theme-toggle.js',
  '/static/js/particles.js',
  '/static/js/project-filter.js',
  '/static/js/i18n-apply.js',
  '/static/js/typewriter.js',
  '/static/js/counters.js',
  '/static/js/timeline.js',
  '/static/js/main.js',
  '/static/icons/icon-192.png',
  '/static/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});