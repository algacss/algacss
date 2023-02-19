const execute = require('../execute.js')

test('Testing breadCrumb component with RTL', async () => {
  const input = '@use breadCrumb;'
  const output = ``
  await execute(input, output, {log: true, file: './examples/breadcrumb/breadcrumb.css'})
})
