---
author: Chris Zuber
title: Async JavaScript Snippets
subheading: Some quick, asynchronous JavaScript snippets for handling events
category: javascript
date: '2018-01-27 03:17'
imgur: XPOSonM
description: Here are a few snippets I came up with for easy event-driven async code.
tags:
- JavaScript
- async
- events
- load
- ready
- DOMContentLoaded
---

{% include imgur.html imgur=page.imgur %}

```js
async function wait(ms) {
	new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

// Use as a Promise
wait(500).then(/* Code to execute after half a second */);

await wait(1200);
// Run some code
await wait(5000);
// Run some more code
```
Here we have a simple `wait` function. It's nothing incredible, but I think the
syntax makes a little more sense than other methods. You can also make use of the
`await` keyword in asynchronous code to delay or even stagger code.

```js
async function waitUntil(target, event, opts = {once: true}) {
	await new Promise(resolve => {
		target.addEventListener(event, () => resolve(), opts);
	});
}

await waitUntil(someButton, 'click');
// Code to execute after button is clicked.
```

This is pretty similar to typical event handling, except there is a pause in
execution until the event occurs. I think that, in some situations, this could
lead to a better logical flow in code. Think of pretty much any long process that
has several pages and next buttons. This method avoids setting event listeners in
callback functions, making code much easier.

```js
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
await ready();
// Do all the things because the document is now ready
ready().then(/* Stuff to do after document is ready */);
```

As you might know, `load` and `DOMContentLoaded` events only fire once, so
setting listeners for these events after the `load` event has occured prevents
the callback from ever being dispatched. I also think that `ready().then(stuff);`
or `await loaded()` is more meaningful and descriptive than `$.ready(stuff);`.

That's all. I hope that some of these come in handy and that you remember `waitUntil`
next time you're writing some long, multi-step process in JavaScript.
