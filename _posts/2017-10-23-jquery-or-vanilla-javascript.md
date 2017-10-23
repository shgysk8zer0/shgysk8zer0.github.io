---
title: jQuery or Vanilla JavaScript
layout: post
description: 'The ultimate battle: jQuery vs. Vanilla JS'
tags:
- jQuery
- Vanilla JS
- es6
- ECMAScript
- JavaScript
- esQuery
date: '2017-10-23 00:00:00'
pinned: true
image: "/img/uploads/jq-vs-js.svg"
---

# [jQuery](http://jquery.com/) vs. [Vanilla JS](http://vanilla-js.com/)
The Internet is packed with articies either questioning the necessity of jQuery or criticizing its very existence. What I'm trying to do in this article
is not just to jump on the bandwagon. I'm also not going to tell you to go back through everything you've ever created using jQuery and update it
to use vanilla JavaScript. Instead, I'd like for you to keep the following in mind for any future projects and, if you feel the benefit is worth the effort,
update anything old that would benefit from the performance improvements.

![jQuery vs JavaScript](/img/uploads/jq-vs-js.svg)

Let's take a look at jQuery's description of itself, pick out what's worth discussing, and do some inspection of the claims that it makes.

> jQuery is a [fast](#fast), [small](#small), and [feature-rich](#feature-rich) JavaScript library. It makes things like HTML document traversal and manipulation,
> [event handling](#event-handling), [animation](#animation), and [Ajax](#ajax) much simpler with an easy-to-use API that works across a multitude
> of browsers.  With a combination of versatility and extensibility, jQuery has [changed the way that millions of people write JavaScript](#impact).

## Fast
According to the test tables on the Vanilla JS website, jQuery is massively slower than plain ol\` JavaScript. At least in terms of selecting elements from the DOM.

Syntax         | code                                                                                       | operations / second
------------ |------------------------------------------------- | ----------
JavaScript | `document.getElementById('some-id')`        | 12,137,211
jQuery         | `$('#some-id')`                                                               | 350,557
JavaScript | `document.getElementByTagName('span') | 8,280,893
jQuery         | `$('span')`                                                                          | 19,449

I'm not going to run the tests myself here, but it is worth pointing out that there are two major native DOM methods missing here: `querySelector` and `querySelectorAll`.
These two would be the slowest operations, though likely still faster than jQuery.

## Small
A minified copy of jQuery 3.2.1 is over 84 KB (*35 KB GZipped*). Is this small?

A fully commented, unminified copy of Vanilla JS:
```javascript
// VanillaJS v1.0
// Released into the Public Domain
// Your code goes here:
```
## Feature-rich

## Animation

```html
<div id="clickme">
  Click here
</div>
<img id="book" src="book.png" alt="" width="100" height="123" />
```
	
```javascript
// jQuery
$( "#clickme" ).click(function() {
  $( "#book" ).animate({
    opacity: 0.25
  }, 5000, function() {
    // Animation complete.
  });
});

// JavaScript
document.getElementById('clickme').addEventListener('click', () => {
	const anim = document.getElementById('book').animate([
		{opacity: 1},
		{opacity: 0.25}
	], 5000);
	// anim.onfinished = callback;
});
```

## Event handling
```javascript
// jQuery
var hiddenBox = $( "#banner-message" );
$( "#button-container button" ).on( "click", function( event ) {
  hiddenBox.show();
});

// JavaScript
const hiddenBox = document.getElementById('banner-message');
document.querySelector('#button-container button').addEventListener('click', () => {
	hiddenBox.hidden = false;
});
```

## Ajax
```javascript
// jQuery
$.ajax({
  url: "/api/getWeather",
  data: {
    zipcode: 97201
  },
  success: function( result ) {
    $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
  }
});

// JavaScript
const resp = await fetch('/api/getWeather', body: {zipcode: 97201});
const result = await resp.text();
document.querySelector('weather-temp').innerHTML = `<strong>${result}</strong> degrees`;
```

## Impact
There is no question that jQuery has been a major contributor in making the web what it is today. When JavaScript was in its
infancy, jQuery was there to assist developers in writing a single script that dealt with all of the browser inconsistencies.

Even today, it's not uncommon to have a JavaScript question on Stack Overflow answered with jQuery.

It seems that, for the vast majority of the simple cases, the entire jQuery library can be replaced with the following few lines of JavaScript:

```javascript
function $(query) {
	return document.querySelector(query);
}

EventTarget.prototype.on = EventTarget.prototype.addEventListener;

HTMLElement.prototype.html = function(str) {
	this.innerHTML = str;
};

HTMLElement.prototype.css = function(prop, value) {
	this.style.setProperty(prop, value);
};

$('#clickme').on('click', async event => {
	const resp = await fetch('/some/endpoint');
	const html = await resp.text();

	$('#banner').html(html);
	$('#some-el').css('opacity', 0.75);

	event.target.animate([
		{opacity: 1},
		{opacity: 0}
	], 600);
});
```

## Intruducing [esQuery](https://github.com/shgysk8zer0/std-js/blob/master/esQuery.js)

```javascript
export class esQuery extends Set {
	constructor(query, base = document) {
		super(base.querySelectorAll(query);
		if (base instanceof HTMLElement && base.matches(query) {
			this.add(base);
		}
	}
	
	async on(event, callback, opts = false) {
		this.forEach(el => el.addEventListener(event, callback, opts));
		return this;
	}
	
	async animate(keyframes, opts = 400) {
		this.forEach(el => el.animate(keyframes, opts));
		return this;
	}
	
	async css(props = {}) {
		const rules = Object.entries(props);
		this.forEach(el => {
			rules.forEach([key, value] => el.style.setProperty(key, value));
		});
		return this;
	}
}

export function $(query, base = document) {
	return new esQuery(query, base);
}
```