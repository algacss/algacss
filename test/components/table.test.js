const execute = require('../execute.js')

test('Testing table component', async () => {
  const input = '@use table;'
  const output = `.table {
    width: 100%;
    border-collapse: collapse
}
.table tr th, .table tr td {
    text-align: left;
    vertical-align: middle;
    padding: 0.75rem
}
.tableBorder {
    border-top: 1px solid rgba(0,0,0,0.25);
    border-right: 1px solid rgba(0,0,0,0.25);
    border-bottom: 1px solid rgba(0,0,0,0.25)
}
.tableBorder thead {
    border-bottom: 3px solid rgba(0,0,0,0.25)
}
.tableBorder tfoot {
    border-top: 3px solid rgba(0,0,0,0.25)
}
.tableBorder tr {
    border-bottom: 1px solid rgba(0,0,0,0.25)
}
.tableBorder tr:last-child {
    border-bottom-width: 0px
}
.tableBorder th, .tableBorder td {
    border-left: 1px solid rgba(0,0,0,0.25)
}
.tableResponsive {
    overflow-x: auto
}
@media (prefers-color-scheme: dark) {
    .tableBorder {
        border-top-color: rgba(255,255,255,0.25);
        border-right-color: rgba(255,255,255,0.25);
        border-bottom-color: rgba(255,255,255,0.25)
    }
    .tableBorder thead {
        border-bottom-color: rgba(255,255,255,0.25)
    }
    .tableBorder tfoot {
        border-top-color: rgba(255,255,255,0.25)
    }
    .tableBorder tr {
        border-bottom-color: rgba(255,255,255,0.25)
    }
    .tableBorder th, .tableBorder td {
        border-left-color: rgba(255,255,255,0.25)
    }
}
@media (prefers-color-scheme: light) {
    [data-mode=dark] .tableBorder {
        border-top-color: rgba(255,255,255,0.25);
        border-right-color: rgba(255,255,255,0.25);
        border-bottom-color: rgba(255,255,255,0.25)
    }
    [data-mode=dark] .tableBorder thead {
        border-bottom-color: rgba(255,255,255,0.25)
    }
    [data-mode=dark] .tableBorder tfoot {
        border-top-color: rgba(255,255,255,0.25)
    }
    [data-mode=dark] .tableBorder tr {
        border-bottom-color: rgba(255,255,255,0.25)
    }
    [data-mode=dark] .tableBorder th, .tableBorder td {
        border-left-color: rgba(255,255,255,0.25)
    }
}
@media (prefers-color-scheme: dark) {
    [data-mode=light] .tableBorder {
        border-top-color: rgba(0,0,0,0.25);
        border-right-color: rgba(0,0,0,0.25);
        border-bottom-color: rgba(0,0,0,0.25)
    }
    [data-mode=light] .tableBorder thead {
        border-bottom-color: rgba(0,0,0,0.25)
    }
    [data-mode=light] .tableBorder tfoot {
        border-top-color: rgba(0,0,0,0.25)
    }
    [data-mode=light] .tableBorder tr {
        border-bottom-color: rgba(0,0,0,0.25)
    }
    [data-mode=light] .tableBorder th, .tableBorder td {
        border-left-color: rgba(0,0,0,0.25)
    }
}`
  await execute(input, output, {log: false, file: './examples/table/table.css'})
})
