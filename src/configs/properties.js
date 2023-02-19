const backgroundProperties = require('../properties/background.js')
const borderProperties = require('../properties/border.js')
const textProperties = require('../properties/text.js')
const alignmentProperties = require('../properties/alignment.js')
const transitionProperties = require('../properties/transition.js')
const listProperties = require('../properties/list.js')
const objectProperties = require('../properties/object.js')
const padProperties = require('../properties/pad.js')
const pageProperties = require('../properties/page.js')
const positionProperties = require('../properties/position.js')
const sizeProperties = require('../properties/size.js')
const elementProperties = require('../properties/element.js')

module.exports = [
  ...backgroundProperties, 
  ...borderProperties, 
  ...textProperties, 
  ...alignmentProperties, 
  ...transitionProperties,
  ...listProperties, 
  ...objectProperties,
  ...padProperties,
  ...pageProperties,
  ...positionProperties,
  ...sizeProperties,
  ...elementProperties
]
