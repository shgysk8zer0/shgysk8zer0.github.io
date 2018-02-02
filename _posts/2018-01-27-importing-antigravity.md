---
title: Importing Antigravity
author: Chris Zuber
date: '2018-01-27 01:02'
tags:
- coding
- languages
- packages
- dependencies
description: 'Almost all programming languages have their own package manager and method of importing code, but why reinvent the wheel so many times?'
imgur: 8t9jyz2
image: https://i.imgur.com/8t9jyz2l.png
---
## Here's an idea
But first, let me ask you a question: How many ways can you skin a cat?

*Note: No cats were harmed in the writing of this post*

[![import antigravity](https://imgs.xkcd.com/comics/python.png)](https://www.xkcd.com/353/)

One of the foundations of programming is DRY, which stands for "Don't Repeat Yourself."
Yet, how many ways are developers required to know to add a library or package to
a project? NPM has become pretty popular, at least for JavaScript and some
front-end stuff. Then there's Composer for PHP. Oh, and don't forget about `pip`,
`gem`, and who even knows how many others. Seriously, I think we need a package
manager manager!

For CSS and JavaScript, there's also `<script>` and `<link>` tags to use and load
resources directly from an external source such as a CDN. That's a best practice
that has become somewhat abused, in my opinion.

Let's not forget the major contender that is Git. You'll probably be using this
too, but for your own code instead of code that somebody else wrote. You'll probably
use `.gitignore` to exclude `vendor/`, `node_modules/` and whatever else from your
repository, having all of the dependencies listed in some config file.

Oh, and let's not forget add-ons for things WordPress. This has plenty of siblings
in its family too.

You might even make use of Git's submodules feature. This performs a similar function
to all of the other means of getting code, but is lacking in support for such
things as handling multiple versions of the same package and controlling the
directory structure.

Yes, these are all useful and, in a sense, essential for any sufficiently complex
project. I must admit though that I've always felt that I was doing something wrong
in using NPM in a PHP based project.

## Why do we do this?
Pretty much every major language has a package manager and system for importing
code.

```python
# Python
import antigravity
```

```javascript
// JavaScript
import './antigravity.js';
// Or...
require('antigravity');
```

```php
// PHP
require_once 'antigravity.php';

// Or
new \Vendor\Package\Antigravity();
```

```css
/* Even CSS */
@import url("./antigravity.css");
```

```html
<!-- And a deprecated spec for HTML -->
<link rel="import" href="antigravity.html" />
<!-- And this kinda does a similar thing too -->
<iframe src="//example.com/antigravity"></iframe>
```

This is, of course, far from an exhaustive list of ways to import code.

Then there's package managers. `npm install this`. `composer require that`.
`gem install stuff`.

So, here's my question: "Why do we reinvent the wheel so many times?" Developers
are pretty much required to work in multiple languages, and the more languages
I've worked in, the more I wonder why this needs to be done in so many different
ways. Why can we not agree upon a single package manager that is not specific
to any given language?

## My solution to the madness
We pretty much all use Git, right? Git has [submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules),
even if nobody uses them. Git can also have plugins that add new functionality
([Git LFS](https://git-lfs.github.com/ "Git Large File Storage") is a great example of this).

All of the installation of packages could then be done through `git submodule add`.
Installing all updates is `git submodule update`. Getting the latest version becomes
as easy as `git submodule update --remote`.

Assuming you are already using Git, there's nothing more to install either!

This is how I prefer to manage my packages. I get all CSS, JavaScript, fonts, and
SVG images from submodules. Sometimes, since something like Normalize.css is
expecting to be installed through NPM, the directory structure isn't quire ideal,
but it certainly works well enough.

What if we were to extend the functionality of submodules to fulfill the needs
of all these package managers? I mean, submodules can already be used as-is for
the simple cases, up until you get into dependencies and versioning. Even then,
it could arguably be used if each package adds all of its dependencies as its own
submodules (*which might just result in a black hole, but how exactly would that
be any worse than NPM is already?*).

Alternatively, packages could be installed with a very strict directory structure,
such as `/:lang/:vendor/:package/:version`. A package would specify its packages
and versions, similar to the way things are now, and all dependencies would be
installed to the correct paths accordingly.

## Obstacles to overcome
This *almost* works. The problem comes in languages that import code using some
specific syntax that restricts characters. In JavaScript, `import '/js/vendor/package/1.2.3/file.js';`
works just fine, but it wouldn't work for PHP to use `new \Vendor\Package\1.2.3\File`.
Use of hyphens or underscores might fix this problem sometimes, but in any language,
developers would not want to have to always specify a version and have to update
all of that whenever a package gets updated.

Resolving this is not an insignificant amount of work to do, but it's not something
that hasn't already been done at least a dozen times. Having so many language-specific
implementations gives us a diversity in inspiration, giving us the potential to
create something better than all others. Think of it as an opportunity to take
the best features and, hopefully at least, avoid the annoyances.

As an added bonus, this would consolidate efforts to create and improve package
managers, which should result in something more stable, performant, and secure.

My idea is to extend Git into a universal package manager, complete with dependency
managment. I know it wouldn't be easy and there are problems that I personally
cannot solve. But I know that figuring this out would be well worth it. It would
make setting up, maintaining, updating, and publishing code **so much** easier,
especially for developers who work in multiple languages. I imagine that GitHub
and Bitbucket would be glad to become markets for packages too.
