---
layout: post
title: "Web Share API"
author: "Chris Zuber"
pinned: true
date: "2017-10-19 15:13:28 -0700"
updated: "2018-02-06 05:20:00 -0700"
imgur: 2FRmKSn
description: "A Gist demonstrating a polyfill for the new Web Share API"
category: javascript
tags:
- navigator.share
- shim
- polyfill
- javascript
- js
---
{% include imgur.html
  url=page.imgur
  class='float-right card shadow-dark clearfix'
  alt='Native Web Share API on Chrome for Android'
  sizes='(min-width: 800px) 45vw, 100vw'
%}

### Web Share API
Soon, there will be little need to add those bloated scripts from half a dozen
different social networking sites. If you import scripts for the official Facebook,
Twitter, Google+, etc. shares, consider this an "I lost over 100 lbs overnight"
trick that will really work for your website.

*tl;dr* Click [here]({{ '#test-it-out' | prepend: page.url | absolute_url }}) to see
the Web Share API in action.

And, what's more, it'll remove any concerns about theming, restrictions on styling
of icons, user complaints about not supporting the service they want to share
with (*or alternatively having the clutter of dozens of share buttons*). And if
you call in the next five minutes, you can get an easy to implement and customize
dose of HTML, CSS, & JavaScript that'll make it so easy to implement, even your
aunt could figure it out. No promises though.

<div class="clear-both"></div>

Actually, I have take that back, since Promises, the JavaScript kind, are part
of the spec. [Introducing the Web Share API](https://developers.google.com/web/updates/2016/09/navigator-share).

```javascript
navigator.share({
	title: document.title,
	text: 'Check out Web Share API',
	url: location.href
}).then(/* Shared */).catch(/* Share canceled */);
```

### The handler
Since I'm a real sucker for making use of the [`dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset "HTMLElement.dataset")
API and [microdata](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata),
I wrote up a few lines of JavaScript to make sharing pages or elements within
a page nearly as easy as can be.

The JavaScript I use to do this is a bit lengthy since I really try to make it
handle a wide variety of uses, so I'm not including it here.

- If `data-share` has no value, (*an empty string*), share the page
- If it is the CSS selector to a microdata / structured data element, piece
together info from the embedded data
- If it is an `<img>`, share that with the `alt` as it's title
- If it is an `<a>`, share that link with title taken from `title` and text
taken from the link's text content

### Just create some `<button>`s with `data-share`
```html
<button data-share="">Share Page</button>
<button data-share="article">Share Article</button>
<button data-share="#share-api-demo-target">Share Image</button>
```

### Import and use
```javascript
import {$, shareHandler} from './my-script.js';

$('[data-share]').click(shareHandler);
```
### The Hacking for other browsers
Then, I made a [polyfill]({{ '#polyfill-gist' | prepend: page.url | absolute_url }}) of sorts for
everything that's not Chrome on Android using the [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
element and the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) API.
<figure class="card shadow">
{% include imgur.html
  url='9YiwoFg'
  id='share-api-demo-target'
  class='imgur'
  alt='Web Share API polyfill using &lt;dialog&gt;'
  sizes='(min-width: 800px) 45vw, 100vw'
%}
<figcaption>Web Share API polyfill using &lt;dialog&gt;</figcaption>
</figure>

### Test it out
<button type="button" data-share="" title="Share Page" class="color-alt background-accent">{% include icon.html icon='share' %}</button>

<button type="button" data-share="article" title="Share Article" class="color-alt background-accent">{% include icon.html icon='share' %}</button>

<button type="button" data-share="#share-api-demo-target" title="Share Image" class="color-alt background-accent">{% include icon.html icon='share' %}</button>

### Polyfill Gist
{% gist 'shgysk8zer0/9d3923d2949fd66233e10ce4ca1d98f6' %}
