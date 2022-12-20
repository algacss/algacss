const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const screen = require('../configs/screen.js')
const camelDash = require('../helpers/camelDash.js')
const randomChar = require('../helpers/randomChar.js')
const reference = require('./reference.js')
const recursive = require('./recursive.js')
const declaration = require('./declaration.js')

function readPath(rp, fileName, componentName, opts) {
  const component = {}
  let data = fs.readFileSync(rp, 'utf8')
  
  component[fileName] = {}
  component[fileName]['modules'] = {}
  component[fileName]['inits'] = []
  
  if(data) {
    data = data.replaceAll(/\{([A-Za-z0-9\-\_]+)\.([A-Za-z0-9\-\_]+)\}/g, '$1($2)')
  }
  
  const root = postcss.parse(data, { from: rp }) /* (\w+) */
  component[fileName]['root'] = root
  
  for(let rnode of root.nodes) {
    // Convert define into property
    if(rnode.type === 'atrule' && rnode.name === 'import') {
      const param = rnode.params.replaceAll(/\'|\"|\`/g, '').trim()
      const paramFilePaths = param.split(/\/|\./)
      const paramFileName = paramFilePaths[Number(paramFilePaths.length) - 2]
      component[fileName]['modules'] = Object.assign({}, component[fileName]['modules'], readPath(param, fileName, componentName, opts))
    } else if(rnode.type === 'atrule' && rnode.name === 'define' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const defineObj = {}
      for(let dnode of rnode.nodes) {
        defineObj[dnode.prop] = {
          value: dnode.value,
          source: dnode.source
        }
      }
      component[fileName][param] = Object.assign({}, component[fileName][param], defineObj)
    // Get all provides and set a new property under provide name
    } else if(rnode.type === 'atrule' && rnode.name === 'provide' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const refOpt = {
        ...opts,
        refs: component[fileName]['refs'] || {},
        props: component[fileName]['props'] || {}
      }
      const defineObj = {}
      defineObj[param] = {
        value: {},
        source: rnode.source
      }
      for(let dnode of rnode.nodes) {
        // Extracting content of provide
        if(dnode.type === 'decl' && dnode.prop === 'ref') {
          defineObj[param].value = Object.assign({}, defineObj[param].value, reference(dnode, refOpt))
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('ref-')) {
          let splitRefs = dnode.prop.split('-')[1]
          if('preset' in opts && Object.keys(opts.preset).includes(splitRefs)) {
            splitRefs = opts.preset[splitRefs]
          }
          let splitRefsObj = {}
          splitRefsObj[camelDash(splitRefs)] = {
            value: dnode.value,
            source: dnode.source
          }
          defineObj[param].value = Object.assign({}, defineObj[param].value, splitRefsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('props-')) {
          let splitProps = dnode.prop.split('-')[1]
          let splitPropsObj = {}
          splitPropsObj[splitProps] = {
            value: '{'+dnode.value+'}',
            source: dnode.source
          }
          defineObj[param].value = Object.assign({}, defineObj[param].value, splitPropsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('screen-')) {
          let screenObj = {}
          screenObj[dnode.prop] = Object.assign({}, screenObj[dnode.prop], reference(dnode, refOpt))
          defineObj[param].value = Object.assign({}, defineObj[param].value, screenObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('state-')) {
          let stateObj = {}
          stateObj[dnode.prop] = Object.assign({}, stateObj[dnode.prop], reference(dnode, refOpt))
          defineObj[param].value = Object.assign({}, defineObj[param].value, stateObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('prefers-')) {
          let prefersObj = {}
          prefersObj[dnode.prop] = Object.assign({}, prefersObj[dnode.prop], reference(dnode, refOpt))
          defineObj[param].value = Object.assign({}, defineObj[param].value, prefersObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('webkit-')) {
          let splitRefs = dnode.prop.split('-')[1]
          let splitRefsObj = {}
          splitRefsObj['-webkit-'+camelDash(splitRefs)] = {
            value: dnode.value,
            source: dnode.source
          }
          defineObj[param].value = Object.assign({}, defineObj[param].value, splitRefsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('moz-')) {
          let splitRefs = dnode.prop.split('-')[1]
          let splitRefsObj = {}
          splitRefsObj['-moz-'+camelDash(splitRefs)] = {
            value: dnode.value,
            source: dnode.source
          }
          defineObj[param].value = Object.assign({}, defineObj[param].value, splitRefsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('if-')) {
          let conditionalObj = {}
          conditionalObj[dnode.prop] = Object.assign({}, conditionalObj[dnode.prop], reference(dnode, refOpt))
          defineObj[param].value = Object.assign({}, defineObj[param].value, conditionalObj)
        } else if(dnode.type === 'atrule' && dnode.name === 'if' && 'nodes' in dnode) {
          const paramConditional = node.params.split(/is|has/)
          const valueConditional = paramConditional[0]?.trim() || ''
          const propsConditional = paramConditional[1]?.trim() || ''
          let conditionalObj = {
            value: {},
            source: node.source
          }
          for(let condVal of dnode.nodes) {
            if(condVal.type === 'decl' && condVal.prop === 'ref') {
              conditionalObj.value['if-'+propsConditional+'-'+valueConditional] = Object.assign({}, conditionalObj.value['if-'+propsConditional+'-'+valueConditional], reference(condVal, refOpt))
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
          defineObj[param].value = Object.assign({}, defineObj[param].value, conditionalObj)
        }
      }
      component[fileName]['provide'] = Object.assign({}, component[fileName]['provide'], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'alga' && 'nodes' in rnode) {
      const refOpt = {
        ...opts,
        refs: component[fileName]['refs'] || {},
        props: component[fileName]['props'] || {}
      }
          
      let param = rnode.params.trim()
      if(param.startsWith('refs(') || param.startsWith('props(')) {
        const arrowParams = param.split(/\(|\)/g)
        param = component[fileName][arrowParams[0]][arrowParams[1]].value
      }
      let defineObj = {}
      defineObj['header'] = {}
      defineObj['body'] = []
      defineObj['content'] = {}
      let index = 1
      for(let dnode of rnode.nodes) {
        const randId = randomChar(index, 6)
        defineObj['content'][randId] = []
        if(dnode.type === 'atrule' && dnode.name === 'use') {
          if('params' in dnode && dnode.params !== '') {
            component[fileName]['refs'] = Object.assign({}, component[fileName]['refs'], component[fileName]['modules'][dnode.params.trim()]['refs'])
            component[fileName]['props'] = Object.assign({}, component[fileName]['props'], component[fileName]['modules'][dnode.params.trim()]['props'])
            component[fileName]['provide'] = Object.assign({}, component[fileName]['provide'], component[fileName]['modules'][dnode.params.trim()]['provide'])
            defineObj['content'][randId].push(component[fileName]['modules'][dnode.params.trim()][dnode.params.trim()]['body'])
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'keyframes') {
          if('nodes' in dnode) {
            let paramDnode = dnode.params.trim()
            if(paramDnode.startsWith('refs(') || paramDnode.startsWith('props(')) {
              const arrowDnodeParams = paramDnode.split(/\(|\)/g)
              paramDnode = component[fileName][arrowDnodeParams[0]][arrowDnodeParams[1]].value
            }
            let keyframeDefineObj = {}
            keyframeDefineObj['@keyframes '+paramDnode] = []
            for(let kfnode of dnode.nodes) {
              let keyframeRecursiveDefineObj = recursive(kfnode, {
                'provide': component[fileName]['provide']
              })
              keyframeDefineObj['@keyframes '+paramDnode].push(keyframeRecursiveDefineObj.body)
            }
            keyframeDefineObj['@keyframes '+paramDnode] = keyframeDefineObj['@keyframes '+paramDnode].flat()
            defineObj['content'][randId].push(keyframeDefineObj)
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'if') {
          if('nodes' in dnode) {
            let ifDefineObj = {}
            ifDefineObj['@if '+dnode.params.trim()] = []
            for(let ifnode of dnode.nodes) {
              let ifRecursiveDefineObj = recursive(ifnode, {
                ...refOpt,
                'provide': component[fileName]['provide']
              })
              ifDefineObj['@if '+dnode.params.trim()].push(ifRecursiveDefineObj.body)
            }
            ifDefineObj['@if '+dnode.params.trim()] = ifDefineObj['@if '+dnode.params.trim()].flat()
            defineObj['content'][randId].push(ifDefineObj)
          }
        } else {
          let recursiveDefineObj = recursive(dnode, {
            ...refOpt,
            'provide': component[fileName]['provide']
          })
          defineObj['content'][randId].push(recursiveDefineObj.body)
        }
        
        defineObj['content'][randId] = defineObj['content'][randId].flat()
        index++
      }
      defineObj['body'] = Object.values(defineObj['content']).flat()
      component[fileName][param] = Object.assign({}, component[fileName][param], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'use') {
      component[fileName]['inits'].push(rnode)
    } else if(rnode.type === 'atrule' && rnode.name === 'export') {
      const param = rnode.params?.trim() || ''
      const newParams = param.split(',').filter(i => i !== '')
      for(let dnode of newParams) {
        if(component[fileName]['modules'][dnode.trim()]) {
          component[fileName]['modules'][dnode.trim()]['inits'].push(rnode.clone({ params: dnode.trim() }))
          component[dnode.trim()] = component[fileName]['modules'][dnode.trim()]
        }
      }
    }
  }
  
  let newBodyVar = []
  if(component[fileName]?.[componentName]?.['body']) {
    newBodyVar = component[fileName][componentName]['body']
  }
  let newNodes = [ 
    ...declaration(newBodyVar,
    {
      refs: component[fileName]['refs'],
      props: Object.assign({}, component[fileName]['props'], opts.props),
      provide: component[fileName]['provide']
    },
    {
      screen: opts.screen,
      state: opts.state, 
      prefers: opts.prefers, 
      color: opts.color
    })
  ]
  
  const newRoot = component[fileName]['root']
  newRoot.removeAll()
  newRoot.append(...newNodes)
  
  return newRoot
}

module.exports = (paths, fileName, componentName, opts) => {
  let component = null
  
  if(fileName) {
    const coreFile = path.resolve(__dirname, './../../alga/'+fileName+'.alga')
    if(fs.existsSync(coreFile)) {
      component = readPath(coreFile, fileName, componentName, opts)
    }
    
    if(typeof paths === 'string') {
      const files = glob.sync(paths, {})
      for(let file of files) {
        if(file.endsWith(fileName+'.alga')) {
          const splitFilePaths = file.split(/\/|\\/)
          const splitFileName = splitFilePaths[Number(splitFilePaths.length) - 1]
          if(splitFileName === fileName+'.alga') {
            component = readPath(file, fileName, componentName, opts)
            break;
          }
        }
      }
    } else if(Array.isArray(paths)) {
      for(let p of Array.from(paths)) {
        if(typeof p === 'string') {
          const files = glob.sync(p, {})
          for(let file of files) {
            if(file.endsWith(fileName+'.alga')) {
              const splitFilePaths = file.split(/\/|\\/)
              const splitFileName = splitFilePaths[Number(splitFilePaths.length) - 1]
              if(splitFileName === fileName+'.alga') {
                component = readPath(file, fileName, componentName, opts)
                break;
              }
            }
          }
        }
      }
    }
  }
  
  return component
}
