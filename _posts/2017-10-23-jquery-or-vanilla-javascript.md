---
title: jQuery or Vanilla JavaScript
layout: post
description: 'The ultimate battle: jQuery vs. Vanilla JS. But are those really the
  only two options?'
tags:
- jQuery
- Vanilla JS
- es6
- ECMAScript
- JavaScript
- esQuery
date: '2017-10-23 00:00:00'
updated: '2017-10-27 12:15:00'
pinned: true
image: "https://i.imgur.com/IOLu7fz.png"
category: javascript
---

# [jQuery](http://jquery.com/) vs. [Vanilla JS](http://vanilla-js.com/)
The Internet is packed with articles either questioning the necessity of jQuery or criticizing its very existence. What I'm trying to do in this article
is not just to jump on the bandwagon. I'm also not going to tell you to go back through everything you've ever created using jQuery and update it
to use vanilla JavaScript. Instead, I'd like for you to keep the following in mind for any future projects and, if you feel the benefit is worth the effort,
update anything old that would benefit from the performance improvements.

![jQuery vs JavaScript](/img/uploads/jq-vs-js.svg)

Let's take a look at jQuery's description of itself, pick out what's worth discussing, and do some inspection of the claims that it makes.

> jQuery is a [fast](#fast), [small](#small), and [feature-rich](#feature-rich) JavaScript library. It makes things like HTML document traversal and manipulation,
> [event handling](#event-handling), [animation](#animation), and [Ajax](#ajax) much simpler with an [easy-to-use API](#feature-rich) that works across a multitude
> of browsers.  With a combination of versatility and extensibility, jQuery has [changed the way that millions of people write JavaScript](#impact).

## Fast
According to the test tables on the Vanilla JS website, jQuery (*unknown version*) is massively slower than plain ol\` JavaScript.
At least in terms of selecting elements from the DOM.

Syntax         | code                                                                                        | operations / second
------------ |--------------------------------------------------| ----------
JavaScript | `document.getElementById('some-id')`          | 12,137,211
jQuery         | `$('#some-id')`                                                                 | 350,557
JavaScript | `document.getElementByTagName('span')` | 8,280,893
jQuery         | `$('span')`                                                                            | 19,449

I'm not going to run the tests myself here, but it is worth pointing out that there are two major native DOM methods missing here:
`querySelector` and `querySelectorAll`. These two would be the slowest operations, though still faster than jQuery.

## Small
A minified copy of jQuery 3.2.1 is over 84 KB (*35 KB GZipped*). Is this small? Well, small compared to **what**?

What you consider small is rather subjective. I would say that this is outrageous for a simple "Hello, world" site,
but perfectly understandable on massive, JavaScript heavy site.

Still, to compare, even if only jokingly...

A fully commented, unminified copy of Vanilla JS:
```javascript
// VanillaJS v1.0
// Released into the Public Domain
// Your code goes here:
```
## Feature-rich
The simple fact of the matter is that jQuery is limited in features by JavaScript, but JavaScript is not limited
by jQuery. It is true that many of the methods in JavaScript were inspired by what was found in jQuery, but
there are many things that JavaScript does that jQuery simply cannot. Take, for example,
[Mutation Observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), which allow you
to watch an element for changes to the DOM, such as added or removed nodes and attribute changes.

And, yes, since jQuery **is** JavaScript, anything JavaScript can do is still possible in jQuery, but if you're
only going to use jQuery for selecting elements from the DOM to use in regular JavaScript, you're being
extremely inefficient and really only making things more difficult on yourself.

jQuery isn't really used for anything that it adds to JavaScript though, but rather because it's considered easy to use.
Is it really easier to use though? Often times, not really.

Let's assume a `$` function as an alias for `document.querySelector` and see what we can do with it.
- [`$('#some-id').animate(keyframes, options)`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)
- [`$('#some-id').remove()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)
- [`$('#some-id').append(...nodes)`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append)
- [`$('#some-id').replaceWith(...nodes)`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith)
- [`$('#some-id').hidden = true || false`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
- [`$('#some-id').classList.toggle('foo')`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [`$('#some-id').dataset.foo = 'bar'`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)

jQuery certainly does have the advantage when it comes to working with multiple elements.

```javascript
// jQuery
$('.deletes').click(click => $(click.target).remove());

// JavaScript
Array.from(document.querySelectorAll('.deletes')).forEach(el => {
	el.addEventListener('click',  click => click.target.remove());
}
```

## Animation
Animations are the best and worst part of jQuery. jQuery's `.animate` method provides
some pretty impressive capabilities, while still being fairly easy to author.

CSS3 has transitions and animations, but those are very limited. Without JavaScript, it would be difficult
or impossible for clicking on one element to cause an animation in another. And animating something like
`opacity` from it's computed value for an element is currently impossible.

If you need to animate something that isn't triggered by `:hover` or some other pseudo class, you're
just going to have to do it in JavaScript.
	
```javascript
// jQuery
$( "#clickme" ).click(function() {
  $( "#book" ).animate({
    opacity: 0.25,
    left: "+=50",
    height: "toggle"
  }, 5000, function() {
    // Animation complete.
  });
});
```

The problem with jQuery's animations is that, to the best of my knowledge, all of them work by
adjusting the `style` of an element over the duration of the animation. While this gets the job done,
it is computationally expensive and completely destroys jQuerys claim at being fast. Not only is this
not taking advantage of the GPU, but it is having to re-calculate the computed style at every frame of
the animation, and it involves writing to the DOM.

You might not notice any performance issues on a simple `fadeIn`, but you'd better be conservative
in both the quantity and complexity of your animations.

But jQuery is far from the only way to do animations in JavaScript. There are better animation libraries
out there, but the best way to do animations is JavaScript's very own [Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

This API is the most performant way to script animations, and it can animate virtually any CSS property, 
including [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

```javascript
document.querySelector('#animate').animate([
	{opacity: 0, filter: 'invert(1)'},
	{opacity: 1, color: 'red', offset: 0.3},
	{transform: 'rotate(360deg)', color: 'green', filter: 'blur(5px)'},
], {
	duration: 600,
	easing: 'ease-in-out',
	iterations: Infinity,
	delay: 200,
	fill: 'both',
});
```

## Event handling
Not too much to say here. Handling events is pretty similar either way.
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

Again, jQuery's advantage is that it makes attaching the same handler on multiple elements
a lot cleaner and easier.

There are some differences though for more advanced cases. [`jQuery.on`](http://api.jquery.com/on/)
can have a few additional arguments, such as `data`. [`element.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener),
on the other hand, allows for the third parameter (commonly thought of as `useCapture`) to be an object
with keys for `capture`, `once` (*removes listener after fired*), and `passive`.

## Ajax
First, can we please give this technique a new name? "Asynchronous JavaScript And XML" is
no longer fitting since JSON has almost entirely replaced XML these days. I guess *AJAJ* just
doesn't sound as cool.

Ever since [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) became available,
and especially since [`async`/`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function),
`$.ajax` should just be avoided entirely if you're tranpiling your code and make use of polyfills, as
you really ought to be doing anyways.

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

11 years after it's initial release, it is still dominating the web, and developers are still talking about it (*though,
lately, in a more similar context to Flash*).

It's everywhere. It has influenced JavaScript itself. It made JavaScript more approachable in the darkest old days of
JavaScript's history, greatly impacting the adoption of the use of JavaScript, it's popularity amongst developers,
and made it possible for developers to remain sane while writing JavaScript.

## Introducing [esQuery](https://github.com/shgysk8zer0/std-js/blob/master/esQuery.js)
Every article I've seen on this subject creates a false dichotomy, in a sense. jQuery was / is popular for a reason.
There are still plenty of ways that it is easier to use than vanilla JavaScript. But, not using jQuery doesn't have to
mean not using a JavaScript library at all.

[esQuery](https://github.com/shgysk8zer0/std-js/blob/master/esQuery.js) is a library
that I've been working on for a while now that aims to be the best of both worlds. It
is what jQuery might have been, had it been created today instead of decades ago.

Weighing in at just under 3 KB when compressed, it is a modern JavaScript library
that offers the majority of features of jQuery, quite a few of its own, and might
just offer better performance in some circumstances than regular JavaScript since it
is almost entirely asynchronous.

```javascript
import {$, linkHandler} from './funcs.js';

$(window).ready(() => {
	const $doc = $('html');
	$doc.replaceClass('no-js',  'js');
	$doc.toggleClass('offline', ! navigator.onLIne);
	
	await $('article').fadeIn();
	
	// This will not be executed until animation is completed
	$('article p').each(p => /* Some complex DOM + RegEx operations*/);
	
	$('article blockquote').css({
		color: 'dimgray',
		'margin-left': '5px',
	});
	
	// This will run while the above code is executed asynchronously.
	$('a').click(linkHandler);
}, {once: true});
```

### Here are a few of the highlights:
- An ECMAScript class extending [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- Uses the Web Animations API for it's `.animate` method
- It's a JavaScript [modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/), so just `import` it.
- DOM methods are `async`, so performing complex operations on a multitude of elements
does not prevent the script from continuing unless `await`ed.
- Makes use of HTML attributes (`hidden`, `data-*`) and elements (`<video>`, `<details>`, `<dialog>`)
- Has methods for [`Mutation Observer`s](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
and [`IntersectionObserver`s](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
