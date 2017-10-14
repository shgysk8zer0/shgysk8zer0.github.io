# Contributing to the project
**Table of Contents**
- [General](#general)
- [Requirements](#requirements)
- [JavaScript Contributions](#javascript)
- [CSS Contributions](#css)
- [Icons](#icons)
- [Git Submodules used](#git-submodules)
- [NPM Modules / Dev dependencies](#dev-dependencies)

- - -

## General
Write access to the GitHub repository is restricted, so make a fork and clone that. All work should be done on its own branch, named according to the issue number (*e.g. `42` or `bug/23`*). When you are finished with your work, push your feature branch to your fork, preserving branch name (*not to master*), and create a pull request.

**Always pull from `upstream master` prior to sending pull-requests.**

## Requirements
- [Git](https://www.git-scm.com/download/)
- [jekyll](https://jekyllrb.com/)

## JavaScript
Due to Content-Security-Policy, use of `eval` and inline scripts are **prohibited**. Further, this project uses ECMAScript 2015  [modules](http://exploringjs.com/es6/ch_modules.html), so be sure to familiarize yourself with the syntax.

All JavaScript **MUST** pass Eslint according to the rules defined in `.eslintrc.json`
and have an extension of `.es6`.
Since this project minifies and packages all JavaScript using Babel & Webpack, with
the exception of `custom.es6`, all script **MUST NOT** execute any code, but only
import/export functions, classes, etc.

![JavaScript sample](https://i.imgur.com/Ac0fKZu.png)

## CSS
Like in the above, one of the goals of this project is to keep things working natively, which means standardized CSS and JavaScript. Although the features may be new, `import` and `export` in JavaScript, and `@import` and `--var-name: value` are official standards. In the case of CSS, browser support does exist, and so this project will use `@import` and CSS variables in favor of SASS or LESS.

![CSS sample](https://i.imgur.com/j4sC5qv.png)

## Icons
Wherever possible, all icons are to be created in SVG and minified. PNGs may then be created in whatever size is appropriate. Also, all commonly used icons are to be added to `images/icons.svg` so that they may be used using `<symbol>` and `<use xlink:href/>`.

## NPM
Several useful modules are included for Node users, which is strongly recommended for all development aside from PHP. Simply run `npm install` after download to install all Node modules and Git submodules. There are also several NPM scripts configured, which may be run using `npm run $script`.
- `build:css` which transpiles and minifies CSS
- `build:js` which transpiles and minifies JavaScript
- `build:icons` which creates SVG sprites from `images/icons.json`
- `build:all` which runs all of the above
- `update` which updates Git submodules recursively, installing any new ones
- `test` which runs any configured tests (*lints CSS & JS*)
- `serve` Triggers build process and starts jekyll server
- `serve:dev` Same as `serve`, except using dev / un-transpiled resources
NPM also has a `postinstall` script which will automatically install and update

## Git submodules
- [shgysk8zer0/std-js](https://github.com/shgysk8zer0/std-js/)
- [shgysk8zer0/core-css](https://github.com/shgysk8zer0/core-css/)
- [shgysk8zer0/fonts](https://github.com/shgysk8zer0/fonts/)
- [shgysk8zer0/adwaita-icons](https://github.com/shgysk8zer0/adwaita-icons/)
- [shgysk8zer0/logos](https://github.com/shgysk8zer0/logos/)
- [primer/octicons](https://github.com/primer/octicons/)
- [necolas/normalize.css](https://github.com/necolas/normalize.css/)

## Dev dependencies
- [PostCSS](http://postcss.org/)
- [cssnext](http://cssnext.io/)
- [Babel](https://babeljs.io/)
- [rollup.js](https://rollupjs.org/)
- [ESLint](http://eslint.org/)
- [stylelint](https://stylelint.io/)
- [svg-sprite-generator](https://github.com/frexy/svg-sprite-generator)
