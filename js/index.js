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
	$doc.replaceClass('no-js', 'js');
	$doc.toggleClass('offline', ! navigator.onLine);
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);
	$doc.keypress(event => event.key === 'Escape' && $('dialog[open]').close());
	$('[data-service-worker]').each( el => registerServiceWorker(el).then(console.log));
	Mutations.init();
	supportsAsClasses(...document.documentElement.dataset.supportTest.split(',').map(test => test.trim()));
}

$(self).ready(readyHandler, {once: true});
