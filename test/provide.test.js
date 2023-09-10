const postcss = require('postcss')
const algacss = require('../src/')

test('Reading provide/inject feature from file', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      mode: '.{theme}-mode',
      //src: './test/alga/**/*.alga'
      src: './test/alga/provide.alga',
build: true
    })
  ]).process(`@use provide;`, { from: undefined })
  console.log(result.css)
})
