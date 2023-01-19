const execute = require('../execute.js')

test('Testing breadCrumb component', async () => {
  const input = '@use breadCrumb;'
  const output = `.breadCrumb {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0;
    margin-top: 0;
    margin-bottom: 1rem;
    list-style: none
}
.breadCrumbItem {
    padding: 0 0.5rem 0 0
}
.breadCrumbItem + .breadCrumbItem::before {
    float: left;
    padding-right: 0.5rem;
    color: inherit;
    content: "/"
}
.breadCrumbItem a {
    color: inherit;
    text-decoration: none
}
.breadCrumbItem.active a {
    pointer-events: none;
    color: #4a5568
}
.breadCrumbItem.disabled a {
    pointer-events: none;
    opacity: 0.6
}
.breadCrumbItem:not(.active):not(.disabled):hover a {
    text-decoration: underline;
    color: #0d6efd
}`
  await execute(input, output, {log: false, file: './examples/breadcrumb/breadcrumb.css'})
})
