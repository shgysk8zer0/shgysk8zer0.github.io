---
title: Awesome RSS
author: Chris Zuber
date: '2018-03-02 12:00'
description: My experience learning to build Web Extensions and the success of Awesome RSS
tags:
- Awesome RSS
- WebExtension
- web extension
- add-on
- Firefox
image: 'https://i.imgur.com/INswaGS.png'
---
![screenshot](https://i.imgur.com/INswaGS.png)

## An Introduction to Web Extensions
Creating [Awesome RSS](https://addons.mozilla.org/en-US/firefox/addon/awesome-rss/)
has been quite a learning experience. I don't mean that it has been extremely difficult
or complicated, but that the process has involved a series of new experiences that
were only subtly different from what I was already familiar with.

I started working with web extensions toward the end of 2017 when I found [Share Backported](https://addons.mozilla.org/en-US/firefox/addon/share-backported/), which
had been created to replace some social features that were being removed from Firefox.
I had already created something similar in JavaScript, but it was for adding share
buttons into a website rather than being through an add-on. Later that day, I
submitted a pull request to the add-on developer and, when it was merged, I had
made my first contribution to add-on development.

## Creating Awesome RSS
Soon after, I was working on an add-on to re-implement another feature that had
recently been removed from Firefox &mdash; the RSS subscribe button that showed
up in the URL / Awesome bar when an RSS or Atom feed was found in a page. By the
end of the weekend, I had my very own add-on working.

[![30 day stats](https://i.imgur.com/6Tc8RTAl.png)](https://imgur.com/6Tc8RTA)

After publishing the first version, it gained in popularity much faster than I
had expected. It didn't come close to something like AdBlock, but it seemed that
I was far from alone in wanting that little icon back in the Awesome Bar. Dozens,
then hundreds, and then thousands of users installed my little add-on, and positive
ratings and reviews started coming in. Even more surprising was the issues and
even a pull request. Not long after first publishing Awesome RSS, I received a
pull request from someone who had begun the ongoing process of internationalization.

More ratings and reviews came in, and I started noticing that all of the negative
ratings were not accompanied by a review. Ratings were typically either five stars
or one star, with very few exceptions. And, due to the lack of review for the single
star ratings, I really don't know why those users were unhappy.

Many of the issues that were opened were either out of my control *(such as another
add-on behaving irregularly)*, the result of neglect of site developers *(not properly
providing `<link>`s for feeds)*, or the natural and inevitable result of the immaturity
and instability of Firefox's implementation of web extensions *(changes to default behavior)*.

## A Request for Help
At the time of writing this, Awesome RSS is approaching 5,000 daily users, and about 55% of those users are using it in a language that is not their primary language.

[![user stats](https://i.imgur.com/pTPILes.png)](https://imgur.com/pTPILes)

I am asking for help translating Awesome RSS into different languages. I would
really like to at least support the top 5 languages before the next minor version
release *(1.3.0)*. While I could go copy/paste happy with Google Translate, I'm
sure that will result in at least a few cases where the result reads more like an
email about an inheritance from a distant relative you don't really have. Many of
the messages are single words in English, and I'm pretty sure the lack of context
will result in some terrible translations.

I have created several issues, one for each language, and all of them require
nothing more than filling in some strings in a JSON file to complete. If you are
interested in assisting with translations, check out [issues labeled "translations"](https://github.com/shgysk8zer0/awesome-rss/issues?q=is%3Aissue+is%3Aopen+label%3ATranslations).
You can also check out ["good first issue"](https://github.com/shgysk8zer0/awesome-rss/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
and ["help wanted"](https://github.com/shgysk8zer0/awesome-rss/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).

```json
{
  "extensionName": {
    "message": "Awesome RSS",
    "description": "Name of the extension."
  },
  "extensionDescription": {
    "message": "Puts an RSS/Atom subscribe button back in URL bar",
    "description": "Description of the extension displayed in the add-ons manager."
  },
  "...": {}
}
```
