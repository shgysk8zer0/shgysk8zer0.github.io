import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import deprefix from './std-js/deprefixer.js';
import './shims.js';

deprefix();

async function readyHandler() {
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	$doc.toggleClass('offline', ! navigator.onLine);
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);

	Mutations.init();

	const resp = await fetch(new URL('portfolio.json', location.href));
	if (resp.ok) {
		const main = document.querySelector('main');
		const template = document.getElementById('project-template');
		const projects = await resp.json();
		projects.forEach(async project => {
			const card = template.content.cloneNode(true);
			await $('[itemtype]',card).attr({itemscope: null});
			await $('[itemprop="name"]', card).text(project.name);
			await $('[itemprop="keywords"]', card).text(project.keywords);
			await $('[itemprop="image"]', card).attr({src: project.image});
			await $('[itemprop="description"]', card).text(project.description);
			await $('[itemprop="url"]', card).attr({href: project.url});
			main.append(card);
		});
	} else {
		throw new Error(`${resp.url} [${resp.status} ${resp.statusText}]`);
	}
}

$(self).ready(readyHandler, {once: true});
