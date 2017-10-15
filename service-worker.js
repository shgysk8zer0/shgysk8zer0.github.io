const config = {
	version: '2.1.2',
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
	ignored: [],
};

addEventListener('install', async () => {
	const cache = await caches.open(config.version);
	await cache.addAll(config.caches);
});

addEventListener('activate', () => {
	clients.claim();
});

addEventListener('fetch', event => {
	if (event.request.method !== 'GET' || config.ignored.includes(event.request.url)) {
		return;
	}

	event.respondWith(async function() {
		const cache = await caches.open(config.version);
		const response = await cache.match(event.request);

		if (response instanceof Response) {
			return response;
		} else {
			try {
				const fetched = await fetch(event.request);
				const respClone = fetched.clone();
				await cache.put(event.request, respClone);
				return fetched;
			} catch(error) {
				console.error(error);
			}
		}
	}());
});
