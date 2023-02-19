const execute = require('../execute.js')

test('Testing backLeft, backRight and RTL transition', async () => {
  const input = `@use backX;`
  const output = ``
  await execute(input, output, {log: true, file: './examples/transition/backX.css'})
})
