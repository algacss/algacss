module.exports = (value) => {
  return value.replace(/\s{2,}/g, '')
    .replace(/%/g, '%25')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/"/g, "'")
    .replace(`svg('`, `url("data:image/svg+xml,`)
    .replace(`')`, `")`)
}
