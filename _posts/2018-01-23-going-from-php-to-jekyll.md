---
title: Going from PHP to Jekyll
author: Chris Zuber
date: 2018-01-23 03:27
imgur: CbFnOO9
comments: true
category: frontend
description: >-
  A few months ago I started learning Jekyll and GitHub Pages. This was a severe
  limitation for me due to lack of database, ability to set headers, etc.
tags:
- jekyll
- GitHub Pages
- CSP
- Responsive Images
---
{% include
  imgur-figure.html
  imgur=page.imgur
  alt='Screenshot of my &lt;article&gt; template'
  caption=page.description
  decoding='async'
%}

## Initial impression of Jekyll
At first, this was just a single page portfolio. It was still hosted on GitHub Pages,
so I decided that I may as well learn Jekyll.

Having already been a web deeloper for about 5 years *(I've kinda lost track)*,
getting started was pretty easy. Just break the page apart into components located
in `_includes/` and load them using <code>{% raw %}{% include file.ext %}{% endraw %}</code>.
This was pretty easy, since I was already making extensive use of [`<template>`s](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
and loading my projects via [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

I already knew Markdown pretty well too, so that makes blogging pretty easy.

Simple enough, and now I'd avoid writing something in plain HTML, given the option.
Just being able to open `_includes/footer.html` instead of scrolling in a massive
HTML file makes it well worth using Jekyll. And, if it happens to be more than a
single page, Jekyll also makes it easier to update common parts of a page across
the entire site at once.

Having worked in PHP for quite a while now *(via `require`)*, this was nothing new,
but it's still nice to have that ability on static content.

Then I started making use of variables in "front matter" in posts and all of the
things that I can do with `_data/` files. Suddenly, Jekyll's lack of database
is not so much of a problem so long as I have no need for `INSERT`s or `UPDATE`s.
In fact, for reading data, it's better and easier in a lot of ways since MySQL
doesn't work so well with storing complex data. Sure, you can do `JOIN`s or convert
to and from JSON, but who would rather deal with that complexity over just working
with YAML or JSON files?

## Images and load times
Getting decent images and in the correct size wasn't too easy either. Since
this is using GitHub Pages, I have somewhat limited storage that I don't want
to fill up too quickly. I also do not have a WYSIWYG editor and the ability to
resize and optimize images the way I usually would. Also, the typical markdown
way of `![alt](/path/to/image.ext)` only works for a simple image and won't allow
different sizes and formats. So, I created [this](https://github.com/shgysk8zer0/shgysk8zer0.github.io/blob/master/_includes/imgur.html)
to automatically create responsive images in a variety of sizes, including PNG
and WebP formats.
```html
<picture>
  <source srcset="..." sizes="..." type="image/webp" />
  <source srcset="..." sizes="..." type="image/png" />
  <img src="..." alt="..." class="..." crossorigin="anonymous" />
</picture>
```

I did roughly the same thing for Gravatar, though that doesn't support WebP images.

Despite all of this, I don't score so well according to [Pingdom](https://tools.pingdom.com/)
{% include imgur-figure.html
  imgur='lDwEoi9'
  alt='Pingdom score screenshot'
  caption='Despite all my work, I have no control over cache headers. Still, a load time of 678ms is not bad.'
%}

## <abbr title="Content-Security-Policy">CSP</abbr> and external resources
Getting CSP to work was less fun because of my inability to set headers and some
limitations (*such as disabling `report-uri` and `report-only` whe set in a
`<meta>`*).

Google Analytics doesn't play well with CSP unless you want to allow `unsafe-inline`,
and I wasn't prepared to do that. Instead, I set `data-google-analytics` attribute
on `<html>`, modify the inline script to create the `<script>` tag automatically,
setting the `src` id using `document.documentElement.dataset.googleAnalytics`.
This allowed me to use JavaScript that doesn't ever need to be touched, even
if the tracking code changes. This means that it will always have the same hash,
which means that I can add `sha256-qlev233W0WjthlK15TmbH0lVg2G2Wtv5ABDEiB2iDnE=`
to my `script-src` and be done with it.

```javascript
var script = document.createElement('script')
var src = new URL('https://www.googletagmanager.com/gtag/js');
src.searchParams.set('id', document.documentElement.dataset.googleAnalytics);
script.src = src;
document.head.appendChild(script);
window.dataLayer = window.dataLayer || [];
window.gtag = function () {
	window.dataLayer.push(arguments);
};

window.gtag('js', new Date());
window.gtag('config', document.documentElement.dataset.googleAnalytics);
```

I applied a similar solution for Disqus comments recently, though my CSP still
complains quite a bit. It works...
```javascript
var disqus_config = function () {
	this.page = this.page || {};
	var commentsEl = document.getElementById('disqus_thread');
	this.page.url = commentsEl.dataset.disqusPageUrl;
	this.page.identifier = commentsEl.dataset.disqusIdentifier;
};
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://' +  document.getElementById('disqus_thread').dataset.disqusPageIdentifier + '.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
```

## Closing thoughts
For the most part, Jekyll is perfectly usable for me. I can't create an API to
setup full AJAX navigation and I'm pretty much forced to use Imgur and Disqus for
images and comments, but I can deal with that.

I'd love to find something else for comments though because I really don't like
the delay due to the `<iframe>`. the use of `data:` and `eval` for JavaScript,
or my inability to customize the comments section in any way other than choosing
between a light and dark theme. As soon as possible, I'm planning on moving to
a JSON API.

Lack of control over caching doesn't affect speed for users so much due to my use
of a service worker handling caching. Still, my scores on those tests used to
be 98% or higher.

I could see myself using Jekyll for most simple types of websites. It is, of course,
perfect for blogging, but I could also see using it for things like galleries,
business directories, restaurants, event listings, and pretty much anything that
doesn't require login or purchases.

And, with use of oAuth and maybe Authorize.net, I could even deal with those
limitations. The only thing Jekyll *(at least on GitHub Pages)* can't be used for
is paid content.
