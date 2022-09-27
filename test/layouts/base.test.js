const execute = require('../execute.js')

test('Testing base component', async () => {
  const input = `@use base;` //input.replace(/props\(([0-9a-zA-Z]+)\)/g, ' props($1)')
  const output = `:root {
    font-family: Inter, Avenir, 'Calibri', Arial, sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, 'Apple Color Emoji', 'Segoe UI Emoji';
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    color-scheme: light dark;
    font-synthesis: none;
    -webkit-font-smoothing: antialiased;
    -moz-ost-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%
}
*, ::after, ::before {
    box-sizing: border-box
}
html {
    line-height: 1.15;
    tab-size: 4;
    background-color: #fff;
    color: #15181c
}
body {
    font-family: Inter, Avenir, 'Calibri', Arial, sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, 'Apple Color Emoji', 'Segoe UI Emoji';
    background-color: #fff;
    margin: 0px;
    padding: 0px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #15181c;
    min-height: 100vh
}
hr {
    height: 0;
    color: inherit
}
abbr[title] {
    text-decoration: underline dotted
}
b, strong {
    font-weight: bolder
}
code, kbd, samp, pre {
    font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 1em
}
small {
    font-size: 80%
}
sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
}
sub {
    bottom: -0.25em
}
sup {
    top: -0.5em
}
table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse
}
button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0
}
button, select {
    text-transform: none
}
button, [type='button'], [type='reset'], [type='submit'] {
    appearance: none;
    border: none;
    background-color: transparent
}
::-moz-focus-inner {
    border-style: none;
    padding: 0
}
:-moz-focusring {
    outline: 1px dotted ButtonText
}
:-moz-ui-invalid {
    box-shadow: none
}
legend {
    padding: 0
}
progress {
    vertical-align: baseline
}
::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto
}
[type='search'] {
    outline-offset: -2px
}
::-webkit-file-upload-button {
    font: inherit
}
summary {
    display: list-item
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2
}
.p, p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem
}
.mark, mark {
    background-color: #707070;
    border-radius: 0.25rem;
    color: #fff;
    padding: .1875em .375rem
}
img, svg {
    vertical-align: middle
}
@media (prefers-color-scheme: dark) {
    html {
        background-color: #242424;
        color: #e2e2e2
    }
    body {
        background-color: #242424;
        color: #e2e2e2
    }
}
@media (prefers-color-scheme: light) {
    [data-mode=dark] html {
        background-color: #242424;
        color: #e2e2e2
    }
    [data-mode=dark] body {
        background-color: #242424;
        color: #e2e2e2
    }
}
@media (prefers-color-scheme: dark) {
    [data-mode=light] html {
        background-color: #fff;
        color: #15181c
    }
    [data-mode=light] body {
        background-color: #fff;
        color: #15181c
    }
}`
  await execute(input, output, {log: false, file: './examples/base/base.css'})
})
