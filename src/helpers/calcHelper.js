module.exports = (value) => {
  let newType = ' + '
  const calcType = value.trim().split(/\(|\)/g)?.[0] || 'add'
  if(calcType === 'sub') {
    newType = ' - '
  } else if(calcType === 'div') {
    newType = ' / '
  } else if(calcType === 'times') {
    newType = ' * '
  }

  return value.replace(/\s{2,}/g, '')
    .replace(calcType, 'calc')
    .replace(/\,|\s\,/g, newType)
    .replace('calc( ', 'calc(')
}
