import {$} from './std-js/functions.js';
import * as Mutations from './mutations.js';

$(self).ready(async () => {
	Mutations.init();
	document.body.classList.replace('no-js', 'js');
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

}, {once: true});
$(self).load(() => $('main').intersect((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			observer.unobserve(entry.target);
			$('section', entry.target).each((node, i) => {
				node.animate([
					{
						transform: 'translate(50vw, 100vh) scale(0) rotate(180deg)',
						boxShadow: '3rem 3rem 3rem black'
					},
					null
				], {
					duration: 800,
					delay: i * 300,
					fill: 'backwards'
				});
				node.hidden = false;
			});
		}
	});
}), {once: true});
