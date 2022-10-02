const execute = require('../execute.js')

test('Testing picker or dropdown component', async () => {
  const input = '@use picker;'
  const output = `.picker {
    width: auto
}
.pickerWrap {
    display: block;
    position: relative
}
.picker.dropdown .pickerWrap {
    display: inline-block
}
.pickerBackdrop {
    position: fixed;
    z-index: 74;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.picker.active .pickerBackdrop {
    display: block;
    user-select: none
}
.pickerToggler {
    padding: 0.5rem
}
.select.pickerToggler {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    cursor: default
}
.pickerContent {
    position: absolute;
    z-index: 75;
    top: 2.5rem;
    left: 0;
    min-width: 240px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    display: none;
    border-radius: 0.375rem
}
.pickerContent .pickerHeader {
    padding: 0.5rem;
    border-bottom: 1px solid #d9d9d9
}
.pickerContent .pickerBody {
    padding: 0.75rem
}
.pickerContent .pickerMenu {
    overflow-y: auto;
    max-height: calc(10 * 42px)
}
.pickerContent .pickerItem {
    display: block;
    padding: 0.675rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    text-decoration: none;
    color: #283541;
    cursor: pointer
}
.pickerContent .pickerItem:last-child {
    border-bottom: 0
}
.pickerContent .pickerItem:hover {
    background-color: #ededed
}
.pickerContent .pickerItem.active {
    pointer-events: none;
    border-color: #4890eb;
    background-color: #4c9bff;
    color: #fff;
    cursor: default
}
.pickerContent .pickerFooter {
    padding: 0.5rem;
    border-top: 1px solid #d9d9d9
}
.pickerContent.pickerSizing {
    overflow-y: auto;
    max-height: calc(10 * 42px)
}
.suggestion .pickerContent, .fill .pickerContent {
    width: 100%;
    min-width: auto
}
.pickerEnd .pickerContent {
    right: 0;
    left: auto
}
.picker.suggestion.active .input.pickerToggler, .picker.suggestion.active .select.pickerToggler {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0
}
.picker.suggestion.active .pickerContent {
    border-top-right-radius: 0;
    border-top-left-radius: 0
}
.picker.active .pickerContent {
    display: block
}
@media (prefers-color-scheme: dark) {
    .pickerContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .pickerContent .pickerHeader {
        border-bottom-color: #5f5f5f
    }
    .pickerContent .pickerItem {
        border-bottom-color: #5f5f5f;
        color: #f2f2f2
    }
    .pickerContent .pickerItem:hover {
        background-color: #242424
    }
    .pickerContent .pickerFooter {
        border-top-color: #5f5f5f
    }
}
@media (prefers-color-scheme: light) {
    [data-mode=dark] .pickerContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    [data-mode=dark] .pickerContent .pickerHeader {
        border-bottom-color: #5f5f5f
    }
    [data-mode=dark] .pickerContent .pickerItem {
        border-bottom-color: #5f5f5f;
        color: #f2f2f2
    }
    [data-mode=dark] .pickerContent .pickerItem:hover {
        background-color: #242424
    }
    [data-mode=dark] .pickerContent .pickerFooter {
        border-top-color: #5f5f5f
    }
}
@media (prefers-color-scheme: dark) {
    [data-mode=light] .pickerContent {
        background-color: #fff;
        border-color: #d9d9d9
    }
    [data-mode=light] .pickerContent .pickerHeader {
        border-bottom-color: #d9d9d9
    }
    [data-mode=light] .pickerContent .pickerItem {
        border-bottom-color: #d9d9d9;
        color: #283541
    }
    [data-mode=light] .pickerContent .pickerItem:hover {
        background-color: #ededed
    }
    [data-mode=light] .pickerContent .pickerFooter {
        border-top-color: #d9d9d9
    }
}`
  await execute(input, output, {log: false, file: './examples/picker/picker.css'})
})
