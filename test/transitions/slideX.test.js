const execute = require('../execute.js')

test('Testing slideLeft, slideRight and RTL transition', async () => {
  const input = `@use slideX;`
  const output = `.slideLeft-enter-active, html[dir=rtl] .slideRight-enter-active {
    animation: slideLeft 0.5s
}
.slideLeft-leave-active, html[dir=rtl] .slideRight-leave-active {
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
}
.slideRight-enter-active, html[dir=rtl] .slideLeft-enter-active {
    animation: slideRight 0.5s
}
.slideRight-leave-active, html[dir=rtl] .slideLeft-leave-active {
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
  await execute(input, output, {log: false, file: './examples/transition/slideX.css'})
})
