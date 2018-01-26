import './std-js/deprefixer.js';
import './std-js/shims.js';
import {$, wait, ready, registerServiceWorker} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import {supportsAsClasses} from './std-js/supports.js';
import webShareApi from './std-js/webShareApi.js';
import {
	facebook,
	twitter,
	googlePlus,
	linkedIn,
	reddit,
	gmail,
	email,
} from './std-js/share-config.js';

function hashChangeHandler(event) {
	if (event.oldURL) {
		const oldURL = new URL(event.oldURL);
		if (location.pathname === oldURL.pathname && oldURL.hash.startsWith('#')) {
			const oldTarget = document.getElementById(oldURL.hash.substr(1));
			if (oldTarget instanceof Element && oldTarget.tagName === 'DIALOG') {
				oldTarget.close();
			}
		}
	}

	if (event.newURL) {
		if (location.hash.length !== 0) {
			const target = document.querySelector(':target');
			if (target instanceof Element && target.tagName === 'DIALOG') {
				target.showModal();
			}
		}
	}
}

webShareApi(facebook, twitter, googlePlus, linkedIn, reddit, gmail, email);

ready().then(async () => {
	if (location.hash.length !== 0) {
		const target = document.querySelector(':target');
		if (target instanceof Element && target.tagName === 'DIALOG') {
			target.showModal();
		}
	}

	window.addEventListener('hashchange', hashChangeHandler);

	const $doc = $(document.documentElement);
	$('[data-service-worker]').each(el => registerServiceWorker(el.dataset.serviceWorker));

	if (Navigator.prototype.hasOwnProperty('share')) {
		$('[data-share]').attr({hidden: false});
	}

	$doc.replaceClass('no-js', 'js');
	$doc.toggleClass('offline', ! navigator.onLine);
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);
	$doc.keypress(event => event.key === 'Escape' && $('dialog[open]').close());
	Mutations.init();

	$('[data-open]').click(event => {
		event.preventDefault();
		const url = new URL(event.target.dataset.open, location.origin);
		window.open(url);
	});

	$('dialog').on('close', event => {
		const target = document.querySelector(':target');
		console.log(event);
		if (event.target === target) {
			if (history.length !== 1) {
				history.back();
			} else {
				location.hash = '';
			}
		}
	});

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
});
