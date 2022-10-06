const execute = require('../execute.js')

test('Testing rich text editor component', async () => {
  const input = `@use editor;`
  const output = `.editor {
    width: 100%;
    background-color: #fff;
    background-clip: border-box;
    word-wrap: break-word
}
.editor > *:first-child {
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem
}
.editor > *:last-child {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem
}
.editorToolbar {
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5rem 0.5rem;
    background-color: #fff;
    color: inherit
}
.editorStatusbar {
    border-top: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5rem 0.5rem;
    background-color: #fff;
    color: inherit
}
.editorContent {
    flex: 1 1 auto;
    padding: 1rem 0.75rem;
    outline: 0;
    display: block;
    position: relative;
    z-index: 14;
    background-color: #fff;
    border-color: #d9d9d9
}
.editorMenu {
    display: flex;
    padding-left: 0;
    margin: 0;
    list-style: none;
    gap: 5px
}
.editorItem {
    display: block;
    padding: 0.25rem 0.25rem;
    border-radius: 0.25rem;
    color: #4a5568;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid transparent;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out
}
.editorItem:not(.active):not(.plain):hover {
    background-color: #f2f2f2;
    color: inherit;
    border-color: #d9d9d9
}
.editorItem.active {
    background-color: #e7eefa;
    color: inherit;
    border-color: #b8e7fd
}
.editorItem.plain {
    cursor: default
}
.editorText {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem;
    z-index: 15
}
.editorTooltip {
    position: relative;
    display: flex;
    flex-direction: column
}
.editorSection {
    border-top-left-radius: 0px
}
.editorSection .editorBlock {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem;
    z-index: 15;
    border-top-left-radius: 0px;
    margin-top: 47px
}
.editorSection .editorBlock .editorToolbar {
    position: absolute;
    top: -37px;
    left: -1px;
    border: 1px solid #d9d9d9;
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    z-index: 13
}
.editorBackdrop {
    position: fixed;
    z-index: 25;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.editorInline {
    position: relative;
    display: inline-block
}
.editorInline .editorToolbar {
    visibility: hidden;
    position: absolute;
    z-index: 75;
    bottom: -47px;
    left: 0px;
    display: inline-block;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem
}
.editorInline:hover .editorToolbar {
    visibility: visible
}
.editorInline .editorToolbar:after {
    content: "";
    position: absolute;
    z-index: 74;
    top: -16px;
    left: 20px;
    margin-left: -10px;
    border-width: 8px;
    border-style: solid;
    transform: rotate(180deg);
    border-color: #d9d9d9 transparent transparent transparent
}
@media (prefers-color-scheme: dark) {
    .editor {
        background-color: #2f2f2f
    }
    .editorToolbar {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .editorStatusbar {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .editorContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .editorItem {
        color: #d9d9d9
    }
    .editorItem:not(.active):not(.plain):hover {
        background-color: #5f5f5f;
        color: #d9d9d9;
        border-color: #5f5f5f
    }
    .editorItem.active {
        background-color: #4a5568;
        color: #b8e7fd;
        border-color: #b8e7fd
    }
    .editorText {
        border-color: #5f5f5f
    }
    .editorSection .editorBlock {
        border-color: #5f5f5f
    }
    .editorSection .editorBlock .editorToolbar {
        border-color: #5f5f5f
    }
    .editorInline .editorToolbar {
        border-color: #5f5f5f
    }
    .editorInline .editorToolbar:after {
        border-color: #5f5f5f transparent transparent transparent
    }
}
@media (prefers-color-scheme: light) {
    [data-mode=dark] .editor {
        background-color: #2f2f2f
    }
    [data-mode=dark] .editorToolbar {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorStatusbar {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorItem {
        color: #d9d9d9
    }
    [data-mode=dark] .editorItem:not(.active):not(.plain):hover {
        background-color: #5f5f5f;
        color: #d9d9d9;
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorItem.active {
        background-color: #4a5568;
        color: #b8e7fd;
        border-color: #b8e7fd
    }
    [data-mode=dark] .editorText {
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorSection .editorBlock {
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorSection .editorBlock .editorToolbar {
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorInline .editorToolbar {
        border-color: #5f5f5f
    }
    [data-mode=dark] .editorInline .editorToolbar:after {
        border-color: #5f5f5f transparent transparent transparent
    }
}
@media (prefers-color-scheme: dark) {
    [data-mode=light] .editor {
        background-color: #fff
    }
    [data-mode=light] .editorToolbar {
        background-color: #fff;
        border-color: #d9d9d9
    }
    [data-mode=light] .editorStatusbar {
        background-color: #fff;
        border-color: #d9d9d9
    }
    [data-mode=light] .editorContent {
        background-color: #fff;
        border-color: #d9d9d9
    }
    [data-mode=light] .editorItem {
        color: #4a5568
    }
    [data-mode=light] .editorItem:not(.active):not(.plain):hover {
        background-color: #f2f2f2;
        color: inherit;
        border-color: #d9d9d9
    }
    [data-mode=light] .editorItem.active {
        background-color: #e7eefa;
        color: inherit;
        border-color: #b8e7fd
    }
    [data-mode=light] .editorText {
        border-color: #d9d9d9
    }
    [data-mode=light] .editorSection .editorBlock {
        border-color: #d9d9d9
    }
    [data-mode=light] .editorSection .editorBlock .editorToolbar {
        border-color: #d9d9d9
    }
    [data-mode=light] .editorInline .editorToolbar {
        border-color: #d9d9d9
    }
    [data-mode=light] .editorInline .editorToolbar:after {
        border-color: #d9d9d9 transparent transparent transparent
    }
}`
  await execute(input, output, {log: false, file: './examples/editor/editor.css'})
})
