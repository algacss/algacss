const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const screen = require('../configs/screen.js')
const camelDash = require('../helpers/camelDash.js')
const randomChar = require('../helpers/randomChar.js')
const reference = require('./reference.js')
const recursive = require('./recursive.js')

function readPath(rp, opts) {
  const component = {}
  let data = fs.readFileSync(rp, 'utf8')
  
  const splitFilePath = rp.split('/')[Number(rp.split('/').length) - 1]
  const splitFileName = splitFilePath.split('.')[0]
  let componentName = splitFileName
  component[componentName] = {}
  component[componentName]['modules'] = {}
  component[componentName]['inits'] = []
  
  if(!data) return;
  data = data.replaceAll(/\{\{([A-Za-z0-9\-\_]+)\.([A-Za-z0-9\-\_]+)\}\}/g, '_$1($2)_')
          .replaceAll(/\{([A-Za-z0-9\-\_]+)\.([A-Za-z0-9\-\_]+)\}/g, '$1($2)')
  
  const root = postcss.parse(data, { from: rp })
  component[componentName]['root'] = root
  
  for(let rnode of root.nodes) {
    // Convert define into property
    if(rnode.type === 'atrule' && rnode.name === 'import') {
      const param = rnode.params.replaceAll(/\'|\"|\`/g, '').trim()
      const paramFilePaths = param.split(/\/|\./)
      const paramFileName = paramFilePaths[Number(paramFilePaths.length) - 2]
      const paramParentFolder = opts.libraryName //rp.split('/')[Number(rp.split('/').length) - 2]
      let newPrmUrl = param
      if(param.startsWith('./')) {
        newPrmUrl = param.replace('./', './node_modules/'+paramParentFolder+'/')
      } else if(param.startsWith('/')) {
        newPrmUrl = './node_modules/'+paramParentFolder+''+param
      } else {
        newPrmUrl = './node_modules/'+paramParentFolder+'/'+param
      }
      component[componentName]['modules'] = Object.assign({}, component[componentName]['modules'], readPath(path.resolve(newPrmUrl), opts))
    } else if(rnode.type === 'atrule' && rnode.name === 'define' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const defineObj = {}
      for(let dnode of rnode.nodes) {
        defineObj[dnode.prop] = {
          value: dnode.value,
          source: dnode.source
        }
      }
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    // Get all provide and set a new property under provide
    } else if(rnode.type === 'atrule' && rnode.name === 'provide' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const refOpt = {
        ...opts,
        refs: component[componentName]['refs'] || {},
        scopes: component[componentName]['scopes'] || {},
        props: component[componentName]['props'] || {}
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
          splitPropsObj[camelDash(splitProps)] = {
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
      component[componentName]['provide'] = Object.assign({}, component[componentName]['provide'], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'alga' && 'nodes' in rnode) {
      const refOpt = {
        ...opts,
        refs: component[componentName]['refs'] || {},
        scopes: component[componentName]['scopes'] || {},
        props: component[componentName]['props'] || {}
      }
          
      let param = rnode.params.trim()
      if(param.startsWith('refs(') || param.startsWith('props(')) {
        const arrowParams = param.split(/\(|\)/g)
        param = component[componentName][arrowParams[0]][arrowParams[1]].value
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
            component[componentName]['refs'] = Object.assign({}, component[componentName]['refs'], component[componentName]['modules'][dnode.params.trim()]['refs'])
            component[componentName]['scopes'] = Object.assign({}, component[componentName]['scopes'], component[componentName]['modules'][dnode.params.trim()]['scopes'])
            component[componentName]['props'] = Object.assign({}, component[componentName]['props'], component[componentName]['modules'][dnode.params.trim()]['props'])
            component[componentName]['provide'] = Object.assign({}, component[componentName]['provide'], component[componentName]['modules'][dnode.params.trim()]['provide'])
            defineObj['content'][randId].push(component[componentName]['modules'][dnode.params.trim()][dnode.params.trim()]['body'])
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'keyframes') {
          if('nodes' in dnode) {
            let paramDnode = dnode.params.trim()
            if(paramDnode.startsWith('refs(') || paramDnode.startsWith('props(')) {
              const arrowDnodeParams = paramDnode.split(/\(|\)/g)
              paramDnode = component[componentName][arrowDnodeParams[0]][arrowDnodeParams[1]].value
            }
            if(paramDnode.startsWith('scopes(')) {
              const arrowDnodeParams = paramDnode.split(/\(|\)/g)
              let scopeParamDnode = component[componentName][arrowDnodeParams[0]][arrowDnodeParams[1]].value
              paramDnode = `var(--scope-${arrowDnodeParams[1]}, ${scopeParamDnode})`
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
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'paper') {
          if('nodes' in dnode) {
            let paramDnode = dnode.params.trim()
            if(paramDnode.startsWith('refs(') || paramDnode.startsWith('props(')) {
              const arrowDnodeParams = paramDnode.split(/\(|\)/g)
              paramDnode = component[componentName][arrowDnodeParams[0]][arrowDnodeParams[1]].value
            }
            if(paramDnode.startsWith('scopes(')) {
              const arrowDnodeParams = paramDnode.split(/\(|\)/g)
              let scopeParamDnode = component[componentName][arrowDnodeParams[0]][arrowDnodeParams[1]].value
              paramDnode = `var(--scope-${arrowDnodeParams[1]}, ${scopeParamDnode})`
            }
            let paperDefineObj = {}
            paperDefineObj['@page '+paramDnode] = []
            for(let kfnode of dnode.nodes) {
              let paperRecursiveDefineObj = recursive(kfnode, {
                ...refOpt,
                'provide': component[componentName]['provide']
              })
              paperDefineObj['@page '+paramDnode].push(paperRecursiveDefineObj.body)
            }
            paperDefineObj['@page '+paramDnode] = paperDefineObj['@page '+paramDnode].flat()
            defineObj['content'][randId].push(paperDefineObj)
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'if') {
          if('nodes' in dnode) {
            const ifParams = dnode?.params?.trim() || ''
            const ifProps = Object.assign({}, component[componentName]['props'], opts.props)
            const ifRefs = component[componentName]?.['refs'] || {}
            
            if(ifParams.includes(' is ')) {
              const splitKey = ifParams.split(/\sis\s/g).filter(i => i !== '')
              if(
                (ifProps?.[splitKey[0].trim()] && ifProps[splitKey[0].trim()].value === splitKey[1].trim()) ||
                (ifRefs?.[splitKey[0].trim()] && ifRefs[splitKey[0].trim()].value === splitKey[1].trim())
              ) {
                
                for(let ifnode of dnode.nodes) {
                  let ifRecursiveDefineObj = recursive(ifnode, {
                    ...refOpt,
                    'provide': component[componentName]['provide']
                  })
                  defineObj['content'][randId].push(ifRecursiveDefineObj.body)
                }
                
              }
            } else if(ifParams.includes(' has ')) {
              const splitKey = ifParams.split(/\shas\s/g).filter(i => i !== '')
              if(
                (ifProps?.[splitKey[0].trim()] && ifProps[splitKey[0].trim()].value.replaceAll(' ', '').split(',').filter(i => i !== '').includes(splitKey[1].trim())) ||
                (ifRefs?.[splitKey[0].trim()] && ifRefs[splitKey[0].trim()].value.replaceAll(' ', '').split(',').filter(i => i !== '').includes(splitKey[1].trim()))
              ) {
                
                for(let ifnode of dnode.nodes) {
                  let ifRecursiveDefineObj = recursive(ifnode, {
                    ...refOpt,
                    'provide': component[componentName]['provide']
                  })
                  defineObj['content'][randId].push(ifRecursiveDefineObj.body)
                }
                
              }
            }
            
          }
        } else if(dnode.type === 'atrule' && dnode.name === 'for') {
          if('nodes' in dnode) {
            const forParams = dnode?.params?.trim() || ''
            const forProps = Object.assign({}, component[componentName]['props'], opts.props)
            const forRefs = component[componentName]?.['refs'] || {}
            
            if(forParams.includes(' in ')) {
              const splitKey = forParams.split(/\sin\s/g).filter(i => i !== '')
              if(Number(splitKey.length) === 2) {
              
                const firstVal = splitKey[0].trim()
                const lastVal = forProps?.[splitKey[1].trim()].value.replaceAll(' ', '').split(',').filter(i => i !== '') || forRefs?.[splitKey[1].trim()].value.replaceAll(' ', '').split(',').filter(i => i !== '') || []
                for(let forItem of lastVal) {
                  if(forItem) {
                    for(let fornode of dnode.nodes) {
                      let forRecursiveDefineObj = recursive(fornode, {
                        ...refOpt,
                        'provide': component[componentName]['provide'],
                        'each': firstVal,
                        [firstVal]: forItem
                      })
                      defineObj['content'][randId].push(forRecursiveDefineObj.body)
                    }
                  }
                }
                
              }
            } else if(forParams.includes(' of ')) {
              const splitKey = forParams.split(/\sof\s/g).filter(i => i !== '')
              if(Number(splitKey.length) === 2) {
                
                const firstVal = splitKey[0].trim()
                const lastVal =  (isNaN(splitKey[1].trim()) === false) ? Number(splitKey[1].trim()) : 0
                
                for(let i = 1; i <= Number(lastVal); i++) {
                  for(let fornode of dnode.nodes) {
                    let forRecursiveDefineObj = recursive(fornode, {
                      ...refOpt,
                      'provide': component[componentName]['provide'],
                      'each': firstVal,
                      [firstVal]: i
                    })
                    defineObj['content'][randId].push(forRecursiveDefineObj.body)
                  }
                }
                
              }
            }
            
          }
        } else {
          let recursiveDefineObj = recursive(dnode, {
            ...refOpt,
            'provide': component[componentName]['provide']
          })
          defineObj['content'][randId].push(recursiveDefineObj.body)
        }
        
        defineObj['content'][randId] = defineObj['content'][randId].flat()
        index++
      }
      defineObj['body'] = Object.values(defineObj['content']).flat()
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'use') {
      component[componentName]['inits'].push(rnode)
    } else if(rnode.type === 'atrule' && rnode.name === 'export') {
      const param = rnode.params?.trim() || ''
      const newParams = param.split(',').filter(i => i !== '')
      for(let dnode of newParams) {
        if(component[componentName]['modules'][dnode.trim()]) {
          component[componentName]['modules'][dnode.trim()]['inits'].push(rnode.clone({ params: dnode.trim() }))
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
    const libraryName = paths.replace('./node_modules/', '').replace('/*.alga', '')
    const files = glob.sync(paths, {})
    for(let file of files) {
      if(file.endsWith('alga.css') || file.endsWith('.alga')) {
        component = Object.assign({}, component, readPath(file, {...opts, libraryName}))
      }
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const libraryName = p.replace('./node_modules/', '').replace('/*.alga', '')
        const files = glob.sync(p, {})
        for(let file of files) {
          if(file.endsWith('alga.css') || file.endsWith('.alga')) {
            component = Object.assign({}, component, readPath(file, {...opts, libraryName}))
          }
        }
      }
    }
  }
  
  return component
}
