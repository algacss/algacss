module.exports = (value) => {
  let capStr = value.replace(/-|_/g, ' ').replace(/[A-Z]/g, ' $&').toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  return capStr.replaceAll(' ', '')
}
