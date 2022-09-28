const postcss = require('postcss')
const algacss = require('../src/')

test('Reading css classes from file', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      extract: [
        './test/vue/**/*.vue',
        './test/js-html/**/*.js'
      ]
    })
  ]).process(`@use helpers; @ref objectFit-cover verticalAlign-middle;`, { from: undefined })
  console.log(result.css)
})
