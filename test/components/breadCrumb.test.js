const execute = require('../execute.js')

test('Testing breadCrumb component with RTL', async () => {
  const input = '@use breadCrumb;'
  const output = `.breadCrumb {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0;
    margin-top: 0;
    margin-bottom: 1rem;
    list-style: none
}
.breadCrumb .breadCrumbItem {
    padding: 0 0.5rem 0 0
}
.breadCrumb .breadCrumbItem a {
    color: inherit;
    text-decoration: none
}
.breadCrumb .breadCrumbItem.active a {
    pointer-events: none;
    color: #4a5568
}
.breadCrumb .breadCrumbItem.disabled a {
    pointer-events: none;
    opacity: 0.6
}
.breadCrumb .breadCrumbItem:not(.active):not(.disabled):hover a {
    text-decoration: underline;
    color: #0d6efd
}
.breadCrumbItem + .breadCrumbItem::before {
    float: left;
    padding-right: 0.5rem;
    color: inherit;
    content: "›"
}
html[dir=rtl] .breadCrumbItem::before {
    float: right;
    padding-right: 0px;
    padding-left: 0.5rem
}`
  await execute(input, output, {log: false, file: './examples/breadcrumb/breadcrumb.css'})
})
