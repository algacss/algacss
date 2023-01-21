const postcss = require('postcss')

module.exports = (rules, name, source) => {
  const newAtRule = postcss.atRule({ name: 'layer', params: name, source: source })
  newAtRule.append(rules)
  return newAtRule
}
