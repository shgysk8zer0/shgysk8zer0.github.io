---
title: JavaScript Gallery Demo
author: Chris Zuber
category: javascript
date: '2018-02-03 20:46'
description: A photo gallery written in pure JavaScript
imgur: 'https://imgur.com/y8TBVud'

tags:
- javascript
- es6
- photo gallery
- image gallery
- imgur
- responsive images
- vanilla javascript

gallery:
- 'https://imgur.com/in8sF0m'
- 'https://imgur.com/lBNNoxM'
- 'https://imgur.com/SJU5a6R'
- 'https://imgur.com/R5HHZf8'
- 'https://imgur.com/uGVGU3i'
- 'https://imgur.com/GxWyD8e'
- 'https://imgur.com/n1lOjUJ'
---
{% include gallery.html images=page.gallery %}

### Imgur and Responsive Images
[Imgur](https://imgur.com) is an invaluable resource when handling image uploads
and storage on your own server is not an option. This being a Jekyll Blog running
on GitHub Pages, I am in such a boat. Jekyll has no image optimization, resizing,
or uploading at all, and GitHub limits the size of repositories, so storage is
limited.

Imgur is a must for those in my position. And, though it is not widely advertized,
they are a great resource for responsive images. Not only can you get an image you
upoad in different sizes, but in different formats as well. You can append "h",
"l","m", and "t" *(and a few others)* to the URLs for Imgur uploads to obtain
different sizes, and replace the extension with `.webp`, for example, to get
the image in different formats. Both of these are **awesome** for creating responsive
images:
```html
<picture>
  <source srcset="https://i.imgur.com/in8sF0mh.webp 1024w, ..." sizes="(min-width: 700px) 75vw, 100vw" type="image/webp"/>
  <source srcset="https://i.imgur.com/in8sF0mh.png 1024w, ..." sizes="(min-width: 700px) 75vw, 100vw" type="image/png"/>
  <img src="https://i.imgur.com/in8sF0ml.png" alt=""/>
</picture>
```
This will load WebP images (which are typically smaller in browsers that support
the format, and PNG in others. For old browsers that don't support responsive
images, all they will see and make use of is the `<img>` at the end.

Each `srcset` specifies the source's width which, combined with `sizes`, helps the
browser know which image to load.

The great thing is that the only unique part about this entire `<picture>` will
be the image identifier *("in8sF0mh", in the example)*. This means that it is fairly
easy to script their creation.
### The JavaScript
```js
export async function imgur(url, {
	sizes       = ['100vw'],
	alt         = '',
	defaultSize = 'h',
} = {}) {
	const imgurSizes = {
		h: 1024,
		l: 640,
		m: 320,
		t: 160,
	};

	const formats = {
		'image/webp': '.webp',
		'image/png': '.png',
	};

	const picture = document.createElement('picture');
	const imgur = new URL(url, 'https://i.imgur.com/');
	const image = new Image();

	imgur.host = 'i.imgur.com';
	imgur.protocol = 'https:';
	imgur.pathname = imgur.pathname.replace(/\.[A-z]+$/, '');
	Object.entries(formats).forEach(format => {
		const [type, ext] = format;
		const source = document.createElement('source');
		source.type = type;
		source.sizes = sizes.join(', ');
		const srcset = Object.entries(imgurSizes).map(size => {
			const [suffix, width] = size;
			return `${imgur}${suffix}${ext} ${width}w`;
		});
		source.srcset = srcset.join(', ');
		picture.append(source);
	});

	return new Promise((resolve, reject) => {
		picture.append(image);
		image.alt = alt;
		image.addEventListener('load', (event) => resolve(event.target.parentElement), {once: true});
		image.addEventListener('error', event => reject(event.target));
		image.src = `${imgur}${defaultSize}.png`;
	});
}
```
We can now obtain a response image element by using `await imgur('https://imgur.com/in8sF0mh');`.
This will return only when the image has finished loading, and it will be the
correct size for the screen size.

We'll use this to create a full gallery.
### The structure
Any gallery can be thought of as, essentially, one image in a larger size along
with several thumbnails that, when clicked, replace the image being viewed in a
larger size.
```css
.gallery {
	background: #4e4e4e;
}

.thumbnails {
	display: flex;
	align-items: center;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
}

.thumbnails .thumbnail {
	cursor: pointer;
	margin: 0.5em;
	perspective: 100vmin;
	transform-style: preserve-3d;
	transition: transform 400ms ease-in-out, box-shadow 400ms ease;
	border: 1px solid #ccc;
	border-radius: 2px;
	background: white;
	padding: 0.1em;
}

.current-thumb {
	cursor: not-allowed;
	pointer-events: none;
}

.thumbnails .thumbnail:hover, .thumbnails .current-thumb img {
	transform: scale(1.2);
	box-shadow: .2em .2em .1em rgba(0,0,0,0.9);
	z-index: 3;
}
```

```js
// https://github.com/shgysk8zer0/std-js/blob/master/functions.js
import {$, ready, imgur} from './std-js/functions.js';

ready().then(() => {
	$('.gallery').each(gallery => {
		$('.thumbnails picture:first-of-type').addClass('current-thumb');
		$('.thumbnails [data-imgur]', gallery).click(async event => {
			gallery.classList.add('cursor-wait');
			$('.thumbnails [data-imgur]', gallery).css({
				'pointer-events': 'none',
			});
			const clicked = event.target.closest('.thumbnails [data-imgur]');
			const current = gallery.querySelector('.current').closest('picture');
			const thumbnails = clicked.closest('.thumbnails');

			$('picture', thumbnails).each(thumbnail => {
				thumbnail.classList.toggle('current-thumb', thumbnail === clicked);
			});
			const pic = await imgur(clicked.dataset.imgur, {
				sizes: ['(min-width: 700px) 75vw', '100vw'],
			});
			pic.dataset.imgur = clicked.dataset.imgur;
			pic.classList.add('current');
			current.replaceWith(pic);
			$('.thumbnails [data-imgur]', gallery).css({
				'pointer-events': 'all',
			});
			gallery.classList.remove('cursor-wait');
		});
	});
});
```
