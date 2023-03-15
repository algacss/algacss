const postcss = require('postcss')
const preset = require('../configs/preset.js')
const state = require('../configs/state.js')
const color = require('../configs/color.js')
const shorts = require('../configs/shorts.js')
const properties = require('../configs/properties.js')
const camelDash = require('../helpers/camelDash.js')
const flatScreen = require('../helpers/flatScreen.js')
const value = require('./value.js')

module.exports = (obj, ref, source, opts) => {
  let newObj = Object.assign({}, obj)
  const newPreset = opts?.preset || preset
  const newState = opts?.state || state
  const newColor = opts?.color || color
  const newImportant = opts?.important === false ? false : true
  
  const refs = ref.replace('--', '-n').replaceAll('_-', '_n').trim().split(/-|:/).filter(i => i !== '')
  
  if(ref.includes(':')) { //Number(refs.length) === 3
    /*if('preset' in opts && Object.keys(opts.preset).includes(refs[1])) {
      refs[1] = opts.preset[refs[1]]
    }*/
    
    const newScreen = Object.assign({}, flatScreen(opts.screen))
    if(Object.keys(newScreen).includes(refs[0])) {
      
      if(Object.keys(newState).includes(refs[1])) {
        if([...properties, ...Object.keys(newPreset), ...Object.keys(newColor), ...Object.keys(shorts)].includes(refs[2])) {
          if(!newObj[refs[0]]) {
            if(newScreen[refs[0]].minmax === 'max') {
              newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(max-width: ${newScreen[refs[0]].size})`, source: source })
            } else {
              newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(min-width: ${newScreen[refs[0]].size})`, source: source })
            }
          }
          
          const newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)')+''+opts.state[refs[1]].state, source: source })
          //const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2]) })
          //newRule.append(declVal)
          if(Object.keys(newColor).includes(refs[2])) {
            let newNum = 0
            if(refs[4] || isNaN(refs[3]) === false) {
              newNum = refs[4]
            }
            let newValue = `lighten(${refs[1]},${newNum})`
            if(refs[3] === 'dark') {
              newValue = `darken(${refs[1]},${newNum})`
            }
            const bgDeclVal = postcss.decl({ prop: 'background-color', value: value(newValue, opts) + (newImportant ? ' !important' : ''), source: source })
            newRule.append(bgDeclVal)
            const bdDeclVal = postcss.decl({ prop: 'border-color', value: value(newValue, opts) + (newImportant ? ' !important' : ''), source: source })
            newRule.append(bdDeclVal)
            const fgDeclVal = postcss.decl({ prop: 'color', value: '#fff' + (newImportant ? ' !important' : ''), source: source })
            newRule.append(fgDeclVal)
          } else if(Object.keys(shorts).includes(refs[2])) {
            const newShorts = shorts[refs[2]]
            for(let newShort of newShorts) {
              const refOpt = {
                ...opts,
                property: newShort
              }
              const declVal = postcss.decl({ prop: camelDash(newShort), value: value(refs[3], refOpt) + (newImportant ? ' !important' : ''), source: source })
              newRule.append(declVal)
            }
          } else {
            // Switch from preset to real property like m to margin
            if(Object.keys(newPreset).includes(refs[2])) {
              refs[2] = newPreset[refs[2]]
            }
            
            const refOpt = {
              ...opts,
              property: refs[2]
            }
            
            const declVal = postcss.decl({ prop: camelDash(refs[2]), value: value(refs[3], refOpt) + (newImportant ? ' !important' : ''), source: source })
            newRule.append(declVal)
          }
          
          newObj[refs[0]].append(newRule)
        }
      } else {
        if([...properties, ...Object.keys(newPreset), ...Object.keys(newColor), ...Object.keys(shorts)].includes(refs[1])) {
          if(!newObj[refs[0]]) {
            if(newScreen[refs[0]].minmax === 'max') {
              newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(max-width: ${newScreen[refs[0]].size})`, source: source })
            } else {
              newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(min-width: ${newScreen[refs[0]].size})`, source: source })
            }
          }
          
          const newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
          /*const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2]) })
          newRule.append(declVal)*/
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
          
          newObj[refs[0]].append(newRule)
        }
      }
    } else if(Object.keys(opts.prefers).includes(refs[0])) {
      if([...properties, ...Object.keys(newPreset), ...Object.keys(newColor), ...Object.keys(shorts)].includes(refs[1])) {
        if(!newObj[refs[0]]) {
          newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(${opts.prefers[refs[0]].media}: ${opts.prefers[refs[0]].prefers})`, source: source })
        }
        
        let newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
        if(opts.prefers[refs[0]]?.selector) {
          newRule = postcss.rule({ selector: 'html'+opts.prefers[refs[0]].selector+' .'+ref
            .replaceAll(':', '\\:')
            .replaceAll('.', '\\.')
            .replaceAll(',', '\\,')
            .replaceAll('/', '\\/')
            .replaceAll('(', '\\(')
            .replaceAll(')', '\\)')
          , source: source })
        }
        //const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2], opts) })
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
        
        newObj[refs[0]].append(newRule)
      }
    } else if(refs[0] === 'print') {
      if([...properties, ...Object.keys(newPreset), ...Object.keys(newColor), ...Object.keys(shorts)].includes(refs[1])) {
        if(!newObj[refs[0]]) {
          newObj[refs[0]] = postcss.atRule({ name: 'media', params: 'print', source: source })
        }
        
        let newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll(',', '\\,').replaceAll('/', '\\/').replaceAll('(', '\\(').replaceAll(')', '\\)'), source: source })
        if(opts.prefers[refs[0]]?.selector) {
          newRule = postcss.rule({ selector: 'html'+opts.prefers[refs[0]].selector+' .'+ref
            .replaceAll(':', '\\:')
            .replaceAll('.', '\\.')
            .replaceAll(',', '\\,')
            .replaceAll('/', '\\/')
            .replaceAll('(', '\\(')
            .replaceAll(')', '\\)')
          , source: source })
        }
        //const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2], opts) })
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
        
        newObj[refs[0]].append(newRule)
      }
    }
  }
  
  return newObj
}
