const capValue = require('../helpers/capValue.js')
const camelValue = require('../helpers/camelValue.js')

module.exports = (root, param, opt) => {
  newSelectors = []
  for(let selector of root.selectors) {
    let newSelector = selector.trim()
    
    if(newSelector.includes('&')) {
      newSelector = newSelector.replaceAll('&', param.trim())
    } else {
      newSelector = param.trim() +' '+ newSelector
    }
    
    if(newSelector.includes('refs(') || newSelector.includes('props(')) {
      newSelector = newSelector
        .replaceAll(/refs\((\w+)\)/g, '<=>refs===$1<=>')
        .replaceAll(/props\((\w+)\)/g, '<=>props===$1<=>')
        .split('<=>').map(i => {
          if(i.startsWith('refs===') || i.startsWith('props===')) {
            const arrowValues = i.split('===')
            i = opt[arrowValues[0]][arrowValues[1]].value || `${arrowValues[0]}-${arrowValues[1]}`
          }
          return i
      }).filter(i => i !== '').join('')
    }
    
    if(newSelector.includes('cap(') || newSelector.includes('camel(') || newSelector.includes('lower(') || newSelector.includes('each(')) {
      newSelector = newSelector
        .replaceAll(/cap\((\w+)\)/g, '<=>cap===$1<=>')
        .replaceAll(/camel\((\w+)\)/g, '<=>camel===$1<=>')
        .replaceAll(/lower\((\w+)\)/g, '<=>lower===$1<=>')
        .replaceAll(/each\((\w+)\)/g, '<=>each===$1<=>')
        .split('<=>').map(i => {
          if(i.startsWith('cap===') || i.startsWith('camel===') || i.startsWith('lower===') || i.startsWith('each===')) {
            const arrowValues = i.split('===')
            i = opt[arrowValues[1].trim()] || ''
            if(arrowValues[0].trim() === 'cap' && i !== '') {
              i = capValue(i)
            } else if(arrowValues[0].trim() === 'camel' && i !== '') {
              i = camelValue(i)
            } else if(arrowValues[0].trim() === 'lower' && i !== '') {
              i = i.toLowerCase()
            }
          }
          return i
      }).filter(i => i !== '').join('')
    }
    
    newSelectors.push(newSelector.trim())
  }
  return newSelectors.join(', ')
}
