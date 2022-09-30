const screen = require('../configs/screen.js')
const camelDash = require('../helpers/camelDash.js')
const reference = require('./reference.js')
const selector = require('./selector.js')

function recursiveFunc(root, prm, opt = {}) {
  let param = (root.type === 'rule') ? selector(root, prm) : ''
  const recursiveArr = []
  const recursiveObj = {}
  recursiveObj[param] = {
    value: {},
    source: root.source
  }
  if('nodes' in root && Array.isArray(root.nodes) && root.nodes.length >= 1) {
    for(let node of root.nodes) {
      if(node.type === 'decl' && node.prop === 'ref') {
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, reference(node, opt))
      } else if(node.type === 'decl' && node.prop.startsWith('ref-')) {
        let splitRefs = node.prop.split('-')[1]
        if('preset' in opt && Object.keys(opt.preset).includes(splitRefs)) {
          splitRefs = opt.preset[splitRefs]
        }
        let splitRefsObj = {}
        splitRefsObj[camelDash(splitRefs)] = {
          value: node.value,
          source: node.source
        }
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, splitRefsObj)
      } else if(node.type === 'decl' && node.prop.startsWith('props-')) {
        let splitProps = node.prop.split('-')[1]
        let splitPropsObj = {}
        splitPropsObj[camelDash(splitProps)] = {
          value: '{'+node.value+'}',
          source: node.source
        }
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, splitPropsObj)
      } else if(node.type === 'decl' && node.prop === 'inject') {
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, opt.provide[node.value].value)
      } else if(node.type === 'decl' && node.prop === 'inject-props') {
        let injectPropsObj = {}
        injectPropsObj['inject-'+node.value] = {
          value: node.value,
          source: node.source
        }
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, injectPropsObj)
      } else if(node.type === 'decl' && node.prop.startsWith('screen-')) {
        let screenObj = {}
        screenObj[node.prop] = Object.assign({}, screenObj[node.prop], reference(node, opt))
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, screenObj)
      } else if(node.type === 'decl' && node.prop.startsWith('state-')) {
        let stateObj = {}
        stateObj[node.prop] = Object.assign({}, stateObj[node.prop], reference(node, opt))
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, stateObj)
      } else if(node.type === 'decl' && node.prop.startsWith('prefers-')) {
        let prefersObj = {}
        prefersObj[node.prop] = Object.assign({}, prefersObj[node.prop], reference(node, opt))
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, prefersObj)
      } else if(node.type === 'decl' && node.prop.startsWith('webkit-')) {
        let splitRefs = node.prop.split('-')[1]
        let splitRefsObj = {}
        splitRefsObj['-webkit-'+camelDash(splitRefs)] = {
          value: node.value,
          source: node.source
        }
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, splitRefsObj)
      } else if(node.type === 'decl' && node.prop.startsWith('moz-')) {
        let splitRefs = node.prop.split('-')[1]
        let splitRefsObj = {}
        splitRefsObj['-moz-'+camelDash(splitRefs)] = {
          value: node.value,
          source: node.source
        }
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, splitRefsObj)
      } else if(node.type === 'decl' && node.prop.startsWith('if-')) {
        let conditionalObj = {}
        conditionalObj[node.prop] = Object.assign({}, conditionalObj[node.prop], reference(node, opt))
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, conditionalObj)
      } else if(node.type === 'atrule' && node.name === 'if' && 'nodes' in node) {
        const paramConditional = node.params.split(/is|has/)
        const valueConditional = paramConditional[0]?.trim() || ''
        const propsConditional = paramConditional[1]?.trim() || ''
        let conditionalObj = {
          value: {},
          source: node.source
        }
        for(let condVal of node.nodes) {
          if(condVal.type === 'decl' && condVal.prop === 'ref') {
            conditionalObj.value['if-'+propsConditional+'-'+valueConditional] = Object.assign({}, conditionalObj.value['if-'+propsConditional+'-'+valueConditional], reference(condVal, opt))
          } else if(condVal.type === 'decl' && condVal.prop.startsWith('ref-')) {
            let splitRefs = condVal.prop.split('-')[1]
            let splitRefsObj = {}
            splitRefsObj[camelDash(splitRefs)] = {
              value: condVal.value,
              source: condVal.source
            }
            conditionalObj.value['if-'+propsConditional+'-'+valueConditional] = Object.assign({}, conditionalObj.value['if-'+propsConditional+'-'+valueConditional], splitRefsObj)
          }
        }
        recursiveObj[param].value = Object.assign({}, recursiveObj[param].value, conditionalObj)
      } else if(node.type === 'rule') {
        for(let par of param.split(',')) {
          recursiveArr.push(recursiveFunc(node, par.trim(), opt))
        }
      }
    }
    recursiveArr.unshift(recursiveObj)
  }
  return recursiveArr
}

module.exports = (node, opt = {}) => {
  return { body: Array.from(recursiveFunc(node, '', opt)).flat(Infinity) }
}
