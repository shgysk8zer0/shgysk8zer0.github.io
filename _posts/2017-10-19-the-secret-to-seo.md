---
layout: post
title: "The Secret to SEO"
date: "2017-10-19 04:30:48 -0700"
updated: "2017-10-21 17:06:00 -0700"
author: Chris Zuber
author_url: https://chriszuber.com
image: https://i.imgur.com/cFKqWym.png
pinned: true
description: "You've seen the emails of supposed SEO experts, but the secret to SEO is that there is no secret"
tags:
- seo
- microdata
- schema.org
- json+ld
- json linked documents
---
![SEO meme](https://i.imgur.com/cFKqWym.png)

If you work on websites to any significant degree, <abbr title="Search Engine Optimizations">SEO</abbr>
is a term you're probably familiar with. Some associate it with spam. Others,
think of it as some magical set of constantly changing rules to follow to get on
the front page of Google. Others, and probably too few, really understand what it
is all about.

If you thik about it from the persepective of a search engine for a moment, it all
becomes clear very quickly. What is the primary goal of a search engine
(*aside from displaying ads*)? To get users to the content they are looking for.

With this in mind, good SEO breaks down into two very simple rules:
1. Have good content.
2. Help search engines understand the content

### The content
Creating high quality content is not terribly difficult, depending on the subject
matter. It requires a little bit of empathy and working with your audience in mind.
If you write an article with the intention of bringing eyes to your site, you might
be doing it wrong. Writing to be informative or educational to your audience is
much more effective than writing to bait an audience.

If possible, be a little informal and have some personality. Even if what you are
writing is educational, you can still be creative and entertain your audience in
the process.

Be empathetic. Be creative. Know your audience. Make something they will want
to consume.

### The markup
![Rich markup created event](https://i.imgur.com/hsVUFHO.png)

As effective as search engines are at crawling and parsing your sites, they're
still not as good at understanding them as us mortals. Because they were smart
enough to know that content creators want their stuff showing up in search results,
Google, Microsoft, Yahoo, Yandex, and others founded [schema.org](https://schema.org).

schema.org is a site that hosts documentation for something that goes by many names.
Whether you want to call it microdata or structured data, schema.org defines the
vocabulary that allows for semantic markup that search engines can not only parse,
but also **understand**.

The basic markup requires three attributes:
- [`itemtype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemtype),
which is also a link to the vocabulary's definition
- [`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop),
which relates the content to the `itemtype`
- [`itemscope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemscope),
which is effectively a container for atttributes of an `itemtype`

It may be delivered in a few different ways:

**HTML in page** [PostalAddress](https://schema.org/PostalAddress)
```html
<address itemprop="homeAddress" itemtype="http://schema.org/PostalAddress" itemscope>
    <div itemprop="streetAddress">123 Some St.</div>
    <div>
        <span itemprop="addressLocality">My City</span>,
        <span itemprop="addressRegion">CA</span>
    </div>
    <ul>
        <!--
            Note the `content` attribute used since they would be read with the
            "mailto:" or "tel:" prefixes
        -->
        <li><a itemprop="email" href="mailto:user@example.com" content="user@example.com">user@example.com</li>
        <li><a itemprop="telephone" href="tel:+1-555-123-4567" content="+1-555-123-4567">(555) 123-4567</li>
    </ul>
    <!-- ... -->
</figure>
```

**<abbr title="JSON Linked Document">JSON-LD</abbr>** [ImageObject](https://schema.org/ImageObject)

*(can validate by URL but probably will not be used if linked in HTML)*
```json
{
    "@type": "ImageObject",
    "@context": "http://schema.org",
    "url": "...",
    "caption": "...",
    "creator": "..."
}
```

**Embedding JSON-LD into HTML by `<script>`** [Person](https://schema.org/Person)
```html
<script type="application/ld+json">
    {
        "@type": "Person",
        "@context": "http://schema.org",
        "givenName": "...",
        "additionalName": "...",
        "familyName": "...",
        "homeAddress": {
            "@type": "PostalAddress",
            ...
        },
        "image": {
            "@type": "ImageObject",
            ...
        }
    }
</script>
```

To see this in action, check out the
{% assign url = page.url | absolute_url %}
[structured data for this page](https://search.google.com/structured-data/testing-tool#url=https%3A%2F%2Fshgysk8zer0.github.io%2Fposts%2F2017%2F10%2F19%2Fthe-secret-to-seo%2F)

In my opinion, `<script type="application/ld+json">` is the easiest to implement
because it allows you to dump all the data into a page without worrying how to
do the markup for exif data for an image, but adding `itemtype` and `itemprop`
to your HTML is the most powerful, as it gives you better semantics for styling
and scripting.

Imagine the following:

```javascript
document.addEventListener('load', async () => {
    // Fetch data from JSON document
    const resp = await fetch(new URL('/Article/3bc34a45d26784b5bea8529db533ae84', location.origin));
    const data = await resp.json();
    // Load a template
    const template = document.getElementById('article-template').content.cloneNode(true);

    // Iterate though template, populating with fetched data
    [..template.querySelectorAll('[itemprop]')].forEach(el => {
        if (data.hasOwnProperty(el.getAttribute('itemprop'))) {
            el.textContent = data[el.getAttribute('itemprop')];
        } else {
            el.remove();
        }
    });

    // Append to DOM
    document.querySelector('.article-container').append(template);
}, {once: true);
```

```css
[itemtype="http://schem.org/Article"] [itemprop="author"] {
    /* Styles for authors of articles */
}
```

### Design
Performance, legibility, and affordance are all important aspects SEO, though
indirectly. Google does take accessibility and mobile readiness into account,
but the bigger impact will likely be from your audience's impact.

Good desing is more of an art than any of the other topics and, to be honest, is
something that I admit I am not quite an expert on. What I can say though is that
empathy is important.

### Other free tips:
- HTTPS is more important than ever
- Keywords don't really matter because they're too easy to "stuff" / spam
- `<meta name="description">` will most likely show up in search results, so use it
- People like images, and search engines are in the business of showing people
what they like
- Know the differene between "Likes" on Facebook and site engagement
- Use appropriate elements such as `<article>`, `<time>`, `<address>` as well
- The more semantic your markup, the better
