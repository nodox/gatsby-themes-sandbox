const yaml = require('js-yaml');
const fs = require('fs-extra')

exports.load = (path, encoding = 'utf8') => {
  // Loads yaml file
  return yaml.safeLoad(fs.readFileSync(path, encoding))
}
