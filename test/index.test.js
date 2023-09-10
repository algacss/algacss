const postcss = require('postcss')
const algacss = require('../src/')

test('Reading css classes from file', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      mode: '.{theme}-mode',
      extract: [
        './test/vue/**/*.vue',
        './test/js-html/**/*.js',
        './test/js-html/app.jsx',
        './test/js-html/app.tsx',
        './test/js-html/app.svelte'
      ],
build: true
    })
  ]).process(`@use helpers; @ref objectFit-cover verticalAlign-middle;`, { from: undefined })
  console.log(result.css)
})
