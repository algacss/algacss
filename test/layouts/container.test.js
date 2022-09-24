const execute = require('../execute.js')

test('Testing container component', async () => {
  const input = `@use container {
    size: empty;
  }`
  const output = `.container {
    width: auto;
    margin-left: 0.375rem;
    margin-right: 0.375rem
}
.containerFluid {
    width: auto;
    margin-left: 0.375rem;
    margin-right: 0.375rem
}
@media (min-width: 600px) {
    .container {
        width: 576px;
        margin-left: auto;
        margin-right: auto
    }
}
@media (min-width: 768px) {
    .container {
        width: 720px;
        margin-left: auto;
        margin-right: auto
    }
}
@media (min-width: 1024px) {
    .container {
        width: 864px;
        margin-left: auto;
        margin-right: auto
    }
}
@media (min-width: 1280px) {
    .container {
        width: 1080px;
        margin-left: auto;
        margin-right: auto
    }
}
@media (min-width: 1536px) {
    .container {
        width: 1200px;
        margin-left: auto;
        margin-right: auto
    }
}
@media (min-width: 1920px) {
    .container {
        width: 1440px;
        margin-left: auto;
        margin-right: auto
    }
}
@media (min-width: 2560px) {
    .container {
        width: 2048px;
        margin-left: auto;
        margin-right: auto
    }
}
@media (min-width: 3840px) {
    .container {
        width: 3440px;
        margin-left: auto;
        margin-right: auto
    }
}`
  await execute(input, output, {log: false, file: './examples/layoutPage/container.css'})
})
