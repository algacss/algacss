const execute = require('../execute.js')

test('Testing form component with', async () => {
  const input = `@use form;`
  const output = ``
  await execute(input, output, {log: true, file: './examples/form/form.css'})
})
