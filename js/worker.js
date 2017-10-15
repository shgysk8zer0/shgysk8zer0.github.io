const config = {
	version: '2.0.1',
	caches: [
		'/',
		'/js/index.min.js',
		'/css/styles/index.min.css',
		'/img/icons.svg',
		'/img/logos/html5.svg',
		'/img/logos/css3.svg',
		'/img/logos/javascript.svg',
		'/img/logos/svg.svg',
		'/img/logos/PHP.svg',
		'/img/logos/MySQL.svg',
		'https://cdn.polyfill.io/v2/polyfill.min.js',
		'https://media.githubusercontent.com/media/shgysk8zer0/awesome-rss/master/screenshot.png',
		'/img/logos/super-user.svg',
		'https://i.imgur.com/qdnVcJA.png',
		'https://i.imgur.com/j8gd6rW.png',
		'https://i.imgur.com/OXN2pCz.png',
		'https://i.imgur.com/WIaJgfx.png',
		'https://i.imgur.com/c1hLkNj.png',
	],
};

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(config.version).then(cache => {
			return cache.addAll(config.caches.map(url => new URL(url, location.origin)));
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(caches.match(event.request).then(async response => {
		// caches.match() always resolves
		// but in case of success response will have value
		if (response !== undefined) {
			return response;
		} else {
			try {
				const cache = await caches.open(config.version);
				const resp = await fetch(event.request);
				const responseClone = resp.clone();
				cache.put(event.request, responseClone);
				return resp;
			} catch(err) {
				return false;
			}
		}
	}));
});
