const glob = require('glob')
const fs = require('fs')
const rules = require('./rules.js')
const atrules = require('./atrules.js')

function readPath(rp) {
  const content = []
  const data = fs.readFileSync(rp, 'utf8')
  let regexp, replaceData, classes
  if(rp.endsWith('.vue')) {
    //regexp = /(v-bind:class|:class|class)="([\w]+|[\s\w]+|[\s\w\-_\.:\d\(\)]+)"/g
    //replaceData = data.replace(/\[|\]|',|,\s|'|\(|\)|\<|\>|\{|\}/ig, ' ').replace(/:\s/ig, '')
    //classes = replaceData.replace(/class="|"/g, '').split(' ').filter(i => i.includes('-'))
    regexp = /(?<=class=").*?(?=")/gs
    replaceData = data.replace(/\[|\]|',|,\s|'|\<|\>|\{|\}/ig, ' ').replace(/\s+/ig, ' ')
    classes = [...replaceData.matchAll(regexp)].map(i => i[0].split(' ').filter(w => w !== '')).flat(2).filter(i => i.includes('-'))
  } else if(rp.endsWith('.svelte')) {
    regexp = /(?<=class:).*?(?=\>|\s|=)|(?<=class=").*?(?=")/gs
    replaceData = data.replace(/\[|\]|',|,\s|'|\<|\>|\{|\}/ig, ' ').replace(/\s+/ig, ' ')
    classes = [...replaceData.matchAll(regexp)].map(i => i[0].split(' ').filter(w => w !== '')).flat(2).filter(i => i.includes('-'))
  } else if(rp.endsWith('.jsx') || rp.endsWith('.tsx')) {
    regexp = /(?<=className="|class=").*?(?=")/gs
    replaceData = data.replace(/\[|\]|',|,\s|'|\<|\>|\{|\}/ig, ' ').replace(/\s+/ig, ' ')
    classes = [...replaceData.matchAll(regexp)].map(i => i[0].split(' ').filter(w => w !== '')).flat(2).filter(i => i.includes('-'))
  } else { //.html, .astro, .edge, .blade.php, .twig, .js, or .ts
    /*regexp = /(v-bind:class|x-bind:class|:class|class|className)="([\w]+|[\s\w]+|[\s\w\-_\.:\d\(\)]+)"/g
    replaceData = data.replace(/\[|\]|',|,\s|'|\(|\)|\<|\>|\{|\}/ig, ' ').replace(/:\s/ig, '')
    classes = [...replaceData.matchAll(regexp)].flat().filter(i => i.indexOf('class') === -1)*/
    regexp = /(?<=v-bind:class="|x-bind:class="|:class="|class="|className=").*?(?=")/gs
    replaceData = data.replace(/\[|\]|',|,\s|'|\<|\>|\{|\}/ig, ' ').replace(/\s+/ig, ' ')
    classes = [...replaceData.matchAll(regexp)].map(i => i[0].split(' ').filter(w => w !== '')).flat(2).filter(i => i.includes('-'))
  }
  if(classes) {
    const uniqClasses = Array.from(new Set(classes.map(i => i.split(' ')).flat())).filter(i => i !== '')
    content.push(...uniqClasses)
  }
  return content.filter(i => i.includes('-'))
}

module.exports = (paths, source, options) => {
  let extract = []
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      extract = extract.concat(readPath(file))
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          extract = extract.concat(readPath(file))
        }
      }
    }
  }
  
  const newExtract = []
  let newStateExtract = {}
  for(let ref of Array.from(new Set(extract))) {
    if(!options.extract.raws.includes(ref)) {
      newExtract.push(...rules(ref, source, options))
      newStateExtract = Object.assign({}, atrules(newStateExtract, ref, source, options))
    }
  }
  
  return {
    raws: Array.from(new Set([...options.extract.raws, ...extract])),
    rules: [...options.extract.rules, ...newExtract, ...Object.values(newStateExtract)]
  }
}
