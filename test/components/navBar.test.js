const execute = require('../execute.js')

test('Testing navBar component', async () => {
  const input = '@use navBar;'
  const output = `.navBar {
    position: relative;
    z-index: 25;
    width: 100%;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: #fff;
    box-shadow: none
}
.navBar .navWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding-right: 1.5rem;
    padding-left: 1.5rem
}
.navBar .navWrap .navStart {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    max-width: 100%
}
.navBar .navWrap .navStart .navBrand {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    font-size: 1.25rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    flex-grow: 1;
    cursor: pointer
}
.navBar .navWrap .navStart .navBrand:first-child {
    padding-left: 0
}
.navBar .navWrap .navStart .navToggler {
    padding: 0.75rem;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    appearance: none;
    background: transparent;
    border: none
}
.navBar .navWrap .navStart .navToggler svg, .navBar .navWrap .navStart .navToggler i {
    pointer-events: none;
    display: block
}
.navBar .navWrap .navStart .navToggler:first-child {
    padding-left: 0
}
.navBar .navWrap .navStart .navToggler:last-child {
    padding-right: 0
}
.navBar .navWrap .navEnd {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    flex-grow: 1;
    padding-left: 0.75rem
}
.navBar .navWrap .navEnd .navBackdrop {
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
.navBar .navWrap .navEnd .navMenu {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center
}
.navBar .navWrap .navEnd .navMenu .navItem {
    padding: 0.75rem;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    appearance: none;
    background: transparent;
    border: none
}
.navBar .navWrap .navEnd .navMenu .navItem:first-child {
    padding-left: 0
}
.navBar .navWrap .navEnd .navMenu .navItem:last-child {
    padding-right: 0
}
.navBar .navWrap .navEnd.active .navBackdrop {
    display: block
}
@media (min-width: 1200px) {
    .navBar .navWrap .navStart {
        max-width: 240px
    }
    .navBar .navWrap .navStart .navToggler.navMobile {
        display: none
    }
    .navBar .navWrap .navEnd.active .navBackdrop {
        display: none
    }
}
@media (max-width: 1200px) {
    .navBar .navWrap {
        position: relative
    }
    .navBar .navWrap .navEnd {
        display: none;
        position: absolute;
        width: auto;
        right: 10px;
        border: 1px solid #cac7c7;
        flex-direction: column;
        border-radius: 5px;
        padding: 0.5rem 0px;
        background-color: #fff;
        min-width: 240px;
        top: calc(0.75rem * 2 + 26px)
    }
    .navBar .navWrap .navEnd .navMenu {
        flex-direction: column;
        min-width: inherit;
        position: relative;
        z-index: 75
    }
    .navBar .navWrap .navEnd .navMenu .navItem {
        padding: 0.5rem 0.75rem;
        min-width: inherit
    }
    .navBar .navWrap .navEnd .navMenu .navItem:first-child {
        padding: 0.5rem 0.75rem;
        min-width: inherit
    }
    .navBar .navWrap .navEnd .navMenu .navItem:last-child {
        padding: 0.5rem 0.75rem;
        min-width: inherit
    }
    .navBar .navWrap .navEnd.active {
        display: flex
    }
    .navBar .navWrap .navEnd.active .navMenu .navItem:hover {
        background-color: #cac7c7
    }
}
@media (prefers-color-scheme: dark) {
    .navBar {
        background-color: #2f2f2f;
        box-shadow: none
    }
    .navBar .navWrap .navEnd.active {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .navBar .navWrap .navEnd.active .navMenu .navItem:hover {
        background-color: #5f5f5f
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .navBar {
        background-color: #2f2f2f;
        box-shadow: none
    }
    html[data-mode=dark] .navBar .navWrap .navEnd.active {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    html[data-mode=dark] .navBar .navWrap .navEnd.active .navMenu .navItem:hover {
        background-color: #5f5f5f
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .navBar {
        background-color: #fff;
        box-shadow: none
    }
    html[data-mode=light] .navBar .navWrap .navEnd.active {
        background-color: #fff;
        border-color: #cac7c7
    }
    html[data-mode=light] .navBar .navWrap .navEnd.active .navMenu .navItem:hover {
        background-color: #cac7c7
    }
}
@media print {
    .navBar {
        display: none
    }
}`
  await execute(input, output, {log: false, file: './examples/navBar/navBar.css'})
})
