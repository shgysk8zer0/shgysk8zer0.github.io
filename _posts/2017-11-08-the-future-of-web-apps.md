---
title: The Future of Web Apps
author: Chris Zuber
date: 2017-11-08 13:18:00 -0700
pinned: true
imgur: mdhC9mV
description: Some thoughts on the advantages and potential of building progressive web apps
keywords:
- pwa
- progressive web apps
- front-end
- javascript
- progressive enhancement
category: javascript
---
<h1 class="center">The Future of Web Apps</h1>
<h2 class="center" itemprop="alternativeHeadline">
  <i>The Web as the Ultimate Platform</i>
</h2>
{% include imgur.html class='right' imgur=page.imgur sizes='(min-width: 800px) 60vw, 100vw' alt='Code screenshot' %}

### What are they?
As described on [MDN](https://developer.mozilla.org/en-US/Apps "App Center | MDN"):
> Progressive web apps involve taking standard web sites/apps that enjoy all the
> best parts of the Web — such as discoverability via search engines, being
> linkable via URLs, and working across multiple form factors — and supercharging
> them with modern APIs (such as [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
> and [Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) and features
> that confer other benefits more commonly attributed to native apps.

<abbr title="Progressive Web Apps">PWA</abbr>s are, in the simplest case, websites
that register a Service Worker for offline support and contain a [`<link rel="manifest" />`](https://developer.mozilla.org/en-US/docs/Web/Manifest "Web App Manifest | MDN")
to provide some basic app info. If both of these requirements are satisfied, the
browser may show a badge or prompt to the user that enables the app being "installed."

### Isn't this old news?
*"So what? We've had [offline solutions](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache "Using the application cache - HTML | MDN")
and fancy bookmarks before."*

For very simple apps, AppCache would do the job, yes. Well, it will for now, since
it is now deprecated and support is expected to be dropped.

Browsers have also had "Add to Home Screen / Desktop" support as well. I can't
really say that PWAs are currently much more than an improvement on the interface
and discoverability. I think discoverability is significantly better though, since
supporting browsers will show a badge or prompt to install the app instead of
relying on users knowing of and using the feature.

If you were to focus solely on these things, then I would agree that PWAs are
not that big of a deal. But, Service Workers do more than just allow content to
be available offline or on slow networks. They allow for notifications, background
syncing, posting content while offline that is sent whenever the network becomes
available again. They also allow for scripted control of their caches, allowing
things such as users controlling what content is available offline.

PWAs are also more than any particular or fixed set of features. Rather, they are
an evolving set of tools available for delivering better user experiences. And,
just like Responsive Design is more than just declaring a `<meta name="viewport" />`,
PWAs merely begin with a better approach to what was already available.

### Looking to the Future
The current hype you'll see about PWAs focuses almost exclusively on Chrome on Android.
This is, to be blunt about it, incredibly naive! Google may have been the bigest
pusher of PWAs, and Chrome may have been the first browser to support much of the
technology, but nothing about PWAs is exclusive to Chrome. Firefox 58 for Android
will be enabling custom tabs and adding an "Add to Home Screen" badge. [Safari and
Edge](https://platform-status.mozilla.org/#service-worker "Firefox Platform Status")
are developing their implementations of Service Workers, and Edge is [developing](https://platform-status.mozilla.org/#app-manifest "Firefox Platform Status")
Web Application Manifest.

As you may have guessed by mention of Edge, PWAs are not exclusive to Android, or
even mobile devices. Microsoft is [planning on distributing them through the Windows
Store](https://channel9.msdn.com/events/Build/2017/B8075?term=provressive%20web%20apps%20build "Progressive web apps and the Windows ecosystem | Build 2017 | Channel 9").
It's easy to imagine that, in the near future, PWAs will be supported by either
all major browsers, if not by Operating Systems. When this happens, which is all
but a certainty at this point, we'll finally be able to realize the dream to "write
once; run everywhere."

Right now, you may be thinking, "There's no way something like PhotoShop would be
usable as a PWA." The battle of Web vs. Native has been fought for many years now
and the popular opinion today is that web has lost, largely due to performance issues.

Have you heard of [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly "WebAssembly | MDN")?
> WebAssembly is a new type of code that can be run in modern web browsers — it
> is a low-level assembly-like language with a compact binary format that runs
> with near-native performance and provides languages such as C/C++ with a
> compilation target so that they can run on the web. It is also designed to run
> alongside JavaScript, allowing both to work together.

Now, imagine the possibilities of a PWA using WASM and other amazing new-ish APIs like:
- [Speech Synthesis](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Speech_synthesis)
and [Speech Recognition](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Speech_recognition)
- [Payment Request](https://w3c.github.io/browser-payment-api/)
- [Credential Management](https://w3c.github.io/webappsec-credential-management/)
- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext)
and [WebVR](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
- [Gamepad](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)
- [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [Bluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
and [USB](https://wicg.github.io/webusb/)
- [GeoLocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)
- [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)

And, for integrating with the OS to handle files or protocols, we could implement
these using two methods that already exist that are under-utilized:
- [`navigator.registerProtocolHandler`](https://developer.mozilla.org/en-US/docs/Web-based_protocol_handlers)
- [`navigator.registerContentHandler`](https://developer.mozilla.org/en-US/docs/DOM/window.navigator.registerContentHandler)

In the near future, you may be able to install a VR game from an app store that will
connect to your Bluetooth gamepad, match you with nearby players with notifications
when your friends are online, handle voice commands, be playable offline, support
video chat, handle login and payments without filling out forms, and have performance
that is on par with something written in C! Could you tell that this was a PWA
and not a native app? Oh, and you can gloat about your victories using [`navigator.share`](/posts/javascript/2017/10/19/web-share-api/).
