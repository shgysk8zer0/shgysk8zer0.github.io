---
author: Chris Zuber
title: Async JavaScript Snippets
category: JavaScript
description: Here are a few snippets I came up with for easy event-driven async code.
keywords:
- JavaScript
- async
- events
- load
- ready
- DOMContentLoaded
---

```js
async function wait(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

async function ready() {
	if (document.readyState === 'loading') {
		await waitUntil(document, 'DOMContentLoaded');
	}
}

async function loaded() {
	if (document.readyState !== 'complete') {
		await waitUntil(window, 'load');
	}
}

async function waitUntil(target, event) {
	const prom = new Promise(resolve => {
		target.addEventListener(event, () => resolve(), {once: true});
	});
	await prom;
}

ready().then(/* ... */);

loaded.then(/* ... */);

wait(1000).then(/* Wait 1 second before executing */);

waitUntil(document, 'click').then(/* Execute on first click */);

(async () => {
  await ready();
  /* Execute this code after the page is ready */
  await waitUntil(document.getElementById('continue-btn'), 'click');
  /* Execute only after user clicks continue button */
})();
```
