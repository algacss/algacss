const postcss = require('postcss')
const algacss = require('../js/')
const execute = require('./execute.js')

test('Table element style', async () => {
  let result = await postcss([
    algacss({})
  ]).process(`
@inject table;
  `, { from: undefined })
  console.log(result.css)
})
