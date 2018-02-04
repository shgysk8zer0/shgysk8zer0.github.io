import {$, ready, imgur} from './std-js/functions.js';

ready().then(() => {
	$('.gallery').each(gallery => {
		$('.thumbnails picture:first-of-type').addClass('current-thumb');
		$('.thumbnails [data-imgur]', gallery).click(async event => {
			gallery.classList.add('cursor-wait');
			$('.thumbnails [data-imgur]', gallery).css({
				'pointer-events': 'none',
			});
			const clicked = event.target.closest('.thumbnails [data-imgur]');
			const current = gallery.querySelector('.current').closest('picture');
			const thumbnails = clicked.closest('.thumbnails');

			$('picture', thumbnails).each(thumbnail => {
				thumbnail.classList.toggle('current-thumb', thumbnail === clicked);
			});
			const pic = await imgur(clicked.dataset.imgur, {
				sizes: ['(min-width: 700px) 75vw', '100vw'],
			});
			pic.dataset.imgur = clicked.dataset.imgur;
			pic.classList.add('current');
			current.replaceWith(pic);
			$('.thumbnails [data-imgur]', gallery).css({
				'pointer-events': 'all',
			});
			gallery.classList.remove('cursor-wait');
		});
	});
});
