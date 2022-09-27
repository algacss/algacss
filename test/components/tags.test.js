const execute = require('../execute.js')

test('Testing tags, tag input, and badge component', async () => {
  const input = '@use tags;'
  const output = `.tag {
    display: inline-flex;
    align-items: center;
    border-radius: 0.375rem;
    text-decoration: none;
    cursor: pointer;
    background-color: #f2f2f2;
    color: #2f2f2f;
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: bold;
    padding: 3px 10px;
    border: 1px solid #d9d9d9
}
.tag.groupItem:first-child {
    cursor: default
}
.tag.groupItem:last-child {
    padding-right: 5px;
    padding-left: 5px
}
.tag.groupItem svg {
    pointer-events: none
}
.tags {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 0.5rem
}
@media (prefers-color-scheme: dark) {
    .tag {
        background-color: #2f2f2f;
        color: #fff;
        border-color: #5f5f5f
    }
}
@media (prefers-color-scheme: light) {
    [data-mode=dark] .tag {
        background-color: #2f2f2f;
        color: #fff;
        border-color: #5f5f5f
    }
}
@media (prefers-color-scheme: dark) {
    [data-mode=light] .tag {
        background-color: #f2f2f2;
        color: #2f2f2f;
        border-color: #d9d9d9
    }
}
.taggable {
    width: auto
}
.tagWrap {
    display: block;
    position: relative;
    z-index: 6
}
.tagBackdrop {
    position: fixed;
    z-index: 5;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.taggable.active .tagBackdrop {
    display: block
}
.input.tagToggler {
    padding: 0.5rem;
    display: flex;
    justify-content: start
}
.tagInput {
    background-color: transparent;
    border-color: transparent;
    width: 100px;
    outline: 0
}
.tagContent {
    position: absolute;
    z-index: 7;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    width: 100%;
    border-radius: 0.375rem;
    overflow-y: auto;
    display: none;
    border-top-width: 0px;
    max-height: calc(10 * 36px)
}
.tagContent .tagItem {
    display: block;
    padding: 0.675rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    text-decoration: none;
    color: #283541
}
.tagContent .tagItem:last-child {
    border-bottom: 0
}
.tagContent .tagItem:hover {
    background-color: #ededed
}
.taggable.active .input.tagToggler {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0
}
.taggable.active .tagContent {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    display: block
}
@media (prefers-color-scheme: dark) {
    .tagContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .tagContent .tagItem {
        border-bottom-color: #5f5f5f;
        color: #f2f2f2
    }
    .tagContent .tagItem:hover {
        background-color: #242424
    }
}
@media (prefers-color-scheme: light) {
    [data-mode=dark] .tagContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    [data-mode=dark] .tagContent .tagItem {
        border-bottom-color: #5f5f5f;
        color: #f2f2f2
    }
    [data-mode=dark] .tagContent .tagItem:hover {
        background-color: #242424
    }
}
@media (prefers-color-scheme: dark) {
    [data-mode=light] .tagContent {
        background-color: #fff;
        border-color: #d9d9d9
    }
    [data-mode=light] .tagContent .tagItem {
        border-bottom-color: #d9d9d9;
        color: #283541
    }
    [data-mode=light] .tagContent .tagItem:hover {
        background-color: #ededed
    }
}
.badge {
    display: inline;
    margin-top: 0px;
    margin-left: 0.15rem;
    padding: 3px 7.5px;
    border-radius: 0.375rem;
    text-decoration: none;
    background-color: #283541;
    color: #fff;
    font-size: 0.75rem;
    font-weight: bold
}
.badgeTop {
    margin-top: -0.375rem
}
.badgeRound {
    border-radius: 99px
}`
  await execute(input, output, {log: false, file: './examples/tags/tags.css'})
})
