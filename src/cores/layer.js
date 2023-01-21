const postcss = require('postcss')

module.exports = (rules, name, source) => {
  const newLayer = {
    use: postcss.atRule({ name: 'layer', params: name, source: source }),
    alga: null
  }
  
  const newAtRule = postcss.atRule({ name: 'layer', params: name, source: source })
  newLayer.alga = newAtRule.append(rules)
  
  return newLayer
}
