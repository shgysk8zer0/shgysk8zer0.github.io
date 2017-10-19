if (! Navigator.prototype.hasOwnProperty('share')) {
	Navigator.prototype.share = ({
		text = null,
		title = null,
		url = null
	} = {}) => {
		const shares = {
			facebook: {
				url: new URL('https://www.facebook.com/sharer/sharer.php?u&t'),
				icon: new URL('/img/logos/Facebook.svg', location.origin),
				text: 'Facebook',
			},
			twitter: {
				url: new URL('https://twitter.com/intent/tweet/?text&url'),
				icon: new URL('/img/logos/twitter.svg', location.origin),
				text: 'Twitter',
			},
			googlePlus: {
				url: new URL('https://plus.google.com/share/?url'),
				icon: new URL('/img/logos/Google_plus.svg', location.origin),
				text: 'Google+',
			},
			linkedIn: {
				url: new URL('https://www.linkedin.com/shareArticle/?title&summary&url'),
				icon: new URL('/img/logos/linkedin.svg', location.origin),
				text: 'LinkedIn',
			},
			reddit: {
				url: new URL('https://www.reddit.com/submit/?url&title'),
				icon: new URL('/img/logos/Reddit.svg', location.origin),
				text: 'Reddit',
			},
			// pinterest:   'https://www.pinterest.com/pin/create/button/',
		};

		const size = 64;
		const dialog = document.createElement('dialog');
		const header = document.createElement('header');
		const close = document.createElement('button');
		const body = document.createElement('div');
		const msg = document.createElement('b');
		const font = 'Roboto, Helvetica, "Sans Seriff"';

		return new Promise((resolve, reject) => {
			if (text === null && title === null && url === null) {
				reject(new TypeError('No known share data fields supplied. If using only new fields (other than title, text and url), you must feature-detect them first.'));
			} else {
				close.style.setProperty('float', 'right');
				msg.style.setProperty('display', 'block');
				msg.textContent = 'Share via';
				close.title = 'Close dialog';
				msg.style.setProperty('font-family', font);
				msg.style.setProperty('font-size', '24px');

				header.append(close, msg);
				close.append('x');
				close.style.setProperty('font-family', font);
				close.style.setProperty('font-weight', 'bold');
				close.style.setProperty('font-size', '16px');

				close.addEventListener('click', () => {
					dialog.close();
					dialog.remove();
				});

				dialog.append(header);

				Object.entries(shares).forEach(([key, share]) => {
					const link = document.createElement('a');
					const icon = new Image(size, size);

					if (share.url.searchParams.has('url')) {
						share.url.searchParams.set('url', url);
					} else if (share.url.searchParams.has('u')) {
						share.url.searchParams.set('u', url);
					}

					if (share.url.searchParams.has('title')) {
						share.url.searchParams.set('title', title);
					} else if (share.url.searchParams.has('t')) {
						share.url.searchParams.set('t', title);
					}

					if (share.url.searchParams.has('text')) {
						share.url.searchParams.set('text', text);
					}

					link.style.setProperty('display', 'inline-block');
					link.style.setProperty('margin', '0.3em');
					link.style.setProperty('text-decoration', 'none');
					link.style.setProperty('color', '#626262');
					link.style.setProperty('text-align', 'center');
					link.style.setProperty('font-family', font);
					link.style.setProperty('font-size', '20px');
					link.target = '_blank';
					icon.src = shares[key].icon.toString();
					link.href = share.url.toString();
					link.title = key;
					link.append(icon, document.createElement('br'), share.text);
					body.append(link);
				});

				dialog.append(body);
				document.body.append(dialog);
				dialog.showModal();
				dialog.style.setProperty('display', 'block');
				dialog.style.setProperty('position' ,'fixed');
				dialog.style.setProperty('background', '#fefefe');
				dialog.style.setProperty('top', '0');
				dialog.style.setProperty('bottom', 'auto');
				dialog.style.setProperty('left', '0');
				dialog.style.setProperty('right', '0');
				dialog.style.setProperty('transform', 'none');
				dialog.style.setProperty('border-radius', '0 0 5px 5px');
				dialog.style.setProperty('max-height', '500px');
				header.style.setProperty('height', '47px');
				header.style.setProperty('line-height', '47px');
				header.style.setProperty('color', '#232323');
				header.style.setProperty('box-shadow', 'none');
				header.style.setProperty('border-bottom', '1px solid #d5d5d5');

				if (CSS.supports('width', 'fit-content')) {
					dialog.style.setProperty('width', 'fit-content');
				} else if (CSS.supports('width', '-moz-fit-content')) {
					dialog.style.setProperty('width', '-moz-fit-content');
				} else if (CSS.supports('width', '-webkit-fit-content')) {
					dialog.style.setProperty('width', '-webkit-fit-content');
				} else {
					dialog.style.setProperty('min-width', '320px');
				}

				if (Element.prototype.hasOwnProperty('animate')) {
					const rects = dialog.getClientRects()[0];
					dialog.animate([
						{top: `-${rects.height}px`},
						{top: 0}
					], {
						duration: 400,
						easing: 'ease-out',
						fill: 'both',
					});
				}


				dialog.addEventListener('close', () => {
					reject(new DOMException('Share canceled'));
				});

				[...dialog.querySelectorAll('a')].forEach(link => {
					link.addEventListener('click', function(event) {
						event.preventDefault();
						window.open(this.href);
						resolve();
						dialog.close();
						dialog.remove();
					});
				});
			}
		});
	};
}
