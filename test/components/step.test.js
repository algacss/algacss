const execute = require('../execute.js')

test('Testing step wizard component', async () => {
  const input = `@use step;`
  const output = `.step {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center
}
.step::before {
    content: " ";
    position: absolute;
    top: 27px;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: #f2f2f2;
    border-radius: 3px;
    z-index: 4
}
.stepItem {
    position: relative;
    text-align: center;
    z-index: 5;
    color: #999;
    flex: 1 1 auto
}
.stepItem .stepFeature {
    display: grid;
    place-items: center;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #999;
    color: #fff;
    border: 10px solid #eee
}
.stepItem .stepTitle {
    margin-top: 0.25rem;
    margin-bottom: 0.15rem
}
.stepItem .stepSubtitle {
    margin: 0;
    font-size: small
}
.stepItem.active {
    color: #428bca
}
.stepItem.active .stepFeature {
    background-color: #428bca
}
.stepFill:before {
    content: none
}
.stepFill .stepItem {
    background-color: #f2f2f2;
    display: flex;
    text-align: left
}
.stepFill .stepItem .stepFeature {
    background-color: transparent;
    border: none;
    width: auto;
    height: auto;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    color: inherit
}
.stepFill .stepItem .stepTitle {
    margin-top: 0.75rem;
    margin-bottom: 0px
}
.stepFill .stepItem .stepSubtitle {
    margin-bottom: 0.75rem
}
.stepFill .stepItem.active {
    background-color: #428bca;
    color: #fff
}
.stepFill .stepItem.active .stepFeature {
    background-color: #428bca
}
.stepArrow {
    background-color: #f2f2f2;
    border-left: 1px solid #d2d2d2;
    border-right: 1px solid #d2d2d2
}
.stepArrow:before {
    content: none
}
.stepArrow .stepItem {
    display: flex;
    text-align: left;
    border-top: 1px solid #d2d2d2;
    border-bottom: 1px solid #d2d2d2
}
.stepArrow .stepItem:not(:first-child) {
    padding-left: 40px
}
.stepArrow .stepItem .stepFeature {
    background-color: transparent;
    border: none;
    width: auto;
    height: auto;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    color: inherit
}
.stepArrow .stepItem .stepTitle {
    margin-top: 0.75rem;
    margin-bottom: 0px
}
.stepArrow .stepItem .stepSubtitle {
    margin-bottom: 0.75rem
}
.stepArrow .stepItem:not(:last-child)::before, .stepArrow .stepItem:not(:last-child)::after {
    content: "";
    pointer-events: none;
    position: absolute;
    display: block;
    left: 100%;
    top: 50%;
    height: 0px;
    width: 0px;
    margin-top: -34px;
    border: 34px solid transparent;
    border-left-width: 40px;
    transition: all .5s ease-in-out
}
.stepArrow .stepItem:not(:last-child):before {
    border-left-color: currentColor;
    z-index: 26
}
.stepArrow .stepItem:not(:last-child):after {
    border-left-color: #f2f2f2;
    z-index: 27;
    margin-left: -1px
}
.stepArrow .stepItem.active {
    background-color: #428bca;
    color: #fff;
    border-color: #428bca
}
.stepArrow .stepItem.active .stepFeature {
    background-color: #428bca
}
.stepArrow .stepItem.active:before, .stepArrow .stepItem.active:after {
    border-left-color: #428bca
}
@media (prefers-color-scheme: dark) {
    .step::before {
        background-color: #3f3f3f
    }
    .stepItem .stepFeature {
        background-color: #2f2f2f;
        border-color: #4f4f4f
    }
    .stepFill .stepItem {
        background-color: #3f3f3f
    }
    .stepArrow {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .stepArrow .stepItem {
        border-color: #5f5f5f
    }
    .stepArrow .stepItem:not(:last-child):after {
        border-left-color: #2f2f2f
    }
    .stepArrow .stepItem.active:before, .stepArrow .stepItem.active:after {
        border-left-color: #428bca
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .step::before {
        background-color: #3f3f3f
    }
    html[data-mode=dark] .stepItem .stepFeature {
        background-color: #2f2f2f;
        border-color: #4f4f4f
    }
    html[data-mode=dark] .stepFill .stepItem {
        background-color: #3f3f3f
    }
    html[data-mode=dark] .stepArrow {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    html[data-mode=dark] .stepArrow .stepItem {
        border-color: #5f5f5f
    }
    html[data-mode=dark] .stepArrow .stepItem:not(:last-child):after {
        border-left-color: #2f2f2f
    }
    html[data-mode=dark] .stepArrow .stepItem.active:before, html[data-mode=dark] .stepArrow .stepItem.active:after {
        border-left-color: #428bca
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .step::before {
        background-color: #f2f2f2
    }
    html[data-mode=light] .stepItem .stepFeature {
        background-color: #999;
        border-color: #eee
    }
    html[data-mode=light] .stepFill .stepItem {
        background-color: #f2f2f2
    }
    html[data-mode=light] .stepArrow {
        background-color: #f2f2f2;
        border-color: #d2d2d2
    }
    html[data-mode=light] .stepArrow .stepItem {
        border-color: #d2d2d2
    }
    html[data-mode=light] .stepArrow .stepItem:not(:last-child):after {
        border-left-color: #f2f2f2
    }
    html[data-mode=light] .stepArrow .stepItem.active:before, html[data-mode=light] .stepArrow .stepItem.active:after {
        border-left-color: #428bca
    }
}`
  await execute(input, output, {log: false, file: './examples/step/step.css'})
})
