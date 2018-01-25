(function() {
	function ready() {
		return new Promise(function(resolve) {
			if (document.readyState === 'interactive') {
				resolve();
			} else {
				document.addEventListener('DOMContentLoaded', function() {
					resolve();
				}, {once: true});
			}
		});
	}


	function $(selector, base) {
		base = base || document;
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

	return ready().then(function() {
		if (document.body.contextMenu instanceof HTMLMenuElement) {
			$('section').forEach(function(section) {
				var heading = section.querySelector('.section-heading');
				if (heading instanceof HTMLElement) {
					var menuitem = document.createElement('menuitem');
					menuitem.setAttribute('label', heading.textContent);
					menuitem.dataset.scrollTo = section.id;
					menuitem.addEventListener('click', function(event) {
						scrollTo(event.target.dataset.scrollTo);
					});
					document.body.contextMenu.append(menuitem);
				}
			});
		}

		$('[data-click="print"]').forEach(function(btn) {
			btn.addEventListener('click', function() {
				print();
			});
		});

		if (Navigator.prototype.hasOwnProperty('share')) {
			$('[data-share]').forEach(function(share) {
				share.removeAttribute('hidden');
				share.addEventListener('click', function() {
					navigator.share({
						url: location.href,
						title: document.title,
						text: document.querySelector('meta[itemprop="description"]').getAttribute('content'),
					});
				});
			});
		}
	});
})().catch(console.error);
