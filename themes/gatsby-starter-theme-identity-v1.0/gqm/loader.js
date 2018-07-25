const yaml = require('js-yaml');
const fs = require('fs-extra')

exports.load = (path, encoding = 'utf8') => {
  // Loads yaml file
  return yaml.safeLoad(fs.readFileSync(path, encoding))
}

exports.fetch = async (graphql, query) => {
  try {
    return await graphql(query)
  } catch (e) {
    // TODO: Handle errors when there is parsing issues, prevent silent fail

    throw e
  }
}
