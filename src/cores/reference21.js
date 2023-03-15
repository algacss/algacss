const preset = require('../configs/preset.js')
const properties = require('../configs/properties.js')
const camelDash = require('../helpers/camelDash.js')
const value = require('./value21.js')

module.exports = (ref, opt = {}) => {
  let references = {}
  const newPreset = opt?.preset || preset
  
  const refs = ref.value.split(' ').filter(i => i !== '').map(item => {
    if(item.startsWith('mx-')) {
      item = [item.replace('mx-', 'mr-'), item.replace('mx-', 'ml-')]
    } else if(item.startsWith('my-')) {
      item = [item.replace('my-', 'mt-'), item.replace('my-', 'mb-')]
    } else if(item.startsWith('px-')) {
      item = [item.replace('px-', 'pr-'), item.replace('px-', 'pl-')]
    } else if(item.startsWith('py-')) {
      item = [item.replace('py-', 'pt-'), item.replace('py-', 'pb-')]
    }
    return item
  }).flat()
  
  for(let rf of refs) {
    const props = rf.replace('--', '-n').replaceAll('_-', '_n').trim().split('-').filter(i => i !== '')
    
    if(!rf.includes(':') && props.length >= 2) { // && Number(props.length) === 2
      if([...properties, ...Object.keys(newPreset)].includes(props[0])) {
        // Switch from preset to real property like m to margin
        if(Object.keys(newPreset).includes(props[0])) {
          props[0] = newPreset[props[0]]
        }
        const refOpt = {
          ...opt,
          property: props[0],
          value: props[1]
        }
        
        const valueWithoutUnderscore = props[1].split('_').map(item => {
          return value(item, refOpt)
        }).join(' ')
        
        const refObj = {}
        refObj[camelDash(props[0])] = {
          value: valueWithoutUnderscore,
          source: ref.source
        }
        
        references = Object.assign({}, references, refObj)
      }
    }
  }
  return references
}
