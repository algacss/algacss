const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const screen = require('../configs/screen.js')
const camelDash = require('../helpers/camelDash.js')
const reference = require('./reference.js')
const recursive = require('./recursive.js')

function readPath(rp, opts) {
  const component = {}
  const data = fs.readFileSync(rp, 'utf8')
  
  const splitFilePath = rp.split('/')[Number(rp.split('/').length) - 1]
  const splitFileName = splitFilePath.split('.')[0]
  let componentName = splitFileName
  component[componentName] = {}
  component[componentName]['modules'] = {}
  component[componentName]['inits'] = []
  
  const root = postcss.parse(data.replaceAll(/\{([A-Za-z0-9\-\_]+)\.([A-Za-z0-9\-\_]+)\}/g, '$1($2)'), { from: rp })
  component[componentName]['root'] = root
  
  for(let rnode of root.nodes) {
    // Convert define into property
    if(rnode.type === 'atrule' && rnode.name === 'import') {
      const param = rnode.params.replaceAll(/\'|\"|\`/g, '').trim()
      const paramFilePaths = param.split(/\/|\./)
      const paramFileName = paramFilePaths[Number(paramFilePaths.length) - 2]
      const paramParentFolder = rp.split('/')[Number(rp.split('/').length) - 2]
      let newPrmUrl = param
      if(param.startsWith('./')) {
        newPrmUrl = param.replace('./', './node_modules/'+paramParentFolder+'/')
      } else if(param.startsWith('/')) {
        newPrmUrl = './node_modules/'+paramParentFolder+''+param
      } else {
        newPrmUrl = './node_modules/'+paramParentFolder+'/'+param
      }
      component[componentName]['modules'] = Object.assign({}, component[componentName]['modules'], readPath(newPrmUrl, opts))
    } else if(rnode.type === 'atrule' && rnode.name === 'define' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const defineObj = {}
      for(let dnode of rnode.nodes) {
        defineObj[dnode.prop] = dnode.value
      }
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    // Get all provide and set a new property under provide
    } else if(rnode.type === 'atrule' && rnode.name === 'provide' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const defineObj = {}
      defineObj[param] = {}
      for(let dnode of rnode.nodes) {
        // Extracting content of provide
        if(dnode.type === 'decl' && dnode.prop === 'ref') {
          defineObj[param] = Object.assign({}, defineObj[param], reference(dnode.value))
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('ref-')) {
          let splitRefs = dnode.prop.split('-')[1]
          let splitRefsObj = {}
          splitRefsObj[camelDash(splitRefs)] = dnode.value
          defineObj[param] = Object.assign({}, defineObj[param], splitRefsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('props-')) {
          let splitProps = dnode.prop.split('-')[1]
          let splitPropsObj = {}
          splitPropsObj[camelDash(splitProps)] = '{'+dnode.value+'}'
          defineObj[param] = Object.assign({}, defineObj[param], splitPropsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('screen-')) {
          let screenObj = {}
          screenObj[dnode.prop] = Object.assign({}, screenObj[dnode.prop], reference(dnode.value))
          defineObj[param] = Object.assign({}, defineObj[param], screenObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('state-')) {
          let stateObj = {}
          stateObj[dnode.prop] = Object.assign({}, stateObj[dnode.prop], reference(dnode.value))
          defineObj[param] = Object.assign({}, defineObj[param], stateObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('prefers-')) {
          let prefersObj = {}
          prefersObj[dnode.prop] = Object.assign({}, prefersObj[dnode.prop], reference(dnode.value))
          defineObj[param] = Object.assign({}, defineObj[param], prefersObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('if-')) {
          let conditionalObj = {}
          conditionalObj[dnode.prop] = Object.assign({}, conditionalObj[dnode.prop], reference(dnode.value))
          defineObj[param] = Object.assign({}, defineObj[param], conditionalObj)
        } else if(dnode.type === 'atrule' && dnode.name === 'if' && 'nodes' in dnode) {
          const paramConditional = node.params.split('in')
          const valueConditional = paramConditional[0]?.trim() || ''
          const propsConditional = paramConditional[1]?.trim() || ''
          let conditionalObj = {}
          for(let condVal of dnode.nodes) {
            if(condVal.type === 'decl' && condVal.prop === 'ref') {
              conditionalObj['if-'+propsConditional+'-'+valueConditional] = Object.assign({}, conditionalObj['if-'+propsConditional+'-'+valueConditional], reference(condVal))
            } else if(condVal.type === 'decl' && condVal.prop.startsWith('ref-')) {
              let splitRefs = condVal.prop.split('-')[1]
              let splitRefsObj = {}
              splitRefsObj[camelDash(splitRefs)] = condVal.value
              conditionalObj['if-'+propsConditional+'-'+valueConditional] = Object.assign({}, conditionalObj['if-'+propsConditional+'-'+valueConditional], splitRefsObj)
            }
          }
          defineObj[param] = Object.assign({}, defineObj[param], conditionalObj)
        }
      }
      component[componentName]['provide'] = Object.assign({}, component[componentName]['provide'], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'alga' && 'nodes' in rnode) {
      const refOpt = {
        ...opts,
        refs: component[componentName]['refs'] || {},
        props: component[componentName]['props'] || {}
      }
          
      let param = rnode.params.trim()
      if(param.startsWith('refs(') || param.startsWith('props(')) {
        const arrowParams = param.split(/\(|\)/g)
        param = component[componentName][arrowParams[0]][arrowParams[1]]
      }
      let defineObj = {}
      defineObj['header'] = {}
      defineObj['body'] = []
      defineObj['sourceBody'] = []
      defineObj['content'] = {}
      defineObj['sourceContent'] = {}
      let index = 1
      for(let dnode of rnode.nodes) {
        const randId = randomChar(index, 6)
        defineObj['content'][randId] = []
        defineObj['sourceContent'][randId] = []
        if(dnode.type === 'atrule' && dnode.name === 'use') {
          if('params' in dnode && dnode.params !== '') {
            component[componentName]['refs'] = Object.assign({}, component[componentName]['refs'], component[componentName]['modules'][dnode.params.trim()]['refs'])
            component[componentName]['props'] = Object.assign({}, component[componentName]['props'], component[componentName]['modules'][dnode.params.trim()]['props'])
            component[componentName]['provide'] = Object.assign({}, component[componentName]['provide'], component[componentName]['modules'][dnode.params.trim()]['provide'])
            defineObj['content'][randId].push(component[componentName]['modules'][dnode.params.trim()][dnode.params.trim()]['body'])
            defineObj['sourceContent'][randId].push(component[componentName]['modules'][dnode.params.trim()][dnode.params.trim()]['sourceBody'])
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'keyframes') {
          if('nodes' in dnode) {
            let paramDnode = dnode.params.trim()
            if(paramDnode.startsWith('refs(') || paramDnode.startsWith('props(')) {
              const arrowDnodeParams = paramDnode.split(/\(|\)/g)
              paramDnode = component[componentName][arrowDnodeParams[0]][arrowDnodeParams[1]]
            }
            let keyframeDefineObj = {}
            keyframeDefineObj['@keyframes '+paramDnode] = []
            for(let kfnode of dnode.nodes) {
              let keyframeRecursiveDefineObj = recursive(kfnode, {
                'provide': component[componentName]['provide']
              })
              keyframeDefineObj['@keyframes '+paramDnode].push(keyframeRecursiveDefineObj.body)
            }
            keyframeDefineObj['@keyframes '+paramDnode] = keyframeDefineObj['@keyframes '+paramDnode].flat()
            defineObj['content'][randId].push(keyframeDefineObj)
            defineObj['sourceContent'][randId].push(dnode.source)
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'if') {
          if('nodes' in dnode) {
            let ifDefineObj = {}
            ifDefineObj['@if '+dnode.params.trim()] = []
            for(let ifnode of dnode.nodes) {
              let ifRecursiveDefineObj = recursive(ifnode, {
                ...refOpt,
                'provide': component[componentName]['provide']
              })
              ifDefineObj['@if '+dnode.params.trim()].push(ifRecursiveDefineObj.body)
            }
            ifDefineObj['@if '+dnode.params.trim()] = ifDefineObj['@if '+dnode.params.trim()].flat()
            defineObj['content'][randId].push(ifDefineObj)
            defineObj['sourceContent'][randId].push(dnode.source)
          }
        } else {
          let recursiveDefineObj = recursive(dnode, {
            ...refOpt,
            'provide': component[componentName]['provide']
          })
          defineObj['content'][randId].push(recursiveDefineObj.body)
          defineObj['sourceContent'][randId].push(recursiveDefineObj.sourceBody)
        }
        
        defineObj['content'][randId] = defineObj['content'][randId].flat()
        defineObj['sourceContent'][randId] = defineObj['sourceContent'][randId].flat()
        index++
      }
      defineObj['body'] = Object.values(defineObj['content']).flat()
      defineObj['sourceBody'] = Object.values(defineObj['sourceContent']).flat()
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'use') {
      component[componentName]['inits'].push(rnode)
    } else if(rnode.type === 'atrule' && rnode.name === 'export') {
      const param = rnode.params?.trim() || ''
      const newParams = param.split(',').filter(i => i !== '')
      for(let dnode of newParams) {
        if(component[componentName]['modules'][dnode.trim()]) {
          component[dnode.trim()] = component[componentName]['modules'][dnode.trim()]
        }
      }
    }
  }
  return component
}

module.exports = (paths, opts) => {
  let component = {}
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      if(file.endsWith('alga.css') || file.endsWith('.alga')) {
        component = Object.assign({}, component, readPath(file, opts))
      }
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          if(file.endsWith('alga.css') || file.endsWith('.alga')) {
            component = Object.assign({}, component, readPath(file, opts))
          }
        }
      }
    }
  }
  
  return component
}
