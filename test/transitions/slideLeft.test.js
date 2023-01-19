const execute = require('../execute.js')

test('Testing slideLeft transition', async () => {
  const input = `@use slideLeft;`
  const output = `.slideLeft-enter-active {
    animation: slideLeft 0.5s
}
.slideLeft-leave-active {
    animation: slideLeft 0.5s reverse
}
@keyframes slideLeft {
    0% {
        visibility: visible;
        transform: translate3d(-100%,0,0)
    }
    100% {
        transform: translateZ(0)
    }
}`
  await execute(input, output, {log: false, file: './examples/transition/slideLeft.css'})
})