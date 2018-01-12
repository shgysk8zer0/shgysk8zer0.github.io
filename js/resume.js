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

	function formatDate(date, fallback = 'Present') {
		const months = [
			'Jan.',
			'Feb',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Aug.',
			'Sep',
			'Oct',
			'Nov.',
			'Dec.'
		];

		if (date) {
			const time = new Date(date);
			return `${months[time.getMonth()]}, ${time.getFullYear()}`;
		} else {
			return fallback;
		}


	}

	function $(selector, base = document) {
		const items = Array.from(base.querySelectorAll(selector));
		if (base instanceof HTMLElement && base.matches(selector)) {
			items.unshift(base);
		}
		return items;
	}

	function getTemplate(id) {
		return new Promise(resolve => {
			const template = document.getElementById(`${id}-template`);
			resolve(template.content.cloneNode(true));
		});
	}

	function populateHighlights(highlights) {
		return getTemplate('highlights').then(template => {
			const list = template.querySelector('.highlights');
			highlights.forEach(item => {
				const li = document.createElement('li');
				li.innerHTML = item;
				list.append(li);
			});
			document.getElementById('highlights').append(template);
		});
	}

	function populateEmployment(employers) {
		return Promise.all(employers.map(employer => {
			return getTemplate('employment').then(template => {
				const dutyList = template.querySelector('.duties');
				$('[data-field]', template).forEach(field => {
					if (employer.hasOwnProperty(field.dataset.field)) {
						if (field.tagName === 'TIME') {
							field.innerHTML = formatDate(employer[field.dataset.field]);
						} else {
							field.innerHTML = employer[field.dataset.field];
						}
					} else {
						field.remove();
					}
				});
				employer.duties.forEach(duty => {
					const li = document.createElement('li');
					li.innerHTML = duty;
					dutyList.append(li);
				});
				return template;
			});
		})).then(experiences => {
			const section = document.getElementById('experience');
			experiences.forEach(exp => section.append(exp));
		});
	}

	function populateContact(contact) {
		return getTemplate('contact').then(template => {
			const url = new URL(contact.url);
			const tel = new URL(`tel:${contact.telephone}`);
			const email = new URL(`mailto:${contact.email}`);
			const urlEl = template.querySelector('[itemprop="url"]');
			const telEl = template.querySelector('[itemprop="telephone"]');
			const emailEl = template.querySelector('[itemprop="email"]');

			template.querySelector('[itemprop="givenName"]').textContent = contact.name.first;
			template.querySelector('[itemprop="familyName"]').textContent = contact.name.last;
			template.querySelector('[itemprop="addressRegion"]').textContent = contact.address.city;
			template.querySelector('[itemprop="addressLocality"]').textContent = contact.address.state;
			template.querySelector('[itemprop="jobTitle"]').textContent = contact.jobTitle;
			urlEl.href = url;
			urlEl.textContent = url.host;
			if (url.pathname !== '/') {
				urlEl.textContent += url.pathname;
			}
			telEl.href = tel;
			telEl.textContent = tel.pathname.replace(/[^\d-]/i, '');
			telEl.setAttribute('content', tel.pathname);
			emailEl.href = email;
			emailEl.textContent = email.pathname;
			emailEl.setAttribute('content', emailEl.textContent);
			document.querySelector('.contact-info').append(template);
		});
	}

	function populateSummary(summary = {}) {
		return getTemplate('summary').then(template => {
			$('[data-field]', template).forEach(field => {
				if (summary.hasOwnProperty(field.dataset.field)) {
					field.innerHTML = summary[field.dataset.field];
				} else {
					field.remove();
				}
			});
			document.getElementById('summary').append(template);
		});
	}

	function populateEduation(schools) {
		return Promise.all(schools.map(school => {
			return getTemplate('education').then(template => {
				const studies = template.querySelector('.areas-studied');
				const awards = template.querySelector('.awards');
				$('[data-field]', template).forEach(field => {
					if (school.hasOwnProperty(field.dataset.field)) {
						if (field.tagName === 'TIME') {
							field.innerHTML = formatDate(school[field.dataset.field]);
							field.setAttribute('datetime', school[field.dataset.field]);
						} else {
							field.innerHTML = school[field.dataset.field];
						}
					} else {
						field.remove();
					}
				});

				if (school.hasOwnProperty('studies')) {
					school.studies.forEach(item => {
						const li = document.createElement('li');
						li.innerHTML = item;
						studies.append(li);
					});
				} else {
					studies.remove();
				}

				if (school.hasOwnProperty('awards')) {
					school.awards.forEach(award => {
						const li = document.createElement('li');
						li.innerHTML = `${award.title} (${award.years.join(', ')})`;
						awards.append(li);
					});
				} else {
					awards.remove();
				}

				document.getElementById('education').append(template);
			});
		}));
	}

	function getData() {
		const loc = new URL(location.href);
		const url = new URL(
			loc.searchParams.has('resume')
				? `${loc.searchParams.get('resume')}.json`
				: 'generic.json',
			document.baseURI
		);

		return fetch(url).then(resp => {
			return resp.json();
		});
	}

	ready().then(getData)
		.then(data => {
			return Promise.all([
				populateSummary(data.summary),
				populateContact(data.contact),
				populateHighlights(data.highlights),
				populateEmployment(data.employment),
				populateEduation(data.education),
			]);
		})
		.then(() => $('section').forEach(section => section.hidden = false))
		.then(() => $('section:empty').forEach(section => section.remove()))
		.then(() => {
			const menu = document.getElementById('nav-menu');
			$('section').forEach(section => {
				const heading = section.querySelector('.section-heading');

				if (heading instanceof HTMLElement) {
					const menuitem = document.createElement('menuitem');
					menuitem.setAttribute('label', heading.textContent);
					menuitem.dataset.scrollTo = section.id;
					menu.append(menuitem);
				}
			});
		})
		.then(() => $('[data-scroll-to]').forEach(el => {
			el.addEventListener('click', event => {
				document.getElementById(event.target.dataset.scrollTo).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			});
		})).then(() => {
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
		})
		.catch(console.error);
})();
