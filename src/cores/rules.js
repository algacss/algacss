const postcss = require('postcss')
const preset = require('../configs/preset.js')
const state = require('../configs/state.js')
const color = require('../configs/color.js')
const shorts = require('../configs/shorts.js')
const properties = require('../configs/properties.js')
const camelDash = require('../helpers/camelDash.js')
const value = require('./value.js')

module.exports = (ref, source, opts) => {
  let arr = []
  const newPreset = opts?.preset || preset
  const newState = opts?.state || state
  const newColor = opts?.color || color
  const newImportant = opts?.important === false ? false : true
  
  const refs = ref.replace('--', '-n').replaceAll('_-', '_n').trim().split(/-|:/).filter(i => i !== '')
  
  if(ref.includes(':') && refs[0] === 'scope') {
    const newReplacedSelector = '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)')
    const newRule = postcss.rule({ selector: newReplacedSelector, source: source })
    const declVal = postcss.decl({ prop: '--scope-'+refs[1], value: refs[2], source: source })
    newRule.append(declVal)
    arr.push(newRule)
  } else if(ref.includes(':') && [...properties, ...Object.keys(newPreset), ...Object.keys(newColor), ...Object.keys(shorts)].includes(refs[1])) { // for state colon like hover or active
    /*if('preset' in opts && Object.keys(opts.preset).includes(refs[1])) {
      refs[1] = opts.preset[refs[1]]
    }*/
    
    if(['rtl', 'ltr', ...Object.keys(newState)].includes(refs[0])) {
      const newReplacedSelector = '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)')
      let newRule = postcss.rule({ selector: newReplacedSelector+''+opts.state[refs[0]].state, source: source })
      if(['rtl', 'ltr'].includes(refs[0])) {
        newRule = postcss.rule({ selector: opts.state[refs[0]].state+' '+newReplacedSelector, source: source })
      }
      //const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2]) })
      //newRule.append(declVal)
      if(Object.keys(newColor).includes(refs[1])) {
        let newNum = 0
        if(refs[3] || isNaN(refs[2]) === false) {
          newNum = refs[3]
        }
        let newValue = `lighten(${refs[1]},${newNum})`
        if(refs[2] === 'dark') {
          newValue = `darken(${refs[1]},${newNum})`
        }
        const bgDeclVal = postcss.decl({ prop: 'background-color', value: value(newValue, opts) + (newImportant ? ' !important' : ''), source: source })
        newRule.append(bgDeclVal)
        const bdDeclVal = postcss.decl({ prop: 'border-color', value: value(newValue, opts) + (newImportant ? ' !important' : ''), source: source })
        newRule.append(bdDeclVal)
        const fgDeclVal = postcss.decl({ prop: 'color', value: '#fff' + (newImportant ? ' !important' : ''), source: source })
        newRule.append(fgDeclVal)
      } else if(Object.keys(shorts).includes(refs[1])) {
        const newShorts = shorts[refs[1]]
        for(let newShort of newShorts) {
          const refOpt = {
            ...opts,
            property: newShort
          }
          const declVal = postcss.decl({ prop: camelDash(newShort), value: value(refs[2], refOpt) + (newImportant ? ' !important' : ''), source: source })
          newRule.append(declVal)
        }
      } else {
        // Switch from preset to real property like m to margin
        if(Object.keys(newPreset).includes(refs[1])) {
          refs[1] = newPreset[refs[1]]
        }
        
        const refOpt = {
          ...opts,
          property: refs[1]
        }
        
        const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2], refOpt) + (newImportant ? ' !important' : ''), source: source })
        newRule.append(declVal)
      }
      
      arr.push(newRule)
    }
  } else { // for a class that not have a colon in it
    if(['ms', 'me', 'ps', 'pe'].includes(refs[0])) {
      const refDirectionMode = {
        ms: [{ltr: 'marginLeft'}, {rtl: 'marginRight'}],
        me: [{ltr: 'marginRight'}, {rtl: 'marginLeft'}],
        ps: [{ltr: 'paddingLeft'}, {rtl: 'paddingRight'}],
        pe: [{ltr: 'paddingRight'}, {rtl: 'paddingLeft'}]
      }
      let newRule = null
      for(let dirMode of refDirectionMode[refs[0]]) {
        if(dirMode.ltr) {
          newRule = postcss.rule({ selector: opts.state['ltr'].state+' .'+ref.replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
          const refOpt = {
            ...opts,
            property: dirMode.ltr
          }
          const declVal = postcss.decl({ prop: camelDash(dirMode.ltr), value: value(refs[1], refOpt) + (newImportant ? ' !important' : ''), source: source })
          newRule.append(declVal)
        } else if(dirMode.rtl) {
          newRule = postcss.rule({ selector: opts.state['rtl'].state+' .'+ref.replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
          const refOpt = {
            ...opts,
            property: dirMode.rtl
          }
          const declVal = postcss.decl({ prop: camelDash(dirMode.rtl), value: value(refs[1], refOpt) + (newImportant ? ' !important' : ''), source: source })
          newRule.append(declVal)
        }
      }
      arr.push(newRule)
    } else if(['cols', 'col', 'offset'].includes(refs[0])) {
      if('col' === refs[0]) {
        const newRule = postcss.rule({ selector: '.cols .'+ref.replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
        let valNum = 'auto';
        if(isNaN(refs[1]) === false) {
          valNum = 8.33333333 * Number(refs[1])
          valNum = String(valNum)+'%'
        }
        const newCols = [
          {prop: 'flex', value: '0 0 auto'},
          {prop: 'width', value: valNum},
        ]
        for(let newCol of newCols) {
          const declVal = postcss.decl({ prop: camelDash(newCol.prop), value: newCol.value + (newImportant ? ' !important' : ''), source: source })
          newRule.append(declVal)
        }
        arr.push(newRule)
      } else if('offset' === refs[0]) {
        for(let offset = 0; offset < 2; offset++){
          const dirMode = offset >= 1 ?  opts.state['rtl'].state+' ' : ''
          const newRule = postcss.rule({ selector: dirMode+'.cols .'+ref.replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
          let valNum = 'auto';
          if(isNaN(refs[1]) === false) {
            valNum = 8.33333333 * Number(refs[1])
            valNum = String(valNum)+'%'
          }
          const newCols = [
            {prop: 'flex', value: '0 0 auto'},
            {prop: (offset >= 1 ? 'marginRight' : 'marginLeft'), value: valNum},
          ]
          for(let newCol of newCols) {
            const declVal = postcss.decl({ prop: camelDash(newCol.prop), value: newCol.value + (newImportant ? ' !important' : ''), source: source })
            newRule.append(declVal)
          }
          arr.push(newRule)
        }
      } else {
        const newRule = postcss.rule({ selector: '.'+ref.replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)')+' > *', source: source })
        let valNum = 'auto';
        if(isNaN(refs[1]) === false) {
          valNum = 100 / Number(refs[1])
          valNum = String(valNum)+'%'
        }
        const newCols = [
          {prop: 'flex', value: '0 0 auto'},
          {prop: 'width', value: valNum},
        ]
        for(let newCol of newCols) {
          const declVal = postcss.decl({ prop: camelDash(newCol.prop), value: newCol.value + (newImportant ? ' !important' : ''), source: source })
          newRule.append(declVal)
        }
        arr.push(newRule)
      }
    } else if([...properties, ...Object.keys(newPreset), ...Object.keys(newColor), ...Object.keys(shorts)].includes(refs[0])) {
      const newRule = postcss.rule({ selector: '.'+ref.replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
      if(Object.keys(newColor).includes(refs[0])) {
        let newNum = 0
        if(refs[2] || isNaN(refs[1]) === false) {
          newNum = refs[2]
        }
        let newValue = `lighten(${refs[0]},${newNum})`
        if(refs[1] === 'dark') {
          newValue = `darken(${refs[0]},${newNum})`
        }
        const bgDeclVal = postcss.decl({ prop: 'background-color', value: value(newValue, opts) + (newImportant ? ' !important' : ''), source: source })
        newRule.append(bgDeclVal)
        const bdDeclVal = postcss.decl({ prop: 'border-color', value: value(newValue, opts) + (newImportant ? ' !important' : ''), source: source })
        newRule.append(bdDeclVal)
        const fgDeclVal = postcss.decl({ prop: 'color', value: '#fff' + (newImportant ? ' !important' : ''), source: source })
        newRule.append(fgDeclVal)
      } else if(Object.keys(shorts).includes(refs[0])) {
        const newShorts = shorts[refs[0]]
        for(let newShort of newShorts) {
          const refOpt = {
            ...opts,
            property: newShort
          }
          const declVal = postcss.decl({ prop: camelDash(newShort), value: value(refs[1], refOpt) + (newImportant ? ' !important' : ''), source: source })
          newRule.append(declVal)
        }
      } else {
        // Switch from preset to real property like m to margin
        if(Object.keys(newPreset).includes(refs[0])) {
          refs[0] = newPreset[refs[0]]
        }
        
        const refOpt = {
          ...opts,
          property: refs[0]
        }
        
        const declVal = postcss.decl({ prop: camelDash(refs[0]), value: value(refs[1], refOpt) + (newImportant ? ' !important' : ''), source: source })
        newRule.append(declVal)
      }
      
      arr.push(newRule)
    }
  }
  
  return arr
}
