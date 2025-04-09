const execute = require('../execute.js')

test('Testing tooltip component', async () => {
  const input = '@use tooltip;'
  const output = `.tooltip {
    position: relative;
    display: inline-block
}
.tooltip .tooltipContent {
    visibility: hidden;
    width: 140px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s
}
.tooltip .tooltipContent::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent
}
.tooltip.active .tooltipContent, .tooltip.show .tooltipContent, .tooltip.tooltipActive:active .tooltipContent, .tooltip.tooltipHover:hover .tooltipContent {
    visibility: visible;
    opacity: 1
}`
  await execute(input, output, {log: false, file: './examples/tooltip/tooltip.css'})
})
