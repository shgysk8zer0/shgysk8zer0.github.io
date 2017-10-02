if (document.createElement('dialog') instanceof HTMLUnknownElement && !HTMLElement.prototype.hasOwnProperty('open')) {
	HTMLElement.prototype.show = function() {
		this.open = true;
	};

	HTMLElement.prototype.close = function() {
		this.open = false;
	};

	Object.defineProperty(HTMLElement.prototype, 'open', {
		set: function(open) {
			if (open) {
				this.setAttribute('open', '');
			} else {
				this.removeAttribute('open');
				delete this.style.position;
				const next = this.nextElementSibling;
				if (next instanceof HTMLElement && next.matches('.backdrop')) {
					next.remove();
				}
			}
		},
		get: function() {
			return this.hasAttribute('open');
		}
	});
}
if (! document.createElement('dialog').hasOwnProperty('showModal')) {
	HTMLElement.prototype.showModal = function() {
		this.open = true;
		const backdrop = document.createElement('div');
		backdrop.classList.add('backdrop');
		backdrop.style.position = 'fixed';
		backdrop.style.width = '100vw';
		backdrop.style.height = '100vh';
		backdrop.style.top = 0;
		backdrop.style.bottom = 0;
		backdrop.style.left = 0;
		backdrop.style.right = 0;
		backdrop.style.backgroundColor = 'rgba(0,0,0,0.7)';
		this.after(backdrop);
	};
}
