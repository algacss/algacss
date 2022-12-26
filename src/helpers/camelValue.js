module.exports = (value) => {
  let camelStr = value.replace(/-|_/g, ' ').replace(/[A-Z]/g, ' $&').toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  return camelStr.trimStart().replace(/^\w/, (c) => c.toLowerCase()).replaceAll(' ', '')
}
