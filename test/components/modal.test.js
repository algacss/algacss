const execute = require('../execute.js')

test('Testing modal dialog component', async () => {
  const input = '@use modal;'
  const output = `.modal {
    position: absolute;
    z-index: 30;
    top: 0;
    left: 0;
    max-width: 100vw;
    max-height: 100vh
}
.modalDialog {
    position: fixed;
    z-index: 35;
    inset: 0 3em 3em 0;
    width: 100%;
    height: 100%;
    display: none
}
html[dir=rtl] .modalDialog {
    inset: 0 0 3em 3em
}
.modal.active .modalDialog {
    display: block;
    padding: 1.5rem;
    background-color: rgba(0,0,0,0.5)
}
.modal.active .modalDialog.modalCenter {
    display: grid;
    place-items: center
}
.modalContent {
    background-color: #fff;
    border: 1px solid #d9d9d9;
    margin-right: auto;
    margin-left: auto;
    border-radius: 0.375rem;
    color: inherit
}
.modalFullscreen {
    padding: 0
}
.modalFullscreen .modalContent {
    width: 100vw;
    height: 100vh;
    border-radius: 0
}
.modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #d9d9d9
}
.modalHeader .modalTitle {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem
}
.modalBody {
    padding: 0.75rem 1rem;
    overflow-x: visible;
    overflow-y: auto;
    max-height: calc(100vh - 200px)
}
.modalFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-top: 1px solid #d9d9d9
}
@media (max-width: 599px) {
    .modalContent {
        width: 100%;
        margin-right: 0.25rem;
        margin-left: 0.25rem
    }
}
@media (min-width: 600px) {
    .modalContent {
        width: 500px
    }
}
@media (prefers-color-scheme: dark) {
    .modalContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .modalHeader {
        border-bottom-color: #242424
    }
    .modalFooter {
        border-top-color: #242424
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .modalContent {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    html[data-mode=dark] .modalHeader {
        border-bottom-color: #242424
    }
    html[data-mode=dark] .modalFooter {
        border-top-color: #242424
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .modalContent {
        background-color: #fff;
        border-color: #fff
    }
    html[data-mode=light] .modalHeader {
        border-bottom-color: #d9d9d9
    }
    html[data-mode=light] .modalFooter {
        border-top-color: #d9d9d9
    }
}`
  await execute(input, output, {log: false, file: './examples/modal/modal.css'})
})
