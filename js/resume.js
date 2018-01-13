(() => {
	function ready() {
		return new Promise(resolve => {
			if (document.readyState === 'interactive') {
				resolve();
			} else {
				document.addEventListener('DOMContentLoaded', () => resolve(), {once: true});
			}
		});
	}

	function $(selector, base = document) {
		const items = Array.from(base.querySelectorAll(selector));
		if (base instanceof HTMLElement && base.matches(selector)) {
			items.unshift(base);
		}
		return items;
	}

	function scrollTo(id) {
		document.getElementById(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	ready().then(() => {
		$('section').forEach(section => section.hidden = false);
		$('section:empty').forEach(section => section.remove());
		if (document.body.contextMenu instanceof HTMLMenuElement) {
			$('section').forEach(section => {
				const heading = section.querySelector('.section-heading');
				if (heading instanceof HTMLElement) {
					const menuitem = document.createElement('menuitem');
					menuitem.setAttribute('label', heading.textContent);
					menuitem.dataset.scrollTo = section.id;
					menuitem.addEventListener('click', event => scrollTo(event.target.dataset.scrollTo));
					document.body.contextMenu.append(menuitem);
				}
			});
		}
		if (window.print instanceof Function) {
			$('[data-action="print"]').forEach(btn => {
				btn.addEventListener('click', () => print());
				btn.hidden = false;
			});
		}

		if (Navigator.prototype.hasOwnProperty('share')) {
			$('[data-share]').forEach(share => {
				share.removeAttribute('hidden');
				share.addEventListener('click', () => {
					navigator.share({
						url: location.href,
						title: document.title,
						text: document.querySelector('meta[itemprop="description"]').getAttribute('content'),
					});
				});
			});
		}
	}).catch(console.error);
})();
