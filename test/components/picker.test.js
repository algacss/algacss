const execute = require('../execute.js')

test('Testing picker or dropdown component', async () => {
  const input = '@use picker;'
  const output = `.picker {
    width: auto
}
.pickerContent {
    display: block;
    position: relative
}
.picker.dropdown .pickerContent {
    display: inline-block
}
.pickerBackdrop {
    position: fixed;
    z-index: 5;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.picker.active .pickerBackdrop {
    display: block
}
.pickerToggler {
    padding: 0.5rem
}
.select.pickerToggler {
    padding-left: 0.75rem;
    padding-right: 0.75rem
}
.picker.active .input.pickerToggler, .picker.active .select.pickerToggler {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0
}
.picker.active .pickerMenu {
    border-top-right-radius: 0;
    border-top-left-radius: 0
}
.pickerBody, .pickerMenu {
    position: absolute;
    z-index: 6;
    top: 2.5rem;
    left: 0;
    width: 240px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    display: none
}
.picker.active .pickerBody, .picker.active .pickerMenu {
    display: block
}
.pickerBody {
    padding: 0.75rem;
    border-radius: 0.375rem
}
.pickerMenu {
    border-radius: 0.375rem;
    overflow-y: auto;
    max-height: calc(10 * 36px)
}
.pickerMenu .pickerItem {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    text-decoration: none;
    color: #283541
}
.pickerMenu .pickerItem:last-child {
    border-bottom: 0
}
.suggestion .pickerMenu, .fill .pickerBody {
    width: 100%
}
.pickerEnd .pickerBody, .pickerEnd .pickerMenu {
    right: 0;
    left: auto
}`
  await execute(input, output, {log: false, file: './examples/picker/picker.css'})
})