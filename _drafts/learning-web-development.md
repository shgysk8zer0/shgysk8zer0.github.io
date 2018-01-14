---
title: Learning Web Development
author: Chris Zuber
description: My suggestion on the path to becoming a full-stack developer
image: https://i.imgur.com/04V9FQB.jpg
tags:
- web development
- advice
- full-stack
category: advice
---
# Learning Web Development
<img src="{{ page.image }}" class="left" style="margin: 0 1.2em 1.2em 0;" />
I saw a post on Reddit recently that got me thinking about how peculiar my view
on web development is. I'm not against frameworks or popular libraries, but I know
from some unfortunate experiences that, given the choice between native or standard
vs. some trendy tool, native or standard is a safer choice for the future.

As an example, how many front-end developers are learning SASS instead of pure
CSS? Is SASS helpful in bringing sanity to large projects? Absolutely! But what
use will that knowledge be to you if you ever work on something that uses anything
else (or pure CSS)? SASS might be dominant for the moment, but it's entirely
possible that something will come out tomorrow that leaves SASS in the dust. Maybe
it already exists today and just hasn't gained attention yet.

Learning pure CSS has its advantages here because any pre-processor is nearly
certain to be able to be described as, "It's like CSS, except {a few relatively
small differences}." Oh, and CSS is picking up some new tricks, like [custom properties (CSS vars)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)
and there's even some talk that I've seen to implement mixins.

```css
/* Import CSS from another file */
@import url(/css/import-me.css);

:root {
  /* Set document-wide vars*/
  --bg-color: red;
}

.alt-bg {
  /* Overide, exactly as you would for any other property */
  --bg-color: blue;
}

.myClass {
  /* Use a set var, with fallback. Will be blue if a decendant of .alt-bg, else red */
  background-color: var(--bg-color, white);
}
```

Perhaps a better example is all of the JavaScript written for Webpack, using Node.js's
`require` and `module.exports`. A few years ago, that would have been your best
(if not only) option. But now, JavaScript natively supports modules. You can use
`import` and `export` without Webpack or Rollup.js, run the exact code that
you wrote locally, and only run the build process for production.

What's worse, because Node.js has been using a non-standard (CommonJS) module
system, they have built themselves into a corner when it comes to properly
implementing real modules. Developers are in the habbit of not using a valid
relative or absolute path with extension. In trying to implement the module
standard, NodeJS ran into issues of anychronous rather than synchronous loading,
lack of support for named imports `import {foo, bar} from './my-module.js';`, and
even requiring using `.mjs` extensions for modules (because of not using extensions,
as required by the spec).

```js
/* cjs-module.js*/
function foo() {
  return 'foo';
}

function bar() {
  return 'bar';
}

modules.exports.foo = foo;
modules.exports.bar = bar;

/* main.js */
const {foo, bar} = require('cjs-module');
console.log(foo(), bar());

/* alt.js */
import foobar from 'module'; // Imports from module.mjs
const {foo, bar} = foobar;
console.log(foo(), bar());
```

```js
/* module.js */
export function foo() {
  return 'foo';
}

export function bar() {
  return 'bar';
}

/* main.js */
import {foo, bar} from './module.js';
console.log(foo(), bar());
```

- Start with native front-end technologies
- Learn version control and importing code ASAP
- Always learn by doing, researching as needed for your project
- When learning CSS & JS, create your own submodule / package to keep with you
- Create a blog or portfolio (Optionally picking up Jekyll for GitHub Pages)
- Learn Webpack / Rollup.js and PostCSS to transpile
- Pick a stack to learn for back-end, learning to import classes / modules ASAP
