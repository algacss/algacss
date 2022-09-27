const rules = require('./rules.js')
const atrules = require('./atrules.js')

module.exports = (refs, source, options) => {
  let render = []
  
  const newRender = []
  let newStateRender = {}
  for(let ref of Array.from(refs)) {
    newRender.push(...rules(ref, source, options))
    newStateRender = Object.assign({}, atrules(newStateRender, ref.replaceAll('\\', ''), source, options))
  }
  
  return [...newRender, ...Object.values(newStateRender)]
}
