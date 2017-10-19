import {$, wait} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import deprefix from './std-js/deprefixer.js';
import './std-js/shims.js';
import {supportsAsClasses} from './std-js/support_test.js';
import shareShim from './share-shim.js';
import {facebook, twitter, googlePlus, linkedIn, reddit} from './share-config.js';

shareShim(facebook, twitter, linkedIn, googlePlus, reddit);

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

function shareHandler(event) {
	event.preventDefault();
	event.stopPropagation();
	if (! this.dataset.hasOwnProperty('share')) {
		this.removeEventListener('click', shareHandler);
		return;
	}

	const containerEl = this.dataset.share === '' ? this : document.querySelector(this.dataset.share);
	let url = location.href, text = '', title = document.title;

	if (containerEl instanceof HTMLImageElement) {
		url = containerEl.src;
		title = containerEl.alt;
	} else if (containerEl instanceof HTMLAnchorElement) {
		url = containerEl.href;
		title = containerEl.title;
		text = containerEl.textContent;
	} else if (containerEl instanceof Element) {
		const urlEl = containerEl.closest('[itemtype]')
			.querySelector('[itemprop="url"], [rel="canonical"]');
		const titleEl = containerEl.closest('[itemtype]')
			.querySelector('[itemprop="name"],[itemprop="headline"]');
		const textEl = containerEl.closest('[itemtype]')
			.querySelector('[itemprop="description"], [name="description"]');

		if (urlEl instanceof Element) {
			if (urlEl.hasAttribute('content')) {
				url = urlEl.getAttribute('content');
			} else if (urlEl.hasAttribute('href')) {
				url = urlEl.href;
			} else {
				url = urlEl.textContent;
			}
		}

		if (titleEl instanceof Element) {
			if (titleEl.hasAttribute('content')) {
				title = titleEl.getAttribute('content');
			} else {
				title = titleEl.textContent;
			}
		}

		if (textEl instanceof Element) {
			if (textEl.hasAttribute('content')) {
				text = textEl.getAttribute('content');
			} else {
				text = textEl.textContent;
			}
		}
	}

	navigator.share({url: new URL(url, location.origin).toString(), title, text}).catch(console.error);
}

function shareRegister(base = document) {
	if (Navigator.prototype.hasOwnProperty('share')) {
		$('[data-share]', base).attr({hidden: false});
		$('[data-share]', base).click(shareHandler);
	} else {
		$('[data-share]').remove();
	}
}

async function readyHandler() {
	const $doc = $(document.documentElement);
	shareRegister(document);
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

	$('header .animation-paused, body > .animation-paused').each(async (el, n) => {
		await wait(n * 200);
		el.classList.remove('animation-paused');
	});

	if ('IntersectionObserver' in window) {
		$('main .animation-paused').intersect((entries, observer) => {
			entries.filter(entry => entry.isIntersecting).forEach(async (entry, n) => {
				observer.unobserve(entry.target);
				await wait(n * 200);
				entry.target.classList.remove('animation-paused');

			});
		}, {rootMargin: '50%'});
	} else {
		await $('main .animation-paused').each(async (el, n) => {
			await wait(n * 200);
			el.classList.remove('animation-paused');
		});
	}
}

$(self).ready(readyHandler, {once: true});
