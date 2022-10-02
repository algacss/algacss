const postcss = require('postcss')
const algacss = require('../src/')

test('Reading provide/inject feature from file', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      src: './test/alga/**/*.alga'
    })
  ]).process(`@use postEditor;`, { from: undefined })
  console.log(result.css)
})
