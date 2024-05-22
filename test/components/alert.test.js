const execute = require('../execute.js')

test('Testing alert component', async () => {
  const input = `@use alert;`
  const output = `.alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 5px solid #c3c0c0;
    border-radius: 0.375rem;
    background-color: #f1ebeb;
    padding: 1rem;
    color: #5c5b5b
}
.alert .alertContent {
    flex-grow: 1
}
.alert .alertContent .alertTitle {
    margin: 0 0 7px 0
}
.alert .alertContent .alertText {
    margin: 0
}
.alert .alertAction {
    cursor: pointer;
    padding-left: 1rem
}
.notification {
    position: fixed;
    top: 25px;
    right: 25px;
    z-index: 35
}
.notification > * {
    margin-bottom: 0.5rem
}
.alert.alertSuccess {
    border-color: #008200;
    background-color: #baffba;
    color: #2d5a2d
}
.alert.alertInfo {
    border-color: #0061eb;
    background-color: #cde2ff;
    color: #364150
}
.alert.alertWarning {
    border-color: #eb8f00;
    background-color: #fce2ba;
    color: #635540
}
.alert.alertError {
    border-color: #c10202;
    background-color: #fec4c4;
    color: #5c3939
}
.alertModal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.alertModal .alertBackdrop {
    position: fixed;
    z-index: 30;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.alertModal .alertDialog {
    position: fixed;
    z-index: 31;
    padding: 1.5rem;
    display: none
}
.alertModal .alertDialog .alertContent {
    background-color: #fff;
    color: #595959;
    width: 500px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 0.375rem;
    box-shadow: 0 5px 22px 0 rgba(0,0,0,0.2)
}
.alertModal.active, .alertModal.active .alertBackdrop, .alertModal.active .alertDialog {
    display: block
}
.alertModal.active .alertDialog.alertCenter {
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh
}
.alertHeader, .alertFooter {
    display: flex;
    align-items: center;
    justify-content: center
}
.alertHeader {
    padding: 0.75rem 1rem
}
.alertFooter {
    padding: 0.75rem 1rem 1.5rem 1rem;
    gap: 10px
}
.alertFooter .button.alertOkay {
    border-color: #98b3d9;
    background-color: #6da7f8;
    color: #fff;
    font-weight: bold;
    box-shadow: 0 0 0 1px #fff,0 0 0 3px #accaf5
}
.alertFooter .button.alertOkay:hover {
    background-color: #accaf5
}
.alertFooter .button.alertOkay:active {
    background-color: #438ef6
}
.alertFooter .button.alertCancel {
    border-color: #dd8f8f;
    background-color: #fa8585;
    color: #fff;
    font-weight: bold;
    box-shadow: 0 0 0 1px #fff,0 0 0 3px #f9a1a1
}
.alertFooter .button.alertCancel:hover {
    background-color: #f9a1a1
}
.alertFooter .button.alertCancel:active {
    background-color: #f95e5e
}
.alertBody {
    padding: 0.75rem 1rem;
    text-align: center
}
.alertBody .alertTitle {
    margin-top: 0;
    margin-bottom: 0.25rem;
    line-height: 1.5;
    font-size: 27px;
    color: inherit;
    font-weight: 600;
    text-align: center
}
.alertBody .alertText {
    text-align: center;
    margin: 0;
    color: inherit;
    line-height: 1.5
}
@media (prefers-color-scheme: dark) {
    .alert {
        background-color: #2f2f2f;
        color: #e2e2e2;
        border-color: #828181
    }
    .alert.alertSuccess {
        background-color: #1f6a1f;
        color: #d4ffd4
    }
    .alert.alertInfo {
        background-color: #1d4985;
        color: #ddebff
    }
    .alert.alertWarning {
        background-color: #8e6528;
        color: #ffedd1
    }
    .alert.alertError {
        background-color: #a53737;
        color: #ffeaea
    }
    .alertModal .alertDialog .alertContent {
        background-color: #2f2f2f;
        color: #e2e2e2;
        border-color: #e2e2e2
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .alert {
        background-color: #2f2f2f;
        color: #e2e2e2;
        border-color: #828181
    }
    html[data-mode=dark] .alert.alertSuccess {
        background-color: #1f6a1f;
        color: #d4ffd4
    }
    html[data-mode=dark] .alert.alertInfo {
        background-color: #1d4985;
        color: #ddebff
    }
    html[data-mode=dark] .alert.alertWarning {
        background-color: #8e6528;
        color: #ffedd1
    }
    html[data-mode=dark] .alert.alertError {
        background-color: #a53737;
        color: #ffeaea
    }
    html[data-mode=dark] .alertModal .alertDialog .alertContent {
        background-color: #2f2f2f;
        color: #e2e2e2;
        border-color: #e2e2e2
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .alert {
        background-color: #f1ebeb;
        color: #5c5b5b;
        border-color: #c3c0c0
    }
    html[data-mode=light] .alert.alertSuccess {
        background-color: #baffba;
        color: #2d5a2d
    }
    html[data-mode=light] .alert.alertInfo {
        background-color: #cde2ff;
        color: #364150
    }
    html[data-mode=light] .alert.alertWarning {
        background-color: #fce2ba;
        color: #635540
    }
    html[data-mode=light] .alert.alertError {
        background-color: #fec4c4;
        color: #5c3939
    }
    html[data-mode=light] .alertModal .alertDialog .alertContent {
        background-color: #fff;
        color: #595959;
        border-color: #fff
    }
}`
  await execute(input, output, {log: false, file: './examples/alert/alert.css'})
})
