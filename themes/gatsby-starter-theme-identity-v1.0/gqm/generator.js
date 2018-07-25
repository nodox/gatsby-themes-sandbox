
// Private
function generateQueryTemplate (source, args, body) {
  // TODO: needs to make if compatible with no args
  const template = `
    ${source} (
      ${args}
    )
    ${body}
  `
  return template
}

exports.composeQuery = (queryList) => {
  var masterQuery = ''
  queryList.forEach(query => {
    const { source, args, body } = query
    const partial = generateQueryTemplate(source, args, body)
    masterQuery = masterQuery.concat(partial)
  })

  const graphqlQuery = `
    {
      ${masterQuery}
    }
  `
  return graphqlQuery
}
