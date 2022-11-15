const execute = require('../execute.js')

test('Testing collapse on sideBar component', async () => {
  const input = '@use collapse;'
  const output = `.collapse {
    width: 100%
}
.collapseToggler {
    width: inherit;
    position: relative
}
.collapseToggler::after {
    width: 1.25em;
    line-height: 0px;
    content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
    position: absolute;
    top: 3.5px;
    right: 0px;
    transition: transform 0.35s ease;
    transform-origin: .5em 50%
}
.collapseMenu {
    display: none;
    padding: 0.5rem 0px;
    margin: 0;
    font-size: 1rem;
    color: inherit;
    text-align: left;
    list-style: none
}
.collapseMenu .collapseItem {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    color: inherit;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    clear: both;
    font-weight: 400;
    background-color: transparent;
    border: 0px
}
.collapse.active, .collapse.show {
    padding-bottom: 0px
}
.collapse.active .collapseToggler::after {
    transform: rotate(90deg)
}
.collapse.show .collapseToggler::after {
    transform: rotate(90deg)
}
.collapse.active .collapseMenu {
    display: block
}
.collapse.show .collapseMenu {
    display: block
}
@media (prefers-color-scheme: dark) {
    .collapseToggler::after {
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%28255,255,255,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e")
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .collapseToggler::after {
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%28255,255,255,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e")
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .collapseToggler::after {
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e")
    }
}`
  await execute(input, output, {log: false, file: './examples/collapse/collapse.css'})
})
