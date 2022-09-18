<p align="center">
  <a href="https://algacss.tedir.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="alga-css-logo.png" alt="Alga CSS logo">
  </a>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/alga-css?minimal=true"><img src="https://img.shields.io/npm/dm/alga-css.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/alga-css"><img src="https://img.shields.io/npm/v/alga-css.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/alga-css"><img src="https://img.shields.io/npm/l/alga-css.svg?sanitize=true" alt="License"></a>
</p>
<br/>

# Alga CSS
Alga CSS is a scope or component-first CSS toolkit for quickly mix or compose CSS components and properties, visit [https://algacss.com](algacss.com 'Alga CSS')

All the main features:
1. Created for scoped CSS
2. As a PostCSS plugin
3. Composing or mixing CSS components
5. Custom CSS helpers (preset, define, color, screen, etc.)
6. Extract classes from HTML (Petite-Vue, Alpine.js), Vue, Svelte, and Astro

## Installation and Setup
Alga CSS built on top of PostCSS, so before installing Alga CSS, you need to have PostCSS first and after that you can use NPM or Yarn to install this Alga CSS.

```sh
npm install alga-css@next

#or

yarn add alga-css@next
```

If you use tool that support PostCSS out of the box like Vite for instance, you just need to create a new config file which is `postcss.config.cjs` and add the code below to that file.

```js
const algacss = require('alga-css')

module.exports = {
  plugins: [
    algacss({
      extract: ['./src/**/*.vue', './src/**/*.html', './src/**/*.astro', './src/**/*.svelte']
    })
  ]
}
```

## Class Name Structure
Alga CSS uses special character `-` to gab classes from HTML elements or Vue components, and it uses `:` for breakpoints and states and also `_` as a divider or separator of css values.

```css
/* highly recommended */
<span class="marginTop-0.75rem padding-10px md:marginTop-5pct color-rgb(205,45,67) backgroundColor-hexfff"></span>

.className {
  ref: marginTop-0.75rem padding-10px color-rgb(205,45,67) backgroundColor-hexfff;
  screen-md: marginTop-5pct;
}

/* class structure: property (camelCase for prop name and prop value separated by - or dash) */
justifyContent-spaceBetween

/* class structure: unit size (pct is unit size in percent) */
width-100pct

/* class structure: screen, ss (extra small), sr (smaller), sm (small), md (medium), lg (large), lr (larger), ls (largest), wd (wide), wr (wider) */
ss:paddingLeft-3px

/* class structure: mode */
dark:backgroundColor-hex333
light:backgroundColor-hexfff

mode:backgroundColor-hexfff /* for [data-mode=dark] .backgroundColor-hexfff {} */

/* class structure: state */
facus:paddingLeft-3px
```

## CSS Component
We provide alga format `.alga` for creating CSS component.

```css
/* navBar.alga */
@define refs {
  name: navBar;
}

@define props {
  size: 0.75rem;
}

@alga {refs.name} {
  .{refs.name} {
    ref: position-relative zIndex-3;
    ref-paddingTop: {props.size};
    ref-paddingBottom: {props.size};
  }
}

/* navBar.vue <style scoped> */
@use navBar {
  size: 20px;
}
```

## Mixin and Composing CSS Component
to compose the CSS component.

```css
/* layout.alga */

@import 'navBar.alga'

@alga layout {
  use: navBar;
}

@use layout;
```

