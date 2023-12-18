const execute = require('../execute.js')

test('Testing columns helper', async () => {
  const input = `@use columns;`
  const output = ``
  await execute(input, output, {log: true, file: './examples/helpers/columns.css'})
})
