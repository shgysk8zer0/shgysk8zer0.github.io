// 2017-11-02 16:19
const config = {
	version: '3.2.15',
	caches: [
		// Main assets
		'/',
		'/js/index.min.js',
		'/css/styles/index.min.css',
		'/img/icons.svg',
		'/img/favicon.svg',

		// Nav menu icons
		'/img/adwaita-icons/actions/document-open-recent.svg',
		'/img/adwaita-icons/actions/go-top.svg',
		'/img/adwaita-icons/actions/view-pin.svg',
		'/img/adwaita-icons/places/folder-publicshare.svg',

		// Logos
		'/img/logos/super-user.svg',
		'/img/logos/css3.svg',
		'/img/logos/PHP.svg',
		'/img/logos/svg.svg',
		'/img/logos/Facebook.svg',
		'/img/logos/twitter.svg',
		'/img/logos/linkedin.svg',
		'/img/logos/Google_plus.svg',
		'/img/logos/Reddit.svg',

		// Fonts
		'/fonts/acme.woff',
		'/fonts/Alice.woff',
		'/fonts/roboto.woff',
		'/fonts/ubuntu.woff2',

		// External Resources
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
		'/manifest.json',
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

addEventListener('activate', event => {
	event.waitUntil( (async () => {
		clients.claim();
		const keys = await caches.keys();
		keys.forEach(async key => {
			if (key !== config.version) {
				await caches.delete(key);
			}
		});
	})());
});

addEventListener('fetch', event => {
	function isValid(resp) {
		try {
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

					return isHome || isExternal || (allowedPath && notIgnored);
				}
			}
		} catch(err) {
			console.error(err);
			return false;
		}
	}

	async function get(request) {
		const cache = await caches.open(config.version);
		const cached = await cache.match(request);

		if (navigator.onLine) {
			const fetched = fetch(request).then(async resp => {
				if (resp.ok && isValid(resp)) {
					const respClone = await resp.clone();
					await cache.put(event.request, respClone);
					return resp;
				} else if (resp.ok) {
					return resp;
				} else {
					throw new Error(`${resp.url} [${resp.status} ${resp.statusText}]`);
				}
			});
			if (cached instanceof Response) {
				return cached;
			} else {
				return fetched;
			}
		} else {
			return cached;
		}
	}

	if (event.request.method !== 'GET') {
		return;
	}

	event.respondWith(get(event.request));
});
