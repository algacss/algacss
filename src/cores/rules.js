const postcss = require('postcss')
const preset = require('../configs/preset.js')
const color = require('../configs/color.js')
const shorts = require('../configs/shorts.js')
const camelDash = require('../helpers/camelDash.js')
const value = require('./value.js')

module.exports = (ref, opts) => {
  let arr = []
  const newPreset = opts?.preset || preset
  const newColor = opts?.color || color
  
  const refs = ref.trim().split('-').filter(i => i !== '') //.split(/-|:/).filter(i => i !== '')
  
  /*if(ref.includes(':')) { //Number(refs.length) === 3
    if('preset' in opts && Object.keys(opts.preset).includes(refs[1])) {
      refs[1] = opts.preset[refs[1]]
    }
    
    if(Object.keys(opts.state).includes(refs[0])) {
      const newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)')+''+opts.state[refs[0]].state })
      const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2]) })
      newRule.append(declVal)
      
      arr.push(newRule)
    }
  } else { // if(Number(refs.length) === 2)*/
  if(!ref.includes(':')) {
    const newRule = postcss.rule({ selector: '.'+ref.replaceAll('.', '\\.').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)') })
    if(Object.keys(newColor).includes(refs[0])) {
      let newNum = 0
      if(refs[2] || isNaN(refs[1]) === false) {
        newNum = refs[2]
      }
      let newValue = `lighten(${refs[0]},${newNum})`
      if(refs[1] === 'dark') {
        newValue = `darken(${refs[0]},${newNum})`
      }
      const bgDeclVal = postcss.decl({ prop: 'background-color', value: value(newValue) })
      newRule.append(bgDeclVal)
      const bdDeclVal = postcss.decl({ prop: 'border-color', value: value(newValue) })
      newRule.append(bdDeclVal)
      const fgDeclVal = postcss.decl({ prop: 'color', value: '#fff' })
      newRule.append(fgDeclVal)
    } else if(Object.keys(shorts).includes(refs[0])) {
      const newShorts = shorts[refs[0]]
      for(let newShort of newShorts) {
        const declVal = postcss.decl({ prop: camelDash(newShort), value: value(refs[1]) })
        newRule.append(declVal)
      }
    } else {
      // Switch from preset to real property like m to margin
      if(Object.keys(newPreset).includes(refs[0])) {
        refs[0] = newPreset[refs[0]]
      }
    
      const declVal = postcss.decl({ prop: camelDash(refs[0]), value: value(refs[1]) })
      newRule.append(declVal)
    }
    
    arr.push(newRule)
  }
  
  return arr
}
