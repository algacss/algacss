const postcss = require('postcss')
const flatScreen = require('../helpers/flatScreen.js')
const statusValue = require('../helpers/statusValue.js')
const color = require('../configs/color.js')
const lightenDarkenColor = require('../helpers/lightenDarkenColor.js')

const declaration = (body, defs, opts) => {
  const refs = defs.refs
  const props = defs.props
  const provide = defs.provide
  const screen = Object.assign({}, flatScreen(opts.screen))
  const state = Object.assign({}, statusValue(opts.state))
  const prefers = Object.assign({}, statusValue(opts.prefers))
  const newColor = opts?.color || color
  let ruleArray = []
  let atRuleArray = []
  
  for(let item of body) {
    const itemKey = Object.keys(item)[0]
    if(itemKey.startsWith('@if ')) {
      const itemValue = Object.values(item)[0]
      const ifKey = itemKey.replace('@if ', '')
      if(ifKey.includes(' is ')) {
        const splitKey = ifKey.trim().split(/\sis\s/g).filter(i => i !== '')
        if(
          (typeof props === 'object' && props !== null && splitKey[0].trim() in props && props[splitKey[0].trim()].value === splitKey[1].trim()) ||
          (typeof refs === 'object' && refs !== null && splitKey[0].trim() in refs && refs[splitKey[0].trim()].value === splitKey[1].trim())
        ) {
          ruleArray.push([
            ...declaration((itemValue?.value || itemValue), defs, opts)
          ])
        }
      } else if(ifKey.includes(' has ')) {
        const splitKey = ifKey.trim().split(/\shas\s/g).filter(i => i !== '')
        if(
          (typeof props === 'object' && props !== null && splitKey[0].trim() in props && props[splitKey[0].trim()].value.replaceAll(' ', '').split(',').filter(i => i !== '').includes(splitKey[1].trim())) ||
          (typeof refs === 'object' && refs !== null && splitKey[0].trim() in refs && refs[splitKey[0].trim()].value.replaceAll(' ', '').split(',').filter(i => i !== '').includes(splitKey[1].trim()))
        ) {
          ruleArray.push([
            ...declaration((itemValue?.value || itemValue), defs, opts)
          ])
        }
      }
    } else if(itemKey.startsWith('@keyframes ')) {
      const itemValue = Object.values(item)[0]
      const newAtRule = postcss.atRule({ name: 'keyframes', params: itemKey.replace('@keyframes ', '').trim(), source: Object.values(itemValue[0])[0].source })
      newAtRule.append([...declaration(itemValue, defs, opts)])
      ruleArray.push(newAtRule)
    } else {
      const itemValues = Object.entries(item[itemKey].value)
      let selectorItemKey = itemKey
      if(selectorItemKey.includes('refs(') || selectorItemKey.includes('props(')) {
        selectorItemKey = itemKey
                          .replaceAll(/refs\((\w+)\)/g, '<=>refs===$1<=>')
                          .replaceAll(/props\((\w+)\)/g, '<=>props===$1<=>')
                          .split('<=>').map(i => {
          if(i.startsWith('refs===') || i.startsWith('props===')) {
            const arrowValues = i.split('===')
            i = defs[arrowValues[0]][arrowValues[1]].value || `${arrowValues[0]}-${arrowValues[1]}`
          }
          return i
        }).filter(i => i !== '').join('')
      }
      const newRule = postcss.rule({ selector: selectorItemKey, source: item[itemKey].source })
      for(let [key, val] of itemValues) {
        const sourceItemVal = val.source
        if(typeof val.value === 'string') {
          if(key.trim().startsWith('inject-')) {
            for(let [keyInject, valInject] of Object.entries(provide[props[val.value].value].value)) {
              let declVal = postcss.decl({ prop: keyInject.trim(), value: valInject.value, source: valInject.source })
              newRule.append(declVal)
            }
          } else {
            let declVal = undefined
            if(val.value.trim().startsWith('{') && val.value.trim().endsWith('}')) {
              let newDeclVal = val.value.replace('{', '').replace('}', '').trim()
              const splitDeclVal = newDeclVal.split(/\(|\)|\s|,/g).filter(i => i !== '')
              if(Number(splitDeclVal.length) === 1) {
                declVal = postcss.decl({ prop: key.trim(), value: props[newDeclVal].value, source: props[newDeclVal].source })
              } else {
                for(let splittedDecl of splitDeclVal) {
                  if(props[splittedDecl]?.value) {
                    newDeclVal = newDeclVal.replaceAll(splittedDecl, props[splittedDecl].value)
                  }
                }
                declVal = postcss.decl({ prop: key.trim(), value: newDeclVal, source: sourceItemVal })
              }
            } else {
              declVal = postcss.decl({ prop: key.trim(), value: val.value.trim().split(' ').map(i => {
                if(i.startsWith('refs(') || i.startsWith('props(')) {
                  const arrowValues = i.split(/\(|\)/g)
                  i = defs[arrowValues[0]][arrowValues[1]].value || i
                  if(arrowValues[2]) {
                    i = i + arrowValues[2]
                  }
                } else if(i.startsWith('lighten(') || i.startsWith('darken(')) {
                  const splitValues = i.split(/\(|\)|\,/g)
                  let colorValue = splitValues[1]
                  let amtValue = splitValues[2]
                  if(colorValue.includes('hex')) {
                    colorValue = colorValue.replaceAll('hex', '')
                  }
                  if(Object.keys(newColor).includes(colorValue)) {
                    colorValue = newColor[colorValue]
                  }
                  if(splitValues[0] === 'darken') {
                    amtValue = '-' + amtValue
                  }
                  i = '#'+ lightenDarkenColor(colorValue.replaceAll('#', ''), Number(amtValue))
                } else if(i.startsWith('calc(')) {
                  i = i.replaceAll('props(', '_props(').replaceAll('refs(', '_refs(').replaceAll(')', ')_').split('_').map(item => {
                    if(item.trim().startsWith('refs(') || item.trim().startsWith('props(')) {
                      const splitValues = item.trim().split(/\(|\)/g)
                      item = defs[splitValues[0]][splitValues[1]].value || item
                      if(splitValues[2]) {
                        item = item + splitValues[2]
                      }
                    }
                    return item
                  }).join('')
                } else if(i.startsWith('add(') || i.startsWith('sub(') || i.startsWith('div(') || i.startsWith('times(')) {
                  i = i.replaceAll('props(', '_props(').replaceAll('refs(', '_refs(').replaceAll(')', ')_').split('_').map(item => {
                    if(item.trim().startsWith('refs(') || item.trim().startsWith('props(')) {
                      const splitValues = item.trim().split(/\(|\)/g)
                      item = defs[splitValues[0]][splitValues[1]].value || item
                      if(splitValues[2]) {
                        item = item + splitValues[2]
                      }
                    }
                    return item
                  }).join('')
                  
                  if(i.startsWith('add(')) {
                    i = i.replace('add', 'calc').replace(/\,|\s\,/g, ' + ')
                  } else if(i.startsWith('sub(')) {
                    i = i.replace('sub', 'calc').replace(/\,|\s\,/g, ' - ')
                  } else if(i.startsWith('div(')) {
                    i = i.replace('div', 'calc').replace(/\,|\s\,/g, ' / ')
                  } else if(i.startsWith('times(')) {
                    i = i.replace('times', 'calc').replace(/\,|\s\,/g, ' * ')
                  }
                }
                return i
              }).join(' ').trim(), source: sourceItemVal })
            }
            newRule.append(declVal)
          }
        } else {
          const splitKey = key.split('-')
          if(splitKey.length >= 2) {
            if(Object.keys(screen).includes(splitKey[1])) {
              screen[splitKey[1]].value[itemKey] = Object.assign({}, screen[splitKey[1]].value[itemKey], val)
              screen[splitKey[1]].status = true
              screen[splitKey[1]].source = sourceItemVal
            } else if(Object.keys(state).includes(splitKey[1])) {
              state[splitKey[1]].value[itemKey] = Object.assign({}, state[splitKey[1]]['value'][itemKey], val)
              state[splitKey[1]].status = true
              state[splitKey[1]].source = sourceItemVal
            } else if(Object.keys(prefers).includes(splitKey[1])) {
              prefers[splitKey[1]].value[itemKey] = Object.assign({}, prefers[splitKey[1]]['value'][itemKey], val)
              prefers[splitKey[1]].status = true
              prefers[splitKey[1]].source = sourceItemVal
              
            }
          }
        }
      }
      
      if((newRule?.nodes?.length || 0) >= 1) {
        ruleArray.push(newRule)
      }
    }
  }
  
  for(let [entryKey, entryVal] of Object.entries(screen)) {
    if(entryVal.status) {
      let newAtRule = undefined
      if(entryVal.minmax === 'max') {
        newAtRule = postcss.atRule({ name: 'media', params: `(max-width: ${entryVal.size})`, source: entryVal.source })
      } else {
        newAtRule = postcss.atRule({ name: 'media', params: `(min-width: ${entryVal.size})`, source: entryVal.source })
      }
      for(let [itemKey, itemValue] of Object.entries(entryVal.value)) {
        let selectorItemKey = itemKey
        if(selectorItemKey.includes('refs(') || selectorItemKey.includes('props(')) {
          selectorItemKey = itemKey
                            .replaceAll(/refs\((\w+)\)/g, '<=>refs===$1<=>')
                            .replaceAll(/props\((\w+)\)/g, '<=>props===$1<=>')
                            .split('<=>').map(i => {
            if(i.startsWith('refs===') || i.startsWith('props===')) {
              const arrowValues = i.split('===')
              i = defs[arrowValues[0]][arrowValues[1]].value || `${arrowValues[0]}-${arrowValues[1]}`
            }
            return i
          }).filter(i => i !== '').join('')
        }
        const newRule = postcss.rule({ selector: selectorItemKey, source: entryVal.source })
        for(let [key, val] of Object.entries(itemValue)) {
          if(typeof val.value === 'string') {
            let declVal = undefined
            if(val.value.trim().startsWith('{') && val.value.trim().endsWith('}')) {
              declVal = postcss.decl({ prop: key.trim(), value: props[val.value.replace('{', '').replace('}', '').trim()].value, source: props[val.value.replace('{', '').replace('}', '').trim()].source })
            } else {
              declVal = postcss.decl({ prop: key.trim(), value: val.value.split(' ').map(i => {
                if(i.startsWith('props(')) {
                  const arrowValues = i.split(/\(|\)/g)
                  i = defs[arrowValues[0]][arrowValues[1]].value || i
                  if(arrowValues[2]) {
                    i = i + arrowValues[2]
                  }
                } else if(i.startsWith('lighten(') || i.startsWith('darken(')) {
                  const splitValues = i.split(/\(|\)|\,/g)
                  let colorValue = splitValues[1]
                  let amtValue = splitValues[2]
                  if(colorValue.includes('hex')) {
                    colorValue = colorValue.replaceAll('hex', '')
                  }
                  if(Object.keys(newColor).includes(colorValue)) {
                    colorValue = newColor[colorValue]
                  }
                  if(splitValues[0] === 'darken') {
                    amtValue = '-' + amtValue
                  }
                  i = '#'+ lightenDarkenColor(colorValue.replaceAll('#', ''), Number(amtValue))
                } else if(i.startsWith('calc(')) {
                  i = i.replaceAll('props(', '_props(').replaceAll(')', ')_').split('_').map(item => {
                    if(item.trim().startsWith('props(')) {
                      const splitValues = item.trim().split(/\(|\)/g)
                      item = defs[splitValues[0]][splitValues[1]].value || item
                      if(splitValues[2]) {
                        item = item + splitValues[2]
                      }
                    }
                    return item
                  }).join('')
                } else if(i.startsWith('add(') || i.startsWith('sub(') || i.startsWith('div(') || i.startsWith('times(')) {
                  i = i.replaceAll('props(', '_props(').replaceAll(')', ')_').split('_').map(item => {
                    if(item.trim().startsWith('props(')) {
                      const splitValues = item.trim().split(/\(|\)/g)
                      item = defs[splitValues[0]][splitValues[1]].value || item
                      if(splitValues[2]) {
                        item = item + splitValues[2]
                      }
                    }
                    return item
                  }).join('')
                  
                  if(i.startsWith('add(')) {
                    i = i.replace('add', 'calc').replace(/\,|\s\,/g, ' + ')
                  } else if(i.startsWith('sub(')) {
                    i = i.replace('sub', 'calc').replace(/\,|\s\,/g, ' - ')
                  } else if(i.startsWith('div(')) {
                    i = i.replace('div', 'calc').replace(/\,|\s\,/g, ' / ')
                  } else if(i.startsWith('times(')) {
                    i = i.replace('times', 'calc').replace(/\,|\s\,/g, ' * ')
                  }
                }
                return i
              }).join(' ').trim(), source: val.source })
            }
            newRule.append(declVal)
          }
        }
        newAtRule.append(newRule)
      }
      atRuleArray.push(newAtRule)
    }
  }
  
  for(let [entryKey, entryVal] of Object.entries(prefers)) {
    if(entryVal.status) {
      let newAtRule = postcss.atRule({ name: 'media', params: `(${entryVal.media}: ${entryVal.prefers})`, source: entryVal.source })
      for(let [itemKey, itemValue] of Object.entries(entryVal.value)) {
        let selectorItemKey = itemKey
        if(selectorItemKey.includes('refs(') || selectorItemKey.includes('props(')) {
          selectorItemKey = itemKey
                            .replaceAll(/refs\((\w+)\)/g, '<=>refs===$1<=>')
                            .replaceAll(/props\((\w+)\)/g, '<=>props===$1<=>')
                            .split('<=>').map(i => {
            if(i.startsWith('refs===') || i.startsWith('props===')) {
              const arrowValues = i.split('===')
              i = defs[arrowValues[0]][arrowValues[1]].value || `${arrowValues[0]}-${arrowValues[1]}`
            }
            return i
          }).filter(i => i !== '').join('')
        }
        let newRule = postcss.rule({ selector: selectorItemKey, source: entryVal.source })
        if(entryVal?.selector) {
          if(selectorItemKey.trim() === 'html') {
            newRule = postcss.rule({ selector: selectorItemKey+''+entryVal.selector, source: entryVal.source })
          } else {
            const splittedSelectors = selectorItemKey.split(', ').map(item => {
              return 'html'+entryVal.selector +' '+ item
            }).join(', ')
            newRule = postcss.rule({ selector: splittedSelectors, source: entryVal.source })
          }
        }
        for(let [key, val] of Object.entries(itemValue)) {
          if(typeof val.value === 'string') {
            let declVal = undefined
            if(val.value.trim().startsWith('{') && val.value.trim().endsWith('}')) {
              declVal = postcss.decl({ prop: key.trim(), value: props[val.value.replace('{', '').replace('}', '').trim()].value, source: props[val.value.replace('{', '').replace('}', '').trim()].source })
            } else {
              declVal = postcss.decl({ prop: key.trim(), value: val.value.split(' ').map(i => {
                if(i.startsWith('props(')) {
                  const arrowValues = i.split(/\(|\)/g)
                  i = defs[arrowValues[0]][arrowValues[1]].value || i
                  if(arrowValues[2]) {
                    i = i + arrowValues[2]
                  }
                } else if(i.startsWith('lighten(') || i.startsWith('darken(')) {
                  const splitValues = i.split(/\(|\)|\,/g)
                  let colorValue = splitValues[1]
                  let amtValue = splitValues[2]
                  if(colorValue.includes('hex')) {
                    colorValue = colorValue.replaceAll('hex', '')
                  }
                  if(Object.keys(newColor).includes(colorValue)) {
                    colorValue = newColor[colorValue]
                  }
                  if(splitValues[0] === 'darken') {
                    amtValue = '-' + amtValue
                  }
                  i = '#'+ lightenDarkenColor(colorValue.replaceAll('#', ''), Number(amtValue))
                } else if(i.startsWith('calc(')) {
                  i = i.replaceAll('props(', '_props(').replaceAll(')', ')_').split('_').map(item => {
                    if(item.trim().startsWith('props(')) {
                      const splitValues = item.trim().split(/\(|\)/g)
                      item = defs[splitValues[0]][splitValues[1]].value || item
                      if(splitValues[2]) {
                        item = item + splitValues[2]
                      }
                    }
                    return item
                  }).join('')
                } else if(i.startsWith('add(') || i.startsWith('sub(') || i.startsWith('div(') || i.startsWith('times(')) {
                  i = i.replaceAll('props(', '_props(').replaceAll(')', ')_').split('_').map(item => {
                    if(item.trim().startsWith('props(')) {
                      const splitValues = item.trim().split(/\(|\)/g)
                      item = defs[splitValues[0]][splitValues[1]].value || item
                      if(splitValues[2]) {
                        item = item + splitValues[2]
                      }
                    }
                    return item
                  }).join('')
                  
                  if(i.startsWith('add(')) {
                    i = i.replace('add', 'calc').replace(/\,|\s\,/g, ' + ')
                  } else if(i.startsWith('sub(')) {
                    i = i.replace('sub', 'calc').replace(/\,|\s\,/g, ' - ')
                  } else if(i.startsWith('div(')) {
                    i = i.replace('div', 'calc').replace(/\,|\s\,/g, ' / ')
                  } else if(i.startsWith('times(')) {
                    i = i.replace('times', 'calc').replace(/\,|\s\,/g, ' * ')
                  }
                }
                return i
              }).join(' ').trim(), source: val.source })
            }
            newRule.append(declVal)
          }
        }
        newAtRule.append(newRule)
      }
      atRuleArray.push(newAtRule)
    }
  }
  
  return [...ruleArray.flat(), ...atRuleArray]
}

module.exports = declaration
