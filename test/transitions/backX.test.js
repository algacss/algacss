const execute = require('../execute.js')

test('Testing backLeft, backRight and RTL transition', async () => {
  const input = `@use backX;`
  const output = `.backLeft-enter-active, html[dir=rtl] .backRight-enter-active {
    animation: backX 0.5s
}
.backLeft-leave-active, html[dir=rtl] .backRight-leave-active {
    animation: backX 0.5s reverse
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
}
.backRight-enter-active, html[dir=rtl] .backLeft-enter-active {
    animation: backX 0.5s
}
.backRight-leave-active, html[dir=rtl] .backLeft-leave-active {
    animation: backX 0.5s reverse
}
@keyframes backRight {
    0% {
        opacity: 0.7;
        transform: translateX(2000px) scale(.7)
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
  await execute(input, output, {log: false, file: './examples/transition/backX.css'})
})
