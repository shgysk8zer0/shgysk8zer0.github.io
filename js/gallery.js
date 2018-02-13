import {$, ready, imgur, wait} from './std-js/functions.js';

ready().then(async () => {
	function* getThumbs(gallery) {
		/*eslint no-constant-condition: "off" */
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
		const pic = await imgur(thumb.dataset.imgur, {
			sizes: ['(min-width: 700px) 75vw', '100vw'],
			alt: thumb.alt,
		});

		pic.dataset.imgur = thumb.dataset.imgur;
		pic.classList.add('current');

		if (Element.prototype.hasOwnProperty('animate')) {
			await $(current).fadeOut();
			current.replaceWith(pic);
			$(pic).fadeIn();
		} else {
			current.replaceWith(pic);
		}

		gallery.classList.remove('cursor-wait', 'no-pointer-events');
		gallery.querySelector('figcaption').textContent = thumb.dataset.caption;
		$('picture', thumbnails).toggleClass('current-thumb', el => el === thumb);
	}

	$('.gallery').each(async gallery => {
		const thumbs = getThumbs(gallery);
		let thumb = thumbs.next().value;
		const delay = gallery.dataset.hasOwnProperty('delay') ? parseInt(gallery.dataset.delay) : 6000;

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

		$('.thumbnails picture:first-of-type', gallery).addClass('current-thumb');
		$('.thumbnails [data-imgur] img', gallery).click(event => {
			const clicked = event.target.closest('.thumbnails [data-imgur]');
			setGalleryImage(clicked, gallery);
			while(thumb !== clicked) {
				thumb = thumbs.next().value;
			}
		});

		/*eslint no-constant-condition: "off" */
		while(true) {
			await wait(delay);
			if (document.visibilityState !== 'hidden') {
				thumb = thumbs.next().value;
				await setGalleryImage(thumb, gallery);
			}
		}
	});
});
