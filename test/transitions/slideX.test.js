const execute = require('../execute.js')

test('Testing slideLeft, slideRight and RTL transition', async () => {
  const input = `@use slideX;`
  const output = ``
  await execute(input, output, {log: true, file: './examples/transition/slideX.css'})
})
