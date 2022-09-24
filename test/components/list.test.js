const execute = require('../execute.js')

test('Testing list group component', async () => {
  const input = '@use list;'
  const output = `.list {
    width: 100%;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 0.375rem
}
.list .listHeader {
    padding: 0.5rem;
    border-bottom: 1px solid #d9d9d9
}
.list .listMenu {
    overflow-y: auto;
    max-height: calc(10 * 36px)
}
.list .listItem {
    display: block;
    padding: 0.675rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    text-decoration: none;
    color: #283541;
    cursor: default
}
.list .listItem:last-child {
    border-bottom: 0
}
.list .listItem:hover {
    background-color: #ededed
}
.list .listItem.active {
    pointer-events: none;
    border-color: #4890eb;
    background-color: #4c9bff;
    color: #fff
}
.list .listFooter {
    padding: 0.5rem;
    border-top: 1px solid #d9d9d9
}
.list.sizing {
    overflow-y: auto;
    max-height: calc(10 * 36px)
}
@media (prefers-color-scheme: dark) {
    .list {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .list .listHeader {
        border-bottom-color: #5f5f5f
    }
    .list .listItem {
        border-bottom-color: #5f5f5f;
        color: #f2f2f2
    }
    .list .listItem:hover {
        background-color: #242424
    }
    .list .listFooter {
        border-top-color: #5f5f5f
    }
}
@media (prefers-color-scheme: light) {
    [data-mode=dark] .list {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    [data-mode=dark] .list .listHeader {
        border-bottom-color: #5f5f5f
    }
    [data-mode=dark] .list .listItem {
        border-bottom-color: #5f5f5f;
        color: #f2f2f2
    }
    [data-mode=dark] .list .listItem:hover {
        background-color: #242424
    }
    [data-mode=dark] .list .listFooter {
        border-top-color: #5f5f5f
    }
}
@media (prefers-color-scheme: dark) {
    [data-mode=light] .list {
        background-color: #fff;
        border-color: #d9d9d9
    }
    [data-mode=light] .list .listHeader {
        border-bottom-color: #d9d9d9
    }
    [data-mode=light] .list .listItem {
        border-bottom-color: #d9d9d9;
        color: #283541
    }
    [data-mode=light] .list .listItem:hover {
        background-color: #ededed
    }
    [data-mode=light] .list .listFooter {
        border-top-color: #d9d9d9
    }
}`
  await execute(input, output, {log: false, file: './examples/list/list.css'})
})
