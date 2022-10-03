const postcss = require('postcss')
const algacss = require('../src/')

test('Reading provide/inject feature from file', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      //src: './test/alga/**/*.alga'
      src: './test/alga/provide.alga'
    })
  ]).process(`@use provide;`, { from: undefined })
  console.log(result.css)
})
