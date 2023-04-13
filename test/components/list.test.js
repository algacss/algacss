const execute = require('../execute.js')

test('Testing list group component', async () => {
  const input = '@use list;'
  const output = `.list {
    width: 100%;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 0.375rem;
    margin: 0px;
    padding: 0px
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
    cursor: pointer
}
.list .listItem:last-child {
    border-bottom: 0
}
.list .listItem:hover {
    background-color: #ededed
}
.list .listItem.active {
    pointer-events: none;
    border-color: #06e;
    background-color: #07f;
    color: #fff;
    cursor: default
}
.list .listFooter {
    padding: 0.5rem;
    border-top: 1px solid #d9d9d9
}
.list.sizing, .listSize {
    overflow-y: auto;
    max-height: calc(10 * 36px)
}
.list.flush, .listFlush {
    border: none;
    border-radius: 0px
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
    html[data-mode=dark] .list {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    html[data-mode=dark] .list .listHeader {
        border-bottom-color: #5f5f5f
    }
    html[data-mode=dark] .list .listItem {
        border-bottom-color: #5f5f5f;
        color: #f2f2f2
    }
    html[data-mode=dark] .list .listItem:hover {
        background-color: #242424
    }
    html[data-mode=dark] .list .listFooter {
        border-top-color: #5f5f5f
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .list {
        background-color: #fff;
        border-color: #d9d9d9
    }
    html[data-mode=light] .list .listHeader {
        border-bottom-color: #d9d9d9
    }
    html[data-mode=light] .list .listItem {
        border-bottom-color: #d9d9d9;
        color: #283541
    }
    html[data-mode=light] .list .listItem:hover {
        background-color: #ededed
    }
    html[data-mode=light] .list .listFooter {
        border-top-color: #d9d9d9
    }
}`
  await execute(input, output, {log: false, file: './examples/list/list.css'})
})
