const preset = require('../configs/preset.js')
const properties = require('../configs/properties.js')
const camelDash = require('../helpers/camelDash.js')

module.exports = (ref, source, opt = {}) => {
  let references = {}
  const newPreset = opt?.preset || preset
  
  const refs = ref.split(' ').filter(i => i !== '')
  for(let rf of refs) {
    const props = rf.trim().split('-').filter(i => i !== '')
    
    if(!rf.includes(':')) { // && Number(props.length) === 2
      if([...properties, ...Object.keys(newPreset)].includes(props[0])) {
        // Switch from preset to real property like m to margin
        if(Object.keys(newPreset).includes(props[0])) {
          props[0] = newPreset[props[0]]
        }
        const refOpt = {
          ...opt,
          property: props[0]
        }
        
        const refObj = {}
        refObj[camelDash(props[0])] = source
        
        references = Object.assign({}, references, refObj)
      }
    }
  }
  return references
}
