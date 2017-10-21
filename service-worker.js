const config = {
	version: '3.2.8',
	caches: [
		'/',
		'/js/index.min.js',
		'/css/styles/index.min.css',
		'/img/icons.svg',
		'/img/adwaita-icons/actions/document-open-recent.svg',
		'/img/adwaita-icons/actions/go-top.svg',
		'/img/adwaita-icons/actions/view-pin.svg',
		'/img/logos/PHP.svg',
		'/img/logos/MySQL.svg',
		'/img/logos/super-user.svg',
		'/fonts/acme.woff',
		'/fonts/Alice.woff',
		'/fonts/roboto.woff',
		'/fonts/ubuntu.woff2',
		'https://cdn.polyfill.io/v2/polyfill.min.js',
		'https://media.githubusercontent.com/media/shgysk8zer0/awesome-rss/master/screenshot.png',
		'https://i.imgur.com/qdnVcJA.png',
		'https://i.imgur.com/j8gd6rW.png',
		'https://i.imgur.com/OXN2pCz.png',
		'https://i.imgur.com/WIaJgfx.png',
		'https://i.imgur.com/c1hLkNj.png',
	],
	ignored: [
		'/service-worker.js',
	],
	paths: [
		'/js/',
		'/css/',
		'/img/',
		'/fonts/',
		'/posts/',
	],
};

addEventListener('install', async () => {
	const cache = await caches.open(config.version);
	const keys = await caches.keys();
	await keys.forEach(async key => {
		if (key !== config.version) {
			await caches.delete(key);
		}
	});
	await cache.addAll(config.caches);
	skipWaiting();

});

addEventListener('activate', async () => {
	clients.claim();
	const keys = await caches.keys();
	keys.forEach(async key => {
		if (key !== config.version) {
			await caches.delete(key);
		}
	});
});

addEventListener('fetch', event => {
	function isValid(resp) {
		if (! resp.ok) {
			return false;
		} else {
			const url = new URL(resp.url);
			if (url.origin !== location.origin) {
				return true;
			} else {
				const isHome = ['/', '/index.html', '/index.php'].some(path => url.pathname === path);
				const notIgnored = config.ignored.every(path => url.pathname !== path);
				const allowedPath = config.paths.some(path => url.pathname.startsWith(path));
				const isExternal = url.origin !== location.origin;
				const isGet = resp.method === 'GET';

				return isGet && isHome || isExternal || (allowedPath && notIgnored);
			}
		}
	}

	event.respondWith(async function() {
		const cache = await caches.open(config.version);
		const response = await cache.match(event.request);

		if (response instanceof Response) {
			return response;
		} else if (navigator.onLine) {
			try {
				const fetched = await fetch(event.request);
				if (isValid(fetched)) {
					const respClone = await fetched.clone();
					await cache.put(event.request, respClone);
				}
				return fetched;
			} catch(error) {
				console.error(error);
			}
		}
	}());
});
