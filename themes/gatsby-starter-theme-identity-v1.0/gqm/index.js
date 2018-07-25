const generator = require('./generator')
const extractor = require('./extractor')
const loader = require('./loader')

module.exports = {
  gqgenerate: generator,
  gqextract: extractor,
  gqloader: loader,
}
