const postcss = require('postcss')
const algacss = require('../src/')
const fs = require('fs')

module.exports = async function execute(inputArg = 'a {}', outputArg = 'a {}', optionArg = {}) {
  let result = await postcss([
    algacss({...optionArg, build: true})
  ]).process(inputArg, { from: undefined, map: false })
  if('log' in optionArg && optionArg.log === true) {
    console.log(result.css);
    if('file' in optionArg && typeof optionArg.file === 'string') {
      fs.writeFileSync(optionArg.file, result.css);
    }
  } else {
    expect(result.css).toEqual(outputArg)
    expect(result.warnings()).toHaveLength(0)
  }
}

