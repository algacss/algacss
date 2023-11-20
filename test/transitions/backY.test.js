const execute = require('../execute.js')

test('Testing backTop/backDown, backBottom/backUp transition', async () => {
  const input = `@use backY;`
  const output = `.backTop-enter-active, .backDown-enter-active {
    animation: backTop 0.5s
}
.backTop-leave-active, .backDown-leave-active {
    animation: backTop 0.5s reverse
}
@keyframes backTop {
    0% {
        opacity: 0.7;
        transform: translateY(-1200px) scale(.7)
    }
    80% {
        opacity: 0.7;
        transform: translateY(0px) scale(.7)
    }
    100% {
        opacity: 1;
        transform: scale(1)
    }
}
.backBottom-enter-active, .backUp-enter-active {
    animation: backBottom 0.5s
}
.backBottom-leave-active, .backUp-leave-active {
    animation: backBottom 0.5s reverse
}
@keyframes backBottom {
    0% {
        opacity: 0.7;
        transform: translateY(1200px) scale(.7)
    }
    80% {
        opacity: 0.7;
        transform: translateY(0px) scale(.7)
    }
    100% {
        opacity: 1;
        transform: scale(1)
    }
}`
  await execute(input, output, {log: false, file: './examples/transition/backY.css'})
})
