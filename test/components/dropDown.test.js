const execute = require('../execute.js')

test('Testing dropDown on navBar component', async () => {
  const input = '@use dropDown;'
  const output = `.dropDown {
    position: relative
}
.dropDownToggler {
    white-space: nowrap;
    display: flex;
    align-items: center
}
.dropDownToggler::after {
    content: "";
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent
}
.dropDownBackdrop {
    position: fixed;
    z-index: 74;
    inset: 0 3em 3em 0;
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    display: none;
    cursor: default
}
.dropDownMenu {
    position: absolute;
    z-index: 75;
    display: none;
    min-width: 240px;
    padding: 0.5rem 0px;
    margin: 0;
    font-size: 1rem;
    color: inherit;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 0.375rem;
    top: 100%;
    width: 100%;
    border: 1px solid #cccdce
}
.dropDownMenu .dropDownItem {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: inherit;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0px;
    cursor: pointer
}
.dropDownMenu .dropDownItem:hover {
    background-color: #ededed
}
.dropDownMenu .dropDownItem.active {
    pointer-events: none;
    border-color: #4890eb;
    background-color: #4c9bff;
    color: #fff;
    cursor: default
}
.dropDownMenu :not(hr).dropDownDivider {
    height: 0px;
    margin: 0.5rem 0px;
    overflow: hidden;
    opacity: 1;
    border-top: 1px solid #cccdce
}
.dropDownMenu hr.dropDownDivider {
    opacity: 0.375;
    color: #cccdce
}
.dropDownMenu.dropDownRight {
    right: 0px
}
.dropDown.active .dropDownBackdrop, .dropDown.active .dropDownMenu {
    display: block
}
.dropDown.show .dropDownBackdrop, .dropDown.show .dropDownMenu {
    display: block
}
@media (prefers-color-scheme: dark) {
    .dropDownMenu {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .dropDownMenu .dropDownItem:hover {
        background-color: #242424
    }
    .dropDownMenu :not(hr).dropDownDivider {
        border-color: #5f5f5f
    }
    .dropDownMenu hr.dropDownDivider {
        color: #5f5f5f
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .dropDownMenu {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    html[data-mode=dark] .dropDownMenu .dropDownItem:hover {
        background-color: #242424
    }
    html[data-mode=dark] .dropDownMenu :not(hr).dropDownDivider {
        border-color: #5f5f5f
    }
    html[data-mode=dark] .dropDownMenu hr.dropDownDivider {
        color: #5f5f5f
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .dropDownMenu {
        background-color: #fff;
        border-color: #cccdce
    }
    html[data-mode=light] .dropDownMenu .dropDownItem:hover {
        background-color: #ededed
    }
    html[data-mode=light] .dropDownMenu :not(hr).dropDownDivider {
        border-color: #cccdce
    }
    html[data-mode=light] .dropDownMenu hr.dropDownDivider {
        color: #cccdce
    }
}`
  await execute(input, output, {log: false, file: './examples/dropDown/dropDown.css'})
})
