import {$, ready, imgur, wait} from './std-js/functions.js';

ready().then(async () => {
	function* getThumbs(gallery) {
		while(true) {
			for (const thumb of $('.thumbnails [data-imgur]', gallery)) {
				yield thumb;
			}
		}
	}

	async function setGalleryImage(thumb, gallery) {
		gallery.classList.add('cursor-wait', 'no-pointer-events');
		const thumbnails = thumb.closest('.thumbnails');
		const current = gallery.querySelector('.current');
		$('picture', thumbnails).toggleClass('current-thumb', thumbnail => thumbnail === thumb);

		gallery.querySelector('figcaption').textContent = thumb.dataset.caption;
		const pic = await imgur(thumb.dataset.imgur, {
			sizes: ['(min-width: 700px) 75vw', '100vw'],
		});
		pic.dataset.imgur = thumb.dataset.imgur;
		pic.classList.add('current', 'animation-fill-both', 'animation-speed-normal', 'animation-ease-in-out', 'fadeIn');
		gallery.classList.remove('cursor-wait', 'no-pointer-events');

		current.classList.add('animation-fill-both', 'animation-speed-normal', 'animation-ease-in-out');
		current.classList.remove('fadeIn');
		current.classList.add('fadeOut');
		await wait(400);
		current.replaceWith(pic);
	}

	$('.gallery').each(async gallery => {
		const thumbs = getThumbs(gallery);
		let thumb = thumbs.next().value;

		$('button.next', gallery).click(() => {
			thumb = thumbs.next().value;
			setGalleryImage(thumb, gallery);
		});

		$('button.prev', gallery).click(() => {
			const prev = thumb.previousElementSibling || thumb.parentElement.lastElementChild;
			if (thumb instanceof Element && prev instanceof Element) {
				while (prev !== thumb) {
					thumb = thumbs.next().value;
				}
				setGalleryImage(thumb, gallery);
			}
		});

		$('.thumbnails picture:first-of-type').addClass('current-thumb');
		$('.thumbnails [data-imgur] img', gallery).click(event => {
			const clicked = event.target.closest('.thumbnails [data-imgur]');
			setGalleryImage(clicked, gallery);
			while(thumb !== clicked) {
				thumb = thumbs.next().value;
			}
		});

		/*eslint no-constant-condition: "off" */
		while(true) {
			await wait(6000);
			if (document.visibilityState !== 'hidden') {
				thumb = thumbs.next().value;
				await setGalleryImage(thumb, gallery);
			}
		}
	});
});
