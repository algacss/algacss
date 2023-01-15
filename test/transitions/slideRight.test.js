const execute = require('../execute.js')

test('Testing slideRight transition', async () => {
  const input = `@use slideRight;`
  const output = `.slideRight-enter-active {
    animation: slideRight 0.5s
}
.slideRight-leave-active {
    animation: slideRight 0.5s reverse
}
@keyframes slideRight {
    0% {
        visibility: visible;
        transform: translate3d(100%,0,0)
    }
    100% {
        transform: translateZ(0)
    }
}`
  await execute(input, output, {log: false, file: './examples/transition/slideRight.css'})
})
