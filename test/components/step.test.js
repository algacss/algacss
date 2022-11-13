const execute = require('../execute.js')

test('Testing step wizard component', async () => {
  const input = `@use step;`
  const output = ``
  await execute(input, output, {log: true, file: './examples/step/step.css'})
})
