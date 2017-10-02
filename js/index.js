import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import deprefix from './std-js/deprefixer.js';
import './shims.js';

deprefix();

async function readyHandler() {
	Mutations.init();
	document.body.classList.replace('no-js', 'js');
	document.body.classList.toggle('offline', ! navigator.onLine);
	$(document.body).watch(Mutations.events, Mutations.options, Mutations.filter);

	const resp = await fetch(new URL('portfolio.json', location.href));
	if (resp.ok) {
		const main = document.querySelector('main');
		const template = document.getElementById('project-template');
		const projects = await resp.json();
		projects.forEach(project => {
			const card = template.content.cloneNode(true);
			card.querySelector('[itemprop="name"]').textContent = project.name;
			card.querySelector('[itemprop="image"]').src = project.image;
			card.querySelector('[itemprop="description"]').textContent = project.description;
			card.querySelector('[itemprop="url"]').href = project.url;
			card.querySelector('[itemtype]').setAttribute('itemscope', '');
			main.appendChild(card);
		});
	} else {
		throw new Error(`${resp.url} [${resp.status} ${resp.statusText}]`);
	}
}

$(self).ready(readyHandler, {once: true});
