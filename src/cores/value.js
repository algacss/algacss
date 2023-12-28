const camelDash = require('../helpers/camelDash.js')
const lightenDarkenColor = require('../helpers/lightenDarkenColor.js')
const capValue = require('../helpers/capValue.js')
const camelValue = require('../helpers/camelValue.js')
const svgHelper = require('../helpers/svgHelper.js')
const calcHelper = require('../helpers/calcHelper.js')
const values = require('../configs/values.js')
const units = require('../configs/units.js')
const color = require('../configs/color.js')
const specialValues = ['currentColor', 'optimizeLegibility']

module.exports = (value, opt = {}) => {
  let newValue = value.replaceAll('_', ' ')
  const newUnits = [...units.length, ...units.angle, ...units.time, ...units.resolution]
  const newColor = opt?.color || color
  
  if(Object.keys(values).includes(newValue.trim())) {
    newValue = values[newValue.trim()]
  }
  else if(Object.keys(newColor).includes(newValue.trim())) {
    newValue = newColor[newValue.trim()]
  }
  if(newValue.trim().startsWith('lighten(') || newValue.trim().startsWith('darken(')) {
    const splitValues = newValue.trim().split(/\(|\)|\,/g)
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
    newValue = '#'+ lightenDarkenColor(colorValue.replaceAll('#', ''), Number(amtValue))
  }
  else if(newValue.trim().startsWith('refs(') || newValue.trim().startsWith('props(') || newValue.trim().startsWith('scopes(')) {
    const splitValues = newValue.trim().split(/\(|\)/g)
    if(newValue.trim().startsWith('scopes(')) {
      newValue = `var(--scope-${splitValues[1]}, ${opt[splitValues[0]][splitValues[1]].value || newValue})`
    } else {
      newValue = opt[splitValues[0]][splitValues[1]].value || newValue
    }
    if(splitValues[2]) {
      newValue = newValue + splitValues[2]
    }
  }
  else if(newValue.trim().startsWith('cap(') || newValue.trim().startsWith('camel(') || newValue.trim().startsWith('lower(') || newValue.trim().startsWith('upper(') || newValue.trim().startsWith('each(')) {
    const splitValues = newValue.trim().split(/\(|\)/g)
    newValue = opt[splitValues[1].trim()] || newValue
    if(splitValues[0].trim() === 'cap') {
      newValue = capValue(newValue)
    } else if(splitValues[0].trim() === 'camel') {
      newValue = camelValue(newValue)
    } else if(splitValues[0].trim() === 'lower') {
      newValue = newValue.toLowerCase()
    } else if(splitValues[0].trim() === 'upper') {
      newValue = newValue.toUpperCase()
    }
    if(splitValues[2]) {
      newValue = newValue + splitValues[2]
    }
  }
  else if(!specialValues.includes(newValue) && !newValue.includes('(') && !newValue.includes(')') && !newValue.includes(specialValues[0]) && !newValue.includes(specialValues[1])) {
    newValue = camelDash(newValue)
  }
  if(isNaN(newValue) === false && opt?.property) {
    if(['width', 'maxWidth', 'minWidth', 'height', 'maxHeight', 'minHeight', 'top', 'right', 'bottom', 'left'].includes(opt.property)) {
      if(Number(newValue) !== 0 && isNaN(opt?.value) === false) {
        newValue = newValue + '%'
      }
    } else if(['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontSize'].includes(opt.property)) {
      if(Number(newValue) !== 0) {
        newValue = (Number(newValue) * 0.25) + 'rem'
      }
    } else if(['borderWidth'].includes(opt.property)) {
      newValue = newValue + 'px'
    }
  }
  else if(/\d+/g.test(newValue)) {
    const unitVals = []
    for(let newVal of newValue.split(' ')) {
      const splitValByNum = newVal.split(/\d+/g)
      if(newVal.startsWith('n') && newUnits.includes(splitValByNum[Number(splitValByNum.length) - 1])) {
        unitVals.push(newVal.replace('n', '-'))
      } else if(newVal.includes('/')) {
        const splitValue = newVal.split('/')
        if(isNaN(splitValue[0]) === false && isNaN(splitValue[1]) === false) {
          unitVals.push(Number(((Number(splitValue[0]) / Number(splitValue[1])) * 100).toFixed(6)) + '%')
        } else {
          unitVals.push(newVal)
        }
      } else {
        unitVals.push(newVal)
      }
    }
    newValue = unitVals.join(' ')
  }
  if(newValue.includes('pct')) {
    newValue = newValue.replaceAll('pct', '%')
  }
  if(newValue.includes('hex')) {
    newValue = newValue.replaceAll('hex', '#')
  }
  if(newValue.trim().startsWith('svg(')) {
    newValue = svgHelper(newValue)
  } else if(newValue.trim().startsWith('add(') || newValue.trim().startsWith('sub(') || newValue.trim().startsWith('div(') || newValue.trim().startsWith('times(')) {
    newValue = calcHelper(newValue)
  }
  return newValue
}
