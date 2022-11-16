const execute = require('../execute.js')

test('Testing sideBar component', async () => {
  const input = '@use sideBar;'
  const output = `.sideBar {
    position: relative;
    width: 240px;
    min-height: 100vh;
    height: 100%;
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: #f2f2f2;
    box-shadow: none
}
.sideBar .sideBackdrop {
    position: fixed;
    z-index: 14;
    inset: 0 3em 3em 0;
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    display: none;
    cursor: default
}
.sideBar .sideWrap {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 100%;
    min-height: 100vh;
    position: relative;
    z-index: 15;
    padding-right: 1rem;
    padding-left: 1rem
}
.sideBar .sideWrap .sideMain {
    flex-grow: 1
}
.sideBar.active {
    display: block
}
.sideBar.active .sideBackdrop {
    display: block
}
.sideNav {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%
}
.sideNav .navBrand {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    font-size: 1.25rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    margin-right: auto;
    cursor: pointer
}
.sideAvatar {
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
    text-align: center
}
.sideAvatar .avatarImage {
    width: 84px;
    height: 84px;
    border-radius: 5px
}
.sideAvatar .avatarTitle {
    margin-top: 0.5rem;
    margin-bottom: 0px;
    color: inherit;
    font-size: 1rem
}
.sideAvatar .avatarDescription {
    margin-top: 0.15rem;
    margin-bottom: 0px;
    color: inherit;
    opacity: 0.7;
    font-size: 0.75rem
}
.sideTitle {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    font-size: 1rem;
    color: inherit;
    opacity: 0.5
}
.sideMenu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap
}
.sideMenu > .sideItem {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem
}
.sideMenu > .sideItem.active {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 0.375rem;
    color: inherit;
    margin-top: 2px;
    margin-bottom: 2px
}
.sideNav > .navItem, .sideNav > .navToggler {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem
}
.sideNav > .navToggler {
    appearance: none;
    border: 0;
    background-color: transparent
}
.sideNav > .navToggler > svg, .sideNav > .navToggler > i {
    pointer-events: none;
    display: block
}
.sideMenu > .navItem:first-child, .sideNav > .navBrand:first-child, .sideNav > .navToggler:first-child {
    padding-left: 0
}
.sideMenu > .navItem:last-child, .sideNav > .navToggler:last-child {
    padding-right: 0
}
@media (min-width: 768px) {
    .sideBar.active .sideBackdrop {
        display: none
    }
}
@media (max-width: 768px) {
    .sideBar {
        display: none;
        position: fixed;
        min-height: 100vh;
        height: 100%
    }
    .sideBar.active {
        display: block
    }
}
@media (prefers-color-scheme: dark) {
    .sideBar {
        background-color: #2f2f2f
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .sideBar {
        background-color: #2f2f2f
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .sideBar {
        background-color: #f2f2f2
    }
}`
  await execute(input, output, {log: false, file: './examples/sideBar/sideBar.css'})
})
