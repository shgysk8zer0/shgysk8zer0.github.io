import {$} from './std-js/functions.js';
import * as Mutations from './mutations.js';

$(self).ready(async () => {
	Mutations.init();
	$(document.body).watch(Mutations.events, Mutations.options, Mutations.filter);

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
