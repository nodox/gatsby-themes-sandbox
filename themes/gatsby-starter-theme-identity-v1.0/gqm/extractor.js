/**
 * Return the value of a template key from query data
 *
 * @param mappings config to map template key to query results
 * @param key the template key we need a value for
 * @param queryResult the result of graphql query
 */
exports.getTemplateValueByKey = (key, mappings, queryResult) => {
  // TODO: Specific Gatsby Themes SDK. Should not be in GQM

  const templateKey = key
  const userMap = mappings[templateKey]

  const source = userMap.querySource
  const field = userMap.field

  return queryResult['data'][source][field]
}
