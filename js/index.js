import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import deprefix from './std-js/deprefixer.js';
import './std-js/shims.js';
import {supportsAsClasses} from './std-js/support_test.js';

deprefix();

async function registerServiceWorker(el) {
	return new Promise(async (resolve, reject) => {
		try {
			if (! Navigator.prototype.hasOwnProperty('serviceWorker')) {
				throw new Error('Service worker not supported');
			} else if (! navigator.onLine) {
				throw new Error('Offline');
			}

			const url = new URL(el.dataset.serviceWorker, location.origin);
			const reg = await navigator.serviceWorker.register(url, {scope: '/'});

			if (navigator.onLine) {
				reg.update();
			}

			reg.addEventListener('updatefound', event => resolve(event.target));
			reg.addEventListener('install', event => resolve(event.target));
			reg.addEventListener('activate', event => resolve(event.target));
			reg.addEventListener('error', event => reject(event.target));
			reg.addEventListener('fetch', console.info);
		} catch (error) {
			reject(error);
		}
	});
}

async function readyHandler() {
	const $doc = $(document.documentElement);
	if (navigator.share) {
		$('[data-share]').attr({hidden: false});
		$('[data-share]').click(async function(event) {
			event.preventDefault();
			const containerEl = this.dataset.share === '' ? this : document.querySelector(this.dataset.share);
			const urlEl = containerEl.closest('[itemtype]').querySelector('[itemprop="url"], [rel="canonical"]');
			const titleEl = containerEl.closest('[itemtype]').querySelector('[itemprop="name"],[itemprop="headline"]');
			const textEl = containerEl.closest('[itemtype]').querySelector('[itemprop="description"], [name="description"]');
			let url, text, title;
			if (urlEl.hasAttribute('content')) {
				url = urlEl.getAttribute('content');
			} else if (urlEl.hasAttribute('href')) {
				url = urlEl.href;
			} else {
				url = urlEl.textContent;
			}

			if (titleEl.hasAttribute('content')) {
				title = titleEl.getAttribute('content');
			} else {
				title = titleEl.textContent;
			}

			if (textEl.hasAttribute('content')) {
				text = textEl.getAttribute('content');
			} else {
				text = textEl.textContent;
			}

			navigator.share({url, title, text});
		});
	} else {
		$('[data-share]').remove();
	}
	$doc.replaceClass('no-js', 'js');
	$doc.toggleClass('offline', ! navigator.onLine);
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);
	$doc.keypress(event => event.key === 'Escape' && $('dialog[open]').close());
	$('[data-service-worker]').each( el => registerServiceWorker(el).then(console.log));
	Mutations.init();
	supportsAsClasses(...document.documentElement.dataset.supportTest.split(',').map(test => test.trim()));

	if (document.head.dataset.hasOwnProperty('jekyllData')) {
		console.log(JSON.parse(decodeURIComponent(document.head.dataset.jekyllData)));
	}
}

$(self).ready(readyHandler, {once: true});
