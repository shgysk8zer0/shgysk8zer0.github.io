---
title: Security &amp; Third-Party Code
subheading: Why the web is still dangerous
category: security
date: '2018-01-26 02:15'
imgur: HclGzrT
tags:
- analytics
- third-party resouces
- csp
- content security policy
- sri
- subresource integrity
description: The best security developers can provide their users and why it's so difficult
---
I recently added comments via Disqus as well as Google Analytics. I also use
some external JavaScript from the amazing [Polyfill.io](https://polyfill.io/v2/docs/).

{% include imgur.html url=page.imgur %}

Lots of websites use third-party scripts carelessly, but I try my best to provide
a very secure website, even if I'm not taking credit card info or logins. I have
yet to find any third-party scripts that make this easy because they all make use
of inline scripts, lack versioning and are highly subject to change *(the same
source is not guaranteed to serve the same content from one time to the next)*,
and some even use <abbr title="User Agent">UA</abbr> sniffing to serve different
content to different browsers. All of this is pretty common practice, but it
elimitates the best security methods that are available.

### Content-Security-Policy
> Content Security Policy (<abbr title="Content-Security-Policy">CSP</abbr>) is
> an added layer of security that helps to detect and mitigate certain types of
> attacks, including Cross Site Scripting (<abbr title="Cross-Site-Scripting">XSS</abbr>)
> and data injection attacks. These attacks are used for everything from data
> theft to site defacement or distribution of malware.
>
> <cite>[Content Security Policy (CSP) - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)</cite>

CSP is one of the most important security features that a site can offer, though
it can be poorly implemented and relies on trust in the servers the content is
loaded from.

In simplest terms, CSP is a whitelist of where resources are allowed to be loaded
from. It is typically a header sent along with the page, though it can also be
added as a `<meta>` *(which is what I do, since GitHub Pages does not allow setting
headers)*. Every image, script, or stlyesheet loaded needs to have its origin
in a list of allowed sources:
```html
<!-- Ideally, this would be in a Content-Security-Policy HTTP header -->
<meta http-equiv="Content-Security-Policy" content="
	default-src 'self';
	img-src *;
	script-src 'self' https://cdn.polyfill.io https://*.disqus.com/embed.js  'sha256-YmEu57ZRfDpDDhMApyHsyE3PA6DSf2V+9bIVooFPFHw=';
	style-src 'self' 'unsafe-inline' ;
	connect-src wss://realtime.services.disqus.com https://disqus.com/home;
	font-src 'self';
	media-src *;
	child-src 'self' https://www.youtube.com;
	block-all-mixed-content;" />
```

Here's a quick overview of these directives:
Each of these begins with the directive *(`default-src`, `img-src`, etc.)*, followed
by the policy specifying the sources, and ends with a `;`. There are a few exepctions
to this, such as `block-all-mixed-content` being a boolean, and `report-uri` specifying
the URL to post the report to instead of allowing anything from that source.

You'll notice that some of these are surrounded by single quotes, and that is
because they are keywords or hashes. `'self'` allows from the same origin *(which
is not automatic)*. `'unsafe-inline'` allows inline `<script>`s or `<style>`s,
depending on if it is used with `script-src` or `style-src`. There is also
hashes listed, allowing only specific inline sources matching that hash *(meaning,
a single character changed would invalidate it)*. Not shown are `'unsafe-eval'`,
which allows the execution of arbitrary JavaScript, such as `eval()` and
specifying by schema *(`https:`, `http:`, and `data:`)*.

The problem with services like Disqus and CSP is that they require things such as
`unsafe-inline` and `unsafe-eval`, which makes CSP far less effective at protecting
users. I found a way around the `unsafe-inline` issue by storing any variables
needed for the script in `data-` attributes and then allowing them using `sha256-`
with their hashes.

### Subresource Integrity
> Subresource Integrity (<abbr title="Subresource Integrity">SRI</abbr>) is a
> security feature that enables browsers to verify that files they fetch
> (for example, from a <abbr title="Content Delivery Network">CDN</abbr>) are
> delivered without unexpected manipulation. It works by allowing you to provide
> a cryptographic hash that a fetched file must match.
>
> <cite>[Subresource Integrity - Web security | MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)</cite>

SRI is security for the scripts and stylesheets that are intended to be loaded
into a page. While CSP is very effective at blocking content from unauthorized
sources, it can do little to nothing if a CDN is compromised. The value of this
attribute is one or more base64 encoded hash of the resource, including a prefix
for the hashing algorithm. Since cryptographic hashes will only match if the contents
of the file are **exactly** the same as when the hash was generated, SRI ensures
that the resource is what was intended. Think of it like that hashes you often
see next to downloads.

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"
  integrity="sha384-R4/ztc4ZlRqWjqIuvf6RX5yb/v90qNGx6fS48N0tRxiGkqveZETq72KgDVJCp2TC"
  crossorigin="anonymous"></script>
```

This is useful, especially for HTTP sites,
and even more so on public networks because it plain-text can be modified while
in transit. It also protects against compromised CDNs any many other forms of attack.
SRI would have protected against the [Large Scale DDoS Attack on github.com](https://github.com/blog/1981-large-scale-ddos-attack-on-github-com)
that happened back in March of 2015.

If my understanding is correct, a certain government was somehow able to intercept
and modify scripts loaded from a secure CDN, adding code to create a flood of
traffic to GitHub's severs, slowing them to a crawl.

For even tighter security, you can require SRI via CSP with any of the following
directives:
- `Content-Security-Policy: require-sri-for script;`
- `Content-Security-Policy: require-sri-for style;`
- `Content-Security-Policy: require-sri-for script style;`

Sounds like I can use this to have nearly bullet-proof security for my users, right?
Well, unfortunately, this only works if the resource to be loaded doesn't ever change.

Polyfill.io serves different JavaScript depending on, not only the user's browser,
but also the version. Though not really feasible, it would be possible to add
hundreds of hashes to the script's `integrity`, but this would be invalid as
soon as any new polyfill was added or modified.

Google Analytics' JavaScript is also not compatible with SRI because the code is
constantly changing.

That's why CDNs append versioning to their resources, as seen in "jquery-2.1.4.min.js".
When a new version of jQuery is available, instead of over-writing the old script,
a new was is created *("jquery-:major-:minor-:patch.min.js")*. The practice was started
before SRI existed to ensure compatibility, and is even more important than ever
now to ensure unaltered content.

### So, we're doomed to be vulnerable
For now, pretty much. Maybe it'll be better in the near future since, though these
security features aren't new, their use is pretty limited and browser support
is not yet universal. Ever since Microsoft started working on Edge instead of
Internet Explorer, widespread use of new features has become much safer, since
Edge is an "evergreen" browser *(receives regular updates)* and use of IE is dropping
pretty fast.

Still, it will take awareness of developers and demand of users to see anything
change. As a developer, I am both shocked and scared at how poor the security is,
even in *(more accurately, **especially** in)* online banking. That's because
most websites are just extensions of businesses, and businesses are primarily
concerned with profits. Unfortunately, most business owners don't understand the
importance of investing in security. Good security will probably never earn a
single extra penny, but it most certainly can save millions!
