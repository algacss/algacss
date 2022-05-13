const execute = require('../execute.js')

test('Testing dropzone component', async () => {
  const input = '@use dropZone;'
  const output = `.dropZone {
    overflow-wrap: break-word;
    padding: 0.5rem;
    max-width: calc(100vw - 0.5rem);
    max-height: calc(100vh - 0.5rem)
}
.dropZone .dropZoneFile {
    position: absolute;
    width: 0px;
    height: 0px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px)
}
.dropZone .dropZoneWrap {
    border: 3px dashed currentColor;
    box-shadow: -1px 5px 25px -9px rgba(0, 0, 0, 0.2)
}
.dropZone .dropZoneWrap .dropZoneLabel {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding-top: 1.5rem;
    padding-bottom: 2.5rem;
    cursor: pointer
}
.dropZone .dropZoneWrap .dropZoneImage {
    pointer-events: none;
    color: currentColor
}
.dropZone .dropZoneWrap .dropZoneBody {
    text-align: center
}
.dropZone .dropZoneWrap .dropZoneBody p, .dropZone .dropZoneWrap .dropZoneBody span {
    margin: 0px
}
.dropZone .dropZoneWrap .dropZoneBody .dropZoneTitle {
    color: #333
}
.dropZone .dropZoneWrap .dropZoneBody .dropZoneText {
    color: #737373
}
.dropZone .dropZoneWrap .dropZoneBody .button {
    background-color: transparent;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    pointer-events: none;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
    user-select: none;
    margin-top: 1.25rem;
    border-radius: 0.35rem;
    color: currentColor;
    border: 2px solid currentColor;
    padding: 0.375rem 0.75rem
}`
  await execute(input, output, {log: false, file: './examples/dropZone/dropZone.css'})
})
