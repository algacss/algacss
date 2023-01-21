const postcss = require('postcss')
const algacss = require('../src/')

test('Reading refs/props feature from alga file', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      important: false,
      //src: './test/alga/**/*.alga'
      src: './test/alga/define.alga'
    })
  ]).process(`@use define {
    bg: #242424;
    fg: #f5f5f5;
    bd: #f2f2f2;
    marginX: 1.5rem;
    marginY: 1rem;
    paddingTop: 20px;
    paddingRight: 10em;
  }`, { from: undefined })
  console.log(result.css)
})
