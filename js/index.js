import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import deprefix from './std-js/deprefixer.js';
import './std-js/shims.js';
import {supportsAsClasses} from './std-js/support_test.js';

deprefix();

async function registerServiceWorker(el) {
	try {
		if (! Navigator.prototype.hasOwnProperty('serviceWorker')) {
			throw new Error('Service worker not supported');
		}

		const url = new URL(el.dataset.serviceWorker, location.origin);
		const reg = await navigator.serviceWorker.register(url);

		if(reg.installing) {
			console.log('Service worker installing');
		} else if(reg.waiting) {
			console.log('Service worker installed');
		} else if(reg.active) {
			console.log('Service worker active');
		}
	} catch (error) {
		console.error(error);
	}
}

async function readyHandler() {
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	$doc.toggleClass('offline', ! navigator.onLine);
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);
	$doc.keypress(event => event.key === 'Escape' && $('dialog[open]').close());
	supportsAsClasses(...document.documentElement.dataset.supportTest.split(',').map(test => test.trim()));

	$('[data-service-worker]').each(registerServiceWorker).catch(console.error);

	Mutations.init();

	// const resp = await fetch(new URL('portfolio.json', location.href));
	// if (resp.ok) {
	// 	const main = document.querySelector('main');
	// 	const template = document.getElementById('project-template');
	// 	const projects = await resp.json();
	// 	projects.forEach(async project => {
	// 		const card = template.content.cloneNode(true);
	// 		await $('[itemtype]', card).attr({itemscope: true});
	// 		await $('[itemprop="name"]', card).text(project.name);
	// 		await $('[itemprop="applicationCategory"]', card).text(project.applicationCategory);
	// 		await $('[itemprop="keywords"]', card).text(project.keywords);
	// 		await $('[itemprop="screenshot"]', card).attr({src: project.screenshot});
	// 		await $('[itemprop="description"]', card).text(project.description);
	// 		await $('[itemprop="url"]', card).attr({href: project.url});
	// 		await $('[itemprop="operatingSystem"]', card).attr({content: project.operatingSystem});
	// 		main.append(card);
	// 	});
	// } else {
	// 	throw new Error(`${resp.url} [${resp.status} ${resp.statusText}]`);
	// }
}

$(self).ready(readyHandler, {once: true});
