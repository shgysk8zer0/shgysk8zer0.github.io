---
title: Importing Antigravity
author: Chris Zuber
keywords:
- coding
- languages
- packages
- dependencies
description: 'Almost all programming languages have their own package manager and method of importing code, but why reinvent the wheel so many times?'
image: https://imgs.xkcd.com/comics/python.png
---
## Here's an idea
But first, let me ask you a question: How many ways can you skin a cat?

*Note: No cats were harmed in the writing of this post*

[![import antigravity](https://imgs.xkcd.com/comics/python.png)](https://www.xkcd.com/353/)

One of the foundations of programming is DRY, which stands for "Don't Repeat Yourself."
Yet, how many ways are developers required to know to add a library or package to
a project? NPM has become pretty popular, at least for JavaScript and some
front-end stuff. Then there's Composer for PHP. Oh, and don't forget about `pip`,
`gem`, and who even knows how many others.

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
<iframe src="//example.com/antigravity"></iframe>
<!-- And a deprecated spec for HTML -->
<link rel="import" href="antigravity.html" />
```

This is, of course, far from an exhaustive list of ways to import code.

So, here's my question: "Why do we reinvent the wheel so many times?" Developers
are pretty much required to work in multiple languages, and the more languages
I've worked in, the more I wonder why this needs to be done in so many different
ways. Why can we not agree upon a single package manager that is not specific
to any given language?

## My solution to the madness
We pretty much all use Git, right? Git has submodules, even if nobody uses them.
Git can also have plugins that add new functionality ([Git LFS](https://git-lfs.github.com/ "Git Large File Storage")
is a great example of this).

What if we were to extend the functionality of submodules to fulfill the needs
of all these package managers? I mean, submodules can already be used as-is for
the simple cases, up until you get into dependencies and versioning. Even then,
it could arguably be used if each package adds all of its dependencies as its own
submodules (*which might just result in a black hole, but how exactly would that
be any worse than NPM is already?*).

## Obstacles to overcome
- Need to standardize directory structure for language, vendor, and package
`/:lang/:vendor/:package/` where the path is entirely lower-case to avoid issues
of case-sensitive filesystems
- All packages will be required to use semantic versioning
- Packages requiring different versions of another package will be an issue for
languages such as JavaScript or anything importing over the network in a simple /
direct way.
- Will need a way of specifying development resources to not be included in production.

That is not an insignificant amount of work to do, but it's not something that
hasn't already been done at least a dozen times. Having so many language-specific
implementations gives us a diversity in inspiration, giving us the potential to
create something better than all others. Think of it as an opportunity to take
the best features and, hopefully at least, avoid the annoyances.

As an added bonus, this would consolidate efforts to create and improve package
managers, which should result in something more stable, performant, and secure.
