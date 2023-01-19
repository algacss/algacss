const execute = require('../execute.js')

test('Testing backLeft transition', async () => {
  const input = `@use backLeft;`
  const output = `.backLeft-enter-active {
    animation: backLeft 0.5s
}
.backLeft-leave-active {
    animation: backLeft 0.5s reverse
}
@keyframes backLeft {
    0% {
        opacity: 0.7;
        transform: translateX(-2000px) scale(.7)
    }
    80% {
        opacity: 0.7;
        transform: translateX(0) scale(.7)
    }
    100% {
        opacity: 1;
        transform: scale(1)
    }
}`
  await execute(input, output, {log: false, file: './examples/transition/backLeft.css'})
})