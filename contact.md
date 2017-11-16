---
layout: default
title: Contact
permalink: /contact/
---
<div id="contact-section" class="clearfix font-article background-primary color-default" itemtype="http://schema.org/Person" itemscope="">
  <figure itemprop="image" itemtype="http://schema.org/ImageObject" itemscope="" class="left">
    <img
      itemprop="url"
      srcset="
        https://secure.gravatar.com/avatar/43578597e449298f5488c2407c8a8ae5?s=1400 1400w,
        https://secure.gravatar.com/avatar/43578597e449298f5488c2407c8a8ae5?s=1200 1200w,
        https://secure.gravatar.com/avatar/43578597e449298f5488c2407c8a8ae5?s=1000 1000w,
        https://secure.gravatar.com/avatar/43578597e449298f5488c2407c8a8ae5?s=800 800w,
        https://secure.gravatar.com/avatar/43578597e449298f5488c2407c8a8ae5?s=600 600w,
        https://secure.gravatar.com/avatar/43578597e449298f5488c2407c8a8ae5?s=300 300w"
      sizes="(min-aspect-ratio: 3/2) 100vh, 100vw"
      src="https://secure.gravatar.com/avatar/43578597e449298f5488c2407c8a8ae5?s=800"
      alt="Gravatar Image"
    />
  </figure>
  <section class="contact-info-card inline-block">
    <a href="{{ site.url | absolute|url }}" title="Home" class="fixed bottom right">
      <svg class="big current-color icon">
        <use xlink:href="{{ site.icons | absolute_url | append: '#home' }}" />
      </svg>
    </a>
    <h3 class="center font-title">
      <span itemprop="givenName">Christopher</span>
      <span itemprop="additionalName">Wayne</span>
      <span itemprop="familyName">Zuber</span>
    </h3>
    <hr />
    <h5>
      <svg class="current-color icon left">
        <use xlink:href="{{ site.icons | absolute_url | append: '#network-workgroup' }}" />
      </svg>
      <span itemprop="jobTitle">Full Stack Web Developer</span> |
      <span itemprop="worksFor">SuperUserDev</span>
      <br /><br />
      <a href="https://superuserdev.github.io" rel="noopener external">
        <img src="{{ '/img/logos/super-user.svg' | absolute_url }}" width="128" height="128" alt="SuperUserDev Logo" />
      </a>
    </h5>
    
    <hr />
    <a href="tel:+1-661-619-6712" content="+1-661-619-6712" itemprop="telephone">
      <svg class="current-color icon">
        <use xlink:href="{{ site.icons | absolute_url | append: '#call-start' }}" />
      </svg>
      <span>+1-661-619-6712</span>
    </a>
    <hr />
    <a href="mailto:chris@chriszuber.com" content="chris@chriszuber.com" itemprop="email">
      <svg class="current-color icon">
        <use xlink:href="{{ site.icons | absolute_url | append: '#mail-unread' }}" />
      </svg>
      <span>chris@chriszuber.com</span>
    </a>
    <hr />
    <address class="clearfix" itemprop="address" itemtype="http://schema.org/PostalAddress" itemscope="">
      <svg class="current-color icon left">
        <use xlink:href="{{ site.icons | absolute_url | append: '#location' }}" />
      </svg>
      <span>
        <span itemprop="streetAddress">1116 Maddox Creek Ln.</span>
        <span itemprop="addressLocality">Mount Vernon</span>,
        <span itemprop="addressRegion">Washington</span>
      </span>
    </address>
    <div itemprop="description"></div>
    <hr />
    <div class="flex row big social-icons">
      <a href="https://github.com/shgysk8zer0" rel="noopener external" title="GitHub" itemprop="sameAs">
        <svg class="icon">
          <use xlink:href="{{ site.icons | absolute_url | append: '#mark-github' }}" />
        </svg>
      </a>
      <a href="https://twitter.com/shgysk8zer0" rel="noopener external" title="Twitter" itemprop="sameAs">
        <svg class="icon">
          <use xlink:href="{{ site.icons | absolute_url | append: '#twitter' }}" />
        </svg>
      </a>
      <a href="https://www.linkedin.com/in/chris-zuber-455346141/" title="LinkedIn" rel="noopener external" itemprop="sameAs">
        <svg class="icon">
          <use xlink:href="{{ site.icons | absolute_url | append: '#linkedin' }}" />
        </svg>
      </a>
      <a href="https://plus.google.com/+ChrisZuber" rel="noopener external" title="Google+" itemprop="sameAs">
        <svg class="icon">
          <use xlink:href="{{ site.icons | absolute_url | append: '#google+' }}" />
        </svg>
      </a>
    </div>
  </section>
</div>
