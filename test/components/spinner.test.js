const execute = require('../execute.js')

test('Testing spinner component', async () => {
  const input = '@use spinner;'
  const output = `.spinner {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    margin-right: 0px;
    margin-bottom: 0px;
    height: 25px;
    width: 25px;
    margin-top: calc(25px/2);
    margin-left: calc(25px/2);
    border: 5px solid #f77372
}
@keyframes spin {
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(359deg)
    }
}`
  await execute(input, output, {log: false, file: './examples/spinner/spinner.css'})
})
