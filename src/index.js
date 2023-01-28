const chokidar = require('chokidar')
const { readFile, writeFile } = require('fs')
// Configs
const preset = require('./configs/preset.js')
const screen = require('./configs/screen.js')
const state = require('./configs/state.js')
const prefers = require('./configs/prefers.js')
const color = require('./configs/color.js')

// Cores
const component = require('./cores/component.js')
const componentTwo = require('./cores/component21.js')
const declaration = require('./cores/declaration.js')
const extraction = require('./cores/extraction.js')
const render = require('./cores/render.js')
const packages = require('./cores/package.js')
const layer = require('./cores/layer.js')

// Helpers
const randomChar = require('./helpers/randomChar.js')

function algacss(options) {
  const config = {
    inits: [],
    preset: Object.assign({}, preset, options?.preset),
    screen: Object.assign({}, screen, options?.screen),
    state: Object.assign({}, state, options?.state),
    prefers: Object.assign({}, prefers, options?.prefers),
    color: Object.assign({}, color, options?.color),
    components: {},
    extract: {raws: [], rules: []},
    helpers: [],
    states: {},
    important: options?.important === false ? false : true,
    directive: options?.directive === 'layer' ? 'layer' : 'use'
  }
  
  if(options?.mode) {
    config.prefers = Object.assign({}, config.prefers, {
      toDark: {
        media: 'prefers-color-scheme',
        selector: options.mode.replaceAll('{theme}', 'dark'),
        prefers: 'light'
      },
      toLight: {
        media: 'prefers-color-scheme',
        selector: options.mode.replaceAll('{theme}', 'light'),
        prefers: 'dark'
      }
    })
  }
  
  const opts = {preset: config.preset, screen: config.screen, state: config.state, prefers: config.prefers, color: config.color, important: config.important}
  
  let watchFiles = []
  if(options?.extract) {
    watchFiles = watchFiles.concat(options?.extract || [])
  }
  if(options?.src) {
    watchFiles = watchFiles.concat(options?.src || [])
  }
  
  const watcher = chokidar.watch(watchFiles, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  })
  
  watcher.on('change', path => {
    for(let helperFile of config.helpers) {
      const newHelperFile = helperFile.split('?')[0]
      readFile(newHelperFile, (err, data) => {
        if (err) throw err;
        let newData = data.toString()
        if(newData.includes('@'+config.directive+' helpers-')) {
          if(config.directive === 'layer') {
            newData = newData.replace(/\@layer helpers-.*\;/, '@layer helpers-'+ randomChar() +';')
          } else {
            newData = newData.replace(/\@use helpers-.*\;/, '@use helpers-'+ randomChar() +';')
          }
        } else {
          if(config.directive === 'layer') {
            newData = newData.replace('@layer helpers;', '@layer helpers-'+ randomChar() +';')
          } else {
            newData = newData.replace('@use helpers;', '@use helpers-'+ randomChar() +';')
          }
        }
        if(newData.includes('@'+config.directive+' helpers')) {
          writeFile(newHelperFile, newData, (err) => {
            if (err) throw err;
          })
        }
      })
    }
  })
  
  if(options?.plugins && Number(options?.plugins.length) >= 1) {
    const newPlugins = options?.plugins.map(item => {
      return './node_modules/'+item+'/*.alga'
    })
    const newComponent = packages(newPlugins, opts)
    config.components = Object.assign({}, config.components, newComponent)
    for(let keyComponent of Object.keys(newComponent)) {
      if(!keyComponent.includes('package') && newComponent[keyComponent]['inits']) {
        for(let init of newComponent[keyComponent]['inits']) {
          if(!config.inits.map(i => i.params).includes(init.params)) {
            config.inits.push(init)
          }
        }
      }
    }
  }
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
      root.walkAtRules('define', rule => {
        if(rule.params?.trim() === 'states') {
          if(rule?.nodes) {
            for(let node of rule.nodes) {
              if(node.type === 'decl' && node?.prop) {
                config.states[node.prop] = {
                  value: node.value,
                  source: node.source
                }
              }
            }
          }
        }
        rule.remove()
      })
      
      root.walkAtRules(config.directive, rule => {
        if(config.directive === 'layer') {
          if(!rule.nodes) {
            const paramInArray = rule.params.split(',')
            for(let prmArr of paramInArray) {
              let param = prmArr.trim()
              let name = param
              if(param.includes('.')) {
                const prms = param.split('.')
                param = prms[0].trim()
                name = prms[1].trim()
              }
              if(!rule.params.includes(',') && (name.includes('helpers') || param.includes('helpers'))) {
                if(root.source?.input?.from) {
                  config.helpers.push(root.source.input.from)
                }
                config.extract = extraction(options?.extract, rule.source, {...opts, extract: config.extract})
                
                if(config.extract.rules.length >= 1) {
                  rule.append(...config.extract.rules)
                }
              } else {
                let fileName = param
                let componentName = name
                
                const newComponentTwo = componentTwo(options?.src, fileName, componentName, {
                  props: Object.assign({}, config.states),
                  preset: config.preset, 
                  screen: config.screen, 
                  state: config.state, 
                  prefers: config.prefers, 
                  color: config.color
                })
                
                if(newComponentTwo) {
                  if(!rule.params.includes(',')) {
                    rule.append(newComponentTwo)
                  } else {
                    const newLayer = layer(newComponentTwo, componentName, rule.source)
                    root.append(newLayer)
                  }
                }
              }
            }
          }
        } else {
          let param = rule.params.trim()
          let name = param
          if(param.includes('.')) {
            const prms = param.split('.')
            param = prms[0].trim()
            name = prms[1].trim()
          }
          
          /* Component v2 */
          
          if(name.includes('helpers') || param.includes('helpers')) {
            if(root.source?.input?.from) {
              config.helpers.push(root.source.input.from)
            }
            config.extract = extraction(options?.extract, rule.source, {...opts, extract: config.extract})
            
            if(config.extract.rules.length >= 1) {
              root.append(...config.extract.rules)
            }
            rule.remove()
            
          } else {
            let fileName = param
            let componentName = name
            
            let newProps = {}
            if(rule?.nodes) {
              for(let node of rule.nodes) {
                if(node.type === 'rule' && (rule?.nodes?.length || 0) >= 1) {
                  const ruleNodeName = node.selector.replace(/\#|\./, '').trim()
                  for(let ruleNode of node.nodes) {
                    if(ruleNodeName === 'props') {
                      if(ruleNode.type === 'decl' && ruleNode?.prop) {
                        newProps[ruleNode.prop] = {
                          value: ruleNode.value,
                          source: ruleNode.source
                        }
                      }
                    }
                  }
                } else {
                  if(node.type === 'decl' && node?.prop) {
                    newProps[node.prop] = {
                      value: node.value,
                      source: node.source
                    }
                  }
                }
              }
            }
            
            const newComponentTwo = componentTwo(options?.src, fileName, componentName, {
              props: Object.assign({}, config.states, newProps),
              preset: config.preset, 
              screen: config.screen, 
              state: config.state, 
              prefers: config.prefers, 
              color: config.color
            })
            
            if(newComponentTwo) {
              if(config.important) {
                rule.replaceWith(newComponentTwo)
              } else {
                const newLayer = layer(newComponentTwo, componentName, rule.source)
                rule.replaceWith(newLayer)
              }
            } else {
              rule.remove()
            }
          }
          
          /* Component v1 */
          
          /*if(!name.includes('helpers') && !config.components[name]) {
            config.components = Object.assign({}, config.components, component(options?.src, {...opts, componentName: name}))
          }
          if(name.includes('helpers') || param.includes('helpers')) {
            if(root.source?.input?.from) {
              config.helpers.push(root.source.input.from)
            }
            config.extract = extraction(options?.extract, rule.source, {...opts, extract: config.extract})
            
            if(config.extract.rules.length >= 1) {
              root.append(...config.extract.rules)
            }
            rule.remove()
          } else if(config.components[name]) {
            let newNodes = []
            if(rule?.nodes) {
              for(let node of rule.nodes) {
                if(node.type === 'rule' && (rule?.nodes?.length || 0) >= 1) {
                  const ruleNodeName = node.selector.replace(/\#|\./, '').trim()
                  for(let ruleNode of node.nodes) {
                    if(ruleNodeName === 'props') {
                      if(ruleNode.prop in config.components[param][ruleNodeName]) {
                        config.components[param][ruleNodeName][ruleNode.prop].value = ruleNode.value
                      }
                    }
                  }
                } else {
                  if(node.type === 'decl' && String(node?.prop) in config.components[param]['props']) {
                    config.components[param]['props'][node.prop].value = node.value
                  }
                }
              }
            }
            let newBodyVar = []
            if(config.components[param]?.[name]?.['body']) {
              newBodyVar = config.components[param][name]['body']
            }
            newNodes = [
              ...newNodes, 
              ...declaration(newBodyVar,
              {
                refs: config.components[param]['refs'],
                props: config.components[param]['props'], 
                provide: config.components[param]['provide']
              },
              {
                screen: config.screen,
                state: config.state, 
                prefers: config.prefers, 
                color: config.color
              })
            ]
            const newRoot = config.components[param]['root']
            newRoot.removeAll()
            newRoot.append(...newNodes)
            rule.replaceWith(newRoot)
          } else {
            rule.remove()
          }*/
        }
      })
      
      root.walkAtRules('ref', rule => {
        let params = rule.params.trim().split(' ')
        if(params.length >= 1) {
          let newRender = render(params, rule.source, {...opts})
          rule.replaceWith(newRender)
        } else {
          rule.remove()
        }
      })
      
      let newPackNodes = []
      const filterPackNodes = []
      for(let rule of config.inits) {
        let param = rule.params.trim()
        let name = param
        if(param.includes('.')) {
          const prms = param.split('.')
          param = prms[0].trim()
          name = prms[1].trim()
        }
        if(!filterPackNodes.includes(param) && config.components[param]) {
          filterPackNodes.push(param)
          let newNodes = []
          if(rule?.nodes) {
            for(let node of rule.nodes) {
              if(node.type === 'rule' && (rule?.nodes?.length || 0) >= 1) {
                const ruleNodeName = node.selector.replace(/\#|\./, '').trim()
                for(let ruleNode of node.nodes) {
                  if(ruleNodeName === 'props') {
                    if(ruleNode.prop in config.components[param][ruleNodeName]) {
                      config.components[param][ruleNodeName][ruleNode.prop].value = ruleNode.value
                    }
                  }
                }
              } else {
                if(node.type === 'decl' && String(node?.prop) in config.components[param]['props']) {
                  config.components[param]['props'][node.prop].value = node.value
                }
              }
            }
          }
          let newBodyVar = []
          if(config.components[param]?.[name]?.['body']) {
            newBodyVar = config.components[param][name]['body']
          }
          newNodes = [
            ...newNodes, 
            ...declaration(newBodyVar,
            {
              refs: config.components[param]['refs'],
              props: config.components[param]['props'], 
              provide: config.components[param]['provide']
            },
            {
              screen: config.screen,
              state: config.state, 
              prefers: config.prefers, 
              color: config.color
            })
          ]
          const newRoot = config.components[param]['root']
          newRoot.removeAll()
          if(config.important) {
            newRoot.append(...newNodes)
          } else {
            const newLayer = layer(newNodes, name, rule.source)
            newRoot.append(newLayer)
          }
          newPackNodes.push(newRoot)
        }
      }
      root.append(...newPackNodes.flat())
      
    }
  }
}

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'algacss',
    prepare() {
      return algacss(opts)
    }
  }
}

module.exports.postcss = true
